/* ============================================================
   Samira Home Decor — shared shipping-weight estimator
   Used by gen-feed.js (Google feed) and gen-catalogue.js (the
   trusted server catalogue) so every surface agrees on weight.
   A browser copy lives in js/checkout.js (keep them in sync).

   Returns an estimated shipping weight in kg. Uses a real
   p.weight when present ("12 kg"); otherwise estimates from the
   item type, material keywords in the name, size and category.
   ============================================================ */
function parseKg(s) { const m = String(s == null ? "" : s).match(/([\d.]+)\s*kg/i); return m ? parseFloat(m[1]) : null; }

function estimateWeight(p) {
  if (!p) return 1.5;
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
  const d = p.dims || {};
  const maxd = Math.max(Number(d.w) || 0, Number(d.h) || 0, Number(d.d) || 0);
  if (maxd) { const typ = base >= 15 ? 120 : base >= 5 ? 60 : 30; w *= Math.min(1.8, Math.max(0.6, maxd / typ)); }
  w = Math.max(0.2, Math.min(80, w));
  return Math.round(w * 10) / 10;
}

module.exports = { estimateWeight, parseKg };
