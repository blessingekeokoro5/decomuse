/* ============================================================
   DÉCOMUSE, Cart (localStorage) + toast + product helpers
   ============================================================ */

const CART_KEY = "decomuse_cart";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function cartCount() { return getCart().reduce((n, i) => n + i.qty, 0); }
function cartTotal() { return getCart().reduce((n, i) => n + i.price * i.qty, 0); }

function findProduct(id) { return PRODUCTS.find(p => p.id === id); }

/* ---- GA4 ecommerce helpers ---- */
function gaEvent(name, params) { try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {} }
function gaItem(p, qty, price) {
  return { item_id: (p && (p.sku || p.id)) || "", item_name: (p && p.name) || "",
    item_category: (p && p.cat) || "", price: Number(price != null ? price : (p && p.price) || 0), quantity: qty || 1 };
}

// Cart lines are keyed by product + colour + size so variants are separate lines.
function addToCart(id, qty = 1, colour = null, size = null, price = null) {
  const p = findProduct(id);
  if (!p) return;
  const unitPrice = (price != null) ? price : p.price;
  const key = [id, colour || "", size || ""].join("|");
  const cart = getCart();
  const line = cart.find(i => (i.key || i.id) === key);
  if (line) line.qty += qty;
  else cart.push({ id: p.id, key, name: p.name, price: unitPrice, cat: p.cat, ph: p.ph, img: p.img || (p.imgs && p.imgs[0]) || undefined, qty, colour: colour || undefined, size: size || undefined });
  saveCart(cart);
  gaEvent("add_to_cart", { currency: "AUD", value: unitPrice * qty, items: [gaItem(p, qty, unitPrice)] });
  showToast(`Added “${p.name}${colour ? " · " + colour : ""}${size ? " · " + size : ""}” to your cart`);
  if (typeof renderCartPage === "function") renderCartPage();
}
function removeFromCart(key) {
  saveCart(getCart().filter(i => (i.key || i.id) !== key));
  if (typeof renderCartPage === "function") renderCartPage();
}
function setQty(key, qty) {
  const cart = getCart();
  const line = cart.find(i => (i.key || i.id) === key);
  if (!line) return;
  line.qty = Math.max(1, qty);
  saveCart(cart);
  if (typeof renderCartPage === "function") renderCartPage();
}

/* Best discount = larger of member coupon (20%) or the live flash-sale % */
function orderDiscount(sub) {
  let coupon = null;
  try { coupon = window._coupon || localStorage.getItem("dm_coupon"); } catch (e) {}
  const acc = getAccount();
  const couponPct = (coupon === "WELCOME20" || (acc && acc.member && acc.coupon === "WELCOME20")) ? 20 : 0;
  let flashPct = 0;
  try { const f = getFlashSale(); if (f.active) flashPct = f.percent; } catch (e) {}
  const pct = Math.max(couponPct, flashPct);
  const label = (flashPct >= couponPct && flashPct > 0) ? `Flash sale (${flashPct}% off)` : (couponPct > 0 ? "Member discount (20%)" : "");
  return { pct, amount: Math.round(sub * pct / 100), label };
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? "grid" : "none";
  }
}

/* ============================================================
   Wishlist (localStorage)
   ============================================================ */
const WISH_KEY = "decomuse_wishlist";
function getWishlist() { try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch { return []; } }
function saveWishlist(w) { localStorage.setItem(WISH_KEY, JSON.stringify(w)); updateWishCount(); }
function isWishlisted(id) { return getWishlist().includes(id); }
function wishlistCount() { return getWishlist().length; }
function toggleWishlist(id, el) {
  const w = getWishlist(); const i = w.indexOf(id); let added;
  if (i >= 0) { w.splice(i, 1); added = false; } else { w.push(id); added = true; }
  saveWishlist(w);
  if (el) el.classList.toggle("on", added);
  const p = findProduct(id);
  showToast(added ? `Saved “${p ? p.name : "item"}” to your wishlist ♡` : "Removed from your wishlist");
  if (typeof renderWishlistPage === "function") renderWishlistPage();
}
function updateWishCount() {
  const el = document.getElementById("wishCount");
  if (el) { const n = wishlistCount(); el.textContent = n; el.style.display = n > 0 ? "grid" : "none"; }
}

/* ============================================================
   Account (localStorage demo)
   ============================================================ */
const ACCOUNT_KEY = "decomuse_account";
function getAccount() { try { return JSON.parse(localStorage.getItem(ACCOUNT_KEY)); } catch { return null; } }
function saveAccount(a) { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(a)); }
function logoutAccount() { localStorage.removeItem(ACCOUNT_KEY); }
function todayAU() { return new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }); }

