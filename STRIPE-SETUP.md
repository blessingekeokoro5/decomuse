# DecoMuse — Stripe Payments Setup

Professional, low-maintenance setup: a static site on Netlify + two serverless
functions + Stripe's hosted checkout. You never handle raw card data, and every
paid order is captured by a webhook.

```
Browser (checkout.html)
   │  POST product ids + quantities only — NO prices
   ▼
Netlify Function: create-checkout-session   ── uses STRIPE_SECRET_KEY
   │  prices/discount/shipping computed here from _catalogue.json
   │  returns Stripe-hosted checkout URL
   ▼
Stripe Checkout page (customer enters card)
   │  on success → order-confirmed.html
   │  in the background ▼
Netlify Function: stripe-webhook            ── verifies signature, emails you the order
```

## How pricing is protected
The browser never tells the server what anything costs. It sends only *what* is
being bought — product id, quantity, colour/size — and the function works out
every dollar figure itself from `netlify/functions/_catalogue.json`, a trusted
copy of your products generated from `js/data.js` at deploy time.

That matters because `js/data.js` ships to the shopper's browser, where anyone
can edit it. Before this, an edited cart was charged as edited: a $1690 sofa
could be bought for $1. Now a tampered price is ignored, an unknown product id
is refused, discounts are capped at the highest rate any real shopper can reach,
rewards vouchers are capped at `MAX_VOUCHER_AUD` (default $250), and shipping is
recalculated from weight and region rather than accepted from the page.

**After editing products in `js/data.js`, run:**
```bash
npm run catalogue      # regenerates netlify/functions/_catalogue.json
```
Netlify also runs this on every deploy, so the two can't drift apart. Commit the
regenerated JSON along with your `js/data.js` change.

> Products added through `admin.html` live in that browser's localStorage only.
> They aren't in the trusted catalogue, so they can't be checked out — add real
> products to `js/data.js` to sell them.

## Files
- `netlify/functions/create-checkout-session.js` — prices the order and builds the payment session
- `netlify/functions/_catalogue.json` — trusted server-side prices (generated; do not hand-edit)
- `scripts/gen-catalogue.js` — regenerates that file from `js/data.js`
- `netlify/functions/stripe-webhook.js` — records/notifies you of paid orders
- `netlify.toml` — tells Netlify where the functions live
- `package.json` — declares the `stripe` dependency
- `js/checkout.js` / `js/data.js` — frontend; `checkoutEndpoint` already points at the function

---

## Step 1 — Create your Stripe account
1. Sign up at https://dashboard.stripe.com/register (free; no monthly fee, ~1.7% + 30¢ per AU card).
2. Complete **business verification** (ABN 41 991 812 955, bank account) so you can accept live payments and get paid out. You can build and test everything before this finishes.

## Step 2 — Get your TEST keys
Stripe starts in **Test mode** (toggle, top-right). Go to **Developers → API keys**:
- Copy **Secret key** `sk_test_...` (keep this private — server only).
- Copy **Publishable key** `pk_test_...` (optional for this setup).

## Step 3 — Deploy to Netlify
1. Push this folder to a GitHub repo (or drag-and-drop deploy).
2. At https://app.netlify.com → **Add new site → Import**, pick the repo.
3. Build settings: leave build command empty, publish directory `.` (netlify.toml already sets this).
4. Deploy. Note your URL, e.g. `https://decomuse.netlify.app`.

## Step 4 — Add environment variables (Netlify)
**Site configuration → Environment variables → Add:**

| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (your test secret key) |
| `SITE_URL` | your live URL **including `www`**, e.g. `https://www.decomuse.com.au` — this is where Stripe returns the shopper after payment. If unset it falls back to `https://www.decomuse.com.au`. |
| `ORDER_EMAIL` | `Decormuseofficial@outlook.com` |
| `WEB3FORMS_KEY` | access key from https://web3forms.com — also how gift-card-paid orders reach you, so worth setting |
| `ADMIN_SECRET` | a long random string, known only to you. Required to issue store credit; without it, nobody can (including you). |
| `MAX_VOUCHER_AUD` | (optional) largest rewards voucher a cart may claim. Defaults to **$20**, matching what rewards issue. |

