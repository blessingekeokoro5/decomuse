/* ============================================================
   DÉCOMUSE, Shared components (header, mega-menu, footer)
   Injected into every page for a single source of truth.
   ============================================================ */

/* ---- Canonical URL (points every page at the www host; keeps only meaningful params) ---- */
(function () {
  if (document.querySelector('link[rel="canonical"]')) return;
  const keep = ["id", "doc", "post", "cat"];
  const sp = new URLSearchParams(location.search);
  const out = new URLSearchParams();
  keep.forEach((k) => { if (sp.get(k)) out.set(k, sp.get(k)); });
  const qs = out.toString();
  const link = document.createElement("link");
  link.rel = "canonical";
  link.href = "https://www.decomuse.com.au" + location.pathname + (qs ? "?" + qs : "");
  document.head.appendChild(link);
})();

/* ---- Icon set (inline SVG) ---- */
const IC = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9l-4.5 3.3L16.7 18 12 14.7 7.3 18l1.7-5.7L4.5 9l5.6-1.4z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  caret: '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.8c0-.5.3-.8.8-.8z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.1-.1-.2-1-1.4-1-2.6 0-1.3.7-1.9.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.7-.1 1.2z"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 8 12 3 3 8l9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:16px;height:16px"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.2"/></svg>'
};

/* Australian flag as inline SVG — renders everywhere (Windows can't draw the 🇦🇺 emoji). */
const AU_FLAG_SVG = '<svg class="au-flag" viewBox="0 0 60 40" width="19" height="13" aria-hidden="true" focusable="false" style="border-radius:2px;vertical-align:middle;flex:0 0 auto"><rect width="60" height="40" fill="#012169"/><clipPath id="auJack"><rect width="30" height="20"/></clipPath><g clip-path="url(#auJack)"><path d="M0,0 30,20 M30,0 0,20" stroke="#fff" stroke-width="4"/><path d="M0,0 30,20 M30,0 0,20" stroke="#E4002B" stroke-width="2"/><rect x="13" width="4" height="20" fill="#fff"/><rect y="8" width="30" height="4" fill="#fff"/><rect x="13.75" width="2.5" height="20" fill="#E4002B"/><rect y="8.75" width="30" height="2.5" fill="#E4002B"/></g><circle cx="15" cy="30" r="2.6" fill="#fff"/><circle cx="46" cy="9" r="1.7" fill="#fff"/><circle cx="53" cy="19" r="1.7" fill="#fff"/><circle cx="46" cy="30" r="1.7" fill="#fff"/><circle cx="39" cy="19" r="1.7" fill="#fff"/><circle cx="46" cy="19.5" r="1" fill="#fff"/></svg>';

/* ---- Logo loader: try common formats before falling back to the drawn mark ---- */
const LOGO_SRCS = ["assets/logo.png", "assets/logo.jpg", "assets/logo.jpeg", "assets/logo.webp", "assets/logo.svg"];
function nextLogo(img) {
  const i = (+img.dataset.i || 0) + 1;
  if (i < LOGO_SRCS.length) { img.dataset.i = i; img.src = LOGO_SRCS[i]; }
  else { img.remove(); }
}

/* ---- Nav links (main utility row) ---- */
const NAV_LINKS = [
  { label: "Home", href: "index.html" },
  { label: "Shop", href: "shop.html" },
  { label: "Gifting", href: "hampers.html" },
  { label: "Styling & Design", href: "staging.html" },
  { label: "About", href: "about.html" },
  { label: "Contact", href: "contact.html" }
];

// Category photos used in the mega-menu dropdown promo panels
const CAT_IMG = {
  home:      "assets/cat-home-decor.jpg",
  health:    "assets/cat-wellness.png",
  hampers:   "assets/cat-gifting.png",
  fragrance: "assets/cat-fragrance.png",
  lifestyle: "assets/cat-lifestyle.png"
};

function buildHeader() {
  const page = document.body.dataset.page || "";

  // Mega menu markup
  const megaMarkup = MEGA_MENU.map(cat => {
    const cols = cat.columns.map(col => `
      <div class="mega-col">
        <h5>${col.title}</h5>
        <ul>${col.links.map(l => {
          const isSale = /sale/i.test(l);
          return `<li class="${isSale ? 'sale' : ''}"><a href="shop.html?cat=${encodeURIComponent(cat.label)}">${l}</a></li>`;
        }).join("")}</ul>
      </div>`).join("");
    return `
      <div class="mega" data-mega="${cat.key}">
        <div class="container mega-inner">
          <div>
            <h4>${cat.label}</h4>
            <div class="mega-cols">${cols}</div>
          </div>
          <div class="mega-promo">
            <div class="ph" data-label="decormuse">${CAT_IMG[cat.key] ? `<img class="ph-img" src="${CAT_IMG[cat.key]}" alt="${cat.label}" loading="lazy" onerror="this.remove()">` : ""}</div>
            <div class="mega-promo-actions">
              <a href="#">Rewards</a><a href="#">Referrals</a>
            </div>
          </div>
        </div>
      </div>`;
  }).join("");

  const catTabs = MEGA_MENU.map(cat => {
    const href = cat.key === "hampers" ? "hampers.html" : "";
    return `<li data-cat="${cat.key}"><a${href ? ` href="${href}"` : ""}>${cat.label} ${IC.caret}</a></li>`;
  }).join("");

  // Mobile drawer mirrors the desktop category nav order:
  // categories first, then Styling & Design, About, Contact.
  const mobilePlain = [
    { label: "Our Services", href: "staging.html" },
    { label: "Book Consult", href: "staging.html#book" },
    { label: "Help Centre", href: "support.html" },
    { label: "About Us", href: "about.html" },
    { label: "Trade", href: "trade.html" },
    { label: "Contact Us", href: "contact.html" }
  ];
  const navMain = MEGA_MENU.map(c =>
      `<li><a href="${c.key === "hampers" ? "hampers.html" : "shop.html?cat=" + encodeURIComponent(c.label)}">${c.label}</a></li>`).join("")
    + mobilePlain.map(l => {
      const active = (l.href === page) ? "active" : "";
      return `<li><a class="${active}" href="${l.href}">${l.label}</a></li>`;
    }).join("");

  return `
  <div class="top-utility">
    <div class="container top-utility-inner">
      <div class="tu-left"><a href="policy.html?doc=returns">✓ 30-Day Returns · Free shipping over $500</a></div>
      <div class="tu-right">
        <a href="staging.html#book">Book Consult</a>
        <a href="support.html">Help Centre</a>
        <a href="about.html">About Us</a>
        <a href="trade.html">Trade</a>
        <a href="contact.html">Contact Us</a>
        <button class="tu-region" type="button" aria-label="Choose your region" onclick="openCountryModal()">${AU_FLAG_SVG}<span>AU</span> ${IC.caret}</button>
      </div>
    </div>
  </div>
  <div class="announce"><span class="announce-track" id="announceTrack">${ANNOUNCEMENTS[0]}</span></div>
  <header class="site-header">
    <div class="container nav-utility">
      <button class="nav-toggle" id="navToggle" aria-label="Menu">${IC.menu}</button>
      <a class="brand" href="index.html" aria-label="DecoMuse home">
        <img class="brand-logo-full" src="assets/logo.png" data-i="0" alt="DecoMuse" onload="this.closest('.brand').classList.add('has-logo')" onerror="nextLogo(this)">
        <span class="brand-mark">
          <svg class="brand-logo-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <!-- outer arch -->
            <path d="M16 55 V29 A16 16 0 0 1 48 29 V55"/>
            <!-- inner arch -->
            <path d="M23 55 V30 A9 9 0 0 1 41 30 V55"/>
            <!-- refined base line -->
            <path d="M12 55 H52" stroke-width="1.7"/>
            <!-- symmetric botanical sprig -->
            <path d="M32 52 V26"/>
            <path d="M32 45 C28 44 27 41 28 38 C31 39 32 42 32 45"/>
            <path d="M32 45 C36 44 37 41 36 38 C33 39 32 42 32 45"/>
            <path d="M32 38 C28.6 37 28 34 29 31.5 C31.4 32.5 32 35 32 38"/>
            <path d="M32 38 C35.4 37 36 34 35 31.5 C32.6 32.5 32 35 32 38"/>
            <!-- bud -->
            <circle cx="32" cy="27.5" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </span>
        <span class="brand-text">
          <span class="bt-main">D<span class="amp">&amp;</span>M</span>
          <span class="bt-sub">Home &amp; Living</span>
        </span>
      </a>
      <form class="header-search" id="headerSearch" role="search">
        <button type="button" class="hs-tag" onclick="location.href='stylist.html'">Get inspired</button>
        <button type="button" class="hs-tag" onclick="location.href='shop.html'">🎁 Promotions</button>
        <input type="search" id="headerSearchInput" placeholder="What are you looking for?" aria-label="Search products" autocomplete="off">
        <button type="button" class="hs-icon" id="hsVoice" aria-label="Search by voice" title="Search by voice">${IC.mic}</button>
        <button type="button" class="hs-icon" id="hsCamera" aria-label="Search by photo" title="Search by photo">${IC.camera}</button>
        <input type="file" id="hsCameraInput" accept="image/*" capture="environment" hidden>
        <button type="submit" class="hs-btn" aria-label="Search">${IC.search}</button>
      </form>
      <div class="nav-utility-right">
        <button class="region-btn" id="regionBtn" aria-label="Choose region" title="Choose your region"><span id="regionFlag">🇦🇺</span></button>
        <a class="icon-btn wish-link" href="wishlist.html" aria-label="Wishlist">${IC.heart}</a>
        <div class="account-menu" id="accountMenu">
          <a class="account-trigger" href="account.html">
            <span class="acc-label">My account</span>${IC.user}
          </a>
          <div class="account-dropdown">
            <div class="ad-head">
              <span class="ad-avatar">${IC.user}</span>
              <div class="ad-hi"><strong>Hi there</strong><small>Sign in &amp; discover DecoMuse</small></div>
            </div>
            <div class="ad-auth">
              <a class="btn btn--primary btn--sm btn--block" href="account.html">Log in</a>
              <a class="btn btn--outline btn--sm btn--block" href="account.html">Register</a>
            </div>
            <a class="ad-item" href="track.html"><span class="ad-ic">📦</span><div><strong>My orders</strong><small>Track &amp; view your orders</small></div></a>
            <a class="ad-item" href="account.html"><span class="ad-ic">👤</span><div><strong>My account</strong><small>Details, addresses &amp; payments</small></div></a>
            <a class="ad-item" href="wishlist.html"><span class="ad-ic">♡</span><div><strong>My wishlist</strong><small>Your saved favourites</small></div></a>
            <a class="ad-item" href="account.html"><span class="ad-ic">🏷️</span><div><strong>Discount vouchers</strong><small>Your member coupons</small></div></a>
            <a class="ad-item" href="stylist.html"><span class="ad-ic">✦</span><div><strong>Muse Stylist AI</strong><small>Get styled &amp; shop the look</small></div></a>
            <a class="ad-item" href="contact.html"><span class="ad-ic">💬</span><div><strong>Help &amp; contact</strong><small>We're here to help</small></div></a>
          </div>
        </div>
        <a class="icon-btn" href="cart.html" aria-label="Cart" title="Cart">${IC.bag}<span class="cart-count" id="cartCount">0</span></a>
      </div>
    </div>
    <ul class="nav-main" id="navMain">${navMain}</ul>
    <div class="nav-cats-row" id="navCatsRow">
      <div class="container">
        <ul class="nav-cats" id="navCats">${catTabs}
          <li class="nav-cat-plain"><a href="staging.html">Our Services</a></li>
        </ul>
      </div>
      ${megaMarkup}
    </div>
  </header>`;
}

