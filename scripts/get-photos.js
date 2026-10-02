#!/usr/bin/env node
/* ============================================================
   SAMIRA HOME DECOR — Product photo fetcher
   ------------------------------------------------------------
   Saves a product's photos into assets/products/ named the way
   js/data.js expects: <id>.jpg, <id>-2.jpg, <id>-3.jpg …

   Two ways to use it:

     1. From a supplier's product page (no saving by hand):
        node scripts/get-photos.js kw01 "https://supplier.com/the-product"

     2. From photos you already have in a folder (phone, email,
        downloads) — they're copied and renamed in name order:
        node scripts/get-photos.js kw01 ~/Desktop/kitchen-photos

   Options:
     --limit N   keep at most N photos (default 10)
     --dry       list what it found without saving anything

   It skips logos, icons, sprites and anything under 400px wide,
   and skips a photo it has already saved for that id.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "assets", "products");
const MIN_BYTES = 12 * 1024;           // anything smaller is an icon, not a photo
const JUNK = /(logo|icon|sprite|badge|avatar|placeholder|thumb-tiny|favicon|flag|payment|trustpilot|klarna|afterpay)/i;
const EXT_OK = { "image/jpeg": ".jpg", "image/jpg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/avif": ".avif" };

function parseArgs(argv) {
  const args = argv.slice(2).filter(a => a !== "--dry");
  return {
    id: args[0],
    source: args.slice(1).filter(a => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--limit")[0],
    limit: Number((argv.find(a => a.startsWith("--limit=")) || "").split("=")[1]) || 10,
    dry: argv.includes("--dry")
  };
}

/* ---- find the photo URLs on a product page ----
   Each candidate is scored, because a shop's page also carries menu
   art, banners and "you may also like" tiles. Structured data and the
   social preview describe THIS product, so they win; anything whose
   address looks like navigation furniture is pushed to the back. */
const NAV_HINT = /(categorisation|category|navigation|banner|hero-|menu|header|footer|related|recommend|cross-sell|you-may)/i;

function imageUrlsFrom(html, pageUrl) {
  const scored = new Map();                      // url -> score (highest wins)
  const slug = (() => {
    try { return new URL(pageUrl).pathname.split("/").filter(Boolean).pop() || ""; } catch { return ""; }
  })().replace(/\.[a-z]+$/i, "");
  const slugWords = slug.split(/[-_]/).filter(w => w.length > 3);

  const push = (u, score) => {
    if (!u) return;
    try { u = new URL(String(u).trim().replace(/&amp;/g, "&"), pageUrl).href; } catch { return; }
    if (!/^https?:/i.test(u) || JUNK.test(u)) return;
    if (NAV_HINT.test(u)) score -= 60;
    if (slugWords.some(w => u.toLowerCase().includes(w))) score += 25;
    if (/\/(product|products|media|gallery|items?)\//i.test(u)) score += 15;
    scored.set(u, Math.max(scored.get(u) ?? -Infinity, score));
  };

  // 1. Structured data — a shop describing this exact product
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (node, inProduct) => {
        if (!node) return;
        if (Array.isArray(node)) return node.forEach(n => walk(n, inProduct));
        if (typeof node === "object") {
          const isProduct = inProduct || /product/i.test(String(node["@type"] || ""));
          if (node.image) [].concat(node.image).forEach(i => push(typeof i === "string" ? i : i && i.url, isProduct ? 100 : 60));
          Object.values(node).forEach(v => walk(v, isProduct));
        }
      };
      walk(JSON.parse(m[1].trim()), false);
    } catch {}
  }

  // 2. Social preview — nearly always the main product shot
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image(?::secure_url)?|twitter:image)["'][^>]+content=["']([^"']+)["']/gi)) push(m[1], 90);

  // 3. Gallery <img> tags — largest candidate in each srcset
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const inGallery = /(gallery|carousel|product[-_]?image|media|zoom|main[-_]?image)/i.test(tag) ? 40 : 10;
    const srcset = (tag.match(/srcset=["']([^"']+)["']/i) || [])[1];
    if (srcset) {
      const best = srcset.split(",").map(x => x.trim().split(/\s+/))
        .map(([u, w]) => ({ u, w: parseInt(w) || 0 })).sort((a, b) => b.w - a.w)[0];
      if (best) push(best.u, inGallery + (best.w >= 800 ? 10 : 0));
    }
    push((tag.match(/\bsrc=["']([^"']+)["']/i) || [])[1], inGallery);
    push((tag.match(/data-(?:src|zoom-image|large_image|original)=["']([^"']+)["']/i) || [])[1], inGallery + 5);
  }

  return [...scored.entries()].sort((a, b) => b[1] - a[1]).map(([u]) => u);
}



