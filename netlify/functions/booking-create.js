/* ============================================================
   Samira Home Decor — Create a cleaning booking (public)
   ------------------------------------------------------------
   POST /.netlify/functions/booking-create
   Body: { date, slot, name, mobile, email, suburb, clean_type, notes }

   Reserves a start-time slot on a date as status "pending" so no
   one else can request it. Uses Netlify Blobs conditional writes
   (etag / onlyIfNew) so two people can't grab the same slot in a
   race. Returns 409 { error:"slot_taken" } if already booked.

   Branded notification/confirmation emails are still sent by the
   existing send-submission function (the frontend calls it after a
   successful reservation), so this function only handles storage.

   Storage: Netlify Blobs store "cleaning-bookings", one blob per
   date (key = YYYY-MM-DD) holding { slots: { "<label>": {...} } }.
   ============================================================ */

const { getStore } = require("@netlify/blobs");

const SLOTS = ["9:00 AM", "12:00 PM", "3:00 PM"];
const ACTIVE = new Set(["pending", "confirmed"]);

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (code, obj) => ({ statusCode: code, headers: CORS, body: JSON.stringify(obj) });

function openStore(name) {
  const siteID = process.env.SITE_ID || process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_API_TOKEN;
  return (siteID && token) ? getStore({ name, siteID, token }) : getStore(name);
}

const isEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(s || "").trim());
const clean = (s, max = 400) => String(s == null ? "" : s).trim().slice(0, max);

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method Not Allowed" });

  let b;
  try { b = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "bad_json" }); }

  const date = clean(b.date, 10);
  const slot = clean(b.slot, 20);
  const name = clean(b.name, 120);
  const mobile = clean(b.mobile, 40);
  const email = clean(b.email, 160);
  const suburb = clean(b.suburb, 160);
  const clean_type = clean(b.clean_type, 80);
  const notes = clean(b.notes, 1000);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json(400, { error: "bad_date" });
  if (!SLOTS.includes(slot)) return json(400, { error: "bad_slot" });
  // Closed Sundays
  if (new Date(date + "T00:00:00").getDay() === 0) return json(400, { error: "closed_sunday" });
  if (!name || !mobile || !suburb || !isEmail(email)) return json(400, { error: "missing_fields" });

  const record = {
    id: "bk_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    status: "pending",
    date, slot, name, mobile, email, suburb, clean_type, notes,
    created: new Date().toISOString(),
  };

  let store;
  try { store = openStore("cleaning-bookings"); }
  catch (e) { return json(500, { error: "storage_unavailable" }); }

  // Optimistic-concurrency loop: read, check the slot is free, write only if
  // nothing changed underneath us. Retry a few times on a race.
  for (let attempt = 0; attempt < 6; attempt++) {
    let cur = null;
    try { cur = await store.getWithMetadata(date, { type: "json" }); } catch (e) { cur = null; }
    const day = (cur && cur.data) || { slots: {} };
    if (!day.slots) day.slots = {};

    const existing = day.slots[slot];
    if (existing && ACTIVE.has(existing.status)) return json(409, { error: "slot_taken" });

    day.slots[slot] = record;

    let result;
    try {
      if (cur && cur.etag) result = await store.setJSON(date, day, { onlyIfMatch: cur.etag });
      else result = await store.setJSON(date, day, { onlyIfNew: true });
    } catch (e) {
      return json(500, { error: "write_failed" });
    }

    // modified === false means the precondition failed (someone wrote first) → retry.
    if (result && result.modified === false) continue;
    return json(200, { ok: true, id: record.id });
  }

  return json(409, { error: "conflict" });
};
