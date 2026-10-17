/* ============================================================
   Samira Home Decor — Verify a one-time login code (OTP)
   ------------------------------------------------------------
   POST /.netlify/functions/auth-verify-code
   Body: { email, code }

   Checks the 6-digit code against the hash stored by
   auth-request-code. On success the code is consumed (deleted) and
   a signed session token is returned, proving the shopper owns the
   email. Max 5 wrong attempts per code, then it's invalidated.

   Env: optional AUTH_SECRET (falls back to BREVO_API_KEY).
   ============================================================ */

const crypto = require("crypto");
const { getStore } = require("@netlify/blobs");

const SECRET = process.env.AUTH_SECRET || process.env.BREVO_API_KEY || "samira-home-decor-fallback-secret";
const MAX_ATTEMPTS = 5;

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (code, obj) => ({ statusCode: code, headers: CORS, body: JSON.stringify(obj) });
const isEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(s || "").trim());
const hashCode = (code, email) => crypto.createHmac("sha256", SECRET).update(email + "|" + code).digest("hex");

function sameHash(a, b) {
  const ba = Buffer.from(String(a), "utf8"), bb = Buffer.from(String(b), "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

// Signed token: "<issuedAt>.<hmac(email|issuedAt)>" — proves email ownership.
function makeToken(email) {
  const issued = Date.now();
  const sig = crypto.createHmac("sha256", SECRET).update(email + "|" + issued).digest("hex");
  return issued + "." + sig;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method Not Allowed" });

  let b;
  try { b = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "bad_json" }); }
  const email = String(b.email || "").trim().toLowerCase();
  const code = String(b.code || "").trim();
  if (!isEmail(email)) return json(400, { error: "bad_email" });
  if (!/^\d{6}$/.test(code)) return json(400, { error: "bad_code" });

  let store;
  try { store = getStore("auth-codes"); }
  catch (e) { return json(500, { error: "storage_unavailable" }); }

  let rec = null;
  try { rec = await store.get(email, { type: "json" }); } catch (e) { rec = null; }
  if (!rec || !rec.codeHash) return json(400, { error: "no_code" });
  if (Date.now() > (rec.expires || 0)) {
    try { await store.delete(email); } catch (e) {}
    return json(400, { error: "expired" });
  }
  if ((rec.attempts || 0) >= MAX_ATTEMPTS) {
    try { await store.delete(email); } catch (e) {}
    return json(429, { error: "too_many_attempts" });
  }

  if (!sameHash(rec.codeHash, hashCode(code, email))) {
    rec.attempts = (rec.attempts || 0) + 1;
    try { await store.setJSON(email, rec); } catch (e) {}
    return json(401, { error: "wrong_code", remaining: Math.max(0, MAX_ATTEMPTS - rec.attempts) });
  }

  const name = rec.name || "";
  try { await store.delete(email); } catch (e) {}
  return json(200, { ok: true, email, name, token: makeToken(email) });
};