function buildFooter() {
  const shopLinks = [
    { t: "Shop All", h: "shop.html" },
    { t: "New Arrivals", h: "shop.html" },
    { t: "On Sale", h: "shop.html" },
    { t: "Gift Cards", h: "gift-cards.html" },
    { t: "Gift Hamper Maker", h: "hamper-maker.html" }
  ];
  const decomuseLinks = [
    { t: "About Us", h: "about.html" },
    { t: "Home Styling & Design", h: "staging.html" },
    { t: "Portfolio", h: "portfolio.html" },
    { t: "The Edit — Journal", h: "blog.html" },
    { t: "Assistance & Contact", h: "support.html" },
    { t: "Contact us", h: "contact.html" },
    { t: "Muse Stylist AI", h: "stylist.html" }
  ];
  const infoLinks = [
    { t: "Frequent Questions", h: "policy.html?doc=faq" },
    { t: "Trade & Commercial", h: "trade.html" },
    { t: "Customer reviews", h: "index.html#reviews" },
    { t: "Delivery & Shipping", h: "policy.html?doc=delivery" },
    { t: "Track your order", h: "track.html" }
  ];
  const policyLinks = [
    { t: "General Conditions", h: "policy.html?doc=terms" },
    { t: "Lodge a Return", h: "returns.html" },
    { t: "Returns & Warranty", h: "policy.html?doc=returns" },
    { t: "Delivery & Shipping", h: "policy.html?doc=delivery" },
    { t: "Privacy Policy", h: "policy.html?doc=privacy" },
    { t: "Cookies Policy", h: "policy.html?doc=privacy" }
  ];
  const occasionLinks = [
    { t: "On Sale", h: "shop.html" },
    { t: "Gift Hampers", h: "hampers.html" },
    { t: "Gift Cards", h: "gift-cards.html" },
    { t: "Christmas", h: "hampers.html" },
    { t: "Valentine's Day", h: "hampers.html" },
    { t: "Mother's Day", h: "hampers.html" }
  ];
  const payments = ["Visa","Mastercard","Amex","PayPal","Apple Pay","Google Pay","Afterpay","Klarna","Zip"];
  const col = (title, links) => `<div class="fcol"><h4>${title}</h4>${links.map(l => `<a href="${l.h}">${l.t}</a>`).join("")}</div>`;

  return `
  <footer class="site-footer">
    <div class="news-bar">
      <div class="container news-bar-inner">
        <div class="news-copy">
          <span class="news-badge">✦ The Edit</span>
          <div><strong>Sign up &amp; save 20% on your first order</strong><span>New arrivals, member offers &amp; styling inspiration, straight to your inbox.</span></div>
        </div>
        <form class="news-form2" data-newsletter>
          <input type="email" placeholder="Your email address" aria-label="Email" required>
          <button type="submit" class="btn btn--primary">Sign up</button>
        </form>
      </div>
    </div>

    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="fb-name">DecoMuse</div>
          <div class="fb-tag">${DECOMUSE.tagline}</div>
          <p>Objects worth living with. Australia's curated home, lifestyle &amp; fragrance store, décor, fragrance, wellness, everyday essentials &amp; beautiful gifting.</p>
          <div class="fc-row" style="color:#ddccc2;margin-top:14px"><span class="fc-ic">${DECOMUSE.flag}</span> <strong>${DECOMUSE.location}</strong></div>
          <div class="socials" style="margin-top:16px">
            <a href="${DECOMUSE.socials.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${IC.instagram}</a>
            <a href="${DECOMUSE.socials.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${IC.facebook}</a>
            <a href="mailto:${DECOMUSE.email}" aria-label="Email">${IC.mail}</a>
          </div>
        </div>

        ${col("DecoMuse", decomuseLinks)}
        ${col("Information of interest", infoLinks)}
        ${col("Our policies", policyLinks)}
        ${col("Shop & occasions", occasionLinks)}

        <div class="fcol footer-trust">
          <h4>Rating &amp; trust</h4>
          <div class="ft-stars">★★★★★</div>
          <div class="ft-score">4.9 / 5</div>
          <a class="ft-reviews" href="index.html#reviews">Read our customer reviews →</a>
          <div class="ft-abn">ABN ${DECOMUSE.abn}</div>
        </div>
      </div>

      <div class="app-soon">
        <div class="app-soon-copy">
          <span class="app-badge">📱 Coming soon</span>
          <h4>The DecoMuse app is on its way</h4>
          <p>Shop, style and get inspired on the go. Got an idea or a feature you'd love? Tell us, we're building it for you.</p>
        </div>
        <form class="app-soon-form" data-demo-form data-subject="DecoMuse App — suggestion" data-success-msg="Thank you! Your app suggestion has been sent, we really appreciate it. 💛">
          <input type="email" placeholder="Your email (optional)" aria-label="Email">
          <textarea placeholder="Your suggestion for the DecoMuse app…" aria-label="App suggestion" required></textarea>
          <button type="submit" class="btn btn--primary">Send suggestion</button>
          <div class="form-success"></div>
        </form>
      </div>

      <div class="pay-chips">
        ${payments.map(p => `<span class="pay-chip">${p}</span>`).join("")}
      </div>

      <div class="footer-bottom">
        <span>© ${DECOMUSE.est} DecoMuse. All rights reserved · Proudly Australian ${DECOMUSE.flag}</span>
        <span class="footer-bottom-links">
          <a href="policy.html?doc=delivery">Delivery &amp; Shipping</a> ·
          <a href="policy.html?doc=returns">Returns</a> ·
          <a href="policy.html?doc=privacy">Privacy</a> ·
          <a href="policy.html?doc=terms">Terms</a>
        </span>
      </div>
    </div>
  </footer>`;
}

