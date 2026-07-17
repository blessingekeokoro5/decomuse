# DecoMuse — Stripe Payments Setup

Professional, low-maintenance setup: a static site on Netlify + two serverless
functions + Stripe's hosted checkout. You never handle raw card data, and every
paid order is captured by a webhook.

```
Browser (checkout.html)
   │  POST cart
   ▼
Netlify Function: create-checkout-session   ── uses STRIPE_SECRET_KEY
   │  returns Stripe-hosted checkout URL
   ▼
Stripe Checkout page (customer enters card)
   │  on success → order-confirmed.html
   │  in the background ▼
Netlify Function: stripe-webhook            ── verifies signature, emails you the order
```

## Files
- `netlify/functions/create-checkout-session.js` — builds the payment session
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
| `SITE_URL` | your Netlify URL, e.g. `https://decomuse.netlify.app` |
| `ORDER_EMAIL` | `Decormuseofficial@outlook.com` |
| `WEB3FORMS_KEY` | (optional) access key from https://web3forms.com to email you each order |

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
