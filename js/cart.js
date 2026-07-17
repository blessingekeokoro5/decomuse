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

function addToCart(id, qty = 1) {
  const p = findProduct(id);
  if (!p) return;
  const cart = getCart();
  const line = cart.find(i => i.id === id);
  if (line) line.qty += qty;
  else cart.push({ id: p.id, name: p.name, price: p.price, cat: p.cat, ph: p.ph, qty });
  saveCart(cart);
  showToast(`Added “${p.name}” to your cart`);
  if (typeof renderCartPage === "function") renderCartPage();
}
function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  if (typeof renderCartPage === "function") renderCartPage();
}
function setQty(id, qty) {
  const cart = getCart();
  const line = cart.find(i => i.id === id);
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

const money = (n) => DECOMUSE.currency + n.toLocaleString("en-AU");

/* ---- Product image: uses assets/products/<id>.jpg (or .png/.webp), else placeholder ---- */
function prodImgTag(p) {
  const first = p.img || ("assets/products/" + p.id + ".jpg");
  return `<img class="ph-img" src="${first}" alt="${p.name}" data-pid="${p.id}" data-i="${p.img ? 99 : 0}" onerror="nextProdImg(this)">`;
}
function nextProdImg(img) {
  const exts = ["jpg", "png", "jpeg", "webp"];
  const i = (+img.dataset.i || 0) + 1;
  if (i < exts.length && img.dataset.pid) { img.dataset.i = i; img.src = "assets/products/" + img.dataset.pid + "." + exts[i]; }
  else img.remove();
}

/* ---- Product card markup ---- */
function productCard(p) {
  const tag = p.tag ? `<span class="tag ${/sale/i.test(p.tag) ? 'sale' : ''}">${p.tag}</span>` : "";
  const was = p.was ? `<small>${money(p.was)}</small>` : "";
  return `
    <article class="card product" data-cat="${p.cat}">
      <div class="card-media">
        ${tag}
        <button class="wish ${isWishlisted(p.id) ? "on" : ""}" aria-label="Save to wishlist" onclick="toggleWishlist('${p.id}', this)">${IC.heart}</button>
        <a href="product.html?id=${p.id}" aria-label="${p.name}"><div class="ph ${p.ph}" data-label="${p.name}">${prodImgTag(p)}</div></a>
      </div>
      <div class="card-body">
        <span class="cat">${p.cat}</span>
        <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="price">${money(p.price)}${was}</div>
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