function buildFloating() {
  return `
    <div class="float-left">
      <button class="float-btn" onclick="history.back()">← <span>Previous page</span></button>
      <button class="float-btn rose" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑ <span>Return to top</span></button>
    </div>

    <div class="chat-nudge" id="chatNudge">
      <button class="nudge-x" id="nudgeX" aria-label="Dismiss">✕</button>
      <span>👋 Hi! I'm <strong>MuseStylist</strong>, need a hand finding something?</span>
    </div>

    <button class="ai-fab" id="aiFab" aria-label="Chat with MuseStylist AI" title="Chat with MuseStylist AI">
      <span class="dot"></span>${IC.spark}
    </button>

    <div class="chat-panel" id="chatPanel" aria-hidden="true">
      <div class="chat-head">
        <div class="chat-head-id">
          <span class="chat-avatar">${IC.spark}</span>
          <div>
            <strong>MuseStylist AI</strong>
            <small><span class="chat-online"></span> Typically replies instantly</small>
          </div>
        </div>
        <button class="chat-close" id="chatClose" aria-label="Close chat">✕</button>
      </div>
      <div class="chat-tabs" id="chatTabs">
        <button type="button" class="chat-tab active" data-tab="chat">✦ MuseStylist</button>
        <button type="button" class="chat-tab" data-tab="text">💬 Text me back</button>
      </div>
      <div class="chat-view" id="chatViewChat">
        <div class="chat-body" id="chatBody"></div>
        <div class="chat-quick" id="chatQuick"></div>
        <form class="chat-input" id="chatForm">
          <input type="text" id="chatText" placeholder="Ask me anything…" autocomplete="off">
          <button type="submit" aria-label="Send">${IC.arrow}</button>
        </form>
      </div>
      <div class="chat-view chat-textback" id="chatViewText" hidden>
        <p class="ctb-intro">💬 Enter your details and our team will <strong>text you back</strong> shortly, usually within business hours.</p>
        <form id="ctbForm">
          <div class="field"><label>Name</label><input id="ctbName" required></div>
          <div class="field"><label>Mobile phone</label><input id="ctbPhone" type="tel" placeholder="04XX XXX XXX" required></div>
          <div class="field"><label>Message</label><textarea id="ctbMsg" placeholder="How can we help?" style="min-height:70px"></textarea></div>
          <button type="submit" class="btn btn--primary btn--block" id="ctbSend">Send</button>
          <div class="form-success" id="ctbSuccess"></div>
          <p class="ctb-consent">By submitting, you authorise DecoMuse to text or call the number above about your enquiry. Message &amp; data rates may apply; message frequency varies. Consent is not a condition of purchase. See our <a href="policy.html?doc=privacy">privacy policy</a>.</p>
        </form>
      </div>
    </div>`;
}

/* ============================================================
   Weekly flash sale, a different random day each week (auto-resets),
   active for a 3-hour window, with a live countdown.
   Deterministic per ISO week so it's the same for every visitor.
   ============================================================ */
