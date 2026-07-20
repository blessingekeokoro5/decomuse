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
    key: "home", label: "Home Décor",
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
  // ── Home Décor ──
  { id: "hd01", name: "Aura Mist Ultrasonic Diffuser 160ml", cat: "Home Décor", price: 184, memberPrice: 154, sku: "DM-10101", tag: "New", ph: "", img: "assets/products/hd01.png",
    imgs: ["assets/products/hd01.png", "assets/products/hd01-2.png"],
    desc: "A sculptural teardrop diffuser that turns fragrance into a moment. Whisper-quiet ultrasonic mist, soft ambient light and a 160ml reservoir bring calm, scent and a designer silhouette to any room." },
  { id: "hd02", name: "Fleur Sculptural Glass Vase", cat: "Home Décor", price: 225, memberPrice: 205, sku: "DM-10102", ph: "", img: "assets/products/hd02.png",
    imgs: ["assets/products/hd02.png", "assets/products/hd02-2.png", "assets/products/hd02-3.png", "assets/products/hd02-4.png"],
    desc: "The Fleur glass vase brings sculptural charm to any room with a wavy silhouette that resembles an open flower. This visual statement piece is a work of art and enhances any floral arrangement you choose. Made from glass and designed for tabletop display, it suits both real and everlasting flowers. Place it on a dining table, bedside table, coffee table or kitchen bench to create an effortless centrepiece, or let it stand alone to add sculptural interest to a living space and brighten your home.",
    features: [
      "Displays a wavy silhouette that resembles an open flower, making it a visual statement piece",
      "A true work of art that enhances any floral arrangement of your choosing",
      "Great for presenting both real & everlasting flowers, for a stunning display around the home",
      "A classic addition to any dining table, bedside table, coffee table, kitchen bench & more"
    ],
    specs: { "Type": "Vase", "Location": "Tabletop", "Material": "Glass", "Primary Colour": "Blue" },
    dimensions: "26cm H x 23cm W x 23cm D", weight: "1.97 kg", boxContents: "1 x vase", care: "Wipe clean with a dry cloth" },
  { id: "hd03", name: "Ceramic Electric Oil Vaporiser", cat: "Home Décor", price: 98.90, memberPrice: 78.95, sku: "DM-10103", tag: "New", ph: "", img: "assets/products/hd03.png",
    imgs: ["assets/products/hd03.png", "assets/products/hd03-2.png", "assets/products/hd03-3.png", "assets/products/hd03-4.png", "assets/products/hd03-5.png"],
    colours: [{ name: "Black", hex: "#1c1c1c" }, { name: "Natural", hex: "#cbb291" }, { name: "White", hex: "#f2efe9" }],
    desc: "Bring a subtle, calming fragrance to any room with this ceramic electric oil vaporiser that gently warms essential oils without harming them. Designed to run safely for long periods, it emits heat only from the recessed bowl, so the outer surface stays cool to the touch. No water is needed, making it a drip-free option ideal for aromatherapy at night or when hosting friends, creating a calm, fragrant atmosphere in living areas, bedrooms and for quiet evenings.",
    features: [
      "Unique design gently vaporises essential oils without causing any harm to them",
      "Designed to operate safely when unattended for prolonged periods",
      "Only the recessed area of the vaporiser emits heat",
      "Cool-to-touch and does not overheat",
      "No water required",
      "Power supply: 240V"
    ],
    specs: { "Type": "Vaporiser", "Material": "Ceramic", "Aromatherapy": "Yes", "Dripless": "Yes" },
    dimensions: "4cm H x 6.7cm W x 5.5cm D", weight: "0.55 kg",
    boxContents: ["1 × vaporiser", "1 × user manual"], warranty: "1 Year",
    care: "Use a damp cloth to wipe the vaporiser bowl after use.",
    about: "Established in 1992 and proudly 100% Australian owned, the maker is a market leader in the aromatherapy and wellness space, specialising in safe, clean and efficient essential oil mist diffusers and electric vaporisers." },

  // ── Health & Wellness ──
  { id: "h10", name: "Nude by Nature Complexion Essentials Starter Kit (Light)", brand: "Nude by Nature", cat: "Health & Wellness", price: 45.99, sku: "DM-32145", ph: "espresso", img: "assets/products/h10.png",
    desc: "Your complexion, perfected in four easy steps. This mineral starter kit brings together a luminous foundation, finishing veil, soft blush and pro brushes in a chic travel case, for a natural, flawless glow wherever you go." },
  { id: "h11", name: "Nude by Nature Glow & Perfect Christmas Gift Set", brand: "Nude by Nature", cat: "Health & Wellness", price: 25.01, tag: "New", sku: "DM-11234", ph: "rose", img: "assets/products/h11.png",
    desc: "A radiant little gift set to glow and go. A beautifully boxed edit of mineral favourites that leaves skin luminous and naturally perfected, the perfect present, or a treat for yourself, this festive season." }
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
  "✦ Free shipping on orders over $300, Australia-wide",
  "🌏 We ship to Australia &amp; New Zealand",
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
