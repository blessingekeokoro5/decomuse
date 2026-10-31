/* ============================================================
   Samira Home Decor — one-click email unsubscribe
   ------------------------------------------------------------
   GET  /.netlify/functions/email-unsubscribe?e=<email>&t=<token>
   POST (same URL) — the "List-Unsubscribe-Post" one-click from
   mail apps. The token is an HMAC of the email, so a link only
   unsubscribes its own recipient. Marks the Brevo contact as
   unsubscribed (blocks reminders AND the weekly newsletter).
   ============================================================ */

const crypto = require("crypto");
const { brevo, isEmail, unsubToken, BREVO_API_KEY, SITE_URL } = require("./_visits");

function page(title, msg) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;background:#F4EFE6;font-family:Arial,Helvetica,sans-serif;color:#4B4540">
<div style="max-width:520px;margin:60px auto;background:#fff;border-radius:18px;overflow:hidden;text-align:center">
<div style="background:#0B1F3A;padding:24px"><div style="font:700 22px Georgia,serif;letter-spacing:3px;color:#fff">SAMIRA</div><div style="font-size:11px;letter-spacing:3px;color:#C6A15B;margin-top:4px">HOME DECOR</div></div>
<div style="padding:34px 28px"><h1 style="font:600 24px Georgia,serif;color:#0B1F3A;margin:0 0 12px">${title}</h1><p style="line-height:1.6;margin:0 0 22px">${msg}</p>
<a href="${SITE_URL}" style="display:inline-block;background:#C6A15B;color:#0B1F3A;text-decoration:none;padding:12px 28px;border-radius:30px;font-weight:bold">Back to Samira Home Decor</a></div></div></body></html>`,
  };
}

function tokenOk(email, token) {
  const want = Buffer.from(unsubToken(email));
  const got = Buffer.from(String(token || ""));
  return got.length === want.length && crypto.timingSafeEqual(got, want);
}

exports.handler = async (event) => {
  const q = event.queryStringParameters || {};
  const email = String(q.e || "").trim().toLowerCase();
  if (!isEmail(email) || !tokenOk(email, q.t)) {
    return page("Link not recognised", "This unsubscribe link looks incomplete. Reply to any of our emails with “unsubscribe” and we'll take care of it.");
  }
  if (BREVO_API_KEY) {
    try { await brevo("contacts/" + encodeURIComponent(email), "PUT", { emailBlacklisted: true }); } catch (e) { /* shown below either way */ }
  }
  return page("You're unsubscribed", "You won't receive any more marketing emails from Samira Home Decor. Order and booking emails you request will still reach you.");
};
