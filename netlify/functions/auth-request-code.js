/* ============================================================
   Samira Home Decor — Send a one-time login code (OTP)
   ------------------------------------------------------------
   POST /.netlify/functions/auth-request-code
   Body: { email, name? }

   Generates a 6-digit code, stores a HASH of it in Netlify Blobs
   (store "auth-codes", key = lowercased email) with a 10-minute
   expiry, and emails the code to the shopper via Brevo. The plain
   code is never stored. Rate-limited to 5 sends per 15 minutes per
   email. Always responds { ok:true } for a well-formed email so the
   endpoint can't be used to probe who has an account.

   Env: BREVO_API_KEY (required). Optional: AUTH_SECRET (used to hash
   codes; falls back to BREVO_API_KEY so no extra setup is needed),
   SENDER_EMAIL, SENDER_NAME.
   ============================================================ */

const crypto = require("crypto");
const { getStore } = require("@netlify/blobs");

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "hello@samirahomedecor.com.au";
const SENDER_NAME = process.env.SENDER_NAME || "Samira Home Decor";
const SECRET = process.env.AUTH_SECRET || BREVO_API_KEY || "samira-home-decor-fallback-secret";

const TTL_MS = 10 * 60 * 1000;      // code valid 10 minutes
const WINDOW_MS = 15 * 60 * 1000;   // rate-limit window
const MAX_SENDS = 5;                // max codes per window

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (code, obj) => ({ statusCode: code, headers: CORS, body: JSON.stringify(obj) });
const isEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(s || "").trim());
const hashCode = (code, email) => crypto.createHmac("sha256", SECRET).update(email + "|" + code).digest("hex");

function codeEmail(code, name) {
  const NAVY = "#0B1F3A", GOLD = "#C6A15B", IVORY = "#F4EFE6", TAUPE = "#A89886";
  const hi = name ? `Hi ${name},` : "Hi there,";
  return `<!DOCTYPE html><html><body style="margin:0;background:${IVORY};font-family:Arial,Helvetica,sans-serif;color:${NAVY}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY};padding:28px 0">
      <tr><td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px -18px rgba(11,31,58,.5)">
          <tr><td style="background:${NAVY};padding:26px 32px;text-align:center">
            <div style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#fff;letter-spacing:.02em">Samira Home Decor</div>
            <div style="font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:${GOLD};margin-top:6px">Your login code</div>
          </td></tr>
          <tr><td style="padding:30px 32px 10px">
            <p style="margin:0 0 14px;font-size:15px;line-height:1.6">${hi}</p>
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4a5568">Use this code to sign in to your Samira Home Decor account:</p>
            <div style="text-align:center;margin:0 0 20px">
              <div style="display:inline-block;background:${IVORY};border:1px dashed ${GOLD};border-radius:12px;padding:18px 30px;font-family:'Courier New',monospace;font-size:34px;font-weight:700;letter-spacing:.34em;color:${NAVY}">${code}</div>
            </div>
            <p style="margin:0 0 6px;font-size:13px;line-height:1.6;color:${TAUPE};text-align:center">This code expires in 10 minutes.</p>
            <p style="margin:0 0 22px;font-size:13px;line-height:1.6;color:${TAUPE};text-align:center">Didn't try to sign in? You can safely ignore this email.</p>
          </td></tr>
          <tr><td style="padding:16px 32px 26px;border-top:1px solid #eee;text-align:center">
            <div style="font-size:12px;color:${TAUPE}">Samira Home Decor · samirahomedecor.com.au</div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method Not Allowed" });
  if (!BREVO_API_KEY) return json(503, { error: "email_not_configured" });

  let b;
  try { b = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "bad_json" }); }
  const email = String(b.email || "").trim().toLowerCase();
  const name = String(b.name || "").trim().slice(0, 80);
  if (!isEmail(email)) return json(400, { error: "bad_email" });

  let store;
  try { store = getStore("auth-codes"); }
  catch (e) { return json(500, { error: "storage_unavailable" }); }

  const now = Date.now();
  let rec = null;
  try { rec = await store.get(email, { type: "json" }); } catch (e) { rec = null; }
  let sends = (rec && Array.isArray(rec.sends) ? rec.sends : []).filter((t) => now - t < WINDOW_MS);
  if (sends.length >= MAX_SENDS) return json(429, { error: "too_many_requests" });

  const code = String(crypto.randomInt(0, 1000000)).padStart(6, "0");
  sends.push(now);
  const value = { codeHash: hashCode(code, email), expires: now + TTL_MS, attempts: 0, sends, name };

  try { await store.setJSON(email, value); }
  catch (e) { return json(500, { error: "write_failed" }); }

  try {
    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email, name: name || undefined }],
        subject: `Your Samira Home Decor login code: ${code}`,
        htmlContent: codeEmail(code, name),
      }),
    });
    if (!r.ok) { const t = await r.text().catch(() => ""); return json(502, { error: "send_failed", detail: t.slice(0, 200) }); }
  } catch (e) {
    return json(502, { error: "send_failed" });
  }

  return json(200, { ok: true });
};