Then **Deploys → Trigger deploy → Clear cache and deploy** so the functions pick up the variables.

## Step 5 — Create the webhook
1. Stripe **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook`
3. Events to send: select **`checkout.session.completed`**.
4. Save, then copy the **Signing secret** `whsec_...`.
5. Add it in Netlify as `STRIPE_WEBHOOK_SECRET = whsec_...` and redeploy.

## Step 6 — Test with a test card
On your live Netlify URL, add something to cart → checkout → pay with:
- Card `4242 4242 4242 4242`, any future expiry, any CVC, any postcode.
You should land on `order-confirmed.html`, and (if `WEB3FORMS_KEY` is set) get the order email. Check **Stripe → Payments** to see the test payment and **Webhooks** to confirm a `200` delivery.

## Step 7 — Go live
1. Finish Stripe business verification.
2. Switch Stripe to **Live mode**, get the **live** `sk_live_...` key.
3. In Netlify, change `STRIPE_SECRET_KEY` to the `sk_live_...` value.
4. Create a **new webhook in Live mode** (same URL + event) and update `STRIPE_WEBHOOK_SECRET` with its live `whsec_...`.
5. Redeploy. Do one small real purchase to confirm, then refund it in Stripe.

## Optional — the 20% member coupon
1. Stripe **Products → Coupons → New**: 20% off, name it (e.g. WELCOME20).
2. Copy its **coupon ID**, add `STRIPE_COUPON_WELCOME20 = <id>` in Netlify, redeploy.
   The function applies it automatically when a member's `WELCOME20` code reaches checkout.

---

## Hardening notes (for later, optional)
- **Price validation:** the function currently trusts prices sent by the browser. Because your catalogue lives in `js/data.js`, a determined user could alter a price client-side. When you're ready, move the product/price list to a small server-side map the function reads from, and look prices up by `id` instead of trusting `price`.
- **Receipts:** enable customer email receipts in Stripe **Settings → Customer emails**.
- **Refunds/disputes:** handled entirely in the Stripe Dashboard — no code needed.


---

## Gift cards & store credit

Gift cards are the one thing on the site that spends like money, so they are
tracked server-side. Each card is a record in **Stripe** (an inactive Product
whose id is the card code), holding its remaining balance.

**Cards can only be created by the server, two ways:**

1. **Bought and paid for.** `create-checkout-session` notes the code on the
   Stripe session; `stripe-webhook` issues the card only once Stripe confirms
   payment. An abandoned checkout never mints a card, and a replayed webhook
   can't double a balance.
2. **Issued by you**, for approved returns credit, goodwill or prizes:

```bash
curl -X POST https://www.decomuse.com.au/api/issue-gift-card \
  -H "Content-Type: application/json" \
  -d '{"secret":"YOUR_ADMIN_SECRET","amount":52.50,"note":"Return RET-1234"}'
```

It replies with the code to send the customer. Add `"code":"DMGC-123456"` to
issue a specific one. Re-issuing an existing code does nothing, so it's safe to
retry.

**Redeeming** goes through the same checkout function: the card must exist, not
be voided, and hold enough balance to cover the whole order (part-payment isn't
offered online). The balance is decremented server-side and the order is emailed
to you — this is the only record of it, since no Stripe payment takes place.

### Why returns credit changed
The returns page used to create a spendable gift card directly in the customer's
browser, with a 5% bonus, the moment they chose "gift card". Anyone could grant
themselves credit and check out for nothing — and the resulting "order" never
reached DecoMuse at all, so nothing would have shipped, but the confirmation
page said it had.

It now records a credit **request** and tells the customer their code will be
emailed once the return is approved. When you approve it, issue the card with
the command above.

### Checking a card
Stripe Dashboard → **Products** → search the code. `remaining` in its metadata
is the live balance; `source` says whether it was bought or issued by you.
