/* ============================================================
   DecoMuse — Stripe Webhook  (Netlify Function)
   ------------------------------------------------------------
   Stripe calls this URL after every payment. This is the RELIABLE
   record of a paid order — it fires even if the customer closes
   the tab before the success page loads. Never fulfil an order
   from the browser success page alone; trust this instead.

   Endpoint (after deploy):
     /.netlify/functions/stripe-webhook
     (also aliased to /api/stripe-webhook)

   Required environment variables (Netlify dashboard):
     STRIPE_SECRET_KEY      = sk_test_... / sk_live_...
     STRIPE_WEBHOOK_SECRET  = whsec_...   (from the webhook you create in Stripe)
   Optional (to email yourself each paid order):
     WEB3FORMS_KEY          = <your Web3Forms access key>
     ORDER_EMAIL            = Decormuseofficial@outlook.com
   ============================================================ */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

function money(cents, cur) {
  return `${(cents / 100).toFixed(2)} ${(cur || "aud").toUpperCase()}`;
}

async function emailOrder(session, lineItems) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) return; // silently skip if not configured

  const to = process.env.ORDER_EMAIL || "Decormuseofficial@outlook.com";
  const ship = session.shipping_details || {};
  const addr = ship.address || {};
  const lines = (lineItems || [])
    .map((li) => `  • ${li.quantity} × ${li.description} — ${money(li.amount_total, li.currency)}`)
    .join("\n");

  const body =
    `New paid order via DecoMuse 🎉\n\n` +
    `Order (Stripe session): ${session.id}\n` +
    `Payment status: ${session.payment_status}\n` +
    `Total: ${money(session.amount_total, session.currency)}\n` +
    (session.total_details && session.total_details.amount_shipping != null
      ? `Shipping: ${money(session.total_details.amount_shipping, session.currency)}\n`
      : "") +
    (session.total_details && session.total_details.amount_discount
      ? `Discount: -${money(session.total_details.amount_discount, session.currency)}\n`
      : "") +
    `\nItems:\n${lines}\n\n` +
    `Customer: ${session.customer_details ? session.customer_details.name || "" : ""}\n` +
    `Email: ${session.customer_details ? session.customer_details.email || "" : ""}\n` +
    `Phone: ${session.customer_details ? session.customer_details.phone || "" : ""}\n\n` +
    `Ship to:\n` +
    `  ${ship.name || ""}\n` +
    `  ${addr.line1 || ""} ${addr.line2 || ""}\n` +
    `  ${addr.city || ""} ${addr.state || ""} ${addr.postal_code || ""}\n` +
    `  ${addr.country || ""}\n`;

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `DecoMuse — new paid order (${money(session.amount_total, session.currency)})`,
        from_name: "DecoMuse Store",
        email: to,
        message: body,
      }),
    });
  } catch (err) {
    console.error("Order email failed:", err.message);
  }
}

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(raw, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  try {
    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      // Only act on genuinely paid sessions
      if (session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          limit: 100,
        });
        await emailOrder(session, lineItems.data);
        console.log("Paid order captured:", session.id, money(session.amount_total, session.currency));
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err.message);
    // Return 200 anyway so Stripe doesn't retry forever on our own bug;
    // the event is still visible in the Stripe Dashboard.
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
