/* ============================================================
   DecoMuse — Send Forms to a recipient  (Netlify Function, Brevo)
   ------------------------------------------------------------
   The admin selects a bundle / forms and a recipient; this emails
   the recipient secure links to complete their forms online, with
   a copy to the business inbox.

   Endpoint: /.netlify/functions/send-forms
   Env var:  BREVO_API_KEY = xkeysib-...   (set in Netlify)
   Optional: SENDER_EMAIL, SENDER_NAME, BUSINESS_EMAIL, SITE_URL

   Frontend POSTs: { name, email, message, kind, forms:[{title,url}] }
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

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return jsonResponse(200, {});
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });

  if (!BREVO_API_KEY) {
    return jsonResponse(200, { ok: false, fallback: true, reason: "Email service not configured yet." });
  }

  try {
    const { name, email, message, kind, forms } = JSON.parse(event.body || "{}");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return jsonResponse(400, { error: "A valid recipient email is required." });
    }
    if (!Array.isArray(forms) || !forms.length) {
      return jsonResponse(400, { error: "No forms selected." });
    }

    const heading = kind === "employee" ? "Your onboarding forms" : "Your forms from DecoMuse";
    const rows = forms.map((f) =>
      `<tr><td style="padding:10px 0;border-bottom:1px solid #eee">
        <a href="${esc(f.url)}" style="color:#A5586A;font-weight:bold;text-decoration:none;font-size:15px">${esc(f.title)} →</a>
      </td></tr>`).join("");

    const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#2C2623;padding:8px">
      <div style="text-align:center;font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#47563B;margin:14px 0 4px">DecoMuse</div>
      <h2 style="text-align:center;color:#2C2623;font-size:20px;margin:0 0 6px">${esc(heading)}</h2>
      <p style="color:#5a5049;line-height:1.6">Hi${name ? " " + esc(name) : ""},</p>
      <p style="color:#5a5049;line-height:1.6">${message ? esc(message) : "Please complete the form(s) below at your convenience. Just click each link, fill it in and submit, it only takes a few minutes and you can sign right on screen."}</p>
      <table role="presentation" width="100%" style="margin:14px 0 6px">${rows}</table>
      <p style="color:#8a7f77;font-size:12px;line-height:1.6;margin-top:18px">If you have any questions, just reply to this email. Warm regards,<br>The DecoMuse team · <a href="${SITE_URL}" style="color:#A5586A">decomuse.com.au</a></p>
    </div>`;

    const payload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email, name: name || undefined }],
      bcc: [{ email: BUSINESS_EMAIL }],
      replyTo: { email: BUSINESS_EMAIL, name: SENDER_NAME },
      subject: `${heading} — DecoMuse`,
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
