/* ============================================================
   DecoMuse — Issue a gift card  (Netlify Function, staff only)
   ------------------------------------------------------------
   The only way to create store credit that actually spends. Used
   for approved returns credit, goodwill, and competition prizes.

   Protected by a shared secret: without ADMIN_SECRET set, this
   endpoint refuses everything, so it can't be left open by
   accident.

   Required environment variables:
     STRIPE_SECRET_KEY = sk_live_... (the ledger lives in Stripe)
     ADMIN_SECRET      = a long random string you keep private

   Usage (from your own machine — never from the shop's pages):

     curl -X POST https://www.decomuse.com.au/api/issue-gift-card \
       -H "Content-Type: application/json" \
       -d '{"secret":"YOUR_ADMIN_SECRET","amount":52.50,"note":"Return RET-1234"}'

   Responds with the code to give the customer. Pass "code" to use
   a specific one (e.g. a code already emailed to a customer).
   ============================================================ */

const { issueGiftCard, normaliseCode } = require("./_giftcards");

function jsonResponse(statusCode, obj) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify(obj),
  };
}

// Constant-time-ish comparison so a wrong secret leaks nothing by timing.
function secretMatches(given, expected) {
  const a = String(given || ""), b = String(expected || "");
  if (!b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function newCode() {
  return "DMGC-" + Math.floor(100000 + Math.random() * 899999);
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });

  const expected = process.env.ADMIN_SECRET;
  if (!expected) {
    console.error("ADMIN_SECRET is not set — refusing to issue gift cards");
    return jsonResponse(503, { error: "Gift card issuing isn't configured." });
  }

  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch (e) {
    return jsonResponse(400, { error: "Bad request." });
  }

  if (!secretMatches(body.secret, expected)) {
    console.warn("issue-gift-card: bad secret from", event.headers && event.headers["x-forwarded-for"]);
    return jsonResponse(401, { error: "Not authorised." });
  }

  const amount = Number(body.amount);
  if (!isFinite(amount) || amount <= 0 || amount > 2000) {
    return jsonResponse(400, { error: "Amount must be between $0.01 and $2000." });
  }

  const code = body.code ? normaliseCode(body.code) : newCode();
  if (!code) return jsonResponse(400, { error: "Invalid code format — expected DMGC-123456." });

  try {
    const card = await issueGiftCard({
      code,
      amount,
      source: body.source || "staff",
      note: body.note || "",
    });
    return jsonResponse(200, {
      code: card.code,
      amount: card.amount,
      remaining: card.remaining,
      issued: card.issued,
    });
  } catch (err) {
    console.error("issue-gift-card error:", err.message);
    return jsonResponse(500, { error: err.message || "Could not issue that gift card." });
  }
};
