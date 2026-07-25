/* ============================================================
   DecoMuse — Send Gift Card  (Netlify Function, Brevo)
   ------------------------------------------------------------
   After a gift card is purchased, emails the designed card
   (amount, reference code, barcode, message) to the recipient,
   with a copy to the business inbox. Runs on the server only.

   Endpoint (after deploy):
     /.netlify/functions/send-gift-card

   Required environment variable (set in Netlify dashboard):
     BREVO_API_KEY   = xkeysib-...
   Optional (same defaults as send-shopping-list):
     SENDER_EMAIL, SENDER_NAME, BUSINESS_EMAIL, SITE_URL

   The frontend (order-confirmed.html) POSTs one card:
     { code, amount, to, from, email, message }
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

// A simple visual barcode built from the code (decorative, matches the site card).
function barcodeHtml(code) {
  let bars = "";
  for (let i = 0; i < code.length; i++) {
    const c = code.charCodeAt(i);
    const w = (c % 4) + 1, g = (c % 3) + 1;
    bars += `<td style="width:${w}px;background:#2C2623;font-size:0;line-height:0">&nbsp;</td>`
         +  `<td style="width:${g}px;background:#ffffff;font-size:0;line-height:0">&nbsp;</td>`;
  }
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="height:38px;margin:0 auto"><tr>${bars}</tr></table>`;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return jsonResponse(200, {});
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });

  if (!BREVO_API_KEY) {
    return jsonResponse(200, { ok: false, fallback: true, reason: "Email service not configured yet." });
  }

  try {
    const { code, amount, to, from, email, message } = JSON.parse(event.body || "{}");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return jsonResponse(400, { error: "A valid recipient email is required." });
    }
    if (!code || !amount) return jsonResponse(400, { error: "Missing gift card details." });

    const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#2C2623;padding:8px">
      <p style="text-align:center;color:#8a7f77;margin:18px 0 8px">${from ? esc(from) + " has sent you a" : "You've received a"} DecoMuse gift card 🎁</p>

      <!-- The card -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-radius:20px;overflow:hidden;background:#A5586A;background:linear-gradient(140deg,#c07a88,#A5586A 55%,#7f3a49);color:#fff">
        <tr><td style="padding:28px 30px">
          <table role="presentation" width="100%"><tr>
            <td style="font-family:Georgia,serif;font-size:26px;font-weight:bold">DecoMuse</td>
            <td align="right" style="font-size:20px">🎁</td>
          </tr></table>
          <div style="letter-spacing:4px;text-transform:uppercase;font-size:11px;color:#ecd9ae;margin:22px 0 4px">Gift Card</div>
          <div style="font-family:Georgia,serif;font-size:46px;font-weight:bold;line-height:1">${money(amount)}</div>
          <div style="font-size:13px;margin-top:10px;color:#f7ecd6">
            ${to ? `<strong style="color:#f2e2bd">To</strong> ${esc(to)}` : ""}
            ${from ? `&nbsp;&nbsp;·&nbsp;&nbsp;<strong style="color:#f2e2bd">From</strong> ${esc(from)}` : ""}
          </div>
          <!-- barcode plate -->
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;background:#ffffff;border-radius:8px">
            <tr><td style="padding:9px 12px 6px">
              ${barcodeHtml(code)}
              <div style="font-family:monospace;letter-spacing:3px;font-size:12px;color:#2C2623;text-align:center;margin-top:5px">${esc(code)}</div>
            </td></tr>
          </table>
          <div style="text-align:right;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#f0dcb4;margin-top:10px">Redeemable on décor &amp; services · never expires</div>
        </td></tr>
      </table>

      ${message ? `<div style="background:#F6EEE8;border-radius:12px;padding:16px 18px;margin-top:18px;font-style:italic;color:#5a5049">“${esc(message)}”</div>` : ""}

      <div style="text-align:center;margin:24px 0">
        <a href="${SITE_URL}/shop.html" style="background:#B67280;color:#fff;text-decoration:none;padding:13px 28px;border-radius:30px;font-weight:bold">Start shopping</a>
      </div>
      <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6">
        Your gift card reference is <strong>${esc(code)}</strong>. Enter it at checkout to redeem.<br>
        Keep this email safe — it's your gift card. Questions? Reply to this email.
      </p>
    </div>`;

    const payload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email }],
      bcc: [{ email: BUSINESS_EMAIL }],
      subject: `🎁 Your DecoMuse gift card (${money(amount)})`,
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
