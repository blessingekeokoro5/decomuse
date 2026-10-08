#!/usr/bin/env node
/* ============================================================
   SAMIRA HOME DECOR — Google Shopping feed generator
   Reads js/data.js (the single source of truth) and writes
   feed.xml at the site root — a valid Google Merchant Center
   product feed (RSS 2.0 with the g: namespace).

   Run it whenever you add or change products:
       node scripts/gen-feed.js

   Then submit https://samirahomedecor.com.au/feed.xml in
   Google Merchant Center (Products → Feeds → scheduled fetch).
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE = "https://samirahomedecor.com.au";
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "js", "data.js");

// Load js/data.js in a sandbox (browser-only calls like localStorage
// are wrapped in try/catch inside the file, so they no-op here).
const code = fs.readFileSync(dataPath, "utf8");
const sandbox = { localStorage: { getItem: () => null }, console };
vm.createContext(sandbox);
// Run the data file, then export the top-level consts onto the sandbox
// (vm does not attach `const`/`let` bindings to the context object).
vm.runInContext(code + "\n;globalThis.__PRODUCTS = PRODUCTS; globalThis.__SAMIRA = SAMIRA;", sandbox, { filename: "data.js" });

const PRODUCTS = sandbox.__PRODUCTS || [];
const BRAND = (sandbox.__SAMIRA && sandbox.__SAMIRA.brand) || "Samira Home Decor";

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Lowest price for products sold in per-size variants; else base price.
function basePrice(p) {
  if (Array.isArray(p.sizes) && p.sizes.length) {
    return Math.min.apply(null, p.sizes.map((s) => s.price));
  }
  return p.price;
}
function imgUrl(p) {
  const src = p.img || (Array.isArray(p.imgs) && p.imgs[0]) || ("assets/products/" + p.id + ".png");
  return SITE + "/" + src.replace(/^\//, "");
}

// Estimated shipping weight (kg). Uses a real weight when the product has one
// (p.weight like "12 kg"); otherwise estimates from the item type, material
// keywords in the name, size, and category. Coarse but good enough to land in
// the right weight-based shipping tier. Fill p.weight to override any item.
function parseKg(s) { const m = String(s == null ? "" : s).match(/([\d.]+)\s*kg/i); return m ? parseFloat(m[1]) : null; }
function estimateWeight(p) {
  const real = parseKg(p.weight); if (real) return real;
  const n = (p.name || "").toLowerCase();
  const TYPE = [
    [/\bsofa|lounge suite|modular lounge\b/, 45],
    [/console|sideboard|buffet|cabinet|tv unit|tv cabinet|bookcase|bookshelf|shelv|wardrobe|dresser|tallboy|chest of/, 30],
    [/coffee table|dining table|\bdesk\b|table set|dining set/, 25],
    [/bed frame|bed base|headboard|\bbed\b/, 40],
    [/armchair|accent chair|occasional chair|swivel chair|tub chair|lounge chair|recliner/, 18],
    [/dining chair|\bchair\b|stool|bench|ottoman|pouf/, 8],
    [/side table|end table|bedside|nightstand/, 9],
    [/mirror/, 6],
    [/\brug\b|runner|floor mat/, 8],
    [/floor lamp|standing lamp/, 6],
    [/chandelier|pendant|ceiling light|wall light|\blight\b|\blamp\b/, 3],
    [/cushion|throw|pillow|\bcover\b|quilt|blanket|duvet|linen|sheet|towel/, 0.6],
    [/vase|planter|\bpot\b|bowl|\bjug\b|urn|canister/, 1.5],
    [/candle|diffuser|fragrance|perfume|incense/, 0.5],
    [/tray|clock|photo frame|\bframe\b|ornament|sculpture|figurine|bookend|\bhook\b/, 1.2],
    [/basket|storage box|hamper/, 1.5],
  ];
  let base = null;
  for (const [re, w] of TYPE) { if (re.test(n)) { base = w; break; } }
  if (base == null) {
    const CAT = { "Furniture": 18, "Home Décor": 1.5, "Lifestyle": 0.8, "Kitchen & Dining": 1.5, "Kitchenware": 1.8, "Bedroom & Bath": 0.9, "Fragrance": 0.5, "Health & Wellness": 0.4, "Gifts": 1.0, "Travel Essentials": 0.8, "Outdoor": 12, "Office": 10, "Bathroom": 5 };
    base = CAT[p.cat] != null ? CAT[p.cat] : 1.5;
  }
  let f = 1;
  if (/marble|stone|slate|granite|concrete|terrazzo|travertine|cast iron|ceramic|stoneware/.test(n)) f = 1.6;
  else if (/bamboo|rattan|wicker|cane|paper|seagrass|jute|linen|cotton|foam/.test(n)) f = 0.65;
  else if (/glass/.test(n)) f = 1.15;
  else if (/metal|steel|\biron\b|aluminium|aluminum|brass/.test(n)) f = 1.25;
  else if (/timber|\boak\b|walnut|\bwood\b|solid wood|mango|acacia/.test(n)) f = 1.1;
  let w = base * f;
  // Light, bounded size nudge when dimensions are known (bigger => a bit heavier).
  const d = p.dims || {};
  const maxd = Math.max(Number(d.w) || 0, Number(d.h) || 0, Number(d.d) || 0);
  if (maxd) { const typ = base >= 15 ? 120 : base >= 5 ? 60 : 30; w *= Math.min(1.8, Math.max(0.6, maxd / typ)); }
  w = Math.max(0.2, Math.min(80, w));
  return Math.round(w * 10) / 10;
}
// Google product category (taxonomy) — broad mapping by our category.
function googleCat(cat) {
  const map = {
    "Home Décor": "Home & Garden > Decor",
    "Lifestyle": "Home & Garden > Household Supplies",
    "Fragrance": "Health & Beauty > Personal Care > Cosmetics > Bath & Body",
    "Health & Wellness": "Health & Beauty > Personal Care"
  };
  return map[cat] || "Home & Garden > Decor";
}

const items = PRODUCTS.filter((p) => p && p.id && p.sku).map((p) => {
  const price = basePrice(p).toFixed(2);
  const desc = (p.desc || p.name).replace(/\s+/g, " ").trim();
  const extras = [];
  if (Array.isArray(p.colours) && p.colours.length) {
    extras.push(`    <g:color>${esc(p.colours.map((c) => c.name).join("/"))}</g:color>`);
  }
  if (p.memberPrice != null) {
    // Member price advertised as a sale price.
    extras.push(`    <g:sale_price>${Number(p.memberPrice).toFixed(2)} AUD</g:sale_price>`);
  }
  return `  <item>
    <g:id>${esc(p.sku)}</g:id>
    <g:title>${esc(p.name)}</g:title>
    <g:description>${esc(desc)}</g:description>
    <g:link>${SITE}/product.html?id=${esc(p.id)}</g:link>
    <g:image_link>${esc(imgUrl(p))}</g:image_link>
    <g:availability>in_stock</g:availability>
    <g:condition>new</g:condition>
    <g:price>${price} AUD</g:price>
    <g:brand>${esc(BRAND)}</g:brand>
    <g:mpn>${esc(p.sku)}</g:mpn>
    <g:identifier_exists>no</g:identifier_exists>
    <g:google_product_category>${esc(googleCat(p.cat))}</g:google_product_category>
    <g:product_type>${esc(p.cat)}</g:product_type>
    <g:shipping_weight>${estimateWeight(p)} kg</g:shipping_weight>
${extras.join("\n")}
  </item>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Samira Home Decor — Home Décor, Lifestyle &amp; Fragrance</title>
  <link>${SITE}</link>
  <description>Curated pieces for elevated living. Shipped Australia-wide.</description>
${items.join("\n")}
</channel>
</rss>
`;

fs.writeFileSync(path.join(root, "feed.xml"), xml, "utf8");
console.log(`feed.xml written — ${items.length} products.`);
