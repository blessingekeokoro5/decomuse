#!/usr/bin/env node
/* ============================================================
   DÉCOMUSE — Sitemap generator
   Reads js/data.js (PRODUCTS) and js/blog.js (POSTS) and writes
   sitemap.xml at the site root, using the canonical www host and
   only real, indexable pages (+ every product & blog article).

   Run whenever you add products or posts:
       node scripts/gen-sitemap.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE = "https://www.decomuse.com.au";
const root = path.resolve(__dirname, "..");

function load(file, exportName) {
  const code = fs.readFileSync(path.join(root, file), "utf8");
  const sandbox = { localStorage: { getItem: () => null }, console };
  vm.createContext(sandbox);
  vm.runInContext(code + `\n;globalThis.__X = (typeof ${exportName} !== "undefined") ? ${exportName} : null;`, sandbox, { filename: file });
  return sandbox.__X;
}

const PRODUCTS = load("js/data.js", "PRODUCTS") || [];
const POSTS = load("js/blog.js", "POSTS") || [];

// Real, indexable static pages (NOT cart/checkout/account/admin/order-confirmed).
const STATIC = [
  ["", 1.0], ["shop.html", 0.9], ["gift-cards.html", 0.7], ["hamper-maker.html", 0.6],
  ["hampers.html", 0.7], ["staging.html", 0.8], ["portfolio.html", 0.7], ["trade.html", 0.6],
  ["property-styling-staging.html", 0.7], ["interior-design.html", 0.7], ["vacation-rentals.html", 0.7],
  ["personal-shopping.html", 0.7], ["store-locator.html", 0.5], ["become-a-supplier.html", 0.6],
  ["rewards.html", 0.6], ["refer-a-friend.html", 0.6],
  ["stylist.html", 0.6], ["blog.html", 0.8], ["about.html", 0.6], ["contact.html", 0.6],
  ["support.html", 0.5], ["returns.html", 0.6], ["track.html", 0.4], ["wishlist.html", 0.3],
  ["policy.html?doc=faq", 0.4], ["policy.html?doc=delivery", 0.4], ["policy.html?doc=returns", 0.4],
  ["policy.html?doc=privacy", 0.3], ["policy.html?doc=terms", 0.3],
];

const esc = (s) => String(s).replace(/&/g, "&amp;");
const today = new Date().toISOString().slice(0, 10);
const url = (loc, priority) =>
  `  <url><loc>${esc(SITE + "/" + loc)}</loc><lastmod>${today}</lastmod><priority>${priority.toFixed(1)}</priority></url>`;

const rows = [];
STATIC.forEach(([loc, p]) => rows.push(url(loc, p)));
PRODUCTS.filter((p) => p && p.id).forEach((p) => rows.push(url("product.html?id=" + p.id, 0.8)));
POSTS.filter((p) => p && p.slug).forEach((p) => rows.push(url("article.html?post=" + p.slug, 0.6)));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), xml, "utf8");
console.log(`sitemap.xml written — ${rows.length} URLs (${PRODUCTS.length} products, ${POSTS.length} posts).`);