function isoWeekKey(d) {
  const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (dt.getUTCDay() + 6) % 7;
  dt.setUTCDate(dt.getUTCDate() - dayNum + 3);
  const firstThu = new Date(Date.UTC(dt.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((dt - firstThu) / 86400000 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7);
  return dt.getUTCFullYear() * 100 + week;
}
function hashInt(n) { n = (n ^ 61) ^ (n >>> 16); n = n + (n << 3); n = n ^ (n >>> 4); n = Math.imul(n, 0x27d4eb2d); n = n ^ (n >>> 15); return Math.abs(n); }

const FLASH_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Deterministic flash config for the ISO week containing a given date
function flashForDate(d) {
  const h = hashInt(isoWeekKey(d));
  return { day: h % 7, startHour: 10 + (h % 7), percent: [10, 15, 20][h % 3] };
}
function fmtHour12(h) { const ap = h >= 12 ? "pm" : "am"; return `${((h + 11) % 12) + 1}${ap}`; }

function getFlashSale(now) {
  now = now || new Date();
  const f = flashForDate(now);
  const start = new Date(now); start.setHours(f.startHour, 0, 0, 0);
  const endsAt = start.getTime() + 3 * 3600 * 1000;   // 3-hour window
  const preview = typeof location !== "undefined" && /flashpreview/.test(location.search);
  const active = preview || (now.getDay() === f.day && now.getTime() >= start.getTime() && now.getTime() < endsAt);
  return { active, day: f.day, percent: f.percent, code: "FLASH" + f.percent, startHour: f.startHour, endsAt: preview ? (now.getTime() + 3 * 3600 * 1000) : endsAt };
}

// Is the flash sale tomorrow? (for the day-before teaser)
function getUpcomingFlash(now) {
  now = now || new Date();
  const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
  const f = flashForDate(tomorrow);
  const preview = typeof location !== "undefined" && /flashtomorrow/.test(location.search);
  if (preview || tomorrow.getDay() === f.day) {
    return { isTomorrow: true, percent: f.percent, startHour: f.startHour, dayName: FLASH_DAYS[f.day] };
  }
  return { isTomorrow: false };
}

function initFlashBar() {
  const f = getFlashSale();
  if (f.active) { showFlashLive(f); maybeNotifyLive(f); return; }
  const up = getUpcomingFlash();
  if (up.isTomorrow) showFlashTeaser(up);
}

function showFlashLive(f) {
  let dismissed = null; try { dismissed = sessionStorage.getItem("dm_flash_" + f.endsAt); } catch (e) {}
  if (dismissed) return;
  const html = `<div class="flash-bar" id="flashBar"><span class="flash-ic">⚡</span>
    <span class="flash-text">Flash Sale, <strong>${f.percent}% OFF</strong> everything! Ends in <span id="flashTimer">--:--:--</span></span>
    <a class="flash-cta" href="shop.html">Shop now →</a>
    <button class="flash-x" id="flashX" aria-label="Close">✕</button></div>`;
  document.body.insertAdjacentHTML("afterbegin", html);
  const timerEl = document.getElementById("flashTimer");
  const tick = () => {
    const ms = f.endsAt - Date.now();
    if (ms <= 0) { const b = document.getElementById("flashBar"); if (b) b.remove(); clearInterval(iv); return; }
    const s = Math.floor(ms / 1000);
    if (timerEl) timerEl.textContent = [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map(n => String(n).padStart(2, "0")).join(":");
  };
  tick(); const iv = setInterval(tick, 1000);
  document.getElementById("flashX").addEventListener("click", () => {
    const b = document.getElementById("flashBar"); if (b) b.remove();
    try { sessionStorage.setItem("dm_flash_" + f.endsAt, "1"); } catch (e) {}
  });
}

function showFlashTeaser(up) {
  let dismissed = null; try { dismissed = sessionStorage.getItem("dm_teaser_" + up.dayName); } catch (e) {}
  if (dismissed) return;
  const html = `<div class="flash-bar teaser" id="flashTeaser"><span class="flash-ic">⏰</span>
    <span class="flash-text">Heads up! Our <strong>Flash Sale is tomorrow</strong> (${up.dayName}), <strong>${up.percent}% OFF</strong> from ${fmtHour12(up.startHour)} for 3 hours.</span>
    <button class="flash-cta" id="flashRemind">🔔 Remind me</button>
    <button class="flash-x" id="teaserX" aria-label="Close">✕</button></div>`;
  document.body.insertAdjacentHTML("afterbegin", html);
  document.getElementById("teaserX").addEventListener("click", () => {
    const b = document.getElementById("flashTeaser"); if (b) b.remove();
    try { sessionStorage.setItem("dm_teaser_" + up.dayName, "1"); } catch (e) {}
  });
  document.getElementById("flashRemind").addEventListener("click", () => {
    try { localStorage.setItem("dm_flash_notify", "1"); } catch (e) {}
    if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission().then(p => {
        showToast(p === "granted" ? "Great, we'll notify you when it starts 🔔" : "Saved! We'll flag it next time you visit ✦");
      });
    } else { showToast("Saved! We'll flag the sale for you ✦"); }
  });
}

// Fire an on-device notification when the sale goes live (if they opted in)
function maybeNotifyLive(f) {
  let want = null, done = null;
  try { want = localStorage.getItem("dm_flash_notify"); done = localStorage.getItem("dm_flash_notified_" + f.endsAt); } catch (e) {}
  if (!want || done) return;
  if (window.Notification && Notification.permission === "granted") {
    try {
      new Notification("DecoMuse Flash Sale is live! ⚡", { body: `${f.percent}% off everything for the next 3 hours. Shop now!` });
      localStorage.setItem("dm_flash_notified_" + f.endsAt, "1");
    } catch (e) {}
  }
}

/* ---- Inject on load ---- */
function injectComponents() {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.innerHTML = buildHeader();
  if (f) f.innerHTML = buildFooter();
  document.body.insertAdjacentHTML("beforeend", buildFloating());
  document.body.insertAdjacentHTML("beforeend", buildMemberModal());
  document.body.insertAdjacentHTML("beforeend", buildSearchOverlay());
  document.body.insertAdjacentHTML("beforeend", buildCookieBar());
  document.body.insertAdjacentHTML("beforeend", buildCountryModal());
  injectFavicon();
  wireNav();
  rotateAnnouncements();
  initChat();
  initSearch();
  initCookies();
  initCountry();
  initMemberModal();
  initFlashBar();
}

/* ---- Favicon (injected on every page), D&M house mark ---- */
function injectFavicon() {
  if (document.querySelector('link[rel="icon"]')) return;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="%23F6EEE8"/><g fill="none" stroke="%23A5586A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 54 V30 A14 14 0 0 1 46 30 V54"/><path d="M32 52 V28"/><path d="M32 44 C28 43 27 40 28 37 C31 38 32 41 32 44"/><path d="M32 44 C36 43 37 40 36 37 C33 38 32 41 32 44"/><path d="M32 37 C29 36 28.5 33 29.5 31 C31.5 32 32 34 32 37"/><path d="M32 37 C35 36 35.5 33 34.5 31 C32.5 32 32 34 32 37"/></g><circle cx="32" cy="27" r="1.6" fill="%23A5586A"/></svg>`;
  const link = document.createElement("link");
  link.rel = "icon"; link.type = "image/svg+xml";
  link.href = "data:image/svg+xml," + svg.replace(/#/g, "%23").replace(/"/g, "'");
  document.head.appendChild(link);
}

/* ---- Cookie settings modal ---- */
function buildCookieBar() {
  return `
  <div class="cookie-modal" id="cookieBar" role="dialog" aria-label="Cookie settings">
    <div class="cookie-card">
      <h3>Cookie settings</h3>
      <p>At DecoMuse we use cookies to keep your cart and preferences, improve your browsing and show you more relevant products. You can accept all, or keep only what's essential. Read our <a href="policy.html?doc=privacy">Privacy &amp; Cookie Policy</a>.</p>

      <div class="cookie-row">
        <div>
          <strong>Essential cookies</strong>
          <small>Needed for the site to work, cart, secure checkout and page navigation. Always on.</small>
        </div>
        <span class="cookie-toggle on locked" aria-hidden="true"></span>
      </div>
      <div class="cookie-row">
        <div>
          <strong>Analytics &amp; personalisation</strong>
          <small>Help us understand what you love and tailor recommendations &amp; offers.</small>
        </div>
        <button class="cookie-toggle on" id="cookieAnalytics" role="switch" aria-checked="true" aria-label="Analytics cookies"></button>
      </div>

      <div class="cookie-actions">
        <button class="btn btn--outline btn--sm" id="cookieEssential">Essential only</button>
        <button class="btn btn--primary" id="cookieAccept">Accept all</button>
      </div>
    </div>
  </div>`;
}
function initCookies() {
  const bar = document.getElementById("cookieBar");
  if (!bar) return;
  let choice = null; try { choice = localStorage.getItem("dm_cookies"); } catch (e) {}
  if (choice) return;
  const analytics = document.getElementById("cookieAnalytics");
  if (analytics) analytics.addEventListener("click", () => {
    const on = analytics.classList.toggle("on");
    analytics.setAttribute("aria-checked", on ? "true" : "false");
  });
  const close = (val) => { try { localStorage.setItem("dm_cookies", val); } catch (e) {} bar.classList.remove("show"); };
  document.getElementById("cookieAccept").addEventListener("click", () => close("all"));
  document.getElementById("cookieEssential").addEventListener("click", () => close("essential"));
  setTimeout(() => bar.classList.add("show"), 800);
}

/* ============================================================
   Country / region selector (based on visitor's location)
   ============================================================ */
const REGIONS = {
  AU: { name: "Australia", flag: "🇦🇺", cur: "AUD" },
  NZ: { name: "New Zealand", flag: "🇳🇿", cur: "NZD" },
  GB: { name: "United Kingdom", flag: "🇬🇧", cur: "GBP" },
  US: { name: "United States", flag: "🇺🇸", cur: "USD" },
  CA: { name: "Canada", flag: "🇨🇦", cur: "CAD" },
  AE: { name: "United Arab Emirates", flag: "🇦🇪", cur: "AED" },
  DE: { name: "Germany", flag: "🇩🇪", cur: "EUR" },
  NL: { name: "Netherlands", flag: "🇳🇱", cur: "EUR" }
};
const HOME_REGION = "AU";

function detectRegion() {
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "");
    if (/Australia/.test(tz)) return "AU";
    if (/Auckland/.test(tz)) return "NZ";
    if (/London/.test(tz)) return "GB";
    if (/Dubai/.test(tz)) return "AE";
    if (/Toronto|Vancouver|Edmonton|Winnipeg|Halifax/.test(tz)) return "CA";
    if (/Berlin/.test(tz)) return "DE";
    if (/Amsterdam/.test(tz)) return "NL";
    if (/America\//.test(tz)) return "US";
    const lang = (navigator.language || "").toUpperCase();
    for (const code of Object.keys(REGIONS)) if (lang.endsWith("-" + code)) return code;
  } catch (e) {}
  return HOME_REGION;
}

function buildCountryModal() {
  const options = Object.keys(REGIONS).map(c => `<option value="${c}">${REGIONS[c].flag} ${REGIONS[c].name} (${REGIONS[c].cur})</option>`).join("");
  return `
  <div class="country-modal" id="countryModal" aria-hidden="true">
    <div class="country-overlay" id="countryOverlay"></div>
    <div class="country-card" role="dialog" aria-label="Confirm your country">
      <button class="country-close" id="countryClose" aria-label="Close">✕</button>
      <h3>Confirm your country</h3>
      <p>You're shopping the <strong>DecoMuse Australia</strong> store <span id="homeFlag">🇦🇺</span>. We ship to Australia &amp; New Zealand, confirm your region for delivery &amp; pricing info.</p>
      <div class="country-detected" id="countryDetected"></div>
      <label class="country-select-label">Shopping from another country?
        <select id="countrySelect">${options}</select>
      </label>
      <div class="country-note" id="countryNote"></div>
      <div class="country-actions">
        <button class="btn btn--outline btn--sm" id="countryStay">Stay on Australia store</button>
        <button class="btn btn--primary" id="countryConfirm">Confirm region</button>
      </div>
    </div>
  </div>`;
}

function updateCountryNote() {
  const sel = document.getElementById("countrySelect");
  const r = REGIONS[sel.value];
  const note = document.getElementById("countryNote");
  if (r.cur === "AUD") note.innerHTML = `✓ Prices shown in AUD · free shipping over $500.`;
  else note.innerHTML = `We ship to ${r.flag} <strong>${r.name}</strong>. Prices are shown in <strong>AUD</strong>; your bank converts to ${r.cur} at checkout. International delivery times &amp; any duties apply.`;
}

function updateRegionFlag() {
  let code = null; try { code = localStorage.getItem("dm_region"); } catch (e) {}
  code = code || detectRegion();
  const flag = document.getElementById("regionFlag");
  const btn = document.getElementById("regionBtn");
  if (flag && REGIONS[code]) flag.textContent = REGIONS[code].flag;
  if (btn && REGIONS[code]) btn.title = "Region: " + REGIONS[code].name + ", click to change";
}

function initCountry() {
  const modal = document.getElementById("countryModal");
  const regionBtn = document.getElementById("regionBtn");
  if (regionBtn) regionBtn.addEventListener("click", openCountryModal);
  updateRegionFlag();
  if (!modal) return;
  let chosen = null; try { chosen = localStorage.getItem("dm_region"); } catch (e) {}
  const detected = detectRegion();

  const sel = document.getElementById("countrySelect");
  sel.value = chosen || detected;
  document.getElementById("countryDetected").innerHTML =
    `<span class="country-flag">${REGIONS[detected].flag}</span> Looks like you're visiting from <strong>${REGIONS[detected].name}</strong>.`;
  updateCountryNote();
  sel.addEventListener("change", updateCountryNote);

  const save = (code) => { try { localStorage.setItem("dm_region", code); } catch (e) {} updateRegionFlag(); closeCountry();
    // Confirmation toast on desktop only; hidden on mobile phones (prices are always AUD).
    if (window.innerWidth > 768) showToast(`Shopping ${REGIONS[code].flag} ${REGIONS[code].name} · prices in AUD`); };
  document.getElementById("countryConfirm").addEventListener("click", () => save(sel.value));
  document.getElementById("countryStay").addEventListener("click", () => save(HOME_REGION));
  document.getElementById("countryClose").addEventListener("click", closeCountry);
  document.getElementById("countryOverlay").addEventListener("click", closeCountry);

  // Show on first visit (once), shortly after the cookie choice
  if (!chosen) setTimeout(() => modal.classList.add("open"), 1500);
}
function closeCountry() {
  const m = document.getElementById("countryModal");
  if (m) { m.classList.remove("open"); m.setAttribute("aria-hidden", "true"); }
}
function openCountryModal() {
  const m = document.getElementById("countryModal");
  if (m) { m.classList.add("open"); m.setAttribute("aria-hidden", "false"); }
}

/* ============================================================
   Product search overlay
   ============================================================ */
function buildSearchOverlay() {
  return `
  <div class="search-overlay" id="searchOverlay" aria-hidden="true">
    <div class="search-inner">
      <div class="search-bar">
        ${IC.search}
        <input type="text" id="searchInput" placeholder="Search décor, furniture, candles…" autocomplete="off" aria-label="Search products">
        <button id="searchClose" aria-label="Close search">✕</button>
      </div>
      <div class="search-results" id="searchResults"></div>
    </div>
  </div>`;
}

function initSearch() {
  const overlay = document.getElementById("searchOverlay");
  const input = document.getElementById("searchInput");
  const close = document.getElementById("searchClose");
  const results = document.getElementById("searchResults");
  const hsForm = document.getElementById("headerSearch");
  const hsInput = document.getElementById("headerSearchInput");
  if (!overlay) return;

  const open = () => { overlay.classList.add("open"); overlay.setAttribute("aria-hidden", "false");
    renderResults(input.value); setTimeout(() => input.focus(), 150); };
  const closeFn = () => { overlay.classList.remove("open"); overlay.setAttribute("aria-hidden", "true"); };

  // Header search bar drives the overlay
  if (hsForm) hsForm.addEventListener("submit", (e) => { e.preventDefault(); input.value = hsInput.value; open(); });
  if (hsInput) hsInput.addEventListener("input", () => { if (hsInput.value.trim()) { input.value = hsInput.value; if (!overlay.classList.contains("open")) open(); else renderResults(input.value); } });

  // Voice search — Web Speech API fills the search and runs it
  const voiceBtn = document.getElementById("hsVoice");
  if (voiceBtn) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { voiceBtn.style.display = "none"; }
    else {
      voiceBtn.addEventListener("click", () => {
        const rec = new SR();
        rec.lang = "en-AU"; rec.interimResults = false; rec.maxAlternatives = 1;
        voiceBtn.classList.add("listening");
        showToast("Listening… say what you're looking for 🎙️");
        rec.onresult = (ev) => {
          const said = ev.results[0][0].transcript || "";
          if (hsInput) hsInput.value = said;
          input.value = said; open(); renderResults(said);
        };
        rec.onerror = () => showToast("Couldn't hear that — please try again");
        rec.onend = () => voiceBtn.classList.remove("listening");
        try { rec.start(); } catch (e) { voiceBtn.classList.remove("listening"); }
      });
    }
  }

  // Photo search — snap/upload a photo, hand it to Muse Stylist for visual matching
  const camBtn = document.getElementById("hsCamera");
  const camInput = document.getElementById("hsCameraInput");
  if (camBtn && camInput) {
    camBtn.addEventListener("click", () => camInput.click());
    camInput.addEventListener("change", () => {
      const file = camInput.files && camInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try { sessionStorage.setItem("dm_visual_search", e.target.result); } catch (err) {}
        showToast("Finding pieces to match your photo ✦");
        location.href = "stylist.html";
      };
      reader.readAsDataURL(file);
    });
  }
  close.addEventListener("click", closeFn);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeFn(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeFn(); });
  input.addEventListener("input", () => renderResults(input.value));

  function renderResults(q) {
    q = q.trim().toLowerCase();
    const list = !q
      ? PRODUCTS.filter(p => p.tag).slice(0, 5)
      : PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
    if (!q) {
      results.innerHTML = `<div class="search-hint">Popular right now</div>` + itemsHTML(list);
    } else if (!list.length) {
      results.innerHTML = `<div class="search-empty">No matches for “${q.replace(/</g,"&lt;")}”.<br><a href="shop.html">Browse the full shop →</a></div>`;
    } else {
      results.innerHTML = `<div class="search-hint">${list.length} result${list.length > 1 ? "s" : ""}</div>` + itemsHTML(list.slice(0, 7));
    }
  }
  function itemsHTML(list) {
    return list.map(p => `
      <a class="search-item" href="product.html?id=${p.id}">
        <span class="search-thumb"><span class="ph ${p.ph}" data-label="${p.name}"></span></span>
        <span class="search-meta"><strong>${p.name}</strong><span>${p.cat}</span></span>
        <span class="search-price">${money(p.price)}</span>
      </a>`).join("");
  }
}

