/* ============================================================
   DecoMuse — Create Stripe Checkout Session  (Netlify Function)
   ------------------------------------------------------------
   Runs on the SERVER only. Uses your Stripe SECRET key, which
   must NEVER be exposed to the browser.

   Endpoint (after deploy):
     /.netlify/functions/create-checkout-session
     (also aliased to /api/create-checkout-session)

   TRUST MODEL
   -----------
   Nothing about money is taken from the browser. The client sends
   only WHAT it wants to buy (product id, quantity, variant); every
   dollar figure — unit price, discount, shipping — is worked out
   here from _catalogue.json, which is generated from js/data.js at
   deploy time by scripts/gen-catalogue.js. A shopper editing their
   cart in localStorage or devtools cannot change what they are
   charged; an unknown product id is refused outright.

   Required environment variables (set in Netlify dashboard):
     STRIPE_SECRET_KEY   = sk_test_...  then later  sk_live_...
     SITE_URL            = https://www.decomuse.com.au
   Optional:
     MAX_VOUCHER_AUD     = largest rewards voucher redeemable (default 250)
   ============================================================ */

const CATALOGUE = require("./_catalogue.json");

// Constructed lazily: the Stripe client throws if the key is missing, and we'd
// rather return a clear error than have the whole function fail to load.
let _stripe = null;
function getStripe() {
  if (!_stripe) _stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  return _stripe;
}

const SITE_URL = process.env.SITE_URL || "https://www.decomuse.com.au";

// Countries we ship to (ISO codes) — matches the site's shipping calculator regions
const SHIP_COUNTRIES = ["AU", "NZ", "GB", "US", "CA", "NG"];

/* ---- Shipping: mirrors SHIP_ZONES in js/checkout.js ---------- */
const SHIP_ZONES = {
  "Australia":      { base: 9.95,  perKg: 2.5, freeOver: 500, days: [3, 8] },
  "New Zealand":    { base: 19.95, perKg: 7,   freeOver: 750, days: [5, 12] },
  "United Kingdom": { base: 34.95, perKg: 16,  days: [7, 15] },
  "United States":  { base: 34.95, perKg: 16,  days: [7, 15] },
  "Canada":         { base: 36.95, perKg: 17,  days: [7, 15] },
  "Nigeria":        { base: 44.95, perKg: 22,  days: [8, 18] },
};
const DEFAULT_ITEM_KG = 0.75;
const SAMEDAY_FEE = 15;

/* ---- Discount ceiling ---------------------------------------
   The largest discount any legitimate shopper can reach: the 20%
   member rate, the weekly flash sale (10/15/20%), or a live sale
   campaign. We can't verify membership or the shopper's local
   flash-sale window from here, so we accept the percentage they
   ask for but clamp it to this ceiling. */
function maxDiscountPct() {
  let pct = 20; // member rate + flash-sale maximum
  const c = CATALOGUE.campaign;
  if (c && c.percent && c.endsAt && Date.now() < new Date(c.endsAt).getTime()) {
    pct = Math.max(pct, Number(c.percent) || 0);
  }
  return pct;
}
const MAX_VOUCHER = Number(process.env.MAX_VOUCHER_AUD) || 250;

const GIFT_CARD_MIN = 10;
const GIFT_CARD_MAX = 2000;

