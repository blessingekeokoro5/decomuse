/* ============================================================
   DecoMuse — Send Shopping List  (Netlify Function, Brevo)
   ------------------------------------------------------------
   Emails a shopper their saved shopping list *from* the DecoMuse
   business address, and blind-copies the business inbox so you
   see every list that goes out. Runs on the server only.

   Endpoint (after deploy):
     /.netlify/functions/send-shopping-list

   Required environment variable (set in Netlify dashboard):
     BREVO_API_KEY   = xkeysib-...   (Brevo → SMTP & API → API keys)

   Optional environment variables:
     SENDER_EMAIL    = decormuseofficial@outlook.com  (must be a
                       VERIFIED sender in Brevo → Senders)
     SENDER_NAME     = DecoMuse
     BUSINESS_EMAIL  = decormuseofficial@outlook.com  (gets a bcc)
     SITE_URL        = https://www.decomuse.com.au

   The frontend (js/cart.js → emailMyBag) POSTs:
     { to, items:[{name,qty,price,colour,size,id}], subtotal }
   ============================================================ */

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const SENDER_EMAIL  = process.env.SENDER_EMAIL || "decormuseofficial@outlook.com";
const SENDER_NAME   = process.env.SENDER_NAME || "DecoMuse";
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "decormuseofficial@outlook.com";
const SITE_URL = process.env.SITE_URL || "https://www.decomuse.com.au";

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

  // If the key isn't set yet, tell the frontend to fall back to mailto.
  if (!BREVO_API_KEY) {
    return jsonResponse(200, { ok: false, fallback: true, reason: "Email service not configured yet." });
  }

  try {
    const { to, items = [], subtotal } = JSON.parse(event.body || "{}");
    if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) {
      return jsonResponse(400, { error: "A valid email address is required." });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return jsonResponse(400, { error: "Your shopping list is empty." });
    }

    const rows = items.map((i) => {
      const variant = [i.colour, i.size].filter(Boolean).join(", ");
      const link = SITE_URL + "/product.html?id=" + encodeURIComponent(i.id || "");
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee">
          <a href="${link}" style="color:#A5586A;text-decoration:none;font-weight:600">${esc(i.name)}</a>
          ${variant ? `<div style="color:#8a7f77;font-size:13px">${esc(variant)}</div>` : ""}
          <div style="color:#8a7f77;font-size:13px">Qty ${parseInt(i.qty, 10) || 1}</div>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${money((i.price || 0) * (parseInt(i.qty, 10) || 1))}</td>
      </tr>`;
    }).join("");

    const total = subtotal != null ? subtotal
      : items.reduce((s, i) => s + (i.price || 0) * (parseInt(i.qty, 10) || 1), 0);

    const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#2C2623">
      <div style="text-align:center;padding:24px 0">
        <h1 style="font-family:Georgia,serif;color:#A5586A;margin:0">DecoMuse</h1>
        <p style="color:#8a7f77;margin:6px 0 0">Your saved shopping list 🛍️</p>
      </div>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <table style="width:100%;border-collapse:collapse;margin-top:8px">
        <tr><td style="padding:12px 0;font-weight:700">Subtotal</td>
            <td style="padding:12px 0;text-align:right;font-weight:700">${money(total)}</td></tr>
      </table>
      <div style="text-align:center;margin:26px 0">
        <a href="${SITE_URL}/shop.html" style="background:#B67280;color:#fff;text-decoration:none;padding:13px 26px;border-radius:30px;font-weight:600">Return to your list</a>
      </div>
      <p style="color:#8a7f77;font-size:12px;text-align:center">Prices and availability may change. Free shipping on orders over $500, Australia-wide.</p>
    </div>`;

    const payload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: to }],
      bcc: [{ email: BUSINESS_EMAIL }],
      subject: "Your DecoMuse shopping list",
      htmlContent: html,
    };

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
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