/* ---- Animated slide-in membership banner (auto show + auto close) ---- */
function buildMemberBanner() {
  return `
  <div class="promo-banner" id="promoBanner" role="dialog" aria-label="Membership offer">
    <button class="promo-close" id="promoClose" aria-label="Close">✕</button>
    <span class="promo-badge">✦ Members</span>
    <div class="promo-copy">
      <strong>Save 20% on your first order</strong>
      <span>Early access · member-only offers · a birthday treat</span>
    </div>
    <button class="btn btn--primary btn--sm" onclick="openMemberModal();hideMemberBanner();">Become a member</button>
  </div>`;
}

let promoTimer;
function hideMemberBanner() {
  const b = document.getElementById("promoBanner");
  if (b) b.classList.remove("show");
  clearTimeout(promoTimer);
  try { sessionStorage.setItem("dm_promo_dismissed", "1"); } catch (e) {}
}
function initMemberBanner() {
  const banner = document.getElementById("promoBanner");
  if (!banner) return;
  const close = document.getElementById("promoClose");
  if (close) close.addEventListener("click", hideMemberBanner);

  let joined = false, dismissed = false;
  try { joined = localStorage.getItem("dm_member"); dismissed = sessionStorage.getItem("dm_promo_dismissed"); } catch (e) {}
  if (joined || dismissed) return;

  // Appear after a short delay, then auto-close after a few seconds (pauses on hover)
  setTimeout(() => {
    banner.classList.add("show");
    const startAutoClose = () => { promoTimer = setTimeout(hideMemberBanner, 7000); };
    startAutoClose();
    banner.addEventListener("mouseenter", () => clearTimeout(promoTimer));
    banner.addEventListener("mouseleave", startAutoClose);
  }, 2000);
}

