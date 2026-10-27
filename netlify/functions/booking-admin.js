/* ============================================================
   Samira Home Decor — Manage cleaning bookings (admin only)
   ------------------------------------------------------------
   Protected by a secret token. Set BOOKING_ADMIN_TOKEN in your
   Netlify environment variables, then paste the same value once in
   the admin page's "Bookings" tab. Every request must send it as
   the header  x-admin-token.

   GET  /.netlify/functions/booking-admin
        → { ok:true, bookings:[ {id,status,date,slot,name,...} ] }

   POST /.netlify/functions/booking-admin
        Body: { action:"confirm"|"cancel", date, slot }
        - confirm → locks the slot (status "confirmed")
        - cancel  → removes the booking and frees the slot

   Storage: Netlify Blobs store "cleaning-bookings".
   ============================================================ */

const { getStore } = require("@netlify/blobs");

const TOKEN = process.env.BOOKING_ADMIN_TOKEN || "";

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-token",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Cache-Control": "no-store",
};
const json = (code, obj) => ({ statusCode: code, headers: CORS, body: JSON.stringify(obj) });

// Netlify isn't auto-injecting the Blobs context here, so configure it manually
// from the runtime env (SITE_ID + the function token Netlify provides).
function openStore(name) {
  const siteID = process.env.SITE_ID || process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_FUNCTIONS_TOKEN || process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_API_TOKEN;
  return (siteID && token) ? getStore({ name, siteID, token }) : getStore(name);
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, {});

  if (!TOKEN) return json(503, { error: "not_configured" });
  const sent = (event.headers && (event.headers["x-admin-token"] || event.headers["X-Admin-Token"])) || "";
  if (sent !== TOKEN) return json(401, { error: "unauthorized" });

  let store;
  try { store = openStore("cleaning-bookings"); }
  catch (e) { return json(500, { error: "storage_unavailable", detail: String((e && e.message) || e) }); }

  // ---- List all bookings ----
  if (event.httpMethod === "GET") {
    const out = [];
    try {
      const { blobs } = await store.list();
      for (const bl of blobs) {
        const day = await store.get(bl.key, { type: "json" });
        if (!day || !day.slots) continue;
        for (const slot of Object.keys(day.slots)) {
          const r = day.slots[slot];
          if (r) out.push(r);
        }
      }
    } catch (e) {
      return json(500, { error: "read_failed", detail: String((e && e.message) || e) });
    }
    out.sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot));
    return json(200, { ok: true, bookings: out });
  }

  // ---- Confirm or cancel ----
  if (event.httpMethod === "POST") {
    let b;
    try { b = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "bad_json" }); }
    const action = String(b.action || "").trim();
    const date = String(b.date || "").trim();
    const slot = String(b.slot || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json(400, { error: "bad_date" });
    if (action !== "confirm" && action !== "cancel") return json(400, { error: "bad_action" });

    for (let attempt = 0; attempt < 6; attempt++) {
      let cur = null;
      try { cur = await store.getWithMetadata(date, { type: "json" }); } catch (e) { cur = null; }
      if (!cur || !cur.data || !cur.data.slots || !cur.data.slots[slot]) return json(404, { error: "not_found" });

      const day = cur.data;
      if (action === "confirm") day.slots[slot].status = "confirmed";
      else delete day.slots[slot];

      let result;
      try { result = await store.setJSON(date, day, { onlyIfMatch: cur.etag }); }
      catch (e) { return json(500, { error: "write_failed" }); }

      if (result && result.modified === false) continue; // raced, retry
      return json(200, { ok: true });
    }
    return json(409, { error: "conflict" });
  }

  return json(405, { error: "Method Not Allowed" });
};
