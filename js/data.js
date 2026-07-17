/* ============================================================
   DÉCOMUSE, Data layer
   Home décor + lifestyle retail: fragrance, health & wellness,
   home & décor, lifestyle essentials, and gifting.
   ============================================================ */

const DECOMUSE = {
  brand: "DecoMuse",
  tagline: "Home Décor, Lifestyle & Snippets",
  email: "Decormuseofficial@outlook.com",
  location: "Australia",
  flag: "🇦🇺",
  abn: "41 991 812 955",
  est: "2026",
  currency: "$",
  formEmail: "decormuseofficial@outlook.com",
  formEndpoint: "",
  formAccessKey: "",
  stripe: { publishableKey: "", checkoutEndpoint: "/.netlify/functions/create-checkout-session" },
  bookingsUrl: "",
  availability: { 0: null, 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 17], 6: [10, 16] },
  socials: {
    instagram: "https://www.instagram.com/decormuseofficial?igsh=MTU3ZWowNnUyNmI0dQ%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/share/17aCKqQ3ns/?mibextid=wwXIfr",
    whatsapp: "https://wa.me/61451609398"
  }
};

/* ---- Mega-menu categories (retail) ---- */
const MEGA_MENU = [
  {
    key: "home", label: "Home & Décor",
    columns: [
      { title: "Shop", links: ["Shop All Home", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Living", links: ["Sofas & Seating", "Coffee & Side Tables", "Rugs", "Lighting", "Mirrors"] },
      { title: "Bedroom", links: ["Bed Linen", "Cushions & Throws", "Bedside Tables", "Lamps"] },
      { title: "Décor", links: ["Vases", "Wall Art", "Candles", "Ceramics", "Faux Greenery"] }
    ]
  },
  {
    key: "health", label: "Health & Wellness",
    columns: [
      { title: "Shop", links: ["Shop All Wellness", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Bath & Body", links: ["Bath Soaks", "Body Cream", "Hand Care", "Soap & Wash"] },
      { title: "Skincare", links: ["Facial Oils", "Moisturisers", "Serums", "Masks"] },
      { title: "Wellbeing", links: ["Supplements & Vitamins", "Aromatherapy", "Sleep & Calm", "Self-care Sets"] }
    ]
  },
  {
    key: "hampers", label: "Gift Baskets & Hampers",
    columns: [
      { title: "Price", links: ["Create My Own Hamper", "On Sale", "Under $100", "$100 to $150", "Over $150", "Gift Cards", "Most Popular"] },
      { title: "Favourite", links: ["Fragrance Hampers", "Pamper Hampers", "Gourmet Food", "Cheese & Wine", "Chocolate & Sweet", "Tea & Coffee"] },
      { title: "Occasions", links: ["Birthday", "Thank You", "Congratulations", "New Baby", "Anniversary", "Housewarming"] },
      { title: "Seasonal", links: ["Christmas", "Mother's Day", "Father's Day", "Valentine's Day", "Easter"] }
    ]
  },
  {
    key: "fragrance", label: "Fragrance",
    columns: [
      { title: "Shop", links: ["Shop All Fragrance", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Perfume", links: ["Perfume for Her", "Perfume for Him", "Unisex", "Eau de Parfum", "Eau de Toilette", "Travel & Minis"] },
      { title: "Home Fragrance", links: ["Reed Diffusers", "Scented Candles", "Room Sprays", "Essential Oils"] },
      { title: "Gifting", links: ["Fragrance Gift Sets", "Discovery Sets"] }
    ]
  },
  {
    key: "lifestyle", label: "Lifestyle",
    columns: [
      { title: "Shop", links: ["Shop All Lifestyle", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Everyday", links: ["Candles", "Textiles & Linen", "Kitchen & Dining", "Stationery", "Travel"] },
      { title: "Self & Home", links: ["Wellness Essentials", "Coffee & Tea", "Gifts Under $50"] }
    ]
  }
];

/* ---- Products (AUD) ---- */
const PRODUCTS = [
  // Fragrance
  { id: "f01", name: "Amber & Oud Eau de Parfum", cat: "Fragrance", price: 129, tag: "Bestseller", ph: "espresso", room: ["living","bedroom"] },
  { id: "f02", name: "Neroli & Rose Eau de Parfum", cat: "Fragrance", price: 115, was: 139, tag: "Sale", ph: "rose", room: ["bedroom"] },
  { id: "f03", name: "Citrus Bloom Eau de Toilette", cat: "Fragrance", price: 89, tag: "New", ph: "", room: ["living"] },
  { id: "f04", name: "Wild Fig Reed Diffuser", cat: "Fragrance", price: 49, ph: "forest", room: ["living","dining"] },
  { id: "f05", name: "Sandalwood Room Spray", cat: "Fragrance", price: 35, ph: "espresso", room: ["living","bedroom"] },
  { id: "f06", name: "Discovery Set, 5 Scents", cat: "Fragrance", price: 45, tag: "Loved", ph: "rose" },

  // Health & Wellness
  { id: "h01", name: "Magnesium Bath Soak", cat: "Health & Wellness", price: 24, tag: "Loved", ph: "forest", room: ["bedroom"] },
  { id: "h02", name: "Rosehip Facial Oil", cat: "Health & Wellness", price: 39, ph: "rose" },
  { id: "h03", name: "Vitamin C Daily Supplement", cat: "Health & Wellness", price: 29, ph: "" },
  { id: "h04", name: "Lavender Aromatherapy Roll-on", cat: "Health & Wellness", price: 19, ph: "forest", room: ["bedroom"] },
  { id: "h05", name: "Shea Hand & Body Cream", cat: "Health & Wellness", price: 22, ph: "rose" },
  { id: "h06", name: "Sleep & Calm Pillow Mist", cat: "Health & Wellness", price: 27, tag: "New", ph: "", room: ["bedroom"] },

  // Home & Décor
  { id: "p01", name: "Arched Rattan Floor Mirror", cat: "Home & Décor", price: 289, was: 349, tag: "Bestseller", ph: "rose", room: ["bedroom","living"] },
  { id: "p02", name: "Bouclé Accent Armchair", cat: "Home & Décor", price: 549, tag: "New", ph: "", room: ["living","bedroom"] },
  { id: "p03", name: "Travertine Coffee Table", cat: "Home & Décor", price: 699, ph: "espresso", room: ["living"], freeship: true },
  { id: "p05", name: "Handwoven Jute Rug 2×3m", cat: "Home & Décor", price: 329, was: 399, tag: "Sale", ph: "", room: ["living"], freeship: true },
  { id: "p06", name: "Ceramic Vase Set of 3", cat: "Home & Décor", price: 89, ph: "rose", room: ["living","dining"] },
  { id: "p09", name: "Rattan Pendant Light", cat: "Home & Décor", price: 179, ph: "", room: ["living","dining"] },
  { id: "p08", name: "Oak Sideboard Buffet", cat: "Home & Décor", price: 899, tag: "New", ph: "espresso", room: ["dining","living"], freeship: true },

  // Lifestyle
  { id: "l01", name: "Wattle Soy Candle Trio", cat: "Lifestyle", price: 59, tag: "Loved", ph: "rose", room: ["living","bedroom","dining"] },
  { id: "l02", name: "Waffle Cotton Throw", cat: "Lifestyle", price: 99, ph: "", room: ["bedroom","living"] },
  { id: "l03", name: "Linen Euro Cushion Pair", cat: "Lifestyle", price: 79, ph: "rose", room: ["bedroom","living"] },
  { id: "l04", name: "Stoneware Dinner Set 16pc", cat: "Lifestyle", price: 199, tag: "Bestseller", ph: "", room: ["dining"] },
  { id: "l05", name: "Linen Coaster Set", cat: "Lifestyle", price: 14, ph: "forest", room: ["dining"] },

  // Beauty & personal care
  { id: "f07", name: "Tommy Girl Eau de Toilette 100mL", brand: "Tommy Hilfiger", cat: "Fragrance", price: 95, tag: "New", ph: "",
    desc: "A crisp, uplifting blend of fresh florals and bright citrus. Effortlessly cool, clean and confident, it's the kind of everyday scent that feels like a breath of fresh air, morning to night." },
  { id: "h07", name: "Skin Renewing Vitamin C Serum 30mL", brand: "CeraVe", cat: "Health & Wellness", price: 44.99, ph: "",
    desc: "A brightening daily serum that helps even skin tone and restore a healthy glow. Lightweight, fast-absorbing and beautifully gentle, it's the fresh-faced pick-me-up your routine has been missing." },
  { id: "h08", name: "Clear Skincare Lightening Cream 90g", brand: "Clear Skincare", cat: "Health & Wellness", price: 50, ph: "rose",
    desc: "A targeted brightening cream that helps soften the look of dark spots and uneven tone. Use daily for a clearer, more even and radiant-looking complexion." },
  { id: "h09", name: "Curl Jelly Scrunching Jelly 200mL", brand: "Umberto Giannini", cat: "Health & Wellness", price: 19, tag: "Loved", ph: "rose",
    desc: "Define, hydrate and tame frizz with a bouncy styling jelly that leaves curls soft, springy and full of life. No crunch, just gloss and gorgeous movement." },
  { id: "h10", name: "Nude by Nature Complexion Essentials Starter Kit (Light)", brand: "Nude by Nature", cat: "Health & Wellness", price: 45.99, sku: "DM-32145", ph: "espresso", img: "assets/products/h10.png",
    desc: "Your complexion, perfected in four easy steps. This mineral starter kit brings together a luminous foundation, finishing veil, soft blush and pro brushes in a chic travel case, for a natural, flawless glow wherever you go." },
  { id: "h11", name: "Nude by Nature Glow & Perfect Christmas Gift Set", brand: "Nude by Nature", cat: "Health & Wellness", price: 25.01, tag: "New", sku: "DM-11234", ph: "rose", img: "assets/products/h11.png",
    desc: "A radiant little gift set to glow and go. A beautifully boxed edit of mineral favourites that leaves skin luminous and naturally perfected, the perfect present, or a treat for yourself, this festive season." },
  { id: "l06", name: "Personalised Bridesmaid Floral Tumbler Flute", cat: "Lifestyle", price: 15.15, tag: "Loved", sku: "DM-12344", custom: true, ph: "forest", img: "assets/products/l06.png",
    desc: "A keepsake they'll treasure. This elegant floral tumbler flute is personalised just for your bridal party, a thoughtful wedding favour or bridesmaid gift that's as pretty as it is practical. Made to order and fully customisable, so please allow a few extra days for delivery." }
];

/* Merge any products added via the Admin form on this device (drafts / live preview).
   These show on the site immediately; use the Admin "Copy code" to make them permanent. */
try {
  const _extra = JSON.parse(localStorage.getItem("dm_admin_products") || "[]");
  if (Array.isArray(_extra)) _extra.forEach(p => { if (p && p.id && !PRODUCTS.some(x => x.id === p.id)) PRODUCTS.push(p); });
} catch (e) {}

/* ---- Gift Hamper Maker items ---- */
const HAMPER_ITEMS = [
  { id: "h-box1", name: "Signature Gift Box", price: 15, cat: "The Box", emoji: "🎁" },
  { id: "h-box2", name: "Keepsake Timber Box", price: 25, cat: "The Box", emoji: "📦" },
  { id: "h-box3", name: "Woven Picnic Basket", price: 40, cat: "The Box", emoji: "🧺" },
  { id: "h-sw1", name: "Belgian Chocolate Box", price: 18, cat: "Sweet", emoji: "🍫" },
  { id: "h-sw2", name: "Handmade Shortbread", price: 12, cat: "Sweet", emoji: "🍪" },
  { id: "h-sw3", name: "Salted Caramel Fudge", price: 14, cat: "Sweet", emoji: "🍬" },
  { id: "h-sw4", name: "Macaron Selection", price: 22, cat: "Sweet", emoji: "🧁" },
  { id: "h-sa1", name: "Artisan Cheese Wedge", price: 16, cat: "Savoury", emoji: "🧀" },
  { id: "h-sa2", name: "Water Crackers", price: 8, cat: "Savoury", emoji: "🫓" },
  { id: "h-sa3", name: "Olives & Antipasto", price: 13, cat: "Savoury", emoji: "🫒" },
  { id: "h-sa4", name: "Gourmet Roasted Nuts", price: 11, cat: "Savoury", emoji: "🥜" },
  { id: "h-dr1", name: "Sparkling Wine", price: 28, cat: "Drinks", emoji: "🍾" },
  { id: "h-dr2", name: "Red Wine", price: 32, cat: "Drinks", emoji: "🍷" },
  { id: "h-dr3", name: "Botanical Tea Tin", price: 15, cat: "Drinks", emoji: "🍵" },
  { id: "h-dr4", name: "Specialty Coffee", price: 16, cat: "Drinks", emoji: "☕" },
  { id: "h-dr5", name: "Non-Alc Sparkling", price: 18, cat: "Drinks", emoji: "🥂" },
  { id: "h-pa1", name: "Wattle Soy Candle", price: 24, cat: "Pamper", emoji: "🕯️" },
  { id: "h-pa2", name: "Bath Soak", price: 19, cat: "Pamper", emoji: "🛁" },
  { id: "h-pa3", name: "Hand Cream", price: 17, cat: "Pamper", emoji: "🧴" },
  { id: "h-pa4", name: "Silk Eye Mask", price: 21, cat: "Pamper", emoji: "💤" },
  { id: "h-pa5", name: "Eau de Parfum Mini", price: 26, cat: "Pamper", emoji: "🌸" },
  { id: "h-ho1", name: "Ceramic Trinket Dish", price: 18, cat: "Home Touch", emoji: "🍽️" },
  { id: "h-ho2", name: "Mini Bud Vase", price: 16, cat: "Home Touch", emoji: "🏺" },
  { id: "h-ho3", name: "Linen Coaster Set", price: 14, cat: "Home Touch", emoji: "🧵" },
  { id: "h-fi1", name: "Personalised Gift Card", price: 5, cat: "Finishing", emoji: "💌" },
  { id: "h-fi2", name: "Dried Floral Sprig", price: 9, cat: "Finishing", emoji: "🌾" },
  { id: "h-fi3", name: "Ribbon & Wrap", price: 6, cat: "Finishing", emoji: "🎀" }
];
const HAMPER_MIN = 60;

/* ---- Rotating announcement bar ---- */
const ANNOUNCEMENTS = [
  "✦ Free shipping on orders over $500, Australia-wide",
  "🌏 We ship worldwide, Australia, NZ, USA, Canada, Netherlands, Morocco, China, Germany, Switzerland &amp; UAE",
  "🌸 New fragrances &amp; home arrivals added weekly",
  "💝 Members save 20% on their first order, join free",
  "⭐ Loved by 500+ Australian homes · 4.7★ average review",
  "🎁 Build your own luxury hamper, gifting made effortless",
  "💡 Tip: tap the ♡ on any piece to save it to your wishlist for later",
  "💬 For enquiries, message us on WhatsApp · Proudly Australian 🇦🇺"
];

/* ---- Reviews ---- */
const REVIEWS = [
  { rating: 5, title: "My new signature scent", body: "The Amber & Oud is divine, long-lasting and beautifully packaged. Fast delivery too. I've already reordered for a gift.", who: "Eleanor M. · Sydney, NSW" },
  { rating: 5, title: "A gift hamper that wowed", body: "Ordered a hamper for a housewarming and it was styled so thoughtfully. The hand-written note was a gorgeous touch, will absolutely order again.", who: "Priya S. · Melbourne, VIC" },
  { rating: 4, title: "Gorgeous quality, quick delivery", body: "The bouclé cushions and arch mirror transformed our bedroom. Shipping was faster than expected and everything arrived without a scratch.", who: "James & Dani · Sydney, NSW" },
  { rating: 5, title: "Wellness picks I love", body: "The magnesium soak and pillow mist have become part of my nightly ritual. Beautifully considered products and lovely to gift.", who: "Harriet T. · Perth, WA" },
  { rating: 5, title: "Candles I keep reordering", body: "The Wattle soy candle is divine and the ceramic vessel is something I'll keep forever. DecoMuse is my go-to for considered little luxuries.", who: "Sofia R. · Brisbane, QLD" },
  { rating: 4, title: "Beautiful local store", body: "Such a lovely curated range of home and lifestyle pieces. Friendly service and thoughtful packaging every time.", who: "Marcus L. · Perth, WA" }
];