/* ============================================================
   Membership sign-up modal (20% off + perks)
   ============================================================ */
function buildMemberModal() {
  return `
  <div class="member-modal" id="memberModal" aria-hidden="true">
    <div class="member-overlay" id="memberOverlay"></div>
    <div class="member-card" role="dialog" aria-label="Join the DecoMuse Membership">
      <div class="member-visual" style="background-image:url('assets/member-bg.jpg')"></div>
      <div class="member-body">
        <button class="member-close" id="memberClose" aria-label="Close">✕</button>
        <span class="member-eyebrow">✦ DecoMuse Membership</span>
        <h3 class="member-title">Get the <em>inside scoop</em></h3>
        <p class="member-offer">Subscribe &amp; receive <strong>20% off</strong> your first order</p>
        <p class="member-sub">Plus member-only pricing, early access to new collections, styling tips and a little birthday treat.</p>
        <form id="memberForm" class="member-form">
          <input type="email" placeholder="Enter your email address" aria-label="Email" required>
          <button type="submit" class="btn btn--primary btn--block">Subscribe</button>
        </form>
        <p class="member-terms">By subscribing you agree to receive DecoMuse emails; unsubscribe anytime. See our <a href="policy.html?doc=privacy">Privacy Policy</a> &amp; <a href="policy.html?doc=terms">Terms</a>. *T&amp;C's apply.</p>
        <button class="member-later" id="memberLater">No thanks</button>
      </div>
    </div>
  </div>`;
}

function openMemberModal() {
  const m = document.getElementById("memberModal");
  if (m) { m.classList.add("open"); m.setAttribute("aria-hidden", "false"); }
}
function closeMemberModal() {
  const m = document.getElementById("memberModal");
  if (m) { m.classList.remove("open"); m.setAttribute("aria-hidden", "true"); }
  try { sessionStorage.setItem("dm_member_dismissed", "1"); } catch (e) {}
}

function initMemberModal() {
  const modal = document.getElementById("memberModal");
  if (!modal) return;
  const close = document.getElementById("memberClose");
  const overlay = document.getElementById("memberOverlay");
  const later = document.getElementById("memberLater");
  const form = document.getElementById("memberForm");

  [close, overlay, later].forEach(el => el && el.addEventListener("click", closeMemberModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMemberModal(); });

  if (form) form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = (form.querySelector("input") || {}).value || "";
    try { localStorage.setItem("dm_member", "1"); } catch (er) {}
    // Create / update their account so the profile shows membership + coupon
    if (typeof saveAccount === "function") {
      const existing = getAccount() || {};
      saveAccount({
        name: existing.name || "",
        email: email.trim() || existing.email || "",
        member: true,
        memberSince: existing.memberSince || todayAU(),
        coupon: existing.coupon || "WELCOME20"
      });
    }
    closeMemberModal();
    showToast("Welcome to DecoMuse! Your 20% code WELCOME20 is ready 🎉");
  });

  // Auto-show once per session on visit (unless already a member or dismissed)
  let joined = null, dismissed = null;
  try { joined = localStorage.getItem("dm_member"); dismissed = sessionStorage.getItem("dm_member_dismissed"); } catch (e) {}
  if (!joined && !dismissed) {
    const tryShow = () => {
      // Don't stack on top of the country modal, wait until it's closed
      const country = document.getElementById("countryModal");
      if (country && country.classList.contains("open")) { setTimeout(tryShow, 1500); return; }
      openMemberModal();
    };
    setTimeout(tryShow, 2600);
  }
}

/* ============================================================
   MuseStylist AI, shopper chat widget (client-side)
   ============================================================ */
const CHAT_QUICK = [
  { label: "🌸 Shop fragrance" },
  { label: "🌿 Health & wellness" },
  { label: "🎁 Build a hamper" },
  { label: "🛍️ Bestsellers" },
  { label: "🚚 Shipping & delivery" },
  { label: "💬 Talk to a human" }
];

// Pre-filled WhatsApp handoff to a real team member
const WA_HANDOFF = (DECOMUSE.socials.whatsapp || "https://wa.me/61451609398") +
  "?text=" + encodeURIComponent("Hi DecoMuse 🙂 I'd like to chat with a team member about ");
function waButton(label) {
  return `<a class="chat-wa" href="${WA_HANDOFF}" target="_blank" rel="noopener">${IC.wa} ${label || "Chat with a human on WhatsApp"}</a>`;
}

