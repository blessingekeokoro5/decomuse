/* ============================================================
   DecoMuse — Create Stripe Checkout Session  (Netlify Function)
   ------------------------------------------------------------
   Runs on the SERVER only. Uses your Stripe SECRET key, which
   must NEVER be exposed to the browser.

   Endpoint (after deploy):
     /.netlify/functions/create-checkout-session
     (also aliased to /api/create-checkout-session)

   Required environment variables (set in Netlify dashboard):
     STRIPE_SECRET_KEY   = sk_test_...  then later  sk_live_...
     SITE_URL            = https://your-site.netlify.app  (or custom domain)
   Optional:
     STRIPE_COUPON_WELCOME20 = <coupon id created in Stripe Dashboard>

   The frontend (js/checkout.js) POSTs the cart here and we return
   { url } — the Stripe-hosted checkout page to redirect to.
   ============================================================ */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const SITE_URL = process.env.SITE_URL || "https://decomuse.com.au";

// Countries we ship to (ISO codes) — matches the site's shipping calculator regions
const SHIP_COUNTRIES = ["AU", "NZ", "GB", "US", "CA", "NG"];

function jsonResponse(statusCode, obj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(obj),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return jsonResponse(200, {});
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });

  try {
    const { items = [], coupon, customer = {}, shipping } = JSON.parse(event.body || "{}");

    if (!Array.isArray(items) || items.length === 0) {
      return jsonResponse(400, { error: "Your cart is empty." });
    }

    // Build line items. NOTE: prices come from the client cart.
    // For extra hardening you can look prices up from a trusted
    // server-side product map here before charging (see README notes).
    let subtotal = 0;
    const line_items = items.map((i) => {
      const price = Number(i.price);
      const qty = Math.max(1, parseInt(i.qty, 10) || 1);
      if (!i.name || !isFinite(price) || price < 0) {
        throw new Error("Invalid item in cart.");
      }
      subtotal += price * qty;
      return {
        price_data: {
          currency: "aud",
          product_data: {
            name: String(i.name).slice(0, 250),
            metadata: i.id ? { sku: String(i.id) } : undefined,
          },
          unit_amount: Math.round(price * 100), // GST-inclusive AUD, in cents
        },
        quantity: qty,
      };
    });

    // Shipping = the weight-based amount the site's calculator worked out for the
    // chosen region, so what Stripe charges matches exactly what the shopper saw.
    const shipAmount = Math.max(0, Number(shipping) || 0);
    const shipping_options = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: Math.round(shipAmount * 100), currency: "aud" },
          display_name: shipAmount === 0 ? "Free standard shipping" : "Standard shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 15 },
          },
        },
      },
    ];

    // Optional 20% member coupon — create the Coupon once in the Stripe
    // Dashboard and store its id as STRIPE_COUPON_WELCOME20.
    const discounts =
      coupon === "WELCOME20" && process.env.STRIPE_COUPON_WELCOME20
        ? [{ coupon: process.env.STRIPE_COUPON_WELCOME20 }]
        : [];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      discounts,
      shipping_options,
      phone_number_collection: { enabled: true },
      customer_email: customer.email || undefined,
      shipping_address_collection: { allowed_countries: SHIP_COUNTRIES },
      billing_address_collection: "auto",
      // Prices are GST-inclusive (Australian standard) so no Stripe Tax is added.
      allow_promotion_codes: false,
      success_url: `${SITE_URL}/order-confirmed.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cart.html`,
      metadata: {
        source: "decomuse-web",
        suburb: customer.suburb || "",
        postcode: customer.postcode || "",
        member_coupon: coupon || "",
      },
    });

    return jsonResponse(200, { url: session.url, id: session.id });
  } catch (err) {
    console.error("create-checkout-session error:", err.message);
    return jsonResponse(500, { error: err.message || "Payment could not be started." });
  }
};
