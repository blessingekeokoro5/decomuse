/* ============================================================
   DecoMuse — Add Product  (Netlify Function, GitHub commit)
   ------------------------------------------------------------
   The admin "Products" tab POSTs a new product (+ photos). This
   function verifies the admin password, then commits the product
   into js/data.js and the photos into assets/products/ in the
   GitHub repo. Netlify auto-deploys, so the product goes live.

   Endpoint: /.netlify/functions/add-product
   Required env vars (set in Netlify → Site config → Environment):
     GITHUB_TOKEN = a fine-grained PAT for the repo, Contents: Read+Write
     ADMIN_KEY    = your admin password (must match what's typed in admin)
   Optional env vars (sensible defaults for this site):
     GH_OWNER  = blessingekeokoro5
     GH_REPO   = decomuse
     GH_BRANCH = main

   Frontend POSTs JSON:
     { password, product:{ name, cat, room, price, memberPrice, desc,
       colours:[".."], sizes:[".."], tag }, images:[dataURL, ...] }
   ============================================================ */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const ADMIN_KEY    = process.env.ADMIN_KEY || "";
const OWNER  = process.env.GH_OWNER  || "blessingekeokoro5";
const REPO   = process.env.GH_REPO   || "decomuse";
const BRANCH = process.env.GH_BRANCH || "main";
const DATA_PATH = "js/data.js";
const SENTINEL = "/* @@NEW_PRODUCTS@@";

function json(statusCode, obj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(obj),
  };
}

const COLOUR_HEX = {
  red: "#7c1c26", pink: "#e9c3cb", blush: "#e8c9c0", white: "#f2efe9", cream: "#efe9df",
  black: "#171512", grey: "#9a958c", gray: "#9a958c", charcoal: "#2e2a24", brown: "#5b4636",
  espresso: "#3b2f2a", tan: "#a9743f", camel: "#b08968", khaki: "#b3a37a", beige: "#d9c7a8",
  sand: "#d9cbb3", stone: "#c9bfae", navy: "#232f4d", blue: "#9fb2c4", "dusty blue": "#9fb2c4",
  green: "#b9c7a8", sage: "#b9c7a8", "forest green": "#33513a", emerald: "#0f5a3c", olive: "#6b6b47",
  gold: "#c6a15b", terracotta: "#c85b1c", orange: "#d5843a", ivory: "#f2ece0", champagne: "#e4d2ad",
};
function hexFor(name) {
  const k = String(name || "").trim().toLowerCase();
  return COLOUR_HEX[k] || "#c9bfae";
}

