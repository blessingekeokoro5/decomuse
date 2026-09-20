/* ============================================================
   DecoMuse — Gift card ledger (shared by the functions)
   ------------------------------------------------------------
   A gift card is only worth money if DecoMuse issued it. Until
   now cards were minted in the shopper's own browser, so anyone
   could grant themselves credit and check out for nothing.

   The ledger lives in Stripe: each card is an inactive Stripe
   Product with a deterministic id (gc_DMGC-123456), so we can
   look one up instantly by code — no search index, no delay —
   and its remaining balance is held in metadata.

   Cards are only ever created server-side:
     • stripe-webhook.js  — when a gift card is actually PAID for
     • issue-gift-card.js — by DecoMuse, for approved returns credit

   Required: STRIPE_SECRET_KEY
   ============================================================ */

let _stripe = null;
function stripe() {
  if (!_stripe) _stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  return _stripe;
}

const round2 = (n) => Math.round(n * 100) / 100;

// DMGC-123456 — the format issued across the site.
const CODE_RE = /^DMGC-[A-Z0-9]{4,12}$/i;

function normaliseCode(code) {
  const c = String(code || "").trim().toUpperCase();
  return CODE_RE.test(c) ? c : null;
}

function productId(code) {
  return "gc_" + normaliseCode(code);
}

/* Look a card up by its code. Returns null when no such card was issued. */
async function loadGiftCard(code) {
  const c = normaliseCode(code);
  if (!c) return null;
  try {
    const p = await stripe().products.retrieve(productId(c));
    const m = p.metadata || {};
    return {
      code: c,
      productId: p.id,
      amount: Number(m.amount) || 0,
      remaining: Number(m.remaining) || 0,
      source: m.source || "",
      issued: m.issued || "",
      voided: m.voided === "true",
    };
  } catch (err) {
    if (err && err.statusCode === 404) return null;   // never issued
    throw err;
  }
}

/* Create a card. Idempotent: re-issuing the same code is a no-op,
   so a replayed webhook can't double the balance. */
async function issueGiftCard({ code, amount, source, note }) {
  const c = normaliseCode(code);
  if (!c) throw new Error("Invalid gift card code.");
  const value = round2(Number(amount));
  if (!isFinite(value) || value <= 0 || value > 2000) throw new Error("Invalid gift card amount.");

  const existing = await loadGiftCard(c);
  if (existing) return existing;                      // already issued — leave it alone

  const p = await stripe().products.create({
    id: productId(c),
    name: `DecoMuse Gift Card ${c}`,
    active: false,                                    // ledger record, not a sellable product
    metadata: {
      kind: "gift_card",
      code: c,
      amount: String(value),
      remaining: String(value),
      source: source || "unknown",
      note: (note || "").slice(0, 400),
      issued: new Date().toISOString(),
    },
  });
  return {
    code: c, productId: p.id, amount: value, remaining: value,
    source: source || "unknown", issued: p.metadata.issued, voided: false,
  };
}

/* Spend against a card. Returns the new balance.
   Note: two simultaneous redemptions of the same card could both
   read the old balance. At this shop's volume that's acceptable;
   a proper lock would need a real database. */
async function redeemGiftCard(card, amount) {
  const spend = round2(Number(amount));
  if (!card || card.voided) throw new Error("That gift card is no longer valid.");
  if (!isFinite(spend) || spend <= 0) throw new Error("Invalid redemption amount.");
  if (spend > card.remaining + 0.001) throw new Error("That gift card doesn't have enough balance.");

  const remaining = round2(card.remaining - spend);
  await stripe().products.update(card.productId, {
    metadata: {
      remaining: String(remaining),
      last_redeemed: new Date().toISOString(),
    },
  });
  return remaining;
}

module.exports = { loadGiftCard, issueGiftCard, redeemGiftCard, normaliseCode, productId };
