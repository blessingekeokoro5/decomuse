/* ============================================================
   Samira Home Decor — Branded form submissions (Netlify Function, Brevo)
   ------------------------------------------------------------
   For any website form (Contact, Booking, Careers, Supplier,
   Reviews, etc.). Sends TWO branded (blue + gold) emails:
     1. A notification to the business inbox with every field,
        with Reply-To set to the customer so you can reply直接ly.
     2. A confirmation to the customer: "we've received your message".

   The frontend (js/main.js → deliverForm) POSTs this FIRST. If the
   key isn't set or Brevo errors, it returns {fallback:true} / an
   error so the frontend falls back to Web3Forms, then mailto —
   so a submission can never be lost.

   Endpoint (after deploy):
     /.netlify/functions/send-submission

   Required env var (set in Netlify):  BREVO_API_KEY
   Optional: SENDER_EMAIL, SENDER_NAME, BUSINESS_EMAIL, SITE_URL

   POST body:
     { subject, fields:[[label,value],...], replyto, name }
   ============================================================ */

const BREVO_API_KEY  = process.env.BREVO_API_KEY || "";
const SENDER_EMAIL   = process.env.SENDER_EMAIL || "hello@samirahomedecor.com.au";
const SENDER_NAME    = process.env.SENDER_NAME || "Samira Home Decor";
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "hello@samirahomedecor.com.au";
const SITE_URL       = process.env.SITE_URL || "https://samirahomedecor.com.au";

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
const isEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(s || ""));

// Shared branded header: blue banner + gold accent bar — matches the order email
function brandHeader(title, subtitle) {
  return `
    <div style="text-align:center;padding:22px 0 6px">
      <div style="font-family:Georgia,serif;font-size:28px;font-weight:bold;letter-spacing:3px;color:#14365F">Samira Home Decor</div>
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a7f77">Home décor for every house</div>
    </div>
    <div style="background:#14365F;color:#fff;border-radius:14px;padding:24px 28px;text-align:center;border-bottom:4px solid #C6A15B">
      <div style="font-size:22px;font-family:Georgia,serif">${esc(title)}</div>
      ${subtitle ? `<p style="color:#E0C992;margin:8px 0 0">${esc(subtitle)}</p>` : ""}
    </div>`;
}

const wrap = (inner, maxw) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;max-width:${maxw || 560}px;margin:0 auto;color:#0B1F3A;padding:8px">${inner}</div>`;

async function sendBrevo(payload) {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload),
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return jsonResponse(200, {});
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });

  // No key yet → tell the frontend to fall back to Web3Forms.
  if (!BREVO_API_KEY) return jsonResponse(200, { ok: false, fallback: true, reason: "Email service not configured yet." });

  try {
    const data = JSON.parse(event.body || "{}");
    const subject = data.subject || "New website enquiry — Samira Home Decor";
    let fields = Array.isArray(data.fields) ? data.fields : [];
    // Accept either [[k,v]...] or a plain object {k:v}
    if (!fields.length && data.fields && typeof data.fields === "object") fields = Object.entries(data.fields);
    fields = fields.filter((p) => Array.isArray(p) && p[0] != null && String(p[1] == null ? "" : p[1]).trim() !== "");

    // Derive customer email / name from the submitted fields if not given explicitly
    const replyto = data.replyto || (fields.find((p) => /e-?mail/i.test(p[0])) || [])[1] || "";
    const name = data.name || (fields.find((p) => /name/i.test(p[0])) || [])[1] || "";

    // ---- 1) Business notification (branded) ----
    const rows = fields.map(([k, v]) => `
      <tr>
        <td style="padding:10px 14px 10px 0;border-bottom:1px solid #eee;color:#8a7f77;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#0B1F3A;font-size:14px;white-space:pre-wrap">${esc(v)}</td>
      </tr>`).join("");

    const bizHtml = wrap(`
      ${brandHeader("New website submission", subject)}
      <table role="presentation" width="100%" style="margin-top:20px;border-collapse:collapse">${rows}</table>
      <div style="background:#F6EEE8;border-radius:12px;padding:14px 18px;margin-top:20px;font-size:13px;color:#5a5049;line-height:1.6">
        📩 ${replyto ? `Reply straight to this email to respond to <strong>${esc(replyto)}</strong>.` : "Submitted via the Samira Home Decor website."}
      </div>
      <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6;margin-top:18px">Sent from the Samira Home Decor website · samirahomedecor.com.au</p>
    `);

    const bizPayload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: BUSINESS_EMAIL }],
      subject,
      htmlContent: bizHtml,
    };
    if (isEmail(replyto)) bizPayload.replyTo = { email: replyto, name: name || undefined };

    const bizRes = await sendBrevo(bizPayload);
    if (!bizRes.ok) {
      const detail = await bizRes.text();
      // Let the frontend fall back to Web3Forms so the enquiry is never lost.
      return jsonResponse(502, { error: "Email service error.", detail, fallback: true });
    }

    // ---- 2) Customer confirmation (branded) — best effort ----
    if (isEmail(replyto)) {
      const custHtml = wrap(`
        ${brandHeader("We've received your message ✦", "")}
        <p style="color:#5a5049;line-height:1.7;margin-top:20px">Hi${name ? " " + esc(name) : ""},</p>
        <p style="color:#5a5049;line-height:1.7">Thank you for reaching out to <strong>Samira Home Decor</strong>. We've received your message and a member of our Australian-based team will get back to you <strong>within 2 business hours</strong> (during business days).</p>
        <p style="color:#5a5049;line-height:1.7">In the meantime, feel free to keep exploring our collection.</p>
        <div style="text-align:center;margin:24px 0">
          <a href="${SITE_URL}/shop.html" style="background:#C6A15B;color:#fff;text-decoration:none;padding:13px 28px;border-radius:30px;font-weight:bold">Browse the shop</a>
        </div>
        <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6">If you didn't contact us, you can ignore this email.<br>Warm regards, The Samira Home Decor team 💛</p>
      `);
      try {
        await sendBrevo({
          sender: { name: SENDER_NAME, email: SENDER_EMAIL },
          to: [{ email: replyto, name: name || undefined }],
          replyTo: { email: BUSINESS_EMAIL, name: SENDER_NAME },
          subject: "We've received your message — Samira Home Decor",
          htmlContent: custHtml,
        });
      } catch (e) { /* confirmation is best-effort; business copy already sent */ }
    }

    return jsonResponse(200, { ok: true });
  } catch (err) {
    return jsonResponse(500, { error: err.message || "Unexpected error.", fallback: true });
  }
};