/* ---- Toast ---- */
let toastTimer;
function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast"; t.className = "toast";
    document.body.appendChild(t);
  }
  t.innerHTML = `${IC.spark} ${msg}`;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ============================================================
   Multi-currency (DISPLAY only). Internal amounts & Stripe
   charges always stay in AUD — this just converts what the
   shopper SEES, using live exchange rates.
   ============================================================ */
const DM_CUR_INFO = {
  AUD: { symbol: "$", locale: "en-AU" }, NZD: { symbol: "$", locale: "en-NZ" },
  USD: { symbol: "$", locale: "en-US" }, GBP: { symbol: "£", locale: "en-GB" },
  EUR: { symbol: "€", locale: "en-IE" }, CAD: { symbol: "$", locale: "en-CA" },
  AED: { symbol: "AED ", locale: "en-AE" }
};
let DM_CUR = "AUD";
let DM_FX = {};   // rates relative to AUD, e.g. { NZD: 1.09, USD: 0.66 }
try {
  DM_CUR = localStorage.getItem("dm_currency") || "AUD";
  const c = JSON.parse(localStorage.getItem("dm_fx") || "null");
  if (c && c.rates) DM_FX = c.rates;
} catch (e) {}
if (!DM_CUR_INFO[DM_CUR]) DM_CUR = "AUD";

function dmRate(code) { return code === "AUD" ? 1 : (DM_FX[code] || null); }
function fmtCur(amount, code) {
  const info = DM_CUR_INFO[code] || DM_CUR_INFO.AUD;
  const val = Math.round(amount * 100) / 100;
  return info.symbol + val.toLocaleString(info.locale, { minimumFractionDigits: (val % 1 ? 2 : 0), maximumFractionDigits: 2 });
}
// Displayed price in the selected currency (falls back to AUD if no rate yet).
const money = (n) => {
  const r = dmRate(DM_CUR);
  if (DM_CUR === "AUD" || !r) return fmtCur(Number(n) || 0, "AUD");
  return fmtCur((Number(n) || 0) * r, DM_CUR);
};
// Always-AUD formatter (for the "charged in AUD" clarifier at cart/checkout).
const moneyAud = (n) => fmtCur(Number(n) || 0, "AUD").replace(/^\$/, "A$");
// Short label for the header, e.g. "AUD $", "GBP £".
function curLabel() { const c = (typeof DM_CUR !== "undefined") ? DM_CUR : "AUD"; return c + " " + (DM_CUR_INFO[c] || DM_CUR_INFO.AUD).symbol.trim(); }

// Fetch live rates (free, no key), cache for a day.
async function refreshFx() {
  try {
    const c = JSON.parse(localStorage.getItem("dm_fx") || "null");
    if (c && c.ts && (Date.now() - c.ts) < 86400000 && c.rates) { DM_FX = c.rates; return; }
    const res = await fetch("https://open.er-api.com/v6/latest/AUD");
    const data = await res.json();
    if (data && data.rates) { DM_FX = data.rates; localStorage.setItem("dm_fx", JSON.stringify({ ts: Date.now(), rates: DM_FX })); }
  } catch (e) {}
}
// Switch currency: ensure rates, save, reload so every price re-renders.
async function applyCurrency(code) {
  if (!DM_CUR_INFO[code]) code = "AUD";
  try { localStorage.setItem("dm_currency", code); } catch (e) {}
  if (code !== "AUD") await refreshFx();
  location.reload();
}
// Keep rates fresh in the background (also enables conversion on next load).
if (typeof window !== "undefined") { refreshFx(); }

/* ---- Product image: uses assets/products/<id>.jpg (or .png/.webp), else placeholder ---- */
function prodImgTag(p) {
  const first = p.img || ("assets/products/" + p.id + ".jpg");
  return `<img class="ph-img" src="${first}" alt="${p.name}" data-pid="${p.id}" data-i="${p.img ? 99 : 0}" onload="this.closest('.card-media')&&this.closest('.card-media').classList.add('has-img')" onerror="nextProdImg(this)">`;
}
function nextProdImg(img) {
  const exts = ["jpg", "png", "jpeg", "webp"];
  const i = (+img.dataset.i || 0) + 1;
  if (i < exts.length && img.dataset.pid) { img.dataset.i = i; img.src = "assets/products/" + img.dataset.pid + "." + exts[i]; }
  else img.remove();
}

/* Stable per-product "Selling fast" flag (same subset every load).
   Set p.hot = true/false on a product to force it on/off. */
function sellingFast(p) {
  if (typeof p.hot === "boolean") return p.hot;
  let h = 0;
  for (let i = 0; i < p.id.length; i++) h = (h * 31 + p.id.charCodeAt(i)) >>> 0;
  return (h % 10) < 4; // ~a third to a half of products
}

