/* ============================================================
   Samira Home Decor — Weekly subscriber email (scheduled)
   ------------------------------------------------------------
   Runs weekly, builds a branded "Samira Weekly" email with a few
   featured products, and sends it to the Brevo newsletter list as
   an email campaign (Brevo handles unsubscribe + bulk delivery).

   Required Netlify env vars:
     BREVO_API_KEY   (already set)
     BREVO_LIST_ID   (the Brevo contact-list id to send to)
   Optional: SENDER_EMAIL, SENDER_NAME, SITE_URL
   Schedule: Wednesday 22:30 UTC  ≈ Thursday ~9am Adelaide.
   ============================================================ */

const { schedule } = require("@netlify/functions");
const vm = require("vm");

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const SENDER_EMAIL  = process.env.SENDER_EMAIL || "hello@samirahomedecor.com.au";
const SENDER_NAME   = process.env.SENDER_NAME || "Samira Home Decor";
const SITE_URL      = process.env.SITE_URL || "https://samirahomedecor.com.au";
const LIST_ID       = parseInt(process.env.BREVO_LIST_ID || "0", 10);

const NAVY = "#0B1F3A", MID = "#061525", GOLD = "#C6A15B", CHAMP = "#E0C992",
      IVORY = "#F4EFE6", TAUPE = "#A89886", BODY = "#4B4540";

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (n) => "$" + Math.round(Number(n) || 0).toLocaleString("en-AU");

async function loadProducts() {
  try {
    const res = await fetch(SITE_URL + "/js/data.js", { headers: { "User-Agent": "SamiraWeekly/1.0" } });
    const code = await res.text();
    const sb = { localStorage: { getItem: () => null }, console, window: {}, document: undefined };
    vm.createContext(sb);
    vm.runInContext(code + "\n;globalThis.__P=(typeof PRODUCTS!=='undefined')?PRODUCTS:[];", sb, { timeout: 4000 });
    return sb.__P || [];
  } catch (e) { return []; }
}

function pickFeatured(PRODUCTS, n) {
  const withImg = PRODUCTS.filter(p => p && p.img && p.price && p.cat !== "Packaging");
  const ready = withImg.filter(p => p.supplier === "Luxo Living" && !p.lead);
  const news = withImg.filter(p => /new/i.test(p.tag || ""));
  let pool = ready.length >= n ? ready : (news.length >= n ? news : withImg);
  pool = pool.slice().sort(() => Math.random() - 0.5);
  return pool.slice(0, n);
}

