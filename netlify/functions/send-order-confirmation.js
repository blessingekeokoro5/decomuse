/* ============================================================
   DecoMuse — Order Confirmation email  (Netlify Function, Brevo)
   ------------------------------------------------------------
   After checkout, emails the customer a branded order summary
   (order number, items, totals, delivery info), with a copy to
   the business inbox. Runs server-side only.

   Endpoint: /.netlify/functions/send-order-confirmation
   Required env var: BREVO_API_KEY = xkeysib-...
   Optional: SENDER_EMAIL, SENDER_NAME, BUSINESS_EMAIL, SITE_URL

   Frontend POSTs:
     { orderNo, email, name, total, shipping, date,
       items:[{ name, qty, price }] }
   ============================================================ */

const BREVO_API_KEY  = process.env.BREVO_API_KEY || "";
const SENDER_EMAIL   = process.env.SENDER_EMAIL || "decormuseofficial@outlook.com";
const SENDER_NAME    = process.env.SENDER_NAME || "DecoMuse";
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "decormuseofficial@outlook.com";
const SITE_URL       = process.env.SITE_URL || "https://www.decomuse.com.au";

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
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (n) => "$" + Number(n || 0).toFixed(2);

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return jsonResponse(200, {});
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });
  if (!BREVO_API_KEY) return jsonResponse(200, { ok: false, fallback: true, reason: "Email service not configured yet." });

  try {
    const o = JSON.parse(event.body || "{}");
    if (!o.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.email)) {
      return jsonResponse(400, { error: "A valid email is required." });
    }
    const items = Array.isArray(o.items) ? o.items : [];
    const shipping = Number(o.shipping || 0);
    const total = Number(o.total || 0);
    const sub = items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1), 0);

    const rows = items.map((it) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eaded5;color:#2C2623">${esc(it.name || "Item")}${(it.qty > 1) ? ` <span style="color:#8a7f77">× ${it.qty}</span>` : ""}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eaded5;text-align:right;color:#2C2623">${money((Number(it.price) || 0) * (Number(it.qty) || 1))}</td>
      </tr>`).join("");

    const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;color:#2C2623;padding:8px">
      <div style="text-align:center;padding:22px 0 6px">
        <div style="font-family:Georgia,serif;font-size:28px;font-weight:bold;letter-spacing:3px;color:#47563B">DecoMuse</div>
        <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a7f77">Home Décor Store</div>
      </div>
      <div style="background:#47563B;color:#fff;border-radius:14px;padding:26px 28px;text-align:center">
        <div style="font-size:22px;font-family:Georgia,serif">Thank you for your order! 🌿</div>
        <p style="color:#e7ecdf;margin:8px 0 0">Hi ${esc(o.name || "there")}, we've received your order and we're getting it ready.</p>
        <div style="margin-top:16px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#cdd6bf">Order</div>
        <div style="font-size:20px;font-weight:bold">${esc(o.orderNo || "")}</div>
        ${o.date ? `<div style="font-size:12px;color:#cdd6bf;margin-top:4px">${esc(o.date)}</div>` : ""}
      </div>

      ${items.length ? `
      <table role="presentation" width="100%" style="margin-top:22px;border-collapse:collapse">
        <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a7f77;padding-bottom:6px">Your items</td><td></td></tr>
        ${rows}
        <tr><td style="padding:12px 0 0;color:#5a5049">Subtotal</td><td style="padding:12px 0 0;text-align:right;color:#5a5049">${money(sub)}</td></tr>
        <tr><td style="padding:4px 0;color:#5a5049">Shipping</td><td style="padding:4px 0;text-align:right;color:#5a5049">${shipping === 0 ? "Free" : money(shipping)}</td></tr>
        <tr><td style="padding:8px 0;font-family:Georgia,serif;font-size:18px;font-weight:bold">Total</td><td style="padding:8px 0;text-align:right;font-family:Georgia,serif;font-size:18px;font-weight:bold">${money(total)}</td></tr>
        <tr><td colspan="2" style="font-size:11px;color:#8a7f77">Incl. GST ${money(total / 11)}</td></tr>
      </table>` : ""}

      <div style="background:#F6EEE8;border-radius:12px;padding:16px 18px;margin-top:20px;font-size:13px;color:#5a5049;line-height:1.6">
        📦 <strong>What's next?</strong> We'll pick, pack and dispatch your order — you can watch it live in <a href="${SITE_URL}/account.html" style="color:#A5586A">your account → Orders → Track order</a>, with an estimated arrival time.
      </div>

      <div style="text-align:center;margin:22px 0">
        <a href="${SITE_URL}/account.html" style="background:#B67280;color:#fff;text-decoration:none;padding:13px 28px;border-radius:30px;font-weight:bold">Track my order</a>
      </div>
      <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6">
        Need a hand? Just reply to this email or contact us at ${esc(BUSINESS_EMAIL)}.<br>
        Thank you for shopping with DecoMuse 💛
      </p>
    </div>`;

    const payload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: o.email, name: o.name || undefined }],
      bcc: [{ email: BUSINESS_EMAIL }],
      subject: `Your DecoMuse order ${o.orderNo || ""} is confirmed 🌿`,
      htmlContent: html,
    };

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text();
      return jsonResponse(502, { error: "Email service error.", detail });
    }
    return jsonResponse(200, { ok: true });
  } catch (err) {
    return jsonResponse(500, { error: err.message || "Unexpected error." });
  }
};
