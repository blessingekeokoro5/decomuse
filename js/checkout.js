/* ============================================================
   DÉCOMUSE, Checkout
   Renders the order summary + collects shipping details, then
   pays via Stripe Checkout when configured, else demo mode.
   ============================================================ */

// Delivery is calculated from the destination country.
const SHIP_RATES = {
  "Australia":   { flat: 19, freeOver: 500 },
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
  // Rewards / gift dollar-voucher applied to this order
  const vou = (typeof getVoucher === "function") ? getVoucher() : null;
  const voucher = (vou && vou.amount) ? Math.min(vou.amount, afterDisc) : 0;
  const afterVoucher = afterDisc - voucher;
  const rate = SHIP_RATES[shipCountry()];
  let shipping = sub <= 0 ? 0 : (afterDisc >= rate.freeOver ? 0 : rate.flat);
  if (window._fulfil === "pickup") shipping = 0;   // collect in-studio, no delivery fee
  const preGift = afterVoucher + shipping;
  const gc = window._giftCard || null;
  // A gift card can be used online only when it covers the whole order.
  const giftCard = (gc && gc.amount >= preGift && preGift > 0) ? preGift : 0;
  const total = preGift - giftCard;
  const gst = Math.round((total / 11)); // GST component of a GST-inclusive total
  return { sub, discount, discLabel: disc.label, voucher, voucherCode: vou ? vou.code : null, shipping, preGift, giftCard, giftCode: gc ? gc.code : null, total, gst, coupon: window._coupon, country: shipCountry() };
}

function updateTotalsUI() {
  const t = checkoutTotals();
  const shipTxt = t.shipping === 0 ? "Free" : money(t.shipping);
  const line = document.getElementById("coShipLine");
  if (line) line.innerHTML = `<strong>Standard</strong> · ${shipTxt} · 3 to 8 business days`;
  const s = document.getElementById("sumShip"); if (s) s.textContent = window._fulfil === "pickup" ? "Free (pickup)" : shipTxt;
  const gr = document.getElementById("sumGiftRow"); if (gr) gr.style.display = t.giftCard ? "flex" : "none";
  const gv = document.getElementById("sumGift"); if (gv) gv.textContent = "−" + money(t.giftCard);
  const tot = document.getElementById("sumTotal"); if (tot) tot.textContent = money(t.total);
  const g = document.getElementById("sumGst"); if (g) g.textContent = money(t.gst);
  const btn = document.getElementById("payBtn");
  if (btn) btn.textContent = window._fulfil === "layby"
    ? "Submit lay-by request →"
    : (t.total <= 0 ? "Complete order (gift card) →" : `Pay ${(typeof DM_CUR!=="undefined"&&DM_CUR!=="AUD")?moneyAud(t.total)+" (AUD)":money(t.total)} securely →`);
}

