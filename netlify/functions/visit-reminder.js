/* ============================================================
   Samira Home Decor — "Come back" reminder email (scheduled daily)
   ------------------------------------------------------------
   Emails newsletter subscribers who browsed the site 1–3 days ago,
   showing the pieces they looked at (at today's prices, including
   any live sale) with a link back to the site.

   Who gets it: contacts in BREVO_LIST_ID who are not unsubscribed,
   whose LAST_VISIT (set by track-visit) was 1–3 days ago, and who
   haven't had a reminder for that visit or in the last 7 days.
   Every email has a one-click unsubscribe link and the business
   postal address (Spam Act 2003).

   Needs: BREVO_API_KEY, BREVO_LIST_ID. Optional: SENDER_EMAIL,
   SENDER_NAME, SITE_URL. Schedule: daily 23:30 UTC ≈ 10am Adelaide.
   ============================================================ */

const vm = require("vm");
const { brevo, ensureAttrs, adelaideToday, daysBetween, unsubLink, BREVO_API_KEY, LIST_ID, SITE_URL } = require("./_visits");

const SENDER_EMAIL = process.env.SENDER_EMAIL || "hello@samirahomedecor.com.au";
const SENDER_NAME = process.env.SENDER_NAME || "Samira Home Decor";
const MAX_PER_RUN = 300;

const NAVY = "#0B1F3A", GOLD = "#C6A15B", IVORY = "#F4EFE6", TAUPE = "#A89886", BODY = "#4B4540";
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (n) => "$" + Math.round(Number(n) || 0).toLocaleString("en-AU");

// Load the live catalogue WITH today's sales applied (a stub `document` lets the
// browser-only sale code in data.js run), plus which sale is on right now.
async function loadShop() {
  try {
    const res = await fetch(SITE_URL + "/js/data.js", { headers: { "User-Agent": "SamiraReminder/1.0" } });
    const code = await res.text();
    const sb = { localStorage: { getItem: () => null }, console, window: {}, document: {} };
    vm.createContext(sb);
    vm.runInContext(code + `
;globalThis.__P = (typeof PRODUCTS !== "undefined") ? PRODUCTS : [];
globalThis.__SALE = (typeof halloweenOn === "function" && halloweenOn()) ? "halloween"
  : (typeof blackFridayOn === "function" && blackFridayOn()) ? "blackfriday" : "";`, sb, { timeout: 4000 });
    return { products: sb.__P || [], sale: sb.__SALE || "" };
  } catch (e) { return { products: [], sale: "" }; }
}