/* ---- a Shopify shop will simply hand over the product ----
   Adding .json to a /products/ address returns the title, description,
   price and every gallery photo in order. Nothing to scrape. */
async function shopifyProduct(pageUrl) {
  let u;
  try { u = new URL(pageUrl); } catch { return null; }
  const m = u.pathname.match(/\/products\/([^\/?#]+)/);
  if (!m) return null;
  try {
    const res = await fetch(`${u.origin}/products/${m[1]}.json`, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } });
    if (!res.ok) return null;
    const { product } = await res.json();
    if (!product || !product.images) return null;
    return product;
  } catch { return null; }
}

function describeShopify(product) {
  const prices = [...new Set((product.variants || []).map(v => Number(v.price)).filter(Boolean))].sort((a, b) => a - b);
  const opts = (product.options || []).filter(o => o.name && o.name.toLowerCase() !== "title");
  const text = String(product.body_html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  console.log("\n  ── the shop's own details, to draft the listing from ──");
  console.log("  Title:   " + product.title);
  if (product.vendor) console.log("  Vendor:  " + product.vendor + "   (don't copy this onto the site)");
  if (prices.length) console.log("  Price:   " + (prices.length > 1 ? `$${prices[0]} – $${prices[prices.length - 1]}` : `$${prices[0]}`));
  opts.forEach(o => console.log(`  ${o.name}: ${(o.values || []).join(", ")}`));
  if (text) console.log("  Says:    " + text.slice(0, 400) + (text.length > 400 ? "…" : ""));
  console.log("  ──────────────────────────────────────────────────────\n");
}

/* ---- plan B: open the page in a real browser ----
   Many shops build the gallery with JavaScript, so the HTML holds only
   menu art. Here we let Chrome load the page, scroll it so lazy photos
   appear, and keep the images the page actually rendered at a decent
   size. Needs Google Chrome, which macOS ships in /Applications. */
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function renderedImageUrls(pageUrl) {
  if (!fs.existsSync(CHROME)) throw new Error("Google Chrome isn't installed, so the page can't be opened.");
  const { spawn } = require("child_process");
  const os = require("os");
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "photo-fetch-"));
  const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--mute-audio", "--no-first-run",
    "--remote-debugging-port=0", "--user-data-dir=" + profile, "--window-size=1400,1800", "about:blank"],
    { stdio: ["ignore", "ignore", "ignore"] });

  const portFile = path.join(profile, "DevToolsActivePort");
  let port = null;
  for (let i = 0; i < 80 && !port; i++) {
    await new Promise(r => setTimeout(r, 250));
    if (fs.existsSync(portFile)) port = fs.readFileSync(portFile, "utf8").split("\n")[0].trim();
  }
  if (!port) { chrome.kill(); throw new Error("Chrome didn't start."); }

  const stop = () => { try { chrome.kill(); } catch {} try { fs.rmSync(profile, { recursive: true, force: true }); } catch {} };
  try {
    const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    const ws = new WebSocket(targets.find(t => t.type === "page").webSocketDebuggerUrl);
    let id = 0; const pending = {};
    ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } };
    await new Promise(r => ws.onopen = r);
    const send = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
    const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result.result?.value;
    const wait = ms => new Promise(r => setTimeout(r, ms));

    await send("Page.enable"); await send("Runtime.enable");
    await send("Page.navigate", { url: pageUrl });
    await wait(4000);
    // scroll through so lazy-loaded gallery photos are fetched
    await ev(`(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,180));}window.scrollTo(0,0);})()`);
    await wait(2500);

    const shots = await ev(`JSON.stringify([...document.images]
      .filter(i => i.naturalWidth >= 500 && i.naturalHeight >= 500)
      .filter(i => !i.closest('header, nav, footer, aside, [class*="menu"], [class*="mega"], [id*="menu"]'))
      .filter(i => i.offsetParent !== null || i.closest('[class*="gallery"], [class*="carousel"], [class*="slider"]'))
      .map(i => ({ src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight })))`) || "[]";
    ws.close();
    // Keep the order the gallery itself uses — the first big photo is the
    // one the shop leads with, which is the one we want as the main image.
    const seen = new Set();
    return JSON.parse(shots)
      .filter(i => i.src && /^https?:/i.test(i.src) && !JUNK.test(i.src) && !NAV_HINT.test(i.src))
      .filter(i => { const k = i.src.split("?")[0]; if (seen.has(k)) return false; seen.add(k); return true; })
      .map(i => i.src);
  } finally { stop(); }
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
      "Accept": "text/html,image/*,*/*"
    },
    redirect: "follow"
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return { buf: Buffer.from(await res.arrayBuffer()), type: (res.headers.get("content-type") || "").split(";")[0].trim() };
}

