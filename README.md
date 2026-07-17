# DecoMuse — Website

A warm, refined home-décor + lifestyle website for **DecoMuse** (Adelaide). Hybrid **shop + services**, with a **Muse Stylist AI** tool. Built as a fast, self-contained static site (HTML + CSS + vanilla JS) — no build step, deployable anywhere.

## 🎨 Brand
- **Colours:** blush-cream background, dusty **rose/blush pink** primary, **emerald/forest green** secondary, espresso darks.
- **Type:** Playfair Display (headings) + Jost (UI/body).
- Business: Klemzig, Adelaide SA · 0451 609 398 · Decormuseofficial@outlook.com · ABN 41 991 812 955 · est. 2026.

## 📄 Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero carousel, Spend & Save, featured shop, services, reviews, contact |
| `shop.html` | Décor shop with category filters + add-to-cart |
| `staging.html` | Home Styling & Staging (before/after, packages, booking) |
| `catering.html` | Catering — menus + enquiry form |
| `hampers.html` | Gifting / luxury hampers + custom-hamper builder |
| `stylist.html` | **Muse Stylist AI** — upload a room photo → shoppable recommendations |
| `about.html` | About Us |
| `contact.html` | Contact & booking (all services + wholesale) |
| `cart.html` | Shopping cart (localStorage) |

**Services order:** Home Styling/Staging · Residential & Commercial Cleaning · Events & Booking · Catering · Gifting · Wholesale Supplies.

### 🔗 External service sites (already wired)
- **Cleaning** → https://decomuseresidentialcleaning.durable.site
- **Events** → https://decomuseevents.framer.website

## 🗂 Structure
```
css/styles.css      Design system (all styling)
js/data.js          Business config, mega-menu, products, reviews
js/components.js    Shared header (mega-menu) + footer + floating buttons
js/cart.js          Cart (localStorage) + toast + product cards
js/stylist.js       Muse Stylist AI demo logic
js/main.js          Hero carousel, scroll reveal, forms
```

## ▶️ Run locally
Open `index.html` in a browser, **or** for full behaviour (recommended) run a local server from this folder:
```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## 🚀 Go live (free)
1. **Netlify Drop** — drag this folder onto https://app.netlify.com/drop.
2. **GitHub Pages** — push to a repo, enable Pages on the `main` branch.
3. Point your domain (e.g. `decomuse.com.au`) at the host.

## 🔌 Making it real (next steps)
- **Payments:** wire the cart `checkout()` (in `cart.html`) to **Stripe** or **PayPal**.
- **Forms → your inbox:** every booking/enquiry form already sends to `decormuseofficial@outlook.com`.
  - **Default (works now):** submitting opens the shopper's email app pre-addressed to you with all the details filled in — they just hit send.
  - **Recommended (fully automatic, no email app):** create a free form at [formspree.io](https://formspree.io) using `decormuseofficial@outlook.com`, then paste the endpoint into `formEndpoint` in `js/data.js` (e.g. `formEndpoint: "https://formspree.io/f/abcdwxyz"`). Submissions then land in your inbox silently. Works the same with Netlify Forms.
- **Real product photos:** replace the labelled `.ph` placeholders with your collection images.
- **Muse Stylist AI:** swap `analyseRoom()` in `js/stylist.js` for a real vision model (e.g. Claude) + your live catalogue.

## 📝 Notes
- Cart, wishlist and forms are demo/front-end only until connected to a backend.
- All product prices are placeholder AUD values — edit in `js/data.js`.
