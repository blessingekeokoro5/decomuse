/* ============================================================
   DecoMuse — email the shop (shared helper)
   ------------------------------------------------------------
   Used for orders that never pass through Stripe's webhook, such
   as an order paid entirely with a gift card. Silently does
   nothing when WEB3FORMS_KEY isn't configured, so a missing key
   can never block an order.
   ============================================================ */

async function emailShop(subject, body) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) { console.warn("WEB3FORMS_KEY not set — shop email skipped:", subject); return false; }
  const to = process.env.ORDER_EMAIL || "Decormuseofficial@outlook.com";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject,
        from_name: "DecoMuse Store",
        email: to,
        message: body,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Shop email failed:", err.message);
    return false;
  }
}

module.exports = { emailShop };