function productCard(p) {
  const url = SITE_URL + "/product.html?id=" + encodeURIComponent(p.id);
  const img = SITE_URL + "/" + String(p.img).replace(/^\//, "");
  return `
    <td width="50%" valign="top" style="padding:8px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:#fff;border:1px solid ${IVORY};border-radius:14px;overflow:hidden">
        <tr><td style="padding:0"><a href="${url}"><img src="${img}" width="100%" alt="${esc(p.name)}" style="display:block;width:100%;height:180px;object-fit:cover"></a></td></tr>
        <tr><td style="padding:12px 14px;text-align:center">
          <div style="font:600 14px Georgia,serif;color:${NAVY};line-height:1.3;min-height:36px">${esc(p.name)}</div>
          <div style="color:${GOLD};font-weight:bold;font-size:15px;margin:6px 0 10px">${p.sizes && p.sizes.length ? "from " : ""}${money(p.price)}</div>
          <a href="${url}" style="display:inline-block;background:${NAVY};color:#fff;text-decoration:none;padding:9px 20px;border-radius:24px;font-size:12px;font-weight:bold">View item</a>
        </td></tr>
      </table>
    </td>`;
}

function buildHtml(featured) {
  const today = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
  const rows = [];
  for (let i = 0; i < featured.length; i += 2) {
    rows.push(`<tr>${productCard(featured[i])}${featured[i + 1] ? productCard(featured[i + 1]) : "<td width='50%'></td>"}</tr>`);
  }
  const grid = featured.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join("")}</table>`
    : "";

  const inner = `
    <div style="background:${NAVY};color:${CHAMP};text-align:center;padding:12px 16px;border-radius:12px;font-size:13px;font-weight:bold">
      THE SAMIRA WEEKLY · ${esc(today)}
    </div>
    <div style="text-align:center;padding:22px 0 8px">
      <div style="font-family:Georgia,serif;font-size:27px;font-weight:bold;color:${NAVY}">Samira Home Decor</div>
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${TAUPE};margin-top:4px">Home décor for every house</div>
    </div>
    <img src="${SITE_URL}/assets/hero.jpg" width="100%" alt="Styled living space" style="display:block;width:100%;border-radius:14px">
    <div style="background:${NAVY};border-radius:0 0 14px 14px;padding:22px;text-align:center;border-bottom:4px solid ${GOLD};margin-top:-6px">
      <div style="font:22px Georgia,serif;color:#fff">New week, fresh ideas for your home</div>
      <div style="color:${CHAMP};margin:6px 0 14px;font-size:14px">A handful of pieces we're loving right now</div>
      <a href="${SITE_URL}/shop.html" style="display:inline-block;background:${GOLD};color:${NAVY};text-decoration:none;padding:12px 28px;border-radius:30px;font-weight:bold;font-size:14px">Shop the collection</a>
    </div>
    <p style="color:${BODY};line-height:1.7;margin-top:22px">Hi there,</p>
    <p style="color:${BODY};line-height:1.7">Your home is where comfort and style meet. Each week we pick a few favourites to help you create a space that feels calm, considered and completely yours — carefully packed and delivered across Australia.</p>
    ${grid ? `<div style="font:bold 20px Georgia,serif;color:${NAVY};text-align:center;margin:26px 0 10px">You may also like</div>${grid}` : ""}
    <div style="text-align:center;margin:22px 0">
      <a href="${SITE_URL}/shop.html?avail=ready" style="display:inline-block;background:${NAVY};color:#fff;text-decoration:none;padding:12px 26px;border-radius:30px;font-weight:bold;font-size:14px">See what ships this week</a>
    </div>
    <p style="color:${BODY};line-height:1.7">Not quite ready? Save your favourites with the ♡ on any piece, or reply to this email — we're always happy to help you style a room.</p>
    <p style="color:${BODY};line-height:1.7;margin-top:10px">Warm wishes,<br><strong>The Samira Home Decor Team</strong></p>
    <!-- trust -->
    <div style="background:${NAVY};border-radius:14px;padding:18px 10px;margin:22px 0;border-bottom:4px solid ${GOLD};text-align:center;color:${CHAMP};font-size:12px;line-height:2">
      🇦🇺 Australian owned &nbsp; · &nbsp; 🔒 Secure checkout &nbsp; · &nbsp; 💳 Afterpay, Zip &amp; card &nbsp; · &nbsp; ↩️ Easy returns
    </div>
    <!-- footer -->
    <div style="background:${MID};border-radius:14px;padding:24px 22px;text-align:center">
      <div style="font-family:Georgia,serif;font-size:20px;letter-spacing:1px;color:#fff">Samira Home Decor</div>
      <div style="margin:12px 0 8px">
        <a href="https://www.instagram.com/samirahomedecor" style="color:${GOLD};text-decoration:none;font-size:12px">Instagram</a> <span style="color:${TAUPE}">·</span>
        <a href="https://www.facebook.com/share/17aCKqQ3ns/?mibextid=wwXIfr" style="color:${GOLD};text-decoration:none;font-size:12px">Facebook</a> <span style="color:${TAUPE}">·</span>
        <a href="https://www.tiktok.com/@sys_samira" style="color:${GOLD};text-decoration:none;font-size:12px">TikTok</a> <span style="color:${TAUPE}">·</span>
        <a href="https://www.youtube.com/@sys_samira" style="color:${GOLD};text-decoration:none;font-size:12px">YouTube</a>
      </div>
      <div style="color:${TAUPE};font-size:11px;line-height:1.7">© ${new Date().getFullYear()} Samira Home Decor · samirahomedecor.com.au<br>
      You're receiving this because you subscribed at samirahomedecor.com.au.<br>
      <a href="{{ unsubscribe }}" style="color:${TAUPE}">Unsubscribe</a></div>
    </div>`;

  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:${NAVY};padding:8px">${inner}</div>`;
}

async function brevo(path, method, body) {
  const res = await fetch("https://api.brevo.com/v3/" + path, {
    method,
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
}

const run = async () => {
  if (!BREVO_API_KEY || !LIST_ID) {
    console.log("weekly-email: skipped — BREVO_API_KEY or BREVO_LIST_ID not set.");
    return { statusCode: 200, body: "skipped (not configured)" };
  }
  const PRODUCTS = await loadProducts();
  const featured = pickFeatured(PRODUCTS, 4);
  const html = buildHtml(featured);
  const subjectPool = [
    "This week at Samira Home Decor ✦",
    "Fresh picks for your home this week",
    "New-week styling, handpicked for you",
    "Pieces we're loving right now ✦",
  ];
  const subject = subjectPool[Math.floor(Math.random() * subjectPool.length)];
  const name = "Samira Weekly — " + new Date().toISOString().slice(0, 10);

  try {
    const createRes = await brevo("emailCampaigns", "POST", {
      name, subject,
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      type: "classic",
      htmlContent: html,
      recipients: { listIds: [LIST_ID] },
    });
    if (!createRes.ok) {
      const t = await createRes.text().catch(() => "");
      console.log("weekly-email: create failed", createRes.status, t.slice(0, 300));
      return { statusCode: 200, body: "create failed" };
    }
    const { id } = await createRes.json();
    const sendRes = await brevo("emailCampaigns/" + id + "/sendNow", "POST");
    console.log("weekly-email: campaign", id, "sendNow status", sendRes.status, "featured", featured.length);
    return { statusCode: 200, body: "sent campaign " + id };
  } catch (e) {
    console.log("weekly-email: error", e.message);
    return { statusCode: 200, body: "error" };
  }
};

exports.handler = schedule("30 22 * * 3", run);