function jsonResponse(statusCode, obj) {
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

const round2 = (n) => Math.round(n * 100) / 100;

/* Resolve one cart line to a trusted { name, unitPrice, qty, weight }.
   Throws if the line can't be justified from the catalogue. */
function resolveLine(raw) {
  const qty = Math.max(1, Math.min(99, parseInt(raw && raw.qty, 10) || 1));
  const id = String((raw && raw.id) || "");

  // --- Gift cards: no catalogue entry; the amount IS the price ---
  if (id.startsWith("giftcard-")) {
    const gc = raw.giftCard || {};
    const amount = round2(Number(gc.amount));
    if (!isFinite(amount) || amount < GIFT_CARD_MIN || amount > GIFT_CARD_MAX) {
      throw new Error(`Gift card amount must be between $${GIFT_CARD_MIN} and $${GIFT_CARD_MAX}.`);
    }
    return { name: `DecoMuse Gift Card ($${amount})`, sku: gc.code || "", unitPrice: amount, qty, weight: 0 };
  }

  // --- Custom hampers: rebuilt from the chosen components ---
  if (id.startsWith("hamper-")) {
    const lines = Array.isArray(raw.hamper) ? raw.hamper : null;
    if (!lines || !lines.length) throw new Error("Custom hamper contents are missing — please rebuild your hamper.");
    let total = 0, count = 0;
    lines.forEach((l) => {
      const item = CATALOGUE.hamperItems[String((l && l.id) || "")];
      if (!item || item.price == null) throw new Error("That hamper contains an item we no longer stock.");
      const q = Math.max(1, Math.min(99, parseInt(l.qty, 10) || 1));
      total += item.price * q;
      count += q;
    });
    if (total < CATALOGUE.hamperMin) throw new Error(`Hampers start at $${CATALOGUE.hamperMin}.`);
    return { name: `Custom Gift Hamper (${count} items)`, sku: "hamper", unitPrice: round2(total), qty, weight: DEFAULT_ITEM_KG * count };
  }

  // --- Catalogue products ---
  const p = CATALOGUE.products[id];
  if (!p) throw new Error("Sorry, one of the items in your bag is no longer available.");
  if (p.price == null) throw new Error(`“${p.name}” is enquiry-only — please contact us for a quote.`);

  // A size may carry its own price; anything else falls back to the base price.
  const size = raw.size != null ? String(raw.size) : "";
  let unitPrice = p.price;
  if (size && Object.prototype.hasOwnProperty.call(p.sizes, size)) unitPrice = p.sizes[size];

  const variant = [raw.colour, size].filter(Boolean).map(String).join(", ");
  return {
    name: (variant ? `${p.name} (${variant})` : p.name).slice(0, 250),
    sku: id,
    unitPrice: round2(unitPrice),
    qty,
    weight: p.weight != null ? p.weight : DEFAULT_ITEM_KG,
  };
}

function shippingFor(country, fulfil, lines, afterDiscount) {
  if (fulfil === "pickup") return { amount: 0, label: "Click & collect — Klemzig studio", days: null };
  if (fulfil === "sameday") return { amount: SAMEDAY_FEE, label: "Same-day local courier", days: [0, 1] };

  const zone = SHIP_ZONES[country] || SHIP_ZONES["Australia"];
  const kg = round2(Math.max(lines.reduce((n, l) => n + l.weight * l.qty, 0), 0.1));
  let amount = round2(zone.base + zone.perKg * kg);
  if (zone.freeOver && afterDiscount >= zone.freeOver) amount = 0;
  return { amount, label: amount === 0 ? "Free standard shipping" : "Standard shipping", days: zone.days };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return jsonResponse(200, {});
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY is not set");
    return jsonResponse(500, { error: "Payments aren’t configured yet. Please contact us to complete your order." });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { items = [], customer = {}, fulfil = "ship" } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return jsonResponse(400, { error: "Your cart is empty." });
    }
    if (items.length > 100) {
      return jsonResponse(400, { error: "That's more items than we can check out at once." });
    }

    // 1. Trusted prices, from the catalogue only.
    const lines = items.map(resolveLine);
    const subtotal = round2(lines.reduce((n, l) => n + l.unitPrice * l.qty, 0));
    if (subtotal <= 0) return jsonResponse(400, { error: "Your cart total is empty." });

    // 2. Discount: take what was asked for, clamped to what's reachable.
    const askedPct = Number(body.discountPct) || 0;
    const pct = Math.min(Math.max(askedPct, 0), maxDiscountPct());
    const discount = round2((subtotal * pct) / 100);

    // 3. Rewards voucher: clamped, and never more than the order is worth.
    const askedVoucher = Number(body.voucher) || 0;
    const voucher = round2(Math.min(Math.max(askedVoucher, 0), MAX_VOUCHER, subtotal - discount));

    const afterDiscount = round2(subtotal - discount - voucher);

    // 4. Shipping: recomputed here from weight and region, never taken from the client.
    const ship = shippingFor(String(customer.country || "Australia"), String(fulfil), lines, afterDiscount);

    // Fold the discount into unit prices so the amount Stripe charges matches
    // the discounted total the shopper saw on site, line by line.
    const factor = subtotal > 0 ? Math.max(0, 1 - (discount + voucher) / subtotal) : 1;
    const discountLabel = [
      pct > 0 ? `${pct}% off` : "",
      voucher > 0 ? `rewards voucher $${voucher}` : "",
    ].filter(Boolean).join(" + ");

    const line_items = lines.map((l) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: l.name,
          ...(discountLabel ? { description: `Includes ${discountLabel}` } : {}),
          ...(l.sku ? { metadata: { sku: l.sku } } : {}),
        },
        unit_amount: Math.round(l.unitPrice * factor * 100), // GST-inclusive AUD, in cents
      },
      quantity: l.qty,
    }));

    const shipping_options = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: Math.round(ship.amount * 100), currency: "aud" },
          display_name: ship.label,
          ...(ship.days
            ? {
                delivery_estimate: {
                  minimum: { unit: "business_day", value: Math.max(1, ship.days[0]) },
                  maximum: { unit: "business_day", value: ship.days[1] },
                },
              }
            : {}),
        },
      },
    ];

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_options,
      phone_number_collection: { enabled: true },
      customer_email: customer.email || undefined,
      shipping_address_collection: fulfil === "pickup" ? undefined : { allowed_countries: SHIP_COUNTRIES },
      billing_address_collection: "auto",
      // Prices are GST-inclusive (Australian standard) so no Stripe Tax is added.
      allow_promotion_codes: false,
      success_url: `${SITE_URL}/order-confirmed.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cart.html`,
      metadata: {
        source: "decomuse-web",
        fulfil: String(fulfil),
        suburb: customer.suburb || "",
        postcode: customer.postcode || "",
        subtotal: String(subtotal),
        discount_pct: String(pct),
        discount: String(discount),
        voucher: String(voucher),
        voucher_code: String(body.voucherCode || ""),
        shipping: String(ship.amount),
      },
    });

    return jsonResponse(200, { url: session.url, id: session.id });
  } catch (err) {
    console.error("create-checkout-session error:", err.message);
    // Catalogue/validation problems are the shopper's to see; anything else is ours.
    const clientSafe = /available|enquiry-only|hamper|Gift card|cart|items/i.test(err.message || "");
    return jsonResponse(clientSafe ? 400 : 500, {
      error: clientSafe ? err.message : "Payment could not be started. Please try again or contact us.",
    });
  }
};