/* ---- where the next photo for this id should be written ---- */
function nextName(id, n, ext) { return n === 1 ? `${id}${ext}` : `${id}-${n}${ext}`; }

function alreadySaved(id) {
  if (!fs.existsSync(OUT)) return [];
  return fs.readdirSync(OUT).filter(f => f === id + path.extname(f) || f.startsWith(id + "-"));
}

async function fromUrl(id, url, limit, dry) {
  process.stdout.write(`Opening ${url}\n`);
  let found = [], via = "";

  // Best case: the shop publishes the product itself.
  const product = await shopifyProduct(url);
  if (product) {
    found = product.images.map(i => i.src);
    via = "the shop's own product data";
  }

  // Most shops build the gallery with JavaScript, so load the page the way a
  // shopper sees it and take the photos it actually shows.
  if (!found.length) {
    try {
      found = await renderedImageUrls(url);
      via = "the page as it loads";
    } catch (e) { console.log("  (" + e.message + ")"); }
  }

  // Fall back to reading the HTML, which also catches photos the gallery
  // only reveals on a click.
  if (found.length < 2) {
    try {
      const { buf } = await fetchBuffer(url);
      const fromSource = imageUrlsFrom(buf.toString("utf8"), url);
      if (fromSource.length > found.length) { found = fromSource; via = "the page source"; }
    } catch (e) { console.log("  (couldn't read the page source: " + e.message + ")"); }
  }
  if (!found.length) {
    console.log("No photos found. Open the page, drag the photos into a folder,\n" +
                "then run this again with that folder instead of the address.");
    return;
  }
  console.log(`Found ${found.length} candidate photos via ${via}.`);

  const seen = new Set();
  let n = alreadySaved(id).length + 1, kept = 0;
  for (const u of found) {
    if (kept >= limit) break;
    try {
      const { buf: img, type } = await fetchBuffer(u);
      const ext = EXT_OK[type];
      if (!ext) continue;
      if (img.length < MIN_BYTES) continue;              // too small to be a product photo
      const key = img.length + ":" + img.slice(0, 64).toString("hex");
      if (seen.has(key)) continue;                        // same photo at another size
      seen.add(key);
      const name = nextName(id, n, ext);
      if (dry) console.log(`  would save ${name}  (${Math.round(img.length / 1024)}kb)  ${u}`);
      else { fs.writeFileSync(path.join(OUT, name), img); console.log(`  saved ${name}  (${Math.round(img.length / 1024)}kb)`); }
      n++; kept++;
    } catch { /* skip anything that won't download */ }
  }
  if (!kept) console.log("Nothing was big enough to be a product photo.");
  else console.log(`\n${dry ? "Would save" : "Saved"} ${kept} photo${kept === 1 ? "" : "s"} for ${id}.`);
  if (product) describeShopify(product);
}

function fromFolder(id, dir, limit, dry) {
  const files = fs.readdirSync(dir)
    .filter(f => /\.(jpe?g|png|webp|avif|heic)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  if (!files.length) return console.log("No photos in that folder.");
  let n = alreadySaved(id).length + 1, kept = 0;
  for (const f of files) {
    if (kept >= limit) break;
    const ext = path.extname(f).toLowerCase() === ".jpeg" ? ".jpg" : path.extname(f).toLowerCase();
    if (ext === ".heic") { console.log(`  skipped ${f} — convert HEIC to JPG first (open in Preview → Export)`); continue; }
    const name = nextName(id, n, ext);
    if (dry) console.log(`  would copy ${f} → ${name}`);
    else { fs.copyFileSync(path.join(dir, f), path.join(OUT, name)); console.log(`  ${f} → ${name}`); }
    n++; kept++;
  }
  console.log(`\n${dry ? "Would add" : "Added"} ${kept} photo${kept === 1 ? "" : "s"} for ${id}.`);
}

(async () => {
  const { id, source, limit, dry } = parseArgs(process.argv);
  if (!id || !source) {
    console.log("Usage:\n  node scripts/get-photos.js <id> <product-page-url>\n  node scripts/get-photos.js <id> <folder-of-photos>\n\nOptions: --limit=N   --dry");
    process.exit(1);
  }
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const existing = alreadySaved(id);
  if (existing.length) console.log(`Note: ${existing.length} photo(s) already saved for "${id}" — new ones are added after them.`);

  if (/^https?:\/\//i.test(source)) await fromUrl(id, source, limit, dry);
  else if (fs.existsSync(source) && fs.statSync(source).isDirectory()) fromFolder(id, source, limit, dry);
  else console.log("That's not a URL or a folder I can read: " + source);
})();