/* ---- "Pay in 4" badge (Afterpay + Zip) ---- */
function bnplBadge(price) {
  const p = Number(price);
  if (!isFinite(p) || p < 1) return "";
  const q = (p / 4).toFixed(2);
  return `<div class="bnpl">4 interest-free payments of <strong>$${q}</strong> with `
    + `<span class="bnpl-tag bnpl-ap">afterpay</span><span class="bnpl-tag bnpl-zip">zip</span></div>`;
}

/* ---- Product card markup ---- */
function productCard(p) {
  const tag = p.tag ? `<span class="tag ${/sale/i.test(p.tag) ? 'sale' : ''}">${p.tag}</span>` : "";
  const hot = sellingFast(p) ? `<span class="badge-hot">⚡ Selling fast</span>` : "";
  const was = p.was ? `<small>${money(p.was)}</small>` : "";
  return `
    <article class="card product" data-cat="${p.cat}">
      <div class="card-media">
        <div class="card-badges">${hot}${tag}</div>
        <button class="wish ${isWishlisted(p.id) ? "on" : ""}" aria-label="Save to wishlist" onclick="toggleWishlist('${p.id}', this)">${IC.heart}</button>
        <a href="product.html?id=${p.id}" aria-label="${p.name}"><div class="ph ${p.ph}" data-label="${p.name}">${prodImgTag(p)}</div></a>
        <button class="zoom-btn" type="button" aria-label="Zoom image" onclick="openZoom(event, this)">${IC.search}</button>
      </div>
      <div class="card-body">
        <span class="cat">${p.cat}</span>
        <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="price">${p.sizes && p.sizes.length ? "from " : ""}${money(p.price)}${was}</div>
        ${p.dontPay ? `<div class="dont-pay"><span class="dp-tag">Don't Pay</span> <s>${money(p.dontPay)}</s><button class="dp-info" type="button" aria-label="Why?" onclick="showDontPayInfo(event)">ⓘ</button></div>` : ""}
        ${p.memberPrice ? `<div class="member-price">✦ Members ${money(p.memberPrice)}</div>` : ""}
        ${p.freeship ? `<div class="freeship-tag">🚚 Free shipping</div>` : ""}
        <div class="product-foot">
          <span class="stars">★★★★★</span>
          <button class="btn btn--primary btn--sm" onclick="addToCart('${p.id}')">Add to cart</button>
        </div>
      </div>
    </article>`;
}

function renderProducts(targetId, list) {
  const el = document.getElementById(targetId);
  if (el) el.innerHTML = list.map(productCard).join("");
}

document.addEventListener("DOMContentLoaded", () => { updateCartCount(); updateWishCount(); });

/* ---- Email my shopping list ----
   If the Brevo email service is configured (server env var BREVO_API_KEY),
   the list is sent FROM decormuseofficial@outlook.com TO the shopper, with
   a copy to the business inbox. If not configured, it gracefully falls back
   to opening the shopper's own email app pre-filled. */
function bagMailtoFallback(cart) {
  const origin = (location.origin && location.origin.indexOf("http") === 0) ? location.origin : "https://www.decomuse.com.au";
  const lines = cart.map(i => {
    const variant = [i.colour, i.size].filter(Boolean).join(", ");
    return `• ${i.qty} x ${i.name}${variant ? " (" + variant + ")" : ""} — ${money(i.price * i.qty)}\n  ${origin}/product.html?id=${i.id}`;
  }).join("\n\n");
  const body = `Here's my DecoMuse shopping list 🛍️\n\n${lines}\n\nSubtotal: ${money(cartTotal())}\n\nShop the collection anytime: ${origin}/shop.html`;
  window.location.href = "mailto:?subject=" + encodeURIComponent("My DecoMuse shopping list") + "&body=" + encodeURIComponent(body);
}

async function emailMyBag() {
  const cart = getCart();
  if (!cart.length) { showToast("Your shopping list is empty"); return; }

  const cfg = (typeof DECOMUSE !== "undefined" && DECOMUSE) || {};
  const endpoint = cfg.emailListEndpoint || "/.netlify/functions/send-shopping-list";

  // Pre-fill with the logged-in member's email if we have one.
  const acct = (typeof getAccount === "function" && getAccount()) || null;
  const to = window.prompt("Enter the email address to send your shopping list to:", (acct && acct.email) || "");
  if (to === null) return;                 // cancelled
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to.trim())) { showToast("Please enter a valid email address"); return; }

  const items = cart.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price, colour: i.colour, size: i.size }));
  showToast("Sending your shopping list…");
  try {
    const res = await fetch(endpoint, {
      method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ to: to.trim(), items, subtotal: cartTotal() })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) { showToast("Your shopping list is on its way ✉️"); return; }
    // Service not configured yet → fall back to the shopper's email app.
    bagMailtoFallback(cart);
  } catch (e) {
    bagMailtoFallback(cart);
  }
}
