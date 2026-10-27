/* ============================================================
   Samira Home Decor — Cleaning booking availability (public)
   ------------------------------------------------------------
   GET /.netlify/functions/booking-availability?date=YYYY-MM-DD
   Returns which of the day's 3 start-time slots are already taken
   (pending OR confirmed). Never returns customer details — just
   the list of taken slot labels, so the calendar can grey them out.

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
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "no-store",
};
const json = (code, obj) => ({ statusCode: code, headers: CORS, body: JSON.stringify(obj) });

function openStore(name) {
  const siteID = process.env.SITE_ID || process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_API_TOKEN;
  return (siteID && token) ? getStore({ name, siteID, token }) : getStore(name);
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, {});
  if (event.httpMethod !== "GET") return json(405, { error: "Method Not Allowed" });

  const date = ((event.queryStringParameters || {}).date || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json(400, { error: "bad_date" });

  let taken = [];
  try {
    const store = openStore("cleaning-bookings");
    const day = await store.get(date, { type: "json" });
    if (day && day.slots) {
      taken = Object.keys(day.slots).filter((s) => {
        const b = day.slots[s];
        return b && ACTIVE.has(b.status);
      });
    }
  } catch (e) {
    // If storage is unavailable, fail open (no slots marked taken) rather than blocking bookings.
    taken = [];
  }

  return json(200, { ok: true, date, slots: SLOTS, taken });
};