/* ---- Trained knowledge base: confident, specific answers ---- */
function chatReply(text) {
  const t = " " + text.toLowerCase() + " ";
  const link = (href, label) => `<a href="${href}">${label}</a>`;
  const has = (re) => re.test(t);
  let unsure = false, html;

  if (has(/\b(hi|hey|hello|hiya|good (morning|afternoon|evening)|how are you)\b/))
    html = `Hi, lovely to meet you! 👋 I'm MuseStylist, your personal shopping assistant. I can help you find a fragrance, wellness pick or home piece, build a gift hamper, or track an order. What are you after today?`;

  else if (has(/\b(human|real person|agent|team member|speak to someone|talk to someone|representative|customer service)\b/))
    html = `Of course, I'll connect you with a real DecoMuse team member. Reach us straight away on WhatsApp, or email ${DECOMUSE.email}.<br>${waButton()}`;

  else if (has(/\b(fragrance|perfume|scent|cologne|eau de|aftershave|diffuser)\b/))
    html = `Our ${link("shop.html?cat=Fragrance", "Fragrance")} range spans perfume for her & him, unisex scents, reed diffusers, candles and room sprays 🌸. New to us? Try the <strong>Discovery Set, 5 Scents</strong>.`;

  else if (has(/\b(wellness|health|skincare|\bskin\b|bath|body|supplement|vitamin|aromatherapy|self.?care|soak|facial|serum)\b/))
    html = `Lovely, our ${link("shop.html?cat=" + encodeURIComponent("Health & Wellness"), "Health & Wellness")} edit has bath & body, skincare, aromatherapy and supplements 🌿. The Magnesium Bath Soak and Rosehip Facial Oil are favourites.`;

  else if (has(/\b(book|consult|consultation|staging|stage|interior design|stylist visit|in.?home|virtual styling|appointment)\b/))
    html = `We'd love to style your space! ✦ Book a <strong>home styling, staging or interior design</strong> consultation (in-home or virtual, worldwide) on our ${link("staging.html#book", "Styling & Design")} page, or try the free ${link("stylist.html", "Muse Stylist AI")}.`;

  else if (has(/\b(style|styling|room|décor|decor|design|interior|furniture|\bhome\b|makeover|colour|color|theme|vibe|aesthetic|lamp|rug|mirror|sofa|cushion|vase)\b/))
    html = `I'd love to help you style your space! ✦ Upload a photo to the ${link("stylist.html", "Muse Stylist AI")} for instant, shoppable picks, browse ${link("shop.html?cat=" + encodeURIComponent("Home Décor"), "Home Décor")}, or book a ${link("staging.html", "styling consultation")}.`;

  else if (has(/\b(ship|shipping|deliver|delivery|post|postage|freight|worldwide|international|country|countries|how long|when.*(arrive|get|receive)|dispatch)\b/) && !has(/\buber\b/))
    html = `Great question! 📦 We offer <strong>free standard shipping on orders over $500</strong> Australia-wide, with most orders arriving in <strong>3 to 8 business days</strong>. We ship to <strong>Australia &amp; New Zealand</strong>. All home-décor is dispatched from our Melbourne warehouse. Full details in our ${link("policy.html?doc=delivery", "Delivery Policy")}.`;

  else if (has(/\b(lifestyle|candle|throw|cushion|linen|homeware|kitchen|dining|stationery|everyday|essential)\b/))
    html = `Our ${link("shop.html?cat=Lifestyle", "Lifestyle")} edit is full of everyday beautiful things, candles, textiles, kitchen & dining and little essentials ✦.`;

  else if (has(/\b(hamper|gift box|gift basket|build.*(box|gift|hamper)|make.*(hamper|gift))\b/) || has(/\bgift\b/) && has(/\b(build|make|custom|create)\b/))
    html = `What a lovely idea! 🎁 Use our ${link("hamper-maker.html", "Gift Hamper Maker")} to build a custom box, pick a box, add treats, drinks, pamper & home touches, watch the total, add a gift note, then straight to cart (min $60). Prefer ready-made? Browse the ${link("hampers.html", "Gifting")} page.`;

  else if (has(/\b(how (do i|to) clean|care for|look after|maintain|wash|stain)\b/))
    html = `Happy to help you care for your pieces! 🌿 As a rule: dust timber with a soft dry cloth, spot-clean upholstery with a damp cloth, and keep candles trimmed to 5mm. If you tell me the exact item, I can be more specific, or our team can advise on ${link("contact.html", "Contact")}.`;

  else if (has(/\b(best|bestseller|popular|recommend|trending|top seller|favourite|favorite)\b/))
    html = `Our most-loved pieces right now: the <strong>Arched Rattan Floor Mirror</strong>, <strong>Bouclé Accent Armchair</strong> and <strong>Wattle Soy Candle Trio</strong>, all in the ${link("shop.html", "Shop")} 🛍️. Want me to point you to a specific room?`;

  else if (has(/\b(afterpay|klarna|zip|instal|instalment|payment plan|pay later|pay in)\b/))
    html = `Yes, shop now, pay later! 💳 We offer <strong>Afterpay, Klarna and Zip</strong> at checkout, alongside Visa, Mastercard, Amex, PayPal and Apple/Google Pay.`;

  else if (has(/\b(member|membership|join|sign up|loyalty|rewards)\b/))
    html = `Join free and get <strong>20% off your first purchase</strong> 🎉, plus early access to new arrivals, member-only offers and a birthday treat. Look for the "Become a member" banner, or I can pop it open for you!`;

  else if (has(/\b(price|cost|how much|expensive|cheap|budget|afford|discount|sale|coupon|promo|voucher)\b/))
    html = `We have something for every budget, from $14 coasters to statement furniture 💛. New here? <strong>Become a member for 20% off your first order</strong>, then filter by category in the ${link("shop.html", "Shop")}. Gift cards are available too!`;

  else if (has(/\b(track|tracking|where.*order|order status|my order|find my order)\b/))
    html = `You can track your order anytime on our ${link("track.html", "Track Your Order")} page, just enter your order number, email or phone used at checkout 📦. You'll also get a tracking link by email when it ships.`;

  else if (has(/\b(return|refund|exchange|send back|change of mind|faulty|damaged|broken)\b/))
    html = `No worries! ↩️ Your rights under the Australian Consumer Law always apply, and we also offer <strong>30-day change-of-mind returns</strong> on eligible items. If something arrived faulty or damaged, tell me and we'll make it right. Full details in our ${link("policy.html?doc=returns", "Returns & Refund Policy")}.`;

  else if (has(/\b(cart|checkout|pay|buy|purchase|place.*order)\b/))
    html = `Easy, add pieces to your ${link("cart.html", "cart")} and checkout whenever you're ready 🛒. We accept Visa, Mastercard, Amex, PayPal, Apple/Google Pay, Afterpay, Klarna & Zip, and orders over $500 ship free.`;

  else if (has(/\b(size|dimension|measure|measurement|assembly|assemble|weight|fit)\b/))
    html = `Good thinking, measure your space first! 📐 Each product page lists dimensions and assembly notes. If you tell me the item, I'll help you check it fits, or our team can confirm on ${link("contact.html", "Contact")}.`;

  else if (has(/\b(visit|showroom|studio|in person|appointment|open|hours|location|address|where are you)\b/))
    html = `We're a proudly <strong>Australian</strong> 🇦🇺 online store, here Mon to Fri 9 to 5:30 and Sat 10 to 4 (AEST). Reach us via ${link("contact.html", "Contact")} or WhatsApp.`;

  else if (has(/\b(eco|sustainab|ethical|environment|natural material)\b/))
    html = `We love this question 🌱, we curate quality, considered pieces made to last, favour natural materials, and offer eco-friendly options (including for cleaning). Ask about a specific piece and I'll share what I know.`;

  else if (has(/\b(career|job|hiring|work with|vacancy|apply|position)\b/))
    html = `Thanks for your interest! For any opportunities, email us at ${DECOMUSE.email} 🌿.`;

  else if (has(/\b(contact|call|phone|email|reach|number)\b/))
    html = `You can email us at ${DECOMUSE.email}, or via ${link("contact.html", "Contact")} 💬. Prefer a real person now? ${waButton("Chat on WhatsApp")}`;

  else if (has(/\b(thank|thanks|cheers|awesome|great|perfect|love)\b/))
    html = `You're so welcome! 💛 Is there anything else I can help you find or style today?`;

  else {
    unsure = true;
    html = `That's a great question! I want to get it right, could you tell me a little more? I can help with styling, shipping, returns, hampers, bookings, pricing and tracking. Or I can connect you with a real team member: ${waButton("Chat with a human on WhatsApp")}`;
  }
  return { html, unsure };
}

let chatMsgSeq = 0;
let chatAnswerCount = 0;
let chatRated = false;

function chatAppend(who, html, opts = {}) {
  const body = document.getElementById("chatBody");
  const msg = document.createElement("div");
  msg.className = "chat-msg " + who;
  msg.innerHTML = who === "bot"
    ? `<span class="chat-avatar sm">${IC.spark}</span><div class="bubble">${html}</div>`
    : `<div class="bubble">${html}</div>`;
  body.appendChild(msg);

  // Helpfulness rating under bot answers (not the greeting)
  if (who === "bot" && opts.feedback) {
    const id = "fb" + (++chatMsgSeq);
    const fb = document.createElement("div");
    fb.className = "chat-feedback"; fb.id = id;
    fb.innerHTML = `<span>Was this helpful?</span>
      <button type="button" onclick="chatFeedback('${id}',true)" aria-label="Yes">👍</button>
      <button type="button" onclick="chatFeedback('${id}',false)" aria-label="No">👎</button>`;
    body.appendChild(fb);
  }
  body.scrollTop = body.scrollHeight;
}

function chatFeedback(id, good) {
  const fb = document.getElementById(id);
  if (fb) fb.remove();
  if (good) {
    chatAppend("bot", `Wonderful, so glad that helped! 😊 Anything else I can find or style for you?`);
  } else {
    chatAppend("bot", `Thanks for the honesty, I'd like to get you a better answer. Try rephrasing, or I can connect you with a real DecoMuse team member right now:<br>${waButton()}`);
  }
  maybeAskRating();
}

