#!/usr/bin/env node
/* ============================================================
   SAMIRA HOME DECOR — Convert product photos to WebP
   ------------------------------------------------------------
   Product photos are the heaviest thing the site serves, and on
   Netlify that weight is billed. WebP carries the same picture
   in roughly a third of the bytes.

     node scripts/to-webp.js            convert and delete the originals
     node scripts/to-webp.js --dry      report the saving, change nothing
     node scripts/to-webp.js --keep     convert but keep the originals

   Afterwards, run with --rewrite to repoint js/data.js and the
   fallback paths in the page code at the .webp files.
   ============================================================ */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "..", "assets", "products");
const MAX_WIDTH = 1400;
const QUALITY = 78;

const dry = process.argv.includes("--dry");
const keep = process.argv.includes("--keep");

async function main() {
  const files = fs.readdirSync(DIR).filter(f => /\.(jpe?g|png)$/i.test(f));
  let before = 0, after = 0, converted = 0, kept = 0, failed = [];
  const map = {};

  for (const f of files) {
    const src = path.join(DIR, f);
    const out = src.replace(/\.(jpe?g|png)$/i, ".webp");
    const size = fs.statSync(src).size;
    before += size;
    try {
      const buf = await sharp(src)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer();

      // Some of these photos are already compressed hard, and WebP would make
      // them bigger. Only swap when it genuinely saves something.
      if (buf.length < size * 0.9) {
        after += buf.length; converted++;
        map[f] = path.basename(out);
        if (!dry) { fs.writeFileSync(out, buf); if (!keep) fs.unlinkSync(src); }
      } else {
        after += size; kept++;
      }
    } catch (e) {
      failed.push(f + ": " + e.message);
      after += size;
    }
  }

  if (!dry) fs.writeFileSync(path.join(__dirname, "webp-map.json"), JSON.stringify(map, null, 1));
  const mb = n => (n / 1024 / 1024).toFixed(1) + "MB";
  console.log(`${files.length} photos: ${converted} converted, ${kept} left as they were`);
  console.log(`${mb(before)} -> ${mb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`);
  if (failed.length) console.log("failed:\n  " + failed.join("\n  "));
  if (dry) console.log("(dry run — nothing written)");
}

/* Repoint references, but only for the files that actually became WebP */
function rewrite() {
  const mapFile = path.join(__dirname, "webp-map.json");
  if (!fs.existsSync(mapFile)) return console.log("run the conversion first");
  const map = JSON.parse(fs.readFileSync(mapFile, "utf8"));
  const targets = ["js/data.js", "js/cart.js", "js/checkout.js", "product.html",
                   "cart.html", "ar.html", "stylist.html", "packaging.html", "scripts/gen-feed.js"];
  let total = 0;
  for (const rel of targets) {
    const file = path.join(__dirname, "..", rel);
    if (!fs.existsSync(file)) continue;
    let src = fs.readFileSync(file, "utf8"), n = 0;
    for (const [from, to] of Object.entries(map)) {
      const re = new RegExp("assets/products/" + from.replace(/\./g, "\\."), "g");
      const hits = src.match(re);
      if (hits) { src = src.replace(re, "assets/products/" + to); n += hits.length; }
    }
    if (n) { fs.writeFileSync(file, src); total += n; console.log(`  ${rel}: ${n} references`); }
  }
  console.log("repointed", total, "references");
}

if (process.argv.includes("--rewrite")) rewrite();
else main();
