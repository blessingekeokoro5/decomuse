/* ============================================================
   Samira Home Decor — shared helpers for visit tracking and the
   "come back" reminder email.
   ------------------------------------------------------------
   Visits are stored on the shopper's existing Brevo contact as
   three custom attributes (created automatically on first use):
     LAST_VISIT     date  — last day they browsed the site
     LAST_VIEWED    text  — up to 3 product ids they viewed, comma-separated
     LAST_REMINDER  date  — last day we sent them a reminder
   Only people already in Brevo (newsletter subscribers) are ever
   updated or emailed; anonymous visitors are never stored.
   ============================================================ */

const crypto = require("crypto");

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const LIST_ID = parseInt(process.env.BREVO_LIST_ID || "0", 10);
const SITE_URL = process.env.SITE_URL || "https://samirahomedecor.com.au";

async function brevo(path, method, body) {
  const res = await fetch("https://api.brevo.com/v3/" + path, {
    method: method || "GET",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch (e) { /* 204 No Content */ }
  return { ok: res.ok, status: res.status, data };
}

// Create the custom contact attributes once per cold start (Brevo returns an
// error if one already exists, which is fine and ignored).
let attrsReady = false;
async function ensureAttrs() {
  if (attrsReady || !BREVO_API_KEY) return;
  const want = [["LAST_VISIT", "date"], ["LAST_VIEWED", "text"], ["LAST_REMINDER", "date"]];
  await Promise.all(want.map(([name, type]) =>
    brevo("contacts/attributes/normal/" + name, "POST", { type }).catch(() => null)));
  attrsReady = true;
}

// Today's date in Adelaide as YYYY-MM-DD (the format Brevo date attributes use).
function adelaideToday() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Adelaide" });
}
function daysBetween(fromYmd, toYmd) {
  const a = Date.parse(String(fromYmd).slice(0, 10) + "T00:00:00Z");
  const b = Date.parse(String(toYmd).slice(0, 10) + "T00:00:00Z");
  return (isFinite(a) && isFinite(b)) ? Math.round((b - a) / 86400000) : NaN;
}

const isEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(s || "").trim());

// Signed one-click unsubscribe link, so nobody can unsubscribe someone else.
function unsubToken(email) {
  const secret = process.env.AUTH_SECRET || process.env.ADMIN_SECRET || BREVO_API_KEY || "samira";
  return crypto.createHmac("sha256", secret).update(String(email).trim().toLowerCase()).digest("hex").slice(0, 32);
}
function unsubLink(email) {
  return SITE_URL + "/.netlify/functions/email-unsubscribe?e=" + encodeURIComponent(email) + "&t=" + unsubToken(email);
}

module.exports = { brevo, ensureAttrs, adelaideToday, daysBetween, isEmail, unsubToken, unsubLink, BREVO_API_KEY, LIST_ID, SITE_URL };