function productCard(p) {
  const url = SITE_URL + "/product.html?id=" + encodeURIComponent(p.id);
  const img = SITE_URL + "/" + String(p.img || "").replace(/^\//, "");
  const price = p.was
    ? `<span style="color:${TAUPE};text-decoration:line-through;font-weight:normal;margin-right:6px">${money(p.was)}</span>${money(p.price)}`
    : `${p.sizes && p.sizes.length ? "from " : ""}${money(p.price)}`;
  return `
    <td width="50%" valign="top" style="padding:8px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:#fff;border:1px solid ${IVORY};border-radius:14px;overflow:hidden">
        <tr><td style="padding:0"><a href="${url}"><img src="${img}" width="100%" alt="${esc(p.name)}" style="display:block;width:100%;height:180px;object-fit:cover"></a></td></tr>
        <tr><td style="padding:12px 14px;text-align:center">
          <div style="font:600 14px Georgia,serif;color:${NAVY};line-height:1.3;min-height:36px">${esc(p.name)}</div>
          <div style="color:${GOLD};font-weight:bold;font-size:15px;margin:6px 0 10px">${price}</div>
          <a href="${url}" style="display:inline-block;background:${NAVY};color:#fff;text-decoration:none;padding:9px 20px;border-radius:24px;font-size:12px;font-weight:bold">View item</a>
        </td></tr>
      </table>
    </td>`;
}

function buildEmail(items, sale, fromViews, unsub) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) rows.push(`<tr>${productCard(items[i])}${items[i + 1] ? productCard(items[i + 1]) : '<td width="50%"></td>'}</tr>`);
  const saleBanner = sale === "halloween"
    ? `<tr><td style="background:#1a0f2e;color:#fff;text-align:center;padding:14px 20px;font-size:15px">🎃 <b style="color:#F39A4A">Halloween sale</b> — 15% off storewide, ends Sunday 2 Nov</td></tr>`
    : sale === "blackfriday"
      ? `<tr><td style="background:${NAVY};color:#fff;text-align:center;padding:14px 20px;font-size:15px">🛍️ <b style="color:${GOLD}">Black Friday</b> — 15% off selected furniture, now through Cyber Monday</td></tr>`
      : "";
  const intro = fromViews
    ? "You were browsing a few beautiful pieces on Samira Home Decor. They're still here, saved below, whenever you're ready."
    : "It was lovely to see you on Samira Home Decor. Here are a few pieces our customers are loving right now.";
  return `<!doctype html><html><body style="margin:0;background:${IVORY};font-family:Arial,Helvetica,sans-serif;color:${BODY}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY}"><tr><td align="center" style="padding:24px 12px">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:18px;overflow:hidden">
      <tr><td style="background:${NAVY};text-align:center;padding:26px 20px">
        <div style="font:700 22px Georgia,serif;letter-spacing:3px;color:#fff">SAMIRA</div>
        <div style="font-size:11px;letter-spacing:3px;color:${GOLD};margin-top:4px">HOME DECOR</div>
      </td></tr>
      ${saleBanner}
      <tr><td style="padding:30px 28px 8px;text-align:center">
        <div style="font:600 26px Georgia,serif;color:${NAVY}">Still thinking it over?</div>
        <p style="font-size:15px;line-height:1.6;margin:12px 0 0">${intro}</p>
      </td></tr>
      <tr><td style="padding:12px 18px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join("")}</table></td></tr>
      <tr><td style="text-align:center;padding:8px 28px 30px">
        <a href="${SITE_URL}/shop.html" style="display:inline-block;background:${GOLD};color:${NAVY};text-decoration:none;padding:14px 32px;border-radius:30px;font-weight:bold;font-size:14px;letter-spacing:1px">CONTINUE SHOPPING →</a>
      </td></tr>
      <tr><td style="background:${IVORY};text-align:center;padding:20px;font-size:12px;color:${TAUPE};line-height:1.6">
        Samira Home Decor · PO Box 109, Klemzig, SA 5087, Australia<br>
        You're receiving this because you subscribed to Samira Home Decor emails.<br>
        <a href="${unsub}" style="color:${TAUPE}">Unsubscribe</a>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

async function listContacts() {
  const out = [];
  for (let offset = 0; offset < 50000; offset += 500) {
    const r = await brevo(`contacts/lists/${LIST_ID}/contacts?limit=500&offset=${offset}`);
    const batch = (r.ok && r.data && r.data.contacts) || [];
    out.push(...batch);
    if (batch.length < 500) break;
  }
  return out;
}

exports.handler = async () => {
  if (!BREVO_API_KEY || !LIST_ID) {
    console.log("visit-reminder: skipped — BREVO_API_KEY or BREVO_LIST_ID not set.");
    return { statusCode: 200, body: "skipped" };
  }
  await ensureAttrs();
  const today = adelaideToday();

  const due = (await listContacts()).filter((c) => {
    const a = c.attributes || {};
    if (c.emailBlacklisted || !a.LAST_VISIT) return false;
    const since = daysBetween(a.LAST_VISIT, today);
    if (!(since >= 1 && since <= 3)) return false;
    if (a.LAST_REMINDER) {
      if (daysBetween(a.LAST_VISIT, a.LAST_REMINDER) >= 0) return false; // already reminded for this visit
      if (daysBetween(a.LAST_REMINDER, today) < 7) return false;         // at most one a week
    }
    return true;
  }).slice(0, MAX_PER_RUN);

  if (!due.length) { console.log("visit-reminder: nobody due today."); return { statusCode: 200, body: "none due" }; }

  const { products, sale } = await loadShop();
  const byId = {};
  products.forEach((p) => { if (p && p.id) byId[p.id] = p; });
  const sellable = (p) => p && p.img && typeof p.price === "number" && p.cat !== "Packaging";
  // For visitors who didn't open a product: ready-to-ship favourites first.
  // (Not by "New" tag — live sales overwrite tags with the sale name.)
  const pool = products.filter(sellable);
  const fallback = (pool.filter((p) => p.fastShip && !p.lead).length >= 4 ? pool.filter((p) => p.fastShip && !p.lead) : pool)
    .slice().sort(() => Math.random() - 0.5).slice(0, 4);

  let sent = 0;
  for (const c of due) {
    const viewed = String((c.attributes || {}).LAST_VIEWED || "").split(",").map((id) => byId[id.trim()]).filter(sellable);
    const items = viewed.length ? viewed : fallback;
    if (!items.length) continue;
    const subject = sale === "halloween" ? "🎃 Your picks are 15% off this weekend — Samira Home Decor"
      : sale === "blackfriday" ? "🛍️ Black Friday savings on your picks — Samira Home Decor"
      : "Still thinking it over? Your picks are waiting ✦";
    const unsub = unsubLink(c.email);
    const r = await brevo("smtp/email", "POST", {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: c.email }],
      subject,
      htmlContent: buildEmail(items, sale, viewed.length > 0, unsub),
      headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    });
    if (r.ok) {
      sent++;
      await brevo("contacts/" + encodeURIComponent(c.email), "PUT", { attributes: { LAST_REMINDER: today } });
    } else {
      console.log("visit-reminder: send failed for a contact:", r.status, r.data && r.data.message);
    }
  }
  console.log(`visit-reminder: sent ${sent} of ${due.length} due.`);
  return { statusCode: 200, body: `sent ${sent}` };
};