async function gh(path, opts = {}) {
  const res = await fetch("https://api.github.com" + path, {
    ...opts,
    headers: {
      "Authorization": "Bearer " + GITHUB_TOKEN,
      "Accept": "application/vnd.github+json",
      "User-Agent": "decomuse-admin",
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let data; try { data = text ? JSON.parse(text) : {}; } catch (e) { data = { raw: text }; }
  if (!res.ok) {
    const msg = (data && data.message) ? data.message : ("GitHub API " + res.status);
    throw new Error(msg);
  }
  return data;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { ok: false, error: "Method not allowed" });

  if (!GITHUB_TOKEN || !ADMIN_KEY) {
    return json(500, { ok: false, error: "Server not configured. Ask your developer to set GITHUB_TOKEN and ADMIN_KEY in Netlify." });
  }

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { ok: false, error: "Bad request." }); }

  // --- Auth (server-side) ---
  if (!body.password || String(body.password) !== String(ADMIN_KEY)) {
    return json(401, { ok: false, error: "Incorrect admin password." });
  }

  const p = body.product || {};
  const name = String(p.name || "").trim();
  if (!name) return json(400, { ok: false, error: "Product name is required." });
  const price = Number(p.price);
  if (!price || price <= 0) return json(400, { ok: false, error: "A valid price is required." });

  const images = Array.isArray(body.images) ? body.images.filter(Boolean).slice(0, 10) : [];

  try {
    // 1. Current ref + base tree
    const ref = await gh(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
    const headSha = ref.object.sha;
    const headCommit = await gh(`/repos/${OWNER}/${REPO}/git/commits/${headSha}`);
    const baseTree = headCommit.tree.sha;

    // 2. Read current data.js
    const fileMeta = await gh(`/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(DATA_PATH)}?ref=${BRANCH}`);
    const dataText = Buffer.from(fileMeta.content, "base64").toString("utf8");

    // 3. Work out next SKU + id
    let maxSku = 10100;
    (dataText.match(/DM-(\d+)/g) || []).forEach((s) => {
      const n = parseInt(s.replace("DM-", ""), 10);
      if (n > maxSku) maxSku = n;
    });
    const nextSku = "DM-" + (maxSku + 1);
    const id = "p" + (maxSku + 1);

    // 4. Prepare image file paths (commit later)
    const imgFiles = [];
    images.forEach((dataUrl, i) => {
      const m = /^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/.exec(String(dataUrl));
      if (!m) return;
      let ext = m[1].toLowerCase(); if (ext === "jpeg") ext = "jpg";
      if (!["jpg", "png", "webp"].includes(ext)) ext = "jpg";
      const fname = "assets/products/" + id + (i === 0 ? "" : "-" + (i + 1)) + "." + ext;
      imgFiles.push({ path: fname, base64: m[2] });
    });
    const imgPaths = imgFiles.map((f) => f.path);

    // 5. Build product object
    const colours = (Array.isArray(p.colours) ? p.colours : String(p.colours || "").split(","))
      .map((c) => String(c).trim()).filter(Boolean)
      .map((cn) => ({ name: cn, hex: hexFor(cn) }));
    const sizes = (Array.isArray(p.sizes) ? p.sizes : String(p.sizes || "").split(","))
      .map((s) => String(s).trim()).filter(Boolean);

    const product = { id, name, cat: String(p.cat || "Home Décor") };
    if (p.room) product.room = String(p.room).trim();
    product.price = price;
    if (p.memberPrice && Number(p.memberPrice) > 0) product.memberPrice = Number(p.memberPrice);
    product.sku = nextSku;
    if (p.tag) product.tag = String(p.tag).trim();
    product.ph = "";
    if (imgPaths.length) { product.img = imgPaths[0]; product.imgs = imgPaths; }
    if (colours.length) product.colours = colours;
    if (sizes.length) product.sizes = sizes;
    product.desc = String(p.desc || name).trim();

    const productLine = "  " + JSON.stringify(product) + ",";

    // 6. Insert into data.js at the sentinel (fallback: after "const PRODUCTS = [")
    let newDataText;
    const sIdx = dataText.indexOf(SENTINEL);
    if (sIdx !== -1) {
      const eol = dataText.indexOf("\n", sIdx);
      const cut = eol === -1 ? dataText.length : eol + 1;
      newDataText = dataText.slice(0, cut) + productLine + "\n" + dataText.slice(cut);
    } else {
      const anchor = "const PRODUCTS = [";
      const aIdx = dataText.indexOf(anchor);
      if (aIdx === -1) throw new Error("Could not locate the product list in data.js.");
      const cut = aIdx + anchor.length;
      newDataText = dataText.slice(0, cut) + "\n" + productLine + dataText.slice(cut);
    }

    // 7. Create blobs for images
    const treeItems = [{ path: DATA_PATH, mode: "100644", type: "blob", content: newDataText }];
    for (const f of imgFiles) {
      const blob = await gh(`/repos/${OWNER}/${REPO}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: f.base64, encoding: "base64" }),
      });
      treeItems.push({ path: f.path, mode: "100644", type: "blob", sha: blob.sha });
    }

    // 8. Create tree, commit, update ref
    const tree = await gh(`/repos/${OWNER}/${REPO}/git/trees`, {
      method: "POST",
      body: JSON.stringify({ base_tree: baseTree, tree: treeItems }),
    });
    const commit = await gh(`/repos/${OWNER}/${REPO}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: `Admin: add product "${name}" (${nextSku})`,
        tree: tree.sha,
        parents: [headSha],
      }),
    });
    await gh(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha }),
    });

    return json(200, { ok: true, id, sku: nextSku, images: imgPaths.length, commit: commit.sha });
  } catch (err) {
    return json(500, { ok: false, error: (err && err.message) || "Something went wrong publishing the product." });
  }
};
