/* ============================================================
   Samira Home Decor — record a subscriber's visit (POST)
   ------------------------------------------------------------
   Called by the site when a visitor whose email we already know
   (they subscribed, or are logged in) browses. Stamps LAST_VISIT
   and the products they recently viewed on their EXISTING Brevo
   contact. Never creates a contact, so only people who opted in
   can ever be reminded. Always answers { ok: true } so the page
   can't be used to probe who is subscribed.
   Body: { email, viewed: ["productId", ...] }
   ============================================================ */

const { brevo, ensureAttrs, adelaideToday, isEmail, BREVO_API_KEY } = require("./_visits");
const CATALOGUE = require("./_catalogue.json");

const ok = () => ({ statusCode: 200, headers: { "Content-Type": "application/json" }, body: '{"ok":true}' });

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  if (!BREVO_API_KEY) return ok();

  let data = {};
  try { data = JSON.parse(event.body || "{}"); } catch (e) { return ok(); }
  const email = String(data.email || "").trim().toLowerCase();
  if (!isEmail(email)) return ok();

  // Keep only real catalogue product ids (max 3), so nothing odd gets stored.
  const viewed = (Array.isArray(data.viewed) ? data.viewed : [])
    .map(String).filter((id) => CATALOGUE.products[id]).slice(0, 3);

  const attributes = { LAST_VISIT: adelaideToday() };
  if (viewed.length) attributes.LAST_VIEWED = viewed.join(",");

  try {
    await ensureAttrs();
    // PUT only updates an existing contact; a 404 just means "not a subscriber".
    await brevo("contacts/" + encodeURIComponent(email), "PUT", { attributes });
  } catch (e) { /* best effort */ }
  return ok();
};