function applyGiftCardCheckout() {
  const msg = document.getElementById("coGiftMsg");
  const code = (document.getElementById("coGiftInput").value || "").trim().toUpperCase();
  const acc = getAccount();
  if (!acc || !acc.email) { msg.style.color = "var(--rose-deep)"; msg.textContent = "Please log in to use your gift card / refund credit."; return; }
  const gc = (acc.giftCards || []).find(g => (g.code || "").toUpperCase() === code && g.balance > 0);
  if (!gc) { window._giftCard = null; msg.style.color = "var(--rose-deep)"; msg.textContent = "Gift card not found on your account, or it has no balance."; updateTotalsUI(); return; }
  window._giftCard = { code: gc.code, amount: gc.balance };
  const t = checkoutTotals();
  if (t.giftCard <= 0) {
    window._giftCard = null;
    msg.style.color = "var(--rose-deep)";
    msg.textContent = `Your gift card (${money(gc.balance)}) doesn't cover this order (${money(t.preGift)}). Reduce your cart to at or under your balance, or contact us for part-payment.`;
    updateTotalsUI(); return;
  }
  msg.style.color = "var(--forest)";
  msg.textContent = `✓ Gift card applied — ${money(gc.balance)} available.`;
  updateTotalsUI();
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
  gaEvent("begin_checkout", { currency: "AUD", value: t.total, items: cart.map(i => gaItem(i, i.qty, i.price)) });
  const lines = cart.map(i => {
    const prod = (typeof findProduct === "function") ? findProduct(i.id) : null;
    const src = i.img || (prod && (prod.img || (prod.imgs && prod.imgs[0]))) || ("assets/products/" + i.id + ".jpg");
    return `
    <div class="co-line">
      <span class="co-thumb"><span class="ph ${i.ph}" data-label="${i.name}"><img class="ph-img" src="${src}" alt="${i.name}" onerror="this.remove()"></span><span class="co-qty">${i.qty}</span></span>
      <span class="co-name">${i.name}${(i.colour || i.size) ? ` · ${[i.colour, i.size].filter(Boolean).join(" · ")}` : ""}${i.contents ? `<small>${i.contents}</small>` : ""}</span>
      <span class="co-price">${money(i.price * i.qty)}</span>
    </div>`;
  }).join("");

  wrap.innerHTML = `
    <div class="fulfil">
      <h3 class="fulfil-title">Choose how you'd like to get your items</h3>
      <div class="fulfil-grid" id="fulfilGrid">
        <button type="button" class="fulfil-opt active" data-mode="delivery" onclick="setFulfil('delivery')"><span class="fic">🚚</span><span>Delivery</span></button>
        <button type="button" class="fulfil-opt" data-mode="pickup" onclick="setFulfil('pickup')"><span class="fic">🛍️</span><span>Pick up</span></button>
        <button type="button" class="fulfil-opt" data-mode="layby" onclick="setFulfil('layby')"><span class="fic">🗓️</span><span>Lay-by</span></button>
      </div>
      <div class="fulfil-note" id="fulfilNote"></div>
    </div>
    <div class="co-grid">
      <div>
        <form id="checkoutForm" class="form-card">
          <div class="co-section">Contact</div>
          <div class="field"><label>Email</label><input id="coEmail" type="email" value="${acc.email || ""}" required></div>

          <div class="co-section" id="shipTitle">Delivery address</div>
          <div class="field-row">
            <div class="field"><label>First name</label><input id="coFirst" required></div>
            <div class="field"><label>Last name</label><input id="coLast" required></div>
          </div>
          <div class="field ship-addr"><label>Address</label><input id="coAddr" required></div>
          <div class="field-row ship-addr">
            <div class="field"><label>Suburb</label><input id="coSuburb" required></div>
            <div class="field"><label>State / Postcode</label><input id="coPost" placeholder="SA 5000" required></div>
          </div>
          <div class="field-row">
            <div class="field ship-addr"><label>Country</label>
              <select id="coCountry"><option>Australia</option><option>New Zealand</option></select></div>
            <div class="field"><label>Phone</label><input id="coPhone" type="tel"></div>
          </div>

          <div class="co-section" id="deliverySection">Delivery</div>
          <label class="co-radio" id="shipRadio"><input type="radio" name="ship" checked> <span id="coShipLine"><strong>Standard</strong> · ${t.shipping === 0 ? "Free" : money(t.shipping)} · 3 to 8 business days</span></label>

          <div class="co-section">Payment</div>
          <div class="co-pay">
            <div class="co-pay-brands">💳 Card · Apple Pay · Google Pay, secured by <strong>Stripe</strong></div>
            <p class="form-note">You'll enter your card details on Stripe's secure checkout. We never see or store your card number.</p>
          </div>

          <button type="submit" class="btn btn--primary btn--block" id="payBtn" style="margin-top:12px">Pay ${(typeof DM_CUR!=="undefined"&&DM_CUR!=="AUD")?moneyAud(t.total)+" (AUD)":money(t.total)} securely →</button>
          <p class="form-note" style="text-align:center;margin-top:10px">🔒 Encrypted checkout · GST included where applicable</p>
        </form>
      </div>

      <aside class="summary">
        <h3>Order summary</h3>
        <div class="co-lines">${lines}</div>
        <div class="summary-row"><span>Subtotal</span><span>${money(t.sub)}</span></div>
        ${t.discount ? `<div class="summary-row" style="color:var(--forest)"><span>${t.discLabel}</span><span>−${money(t.discount)}</span></div>` : ""}
        ${t.voucher ? `<div class="summary-row" style="color:var(--forest)"><span>Rewards voucher (${t.voucherCode})</span><span>−${money(t.voucher)}</span></div>` : ""}
        <div class="summary-row"><span>Shipping</span><span id="sumShip">${t.shipping === 0 ? "Free" : money(t.shipping)}</span></div>
        <div class="summary-row" id="sumGiftRow" style="color:var(--forest);${t.giftCard ? "display:flex" : "display:none"}"><span>Gift card</span><span id="sumGift">−${money(t.giftCard)}</span></div>
        <div class="summary-row total"><span>Total</span><span id="sumTotal">${money(t.total)}</span></div>
        ${(typeof DM_CUR !== "undefined" && DM_CUR !== "AUD") ? `<div style="font-size:0.8rem;color:var(--muted);margin-top:2px">≈ shown in ${DM_CUR} · you'll be charged <strong>${moneyAud(t.total)}</strong> (AUD)</div>` : ""}
        <div style="font-size:0.8rem;color:var(--muted);margin-top:4px">Includes GST <span id="sumGst">${money(t.gst)}</span></div>
        <div style="margin-top:14px">
          <label style="font-size:0.82rem;color:var(--muted);display:block;margin-bottom:6px">🎁 Gift card / refund credit (log in to use)</label>
          <div style="display:flex;gap:8px">
            <input id="coGiftInput" placeholder="DMGC-…" style="flex:1;padding:10px 12px;border:1.5px solid var(--line);border-radius:10px;font-family:var(--font-body)">
            <button type="button" class="btn btn--outline btn--sm" onclick="applyGiftCardCheckout()">Apply</button>
          </div>
          <div id="coGiftMsg" style="font-size:0.8rem;margin-top:6px"></div>
        </div>
        <a href="cart.html" class="link-arrow" style="margin-top:16px;display:inline-flex">← Back to cart</a>
      </aside>
    </div>`;

  document.getElementById("checkoutForm").addEventListener("submit", startPayment);
  const cc = document.getElementById("coCountry");
  if (cc) cc.addEventListener("change", updateTotalsUI);
  if (typeof window._fulfil === "undefined") window._fulfil = "delivery";
  setFulfil(window._fulfil);
}

/* Fulfilment method: Delivery · Pick up · Lay-by */
function setFulfil(mode) {
  window._fulfil = mode;
  document.querySelectorAll("#fulfilGrid .fulfil-opt").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
  const note = document.getElementById("fulfilNote");
  const title = document.getElementById("shipTitle");
  const delivery = document.getElementById("deliverySection");
  const radio = document.getElementById("shipRadio");
  const addr = document.querySelectorAll(".ship-addr");
  const showAddr = (show) => {
    addr.forEach((el) => (el.style.display = show ? "" : "none"));
    ["coAddr", "coSuburb", "coPost"].forEach((id) => { const el = document.getElementById(id); if (el) el.required = show; });
  };
  if (mode === "pickup") {
    showAddr(false);
    if (title) title.textContent = "Contact for pickup";
    if (delivery) delivery.style.display = "none";
    if (radio) radio.style.display = "none";
    if (note) note.innerHTML = "🛍️ <strong>Pick up</strong> — collect from our Klemzig, Adelaide studio. We'll email you when your order is ready (usually 1–2 business days). No delivery fee.";
  } else if (mode === "layby") {
    showAddr(true);
    if (title) title.textContent = "Delivery address";
    if (delivery) delivery.style.display = "";
    if (radio) radio.style.display = "";
    if (note) note.innerHTML = "🗓️ <strong>Lay-by</strong> — reserve your pieces with a 20% deposit today and pay the balance over 8 weeks. Your items are held for you and dispatched once paid in full. Submit below and our team will email you to set it up.";
  } else {
    showAddr(true);
    if (title) title.textContent = "Delivery address";
    if (delivery) delivery.style.display = "";
    if (radio) radio.style.display = "";
    if (note) note.innerHTML = "";
  }
  if (typeof updateTotalsUI === "function") updateTotalsUI();
}

async function startPayment(e) {
  e.preventDefault();
  const btn = document.getElementById("payBtn");
  const cfg = (typeof DECOMUSE !== "undefined" && DECOMUSE.stripe) || {};
  const cart = getCart();
  const t = checkoutTotals();

  // Stash purchase details so order-confirmed.html can fire the GA4 purchase event
  try {
    localStorage.setItem("dm_pending_purchase", JSON.stringify({
      value: t.total, shipping: t.shipping || 0,
      items: cart.map(i => ({ item_id: i.id, item_name: i.name, item_category: i.cat, price: i.price, quantity: i.qty }))
    }));
  } catch (e) {}

  // Lay-by → reserve the items with a request to our team (no charge now)
  if (window._fulfil === "layby") {
    const email = document.getElementById("coEmail").value;
    const first = document.getElementById("coFirst").value;
    const name = (first + " " + document.getElementById("coLast").value).trim();
    const deposit = Math.round(t.total * 0.2 * 100) / 100;
    const data = [
      ["Request", "Lay-by"],
      ["Name", name], ["Email", email], ["Phone", document.getElementById("coPhone").value],
      ["Delivery address", [document.getElementById("coAddr").value, document.getElementById("coSuburb").value, document.getElementById("coPost").value, document.getElementById("coCountry").value].filter(Boolean).join(", ")],
      ["Order total", money(t.total)], ["Deposit (20%)", money(deposit)],
      ["Items", cart.map((i) => `${i.qty}× ${i.name}`).join("; ")]
    ];
    btn.disabled = true; btn.textContent = "Sending request…";
    try { if (typeof deliverForm === "function") await deliverForm(data, "DecoMuse — Lay-by request"); } catch (err) {}
    showToast("Lay-by request sent ✦");
    document.getElementById("checkoutWrap").innerHTML =
      `<div class="empty-state" style="max-width:560px;margin:0 auto"><div class="em">🗓️</div><h2>Lay-by request received</h2>
       <p>Thanks ${first || "there"}! We've noted your lay-by and our team will email you to set it up. A <strong>20% deposit (${money(deposit)})</strong> secures your items, with the balance payable over 8 weeks. Your bag stays saved until then.</p>
       <a class="btn btn--primary" href="shop.html" style="margin-top:16px">Continue shopping</a></div>`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // Gift card covers the whole order → complete without Stripe (uses refund credit)
  if (t.giftCard > 0 && t.total <= 0) {
    const acc = getAccount();
    if (acc) { const gc = (acc.giftCards || []).find(g => g.code === t.giftCode); if (gc) { gc.balance = Math.max(0, +(gc.balance - t.giftCard).toFixed(2)); saveAccount(acc); } }
    localStorage.setItem("dm_last_order", JSON.stringify({ orderNo: "DM-" + (100000 + Math.floor(Math.random() * 899999)), total: 0, email: (acc && acc.email) || "" }));
    localStorage.removeItem(CART_KEY); localStorage.removeItem("dm_coupon"); window._giftCard = null;
    location.href = "order-confirmed.html";
    return;
  }

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
      // Apply the active discount (member / flash / sale campaign) to the prices we send to
      // Stripe, so the amount CHARGED matches the discounted total shown on site.
      const od = orderDiscount(t.sub);
      // Fold both the % discount and any $ rewards voucher into an effective per-item factor,
      // so the amount charged by Stripe matches the discounted total shown on site.
      const totalDisc = (od.amount || 0) + (t.voucher || 0);
      const factor = t.sub > 0 ? Math.max(0, 1 - totalDisc / t.sub) : 1;
      const discLabel = [od.label, t.voucher ? `Rewards voucher ${money(t.voucher)}` : ""].filter(Boolean).join(" + ");
      const res = await fetch(cfg.checkoutEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(i => { const v = [i.colour, i.size].filter(Boolean).join(", "); return { id: i.id, name: v ? i.name + " (" + v + ")" : i.name, price: +(i.price * factor).toFixed(2), qty: i.qty }; }),
          coupon: "", discountPct: od.pct || 0, discountLabel: discLabel, shipping: t.shipping, customer
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
      btn.disabled = false; btn.textContent = `Pay ${(typeof DM_CUR!=="undefined"&&DM_CUR!=="AUD")?moneyAud(t.total)+" (AUD)":money(t.total)} securely →`;
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
    // dm_voucher is consumed on order-confirmed (marks it used + awards points)
  }, 800);
}

document.addEventListener("DOMContentLoaded", renderCheckout);
