/* ============================================================
   DÉCOMUSE, Checkout
   Renders the order summary + collects shipping details, then
   pays via Stripe Checkout when configured, else demo mode.
   ============================================================ */

// Delivery is calculated from the destination country.
const SHIP_RATES = {
  "Australia":   { flat: 19, freeOver: 300 },
  "New Zealand": { flat: 39, freeOver: 500 }
};
function shipCountry() {
  const el = document.getElementById("coCountry");
  return (el && SHIP_RATES[el.value]) ? el.value : "Australia";
}

function checkoutTotals() {
  const sub = cartTotal();
  const disc = orderDiscount(sub);
  const discount = disc.amount;
  const afterDisc = sub - discount;
  const rate = SHIP_RATES[shipCountry()];
  const shipping = sub <= 0 ? 0 : (afterDisc >= rate.freeOver ? 0 : rate.flat);
  const total = afterDisc + shipping;
  const gst = Math.round((total / 11)); // GST component of a GST-inclusive total
  return { sub, discount, discLabel: disc.label, shipping, total, gst, coupon: window._coupon, country: shipCountry() };
}

function updateTotalsUI() {
  const t = checkoutTotals();
  const shipTxt = t.shipping === 0 ? "Free" : money(t.shipping);
  const line = document.getElementById("coShipLine");
  if (line) line.innerHTML = `<strong>Standard</strong> · ${shipTxt} · 3 to 8 business days`;
  const s = document.getElementById("sumShip"); if (s) s.textContent = shipTxt;
  const tot = document.getElementById("sumTotal"); if (tot) tot.textContent = money(t.total);
  const g = document.getElementById("sumGst"); if (g) g.textContent = money(t.gst);
  const btn = document.getElementById("payBtn"); if (btn) btn.textContent = `Pay ${money(t.total)} securely →`;
}

function renderCheckout() {
  const wrap = document.getElementById("checkoutWrap");
  const cart = getCart();
  if (!cart.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="em">🛍️</div>
        <h2>Your cart is empty</h2>
        <p>Add a few beautiful things before checking out.</p>
        <a class="btn btn--primary" href="shop.html" style="margin-top:16px">Go to the shop</a>
      </div>`;
    return;
  }
  const t = checkoutTotals();
  const acc = getAccount() || {};
  const lines = cart.map(i => `
    <div class="co-line">
      <span class="co-thumb"><span class="ph ${i.ph}" data-label="${i.name}"></span><span class="co-qty">${i.qty}</span></span>
      <span class="co-name">${i.name}${i.contents ? `<small>${i.contents}</small>` : ""}</span>
      <span class="co-price">${money(i.price * i.qty)}</span>
    </div>`).join("");

  wrap.innerHTML = `
    <div class="co-grid">
      <div>
        <form id="checkoutForm" class="form-card">
          <div class="co-section">Contact</div>
          <div class="field"><label>Email</label><input id="coEmail" type="email" value="${acc.email || ""}" required></div>

          <div class="co-section">Shipping address</div>
          <div class="field-row">
            <div class="field"><label>First name</label><input id="coFirst" required></div>
            <div class="field"><label>Last name</label><input id="coLast" required></div>
          </div>
          <div class="field"><label>Address</label><input id="coAddr" required></div>
          <div class="field-row">
            <div class="field"><label>Suburb</label><input id="coSuburb" required></div>
            <div class="field"><label>State / Postcode</label><input id="coPost" placeholder="SA 5000" required></div>
          </div>
          <div class="field-row">
            <div class="field"><label>Country</label>
              <select id="coCountry"><option>Australia</option><option>New Zealand</option></select></div>
            <div class="field"><label>Phone</label><input id="coPhone" type="tel"></div>
          </div>

          <div class="co-section">Delivery</div>
          <label class="co-radio"><input type="radio" name="ship" checked> <span id="coShipLine"><strong>Standard</strong> · ${t.shipping === 0 ? "Free" : money(t.shipping)} · 3 to 8 business days</span></label>

          <div class="co-section">Payment</div>
          <div class="co-pay">
            <div class="co-pay-brands">💳 Card · Apple Pay · Google Pay, secured by <strong>Stripe</strong></div>
            <p class="form-note">You'll enter your card details on Stripe's secure checkout. We never see or store your card number.</p>
          </div>

          <button type="submit" class="btn btn--primary btn--block" id="payBtn" style="margin-top:12px">Pay ${money(t.total)} securely →</button>
          <p class="form-note" style="text-align:center;margin-top:10px">🔒 Encrypted checkout · GST included where applicable</p>
        </form>
      </div>

      <aside class="summary">
        <h3>Order summary</h3>
        <div class="co-lines">${lines}</div>
        <div class="summary-row"><span>Subtotal</span><span>${money(t.sub)}</span></div>
        ${t.discount ? `<div class="summary-row" style="color:var(--forest)"><span>${t.discLabel}</span><span>−${money(t.discount)}</span></div>` : ""}
        <div class="summary-row"><span>Shipping</span><span id="sumShip">${t.shipping === 0 ? "Free" : money(t.shipping)}</span></div>
        <div class="summary-row total"><span>Total</span><span id="sumTotal">${money(t.total)}</span></div>
        <div style="font-size:0.8rem;color:var(--muted);margin-top:4px">Includes GST <span id="sumGst">${money(t.gst)}</span></div>
        <a href="cart.html" class="link-arrow" style="margin-top:16px;display:inline-flex">← Back to cart</a>
      </aside>
    </div>`;

  document.getElementById("checkoutForm").addEventListener("submit", startPayment);
  const cc = document.getElementById("coCountry");
  if (cc) cc.addEventListener("change", updateTotalsUI);
}

async function startPayment(e) {
  e.preventDefault();
  const btn = document.getElementById("payBtn");
  const cfg = (typeof DECOMUSE !== "undefined" && DECOMUSE.stripe) || {};
  const cart = getCart();
  const t = checkoutTotals();
  const customer = {
    email: document.getElementById("coEmail").value,
    name: document.getElementById("coFirst").value + " " + document.getElementById("coLast").value,
    address: document.getElementById("coAddr").value,
    suburb: document.getElementById("coSuburb").value,
    postcode: document.getElementById("coPost").value,
    country: document.getElementById("coCountry").value,
    phone: document.getElementById("coPhone").value
  };

  btn.disabled = true; btn.textContent = "Connecting to Stripe…";

  // --- Real Stripe Checkout (active as soon as an endpoint is set) ---
  if (cfg.checkoutEndpoint) {
    try {
      const res = await fetch(cfg.checkoutEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
          coupon: t.coupon, shipping: t.shipping, customer
        })
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }          // Stripe-hosted redirect
      if (data.id && window.Stripe) {                                       // or redirectToCheckout by session id
        await window.Stripe(cfg.publishableKey).redirectToCheckout({ sessionId: data.id });
        return;
      }
      throw new Error("No session returned");
    } catch (err) {
      btn.disabled = false; btn.textContent = `Pay ${money(t.total)} securely →`;
      showToast("Couldn't reach payment server. Please try again or contact us.");
      return;
    }
  }

  // --- Demo mode (no Stripe keys yet) ---
  setTimeout(() => {
    const orderNo = "DM-" + (100000 + Math.floor(Math.random() * 899999));
    localStorage.setItem("dm_last_order", JSON.stringify({ orderNo, total: t.total, email: customer.email }));
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem("dm_coupon");
    location.href = "order-confirmed.html";
  }, 800);
}

document.addEventListener("DOMContentLoaded", renderCheckout);