function maybeAskRating() {
  if (chatRated || chatAnswerCount < 3) return;
  chatRated = true;
  const body = document.getElementById("chatBody");
  const r = document.createElement("div");
  r.className = "chat-rate";
  r.innerHTML = `<span>How am I doing so far? Rate your experience:</span>
    <div class="chat-stars">${[1,2,3,4,5].map(n => `<button type="button" data-n="${n}" onclick="chatRate(${n})">★</button>`).join("")}</div>`;
  body.appendChild(r);
  body.scrollTop = body.scrollHeight;
}

function chatRate(n) {
  document.querySelectorAll(".chat-rate").forEach(el => el.remove());
  if (n >= 4) {
    chatAppend("bot", `Thank you, ${"★".repeat(n)}! 💛 I'm always here in the corner if you need me.`);
  } else {
    chatAppend("bot", `Thank you for the feedback, I'd love to do better. Let me connect you with a real team member who can help properly:<br>${waButton()}`);
  }
}

function chatSend(text) {
  if (!text.trim()) return;
  chatAppend("me", text.replace(/</g, "&lt;"));
  const body = document.getElementById("chatBody");
  const typing = document.createElement("div");
  typing.className = "chat-msg bot";
  typing.innerHTML = `<span class="chat-avatar sm">${IC.spark}</span><div class="bubble typing"><span></span><span></span><span></span></div>`;
  body.appendChild(typing); body.scrollTop = body.scrollHeight;
  setTimeout(() => {
    typing.remove();
    const res = chatReply(text);
    chatAnswerCount++;
    chatAppend("bot", res.html, { feedback: true });
  }, 700);
}

function initChat() {
  const fab = document.getElementById("aiFab");
  const panel = document.getElementById("chatPanel");
  const close = document.getElementById("chatClose");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatText");
  const quick = document.getElementById("chatQuick");
  const nudge = document.getElementById("chatNudge");
  const nudgeX = document.getElementById("nudgeX");
  if (!fab || !panel) return;

  let opened = false, gated = false;
  const hideNudge = () => nudge && nudge.classList.remove("show");
  const isMember = () => { const a = (typeof getAccount === "function") ? getAccount() : null; return !!(a && a.email); };
  const open = () => {
    panel.classList.add("open"); panel.setAttribute("aria-hidden", "false");
    fab.classList.add("engaged"); hideNudge();
    if (!isMember()) {
      // MuseStylist AI is a member perk — gate the chat until logged in
      if (form) form.style.display = "none";
      if (quick) quick.style.display = "none";
      if (!gated) {
        gated = true;
        chatAppend("bot", `✦ <strong>MuseStylist AI</strong> is a member perk. ${link("account.html", "Log in or create a free account")} to start styling your space with me, it's free to join and only takes a minute! 💛`);
      }
      return;
    }
    if (form) form.style.display = "";
    if (quick) quick.style.display = "";
    if (!opened) {
      opened = true;
      chatAppend("bot", `Hi, I'm the <strong>MuseStylist</strong> ✦ your personal shopping assistant. I can help you find a fragrance, wellness pick or home piece, build a gift hamper, or track an order, how can I help today?`);
    }
    setTimeout(() => input && input.focus(), 200);
  };
  const closeFn = () => { panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); };

  fab.addEventListener("click", () => panel.classList.contains("open") ? closeFn() : open());
  if (close) close.addEventListener("click", closeFn);

  // Animated greeting nudge (once per session, if not opened)
  if (nudge && !sessionStorage.getItem("dm_nudged")) {
    setTimeout(() => { if (!panel.classList.contains("open")) nudge.classList.add("show"); }, 4000);
    nudge.addEventListener("click", (e) => { if (e.target !== nudgeX) { open(); } });
  }
  if (nudgeX) nudgeX.addEventListener("click", (e) => { e.stopPropagation(); hideNudge(); sessionStorage.setItem("dm_nudged", "1"); });

  quick.innerHTML = CHAT_QUICK.map(q => `<button type="button" data-q="${q.label}">${q.label}</button>`).join("");
  quick.querySelectorAll("button").forEach(b => b.addEventListener("click", () => chatSend(b.dataset.q)));

  form.addEventListener("submit", (e) => { e.preventDefault(); chatSend(input.value); input.value = ""; });

  // Tabs: MuseStylist chat  <>  Text me back
  const tabs = panel.querySelectorAll(".chat-tab");
  const viewChat = document.getElementById("chatViewChat");
  const viewText = document.getElementById("chatViewText");
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.toggle("active", x === t));
    const showText = t.dataset.tab === "text";
    if (viewChat) viewChat.hidden = showText;
    if (viewText) viewText.hidden = !showText;
  }));

  // Text-back request form
  const ctb = document.getElementById("ctbForm");
  if (ctb) ctb.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("ctbSend");
    const ok = document.getElementById("ctbSuccess");
    const data = [
      ["Name", document.getElementById("ctbName").value],
      ["Mobile phone", document.getElementById("ctbPhone").value],
      ["Message", document.getElementById("ctbMsg").value]
    ].filter(d => d[1]);
    btn.disabled = true; btn.textContent = "Sending…";
    try { if (typeof deliverForm === "function") await deliverForm(data, "DecoMuse — Text-back request (please text this customer)"); } catch (err) {}
    ok.classList.add("show");
    ok.innerHTML = "Thank you! Our team will text you back shortly. 💬";
    ctb.reset(); btn.disabled = false; btn.textContent = "Send";
  });
}

/* ---- Rotating announcement ticker ---- */
function rotateAnnouncements() {
  const track = document.getElementById("announceTrack");
  if (!track || typeof ANNOUNCEMENTS === "undefined" || ANNOUNCEMENTS.length < 2) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % ANNOUNCEMENTS.length;
    track.classList.add("out");
    setTimeout(() => {
      track.innerHTML = ANNOUNCEMENTS[i];
      track.classList.remove("out");
    }, 400);
  }, 3800);
}

/* ---- Nav behaviour: mega-menu + mobile toggle ---- */
function wireNav() {
  const catsRow = document.getElementById("navCatsRow");
  const cats = document.getElementById("navCats");
  const toggle = document.getElementById("navToggle");
  const navMain = document.getElementById("navMain");

  if (toggle && navMain) {
    toggle.addEventListener("click", () => navMain.classList.toggle("open"));
  }

  if (cats && catsRow) {
    const items = cats.querySelectorAll("li[data-cat]");
    let closeTimer;
    const openMega = (key) => {
      clearTimeout(closeTimer);
      catsRow.classList.add("mega-open");
      catsRow.querySelectorAll(".mega").forEach(m => m.classList.toggle("active", m.dataset.mega === key));
      items.forEach(li => li.classList.toggle("open", li.dataset.cat === key));
    };
    const closeMega = () => {
      closeTimer = setTimeout(() => {
        catsRow.classList.remove("mega-open");
        catsRow.querySelectorAll(".mega").forEach(m => m.classList.remove("active"));
        items.forEach(li => li.classList.remove("open"));
      }, 160);
    };
    items.forEach(li => {
      li.addEventListener("mouseenter", () => openMega(li.dataset.cat));
      li.addEventListener("mouseleave", closeMega);
      li.querySelector("a").addEventListener("click", (e) => {
        if (e.currentTarget.getAttribute("href")) return; // real link (Gift Baskets & Hampers → hampers.html)
        e.preventDefault();
        window.location.href = "shop.html?cat=" + encodeURIComponent(MEGA_MENU.find(m => m.key === li.dataset.cat).label);
      });
    });
    catsRow.querySelectorAll(".mega").forEach(m => {
      m.addEventListener("mouseenter", () => { clearTimeout(closeTimer); });
      m.addEventListener("mouseleave", closeMega);
    });
  }
}

document.addEventListener("DOMContentLoaded", injectComponents);
