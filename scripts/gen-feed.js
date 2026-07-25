#!/usr/bin/env node
/* ============================================================
   DÉCOMUSE — Google Shopping feed generator
   Reads js/data.js (the single source of truth) and writes
   feed.xml at the site root — a valid Google Merchant Center
   product feed (RSS 2.0 with the g: namespace).

   Run it whenever you add or change products:
       node scripts/gen-feed.js

   Then submit https://www.decomuse.com.au/feed.xml in
   Google Merchant Center (Products → Feeds → scheduled fetch).
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE = "https://www.decomuse.com.au";
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "js", "data.js");

// Load js/data.js in a sandbox (browser-only calls like localStorage
// are wrapped in try/catch inside the file, so they no-op here).
const code = fs.readFileSync(dataPath, "utf8");
const sandbox = { localStorage: { getItem: () => null }, console };
vm.createContext(sandbox);
// Run the data file, then export the top-level consts onto the sandbox
// (vm does not attach `const`/`let` bindings to the context object).
vm.runInContext(code + "\n;globalThis.__PRODUCTS = PRODUCTS; globalThis.__DECOMUSE = DECOMUSE;", sandbox, { filename: "data.js" });

const PRODUCTS = sandbox.__PRODUCTS || [];
const BRAND = (sandbox.__DECOMUSE && sandbox.__DECOMUSE.brand) || "DecoMuse";

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
    <g:shipping>
      <g:country>AU</g:country>
      <g:service>Standard</g:service>
      <g:price>19.00 AUD</g:price>
    </g:shipping>
${extras.join("\n")}
  </item>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>DecoMuse — Home Décor, Lifestyle &amp; Fragrance</title>
  <link>${SITE}</link>
  <description>Curated pieces for elevated living. Shipped Australia-wide.</description>
${items.join("\n")}
</channel>
</rss>
`;

fs.writeFileSync(path.join(root, "feed.xml"), xml, "utf8");
console.log(`feed.xml written — ${items.length} products.`);
