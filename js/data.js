/* ============================================================
   SAMIRA HOME DECOR, Data layer
   Home décor + lifestyle retail: fragrance, health & wellness,
   home & décor, lifestyle essentials, and gifting.
   ============================================================ */

const SAMIRA = {
  brand: "Samira Home Decor",
  tagline: "Home Décor Store",
  email: "hello@samirahomedecor.com.au",
  location: "Australia",
  flag: "🇦🇺",
  abn: "41 991 812 955",
  est: "2026",
  currency: "$",
  // Site-wide sale campaign. Set percent:0 (or endsAt in the past) to turn OFF.
  // OFF (percent: 0). To run a sale: set percent + a future endsAt, update the
  // headline/label, then re-run `npm run catalogue` so the server-side discount
  // ceiling matches. Expired 10% "Winter Décor Refresh" retired 2026-09-20.
  campaign: { headline: "", label: "", percent: 0, endsAt: "" },
  formEmail: "hello@samirahomedecor.com.au",
  formEndpoint: "",
  formAccessKey: "f59d2f99-262b-46a0-987c-d94bcfe4b1bb",
  stripe: { publishableKey: "", checkoutEndpoint: "/.netlify/functions/create-checkout-session" },
  bookingsUrl: "",
  availability: { 0: null, 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 17], 6: [10, 16] },
  socials: {
    instagram: "https://www.instagram.com/samirahomedecor",
    facebook: "https://www.facebook.com/share/17aCKqQ3ns/?mibextid=wwXIfr",
    tiktok: "https://www.tiktok.com/@sys_samira",
    youtube: "https://www.youtube.com/@sys_samira",
    whatsapp: "https://wa.me/61451609398"
  }
};

/* The old name, kept as an alias so a page a visitor still has open
   from before the rebrand keeps working. Safe to delete in a few months. */
const DECOMUSE = SAMIRA;

/* ---- Mega-menu categories (retail) ---- */
const MEGA_MENU = [
  {
    key: "living", label: "Living Room",
    columns: [
      { title: "Shop", links: ["Shop All Living Room", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Furniture", links: ["Sofas & Seating", "Coffee & Side Tables", "TV Units", "Bookshelves"] },
      { title: "Soft Furnishings", links: ["Rugs", "Cushions & Throws", "Curtains"] },
      { title: "Accents", links: ["Lighting", "Mirrors", "Wall Art", "Vases"] }
    ]
  },
  {
    key: "home", label: "Home Décor",
    columns: [
      { title: "Shop", links: ["Shop All Home Décor", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Decorative", links: ["Vases", "Wall Art", "Sculptures & Objects", "Ceramics"] },
      { title: "Ambience", links: ["Candles", "Reed Diffusers", "Faux Greenery"] },
      { title: "Finishing Touches", links: ["Mirrors", "Photo Frames", "Trays & Bowls"] }
    ]
  },
  {
    key: "bedroom", label: "Bedroom",
    columns: [
      { title: "Shop", links: ["Shop All Bedroom", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Bedding", links: ["Bed Linen", "Quilt Covers", "Blankets"] },
      { title: "Furniture", links: ["Bedside Tables", "Dressers", "Headboards"] },
      { title: "Lighting & Décor", links: ["Lamps", "Mirrors", "Wall Art"] }
    ]
  },
  {
    key: "bathroom", label: "Bathroom",
    columns: [
      { title: "Shop", links: ["Shop All Bathroom", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Textiles", links: ["Towels", "Bath Mats", "Robes"] },
      { title: "Storage", links: ["Baskets", "Vanity Trays", "Caddies"] },
      { title: "Accessories", links: ["Soap Dispensers", "Tumblers", "Candles", "Diffusers"] }
    ]
  },
  {
    key: "office", label: "Office",
    columns: [
      { title: "Shop", links: ["Shop All Office", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Furniture", links: ["Desks", "Office Chairs", "Shelving"] },
      { title: "Desktop", links: ["Desk Organisers", "Stationery", "Lamps"] },
      { title: "Décor", links: ["Wall Art", "Plants & Planters", "Candles"] }
    ]
  },
  {
    key: "outdoor", label: "Outdoor",
    columns: [
      { title: "Shop", links: ["Shop All Outdoor", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Furniture", links: ["Outdoor Lounges", "Dining Sets", "Chairs"] },
      { title: "Garden", links: ["Planters & Pots", "Faux Plants"] },
      { title: "Comfort", links: ["Outdoor Cushions", "Outdoor Rugs", "Throws"] }
    ]
  },
  {
    key: "kitchen", label: "Kitchenware",
    columns: [
      { title: "Shop", links: ["Shop All Kitchenware", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Cook & Bake", links: ["Cookware", "Bakeware", "Utensils", "Chopping Boards"] },
      { title: "Dine", links: ["Dinnerware", "Glassware", "Cutlery", "Serveware"] },
      { title: "Prep & Store", links: ["Storage & Canisters", "Kitchen Linen", "Coffee & Tea"] }
    ]
  },
  {
    key: "hampers", label: "Gifts & Packaging",
    columns: [
      { title: "Gift Hampers", links: ["Shop All Hampers", "Create My Own Hamper", "By Occasion", "Gift Cards", "On Sale"] },
      { title: "Pouches & Boxes", page: "packaging.html", links: ["Food & Vendor Pouches", "Gift Boxes", "Hamper Boxes", "Mailers & Cartons"] },
      { title: "Kits & Supplies", page: "packaging.html", links: ["Packaging Kits", "Ribbons & Tags", "Tissue & Filler", "Labels & Stickers"] },
      { title: "Bulk & Commercial", page: "packaging.html", links: ["Wholesale Packaging", "Custom Branded Packaging", "Request a Bulk Quote"] }
    ]
  },
  {
    key: "lifestyle", label: "Lifestyle",
    columns: [
      { title: "Shop", links: ["Shop All Lifestyle", "New Arrivals", "Bestsellers", "On Sale"] },
      { title: "Home Fragrances", links: ["Room Sprays", "Essential Oils", "Fragrance Gift Sets"] },
      { title: "Everyday", links: ["Textiles & Linen", "Stationery", "Travel Essentials"] },
      { title: "Self & Home", links: ["Wellness Kits & Essentials", "Gifts Under $100"] }
    ]
  }
];

/* ---- Products (AUD) ---- */
const PRODUCTS = [
  // ── Bathroom ──
  { id: "bt01", name: "Aurelia Marble & Gold Bathroom Set (5-Piece)", cat: "Bathroom", price: 250, memberPrice: 220, sku: "SH-10109", tag: "New", ph: "", img: "assets/products/bt01-5.webp",
    imgs: ["assets/products/bt01-5.webp", "assets/products/bt01.webp", "assets/products/bt01-2.webp", "assets/products/bt01-3.webp", "assets/products/bt01-4.webp"],
    colours: [{ name: "White", hex: "#ece7de" }, { name: "Emerald Green", hex: "#134a38" }, { name: "Black", hex: "#171512" }],
    desc: "Turn a daily routine into a five-star ritual. The Aurelia set brings hand-glazed marble ceramic and hand-painted gold veining to your basin, each piece finished with a gilded base that catches the light. A complete five-piece collection that makes even the smallest bathroom feel like a boutique hotel, choose classic white, deep emerald green or midnight black, all pooled with liquid-gold marbling.",
    features: [
      "Complete 5-piece set: soap/lotion dispenser, toothbrush holder, two tumblers & a soap dish",
      "Hand-glazed ceramic with hand-painted gold marble veining, no two pieces are exactly alike",
      "Gilded gold base trim and a smooth gold pump for a boutique-hotel finish",
      "Available in classic White, deep Emerald Green or Midnight Black to suit your palette",
      "A ready-made luxury refresh, and a beautiful housewarming or wedding gift"
    ],
    specs: { "Type": "Bathroom accessory set", "Pieces": "5", "Material": "Ceramic", "Finish": "Marble glaze with gold detailing" },
    boxContents: ["1 × soap / lotion dispenser", "1 × toothbrush holder", "2 × tumblers", "1 × soap dish"],
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners to protect the gold detailing." },

  { id: "bt02", name: "Dark Marble Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 926, memberPrice: 833, sku: "SH-10115", tag: "New", ph: "", img: "assets/products/bt02-4.webp",
    imgs: ["assets/products/bt02-4.webp", "assets/products/bt02-2.webp", "assets/products/bt02-3.webp", "assets/products/bt02.webp", "assets/products/bt02-5.webp", "assets/products/bt02-6.webp", "assets/products/bt02-7.webp", "assets/products/bt02-8.webp"],
    colours: [{ name: "Emperador Dark", hex: "#4a3228" }],
    desc: "Cut from solid Emperador Dark marble, this is the set that makes a bathroom feel like a hotel suite. The stone is a deep espresso brown shot through with pale gold and cream veining, and because every block is quarried rather than moulded, no two pieces in your set will ever match exactly. Weighty in the hand, cool to the touch, and finished with a polished gold pump. Four pieces that sit beautifully together on a vanity, or apart across the tray by the bath, the dispenser at the basin.",
    features: [
      "Four pieces: soap dispenser, toothbrush holder, soap dish and vanity tray",
      "Solid natural Emperador Dark marble, not a printed or moulded look",
      "Unique veining in every piece, yours will not look like the photograph",
      "Polished gold pump with a smooth, quiet action",
      "Substantial weight that keeps each piece exactly where you put it",
      "Hand-finished, so slight variations in tone and size are part of the stone"
    ],
    specs: { "Type": "Bathroom accessory set", "Pieces": "4", "Material": "Natural Emperador Dark marble", "Finish": "Polished, with gold pump", "Colour": "Emperador Dark brown" },
    boxContents: ["1 × soap dispenser", "1 × toothbrush holder", "1 × soap dish", "1 × vanity tray"],
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from acidic cleaners, vinegar, citrus and bleach, which will dull and etch the surface. Stand bottles on the tray rather than directly on the stone to avoid rings." },

  { id: "bt03", name: "Minimalist Pump Soap Dispenser", cat: "Bathroom", room: "Bathroom", price: 102, memberPrice: 92, sku: "SH-10161", tag: "New", ph: "", img: "assets/products/bt03.jpg",
    imgs: ["assets/products/bt03.jpg", "assets/products/bt03-2.webp", "assets/products/bt03-3.jpg", "assets/products/bt03-4.jpg", "assets/products/bt03-5.webp", "assets/products/bt03-6.webp"],
    sizes: [{ label: "Black / Small", price: 102 }, { label: "Silver / Small", price: 102 }, { label: "Ivory / Small", price: 102 }, { label: "Black / Large", price: 130 }, { label: "Silver / Large", price: 130 }, { label: "Ivory / Large", price: 130 }],
    desc: "A plain, well-proportioned pump dispenser for hand soap or lotion, in a finish that doesn't shout. Two sizes, so it suits a small powder room or a busy family basin, and three colours that sit quietly against most tiles.",
    features: [
      "Smooth pump action, built for daily use",
      "Two sizes: Small and Large",
      "Black, Silver or Ivory",
      "Minimalist shape that suits most bathrooms"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "6" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt04", name: "Black Marble-Look & Gold Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 67, memberPrice: 60, sku: "SH-10162", tag: "New", ph: "", img: "assets/products/bt04.webp",
    imgs: ["assets/products/bt04.webp", "assets/products/bt04-2.webp", "assets/products/bt04-3.webp", "assets/products/bt04-4.webp", "assets/products/bt04-5.webp", "assets/products/bt04-6.webp"],
    sizes: [{ label: "Toothbrush Holder B", price: 67 }, { label: "Mouthwash Cup", price: 67 }, { label: "Soap Dish", price: 91 }, { label: "Soap Dispenser", price: 93 }, { label: "Cotton Swab Box", price: 93 }, { label: "Tray A", price: 109 }, { label: "Toothbrush Holder A", price: 117 }, { label: "Tray B", price: 154 }, { label: "Tissue Box", price: 176 }, { label: "Tray C", price: 180 }, { label: "Tray D", price: 183 }],
    desc: "Black marble-look pieces with slim gold detailing, bought individually so you take only what your basin needs. Toothbrush holders, cups, a dispenser, a cotton swab box, soap dish, tissue box and two tray sizes, all cut to the same restrained line.",
    features: [
      "Black marble-look finish with gold accents",
      "Pieces sold individually, so you buy what you need",
      "Includes dispenser, holders, soap dish, tissue box and trays",
      "Coordinated across the whole range"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "11" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt05", name: "White Marble & Gold Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 185, memberPrice: 166, sku: "SH-10163", tag: "New", ph: "", img: "assets/products/bt05.webp",
    imgs: ["assets/products/bt05.webp", "assets/products/bt05-2.webp", "assets/products/bt05-3.webp", "assets/products/bt05-4.webp", "assets/products/bt05-5.webp", "assets/products/bt05-6.webp"],
    sizes: [{ label: "Soap Dish (square)", price: 185 }, { label: "Soap Dish (round)", price: 185 }, { label: "Diffuser", price: 250 }, { label: "Cotton Swab (square)", price: 278 }, { label: "Cotton Swab (round)", price: 278 }, { label: "Soap Dispenser (square)", price: 278 }, { label: "Soap Dispenser (round)", price: 278 }, { label: "Toothbrush Holder (square)", price: 278 }, { label: "Toothbrush Holder (round)", price: 278 }, { label: "Tray 01", price: 278 }, { label: "Toothbrush Holder (long)", price: 306 }, { label: "Tray 03", price: 315 }, { label: "Tray 02", price: 333 }, { label: "Tray 04", price: 389 }, { label: "Tissue Holder (Small)", price: 398 }, { label: "Tissue Holder (Big)", price: 463 }],
    desc: "Natural white marble with gold trim, in square or round shapes depending on how soft you want the look. The veining runs differently through every piece, so a set assembled from these never looks mass-produced.",
    features: [
      "Natural white marble with gold accents",
      "Square or round shapes across the range",
      "Veining differs in every piece",
      "Pieces sold individually"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "16" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt06", name: "Two-Tone Bathroom Bin", cat: "Bathroom", room: "Bathroom", price: 276, memberPrice: 248, sku: "SH-10164", tag: "New", ph: "", img: "assets/products/bt06.webp",
    imgs: ["assets/products/bt06.webp", "assets/products/bt06-2.webp", "assets/products/bt06-3.webp", "assets/products/bt06-4.webp", "assets/products/bt06-5.webp", "assets/products/bt06-6.webp"],
    sizes: [{ label: "Orange (with lid)", price: 276 }, { label: "White + Gold (no lid)", price: 276 }, { label: "Green + Gold (no lid)", price: 276 }, { label: "White + Pink (with lid)", price: 276 }, { label: "Lime + Gold (with lid)", price: 276 }, { label: "White + Grey (with lid)", price: 276 }],
    desc: "A bin you don't have to hide. Clean-sided and weighted enough to stay put, in two-tone colourways with and without a lid, so it works beside a vanity or under a desk just as well.",
    features: [
      "Sleek silhouette that suits a visible spot",
      "With or without lid, depending on the colourway",
      "Six two-tone colour combinations",
      "Wipe-clean finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Resin / composite", "Options": "6" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners and harsh solvents, which can dull the finish." },

  { id: "bt07", name: "Touchless Sensor Bathroom Bin", cat: "Bathroom", room: "Bathroom", price: 406, memberPrice: 365, sku: "SH-10165", tag: "New", ph: "", img: "assets/products/bt07.webp",
    imgs: ["assets/products/bt07.webp", "assets/products/bt07-2.webp", "assets/products/bt07-3.webp", "assets/products/bt07-4.webp"],
    sizes: [{ label: "Round - 10L", price: 406 }, { label: "Oval - 10L", price: 406 }, { label: "Square - 10L", price: 406 }, { label: "Square - 15L", price: 406 }],
    desc: "Opens as your hand approaches and closes itself afterwards, which matters more in a bathroom than anywhere else in the house. Fully waterproof, in round, oval and square shapes, at 10 or 15 litres.",
    features: [
      "Touchless sensor lid, no contact needed",
      "Fully waterproof construction",
      "Round, oval or square",
      "10L and 15L capacities"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt08", name: "Emerald Marble Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 163, memberPrice: 147, sku: "SH-10166", tag: "New", ph: "", img: "assets/products/bt08.jpg",
    imgs: ["assets/products/bt08.jpg", "assets/products/bt08-2.jpg", "assets/products/bt08-3.jpg", "assets/products/bt08-4.jpg", "assets/products/bt08-5.jpg", "assets/products/bt08-6.webp"],
    sizes: [{ label: "Soap Dish (square)", price: 163 }, { label: "Soap Dish (round)", price: 163 }, { label: "Soap Dispenser (square)", price: 272 }, { label: "Soap Dispenser  (round)", price: 272 }, { label: "Toothbrush Holder (Round)", price: 274 }, { label: "Toothbrush Holder (square)", price: 274 }, { label: "3-Hole Holder", price: 274 }, { label: "Cotton Swab Box (square)", price: 294 }, { label: "Cotton Swab Box (round)", price: 294 }, { label: "Diffuser (square)", price: 294 }, { label: "Diffuser (round)", price: 294 }, { label: "Tray", price: 300 }, { label: "Handle Tray", price: 313 }, { label: "Tissue Box (tall)", price: 507 }, { label: "Tissue Box (long)", price: 554 }],
    desc: "Deep green natural marble with pale veining running through it, which is a far braver choice than white and looks remarkable against brass tapware. Square or round pieces, bought one at a time.",
    features: [
      "Premium natural green marble",
      "Dramatic pale veining, unique to each piece",
      "Square or round shapes",
      "Dispenser, cotton swab box, soap dish and holders"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "15" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt09", name: "Fluted Sandstone-Look Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 120, memberPrice: 108, sku: "SH-10167", tag: "New", ph: "", img: "assets/products/bt09.webp",
    imgs: ["assets/products/bt09.webp", "assets/products/bt09-2.webp", "assets/products/bt09-3.webp", "assets/products/bt09-4.webp", "assets/products/bt09-5.webp", "assets/products/bt09-6.webp"],
    sizes: [{ label: "Marble White Soap Dish", price: 120 }, { label: "Black Soap Dish", price: 120 }, { label: "White & Gold Soap Dish", price: 120 }, { label: "Marble White Toothbrush Cup", price: 124 }, { label: "Black Toothbrush Cup", price: 124 }, { label: "White & Gold Toothbrush Cup", price: 124 }, { label: "Marble White Cotton Swab Box", price: 128 }, { label: "Black Cotton Swab Box", price: 128 }, { label: "White & Gold Cotton Swab Box", price: 128 }, { label: "Marble White & Silver Soap Dispenser", price: 165 }, { label: "Marble White Diffuser", price: 165 }, { label: "Black & Silver Soap Dispenser", price: 165 }, { label: "Black Diffuser", price: 165 }, { label: "White & Gold Soap Dispenser", price: 165 }, { label: "White & Gold Diffuser", price: 165 }, { label: "Marble White Tray", price: 239 }, { label: "Black Tray", price: 239 }, { label: "White & Gold Tray", price: 239 }],
    desc: "Bevelled vertical grooves give these pieces their texture, catching the light down the sides so a plain basin suddenly has something to look at. In marble white and warmer sandstone tones.",
    features: [
      "Bevelled vertical fluting with real depth",
      "Marble white and sandstone colourways",
      "Dispenser, cotton swab box, diffuser, cup and soap dish",
      "Pieces sold individually"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural stone", "Options": "18" },
    care: "Wipe with a soft, damp cloth and dry. Avoid acidic or abrasive cleaners, which mark natural stone. Wipe spills promptly, especially oils and toothpaste." },

  { id: "bt10", name: "Sandstone Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 137, memberPrice: 123, sku: "SH-10168", tag: "New", ph: "", img: "assets/products/bt10.jpg",
    imgs: ["assets/products/bt10.jpg", "assets/products/bt10-2.webp", "assets/products/bt10-3.webp", "assets/products/bt10-4.webp", "assets/products/bt10-5.webp", "assets/products/bt10-6.webp"],
    sizes: [{ label: "Soap Dish", price: 137 }, { label: "Cup", price: 200 }, { label: "Soap Dispenser", price: 244 }, { label: "Tooth Brush Holder", price: 267 }, { label: "Tray", price: 272 }, { label: "Complete Set", price: 1017 }],
    desc: "Premium sandstone, where the texture is the whole point: matte, grainy and warm rather than polished and cold. Buy the complete set, or add pieces one at a time.",
    features: [
      "Premium natural sandstone with a matte finish",
      "Complete set, or individual pieces",
      "Cup, tray, soap dish, dispenser and toothbrush holder",
      "Natural variation in every piece"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural stone", "Options": "6" },
    care: "Wipe with a soft, damp cloth and dry. Avoid acidic or abrasive cleaners, which mark natural stone. Wipe spills promptly, especially oils and toothpaste." },

  { id: "bt11", name: "Black Marble Bathroom Accessories Collection", cat: "Bathroom", room: "Bathroom", price: 222, memberPrice: 200, sku: "SH-10169", tag: "New", ph: "", img: "assets/products/bt11.webp",
    imgs: ["assets/products/bt11.webp", "assets/products/bt11-2.jpg", "assets/products/bt11-3.jpg", "assets/products/bt11-4.webp", "assets/products/bt11-5.webp", "assets/products/bt11-6.webp"],
    sizes: [{ label: "Soap Dish A", price: 222 }, { label: "Soap Dish B", price: 222 }, { label: "Soap Dispenser (gold)", price: 278 }, { label: "Soap Dispenser (silver)", price: 278 }, { label: "Soap Dispenser A (gold)", price: 278 }, { label: "Soap Dispenser A (silver)", price: 278 }, { label: "Cotton Swab box (silver)", price: 278 }, { label: "Cotton Swab box (gold)", price: 278 }, { label: "Toothbrush Holder B", price: 278 }, { label: "Toothbrush Holder C", price: 278 }, { label: "Toothbrush Holder A", price: 306 }, { label: "Aromatherapy Bottle (gold)", price: 306 }, { label: "Aromatherapy Bottle (silver)", price: 306 }, { label: "Cosmetic Mirror (silver)", price: 315 }, { label: "Cosmetic Mirror (gold)", price: 315 }, { label: "Tray A", price: 389 }, { label: "Tray B", price: 500 }, { label: "Tray C", price: 556 }, { label: "Tray D", price: 556 }],
    desc: "Black natural marble with your choice of gold or silver fittings, which is the detail that decides whether a bathroom reads warm or cool. Each piece is cut from stone, so the veining is never repeated.",
    features: [
      "Premium black natural marble",
      "Gold or silver fittings throughout",
      "Veining unique to every piece",
      "Dispensers, cotton swab boxes and more, sold individually"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "19" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt12", name: "Crystal Glass Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 889, memberPrice: 800, sku: "SH-10170", tag: "New", ph: "", img: "assets/products/bt12.webp",
    imgs: ["assets/products/bt12.webp", "assets/products/bt12-2.jpg", "assets/products/bt12-3.webp", "assets/products/bt12-4.jpg", "assets/products/bt12-5.jpg", "assets/products/bt12-6.webp"],
    sizes: [{ label: "1", price: 889 }, { label: "2", price: 889 }, { label: "3", price: 889 }, { label: "4", price: 889 }, { label: "5", price: 889 }],
    desc: "Crystal glass with faceted sides that throw light around a basin the way cut glass does on a dining table. Five styles to choose between, all finished to the same standard.",
    features: [
      "Faceted crystal glass that catches the light",
      "Five styles available",
      "Weighty, substantial feel in the hand",
      "A quiet touch of luxury for a vanity"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Glass", "Options": "5" },
    care: "Wipe with a soft, damp cloth and buff dry to keep the clarity. Avoid abrasive cleaners, and lift rather than slide the pieces across stone benchtops." },

  { id: "bt13", name: "Countertop Hand Towel Rack", cat: "Bathroom", room: "Bathroom", price: 276, memberPrice: 248, sku: "SH-10171", tag: "New", ph: "", img: "assets/products/bt13.jpg",
    imgs: ["assets/products/bt13.jpg", "assets/products/bt13-2.webp", "assets/products/bt13-3.webp", "assets/products/bt13-4.webp", "assets/products/bt13-5.webp", "assets/products/bt13-6.webp"],
    sizes: [{ label: "Black", price: 276 }, { label: "Gold", price: 276 }, { label: "Silver", price: 276 }],
    desc: "A 32cm standing rack for the bench or vanity, so a hand towel has somewhere to live that isn't the edge of the basin. Black, gold or silver.",
    features: [
      "32cm tall, sized for benches and vanities",
      "Keeps hand towels off the basin edge",
      "Black, Gold or Silver",
      "Freestanding, no fixing required"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt14", name: "Egyptian Cotton Towel Set (700GSM, 3-Piece)", cat: "Bathroom", room: "Bathroom", price: 220, memberPrice: 198, sku: "SH-10172", tag: "New", ph: "", img: "assets/products/bt14.jpg",
    imgs: ["assets/products/bt14.jpg", "assets/products/bt14-2.jpg", "assets/products/bt14-3.jpg", "assets/products/bt14-4.webp", "assets/products/bt14-5.jpg", "assets/products/bt14-6.jpg"],
    sizes: [{ label: "Light Grey / 3 Piece Towel Set", price: 220 }, { label: "Royal Blue / 3 Piece Towel Set", price: 220 }, { label: "Dark Grey / 3 Piece Towel Set", price: 220 }, { label: "White / 3 Piece Towel Set", price: 220 }, { label: "Peachy Pink / 3 Piece Towel Set", price: 220 }, { label: "Tuscan Tan / 3 Piece Towel Set", price: 220 }],
    desc: "700GSM Egyptian cotton, which is the weight where a towel stops being thin and starts feeling like a hotel. Three pieces per set, in six colours, absorbent from the first wash and soft after many.",
    features: [
      "700GSM Egyptian cotton",
      "Three-piece set",
      "Highly absorbent with a plush hand",
      "Six colours: light grey, royal blue, dark grey, white, peachy pink and more"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Egyptian cotton", "Options": "6" },
    care: "Machine wash warm with like colours. Avoid fabric softener, which coats the fibres and reduces absorbency. Tumble dry low, and skip the iron." },

  { id: "bt15", name: "Black & White Veined Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 100, memberPrice: 90, sku: "SH-10173", tag: "New", ph: "", img: "assets/products/bt15.jpg",
    imgs: ["assets/products/bt15.jpg", "assets/products/bt15-2.webp", "assets/products/bt15-3.webp", "assets/products/bt15-4.webp", "assets/products/bt15-5.webp", "assets/products/bt15-6.webp"],
    sizes: [{ label: "Soap Dish", price: 100 }, { label: "Soap Dispenser", price: 107 }, { label: "Mouthwash Cup", price: 107 }, { label: "Cotton Swab Box", price: 107 }, { label: "Toothbrush Holder", price: 119 }, { label: "Tray", price: 272 }],
    desc: "A black finish with white veining running across it, which reads as marble from across the room and costs considerably less. The tray pulls the set together on a vanity.",
    features: [
      "Black finish with elegant white veining",
      "Dispenser, mouthwash cup, toothbrush holder, cotton swab box, soap dish and tray",
      "Pieces sold individually",
      "Contemporary look at an accessible price"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "6" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt16", name: "Travertine Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 217, memberPrice: 195, sku: "SH-10174", tag: "New", ph: "", img: "assets/products/bt16.webp",
    imgs: ["assets/products/bt16.webp", "assets/products/bt16-2.jpg", "assets/products/bt16-3.jpg", "assets/products/bt16-4.webp", "assets/products/bt16-5.webp", "assets/products/bt16-6.webp"],
    sizes: [{ label: "Soap Dish A", price: 217 }, { label: "Soap Dish B", price: 217 }, { label: "Cup", price: 248 }, { label: "Toothbrush Holder", price: 257 }, { label: "Soap Dispenser A", price: 267 }, { label: "Soap Dispenser B", price: 267 }, { label: "Cotton Swab Box A", price: 267 }, { label: "Cotton Swab Box B", price: 267 }, { label: "Storage Container", price: 267 }, { label: "Tray A", price: 341 }, { label: "Aromatherapy Bottle", price: 346 }, { label: "Tray C", price: 422 }, { label: "Tray B", price: 531 }, { label: "Tissue Box", price: 548 }],
    desc: "Travertine has an open, pitted texture that reads as old-world rather than glossy, and it suits a bathroom that's meant to feel calm. The widest set of pieces we carry, including a storage container and two soap dish shapes.",
    features: [
      "Natural travertine with an open, tactile texture",
      "Includes dispensers, cotton swab boxes, cup, storage container and soap dishes",
      "Two shapes across several pieces",
      "Calm, understated finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural stone", "Options": "14" },
    care: "Wipe with a soft, damp cloth and dry. Avoid acidic or abrasive cleaners, which mark natural stone. Wipe spills promptly, especially oils and toothpaste." },

  { id: "bt17", name: "Rose Gold Bathroom Accessories Set", cat: "Bathroom", room: "Bathroom", price: 124, memberPrice: 112, sku: "SH-10175", tag: "New", ph: "", img: "assets/products/bt17.jpg",
    imgs: ["assets/products/bt17.jpg", "assets/products/bt17-2.jpg", "assets/products/bt17-3.jpg", "assets/products/bt17-4.jpg", "assets/products/bt17-5.jpg", "assets/products/bt17-6.webp"],
    sizes: [{ label: "Toothbrush Holder", price: 124 }, { label: "Soap Dispenser", price: 124 }, { label: "Soap Dish", price: 124 }, { label: "Cup", price: 124 }, { label: "Complete Set", price: 457 }],
    desc: "Rose gold detailing across a four-piece set: toothbrush holder, dispenser, soap dish and cup. Take the set, or fill a gap with a single piece.",
    features: [
      "Rose gold accents throughout",
      "Complete four-piece set or individual pieces",
      "Toothbrush holder, soap dispenser, soap dish and cup",
      "Warm metallic tone that flatters most tiles"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "5" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt18", name: "Expandable Bamboo Bath Caddy", cat: "Bathroom", room: "Bathroom", price: 250, memberPrice: 225, sku: "SH-10176", tag: "New", ph: "", img: "assets/products/bt18.jpg",
    imgs: ["assets/products/bt18.jpg", "assets/products/bt18-2.jpg", "assets/products/bt18-3.jpg", "assets/products/bt18-4.webp", "assets/products/bt18-5.webp", "assets/products/bt18-6.webp"],
    sizes: [{ label: "White", price: 250 }, { label: "Black", price: 250 }],
    desc: "Extends to fit across the bath, then holds a book, a glass and a candle where you can reach them. Bamboo, so it copes with the steam, in white or black.",
    features: [
      "Extends to fit most baths",
      "Holds a book, glass and candle",
      "Bamboo, suited to a humid room",
      "White or Black"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Timber", "Options": "2" },
    care: "Wipe dry after each use and let it air properly, since standing water is what eventually splits timber. Avoid soaking, and oil occasionally to keep the grain fed." },

  { id: "bt19", name: "Clear Cosmetic Storage Box", cat: "Bathroom", room: "Bathroom", price: 102, memberPrice: 92, sku: "SH-10177", tag: "New", ph: "", img: "assets/products/bt19.webp",
    imgs: ["assets/products/bt19.webp", "assets/products/bt19-2.webp", "assets/products/bt19-3.webp", "assets/products/bt19-4.webp", "assets/products/bt19-5.webp"],
    sizes: [{ label: "Small", price: 102 }, { label: "Large", price: 137 }],
    desc: "A clear box that keeps brushes, lipsticks and skincare upright and visible instead of rolling loose in a drawer. Two sizes, and tidy enough to leave out on the vanity.",
    features: [
      "Clear sides, so you can see what you have",
      "Keeps brushes and bottles upright",
      "Two sizes: Small and Large",
      "Smart enough to leave on display"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Resin / composite", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners and harsh solvents, which can dull the finish." },

  { id: "bt20", name: "Glass Bathroom Accessories Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 544, memberPrice: 490, sku: "SH-10178", tag: "New", ph: "", img: "assets/products/bt20.webp",
    imgs: ["assets/products/bt20.webp", "assets/products/bt20-2.webp", "assets/products/bt20-3.webp", "assets/products/bt20-4.webp", "assets/products/bt20-5.webp", "assets/products/bt20-6.webp"],
    sizes: [{ label: "4 x Piece Set / Black", price: 544 }, { label: "4 x Piece Set / White", price: 544 }],
    desc: "Four pieces in high-quality glass, in black or white, with the weight and clarity that cheap acrylic never manages. A whole basin dressed in one purchase.",
    features: [
      "High-quality glass construction",
      "Four-piece set",
      "Black or White",
      "Substantial weight and clarity"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Glass", "Options": "2" },
    care: "Wipe with a soft, damp cloth and buff dry to keep the clarity. Avoid abrasive cleaners, and lift rather than slide the pieces across stone benchtops." },

  { id: "bt21", name: "Ceramic Marble-Look Bathroom Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 352, memberPrice: 317, sku: "SH-10179", tag: "New", ph: "", img: "assets/products/bt21.webp",
    imgs: ["assets/products/bt21.webp", "assets/products/bt21-2.webp", "assets/products/bt21-3.webp", "assets/products/bt21-4.webp", "assets/products/bt21-5.webp", "assets/products/bt21-6.webp"],
    sizes: [{ label: "Emerald Green: 5 x Piece Set", price: 352 }, { label: "Snow White: 5 x Piece Set", price: 352 }, { label: "Black: 5 x Piece Set", price: 352 }],
    desc: "Five ceramic pieces finished to look like marble, with gold accents, in emerald green, snow white or black. All the drama of stone, at a fraction of the price and weight.",
    features: [
      "Five-piece ceramic set",
      "Marble-look finish with gold accents",
      "Emerald Green, Snow White or Black",
      "Lighter and more affordable than natural stone"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "3" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt22", name: "Marble & Copper Floor Towel Holder", cat: "Bathroom", room: "Bathroom", price: 2033, memberPrice: 1830, sku: "SH-10180", tag: "New", ph: "", img: "assets/products/bt22.jpg",
    imgs: ["assets/products/bt22.jpg", "assets/products/bt22-2.webp", "assets/products/bt22-3.jpg", "assets/products/bt22-4.jpg", "assets/products/bt22-5.jpg", "assets/products/bt22-6.jpg"],
    sizes: [{ label: "White + Gold", price: 2033 }, { label: "White + Black", price: 2033 }, { label: "Black + Black", price: 2033 }, { label: "Black + Gold", price: 2033 }],
    desc: "A freestanding towel holder on a solid marble base with copper rods, heavy enough to stay exactly where you put it. The piece that makes a bathroom look finished rather than furnished.",
    features: [
      "Solid marble base with copper rods",
      "Freestanding, no wall fixing",
      "Four colour combinations",
      "Weighted for stability"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt23", name: "Porcelain Bathroom Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 346, memberPrice: 311, sku: "SH-10181", tag: "New", ph: "", img: "assets/products/bt23.jpg",
    imgs: ["assets/products/bt23.jpg", "assets/products/bt23-2.jpg", "assets/products/bt23-3.jpg", "assets/products/bt23-4.jpg", "assets/products/bt23-5.jpg"],
    sizes: [{ label: "5 Piece Set", price: 346 }],
    desc: "Five porcelain pieces with clean lines and nothing superfluous, made to work together on a single vanity.",
    features: [
      "Five coordinated porcelain pieces",
      "Minimalist, contemporary lines",
      "Designed to be used as a set",
      "Smooth, wipe-clean glaze"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt24", name: "Ceramic Bathroom Accessories Collection", cat: "Bathroom", room: "Bathroom", price: 128, memberPrice: 115, sku: "SH-10182", tag: "New", ph: "", img: "assets/products/bt24.webp",
    imgs: ["assets/products/bt24.webp", "assets/products/bt24-2.webp", "assets/products/bt24-3.webp", "assets/products/bt24-4.webp", "assets/products/bt24-5.webp", "assets/products/bt24-6.webp"],
    sizes: [{ label: "Soap Dish / Silver", price: 128 }, { label: "Soap Dish / White", price: 128 }, { label: "Soap Dish / Gold", price: 128 }, { label: "Holder / Silver", price: 137 }, { label: "Holder / White", price: 137 }, { label: "Holder / Gold", price: 137 }, { label: "Cup / Silver", price: 143 }, { label: "Cup / White", price: 143 }, { label: "Cup / Gold", price: 143 }, { label: "Dispenser / Silver", price: 146 }, { label: "Dispenser / White", price: 146 }, { label: "Dispenser / Gold", price: 146 }],
    desc: "Good ceramic in silver, white or gold trims, sold piece by piece: dispenser, cup and holder. The easy way to replace one tired item without rebuying the lot.",
    features: [
      "High-quality ceramic",
      "Silver, White or Gold trims",
      "Dispenser, cup and holder",
      "Buy single pieces to fill a gap"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "12" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt25", name: "Marble-Base Rotating Vanity Mirror", cat: "Bathroom", room: "Bathroom", price: 637, memberPrice: 573, sku: "SH-10183", tag: "New", ph: "", img: "assets/products/bt25.jpg",
    imgs: ["assets/products/bt25.jpg", "assets/products/bt25-2.webp", "assets/products/bt25-3.webp", "assets/products/bt25-4.webp", "assets/products/bt25-5.webp", "assets/products/bt25-6.webp"],
    sizes: [{ label: "White", price: 637 }, { label: "Black", price: 637 }],
    desc: "A vanity mirror on a marble base that turns to the angle you need and stays there. Heavy enough not to creep across the bench while you use it.",
    features: [
      "Rotates to the angle you need",
      "Solid marble base",
      "White or Black",
      "Weighted so it stays put"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt26", name: "Marble Toiletry Collection", cat: "Bathroom", room: "Bathroom", price: 185, memberPrice: 166, sku: "SH-10184", tag: "New", ph: "", img: "assets/products/bt26.webp",
    imgs: ["assets/products/bt26.webp", "assets/products/bt26-2.jpg", "assets/products/bt26-3.webp", "assets/products/bt26-4.webp", "assets/products/bt26-5.webp", "assets/products/bt26-6.webp"],
    sizes: [{ label: "Soap Dish", price: 185 }, { label: "Mouth Cup", price: 259 }, { label: "Soap Dispenser (gold)", price: 278 }, { label: "Soap Dispenser (silver)", price: 278 }, { label: "Cotton Swab Box", price: 278 }, { label: "Toothbrush Holder", price: 306 }, { label: "Tissue Box B", price: 407 }, { label: "Tissue Box A", price: 463 }, { label: "Tray", price: 556 }],
    desc: "Marble pieces at a larger scale than most: two tissue box designs, a generous tray, dispensers in gold or silver. For a bathroom with the bench space to carry them.",
    features: [
      "Genuine marble throughout",
      "Two tissue box designs and a generous tray",
      "Gold or silver dispenser fittings",
      "Larger scale than most accessory ranges"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "9" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt27", name: "Expandable Timber Bath Caddy", cat: "Bathroom", room: "Bathroom", price: 294, memberPrice: 265, sku: "SH-10185", tag: "New", ph: "", img: "assets/products/bt27.jpg",
    imgs: ["assets/products/bt27.jpg", "assets/products/bt27-2.webp", "assets/products/bt27-3.jpg", "assets/products/bt27-4.webp", "assets/products/bt27-5.webp", "assets/products/bt27-6.webp"],
    desc: "Solid timber that extends across the bath, with room for a book, a glass and whatever else turns a bath into an hour to yourself.",
    features: [
      "Quality timber construction",
      "Expands to fit most baths",
      "Room for a book, glass and candle",
      "Warm, natural finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Timber" },
    care: "Wipe dry after each use and let it air properly, since standing water is what eventually splits timber. Avoid soaking, and oil occasionally to keep the grain fed." },

  { id: "bt28", name: "Luxe Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 602, memberPrice: 542, sku: "SH-10186", tag: "New", ph: "", img: "assets/products/bt28.webp",
    imgs: ["assets/products/bt28.webp", "assets/products/bt28-2.jpg", "assets/products/bt28-3.webp", "assets/products/bt28-4.jpg", "assets/products/bt28-5.webp", "assets/products/bt28-6.webp"],
    sizes: [{ label: "4 Piece Set A", price: 602 }, { label: "4 Piece Set B", price: 602 }],
    desc: "A four-piece set in two arrangements, made to dress a whole basin at once rather than be collected slowly.",
    features: [
      "Four-piece set",
      "Two arrangements to choose from",
      "Coordinated finish across every piece",
      "A complete basin in one purchase"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt29", name: "Gilded Bathroom Accessories Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 109, memberPrice: 98, sku: "SH-10187", tag: "New", ph: "", img: "assets/products/bt29.jpg",
    imgs: ["assets/products/bt29.jpg", "assets/products/bt29-2.jpg", "assets/products/bt29-3.jpg"],
    sizes: [{ label: "Soap Dish", price: 109 }, { label: "Toothbrush Holder", price: 109 }, { label: "Soap Dispenser", price: 109 }, { label: "Cup", price: 109 }, { label: "4 Piece Set", price: 424 }],
    desc: "Four pieces with gilded detailing, available as a set or individually, so a single soap dish can be replaced without starting again.",
    features: [
      "Four-piece set or individual pieces",
      "Gilded detailing",
      "Soap dish, toothbrush holder, dispenser and cup",
      "Consistent finish across the range"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "5" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt30", name: "Three-Tier Standing Towel Rack", cat: "Bathroom", room: "Bathroom", price: 1278, memberPrice: 1150, sku: "SH-10188", tag: "New", ph: "", img: "assets/products/bt30.jpg",
    imgs: ["assets/products/bt30.jpg", "assets/products/bt30-2.jpg", "assets/products/bt30-3.jpg", "assets/products/bt30-4.webp", "assets/products/bt30-5.webp", "assets/products/bt30-6.webp"],
    sizes: [{ label: "Black / Small", price: 1278 }, { label: "Gold / Small", price: 1278 }, { label: "Black / Large", price: 1370 }, { label: "Gold / Large", price: 1370 }],
    desc: "Three hanging levels on a freestanding frame, which is what a family bathroom actually needs: somewhere for three towels to dry properly rather than overlap on one rail.",
    features: [
      "Three hanging levels",
      "Freestanding, no wall fixing required",
      "Black or Gold",
      "Small and Large sizes"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt31", name: "Stainless Steel & Marble Towel Holder", cat: "Bathroom", room: "Bathroom", price: 461, memberPrice: 415, sku: "SH-10189", tag: "New", ph: "", img: "assets/products/bt31.webp",
    imgs: ["assets/products/bt31.webp", "assets/products/bt31-2.webp", "assets/products/bt31-3.webp", "assets/products/bt31-4.webp", "assets/products/bt31-5.jpg", "assets/products/bt31-6.jpg"],
    sizes: [{ label: "Black", price: 461 }, { label: "Brushed Gold", price: 461 }],
    desc: "Stainless steel rods on a marble foot: the steel handles the damp, the marble handles the standing still. Black or brushed gold.",
    features: [
      "Premium stainless steel with a marble base",
      "Resists rust in a humid room",
      "Black or Brushed Gold",
      "Freestanding"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt32", name: "Beige Bathroom Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 415, memberPrice: 374, sku: "SH-10190", tag: "New", ph: "", img: "assets/products/bt32.webp",
    imgs: ["assets/products/bt32.webp", "assets/products/bt32-2.webp", "assets/products/bt32-3.webp", "assets/products/bt32-4.webp", "assets/products/bt32-5.jpg", "assets/products/bt32-6.jpg"],
    sizes: [{ label: "Beige / 5pc Set", price: 415 }],
    desc: "Five pieces in a soft beige that works with timber vanities and warm tiles, where a stark white set would look cold.",
    features: [
      "Five-piece set",
      "Soft beige tone",
      "Suits timber and warm-toned bathrooms",
      "Coordinated across every piece"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt33", name: "Tree Branch Wall Hook (78cm)", cat: "Bathroom", room: "Bathroom", price: 574, memberPrice: 517, sku: "SH-10191", tag: "New", ph: "", img: "assets/products/bt33.jpg",
    imgs: ["assets/products/bt33.jpg", "assets/products/bt33-2.jpg", "assets/products/bt33-3.jpg", "assets/products/bt33-4.jpg", "assets/products/bt33-5.webp", "assets/products/bt33-6.webp"],
    sizes: [{ label: "Black + Gold / 78cm x 1.5cm", price: 574 }],
    desc: "A branching wall hook, 78cm long, that holds robes, towels and bags without looking like hardware. Black with gold.",
    features: [
      "78cm branching design",
      "Holds robes, towels and bags",
      "Black and gold finish",
      "A decorative piece as much as storage"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt34", name: "Dual-Rod Rotating Towel Rack", cat: "Bathroom", room: "Bathroom", price: 907, memberPrice: 816, sku: "SH-10192", tag: "New", ph: "", img: "assets/products/bt34.webp",
    imgs: ["assets/products/bt34.webp", "assets/products/bt34-2.jpg", "assets/products/bt34-3.webp", "assets/products/bt34-4.webp", "assets/products/bt34-5.jpg"],
    sizes: [{ label: "Silver", price: 907 }, { label: "Gold", price: 907 }],
    desc: "Two rods that rotate independently, so towels can be spread out to dry rather than bunched together. Silver or gold.",
    features: [
      "Two independently rotating rods",
      "Spreads towels so they dry properly",
      "Silver or Gold",
      "Freestanding frame"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt35", name: "Standing Stainless Steel Towel Rack", cat: "Bathroom", room: "Bathroom", price: 343, memberPrice: 309, sku: "SH-10193", tag: "New", ph: "", img: "assets/products/bt35.jpg",
    imgs: ["assets/products/bt35.jpg", "assets/products/bt35-2.jpg", "assets/products/bt35-3.jpg", "assets/products/bt35-4.jpg", "assets/products/bt35-5.webp", "assets/products/bt35-6.webp"],
    sizes: [{ label: "Black", price: 343 }, { label: "Brushed Gold", price: 343 }, { label: "Brushed Silver", price: 343 }],
    desc: "A simple standing rack in stainless steel, which is the material that survives a wet bathroom without rusting at the joints. Black, brushed gold or brushed silver.",
    features: [
      "High-quality stainless steel",
      "Resists rust and water spotting",
      "Black, Brushed Gold or Brushed Silver",
      "Clean, modern lines"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt36", name: "Two-Bar Floor Towel Rack with Storage", cat: "Bathroom", room: "Bathroom", price: 1563, memberPrice: 1407, sku: "SH-10194", tag: "New", ph: "", img: "assets/products/bt36.webp",
    imgs: ["assets/products/bt36.webp", "assets/products/bt36-2.jpg", "assets/products/bt36-3.webp", "assets/products/bt36-4.jpg", "assets/products/bt36-5.webp", "assets/products/bt36-6.webp"],
    sizes: [{ label: "Black", price: 1563 }, { label: "Gold", price: 1563 }],
    desc: "Two sturdy bars for towels with storage built into the frame below, so the bathroom gains a shelf as well as a rail.",
    features: [
      "Two sturdy towel bars",
      "Built-in storage below",
      "Durable metal construction",
      "Black or Gold"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt37", name: "Marble-Base Vertical Towel Rack", cat: "Bathroom", room: "Bathroom", price: 1630, memberPrice: 1467, sku: "SH-10195", tag: "New", ph: "", img: "assets/products/bt37.webp",
    imgs: ["assets/products/bt37.webp", "assets/products/bt37-2.webp", "assets/products/bt37-3.webp", "assets/products/bt37-4.jpg", "assets/products/bt37-5.webp"],
    sizes: [{ label: "Black", price: 1630 }],
    desc: "A tall vertical rack on a marble base, which keeps the footprint small while holding full-size bath towels. Black.",
    features: [
      "Solid marble base",
      "Vertical design with a small footprint",
      "Holds full-size bath towels",
      "Movable, no fixing required"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt38", name: "Modern Bath Accessories Collection", cat: "Bathroom", room: "Bathroom", price: 119, memberPrice: 107, sku: "SH-10196", tag: "New", ph: "", img: "assets/products/bt38.jpg",
    imgs: ["assets/products/bt38.jpg", "assets/products/bt38-2.jpg", "assets/products/bt38-3.jpg", "assets/products/bt38-4.webp", "assets/products/bt38-5.webp", "assets/products/bt38-6.webp"],
    sizes: [{ label: "Soap dish", price: 119 }, { label: "Cotton Swab Box", price: 133 }, { label: "Soap Dispenser", price: 133 }, { label: "Tray", price: 222 }],
    desc: "Clean lines and a contemporary finish across a cotton swab box, dispenser, soap dish and tray. Unfussy pieces for a bathroom that doesn't want a theme.",
    features: [
      "Cotton swab box, dispenser, soap dish and tray",
      "Clean contemporary lines",
      "Pieces sold individually",
      "Easy to wipe down"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Resin / composite", "Options": "4" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners and harsh solvents, which can dull the finish." },

  { id: "bt39", name: "Matte Bathroom Accessories Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 461, memberPrice: 415, sku: "SH-10197", tag: "New", ph: "", img: "assets/products/bt39.webp",
    imgs: ["assets/products/bt39.webp", "assets/products/bt39-2.jpg", "assets/products/bt39-3.jpg", "assets/products/bt39-4.jpg", "assets/products/bt39-5.jpg", "assets/products/bt39-6.webp"],
    sizes: [{ label: "Grey - 5 Pcs", price: 461 }, { label: "Sandstone- 5 Pcs", price: 461 }],
    desc: "A five-piece set in a soft matte finish, in grey or sandstone, that hides water spots far better than anything glossy.",
    features: [
      "Five-piece set",
      "Soft matte finish",
      "Grey or Sandstone",
      "Hides water marks better than gloss"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Resin / composite", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners and harsh solvents, which can dull the finish." },

  { id: "bt40", name: "Veined Marble Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 220, memberPrice: 198, sku: "SH-10198", tag: "New", ph: "", img: "assets/products/bt40.webp",
    imgs: ["assets/products/bt40.webp", "assets/products/bt40-2.jpg", "assets/products/bt40-3.webp", "assets/products/bt40-4.webp", "assets/products/bt40-5.webp", "assets/products/bt40-6.webp"],
    sizes: [{ label: "Soap dish", price: 220 }, { label: "Soap Dispenser", price: 274 }, { label: "Cup", price: 274 }, { label: "Cotton Swab Box", price: 328 }, { label: "Tray A", price: 472 }, { label: "Tray B", price: 506 }],
    desc: "Premium marble with pronounced veining, including two tray sizes for whatever bench space you have. Sold piece by piece.",
    features: [
      "Premium marble with pronounced veining",
      "Two tray sizes",
      "Dispenser, cotton swab box, cup and soap dish",
      "Each piece individually cut"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "6" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt41", name: "Faceted Ceramic Bathroom Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 367, memberPrice: 330, sku: "SH-10199", tag: "New", ph: "", img: "assets/products/bt41.jpg",
    imgs: ["assets/products/bt41.jpg", "assets/products/bt41-2.jpg", "assets/products/bt41-3.jpg", "assets/products/bt41-4.jpg", "assets/products/bt41-5.jpg", "assets/products/bt41-6.webp"],
    sizes: [{ label: "5 Pcs White Set", price: 367 }, { label: "5 Pcs Black Set", price: 367 }],
    desc: "Five ceramic pieces with faceted, polygonal sides that give a plain white or black set some shape and shadow.",
    features: [
      "Faceted, polygonal shape",
      "Five-piece ceramic set",
      "White or Black",
      "Smooth, wipe-clean glaze"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt42", name: "Natural Marble Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 248, memberPrice: 223, sku: "SH-10200", tag: "New", ph: "", img: "assets/products/bt42.jpg",
    imgs: ["assets/products/bt42.jpg", "assets/products/bt42-2.jpg", "assets/products/bt42-3.jpg", "assets/products/bt42-4.webp", "assets/products/bt42-5.webp", "assets/products/bt42-6.webp"],
    sizes: [{ label: "Toothbrush Cup", price: 248 }, { label: "Soap Dispenser A", price: 278 }, { label: "Soap Dispenser B", price: 278 }, { label: "Cotton Swab Box", price: 278 }, { label: "Diffuser", price: 304 }, { label: "Soap Dish", price: 407 }, { label: "Tray", price: 544 }],
    desc: "Genuine marble, including a diffuser and a generous tray alongside the usual pieces, so the whole vanity can be in one stone.",
    features: [
      "Genuine natural marble",
      "Includes diffuser and tray as well as the basics",
      "Two dispenser designs",
      "Veining unique to each piece"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "7" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt43", name: "Ceramic Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 433, memberPrice: 390, sku: "SH-10201", tag: "New", ph: "", img: "assets/products/bt43.webp",
    imgs: ["assets/products/bt43.webp", "assets/products/bt43-2.webp", "assets/products/bt43-3.webp", "assets/products/bt43-4.webp", "assets/products/bt43-5.webp", "assets/products/bt43-6.webp"],
    sizes: [{ label: "Green Set", price: 433 }, { label: "Coffee Set", price: 433 }],
    desc: "Four premium ceramic pieces in green or coffee, a quieter palette than the usual white and gold.",
    features: [
      "Four-piece premium ceramic set",
      "Green or Coffee colourway",
      "Minimalist shape",
      "Coordinated finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt44", name: "Crystal Glass Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 1344, memberPrice: 1210, sku: "SH-10202", tag: "New", ph: "", img: "assets/products/bt44.webp",
    imgs: ["assets/products/bt44.webp", "assets/products/bt44-2.jpg", "assets/products/bt44-3.webp", "assets/products/bt44-4.webp", "assets/products/bt44-5.webp"],
    sizes: [{ label: "4 Piece Set", price: 1344 }],
    desc: "Four pieces in crystal glass, bought together, for a vanity that catches the light every time someone walks past.",
    features: [
      "Four-piece crystal glass set",
      "Catches and throws light",
      "Substantial, weighty feel",
      "Timeless finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Glass", "Options": "1" },
    care: "Wipe with a soft, damp cloth and buff dry to keep the clarity. Avoid abrasive cleaners, and lift rather than slide the pieces across stone benchtops." },

  { id: "bt45", name: "Corner Towel Rack (40 × 50cm)", cat: "Bathroom", room: "Bathroom", price: 593, memberPrice: 534, sku: "SH-10203", tag: "New", ph: "", img: "assets/products/bt45.webp",
    imgs: ["assets/products/bt45.webp", "assets/products/bt45-2.webp", "assets/products/bt45-3.webp", "assets/products/bt45-4.webp", "assets/products/bt45-5.webp"],
    sizes: [{ label: "Black / 40cm x 50cm", price: 593 }, { label: "Gold / 40cm x 50cm", price: 593 }],
    desc: "Built for the corner that nothing else fits, 40 by 50cm, keeping towels off the floor and out of the way. Black or gold.",
    features: [
      "Fits an unused corner",
      "40 × 50cm",
      "Black or Gold",
      "Keeps towels tidy and off the floor"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt46", name: "Granite-Look Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 537, memberPrice: 483, sku: "SH-10204", tag: "New", ph: "", img: "assets/products/bt46.jpg",
    imgs: ["assets/products/bt46.jpg", "assets/products/bt46-2.jpg", "assets/products/bt46-3.jpg", "assets/products/bt46-4.jpg", "assets/products/bt46-5.jpg", "assets/products/bt46-6.jpg"],
    sizes: [{ label: "4 x Piece Set", price: 537 }],
    desc: "Four pieces in a granite-look finish, including a toilet brush, which most sets quietly leave out.",
    features: [
      "Four-piece set",
      "Granite-look finish",
      "Includes soap dish, dispenser, cup and toilet brush",
      "Hard-wearing and easy to clean"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  // ── Living Room ──
  { id: "sf01", name: "Deep-Seat Family Sofa", cat: "Living Room", room: "Living Room", price: 1600, memberPrice: 1440, sku: "SH-10205", tag: "New", ph: "", img: "assets/products/sf01.webp",
    imgs: ["assets/products/sf01.webp", "assets/products/sf01-2.webp", "assets/products/sf01-3.webp", "assets/products/sf01-4.webp", "assets/products/sf01-5.webp"],
    sizes: [{ label: "Beige / Foot Petal", price: 1600 }, { label: "Beige / 120cm", price: 4343 }, { label: "Beige / 180cm", price: 13035 }, { label: "Beige / 200cm", price: 13339 }, { label: "Beige / 220cm", price: 13807 }, { label: "Beige / 240cm", price: 14789 }, { label: "Beige / 260cm", price: 15676 }, { label: "Beige / 280cm", price: 18494 }, { label: "Beige / 300cm", price: 19156 }],
    desc: "Built for the household where everyone piles on at once: a deep seat, a soft back and widths right up to 260cm. Beige, which is the colour that forgives a family.",
    features: [
      "Deep seat and soft, yielding back",
      "Widths from 120cm to 260cm",
      "Warm beige upholstery",
      "Made for daily family use"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "9", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf02", name: "Modular Sofa with Chaise Options", cat: "Living Room", room: "Living Room", price: 1637, memberPrice: 1473, sku: "SH-10206", tag: "New", ph: "", img: "assets/products/sf02.webp",
    imgs: ["assets/products/sf02.webp", "assets/products/sf02-2.webp", "assets/products/sf02-3.webp", "assets/products/sf02-4.webp", "assets/products/sf02-5.webp"],
    sizes: [{ label: "Beige / Foot Pedal", price: 1637 }, { label: "Emerald Green / Foot Pedal", price: 1637 }, { label: "Charcoal Grey / Foot Pedal", price: 1637 }, { label: "Tan / Foot Pedal", price: 1637 }, { label: "Beige / 110cm", price: 4359 }, { label: "Emerald Green / 110cm", price: 4359 }, { label: "Charcoal Grey / 110cm", price: 4359 }, { label: "Tan / 110cm", price: 4359 }, { label: "Beige / 180cm", price: 7050 }, { label: "Emerald Green / 180cm", price: 7050 }, { label: "Charcoal Grey / 180cm", price: 7050 }, { label: "Tan / 180cm", price: 7050 }, { label: "Beige / 220cm", price: 7722 }, { label: "Emerald Green / 220cm", price: 7722 }, { label: "Charcoal Grey / 220cm", price: 7722 }, { label: "Tan / 220cm", price: 7722 }, { label: "Beige / 250cm", price: 8246 }, { label: "Emerald Green / 250cm", price: 8246 }, { label: "Charcoal Grey / 250cm", price: 8246 }, { label: "Tan / 250cm", price: 8246 }, { label: "Beige / 280cm", price: 8683 }, { label: "Emerald Green / 280cm", price: 8683 }, { label: "Charcoal Grey / 280cm", price: 8683 }, { label: "Tan / 280cm", price: 8683 }, { label: "Beige / 320cm", price: 9798 }, { label: "Emerald Green / 320cm", price: 9798 }, { label: "Charcoal Grey / 320cm", price: 9798 }, { label: "Tan / 320cm", price: 9798 }, { label: "Beige / 280cm + 180cm Chaise", price: 9963 }, { label: "Emerald Green / 280cm + 180cm Chaise", price: 9963 }, { label: "Charcoal Grey / 280cm + 180cm Chaise", price: 9963 }, { label: "Tan / 280cm + 180cm Chaise", price: 9963 }, { label: "Beige / 360cm", price: 10002 }, { label: "Emerald Green / 360cm", price: 10002 }, { label: "Charcoal Grey / 360cm", price: 10002 }, { label: "Tan / 360cm", price: 10002 }, { label: "Beige / 310cm + 180cm Chaise", price: 10656 }, { label: "Emerald Green / 310cm + 180cm Chaise", price: 10656 }, { label: "Charcoal Grey / 310cm + 180cm Chaise", price: 10656 }, { label: "Tan / 310cm + 180cm Chaise", price: 10656 }, { label: "Beige / 320cm + 180cm Chaise", price: 11515 }, { label: "Emerald Green / 320cm + 180cm Chaise", price: 11515 }, { label: "Charcoal Grey / 320cm + 180cm Chaise", price: 11515 }, { label: "Tan / 320cm + 180cm Chaise", price: 11515 }, { label: "Beige / 360cm + 180cm Chaise", price: 12359 }, { label: "Emerald Green / 360cm + 180cm Chaise", price: 12359 }, { label: "Charcoal Grey / 360cm + 180cm Chaise", price: 12359 }, { label: "Tan / 360cm + 180cm Chaise", price: 12359 }, { label: "Beige / 400cm + 180cm Chaise", price: 13481 }, { label: "Emerald Green / 400cm + 180cm Chaise", price: 13481 }, { label: "Charcoal Grey / 400cm + 180cm Chaise", price: 13481 }, { label: "Tan / 400cm + 180cm Chaise", price: 13481 }],
    desc: "A modular sofa that scales from a 110cm two-seater to a 320cm run with a chaise, so it fits the room you have now and the one you move to later. Several colourways.",
    features: [
      "Modular, from 110cm to 320cm",
      "Chaise configurations available",
      "Several colourways",
      "Rearrange as your room changes"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "52", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf03", name: "Low-Line Linen Lounge Sofa", cat: "Living Room", room: "Living Room", price: 1737, memberPrice: 1563, sku: "SH-10207", tag: "New", ph: "", img: "assets/products/sf03.webp",
    imgs: ["assets/products/sf03.webp", "assets/products/sf03-2.webp", "assets/products/sf03-3.webp", "assets/products/sf03-4.webp", "assets/products/sf03-5.webp"],
    sizes: [{ label: "45cm", price: 1737 }, { label: "50cm", price: 1759 }, { label: "55cm", price: 1904 }, { label: "60cm", price: 1944 }, { label: "120cm", price: 2689 }, { label: "Single Seater", price: 3263 }, { label: "Double Seater", price: 4052 }],
    desc: "A low, lounging sofa in linen with feather-filled cushions, the sort you sink into rather than perch on. Single and double modules plus small widths for a reading corner.",
    features: [
      "Linen upholstery with feather-filled cushions",
      "Low, relaxed seat height",
      "Single and double seater modules",
      "Small widths suit a reading nook"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Linen", "Options": "7", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head and blot spills at once. Linen softens and creases with use, which is part of its character. Keep out of harsh direct sun." },

  { id: "sf04", name: "Square-Stitched L-Shape Sofa", cat: "Living Room", room: "Living Room", price: 2685, memberPrice: 2416, sku: "SH-10208", tag: "New", ph: "", img: "assets/products/sf04.webp",
    imgs: ["assets/products/sf04.webp", "assets/products/sf04-2.webp", "assets/products/sf04-3.webp", "assets/products/sf04-4.webp", "assets/products/sf04-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 2685 }, { label: "Single Armchair", price: 5128 }, { label: "3 Seater", price: 16278 }, { label: "L-Shape", price: 17389 }],
    desc: "Clean square stitching across generous cushions, in a three seater or an L-shape that turns a corner properly. Armchair and footstool to match.",
    features: [
      "Square-stitched cushion detail",
      "Three seater or L-shape",
      "Matching armchair and footstool",
      "Clean contemporary lines"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf05", name: "Velvet Sofa Collection", cat: "Living Room", room: "Living Room", price: 2759, memberPrice: 2483, sku: "SH-10209", tag: "New", ph: "", img: "assets/products/sf05.webp",
    imgs: ["assets/products/sf05.webp", "assets/products/sf05-2.webp", "assets/products/sf05-3.webp", "assets/products/sf05-4.webp", "assets/products/sf05-5.webp"],
    sizes: [{ label: "Chair / Green", price: 2759 }, { label: "Chair / Red", price: 2759 }, { label: "Chair / Ivory", price: 2759 }, { label: "Ottoman / Green", price: 4315 }, { label: "Ottoman / Red", price: 4315 }, { label: "Ottoman / Ivory", price: 4315 }, { label: "110cm / Green", price: 5741 }, { label: "110cm / Red", price: 5741 }, { label: "110cm / Ivory", price: 5741 }, { label: "170cm / Green", price: 10407 }, { label: "170cm / Red", price: 10407 }, { label: "170cm / Ivory", price: 10407 }, { label: "215cm / Green", price: 12259 }, { label: "215cm / Red", price: 12259 }, { label: "215cm / Ivory", price: 12259 }, { label: "280cm / Green", price: 14704 }, { label: "280cm / Red", price: 14704 }, { label: "280cm / Ivory", price: 14704 }],
    desc: "Velvet over high-density foam, in green, red or ivory, at widths from 110cm to 280cm. The colours are the point here: a velvet sofa is the piece a room gets built around.",
    features: [
      "Velvet upholstery over high-density foam",
      "Green, Red or Ivory",
      "Widths from 110cm to 280cm",
      "A statement piece for a living room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "18", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf06", name: "Modular Leather Sectional Sofa", cat: "Living Room", room: "Living Room", price: 2759, memberPrice: 2483, sku: "SH-10210", tag: "New", ph: "", img: "assets/products/sf06.webp",
    imgs: ["assets/products/sf06.webp", "assets/products/sf06-2.webp", "assets/products/sf06-3.webp", "assets/products/sf06-4.webp", "assets/products/sf06-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 2759 }, { label: "Single Seater", price: 7593 }, { label: "210cm", price: 14291 }, { label: "280cm", price: 18981 }, { label: "330cm", price: 22204 }],
    desc: "Leather on a timber frame in a modular sectional layout, from a single seater to 330cm. Minimalist enough to disappear into a room, substantial enough to last in it.",
    features: [
      "Leather upholstery on a timber frame",
      "Modular sectional layout",
      "Single seater through to 330cm",
      "Matching footstool available"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf07", name: "Velvet Sofa with Chaise", cat: "Living Room", room: "Living Room", price: 2859, memberPrice: 2573, sku: "SH-10211", tag: "New", ph: "", img: "assets/products/sf07.webp",
    imgs: ["assets/products/sf07.webp", "assets/products/sf07-2.webp", "assets/products/sf07-3.webp", "assets/products/sf07-4.webp", "assets/products/sf07-5.webp"],
    sizes: [{ label: "Foot Petal", price: 2859 }, { label: "Single Armchair", price: 6472 }, { label: "180cm", price: 14148 }, { label: "200cm", price: 14813 }, { label: "220cm", price: 15722 }, { label: "240cm", price: 18278 }, { label: "260cm", price: 19554 }, { label: "280cm", price: 20587 }, { label: "300cm", price: 21139 }, { label: "280cm + Chaise", price: 22439 }, { label: "300cm + Chaise", price: 22991 }, { label: "350cm + Chaise", price: 26698 }, { label: "380cm + Chaise", price: 28444 }],
    desc: "Velvet across a timber frame, in widths to 300cm with chaise versions for the end of a long room. The armchair matches if you want a pair.",
    features: [
      "Velvet over a solid timber frame",
      "Chaise configurations at 280cm and 300cm",
      "Matching single armchair",
      "Eight widths to choose from"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "13", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf08", name: "Curved Sofa in Black", cat: "Living Room", room: "Living Room", price: 2878, memberPrice: 2590, sku: "SH-10212", tag: "New", ph: "", img: "assets/products/sf08.webp",
    imgs: ["assets/products/sf08.webp", "assets/products/sf08-2.webp", "assets/products/sf08-3.webp", "assets/products/sf08-4.webp", "assets/products/sf08-5.webp"],
    sizes: [{ label: "Black / Foot Petal", price: 2878 }, { label: "Black / 120cm", price: 5998 }, { label: "Black / 190cm", price: 8615 }, { label: "Black / 220cm", price: 9959 }, { label: "Black / 250cm", price: 11226 }, { label: "Black / 280cm", price: 11998 }, { label: "Black / 310cm", price: 13919 }, { label: "Black / 340cm", price: 14930 }],
    desc: "A curved back that softens a square room, in black, at widths from 120cm right up to 310cm. The curve is what makes it feel designed rather than bought.",
    features: [
      "Curved back and arms",
      "Widths from 120cm to 310cm",
      "Black upholstery",
      "Softens a square or narrow room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf09", name: "Wide Chaise Sofa Collection", cat: "Living Room", room: "Living Room", price: 2878, memberPrice: 2590, sku: "SH-10213", tag: "New", ph: "", img: "assets/products/sf09.webp",
    imgs: ["assets/products/sf09.webp", "assets/products/sf09-2.webp", "assets/products/sf09-3.webp", "assets/products/sf09-4.webp", "assets/products/sf09-5.webp"],
    sizes: [{ label: "Foot Petal", price: 2878 }, { label: "120cm", price: 4754 }, { label: "220cm", price: 10152 }, { label: "240cm", price: 11087 }, { label: "260cm", price: 12274 }, { label: "280cm", price: 12939 }, { label: "300cm", price: 13606 }, { label: "300cm + 160cm Chaise", price: 18050 }, { label: "320cm + 160cm Chaise", price: 20000 }, { label: "340cm + 160cm Chaise", price: 20974 }, { label: "360cm + 160cm Chaise", price: 21822 }, { label: "380cm + 160cm Chaise", price: 22863 }, { label: "400cm + 160cm Chaise", price: 24044 }, { label: "420cm + 160cm Chaise", price: 24733 }],
    desc: "Very wide seating with chaise options up to 340cm plus a 160cm chaise, for the living room that doubles as the place everyone falls asleep.",
    features: [
      "Widths from 120cm to 340cm",
      "160cm chaise configurations",
      "Deep, wide seat",
      "Built for lounging, not perching"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "14", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf10", name: "Modular Sofa with Footstool", cat: "Living Room", room: "Living Room", price: 2961, memberPrice: 2665, sku: "SH-10214", tag: "New", ph: "", img: "assets/products/sf10.webp",
    imgs: ["assets/products/sf10.webp", "assets/products/sf10-2.webp", "assets/products/sf10-3.webp", "assets/products/sf10-4.webp", "assets/products/sf10-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 2961 }, { label: "120cm", price: 6944 }, { label: "180cm", price: 16204 }, { label: "200cm", price: 17944 }, { label: "220cm", price: 19759 }, { label: "240cm", price: 21630 }, { label: "260cm", price: 23387 }, { label: "280cm", price: 25463 }],
    desc: "Modular seating on a timber frame with high-density foam, from 120cm to 280cm, with a footstool that doubles as extra seating when people arrive.",
    features: [
      "Modular layout, 120cm to 280cm",
      "Timber frame with high-density foam",
      "Footstool doubles as seating",
      "Rearrange to suit the room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf11", name: "Velvet Modular Sofa", cat: "Living Room", room: "Living Room", price: 3056, memberPrice: 2750, sku: "SH-10215", tag: "New", ph: "", img: "assets/products/sf11.webp",
    imgs: ["assets/products/sf11.webp", "assets/products/sf11-2.webp", "assets/products/sf11-3.webp", "assets/products/sf11-4.webp", "assets/products/sf11-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 3056 }, { label: "Single Armchair", price: 6552 }, { label: "180cm", price: 15880 }, { label: "200cm", price: 17939 }, { label: "220cm", price: 19426 }, { label: "240cm", price: 21017 }, { label: "260cm", price: 22757 }, { label: "280cm", price: 24630 }, { label: "300cm", price: 26457 }, { label: "320cm", price: 28130 }],
    desc: "Velvet, modular, and available up to 320cm, so a big room gets filled without three separate purchases. Armchair and footstool complete it.",
    features: [
      "Velvet over a timber frame",
      "Modular, up to 320cm",
      "Matching armchair and footstool",
      "High-density foam seating"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "10", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf12", name: "Bouclé Fabric Sofa", cat: "Living Room", room: "Living Room", price: 3663, memberPrice: 3297, sku: "SH-10216", tag: "New", ph: "", img: "assets/products/sf12.webp",
    imgs: ["assets/products/sf12.webp", "assets/products/sf12-2.webp", "assets/products/sf12-3.webp", "assets/products/sf12-4.webp", "assets/products/sf12-5.webp"],
    sizes: [{ label: "White / 105cm", price: 3663 }, { label: "Grey / 105cm", price: 3663 }, { label: "Brown / 105cm", price: 3663 }, { label: "Green / 105cm", price: 3663 }, { label: "White / 155cm", price: 9115 }, { label: "Grey / 155cm", price: 9115 }, { label: "Brown / 155cm", price: 9115 }, { label: "Green / 155cm", price: 9115 }, { label: "White / 200cm", price: 13167 }, { label: "Grey / 200cm", price: 13167 }, { label: "Brown / 200cm", price: 13167 }, { label: "Green / 200cm", price: 13167 }, { label: "White / 240cm", price: 15350 }, { label: "Grey / 240cm", price: 15350 }, { label: "Brown / 240cm", price: 15350 }, { label: "Green / 240cm", price: 15350 }],
    desc: "Soft bouclé in white or grey, at 105cm through to 240cm. The texture does the work: no pattern, no trim, just a quiet, tactile surface.",
    features: [
      "Soft bouclé upholstery",
      "White or Grey",
      "Widths from 105cm to 240cm",
      "Texture rather than pattern"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "16", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf13", name: "Compact Three-Size Sofa", cat: "Living Room", room: "Living Room", price: 3680, memberPrice: 3312, sku: "SH-10217", tag: "New", ph: "", img: "assets/products/sf13.webp",
    imgs: ["assets/products/sf13.webp", "assets/products/sf13-2.webp", "assets/products/sf13-3.webp", "assets/products/sf13-4.webp", "assets/products/sf13-5.webp"],
    sizes: [{ label: "110cm", price: 3680 }, { label: "160cm", price: 6009 }, { label: "190cm", price: 8087 }],
    desc: "A straightforward sofa in three sensible sizes, on a timber frame with high-density foam. For the room that needs a good sofa, not a statement.",
    features: [
      "Timber frame with high-density foam",
      "110cm, 160cm and 190cm",
      "Simple contemporary shape",
      "Hard-wearing everyday upholstery"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf14", name: "Low Lounger Modular Sofa", cat: "Living Room", room: "Living Room", price: 3680, memberPrice: 3312, sku: "SH-10218", tag: "New", ph: "", img: "assets/products/sf14.webp",
    imgs: ["assets/products/sf14.webp", "assets/products/sf14-2.webp", "assets/products/sf14-3.webp", "assets/products/sf14-4.webp", "assets/products/sf14-5.webp"],
    sizes: [{ label: "Off White / Single Seater Module", price: 3680 }, { label: "Off White / Double Seater Module", price: 5341 }, { label: "Off White / Corner Module", price: 6248 }],
    desc: "Low modules in off white that you arrange yourself: single, double and corner pieces, for a lounge that sits closer to the floor.",
    features: [
      "Single, double and corner modules",
      "Low lounging height",
      "Off white upholstery",
      "Arrange and rearrange at will"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf15", name: "Real Leather Sofa with Footstool", cat: "Living Room", room: "Living Room", price: 3680, memberPrice: 3312, sku: "SH-10219", tag: "New", ph: "", img: "assets/products/sf15.webp",
    imgs: ["assets/products/sf15.webp", "assets/products/sf15-2.webp", "assets/products/sf15-3.webp", "assets/products/sf15-4.webp", "assets/products/sf15-5.webp"],
    sizes: [{ label: "100cm (foot petal) / Black", price: 3680 }, { label: "100cm (foot petal) / Olive", price: 3680 }, { label: "100cm (foot petal) / Ocean Green", price: 3680 }, { label: "100cm (foot petal) / Beige", price: 3680 }, { label: "100cm (foot petal) / Burgundy", price: 3680 }, { label: "260cm / Black", price: 16281 }, { label: "260cm / Olive", price: 16281 }, { label: "260cm / Ocean Green", price: 16281 }, { label: "260cm / Beige", price: 16281 }, { label: "260cm / Burgundy", price: 16281 }, { label: "300cm / Black", price: 19070 }, { label: "300cm / Olive", price: 19070 }, { label: "300cm / Ocean Green", price: 19070 }, { label: "300cm / Beige", price: 19070 }, { label: "300cm / Burgundy", price: 19070 }, { label: "335cm / Black", price: 21852 }, { label: "335cm / Olive", price: 21852 }, { label: "335cm / Ocean Green", price: 21852 }, { label: "335cm / Beige", price: 21852 }, { label: "335cm / Burgundy", price: 21852 }, { label: "365cm / Black", price: 24656 }, { label: "365cm / Olive", price: 24656 }, { label: "365cm / Ocean Green", price: 24656 }, { label: "365cm / Beige", price: 24656 }, { label: "365cm / Burgundy", price: 24656 }],
    desc: "Real leather in black, olive and ocean green, from a 100cm footstool up to full-length seating. Leather that will look better in five years than it does today.",
    features: [
      "Genuine leather upholstery",
      "Black, Olive and Ocean Green",
      "Footstool through to full-length seating",
      "Ages into a softer patina"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "25", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf16", name: "Down-Filled Modular Sectional", cat: "Living Room", room: "Living Room", price: 3696, memberPrice: 3326, sku: "SH-10220", tag: "New", ph: "", img: "assets/products/sf16.webp",
    imgs: ["assets/products/sf16.webp", "assets/products/sf16-2.webp", "assets/products/sf16-3.webp", "assets/products/sf16-4.webp", "assets/products/sf16-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 3696 }, { label: "120cm", price: 7031 }, { label: "270cm", price: 19272 }, { label: "300cm", price: 21828 }, { label: "282cm + 150cm Chaise", price: 22976 }, { label: "330cm", price: 24511 }, { label: "360cm", price: 27196 }, { label: "310cm + 150cm Chaise", price: 28215 }, { label: "338cm + 150cm Chaise", price: 29828 }, { label: "360cm + 150cm Chaise", price: 30900 }],
    desc: "Down-filled cushions on a modular sectional, up to 360cm with a 150cm chaise. Soft enough that people stop sitting and start lying down.",
    features: [
      "Down-filled cushions",
      "Modular sectional up to 360cm",
      "150cm chaise configurations",
      "Deep, cloud-like seat"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "10", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf17", name: "Premium Velvet Chaise Sofa", cat: "Living Room", room: "Living Room", price: 4056, memberPrice: 3650, sku: "SH-10221", tag: "New", ph: "", img: "assets/products/sf17.webp",
    imgs: ["assets/products/sf17.webp", "assets/products/sf17-2.webp", "assets/products/sf17-3.webp", "assets/products/sf17-4.webp", "assets/products/sf17-5.webp"],
    sizes: [{ label: "Foot Petal", price: 4056 }, { label: "Single Arcmchair", price: 5554 }, { label: "200cm", price: 11565 }, { label: "220cm", price: 12778 }, { label: "240cm", price: 13735 }, { label: "260cm", price: 14796 }, { label: "280cm + Chaise", price: 19815 }, { label: "300cm + Chaise", price: 21480 }, { label: "320cm + Chaise", price: 22185 }],
    desc: "Premium velvet on a timber frame, in widths to 320cm with chaise versions. The armchair and footstool match for a full setting.",
    features: [
      "Premium velvet upholstery",
      "Chaise versions from 280cm",
      "Matching armchair and footstool",
      "High-density foam seating"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "9", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf18", name: "Two-Tone Cotton Sofa Collection", cat: "Living Room", room: "Living Room", price: 4159, memberPrice: 3743, sku: "SH-10222", tag: "New", ph: "", img: "assets/products/sf18.webp",
    imgs: ["assets/products/sf18.webp", "assets/products/sf18-2.webp", "assets/products/sf18-3.webp", "assets/products/sf18-4.webp", "assets/products/sf18-5.webp"],
    sizes: [{ label: "Dusty Grey + Ivory / Foot Petal", price: 4159 }, { label: "Dusty Grey + Ivory / 120cm", price: 5141 }, { label: "Dusty Grey + Ivory / 180cm", price: 8448 }, { label: "Dusty Grey + Ivory / 285cm", price: 16039 }, { label: "Dusty Grey + Ivory / 360cm", price: 24487 }, { label: "Dusty Grey + Ivory / 285cm + 180cm Chaise", price: 25589 }, { label: "Dusty Grey + Ivory / 360cm + 180cm Chaise", price: 26080 }, { label: "Dusty Grey + Ivory / 435cm + 180cm Chaise", price: 32691 }],
    desc: "Dusty grey paired with ivory, in cotton, from 120cm to 285cm. The two-tone treatment stops a large sofa reading as a single heavy block.",
    features: [
      "Two-tone dusty grey and ivory",
      "Cotton upholstery",
      "Widths from 120cm to 285cm",
      "Breaks up the bulk of a large sofa"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf19", name: "Floating Ash Timber & Leather Sofa", cat: "Living Room", room: "Living Room", price: 4365, memberPrice: 3928, sku: "SH-10223", tag: "New", ph: "", img: "assets/products/sf19.webp",
    imgs: ["assets/products/sf19.webp", "assets/products/sf19-2.webp", "assets/products/sf19-3.webp", "assets/products/sf19-4.webp", "assets/products/sf19-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 4365 }, { label: "Singe Armchair", price: 7009 }, { label: "230cm", price: 19444 }, { label: "260cm", price: 20809 }, { label: "290cm", price: 22572 }, { label: "320cm", price: 24072 }],
    desc: "Leather seating that appears to float on a premium ash timber base, in widths to 320cm. The detail is in the gap between frame and cushion.",
    features: [
      "Premium ash timber base",
      "Leather upholstery",
      "Floating silhouette",
      "Widths from 230cm to 320cm"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "6", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf20", name: "Sculptural Curved Sofa", cat: "Living Room", room: "Living Room", price: 4407, memberPrice: 3966, sku: "SH-10224", tag: "New", ph: "", img: "assets/products/sf20.webp",
    imgs: ["assets/products/sf20.webp", "assets/products/sf20-2.webp", "assets/products/sf20-3.webp", "assets/products/sf20-4.webp", "assets/products/sf20-5.webp"],
    sizes: [{ label: "90cm", price: 4407 }, { label: "210cm", price: 9593 }, { label: "240cm", price: 12185 }],
    desc: "A curved, sculptural shape in three sizes, from a 90cm loveseat to a 240cm three seater. Looks considered from every angle, which matters in an open-plan room.",
    features: [
      "Curved, sculptural silhouette",
      "90cm, 210cm and 240cm",
      "Works in the middle of an open-plan room",
      "Contemporary upholstery"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf21", name: "Wide-Cushion Velvet Sofa", cat: "Living Room", room: "Living Room", price: 4476, memberPrice: 4028, sku: "SH-10225", tag: "New", ph: "", img: "assets/products/sf21.webp",
    imgs: ["assets/products/sf21.webp", "assets/products/sf21-2.webp", "assets/products/sf21-3.webp", "assets/products/sf21-4.webp", "assets/products/sf21-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 4476 }, { label: "170cm", price: 13606 }, { label: "190cm", price: 14609 }, { label: "220cm", price: 15406 }, { label: "250cm", price: 16887 }, { label: "280cm", price: 18357 }, { label: "310cm", price: 19350 }, { label: "340cm", price: 20646 }],
    desc: "Luxuriously wide cushions in velvet, from 170cm to 340cm. Fewer, bigger cushions means fewer seams and a cleaner line.",
    features: [
      "Extra-wide velvet cushions",
      "Widths from 170cm to 340cm",
      "Matching footstool",
      "Clean, uninterrupted seat line"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf22", name: "Colour-Block Sofa Collection", cat: "Living Room", room: "Living Room", price: 4520, memberPrice: 4068, sku: "SH-10226", tag: "New", ph: "", img: "assets/products/sf22.webp",
    imgs: ["assets/products/sf22.webp", "assets/products/sf22-2.webp", "assets/products/sf22-3.webp", "assets/products/sf22-4.webp", "assets/products/sf22-5.webp"],
    sizes: [{ label: "Single Seater / Yellow", price: 4520 }, { label: "Single Seater / White", price: 4520 }, { label: "160cm / Yellow", price: 8830 }, { label: "160cm / White", price: 8830 }, { label: "200cm / Yellow", price: 10831 }, { label: "200cm / White", price: 10831 }, { label: "230cm / Yellow", price: 12731 }, { label: "230cm / White", price: 12731 }],
    desc: "An unusual shape in yellow or white, from a single seater to 200cm. For a room that wants some personality rather than another beige three seater.",
    features: [
      "Distinctive contemporary shape",
      "Yellow or White",
      "Single seater to 200cm",
      "A colour-led statement piece"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf23", name: "Modular Leather & Ash Sofa", cat: "Living Room", room: "Living Room", price: 4611, memberPrice: 4150, sku: "SH-10227", tag: "New", ph: "", img: "assets/products/sf23.webp",
    imgs: ["assets/products/sf23.webp", "assets/products/sf23-2.webp", "assets/products/sf23-3.webp", "assets/products/sf23-4.webp", "assets/products/sf23-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 4611 }, { label: "Single Armchair", price: 7220 }, { label: "210cm", price: 16661 }, { label: "280cm", price: 21398 }, { label: "360cm", price: 25000 }],
    desc: "Leather modules on an ash timber frame, up to 360cm, arranged how you like. Armchair and footstool available separately.",
    features: [
      "Leather over ash timber",
      "Modular layout to 360cm",
      "Armchair and footstool sold separately",
      "Clean modern proportions"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf24", name: "Leather Sofa in Four Colours", cat: "Living Room", room: "Living Room", price: 4748, memberPrice: 4273, sku: "SH-10228", tag: "New", ph: "", img: "assets/products/sf24.webp",
    imgs: ["assets/products/sf24.webp", "assets/products/sf24-2.webp", "assets/products/sf24-3.webp", "assets/products/sf24-4.webp", "assets/products/sf24-5.webp"],
    sizes: [{ label: "Foot Pedal / Green", price: 4748 }, { label: "Foot Pedal / Beige", price: 4748 }, { label: "Foot Pedal / Navy", price: 4748 }, { label: "Foot Pedal / Grey", price: 4748 }, { label: "145cm / Green", price: 12120 }, { label: "145cm / Beige", price: 12120 }, { label: "145cm / Navy", price: 12120 }, { label: "145cm / Grey", price: 12120 }, { label: "215cm / Green", price: 14022 }, { label: "215cm / Beige", price: 14022 }, { label: "215cm / Navy", price: 14022 }, { label: "215cm / Grey", price: 14022 }, { label: "260cm / Green", price: 19370 }, { label: "260cm / Beige", price: 19370 }, { label: "260cm / Navy", price: 19370 }, { label: "260cm / Grey", price: 19370 }, { label: "300cm / Green", price: 24480 }, { label: "300cm / Beige", price: 24480 }, { label: "300cm / Navy", price: 24480 }, { label: "300cm / Grey", price: 24480 }, { label: "310cm + 190cm Chaise / Green", price: 30035 }, { label: "310cm + 190cm Chaise / Beige", price: 30035 }, { label: "310cm + 190cm Chaise / Navy", price: 30035 }, { label: "310cm + 190cm Chaise / Grey", price: 30035 }],
    desc: "Leather in green, beige, navy or grey, at 145cm, 215cm or 260cm. The colour range is wider than most leather sofas offer.",
    features: [
      "Genuine leather upholstery",
      "Green, Beige, Navy or Grey",
      "145cm, 215cm and 260cm",
      "Timeless shape"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "24", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf25", name: "Italian-Style Leather Sectional", cat: "Living Room", room: "Living Room", price: 4837, memberPrice: 4353, sku: "SH-10229", tag: "New", ph: "", img: "assets/products/sf25.webp",
    imgs: ["assets/products/sf25.webp", "assets/products/sf25-2.webp", "assets/products/sf25-3.webp", "assets/products/sf25-4.webp", "assets/products/sf25-5.webp"],
    sizes: [{ label: "Charcoal Grey / 105cm", price: 4837 }, { label: "Green / 105cm", price: 4837 }, { label: "Tan/Orange / 105cm", price: 4837 }, { label: "Charcoal Grey / 165cm", price: 8663 }, { label: "Green / 165cm", price: 8663 }, { label: "Tan/Orange / 165cm", price: 8663 }, { label: "Charcoal Grey / 215cm", price: 10444 }, { label: "Green / 215cm", price: 10444 }, { label: "Tan/Orange / 215cm", price: 10444 }, { label: "Charcoal Grey / 280cm", price: 15257 }, { label: "Green / 280cm", price: 15257 }, { label: "Tan/Orange / 280cm", price: 15257 }, { label: "Charcoal Grey / 250cm + Chaise", price: 22478 }, { label: "Green / 250cm + Chaise", price: 22478 }, { label: "Tan/Orange / 250cm + Chaise", price: 22478 }],
    desc: "A sectional in charcoal grey or grey leather, from 105cm to 280cm, with the restrained lines of Italian design.",
    features: [
      "Leather sectional",
      "Charcoal Grey or Grey",
      "Widths from 105cm to 280cm",
      "Restrained, tailored lines"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "15", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf26", name: "Bouclé Sofa with Footstool", cat: "Living Room", room: "Living Room", price: 5028, memberPrice: 4525, sku: "SH-10230", tag: "New", ph: "", img: "assets/products/sf26.webp",
    imgs: ["assets/products/sf26.webp", "assets/products/sf26-2.webp", "assets/products/sf26-3.webp", "assets/products/sf26-4.webp", "assets/products/sf26-5.webp"],
    sizes: [{ label: "90cm x 60cm", price: 5028 }, { label: "90cm x 90cm", price: 5098 }, { label: "90cm x 90cm + Right Armrest", price: 5609 }, { label: "90cm x 90cm + Left Armrest", price: 5609 }, { label: "90cm x 90cm + Backrest", price: 5609 }, { label: "90cm x 60cm + Backrest", price: 5609 }, { label: "180cm", price: 11217 }, { label: "180cm + Foot Pedal", price: 16431 }, { label: "240cm", price: 16431 }, { label: "240cm + Foot Pedal", price: 20346 }, { label: "270cm + Foot Pedal", price: 21620 }],
    desc: "Bouclé on a timber frame, at 180cm, 240cm or 270cm, with or without the matching footstool. There is also a 90 by 90cm corner piece.",
    features: [
      "Bouclé over a timber frame",
      "180cm, 240cm and 270cm",
      "With or without footstool",
      "90 x 90cm corner module available"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "11", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf27", name: "Curved Leather Sofa", cat: "Living Room", room: "Living Room", price: 5070, memberPrice: 4563, sku: "SH-10231", tag: "New", ph: "", img: "assets/products/sf27.webp",
    imgs: ["assets/products/sf27.webp", "assets/products/sf27-2.webp", "assets/products/sf27-3.webp", "assets/products/sf27-4.webp", "assets/products/sf27-5.webp"],
    sizes: [{ label: "Single Seater", price: 5070 }, { label: "150cm", price: 11950 }, { label: "170cm", price: 12772 }, { label: "200cm", price: 13454 }, { label: "230cm", price: 14250 }],
    desc: "Leather with a curved back on a timber frame, from a single seater to 230cm. High-density foam keeps the curve from collapsing over time.",
    features: [
      "Curved back in genuine leather",
      "Timber frame, high-density foam",
      "Single seater to 230cm",
      "Holds its shape with use"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf28", name: "Classic Leather Sofa", cat: "Living Room", room: "Living Room", price: 6106, memberPrice: 5495, sku: "SH-10232", tag: "New", ph: "", img: "assets/products/sf28.webp",
    imgs: ["assets/products/sf28.webp", "assets/products/sf28-2.webp", "assets/products/sf28-3.webp", "assets/products/sf28-4.webp", "assets/products/sf28-5.webp"],
    sizes: [{ label: "86cm", price: 6106 }, { label: "136cm", price: 10535 }, { label: "186cm", price: 17093 }, { label: "235cm", price: 20920 }],
    desc: "A classic leather sofa in four sizes, from an 86cm chair to a 235cm three seater, on a timber frame.",
    features: [
      "Genuine leather over timber",
      "86cm, 136cm, 186cm and 235cm",
      "High-density foam seating",
      "Classic, uncomplicated shape"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf29", name: "Curved Velvet Modular Sofa", cat: "Living Room", room: "Living Room", price: 6457, memberPrice: 5811, sku: "SH-10233", tag: "New", ph: "", img: "assets/products/sf29.webp",
    imgs: ["assets/products/sf29.webp", "assets/products/sf29-2.webp", "assets/products/sf29-3.webp", "assets/products/sf29-4.webp", "assets/products/sf29-5.webp"],
    sizes: [{ label: "Occasional Chair", price: 6457 }, { label: "Single Armchair", price: 7315 }, { label: "160cm", price: 18294 }, { label: "170cm", price: 20352 }, { label: "180cm", price: 20824 }, { label: "210cm", price: 22037 }, { label: "220xcm", price: 22461 }, { label: "240cm", price: 23852 }, { label: "260cm", price: 25000 }, { label: "280cm", price: 26846 }, { label: "320cm", price: 29019 }],
    desc: "Velvet, curved and modular, in widths from 160cm to 320cm, with an armchair and an occasional chair that match. The widest choice of sizes we carry.",
    features: [
      "Curved velvet modules",
      "Eleven widths, 160cm to 320cm",
      "Matching armchair and occasional chair",
      "Timber frame"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "11", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf30", name: "Velvet & Linen Sofa", cat: "Living Room", room: "Living Room", price: 6722, memberPrice: 6050, sku: "SH-10234", tag: "New", ph: "", img: "assets/products/sf30.webp",
    imgs: ["assets/products/sf30.webp", "assets/products/sf30-2.webp", "assets/products/sf30-3.webp", "assets/products/sf30-4.webp", "assets/products/sf30-5.webp"],
    sizes: [{ label: "120cm", price: 6722 }, { label: "180cm", price: 11702 }, { label: "210cm", price: 15143 }, { label: "260cm", price: 20165 }],
    desc: "Velvet and linen together on a timber frame, in four sizes. Two textures in one piece, which stops a big sofa looking flat.",
    features: [
      "Velvet and linen upholstery",
      "Timber frame",
      "120cm, 180cm, 210cm and 260cm",
      "Two textures in one piece"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf31", name: "Leather Sofa & Armchair", cat: "Living Room", room: "Living Room", price: 6939, memberPrice: 6245, sku: "SH-10235", tag: "New", ph: "", img: "assets/products/sf31.webp",
    imgs: ["assets/products/sf31.webp", "assets/products/sf31-2.webp", "assets/products/sf31-3.webp", "assets/products/sf31-4.webp", "assets/products/sf31-5.webp"],
    sizes: [{ label: "Chair", price: 6939 }, { label: "160cm", price: 15033 }, { label: "200cm", price: 19656 }, { label: "240cm", price: 21948 }, { label: "280cm", price: 24963 }],
    desc: "Leather on a timber frame, from a single chair to 280cm, with high-density foam that holds its shape.",
    features: [
      "Genuine leather over timber",
      "Chair through to 280cm",
      "High-density foam",
      "Matching chair and sofa"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf32", name: "Everyday Fabric Sofa", cat: "Living Room", room: "Living Room", price: 7370, memberPrice: 6633, sku: "SH-10236", tag: "New", ph: "", img: "assets/products/sf32.webp",
    imgs: ["assets/products/sf32.webp", "assets/products/sf32-2.webp", "assets/products/sf32-3.webp", "assets/products/sf32-4.webp", "assets/products/sf32-5.webp"],
    sizes: [{ label: "80cm", price: 7370 }, { label: "210cm", price: 13296 }, { label: "240cm", price: 16630 }],
    desc: "A plain, well-made fabric sofa in three sizes, including an 80cm chair. The sensible choice for a first home or a second living room.",
    features: [
      "Hard-wearing fabric upholstery",
      "80cm, 210cm and 240cm",
      "Simple contemporary shape",
      "Suits a first home or rental"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf33", name: "Curved Lounge Sofa in Six Colours", cat: "Living Room", room: "Living Room", price: 7387, memberPrice: 6648, sku: "SH-10237", tag: "New", ph: "", img: "assets/products/sf33.webp",
    imgs: ["assets/products/sf33.webp", "assets/products/sf33-2.webp", "assets/products/sf33-3.webp", "assets/products/sf33-4.webp", "assets/products/sf33-5.webp"],
    sizes: [{ label: "Brown / 150cm", price: 7387 }, { label: "Green / 150cm", price: 7387 }, { label: "Pink / 150cm", price: 7387 }, { label: "White / 150cm", price: 7387 }, { label: "Brown / 200cm", price: 9217 }, { label: "Green / 200cm", price: 9217 }, { label: "Pink / 200cm", price: 9217 }, { label: "White / 200cm", price: 9217 }],
    desc: "A curved lounge sofa on a timber frame, in brown, green, pink, white and more, at 150cm or 200cm. The colour choice is unusually broad.",
    features: [
      "Curved lounge shape",
      "Six colourways",
      "150cm or 200cm",
      "Timber frame"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf34", name: "Tan Leather Sofa", cat: "Living Room", room: "Living Room", price: 8350, memberPrice: 7515, sku: "SH-10238", tag: "New", ph: "", img: "assets/products/sf34.webp",
    imgs: ["assets/products/sf34.webp", "assets/products/sf34-2.webp", "assets/products/sf34-3.webp", "assets/products/sf34-4.webp", "assets/products/sf34-5.webp"],
    sizes: [{ label: "130cm / Tan", price: 8350 }, { label: "190cm / Tan", price: 13002 }, { label: "272cm / Tan", price: 16491 }, { label: "298cm / Tan", price: 18004 }, { label: "326cm / Tan", price: 18819 }, { label: "253cm / Tan", price: 20678 }, { label: "353cm / Tan", price: 20678 }],
    desc: "Tan leather on timber, in seven widths from 130cm to 353cm. Tan is the leather that warms a room rather than darkening it.",
    features: [
      "Tan leather over a timber frame",
      "Seven widths, 130cm to 353cm",
      "Warm, light leather tone",
      "Ages beautifully"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "7", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf35", name: "Leather Sofa with Long Chaise", cat: "Living Room", room: "Living Room", price: 8459, memberPrice: 7613, sku: "SH-10239", tag: "New", ph: "", img: "assets/products/sf35.webp",
    imgs: ["assets/products/sf35.webp", "assets/products/sf35-2.webp", "assets/products/sf35-3.webp", "assets/products/sf35-4.webp", "assets/products/sf35-5.webp"],
    sizes: [{ label: "190cm", price: 8459 }, { label: "260cm", price: 10841 }, { label: "260cm + 165cm Chaise", price: 13219 }, { label: "330cm", price: 14407 }, { label: "330cm + 165cm Chaise", price: 15859 }, { label: "400cm + 165cm Chaise", price: 17637 }],
    desc: "Leather seating with a 165cm chaise, in overall lengths to 400cm. For the room with a long wall and nothing on it.",
    features: [
      "Genuine leather upholstery",
      "165cm chaise configurations",
      "Lengths to 400cm",
      "Built for a large living room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "6", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf36", name: "Full-Grain Look Leather Sofa", cat: "Living Room", room: "Living Room", price: 9200, memberPrice: 8280, sku: "SH-10240", tag: "New", ph: "", img: "assets/products/sf36.webp",
    imgs: ["assets/products/sf36.webp", "assets/products/sf36-2.webp", "assets/products/sf36-3.webp", "assets/products/sf36-4.webp", "assets/products/sf36-5.webp"],
    sizes: [{ label: "120cm / Tan", price: 9200 }, { label: "120cm / Black", price: 9200 }, { label: "120cm / Light Grey", price: 9200 }, { label: "120cm / Grey", price: 9200 }, { label: "120cm / Charcoal Grey", price: 9200 }, { label: "120cm / Chocolate", price: 9200 }, { label: "180cm / Tan", price: 12611 }, { label: "180cm / Black", price: 12611 }, { label: "180cm / Light Grey", price: 12611 }, { label: "180cm / Grey", price: 12611 }, { label: "180cm / Charcoal Grey", price: 12611 }, { label: "180cm / Chocolate", price: 12611 }, { label: "200cm / Tan", price: 13526 }, { label: "200cm / Black", price: 13526 }, { label: "200cm / Light Grey", price: 13526 }, { label: "200cm / Grey", price: 13526 }, { label: "200cm / Charcoal Grey", price: 13526 }, { label: "200cm / Chocolate", price: 13526 }, { label: "220cm / Tan", price: 16259 }, { label: "220cm / Black", price: 16259 }, { label: "220cm / Light Grey", price: 16259 }, { label: "220cm / Grey", price: 16259 }, { label: "220cm / Charcoal Grey", price: 16259 }, { label: "220cm / Chocolate", price: 16259 }, { label: "240cm / Tan", price: 18611 }, { label: "240cm / Black", price: 18611 }, { label: "240cm / Light Grey", price: 18611 }, { label: "240cm / Grey", price: 18611 }, { label: "240cm / Charcoal Grey", price: 18611 }, { label: "240cm / Chocolate", price: 18611 }, { label: "260cm / Tan", price: 20433 }, { label: "260cm / Black", price: 20433 }, { label: "260cm / Light Grey", price: 20433 }, { label: "260cm / Grey", price: 20433 }, { label: "260cm / Charcoal Grey", price: 20433 }, { label: "260cm / Chocolate", price: 20433 }, { label: "280cm / Tan", price: 22789 }, { label: "280cm / Black", price: 22789 }, { label: "280cm / Light Grey", price: 22789 }, { label: "280cm / Grey", price: 22789 }, { label: "280cm / Charcoal Grey", price: 22789 }, { label: "280cm / Chocolate", price: 22789 }],
    desc: "Tan leather in eight widths from 120cm to 280cm, so it fits a snug or a formal lounge equally.",
    features: [
      "Leather upholstery",
      "Eight widths, 120cm to 280cm",
      "Tan colourway",
      "Suits snug or formal rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "42", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf37", name: "Velvet Sofa in Five Sizes", cat: "Living Room", room: "Living Room", price: 10272, memberPrice: 9245, sku: "SH-10241", tag: "New", ph: "", img: "assets/products/sf37.webp",
    imgs: ["assets/products/sf37.webp", "assets/products/sf37-2.webp", "assets/products/sf37-3.webp", "assets/products/sf37-4.webp", "assets/products/sf37-5.webp"],
    sizes: [{ label: "White / 210cm", price: 10272 }, { label: "Green / 210cm", price: 10272 }, { label: "Black / 210cm", price: 10272 }, { label: "White / 240cm", price: 11063 }, { label: "Green / 240cm", price: 11063 }, { label: "Black / 240cm", price: 11063 }, { label: "White / 270cm", price: 12137 }, { label: "Green / 270cm", price: 12137 }, { label: "Black / 270cm", price: 12137 }, { label: "White / 300cm", price: 13437 }, { label: "Green / 300cm", price: 13437 }, { label: "Black / 300cm", price: 13437 }, { label: "White / 330cm", price: 14198 }, { label: "Green / 330cm", price: 14198 }, { label: "Black / 330cm", price: 14198 }],
    desc: "Velvet over high-density foam, in white or green, from 210cm to 330cm. Large sizes only, for rooms that can take them.",
    features: [
      "Velvet over high-density foam",
      "White or Green",
      "210cm to 330cm",
      "Generous proportions"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "15", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf38", name: "Sectional Sofa Modules", cat: "Living Room", room: "Living Room", price: 10793, memberPrice: 9714, sku: "SH-10242", tag: "New", ph: "", img: "assets/products/sf38.webp",
    imgs: ["assets/products/sf38.webp", "assets/products/sf38-2.webp", "assets/products/sf38-3.webp", "assets/products/sf38-4.webp", "assets/products/sf38-5.webp"],
    sizes: [{ label: "80cm", price: 10793 }, { label: "80cm (A)", price: 10793 }, { label: "120cm", price: 13883 }, { label: "120cm (A)", price: 13883 }, { label: "160cm", price: 16567 }, { label: "160cm (A)", price: 16567 }, { label: "200cm", price: 22733 }, { label: "200cm (A)", price: 22733 }],
    desc: "Buy the modules and build the shape: 80cm, 120cm, 160cm and 200cm pieces in two arrangements. The flexible answer to an awkward room.",
    features: [
      "Modules at 80, 120, 160 and 200cm",
      "Two arrangements of each",
      "Build the shape your room needs",
      "Add pieces later"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf39", name: "Oversized Beige Sofa", cat: "Living Room", room: "Living Room", price: 10965, memberPrice: 9868, sku: "SH-10243", tag: "New", ph: "", img: "assets/products/sf39.webp",
    imgs: ["assets/products/sf39.webp", "assets/products/sf39-2.webp", "assets/products/sf39-3.webp", "assets/products/sf39-4.webp", "assets/products/sf39-5.webp"],
    sizes: [{ label: "Beige / 240cm", price: 10965 }, { label: "Beige / 270cm", price: 11917 }, { label: "Beige / 300cm", price: 12957 }, { label: "Beige / 330cm", price: 13767 }, { label: "Beige / 360cm", price: 15248 }],
    desc: "Beige, and very large: 240cm to 360cm. A sofa for a room where a normal three seater would look lost.",
    features: [
      "Widths from 240cm to 360cm",
      "Beige upholstery",
      "Deep, generous seat",
      "For large open-plan rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "5", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf40", name: "Linen Sofa with Timber Frame", cat: "Living Room", room: "Living Room", price: 11087, memberPrice: 9978, sku: "SH-10244", tag: "New", ph: "", img: "assets/products/sf40.webp",
    imgs: ["assets/products/sf40.webp", "assets/products/sf40-2.webp", "assets/products/sf40-3.webp", "assets/products/sf40-4.webp", "assets/products/sf40-5.webp"],
    sizes: [{ label: "160cm", price: 11087 }, { label: "210cm", price: 14778 }, { label: "260cm", price: 17713 }],
    desc: "Linen over a timber frame with high-density foam, in three sizes. Linen creases, softens and looks better for it.",
    features: [
      "Linen upholstery",
      "Timber frame, high-density foam",
      "160cm, 210cm and 260cm",
      "Softens with use"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Linen", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head and blot spills at once. Linen softens and creases with use, which is part of its character. Keep out of harsh direct sun." },

  { id: "sf41", name: "Bouclé Sofa in Ten Sizes", cat: "Living Room", room: "Living Room", price: 11296, memberPrice: 10166, sku: "SH-10245", tag: "New", ph: "", img: "assets/products/sf41.webp",
    imgs: ["assets/products/sf41.webp", "assets/products/sf41-2.webp", "assets/products/sf41-3.webp", "assets/products/sf41-4.webp", "assets/products/sf41-5.webp"],
    sizes: [{ label: "120cm", price: 11296 }, { label: "180cm", price: 18106 }, { label: "220cm", price: 20741 }, { label: "240cm", price: 22628 }, { label: "260cm", price: 26535 }, { label: "280cm", price: 29424 }, { label: "300cm", price: 30926 }, { label: "330cm", price: 36294 }, { label: "360cm", price: 41556 }, { label: "390cm", price: 42591 }],
    desc: "Bouclé on a timber frame in ten widths from 120cm to 390cm, which is the broadest size range in the range.",
    features: [
      "Bouclé over a timber frame",
      "Ten widths, 120cm to 390cm",
      "High-density foam seating",
      "Fits almost any room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "10", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf42", name: "Large Leather Lounge Sofa", cat: "Living Room", room: "Living Room", price: 11341, memberPrice: 10207, sku: "SH-10246", tag: "New", ph: "", img: "assets/products/sf42.webp",
    imgs: ["assets/products/sf42.webp", "assets/products/sf42-2.webp", "assets/products/sf42-3.webp", "assets/products/sf42-4.webp", "assets/products/sf42-5.webp"],
    sizes: [{ label: "230cm", price: 11341 }, { label: "260cm", price: 14203 }, { label: "290cm", price: 14911 }, { label: "320cm", price: 17249 }],
    desc: "Leather on timber in four large sizes, 230cm to 320cm, for a lounge that seats everyone at once.",
    features: [
      "Leather over a timber frame",
      "230cm to 320cm",
      "Deep lounge seat",
      "Seats a full room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf43", name: "Curved Bouclé Sofa", cat: "Living Room", room: "Living Room", price: 11956, memberPrice: 10760, sku: "SH-10247", tag: "New", ph: "", img: "assets/products/sf43.webp",
    imgs: ["assets/products/sf43.webp", "assets/products/sf43-2.webp", "assets/products/sf43-3.webp", "assets/products/sf43-4.webp", "assets/products/sf43-5.webp"],
    sizes: [{ label: "170cm", price: 11956 }, { label: "210cm", price: 14669 }, { label: "240cm", price: 16663 }],
    desc: "A curved bouclé sofa in three sizes. The combination of curve and texture is what makes it feel expensive.",
    features: [
      "Curved silhouette in bouclé",
      "170cm, 210cm and 240cm",
      "Soft, tactile surface",
      "Works as a room divider in open-plan spaces"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf44", name: "Down-Filled Pull Sofa", cat: "Living Room", room: "Living Room", price: 12670, memberPrice: 11403, sku: "SH-10248", tag: "New", ph: "", img: "assets/products/sf44.webp",
    imgs: ["assets/products/sf44.webp", "assets/products/sf44-2.webp", "assets/products/sf44-3.webp", "assets/products/sf44-4.webp", "assets/products/sf44-5.webp"],
    sizes: [{ label: "125cm (Single Seater)", price: 12670 }, { label: "145cm", price: 13511 }, { label: "175cm", price: 14770 }, { label: "205cm", price: 16459 }, { label: "225cm", price: 20781 }, { label: "265cm", price: 24481 }, { label: "325cm", price: 29315 }, { label: "385cm", price: 32737 }],
    desc: "Down and cotton filling in widths from a 125cm single seater to 385cm. Soft rather than firm, and it shows: these cushions need plumping.",
    features: [
      "Down and cotton filling",
      "125cm single seater to 385cm",
      "Soft, relaxed seat",
      "Needs regular plumping, like all down"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf45", name: "Single-Armrest Chaise Sofa", cat: "Living Room", room: "Living Room", price: 13319, memberPrice: 11987, sku: "SH-10249", tag: "New", ph: "", img: "assets/products/sf45.webp",
    imgs: ["assets/products/sf45.webp", "assets/products/sf45-2.webp", "assets/products/sf45-3.webp", "assets/products/sf45-4.webp", "assets/products/sf45-5.webp"],
    sizes: [{ label: "300cm (Double Armrest)", price: 13319 }, { label: "280cm (Double Armrest)", price: 14030 }, { label: "300cm (Single Armrest)", price: 14674 }, { label: "320cm (Single Armrest)", price: 15337 }, { label: "320cm (Double Armrest)", price: 15337 }, { label: "340cm (Single Armrest)", price: 16048 }, { label: "365cm (Single Armrest)", price: 17356 }, { label: "405cm (Single Armrest)", price: 18874 }],
    desc: "A single-armrest design in leather and linen, from 300cm to 365cm, so one end stays open for stretching out.",
    features: [
      "Single armrest, open at one end",
      "Leather and linen upholstery",
      "300cm to 365cm",
      "Timber frame"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "8", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf46", name: "Four-Colour Fabric Sofa", cat: "Living Room", room: "Living Room", price: 13426, memberPrice: 12083, sku: "SH-10250", tag: "New", ph: "", img: "assets/products/sf46.webp",
    imgs: ["assets/products/sf46.webp", "assets/products/sf46-2.webp", "assets/products/sf46-3.webp", "assets/products/sf46-4.webp", "assets/products/sf46-5.webp"],
    sizes: [{ label: "260cm / Grey", price: 13426 }, { label: "260cm / Light Grey", price: 13426 }, { label: "260cm / Off White", price: 13426 }, { label: "260cm / Emerald Green", price: 13426 }, { label: "280cm / Grey", price: 15167 }, { label: "280cm / Light Grey", price: 15167 }, { label: "280cm / Off White", price: 15167 }, { label: "280cm / Emerald Green", price: 15167 }],
    desc: "Fabric at 260cm or 280cm, in grey, light grey, off white or emerald green. Emerald is the one worth being brave about.",
    features: [
      "Four colourways including emerald green",
      "260cm and 280cm",
      "Hard-wearing fabric",
      "Generous seat depth"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf47", name: "Two-Colour Lounge Sofa", cat: "Living Room", room: "Living Room", price: 13443, memberPrice: 12099, sku: "SH-10251", tag: "New", ph: "", img: "assets/products/sf47.webp",
    imgs: ["assets/products/sf47.webp", "assets/products/sf47-2.webp", "assets/products/sf47-3.webp", "assets/products/sf47-4.webp", "assets/products/sf47-5.webp"],
    sizes: [{ label: "220cm / White", price: 13443 }, { label: "220cm / Green", price: 13443 }, { label: "280cm / White", price: 15141 }, { label: "280cm / Green", price: 15141 }, { label: "320cm / White", price: 16613 }, { label: "320cm / Green", price: 16613 }],
    desc: "White or green, at 220cm, 280cm or 320cm. Large, simple and easy to live with.",
    features: [
      "White or Green",
      "220cm, 280cm and 320cm",
      "Simple contemporary lines",
      "Deep, comfortable seat"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf48", name: "Extended Leather Sofa", cat: "Living Room", room: "Living Room", price: 13889, memberPrice: 12500, sku: "SH-10252", tag: "New", ph: "", img: "assets/products/sf48.webp",
    imgs: ["assets/products/sf48.webp", "assets/products/sf48-2.webp", "assets/products/sf48-3.webp", "assets/products/sf48-4.webp", "assets/products/sf48-5.webp"],
    sizes: [{ label: "190cm", price: 13889 }, { label: "210cm", price: 14972 }, { label: "230cm", price: 16944 }, { label: "260cm", price: 18628 }, { label: "290cm", price: 19898 }, { label: "320cm", price: 22294 }, { label: "330cm", price: 23128 }, { label: "370cm", price: 24906 }, { label: "410cm", price: 26667 }],
    desc: "Leather on a timber frame in nine widths, 190cm all the way to 410cm. The longest sofa in the range.",
    features: [
      "Leather over a timber frame",
      "Nine widths, 190cm to 410cm",
      "High-density foam",
      "Suits very large rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "9", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf49", name: "Three-Colour Statement Sofa", cat: "Living Room", room: "Living Room", price: 14126, memberPrice: 12713, sku: "SH-10253", tag: "New", ph: "", img: "assets/products/sf49.webp",
    imgs: ["assets/products/sf49.webp", "assets/products/sf49-2.webp", "assets/products/sf49-3.webp", "assets/products/sf49-4.webp", "assets/products/sf49-5.webp"],
    sizes: [{ label: "Ivory / 280cm", price: 14126 }, { label: "Red / 280cm", price: 14126 }, { label: "Green / 280cm", price: 14126 }, { label: "Ivory / 320cm", price: 16180 }, { label: "Red / 320cm", price: 16180 }, { label: "Green / 320cm", price: 16180 }, { label: "Ivory / 350cm", price: 18233 }, { label: "Red / 350cm", price: 18233 }, { label: "Green / 350cm", price: 18233 }],
    desc: "Ivory, red or green, at 280cm to 350cm. Red is rarely offered at this size, and it transforms a room.",
    features: [
      "Ivory, Red or Green",
      "280cm, 320cm and 350cm",
      "Statement colour at scale",
      "Deep lounge seating"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "9", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf50", name: "Curved Sofa in Three Colours", cat: "Living Room", room: "Living Room", price: 14689, memberPrice: 13220, sku: "SH-10254", tag: "New", ph: "", img: "assets/products/sf50.webp",
    imgs: ["assets/products/sf50.webp", "assets/products/sf50-2.webp", "assets/products/sf50-3.webp", "assets/products/sf50-4.webp", "assets/products/sf50-5.webp"],
    sizes: [{ label: "Charcoal Grey / 200cm", price: 14689 }, { label: "Beige / 200cm", price: 14689 }, { label: "Peach / 200cm", price: 14689 }, { label: "Charcoal Grey / 300cm", price: 15850 }, { label: "Beige / 300cm", price: 15850 }, { label: "Peach / 300cm", price: 15850 }],
    desc: "A curved sofa in charcoal grey, beige or peach, at 200cm or 300cm. Peach is softer in a room than it sounds on paper.",
    features: [
      "Curved silhouette",
      "Charcoal Grey, Beige or Peach",
      "200cm or 300cm",
      "Softens a hard-edged room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf51", name: "Lambswool Sofa", cat: "Living Room", room: "Living Room", price: 15148, memberPrice: 13633, sku: "SH-10255", tag: "New", ph: "", img: "assets/products/sf51.webp",
    imgs: ["assets/products/sf51.webp", "assets/products/sf51-2.webp", "assets/products/sf51-3.webp", "assets/products/sf51-4.webp", "assets/products/sf51-5.webp"],
    sizes: [{ label: "180cm", price: 15148 }, { label: "210cm", price: 17926 }, { label: "260cm", price: 22426 }, { label: "280cm", price: 24050 }],
    desc: "Lambswool on a timber frame, in four sizes. Warm underhand in a way that flat-weave fabric never is.",
    features: [
      "Lambswool upholstery",
      "Timber frame, high-density foam",
      "180cm, 210cm, 260cm and 280cm",
      "Warm, soft texture"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf52", name: "Two-Tone Wide Sofa", cat: "Living Room", room: "Living Room", price: 15294, memberPrice: 13765, sku: "SH-10256", tag: "New", ph: "", img: "assets/products/sf52.webp",
    imgs: ["assets/products/sf52.webp", "assets/products/sf52-2.webp", "assets/products/sf52-3.webp", "assets/products/sf52-4.webp", "assets/products/sf52-5.webp"],
    sizes: [{ label: "240cm / Blue", price: 15294 }, { label: "240cm / Beige", price: 15294 }, { label: "260cm / Blue", price: 16554 }, { label: "260cm / Beige", price: 16554 }],
    desc: "Blue or beige at 240cm and 260cm. Wide, low and straightforward.",
    features: [
      "Blue or Beige",
      "240cm and 260cm",
      "Wide, low proportions",
      "Everyday upholstery"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf53", name: "Configurable Leather Sofa", cat: "Living Room", room: "Living Room", price: 15833, memberPrice: 14250, sku: "SH-10257", tag: "New", ph: "", img: "assets/products/sf53.webp",
    imgs: ["assets/products/sf53.webp", "assets/products/sf53-2.webp", "assets/products/sf53-3.webp", "assets/products/sf53-4.webp", "assets/products/sf53-5.webp"],
    sizes: [{ label: "A / Brown", price: 15833 }, { label: "A / Light Grey", price: 15833 }, { label: "A / Charcoal Grey", price: 15833 }, { label: "B / Brown", price: 23333 }, { label: "B / Light Grey", price: 23333 }, { label: "B / Charcoal Grey", price: 23333 }, { label: "C1 / Brown", price: 29444 }, { label: "C2 / Brown", price: 29444 }, { label: "C1 / Light Grey", price: 29444 }, { label: "C1 / Charcoal Grey", price: 29444 }, { label: "C2 / Light Grey", price: 29444 }, { label: "C2 / Charcoal Grey", price: 29444 }, { label: "D1 / Brown", price: 35185 }, { label: "D1 / Light Grey", price: 35185 }, { label: "D2 / Brown", price: 35185 }, { label: "D1 / Charcoal Grey", price: 35185 }, { label: "D2 / Light Grey", price: 35185 }, { label: "D2 / Charcoal Grey", price: 35185 }],
    desc: "Leather in three configurations, A, B and C, across brown, light grey and charcoal. Pick the layout, then the colour.",
    features: [
      "Three configurations: A, B and C",
      "Brown, Light Grey or Charcoal Grey",
      "Genuine leather",
      "Choose layout and colour separately"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "18", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf54", name: "Velvet Sofa, White or Green", cat: "Living Room", room: "Living Room", price: 16093, memberPrice: 14484, sku: "SH-10258", tag: "New", ph: "", img: "assets/products/sf54.webp",
    imgs: ["assets/products/sf54.webp", "assets/products/sf54-2.webp", "assets/products/sf54-3.webp", "assets/products/sf54-4.webp", "assets/products/sf54-5.webp"],
    sizes: [{ label: "180cm / White", price: 16093 }, { label: "180cm / Green", price: 16093 }, { label: "180cm / Pink", price: 16093 }, { label: "230cm / Pink", price: 16093 }, { label: "260cm / Pink", price: 16093 }, { label: "290cm / Pink", price: 16093 }, { label: "230cm / White", price: 17944 }, { label: "230cm / Green", price: 17944 }, { label: "260cm / White", price: 19796 }, { label: "260cm / Green", price: 19796 }, { label: "290cm / White", price: 21648 }, { label: "290cm / Green", price: 21648 }],
    desc: "Velvet at 180cm, 230cm or 260cm, in white or green. Velvet at a size that suits an ordinary room rather than a ballroom.",
    features: [
      "Velvet upholstery",
      "White or Green",
      "180cm, 230cm and 260cm",
      "Suits normal-sized living rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "12", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf55", name: "Curved Fabric Sofa", cat: "Living Room", room: "Living Room", price: 16111, memberPrice: 14500, sku: "SH-10259", tag: "New", ph: "", img: "assets/products/sf55.webp",
    imgs: ["assets/products/sf55.webp", "assets/products/sf55-2.webp", "assets/products/sf55-3.webp", "assets/products/sf55-4.webp", "assets/products/sf55-5.webp"],
    sizes: [{ label: "180cm", price: 16111 }, { label: "210cm", price: 17389 }, { label: "240cm", price: 19069 }],
    desc: "A curved fabric sofa on a timber frame with high-density foam, in three sizes.",
    features: [
      "Curved shape in fabric",
      "Timber frame, high-density foam",
      "180cm, 210cm and 240cm",
      "Softens a square room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf56", name: "Oversized Bouclé Sofa", cat: "Living Room", room: "Living Room", price: 16296, memberPrice: 14666, sku: "SH-10260", tag: "New", ph: "", img: "assets/products/sf56.webp",
    imgs: ["assets/products/sf56.webp", "assets/products/sf56-2.webp", "assets/products/sf56-3.webp", "assets/products/sf56-4.webp", "assets/products/sf56-5.webp"],
    sizes: [{ label: "Navy Blue / 280cm", price: 16296 }, { label: "Snow Beige / 280cm", price: 16296 }, { label: "Navy Blue / 310cm", price: 18278 }, { label: "Snow Beige / 310cm", price: 18278 }, { label: "Navy Blue / 420cm", price: 19611 }, { label: "Snow Beige / 420cm", price: 19611 }],
    desc: "Bouclé in navy blue or snow beige, at 280cm, 310cm or 420cm. Very large, very soft.",
    features: [
      "Bouclé upholstery",
      "Navy Blue or Snow Beige",
      "280cm, 310cm and 420cm",
      "Oversized proportions"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf57", name: "Feather-Filled Sofa in Four Colours", cat: "Living Room", room: "Living Room", price: 20081, memberPrice: 18073, sku: "SH-10261", tag: "New", ph: "", img: "assets/products/sf57.webp",
    imgs: ["assets/products/sf57.webp", "assets/products/sf57-2.webp", "assets/products/sf57-3.webp", "assets/products/sf57-4.webp", "assets/products/sf57-5.webp"],
    sizes: [{ label: "Grey / 280cm", price: 20081 }, { label: "Blue / 280cm", price: 20081 }, { label: "Tan / 280cm", price: 20081 }, { label: "Chocolate / 280cm", price: 20081 }, { label: "Grey / 300cm", price: 20802 }, { label: "Blue / 300cm", price: 20802 }, { label: "Tan / 300cm", price: 20802 }, { label: "Chocolate / 300cm", price: 20802 }, { label: "Grey / 330cm", price: 25304 }, { label: "Blue / 330cm", price: 25304 }, { label: "Tan / 330cm", price: 25304 }, { label: "Chocolate / 330cm", price: 25304 }],
    desc: "Feather and down filling in grey, blue, tan or chocolate, from 280cm to 330cm. The softest seat in the range.",
    features: [
      "Feather and down filling",
      "Grey, Blue, Tan or Chocolate",
      "280cm to 330cm",
      "Very soft, sink-in seat"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "12", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf58", name: "Rounded Velvet Sofa", cat: "Living Room", room: "Living Room", price: 22124, memberPrice: 19912, sku: "SH-10262", tag: "New", ph: "", img: "assets/products/sf58.webp",
    imgs: ["assets/products/sf58.webp", "assets/products/sf58-2.webp", "assets/products/sf58-3.webp", "assets/products/sf58-4.webp", "assets/products/sf58-5.webp"],
    sizes: [{ label: "Chocolate / 180cm", price: 22124 }, { label: "Mocha / 180cm", price: 22124 }, { label: "Grey / 180cm", price: 22124 }, { label: "Chocolate / 200cm", price: 22759 }, { label: "Mocha / 200cm", price: 22759 }, { label: "Grey / 200cm", price: 22759 }],
    desc: "Velvet in chocolate, mocha or grey, at 180cm or 200cm, with softly rounded arms and back.",
    features: [
      "Velvet over a timber frame",
      "Chocolate, Mocha or Grey",
      "180cm or 200cm",
      "Softly rounded arms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf59", name: "Extra-Large Lounge Sofa", cat: "Living Room", room: "Living Room", price: 22309, memberPrice: 20078, sku: "SH-10263", tag: "New", ph: "", img: "assets/products/sf59.webp",
    imgs: ["assets/products/sf59.webp", "assets/products/sf59-2.webp", "assets/products/sf59-3.webp", "assets/products/sf59-4.webp", "assets/products/sf59-5.webp"],
    sizes: [{ label: "320cm x 245cm", price: 22309 }, { label: "370cm x 245m", price: 24796 }, { label: "420cm x 245cm", price: 29056 }],
    desc: "320, 370 or 420cm across and 245cm deep. This is a sofa for a room you could park a car in, and it will swallow a family whole.",
    features: [
      "Up to 420cm x 245cm",
      "Three enormous sizes",
      "Deep enough to lie across",
      "For very large open-plan rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf60", name: "Long Leather Sofa", cat: "Living Room", room: "Living Room", price: 23704, memberPrice: 21334, sku: "SH-10264", tag: "New", ph: "", img: "assets/products/sf60.webp",
    imgs: ["assets/products/sf60.webp", "assets/products/sf60-2.webp", "assets/products/sf60-3.webp", "assets/products/sf60-4.webp", "assets/products/sf60-5.webp"],
    sizes: [{ label: "260cm", price: 23704 }, { label: "280cm", price: 25457 }, { label: "300cm", price: 27157 }, { label: "320cm", price: 29291 }, { label: "335cm", price: 30535 }, { label: "345cm", price: 31380 }, { label: "360cm", price: 32574 }],
    desc: "Leather on a timber frame in seven lengths from 260cm to 360cm, all of them long.",
    features: [
      "Leather over a timber frame",
      "Seven lengths, 260cm to 360cm",
      "High-density foam",
      "Built for a long wall"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "7", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "ct01", name: "Glass Coffee & Side Table Set", cat: "Living Room", room: "Living Room", price: 2065, memberPrice: 1858, sku: "SH-10265", tag: "New", ph: "", img: "assets/products/ct01.webp",
    imgs: ["assets/products/ct01.webp", "assets/products/ct01-2.webp", "assets/products/ct01-3.webp", "assets/products/ct01-4.webp", "assets/products/ct01-5.webp"],
    sizes: [{ label: "Small", price: 2065 }, { label: "Large", price: 2106 }, { label: "Set", price: 4170 }],
    desc: "Glass in a small and large size, bought separately or as the pair. Glass keeps a room feeling open, which matters when the sofa is already substantial.",
    features: [
      "Small and large sizes, or the set",
      "Keeps sightlines open in a small room",
      "Wipe-clean glass surface"
    ],
    specs: { "Type": "Coffee table", "Material": "Glass", "Options": "3", "Room": "Living / Indoor" },
    care: "Clean with a soft cloth and a mild glass cleaner. Lift rather than drag when moving, and avoid knocking the edges, which is where glass chips." },

  { id: "ct02", name: "Round Travertine Coffee & Side Table", cat: "Living Room", room: "Living Room", price: 2630, memberPrice: 2367, sku: "SH-10266", tag: "New", ph: "", img: "assets/products/ct02.webp",
    imgs: ["assets/products/ct02.webp", "assets/products/ct02-2.webp", "assets/products/ct02-3.webp", "assets/products/ct02-4.webp", "assets/products/ct02-5.webp"],
    sizes: [{ label: "Black / 50cm (Side table)", price: 2630 }, { label: "Walnut / 50cm (Side table)", price: 2630 }, { label: "Black / 70cm", price: 4435 }, { label: "Walnut / 70cm", price: 4435 }, { label: "Black / 80cm", price: 5013 }, { label: "Walnut / 80cm", price: 5013 }, { label: "Black / 90cm", price: 5546 }, { label: "Walnut / 90cm", price: 5546 }],
    desc: "Travertine in black or white, from a 50cm side table to a 90cm coffee table. The stone's open grain gives a plain round shape something to look at.",
    features: [
      "Natural travertine with open grain",
      "Black or White",
      "50cm side table through to 90cm coffee table"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "8", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct03", name: "Three-Size Round Coffee Table", cat: "Living Room", room: "Living Room", price: 2654, memberPrice: 2389, sku: "SH-10267", tag: "New", ph: "", img: "assets/products/ct03.webp",
    imgs: ["assets/products/ct03.webp", "assets/products/ct03-2.webp", "assets/products/ct03-3.webp", "assets/products/ct03-4.webp", "assets/products/ct03-5.webp"],
    sizes: [{ label: "45cm", price: 2654 }, { label: "90cm", price: 5504 }, { label: "100cm", price: 5874 }],
    desc: "One shape in three sizes, 45cm, 90cm and 100cm, so it works as a side table, a centrepiece, or both together.",
    features: [
      "45cm, 90cm and 100cm",
      "Use singly or grouped",
      "Simple round silhouette"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct04", name: "Round Timber Coffee & Side Table", cat: "Living Room", room: "Living Room", price: 2769, memberPrice: 2492, sku: "SH-10268", tag: "New", ph: "", img: "assets/products/ct04.webp",
    imgs: ["assets/products/ct04.webp", "assets/products/ct04-2.webp", "assets/products/ct04-3.webp", "assets/products/ct04-4.webp", "assets/products/ct04-5.webp"],
    sizes: [{ label: "Side Table", price: 2769 }, { label: "Coffee Table", price: 4254 }],
    desc: "Solid timber in two heights, the lower as a coffee table and the taller as a side table beside a chair.",
    features: [
      "Solid timber construction",
      "Coffee table and side table heights",
      "Warm natural grain"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct05", name: "Round Oak Coffee Table & Nest", cat: "Living Room", room: "Living Room", price: 2785, memberPrice: 2506, sku: "SH-10269", tag: "New", ph: "", img: "assets/products/ct05.webp",
    imgs: ["assets/products/ct05.webp", "assets/products/ct05-2.webp", "assets/products/ct05-3.webp", "assets/products/ct05-4.webp", "assets/products/ct05-5.webp"],
    sizes: [{ label: "50cm", price: 2785 }, { label: "90cm", price: 5274 }, { label: "Complete Set", price: 8059 }],
    desc: "Oak at 90cm and 50cm, sold apart or as a set that nests together when the floor is needed.",
    features: [
      "Solid oak",
      "90cm and 50cm, or the complete set",
      "Nests together to save space"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct06", name: "Colour-Choice Coffee Table", cat: "Living Room", room: "Living Room", price: 2946, memberPrice: 2651, sku: "SH-10270", tag: "New", ph: "", img: "assets/products/ct06.webp",
    imgs: ["assets/products/ct06.webp", "assets/products/ct06-2.webp", "assets/products/ct06-3.webp", "assets/products/ct06-4.webp", "assets/products/ct06-5.webp"],
    sizes: [{ label: "Side Table / Green", price: 2946 }, { label: "Side Table / Black", price: 2946 }, { label: "Side Table / White", price: 2946 }, { label: "Side Table / Beige", price: 2946 }, { label: "Small / Green", price: 3996 }, { label: "Small / Black", price: 3996 }, { label: "Small / White", price: 3996 }, { label: "Small / Beige", price: 3996 }, { label: "Large / Green", price: 5013 }, { label: "Large / Black", price: 5013 }, { label: "Large / White", price: 5013 }, { label: "Large / Beige", price: 5013 }],
    desc: "Green, black, white or beige, in small or large. Most coffee tables come in one neutral; this one lets you pick a colour and commit.",
    features: [
      "Green, Black, White or Beige",
      "Small and large sizes",
      "A colour-led centrepiece"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "12", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct07", name: "Tinted Glass Coffee Table", cat: "Living Room", room: "Living Room", price: 3120, memberPrice: 2808, sku: "SH-10271", tag: "New", ph: "", img: "assets/products/ct07.webp",
    imgs: ["assets/products/ct07.webp", "assets/products/ct07-2.webp", "assets/products/ct07-3.webp", "assets/products/ct07-4.webp"],
    sizes: [{ label: "Black", price: 3120 }, { label: "Chocolate", price: 3120 }],
    desc: "Tinted glass in black or chocolate, which reads far richer than clear glass and hides fingerprints better too.",
    features: [
      "Tinted glass top",
      "Black or Chocolate",
      "Less prone to showing marks than clear glass"
    ],
    specs: { "Type": "Coffee table", "Material": "Glass", "Options": "2", "Room": "Living / Indoor" },
    care: "Clean with a soft cloth and a mild glass cleaner. Lift rather than drag when moving, and avoid knocking the edges, which is where glass chips." },

  { id: "ct08", name: "Marble & Glass Rectangular Coffee Table", cat: "Living Room", room: "Living Room", price: 3311, memberPrice: 2980, sku: "SH-10272", tag: "New", ph: "", img: "assets/products/ct08.webp",
    imgs: ["assets/products/ct08.webp", "assets/products/ct08-2.webp", "assets/products/ct08-3.webp", "assets/products/ct08-4.webp", "assets/products/ct08-5.webp"],
    sizes: [{ label: "30cm (Side Table)", price: 3311 }, { label: "130cm", price: 8541 }, { label: "140cm", price: 9011 }],
    desc: "Marble paired with glass across 130cm and 140cm, with a 30cm side table in the same language.",
    features: [
      "Marble and glass construction",
      "130cm and 140cm",
      "Matching 30cm side table"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct09", name: "Oak Coffee Table Pair", cat: "Living Room", room: "Living Room", price: 3804, memberPrice: 3424, sku: "SH-10273", tag: "New", ph: "", img: "assets/products/ct09.webp",
    imgs: ["assets/products/ct09.webp", "assets/products/ct09-2.webp", "assets/products/ct09-3.webp", "assets/products/ct09-4.webp", "assets/products/ct09-5.webp"],
    sizes: [{ label: "50cm", price: 3804 }, { label: "80cm", price: 6107 }],
    desc: "Two oak tables at 80cm and 50cm, which can sit side by side or in different corners of the same room.",
    features: [
      "Solid oak",
      "80cm and 50cm",
      "Use together or apart"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct10", name: "Marble Nesting Coffee Tables", cat: "Living Room", room: "Living Room", price: 4259, memberPrice: 3833, sku: "SH-10274", tag: "New", ph: "", img: "assets/products/ct10.webp",
    imgs: ["assets/products/ct10.webp", "assets/products/ct10-2.webp", "assets/products/ct10-3.webp", "assets/products/ct10-4.webp", "assets/products/ct10-5.webp"],
    sizes: [{ label: "Table A", price: 4259 }, { label: "Table B", price: 4259 }, { label: "Table C", price: 6296 }, { label: "Complete Set", price: 14815 }],
    desc: "Three marble tables, A, B and C, bought singly or as a complete set that nests into one footprint.",
    features: [
      "Three table designs",
      "Buy singly or as the set",
      "Nests to one footprint"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "4", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct11", name: "Stainless Steel Coffee Table Set", cat: "Living Room", room: "Living Room", price: 4426, memberPrice: 3983, sku: "SH-10275", tag: "New", ph: "", img: "assets/products/ct11.webp",
    imgs: ["assets/products/ct11.webp", "assets/products/ct11-2.webp", "assets/products/ct11-3.webp", "assets/products/ct11-4.webp", "assets/products/ct11-5.webp"],
    sizes: [{ label: "80cm Set", price: 4426 }, { label: "90cm Set", price: 4611 }, { label: "100cm Set", price: 4796 }],
    desc: "Stainless steel sets at 80cm, 90cm and 100cm, with the mirror finish that lifts a dark room.",
    features: [
      "Stainless steel with a mirror finish",
      "80cm, 90cm and 100cm sets",
      "Reflects light into darker rooms"
    ],
    specs: { "Type": "Coffee table", "Material": "Steel / metal", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "ct12", name: "Square Glass Coffee Table", cat: "Living Room", room: "Living Room", price: 4485, memberPrice: 4036, sku: "SH-10276", tag: "New", ph: "", img: "assets/products/ct12.webp",
    imgs: ["assets/products/ct12.webp", "assets/products/ct12-2.webp", "assets/products/ct12-3.webp", "assets/products/ct12-4.webp", "assets/products/ct12-5.webp"],
    sizes: [{ label: "Black / 80cm", price: 4485 }, { label: "White / 80cm", price: 4485 }, { label: "Black / 100cm", price: 4937 }, { label: "White / 100cm", price: 4937 }, { label: "Black / 120cm", price: 5319 }, { label: "White / 120cm", price: 5319 }],
    desc: "A square glass table in black or white at 80cm, 100cm or 120cm. Square suits a square sofa arrangement better than a round table does.",
    features: [
      "Square glass top",
      "Black or White",
      "80cm, 100cm and 120cm"
    ],
    specs: { "Type": "Coffee table", "Material": "Glass", "Options": "6", "Room": "Living / Indoor" },
    care: "Clean with a soft cloth and a mild glass cleaner. Lift rather than drag when moving, and avoid knocking the edges, which is where glass chips." },

  { id: "ct13", name: "Stone & Steel Coffee Table", cat: "Living Room", room: "Living Room", price: 4565, memberPrice: 4108, sku: "SH-10277", tag: "New", ph: "", img: "assets/products/ct13.webp",
    imgs: ["assets/products/ct13.webp", "assets/products/ct13-2.webp", "assets/products/ct13-3.webp", "assets/products/ct13-4.webp", "assets/products/ct13-5.webp"],
    sizes: [{ label: "Black", price: 4565 }, { label: "Gold", price: 4565 }],
    desc: "Stone on stainless steel, in black or gold. The weight sits in the top, the lightness in the base.",
    features: [
      "Stone top on a stainless steel base",
      "Black or Gold",
      "Heavy top, light base"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct14", name: "Two-Piece Coffee Table Set", cat: "Living Room", room: "Living Room", price: 4628, memberPrice: 4165, sku: "SH-10278", tag: "New", ph: "", img: "assets/products/ct14.webp",
    imgs: ["assets/products/ct14.webp", "assets/products/ct14-2.webp", "assets/products/ct14-3.webp", "assets/products/ct14-4.webp", "assets/products/ct14-5.webp"],
    sizes: [{ label: "100cm", price: 4628 }, { label: "120cm", price: 5035 }, { label: "130cm", price: 5554 }],
    desc: "A set in 100cm, 120cm or 130cm, designed to sit together or be split across the room.",
    features: [
      "Two pieces per set",
      "100cm, 120cm and 130cm",
      "Use nested or apart"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct15", name: "Round Timber Coffee Table", cat: "Living Room", room: "Living Room", price: 4735, memberPrice: 4262, sku: "SH-10279", tag: "New", ph: "", img: "assets/products/ct15.webp",
    imgs: ["assets/products/ct15.webp", "assets/products/ct15-2.webp", "assets/products/ct15-3.webp", "assets/products/ct15-4.webp", "assets/products/ct15-5.webp"],
    desc: "A single round timber table with nothing to decide: one size, one finish, good grain.",
    features: [
      "Solid timber, round top",
      "One considered size",
      "Natural grain finish"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct16", name: "Solid Timber Coffee Table (95cm)", cat: "Living Room", room: "Living Room", price: 4920, memberPrice: 4428, sku: "SH-10280", tag: "New", ph: "", img: "assets/products/ct16.webp",
    imgs: ["assets/products/ct16.webp", "assets/products/ct16-2.webp", "assets/products/ct16-3.webp", "assets/products/ct16-4.webp", "assets/products/ct16-5.webp"],
    sizes: [{ label: "95cm", price: 4920 }],
    desc: "95cm of solid timber, substantial enough to anchor a three seater without crowding it.",
    features: [
      "Solid timber",
      "95cm diameter",
      "Substantial without crowding"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct17", name: "Nesting Travertine Coffee Tables", cat: "Living Room", room: "Living Room", price: 5120, memberPrice: 4608, sku: "SH-10281", tag: "New", ph: "", img: "assets/products/ct17.webp",
    imgs: ["assets/products/ct17.webp", "assets/products/ct17-2.webp", "assets/products/ct17-3.webp", "assets/products/ct17-4.webp", "assets/products/ct17-5.webp"],
    sizes: [{ label: "90cm", price: 5120 }, { label: "110cm", price: 5550 }],
    desc: "Travertine on timber at 90cm and 110cm, made to nest. Two tables when you entertain, one when you don't.",
    features: [
      "Travertine tops on timber",
      "90cm and 110cm",
      "Nest together when not in use"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct18", name: "Round Stone & Glass Coffee Table", cat: "Living Room", room: "Living Room", price: 5139, memberPrice: 4625, sku: "SH-10282", tag: "New", ph: "", img: "assets/products/ct18.webp",
    imgs: ["assets/products/ct18.webp", "assets/products/ct18-2.webp", "assets/products/ct18-3.webp", "assets/products/ct18-4.webp"],
    sizes: [{ label: "80cm ø", price: 5139 }, { label: "90cm ø", price: 5324 }, { label: "100cm ø", price: 5509 }],
    desc: "Stone and glass together in three diameters, 80, 90 and 100cm.",
    features: [
      "Stone and glass construction",
      "80cm, 90cm and 100cm diameters",
      "Round, soft-edged shape"
    ],
    specs: { "Type": "Coffee table", "Material": "Glass", "Options": "3", "Room": "Living / Indoor" },
    care: "Clean with a soft cloth and a mild glass cleaner. Lift rather than drag when moving, and avoid knocking the edges, which is where glass chips." },

  { id: "ct19", name: "Steel Coffee Table Set, Gold or Black", cat: "Living Room", room: "Living Room", price: 5337, memberPrice: 4803, sku: "SH-10283", tag: "New", ph: "", img: "assets/products/ct19.webp",
    imgs: ["assets/products/ct19.webp", "assets/products/ct19-2.webp", "assets/products/ct19-3.webp", "assets/products/ct19-4.webp", "assets/products/ct19-5.webp"],
    sizes: [{ label: "Gold Set", price: 5337 }, { label: "Black Set", price: 5337 }],
    desc: "A steel set in gold or black. Gold warms a neutral room; black disappears into one.",
    features: [
      "Steel construction",
      "Gold or Black set",
      "Two tables per set"
    ],
    specs: { "Type": "Coffee table", "Material": "Steel / metal", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "ct20", name: "Complete Coffee Table Set", cat: "Living Room", room: "Living Room", price: 5348, memberPrice: 4813, sku: "SH-10284", tag: "New", ph: "", img: "assets/products/ct20.webp",
    imgs: ["assets/products/ct20.webp", "assets/products/ct20-2.webp", "assets/products/ct20-3.webp", "assets/products/ct20-4.webp", "assets/products/ct20-5.webp"],
    sizes: [{ label: "Complete Set", price: 5348 }],
    desc: "A full set bought in one go, so the tables match each other properly rather than nearly.",
    features: [
      "Complete matching set",
      "Pieces designed together",
      "One purchase, finished look"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct21", name: "Marble & Timber Coffee Table", cat: "Living Room", room: "Living Room", price: 5407, memberPrice: 4866, sku: "SH-10285", tag: "New", ph: "", img: "assets/products/ct21.webp",
    imgs: ["assets/products/ct21.webp", "assets/products/ct21-2.webp", "assets/products/ct21-3.webp", "assets/products/ct21-4.webp", "assets/products/ct21-5.webp"],
    sizes: [{ label: "White / 100cm", price: 5407 }, { label: "Grey / 100cm", price: 5407 }, { label: "Black / 100cm", price: 5407 }, { label: "White / 110cm", price: 6106 }, { label: "Grey / 110cm", price: 6106 }, { label: "Black / 110cm", price: 6106 }, { label: "White / 120cm", price: 6296 }, { label: "Grey / 120cm", price: 6296 }, { label: "Black / 120cm", price: 6296 }],
    desc: "Marble over timber in white or grey, at 100cm, 110cm or 120cm. The timber keeps the marble from feeling cold.",
    features: [
      "Marble top on a timber base",
      "White or Grey",
      "100cm, 110cm and 120cm"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "9", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct22", name: "Travertine Round Coffee Table", cat: "Living Room", room: "Living Room", price: 5531, memberPrice: 4978, sku: "SH-10286", tag: "New", ph: "", img: "assets/products/ct22.webp",
    imgs: ["assets/products/ct22.webp", "assets/products/ct22-2.webp", "assets/products/ct22-3.webp", "assets/products/ct22-4.webp", "assets/products/ct22-5.webp"],
    sizes: [{ label: "70cm", price: 5531 }, { label: "80cm", price: 6231 }, { label: "90cm", price: 6809 }],
    desc: "Solid travertine in three diameters, 70, 80 and 90cm. One block of stone, no veneer.",
    features: [
      "Solid travertine",
      "70cm, 80cm and 90cm",
      "Honest single-material construction"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct23", name: "Marble, Steel & Glass Coffee Table Set", cat: "Living Room", room: "Living Room", price: 6046, memberPrice: 5441, sku: "SH-10287", tag: "New", ph: "", img: "assets/products/ct23.webp",
    imgs: ["assets/products/ct23.webp", "assets/products/ct23-2.webp", "assets/products/ct23-3.webp", "assets/products/ct23-4.webp", "assets/products/ct23-5.webp"],
    sizes: [{ label: "90cm Set", price: 6046 }, { label: "100cm Set", price: 6480 }, { label: "120cm Set", price: 6809 }],
    desc: "Three materials in one set, at 90cm, 100cm or 120cm. Busier than most, and striking for it.",
    features: [
      "Marble, steel and glass",
      "90cm, 100cm and 120cm sets",
      "Layered materials"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct24", name: "Slate & Metal Coffee Table Set", cat: "Living Room", room: "Living Room", price: 6157, memberPrice: 5541, sku: "SH-10288", tag: "New", ph: "", img: "assets/products/ct24.webp",
    imgs: ["assets/products/ct24.webp", "assets/products/ct24-2.webp", "assets/products/ct24-3.webp", "assets/products/ct24-4.webp", "assets/products/ct24-5.webp"],
    sizes: [{ label: "Gold Set", price: 6157 }, { label: "Black Set", price: 6157 }],
    desc: "Slate tops on metal, in gold or black. Slate is darker and more matte than marble, and hides a wine ring better.",
    features: [
      "Slate tops on metal bases",
      "Gold or Black set",
      "Matte surface, forgiving in use"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct25", name: "Bronze or Silver Coffee Table Set", cat: "Living Room", room: "Living Room", price: 6478, memberPrice: 5830, sku: "SH-10289", tag: "New", ph: "", img: "assets/products/ct25.webp",
    imgs: ["assets/products/ct25.webp", "assets/products/ct25-2.webp", "assets/products/ct25-3.webp", "assets/products/ct25-4.webp", "assets/products/ct25-5.webp"],
    sizes: [{ label: "Bronze Set", price: 6478 }, { label: "Silver Set", price: 6478 }],
    desc: "A metal set in bronze or silver, for a room that can carry a metallic centrepiece.",
    features: [
      "Bronze or Silver finish",
      "Set of tables",
      "Metallic statement piece"
    ],
    specs: { "Type": "Coffee table", "Material": "Steel / metal", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "ct26", name: "Marble-Top Coffee Table with Metal Base", cat: "Living Room", room: "Living Room", price: 6607, memberPrice: 5946, sku: "SH-10290", tag: "New", ph: "", img: "assets/products/ct26.webp",
    imgs: ["assets/products/ct26.webp", "assets/products/ct26-2.webp", "assets/products/ct26-3.webp", "assets/products/ct26-4.webp", "assets/products/ct26-5.webp"],
    sizes: [{ label: "120cm (table only) / Black", price: 6607 }, { label: "120cm (table only) / Gold", price: 6607 }, { label: "130cm (table only) / Black", price: 6769 }, { label: "130cm (table only) / Gold", price: 6769 }, { label: "140cm (table only) / Black", price: 7091 }, { label: "140cm (table only) / Gold", price: 7091 }, { label: "120cm (complete set) / Black", price: 7572 }, { label: "120cm (complete set) / Gold", price: 7572 }, { label: "130cm (complete set) / Black", price: 7733 }, { label: "130cm (complete set) / Gold", price: 7733 }, { label: "140cm (complete set) / Black", price: 8056 }, { label: "140cm (complete set) / Gold", price: 8056 }],
    desc: "Marble at 120cm or 130cm on a black or gold metal base, with the option of the table alone or the full set.",
    features: [
      "Marble top, metal base",
      "Black or Gold base",
      "120cm and 130cm, table only or set"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "12", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct27", name: "Rotating Walnut & Marble Coffee Table", cat: "Living Room", room: "Living Room", price: 6809, memberPrice: 6128, sku: "SH-10291", tag: "New", ph: "", img: "assets/products/ct27.webp",
    imgs: ["assets/products/ct27.webp", "assets/products/ct27-2.webp", "assets/products/ct27-3.webp", "assets/products/ct27-4.webp", "assets/products/ct27-5.webp"],
    sizes: [{ label: "Walnut", price: 6809 }],
    desc: "A square walnut table with a rotating marble section, so the surface turns toward whoever needs it.",
    features: [
      "Rotating marble section",
      "Walnut frame",
      "Square format"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct28", name: "Metal Coffee Table, Silver or Black", cat: "Living Room", room: "Living Room", price: 6830, memberPrice: 6147, sku: "SH-10292", tag: "New", ph: "", img: "assets/products/ct28.webp",
    imgs: ["assets/products/ct28.webp", "assets/products/ct28-2.webp", "assets/products/ct28-3.webp", "assets/products/ct28-4.webp", "assets/products/ct28-5.webp"],
    sizes: [{ label: "Silver / 100cm", price: 6830 }, { label: "Black / 100cm", price: 6830 }, { label: "Silver / 130cm", price: 7263 }, { label: "Black / 130cm", price: 7263 }],
    desc: "Metal at 100cm or 130cm, in silver or black, with a slim profile that suits a smaller room.",
    features: [
      "Metal construction",
      "Silver or Black",
      "100cm and 130cm"
    ],
    specs: { "Type": "Coffee table", "Material": "Steel / metal", "Options": "4", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "ct29", name: "Marble & Ash Coffee Table", cat: "Living Room", room: "Living Room", price: 6943, memberPrice: 6249, sku: "SH-10293", tag: "New", ph: "", img: "assets/products/ct29.webp",
    imgs: ["assets/products/ct29.webp", "assets/products/ct29-2.webp", "assets/products/ct29-3.webp", "assets/products/ct29-4.webp", "assets/products/ct29-5.webp"],
    desc: "Marble over ash timber: pale stone, pale wood, and a quiet result.",
    features: [
      "Marble top on ash timber",
      "Light, calm palette",
      "Single size"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct30", name: "Marble Coffee Table Set", cat: "Living Room", room: "Living Room", price: 7083, memberPrice: 6375, sku: "SH-10294", tag: "New", ph: "", img: "assets/products/ct30.webp",
    imgs: ["assets/products/ct30.webp", "assets/products/ct30-2.webp", "assets/products/ct30-3.webp", "assets/products/ct30-4.webp", "assets/products/ct30-5.webp"],
    sizes: [{ label: "Complete Set", price: 7083 }],
    desc: "A complete marble set, bought together so the veining and tone are consistent across pieces.",
    features: [
      "Complete marble set",
      "Consistent stone across pieces",
      "One purchase"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct31", name: "Glass & Steel Coffee Table Set", cat: "Living Room", room: "Living Room", price: 7096, memberPrice: 6386, sku: "SH-10295", tag: "New", ph: "", img: "assets/products/ct31.webp",
    imgs: ["assets/products/ct31.webp", "assets/products/ct31-2.webp", "assets/products/ct31-3.webp", "assets/products/ct31-4.webp", "assets/products/ct31-5.webp"],
    sizes: [{ label: "120cm Set", price: 7096 }, { label: "130cm Set", price: 7315 }, { label: "140cm Set", price: 7648 }],
    desc: "Glass on stainless steel at 120cm, 130cm or 140cm. Large tables that still feel light.",
    features: [
      "Glass tops on stainless steel",
      "120cm, 130cm and 140cm sets",
      "Large but visually light"
    ],
    specs: { "Type": "Coffee table", "Material": "Glass", "Options": "3", "Room": "Living / Indoor" },
    care: "Clean with a soft cloth and a mild glass cleaner. Lift rather than drag when moving, and avoid knocking the edges, which is where glass chips." },

  { id: "ct32", name: "Round Oak & Steel Coffee Table Set", cat: "Living Room", room: "Living Room", price: 7174, memberPrice: 6457, sku: "SH-10296", tag: "New", ph: "", img: "assets/products/ct32.webp",
    imgs: ["assets/products/ct32.webp", "assets/products/ct32-2.webp", "assets/products/ct32-3.webp", "assets/products/ct32-4.webp", "assets/products/ct32-5.webp"],
    sizes: [{ label: "80cm Set", price: 7174 }, { label: "90cm Set", price: 7367 }, { label: "100cm Set", price: 8144 }],
    desc: "Oak and steel in round sets at 80cm, 90cm and 100cm, warm and hard-wearing together.",
    features: [
      "Oak tops with steel bases",
      "80cm, 90cm and 100cm sets",
      "Round, family-friendly edges"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct33", name: "Round Walnut & Glass Coffee Table", cat: "Living Room", room: "Living Room", price: 7346, memberPrice: 6611, sku: "SH-10297", tag: "New", ph: "", img: "assets/products/ct33.webp",
    imgs: ["assets/products/ct33.webp", "assets/products/ct33-2.webp", "assets/products/ct33-3.webp", "assets/products/ct33-4.webp", "assets/products/ct33-5.webp"],
    desc: "Walnut and glass in a single round design, dark timber under clear glass.",
    features: [
      "Walnut with glass",
      "Round silhouette",
      "One size"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct34", name: "White Marble Coffee Table", cat: "Living Room", room: "Living Room", price: 7383, memberPrice: 6645, sku: "SH-10298", tag: "New", ph: "", img: "assets/products/ct34.webp",
    imgs: ["assets/products/ct34.webp", "assets/products/ct34-2.webp", "assets/products/ct34-3.webp", "assets/products/ct34-4.webp", "assets/products/ct34-5.webp"],
    sizes: [{ label: "White", price: 7383 }],
    desc: "White marble, plainly done. The stone is the whole design.",
    features: [
      "Solid white marble",
      "Minimal, unadorned design",
      "Single size"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct35", name: "Snow White Stone Coffee Table Set", cat: "Living Room", room: "Living Room", price: 7507, memberPrice: 6756, sku: "SH-10299", tag: "New", ph: "", img: "assets/products/ct35.webp",
    imgs: ["assets/products/ct35.webp", "assets/products/ct35-2.webp", "assets/products/ct35-3.webp", "assets/products/ct35-4.webp", "assets/products/ct35-5.webp"],
    sizes: [{ label: "Snow White", price: 7507 }],
    desc: "A stone set in snow white on metal, bright enough to lift a dark-floored room.",
    features: [
      "Snow white stone tops",
      "Metal bases",
      "Brightens darker rooms"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct36", name: "Oval Marble Coffee Table Set", cat: "Living Room", room: "Living Room", price: 7620, memberPrice: 6858, sku: "SH-10300", tag: "New", ph: "", img: "assets/products/ct36.webp",
    imgs: ["assets/products/ct36.webp", "assets/products/ct36-2.webp", "assets/products/ct36-3.webp", "assets/products/ct36-4.webp", "assets/products/ct36-5.webp"],
    sizes: [{ label: "Gold / 120cm Set", price: 7620 }, { label: "Black / 120cm Set", price: 7620 }, { label: "Gold / 130cm Set", price: 8031 }, { label: "Black / 130cm Set", price: 8031 }],
    desc: "Oval marble with gold or black detail, at 120cm or 130cm. Oval is the shape to choose when children are learning to walk.",
    features: [
      "Oval marble tops",
      "Gold or Black detail",
      "120cm and 130cm sets"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "4", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct37", name: "Oak & Stone Coffee Table", cat: "Living Room", room: "Living Room", price: 7759, memberPrice: 6983, sku: "SH-10301", tag: "New", ph: "", img: "assets/products/ct37.webp",
    imgs: ["assets/products/ct37.webp", "assets/products/ct37-2.webp", "assets/products/ct37-3.webp", "assets/products/ct37-4.webp", "assets/products/ct37-5.webp"],
    sizes: [{ label: "120cm / White + Tan", price: 7759 }, { label: "120cm / White", price: 7759 }, { label: "130cm / White + Tan", price: 8093 }, { label: "130cm / White", price: 8093 }],
    desc: "Oak with stone at 120cm or 130cm, in white or white and tan.",
    features: [
      "Oak and stone construction",
      "White, or White and Tan",
      "120cm and 130cm"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct38", name: "Rectangular Marble Coffee Table", cat: "Living Room", room: "Living Room", price: 7880, memberPrice: 7092, sku: "SH-10302", tag: "New", ph: "", img: "assets/products/ct38.webp",
    imgs: ["assets/products/ct38.webp", "assets/products/ct38-2.webp", "assets/products/ct38-3.webp", "assets/products/ct38-4.webp", "assets/products/ct38-5.webp"],
    sizes: [{ label: "90cm", price: 7880 }, { label: "120cm", price: 8806 }],
    desc: "Rectangular marble at 90cm or 120cm, which suits a long sofa better than a round table.",
    features: [
      "Rectangular marble top",
      "90cm and 120cm",
      "Pairs with a long sofa"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct39", name: "Tan & White Marble Coffee Table", cat: "Living Room", room: "Living Room", price: 7956, memberPrice: 7160, sku: "SH-10303", tag: "New", ph: "", img: "assets/products/ct39.webp",
    imgs: ["assets/products/ct39.webp", "assets/products/ct39-2.webp", "assets/products/ct39-3.webp", "assets/products/ct39-4.webp", "assets/products/ct39-5.webp"],
    sizes: [{ label: "Tan + White", price: 7956 }],
    desc: "Marble over timber in tan and white, the two tones meeting across the top.",
    features: [
      "Two-tone tan and white marble",
      "Timber base",
      "Single size"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct40", name: "Round Gold & Glass Coffee Table Set", cat: "Living Room", room: "Living Room", price: 8074, memberPrice: 7267, sku: "SH-10304", tag: "New", ph: "", img: "assets/products/ct40.webp",
    imgs: ["assets/products/ct40.webp", "assets/products/ct40-2.webp", "assets/products/ct40-3.webp", "assets/products/ct40-4.webp", "assets/products/ct40-5.webp"],
    sizes: [{ label: "Complete Set", price: 8074 }],
    desc: "Gold stainless steel with glass, as a complete round set. Unapologetically glamorous.",
    features: [
      "Gold stainless steel with glass",
      "Complete round set",
      "A deliberately glamorous centrepiece"
    ],
    specs: { "Type": "Coffee table", "Material": "Glass", "Options": "1", "Room": "Living / Indoor" },
    care: "Clean with a soft cloth and a mild glass cleaner. Lift rather than drag when moving, and avoid knocking the edges, which is where glass chips." },

  { id: "ct41", name: "Solid Travertine Round Coffee Table", cat: "Living Room", room: "Living Room", price: 8220, memberPrice: 7398, sku: "SH-10305", tag: "New", ph: "", img: "assets/products/ct41.webp",
    imgs: ["assets/products/ct41.webp", "assets/products/ct41-2.webp", "assets/products/ct41-3.webp", "assets/products/ct41-4.webp", "assets/products/ct41-5.webp"],
    desc: "One piece of travertine, round, with the pitted texture the stone is known for.",
    features: [
      "Solid travertine",
      "Round form",
      "Natural pitted texture"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct42", name: "Steel Coffee Table Set (Three Sizes)", cat: "Living Room", room: "Living Room", price: 8237, memberPrice: 7413, sku: "SH-10306", tag: "New", ph: "", img: "assets/products/ct42.webp",
    imgs: ["assets/products/ct42.webp", "assets/products/ct42-2.webp", "assets/products/ct42-3.webp", "assets/products/ct42-4.webp", "assets/products/ct42-5.webp"],
    sizes: [{ label: "80cm Set", price: 8237 }, { label: "90cm Set", price: 8843 }, { label: "100cm Set", price: 9572 }],
    desc: "Steel sets at 80cm, 90cm and 100cm, simple and hard-wearing.",
    features: [
      "Steel construction",
      "80cm, 90cm and 100cm sets",
      "Hard-wearing finish"
    ],
    specs: { "Type": "Coffee table", "Material": "Steel / metal", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "ct43", name: "Round Marble & Gold Coffee Table", cat: "Living Room", room: "Living Room", price: 8378, memberPrice: 7540, sku: "SH-10307", tag: "New", ph: "", img: "assets/products/ct43.webp",
    imgs: ["assets/products/ct43.webp", "assets/products/ct43-2.webp", "assets/products/ct43-3.webp", "assets/products/ct43-4.webp", "assets/products/ct43-5.webp"],
    sizes: [{ label: "Gold + White", price: 8378 }],
    desc: "White marble on gold stainless steel, round. The most classic combination here.",
    features: [
      "White marble with gold steel",
      "Round shape",
      "Timeless pairing"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct44", name: "Emerald Marble Coffee Table", cat: "Living Room", room: "Living Room", price: 8481, memberPrice: 7633, sku: "SH-10308", tag: "New", ph: "", img: "assets/products/ct44.webp",
    imgs: ["assets/products/ct44.webp", "assets/products/ct44-2.webp", "assets/products/ct44-3.webp", "assets/products/ct44-4.webp", "assets/products/ct44-5.webp"],
    sizes: [{ label: "Coffee Table", price: 8481 }, { label: "Complete Set", price: 11109 }],
    desc: "Emerald marble with glass, as a single table or the full set. Green marble is rarer and reads as a deliberate choice.",
    features: [
      "Emerald green marble",
      "Table alone or complete set",
      "An unusual, deliberate stone"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct45", name: "Solid Walnut Coffee Table", cat: "Living Room", room: "Living Room", price: 8513, memberPrice: 7662, sku: "SH-10309", tag: "New", ph: "", img: "assets/products/ct45.webp",
    imgs: ["assets/products/ct45.webp", "assets/products/ct45-2.webp", "assets/products/ct45-3.webp", "assets/products/ct45-4.webp", "assets/products/ct45-5.webp"],
    desc: "Walnut, solid and dark, with grain worth looking at up close.",
    features: [
      "Solid walnut",
      "Rich dark grain",
      "Single size"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct46", name: "Round Slate & Gold Coffee Table", cat: "Living Room", room: "Living Room", price: 8869, memberPrice: 7982, sku: "SH-10310", tag: "New", ph: "", img: "assets/products/ct46.webp",
    imgs: ["assets/products/ct46.webp", "assets/products/ct46-2.webp", "assets/products/ct46-3.webp", "assets/products/ct46-4.webp", "assets/products/ct46-5.webp"],
    sizes: [{ label: "80cm ø", price: 8869 }, { label: "90cm ø", price: 9239 }],
    desc: "Slate with gold steel at 80cm or 90cm diameter.",
    features: [
      "Slate top, gold steel base",
      "80cm and 90cm diameters",
      "Matte top against polished base"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct47", name: "Large Marble & Gold Coffee Table", cat: "Living Room", room: "Living Room", price: 8941, memberPrice: 8047, sku: "SH-10311", tag: "New", ph: "", img: "assets/products/ct47.webp",
    imgs: ["assets/products/ct47.webp", "assets/products/ct47-2.webp", "assets/products/ct47-3.webp", "assets/products/ct47-4.webp", "assets/products/ct47-5.webp"],
    sizes: [{ label: "130cm", price: 8941 }, { label: "140cm", price: 9726 }],
    desc: "Marble and gold at 130cm or 140cm, sized for a large lounge.",
    features: [
      "Marble with gold detail",
      "130cm and 140cm",
      "Scaled for a large room"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct48", name: "Tri-Tone Walnut Coffee Table", cat: "Living Room", room: "Living Room", price: 9031, memberPrice: 8128, sku: "SH-10312", tag: "New", ph: "", img: "assets/products/ct48.webp",
    imgs: ["assets/products/ct48.webp", "assets/products/ct48-2.webp", "assets/products/ct48-3.webp", "assets/products/ct48-4.webp", "assets/products/ct48-5.webp"],
    sizes: [{ label: "Tri-Color", price: 9031 }],
    desc: "Three tones of walnut worked into one top, so the grain shifts across the surface.",
    features: [
      "Three walnut tones in one top",
      "Solid timber",
      "Shifting grain pattern"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct49", name: "Marble & Metal Coffee Table", cat: "Living Room", room: "Living Room", price: 9143, memberPrice: 8229, sku: "SH-10313", tag: "New", ph: "", img: "assets/products/ct49.webp",
    imgs: ["assets/products/ct49.webp", "assets/products/ct49-2.webp", "assets/products/ct49-3.webp", "assets/products/ct49-4.webp", "assets/products/ct49-5.webp"],
    desc: "Marble on metal, single size, nothing extra.",
    features: [
      "Marble top, metal base",
      "One size",
      "Pared-back design"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct50", name: "Travertine & Oak Coffee Table Set", cat: "Living Room", room: "Living Room", price: 9235, memberPrice: 8312, sku: "SH-10314", tag: "New", ph: "", img: "assets/products/ct50.webp",
    imgs: ["assets/products/ct50.webp", "assets/products/ct50-2.webp", "assets/products/ct50-3.webp", "assets/products/ct50-4.webp", "assets/products/ct50-5.webp"],
    sizes: [{ label: "Black Set", price: 9235 }, { label: "Chocolate Set", price: 9235 }],
    desc: "Travertine with oak, as a black or chocolate set. The darker stones are harder to find and worth the look.",
    features: [
      "Travertine with oak",
      "Black or Chocolate set",
      "Darker stone tones"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct51", name: "Two-Tier Coffee Table Set", cat: "Living Room", room: "Living Room", price: 9711, memberPrice: 8740, sku: "SH-10315", tag: "New", ph: "", img: "assets/products/ct51.webp",
    imgs: ["assets/products/ct51.webp", "assets/products/ct51-2.webp", "assets/products/ct51-3.webp", "assets/products/ct51-4.webp", "assets/products/ct51-5.webp"],
    sizes: [{ label: "Complete Set", price: 9711 }],
    desc: "A set with two levels, so magazines and remotes live below while the top stays clear.",
    features: [
      "Two levels of surface",
      "Complete set",
      "Keeps the top clear"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct52", name: "Travertine Coffee Table (Four Sizes)", cat: "Living Room", room: "Living Room", price: 9896, memberPrice: 8906, sku: "SH-10316", tag: "New", ph: "", img: "assets/products/ct52.webp",
    imgs: ["assets/products/ct52.webp", "assets/products/ct52-2.webp", "assets/products/ct52-3.webp", "assets/products/ct52-4.webp", "assets/products/ct52-5.webp"],
    sizes: [{ label: "100cm", price: 9896 }, { label: "120cm", price: 10081 }, { label: "140cm", price: 10722 }, { label: "160cm", price: 11333 }],
    desc: "Travertine from 100cm to 160cm, the widest size range of any table here.",
    features: [
      "Solid travertine",
      "100, 120, 140 and 160cm",
      "Fits small rooms through to large"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "4", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct53", name: "Walnut & Steel Coffee Table", cat: "Living Room", room: "Living Room", price: 10241, memberPrice: 9217, sku: "SH-10317", tag: "New", ph: "", img: "assets/products/ct53.webp",
    imgs: ["assets/products/ct53.webp", "assets/products/ct53-2.webp", "assets/products/ct53-3.webp", "assets/products/ct53-4.webp", "assets/products/ct53-5.webp"],
    desc: "Walnut on steel, dark timber against a fine frame.",
    features: [
      "Walnut top, steel base",
      "Slim frame",
      "Single size"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct54", name: "Marble Coffee Table (120 or 130cm)", cat: "Living Room", room: "Living Room", price: 10370, memberPrice: 9333, sku: "SH-10318", tag: "New", ph: "", img: "assets/products/ct54.webp",
    imgs: ["assets/products/ct54.webp", "assets/products/ct54-2.webp", "assets/products/ct54-3.webp", "assets/products/ct54-4.webp", "assets/products/ct54-5.webp"],
    sizes: [{ label: "120cm", price: 10370 }, { label: "130cm", price: 11089 }],
    desc: "Marble in two close sizes, so you can match it properly to the sofa you own.",
    features: [
      "Solid marble top",
      "120cm and 130cm",
      "Choose to suit your sofa"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct55", name: "Oak Coffee Table in Brown or Black", cat: "Living Room", room: "Living Room", price: 10472, memberPrice: 9425, sku: "SH-10319", tag: "New", ph: "", img: "assets/products/ct55.webp",
    imgs: ["assets/products/ct55.webp", "assets/products/ct55-2.webp", "assets/products/ct55-3.webp", "assets/products/ct55-4.webp", "assets/products/ct55-5.webp"],
    sizes: [{ label: "Brown / 120cm", price: 10472 }, { label: "Black / 120cm", price: 10472 }, { label: "Brown / 130cm", price: 14444 }, { label: "Black / 130cm", price: 14444 }],
    desc: "Oak at 120cm or 130cm, in brown or black. Black-stained oak keeps the grain and loses the orange.",
    features: [
      "Solid oak",
      "Brown or Black stain",
      "120cm and 130cm"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct56", name: "Marble Coffee Table Set (90 or 110cm)", cat: "Living Room", room: "Living Room", price: 10574, memberPrice: 9517, sku: "SH-10320", tag: "New", ph: "", img: "assets/products/ct56.webp",
    imgs: ["assets/products/ct56.webp", "assets/products/ct56-2.webp", "assets/products/ct56-3.webp", "assets/products/ct56-4.webp", "assets/products/ct56-5.webp"],
    sizes: [{ label: "90cm Set", price: 10574 }, { label: "110cm Set", price: 10926 }],
    desc: "Marble sets at 90cm or 110cm, two tables that work together.",
    features: [
      "Marble tops",
      "90cm and 110cm sets",
      "Two coordinated tables"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct57", name: "Walnut & Steel Coffee Table Set", cat: "Living Room", room: "Living Room", price: 10861, memberPrice: 9775, sku: "SH-10321", tag: "New", ph: "", img: "assets/products/ct57.webp",
    imgs: ["assets/products/ct57.webp", "assets/products/ct57-2.webp", "assets/products/ct57-3.webp", "assets/products/ct57-4.webp", "assets/products/ct57-5.webp"],
    sizes: [{ label: "80cm Set", price: 10861 }, { label: "90cm Set", price: 11111 }, { label: "100cm Set", price: 11435 }],
    desc: "Walnut with stainless steel in sets at 80cm, 90cm and 100cm.",
    features: [
      "Walnut with stainless steel",
      "80cm, 90cm and 100cm sets",
      "Warm timber, cool metal"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct58", name: "Two-Tone Marble Coffee Table", cat: "Living Room", room: "Living Room", price: 10920, memberPrice: 9828, sku: "SH-10322", tag: "New", ph: "", img: "assets/products/ct58.webp",
    imgs: ["assets/products/ct58.webp", "assets/products/ct58-2.webp", "assets/products/ct58-3.webp", "assets/products/ct58-4.webp", "assets/products/ct58-5.webp"],
    sizes: [{ label: "Tan + White", price: 10920 }, { label: "Grey + White", price: 10920 }],
    desc: "Marble in tan and white or grey and white, the two stones meeting in one top.",
    features: [
      "Two marble tones in one table",
      "Tan + White or Grey + White",
      "Single size"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct59", name: "Chocolate or Calacatta Stone Coffee Table", cat: "Living Room", room: "Living Room", price: 10924, memberPrice: 9832, sku: "SH-10323", tag: "New", ph: "", img: "assets/products/ct59.webp",
    imgs: ["assets/products/ct59.webp", "assets/products/ct59-2.webp", "assets/products/ct59-3.webp", "assets/products/ct59-4.webp", "assets/products/ct59-5.webp"],
    sizes: [{ label: "Chocolate", price: 10924 }, { label: "Calacatta White", price: 10924 }],
    desc: "A choice between deep chocolate stone and pale Calacatta white, which will take a room in opposite directions.",
    features: [
      "Chocolate or Calacatta White",
      "Natural stone top",
      "Two very different looks"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct60", name: "Charcoal & White Marble Coffee Table", cat: "Living Room", room: "Living Room", price: 10926, memberPrice: 9833, sku: "SH-10324", tag: "New", ph: "", img: "assets/products/ct60.webp",
    imgs: ["assets/products/ct60.webp", "assets/products/ct60-2.webp", "assets/products/ct60-3.webp", "assets/products/ct60-4.webp", "assets/products/ct60-5.webp"],
    sizes: [{ label: "Charcoal Grey + White", price: 10926 }],
    desc: "Charcoal grey against white marble, rectangular, for a room with a dark palette.",
    features: [
      "Charcoal grey and white marble",
      "Rectangular",
      "Suits a darker palette"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct61", name: "Charcoal Marble & Glass Coffee Table", cat: "Living Room", room: "Living Room", price: 11056, memberPrice: 9950, sku: "SH-10325", tag: "New", ph: "", img: "assets/products/ct61.webp",
    imgs: ["assets/products/ct61.webp", "assets/products/ct61-2.webp", "assets/products/ct61-3.webp", "assets/products/ct61-4.webp", "assets/products/ct61-5.webp"],
    sizes: [{ label: "Charcoal Grey", price: 11056 }],
    desc: "Charcoal marble with steel and glass, dark and reflective at once.",
    features: [
      "Charcoal marble with glass",
      "Stainless steel frame",
      "Dark, reflective finish"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct62", name: "Marble & Gold Rectangular Coffee Table", cat: "Living Room", room: "Living Room", price: 11457, memberPrice: 10311, sku: "SH-10326", tag: "New", ph: "", img: "assets/products/ct62.webp",
    imgs: ["assets/products/ct62.webp", "assets/products/ct62-2.webp", "assets/products/ct62-3.webp", "assets/products/ct62-4.webp", "assets/products/ct62-5.webp"],
    sizes: [{ label: "White + Gold", price: 11457 }, { label: "Chocolate + Gold", price: 11457 }],
    desc: "Rectangular marble with gold metal, in white or chocolate.",
    features: [
      "Marble top with gold metal",
      "White + Gold or Chocolate + Gold",
      "Rectangular format"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct63", name: "Round Oak Coffee Table Set", cat: "Living Room", room: "Living Room", price: 11748, memberPrice: 10573, sku: "SH-10327", tag: "New", ph: "", img: "assets/products/ct63.webp",
    imgs: ["assets/products/ct63.webp", "assets/products/ct63-2.webp", "assets/products/ct63-3.webp", "assets/products/ct63-4.webp", "assets/products/ct63-5.webp"],
    sizes: [{ label: "80cm ø Set", price: 11748 }, { label: "90cm ø Set", price: 12041 }],
    desc: "Oak sets at 80cm or 90cm diameter, round and warm.",
    features: [
      "Solid oak",
      "80cm and 90cm diameter sets",
      "Round, soft-edged"
    ],
    specs: { "Type": "Coffee table", "Material": "Solid timber", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "ct64", name: "Veined Marble Coffee Table Set", cat: "Living Room", room: "Living Room", price: 11852, memberPrice: 10667, sku: "SH-10328", tag: "New", ph: "", img: "assets/products/ct64.webp",
    imgs: ["assets/products/ct64.webp", "assets/products/ct64-2.webp", "assets/products/ct64-3.webp", "assets/products/ct64-4.webp", "assets/products/ct64-5.webp"],
    sizes: [{ label: "White + Light Veins", price: 11852 }, { label: "White + Dark Veins", price: 11852 }],
    desc: "White marble with light or dark veining, so you can choose how loud the stone is.",
    features: [
      "White marble, light or dark veins",
      "Complete set",
      "Choose the intensity of the veining"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct65", name: "Large Round Travertine Coffee Table", cat: "Living Room", room: "Living Room", price: 12361, memberPrice: 11125, sku: "SH-10329", tag: "New", ph: "", img: "assets/products/ct65.webp",
    imgs: ["assets/products/ct65.webp", "assets/products/ct65-2.webp", "assets/products/ct65-3.webp", "assets/products/ct65-4.webp", "assets/products/ct65-5.webp"],
    sizes: [{ label: "90cm", price: 12361 }, { label: "110cm", price: 12935 }],
    desc: "Travertine at 90cm or 110cm across, round and heavy.",
    features: [
      "Solid travertine",
      "90cm and 110cm diameters",
      "Substantial weight"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct66", name: "Marble Coffee Table Collection", cat: "Living Room", room: "Living Room", price: 12550, memberPrice: 11295, sku: "SH-10330", tag: "New", ph: "", img: "assets/products/ct66.webp",
    imgs: ["assets/products/ct66.webp", "assets/products/ct66-2.webp", "assets/products/ct66-3.webp", "assets/products/ct66-4.webp", "assets/products/ct66-5.webp"],
    sizes: [{ label: "Set: B", price: 12550 }, { label: "Set: C", price: 12674 }, { label: "Set: A", price: 12767 }],
    desc: "Three sets, A, B and C, in marble and steel, so the configuration matches the room rather than the other way round.",
    features: [
      "Three set configurations",
      "Marble with steel",
      "Choose the layout that fits"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct67", name: "Rectangular Travertine Coffee Table", cat: "Living Room", room: "Living Room", price: 12630, memberPrice: 11367, sku: "SH-10331", tag: "New", ph: "", img: "assets/products/ct67.webp",
    imgs: ["assets/products/ct67.webp", "assets/products/ct67-2.webp", "assets/products/ct67-3.webp", "assets/products/ct67-4.webp", "assets/products/ct67-5.webp"],
    desc: "Rectangular travertine, one size, cut from solid stone.",
    features: [
      "Solid travertine",
      "Rectangular",
      "Single generous size"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct68", name: "Marble Coffee Table in White or Green", cat: "Living Room", room: "Living Room", price: 13333, memberPrice: 12000, sku: "SH-10332", tag: "New", ph: "", img: "assets/products/ct68.webp",
    imgs: ["assets/products/ct68.webp", "assets/products/ct68-2.webp", "assets/products/ct68-3.webp", "assets/products/ct68-4.webp", "assets/products/ct68-5.webp"],
    sizes: [{ label: "White", price: 13333 }, { label: "Green", price: 13333 }],
    desc: "Marble in white or green. Green marble turns a coffee table into the thing people comment on.",
    features: [
      "Natural marble",
      "White or Green",
      "A talking point in green"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "ct69", name: "Titanium Finish Slate Coffee Table", cat: "Living Room", room: "Living Room", price: 14067, memberPrice: 12660, sku: "SH-10333", tag: "New", ph: "", img: "assets/products/ct69.webp",
    imgs: ["assets/products/ct69.webp", "assets/products/ct69-2.webp", "assets/products/ct69-3.webp", "assets/products/ct69-4.webp", "assets/products/ct69-5.webp"],
    sizes: [{ label: "Titanium Black", price: 14067 }, { label: "Titanium Gold", price: 14067 }],
    desc: "Slate with a titanium black or gold stainless finish, the most modern-looking table in the range.",
    features: [
      "Titanium Black or Titanium Gold",
      "Slate with stainless steel",
      "Contemporary, hard-edged look"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural stone", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "ct70", name: "Large Travertine Coffee Table", cat: "Living Room", room: "Living Room", price: 16296, memberPrice: 14666, sku: "SH-10334", tag: "New", ph: "", img: "assets/products/ct70.webp",
    imgs: ["assets/products/ct70.webp", "assets/products/ct70-2.webp", "assets/products/ct70-3.webp", "assets/products/ct70-4.webp", "assets/products/ct70-5.webp"],
    desc: "A large rectangular block of travertine, for a room with the scale to carry it.",
    features: [
      "Solid travertine",
      "Large rectangular format",
      "For a large room"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "ct71", name: "Oversized Round Travertine Coffee Table", cat: "Living Room", room: "Living Room", price: 16606, memberPrice: 14945, sku: "SH-10335", tag: "New", ph: "", img: "assets/products/ct71.webp",
    imgs: ["assets/products/ct71.webp", "assets/products/ct71-2.webp", "assets/products/ct71-3.webp", "assets/products/ct71-4.webp", "assets/products/ct71-5.webp"],
    desc: "The largest round travertine table here, and the heaviest piece in the collection.",
    features: [
      "Solid travertine",
      "Oversized round top",
      "The largest in the range"
    ],
    specs: { "Type": "Coffee table", "Material": "Natural travertine", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "st01", name: "Glass Side Table", cat: "Living Room", room: "Living Room", price: 1093, memberPrice: 984, sku: "SH-10336", tag: "New", ph: "", img: "assets/products/st01.webp",
    imgs: ["assets/products/st01.webp", "assets/products/st01-2.webp", "assets/products/st01-3.webp", "assets/products/st01-4.webp", "assets/products/st01-5.webp"],
    sizes: [{ label: "Black", price: 1093 }],
    desc: "A small black glass side table, light enough to move to wherever the cup of tea is.",
    features: [
      "Glass construction",
      "Black finish",
      "Light and easy to move"
    ],
    specs: { "Type": "Side table", "Material": "Glass", "Options": "1", "Room": "Living / Indoor" },
    care: "Clean with a soft cloth and a mild glass cleaner. Lift rather than drag when moving, and avoid knocking the edges, which is where glass chips." },

  { id: "st02", name: "Oak Side Table (Two Sizes)", cat: "Living Room", room: "Living Room", price: 1111, memberPrice: 1000, sku: "SH-10337", tag: "New", ph: "", img: "assets/products/st02.webp",
    imgs: ["assets/products/st02.webp", "assets/products/st02-2.webp", "assets/products/st02-3.webp", "assets/products/st02-4.webp", "assets/products/st02-5.webp"],
    sizes: [{ label: "S", price: 1111 }, { label: "L", price: 1222 }],
    desc: "Oak in large or small, to sit beside a chair or at the end of a sofa.",
    features: [
      "Solid oak",
      "Large and small",
      "Beside a chair or sofa"
    ],
    specs: { "Type": "Side table", "Material": "Solid timber", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "st03", name: "Ivory or Black Side Table", cat: "Living Room", room: "Living Room", price: 1624, memberPrice: 1462, sku: "SH-10338", tag: "New", ph: "", img: "assets/products/st03.webp",
    imgs: ["assets/products/st03.webp", "assets/products/st03-2.webp", "assets/products/st03-3.webp", "assets/products/st03-4.webp", "assets/products/st03-5.webp"],
    sizes: [{ label: "Ivory", price: 1624 }, { label: "Black", price: 1624 }],
    desc: "A simple side table in ivory or black, one shape, two moods.",
    features: [
      "Ivory or Black",
      "Simple silhouette",
      "Fits most rooms"
    ],
    specs: { "Type": "Side table", "Material": "Natural stone", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "st04", name: "Steel Side Table, Black or White", cat: "Living Room", room: "Living Room", price: 1646, memberPrice: 1481, sku: "SH-10339", tag: "New", ph: "", img: "assets/products/st04.webp",
    imgs: ["assets/products/st04.webp", "assets/products/st04-2.webp", "assets/products/st04-3.webp", "assets/products/st04-4.webp", "assets/products/st04-5.webp"],
    sizes: [{ label: "Black", price: 1646 }, { label: "White", price: 1646 }],
    desc: "Steel in black or white, slim enough for a tight corner.",
    features: [
      "Steel construction",
      "Black or White",
      "Slim footprint"
    ],
    specs: { "Type": "Side table", "Material": "Steel / metal", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "st05", name: "Metal Side Table", cat: "Living Room", room: "Living Room", price: 1656, memberPrice: 1490, sku: "SH-10340", tag: "New", ph: "", img: "assets/products/st05.webp",
    imgs: ["assets/products/st05.webp", "assets/products/st05-2.webp", "assets/products/st05-3.webp", "assets/products/st05-4.webp", "assets/products/st05-5.webp"],
    sizes: [{ label: "Black", price: 1656 }, { label: "White", price: 1656 }],
    desc: "Metal in black or white, plain and useful.",
    features: [
      "Metal construction",
      "Black or White",
      "Hard-wearing finish"
    ],
    specs: { "Type": "Side table", "Material": "Steel / metal", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "st06", name: "Stainless Steel Side Table (Three Designs)", cat: "Living Room", room: "Living Room", price: 1657, memberPrice: 1491, sku: "SH-10341", tag: "New", ph: "", img: "assets/products/st06.webp",
    imgs: ["assets/products/st06.webp", "assets/products/st06-2.webp", "assets/products/st06-3.webp", "assets/products/st06-4.webp", "assets/products/st06-5.webp"],
    sizes: [{ label: "A", price: 1657 }, { label: "B", price: 1657 }, { label: "C", price: 1657 }],
    desc: "Three designs, A, B and C, in stainless steel, so a pair need not be identical.",
    features: [
      "Three designs to choose from",
      "Stainless steel",
      "Mix designs for a grouped look"
    ],
    specs: { "Type": "Side table", "Material": "Steel / metal", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "st07", name: "Silver Stainless Steel Side Table", cat: "Living Room", room: "Living Room", price: 2167, memberPrice: 1950, sku: "SH-10342", tag: "New", ph: "", img: "assets/products/st07.webp",
    imgs: ["assets/products/st07.webp", "assets/products/st07-2.webp", "assets/products/st07-3.webp", "assets/products/st07-4.webp", "assets/products/st07-5.webp"],
    sizes: [{ label: "Silver", price: 2167 }],
    desc: "Polished stainless steel in silver, reflective enough to brighten a dim corner.",
    features: [
      "Polished stainless steel",
      "Silver finish",
      "Reflects light into dark corners"
    ],
    specs: { "Type": "Side table", "Material": "Steel / metal", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "st08", name: "Gold-Trimmed Side Table", cat: "Living Room", room: "Living Room", price: 2204, memberPrice: 1984, sku: "SH-10343", tag: "New", ph: "", img: "assets/products/st08.webp",
    imgs: ["assets/products/st08.webp", "assets/products/st08-2.webp", "assets/products/st08-3.webp", "assets/products/st08-4.webp", "assets/products/st08-5.webp"],
    sizes: [{ label: "White + Gold", price: 2204 }, { label: "Orange + Gold", price: 2204 }],
    desc: "White and gold, or orange and gold. The orange is braver and better.",
    features: [
      "Gold trim",
      "White + Gold or Orange + Gold",
      "A small piece with presence"
    ],
    specs: { "Type": "Side table", "Material": "Steel / metal", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "st09", name: "Ash Timber Side Table", cat: "Living Room", room: "Living Room", price: 2220, memberPrice: 1998, sku: "SH-10344", tag: "New", ph: "", img: "assets/products/st09.webp",
    imgs: ["assets/products/st09.webp", "assets/products/st09-2.webp", "assets/products/st09-3.webp", "assets/products/st09-4.webp", "assets/products/st09-5.webp"],
    sizes: [{ label: "Natural", price: 2220 }, { label: "Black", price: 2220 }, { label: "Walnut", price: 2220 }],
    desc: "Ash in natural, black or walnut, so it can match or deliberately contrast the floor.",
    features: [
      "Solid ash timber",
      "Natural, Black or Walnut",
      "Match or contrast your floor"
    ],
    specs: { "Type": "Side table", "Material": "Solid timber", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "st10", name: "Rattan Side Table", cat: "Living Room", room: "Living Room", price: 2278, memberPrice: 2050, sku: "SH-10345", tag: "New", ph: "", img: "assets/products/st10.webp",
    imgs: ["assets/products/st10.webp", "assets/products/st10-2.webp", "assets/products/st10-3.webp", "assets/products/st10-4.webp", "assets/products/st10-5.webp"],
    sizes: [{ label: "Black + Tan", price: 2278 }],
    desc: "Rattan in black and tan, which brings texture to a room full of hard surfaces.",
    features: [
      "Woven rattan",
      "Black and Tan",
      "Adds texture against hard surfaces"
    ],
    specs: { "Type": "Side table", "Material": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun, which fades and dries timber, and use coasters under anything hot or wet." },

  { id: "st11", name: "Stone & Silver Side Table", cat: "Living Room", room: "Living Room", price: 2494, memberPrice: 2245, sku: "SH-10346", tag: "New", ph: "", img: "assets/products/st11.webp",
    imgs: ["assets/products/st11.webp", "assets/products/st11-2.webp", "assets/products/st11-3.webp", "assets/products/st11-4.webp", "assets/products/st11-5.webp"],
    sizes: [{ label: "White + Silver", price: 2494 }],
    desc: "Stone on silver metal, white and clean.",
    features: [
      "Stone top, silver metal base",
      "White finish",
      "Compact footprint"
    ],
    specs: { "Type": "Side table", "Material": "Natural stone", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "st12", name: "Round Side Table, Gold or Silver", cat: "Living Room", room: "Living Room", price: 2759, memberPrice: 2483, sku: "SH-10347", tag: "New", ph: "", img: "assets/products/st12.webp",
    imgs: ["assets/products/st12.webp", "assets/products/st12-2.webp", "assets/products/st12-3.webp", "assets/products/st12-4.webp", "assets/products/st12-5.webp"],
    sizes: [{ label: "Gold", price: 2759 }, { label: "Silver", price: 2759 }],
    desc: "A round metal side table in gold or silver, small enough for beside a bed as well as a sofa.",
    features: [
      "Round metal top",
      "Gold or Silver",
      "Suits a bedside as well as a lounge"
    ],
    specs: { "Type": "Side table", "Material": "Steel / metal", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry to prevent water marks. Avoid abrasive pads, which scratch plated and brushed finishes." },

  { id: "st13", name: "Travertine Side Table", cat: "Living Room", room: "Living Room", price: 3069, memberPrice: 2762, sku: "SH-10348", tag: "New", ph: "", img: "assets/products/st13.webp",
    imgs: ["assets/products/st13.webp", "assets/products/st13-2.webp", "assets/products/st13-3.webp", "assets/products/st13-4.webp"],
    sizes: [{ label: "Travertine", price: 3069 }],
    desc: "Solid travertine at side table height, with all the texture of the coffee tables in a smaller piece.",
    features: [
      "Solid travertine",
      "Side table height",
      "Natural pitted texture"
    ],
    specs: { "Type": "Side table", "Material": "Natural travertine", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "st14", name: "Travertine Side Table (Two Heights)", cat: "Living Room", room: "Living Room", price: 3496, memberPrice: 3146, sku: "SH-10349", tag: "New", ph: "", img: "assets/products/st14.webp",
    imgs: ["assets/products/st14.webp", "assets/products/st14-2.webp", "assets/products/st14-3.webp", "assets/products/st14-4.webp", "assets/products/st14-5.webp"],
    sizes: [{ label: "Travertine / 65cm H", price: 3496 }, { label: "Travertine / 90cm H", price: 4009 }],
    desc: "Travertine at 65cm or 90cm high, the taller one useful beside a high-backed chair.",
    features: [
      "Solid travertine",
      "65cm or 90cm high",
      "Taller option for high-backed chairs"
    ],
    specs: { "Type": "Side table", "Material": "Natural travertine", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "st15", name: "Marble & Glass Side Table", cat: "Living Room", room: "Living Room", price: 3515, memberPrice: 3164, sku: "SH-10350", tag: "New", ph: "", img: "assets/products/st15.webp",
    imgs: ["assets/products/st15.webp", "assets/products/st15-2.webp", "assets/products/st15-3.webp", "assets/products/st15-4.webp", "assets/products/st15-5.webp"],
    sizes: [{ label: "Off White", price: 3515 }],
    desc: "Marble with glass in off white, small and quietly expensive-looking.",
    features: [
      "Marble with glass",
      "Off White",
      "Compact and refined"
    ],
    specs: { "Type": "Side table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "st16", name: "Travertine & Glass Side Table", cat: "Living Room", room: "Living Room", price: 3889, memberPrice: 3500, sku: "SH-10351", tag: "New", ph: "", img: "assets/products/st16.webp",
    imgs: ["assets/products/st16.webp", "assets/products/st16-2.webp", "assets/products/st16-3.webp", "assets/products/st16-4.webp"],
    desc: "Travertine and glass together, one size.",
    features: [
      "Travertine with glass",
      "Single size",
      "Stone and glass contrast"
    ],
    specs: { "Type": "Side table", "Material": "Natural travertine", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry straight away. Travertine's open pores hold liquid, so use coasters and deal with spills immediately. Never use acidic cleaners." },

  { id: "st17", name: "Marble Side Table, Black or Off White", cat: "Living Room", room: "Living Room", price: 4074, memberPrice: 3667, sku: "SH-10352", tag: "New", ph: "", img: "assets/products/st17.webp",
    imgs: ["assets/products/st17.webp", "assets/products/st17-2.webp", "assets/products/st17-3.webp", "assets/products/st17-4.webp", "assets/products/st17-5.webp"],
    sizes: [{ label: "Black", price: 4074 }, { label: "Off White", price: 4074 }],
    desc: "Marble in black or off white, a small piece of real stone.",
    features: [
      "Solid marble",
      "Black or Off White",
      "Small but substantial"
    ],
    specs: { "Type": "Side table", "Material": "Natural marble", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "st18", name: "Marble & Cement Side Table", cat: "Living Room", room: "Living Room", price: 4250, memberPrice: 3825, sku: "SH-10353", tag: "New", ph: "", img: "assets/products/st18.webp",
    imgs: ["assets/products/st18.webp", "assets/products/st18-2.webp", "assets/products/st18-3.webp", "assets/products/st18-4.webp", "assets/products/st18-5.webp"],
    desc: "Marble with cement, an unusual pairing that suits a more industrial room.",
    features: [
      "Marble with cement",
      "Industrial pairing",
      "Single size"
    ],
    specs: { "Type": "Side table", "Material": "Natural stone", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth. Use coasters under drinks and avoid acidic or abrasive cleaners, which dull a stone surface." },

  { id: "st19", name: "White Marble Side Table", cat: "Living Room", room: "Living Room", price: 4980, memberPrice: 4482, sku: "SH-10354", tag: "New", ph: "", img: "assets/products/st19.webp",
    imgs: ["assets/products/st19.webp", "assets/products/st19-2.webp", "assets/products/st19-3.webp", "assets/products/st19-4.webp", "assets/products/st19-5.webp"],
    sizes: [{ label: "White Marble", price: 4980 }],
    desc: "Rectangular white marble, the side table to put beside a marble coffee table without matching it exactly.",
    features: [
      "Solid white marble",
      "Rectangular",
      "Pairs with marble coffee tables"
    ],
    specs: { "Type": "Side table", "Material": "Natural marble", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so use coasters and clear spills quickly, especially wine, citrus and oil, which etch the surface. Avoid acidic or abrasive cleaners." },

  { id: "dc01", name: "Velvet Stool with Gold Base", cat: "Living Room", room: "Living Room", price: 1013, memberPrice: 912, sku: "SH-10355", tag: "New", ph: "", img: "assets/products/dc01.webp",
    imgs: ["assets/products/dc01.webp", "assets/products/dc01-2.webp", "assets/products/dc01-3.webp", "assets/products/dc01-4.webp", "assets/products/dc01-5.webp"],
    sizes: [{ label: "Plaid", price: 1013 }, { label: "Light Grey", price: 1013 }, { label: "Charcoal Grey", price: 1013 }, { label: "Emerald Green", price: 1013 }, { label: "Navy Blue", price: 1013 }],
    desc: "A velvet stool on a gold stainless base, in plaid, light grey, charcoal, emerald green or navy.",
    features: [
      "Velvet on a gold base",
      "Five colourways",
      "Use at a bench or a dressing table"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Velvet", "Options": "5", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "dc02", name: "Armless Leather Dining Chair", cat: "Living Room", room: "Living Room", price: 1087, memberPrice: 978, sku: "SH-10356", tag: "New", ph: "", img: "assets/products/dc02.webp",
    imgs: ["assets/products/dc02.webp", "assets/products/dc02-2.webp", "assets/products/dc02-3.webp", "assets/products/dc02-4.webp", "assets/products/dc02-5.webp"],
    sizes: [{ label: "Grey", price: 1087 }, { label: "Blue", price: 1087 }, { label: "Copper", price: 1087 }],
    desc: "Armless leather in grey, blue or copper, so it tucks right under the table.",
    features: [
      "Armless, tucks fully under",
      "Leather in Grey, Blue or Copper",
      "Easy to seat an extra guest"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc03", name: "Leather Dining Chair in Five Colours", cat: "Living Room", room: "Living Room", price: 1119, memberPrice: 1007, sku: "SH-10357", tag: "New", ph: "", img: "assets/products/dc03.webp",
    imgs: ["assets/products/dc03.webp", "assets/products/dc03-2.webp", "assets/products/dc03-3.webp", "assets/products/dc03-4.webp", "assets/products/dc03-5.webp"],
    sizes: [{ label: "Tan", price: 1119 }, { label: "Orange", price: 1119 }, { label: "Grey", price: 1119 }, { label: "Cream", price: 1119 }, { label: "Mocha", price: 1119 }],
    desc: "Leather in tan, orange, grey, cream or mocha.",
    features: [
      "Genuine leather",
      "Five colourways",
      "Supportive dining height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc04", name: "Dining Chair in Six Colours", cat: "Living Room", room: "Living Room", price: 1465, memberPrice: 1318, sku: "SH-10358", tag: "New", ph: "", img: "assets/products/dc04.webp",
    imgs: ["assets/products/dc04.webp", "assets/products/dc04-2.webp", "assets/products/dc04-3.webp", "assets/products/dc04-4.webp", "assets/products/dc04-5.webp"],
    sizes: [{ label: "Light Grey", price: 1465 }, { label: "Green", price: 1465 }, { label: "Coffee", price: 1465 }, { label: "Dark Grey", price: 1465 }, { label: "Ivory", price: 1465 }, { label: "Ivory  + Brown", price: 1465 }, { label: "Ivory + Grey", price: 1465 }, { label: "Grey + Brown", price: 1465 }, { label: "Ivory + Orange", price: 1465 }],
    desc: "Light grey, green, coffee, dark grey, ivory, or ivory and brown.",
    features: [
      "Six colourways",
      "Upholstered seat and back",
      "Everyday dining height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "9", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc05", name: "Dining Chair in Seven Pastels", cat: "Living Room", room: "Living Room", price: 1476, memberPrice: 1328, sku: "SH-10359", tag: "New", ph: "", img: "assets/products/dc05.webp",
    imgs: ["assets/products/dc05.webp", "assets/products/dc05-2.webp", "assets/products/dc05-3.webp", "assets/products/dc05-4.webp", "assets/products/dc05-5.jpg"],
    sizes: [{ label: "Tan", price: 1476 }, { label: "Grey", price: 1476 }, { label: "Light Blue", price: 1476 }, { label: "Khaki", price: 1476 }, { label: "Peach", price: 1476 }, { label: "Aqua Blue", price: 1476 }, { label: "Lemon Beige", price: 1476 }],
    desc: "Tan, grey, light blue, khaki, peach, aqua blue and lemon beige. Mix two or three around one table.",
    features: [
      "Seven soft colourways",
      "Mix colours around a table",
      "Upholstered seat"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "7", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc06", name: "Grey Dining Chair, With or Without Timber", cat: "Living Room", room: "Living Room", price: 1604, memberPrice: 1444, sku: "SH-10360", tag: "New", ph: "", img: "assets/products/dc06.webp",
    imgs: ["assets/products/dc06.webp", "assets/products/dc06-2.webp", "assets/products/dc06-3.webp", "assets/products/dc06-4.webp", "assets/products/dc06-5.webp"],
    sizes: [{ label: "Grey", price: 1604 }, { label: "Grey + Timber", price: 1604 }],
    desc: "Grey, or grey with timber legs.",
    features: [
      "Grey upholstery",
      "Optional timber legs",
      "Simple dining shape"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Solid timber", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun and check the joints occasionally, tightening any fixings." },

  { id: "dc07", name: "Bouclé Dining Chair on Ash", cat: "Living Room", room: "Living Room", price: 1630, memberPrice: 1467, sku: "SH-10361", tag: "New", ph: "", img: "assets/products/dc07.webp",
    imgs: ["assets/products/dc07.webp", "assets/products/dc07-2.webp", "assets/products/dc07-3.webp", "assets/products/dc07-4.webp", "assets/products/dc07-5.webp"],
    sizes: [{ label: "Black", price: 1630 }, { label: "Brown", price: 1630 }],
    desc: "Bouclé on ash timber in black or brown.",
    features: [
      "Bouclé on ash timber",
      "Black or Brown",
      "Rounded back"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Bouclé", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "dc08", name: "Bouclé Dining Chair with Metal Legs", cat: "Living Room", room: "Living Room", price: 1639, memberPrice: 1475, sku: "SH-10362", tag: "New", ph: "", img: "assets/products/dc08.webp",
    imgs: ["assets/products/dc08.webp", "assets/products/dc08-2.webp", "assets/products/dc08-3.webp", "assets/products/dc08-4.webp", "assets/products/dc08-5.webp"],
    sizes: [{ label: "Off White", price: 1639 }, { label: "Orange", price: 1639 }, { label: "Grey", price: 1639 }, { label: "Green", price: 1639 }],
    desc: "Bouclé on metal in off white, orange, grey or green.",
    features: [
      "Bouclé upholstery, metal legs",
      "Four colourways",
      "Slim profile"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Bouclé", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "dc09", name: "Leather & Timber Dining Chair", cat: "Living Room", room: "Living Room", price: 1648, memberPrice: 1483, sku: "SH-10363", tag: "New", ph: "", img: "assets/products/dc09.webp",
    imgs: ["assets/products/dc09.webp", "assets/products/dc09-2.webp", "assets/products/dc09-3.webp", "assets/products/dc09-4.webp", "assets/products/dc09-5.webp"],
    sizes: [{ label: "Beige", price: 1648 }, { label: "Grey", price: 1648 }, { label: "Emerald Green", price: 1648 }],
    desc: "Leather on timber in beige, grey or emerald green.",
    features: [
      "Leather on timber",
      "Beige, Grey or Emerald Green",
      "Solid timber legs"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc10", name: "Leather Dining Chair in Six Neutrals", cat: "Living Room", room: "Living Room", price: 1685, memberPrice: 1516, sku: "SH-10364", tag: "New", ph: "", img: "assets/products/dc10.webp",
    imgs: ["assets/products/dc10.webp", "assets/products/dc10-2.webp", "assets/products/dc10-3.webp", "assets/products/dc10-4.webp", "assets/products/dc10-5.webp"],
    sizes: [{ label: "Charcoal Grey", price: 1685 }, { label: "Chocolate", price: 1685 }, { label: "Dark Tan", price: 1685 }, { label: "Ivory", price: 2204 }, { label: "Shale Grey", price: 2204 }, { label: "Off White", price: 2204 }, { label: "Black", price: 2204 }],
    desc: "Ivory, shale grey, off white, black, charcoal and chocolate.",
    features: [
      "Genuine leather",
      "Six neutral colourways",
      "Supportive back"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "7", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc11", name: "Velvet Swivel Bar Stool", cat: "Living Room", room: "Living Room", price: 1785, memberPrice: 1606, sku: "SH-10365", tag: "New", ph: "", img: "assets/products/dc11.webp",
    imgs: ["assets/products/dc11.webp", "assets/products/dc11-2.webp", "assets/products/dc11-3.webp", "assets/products/dc11-4.webp", "assets/products/dc11-5.webp"],
    sizes: [{ label: "Black + Gold / 75cm", price: 1785 }, { label: "Black + Black / 75cm", price: 1785 }, { label: "White + Gold / 75cm", price: 1785 }, { label: "White + Black / 75cm", price: 1785 }, { label: "Green + Gold / 75cm", price: 1785 }, { label: "Green + Black / 75cm", price: 1785 }, { label: "Grey + Gold / 75cm", price: 1785 }, { label: "Grey + Black / 75cm", price: 1785 }, { label: "Navy + Gold / 75cm", price: 1785 }, { label: "Navy + Black / 75cm", price: 1785 }, { label: "Black + Gold / 65cm", price: 1952 }, { label: "Black + Black / 65cm", price: 1952 }, { label: "White + Gold / 65cm", price: 1952 }, { label: "White + Black / 65cm", price: 1952 }, { label: "Green + Gold / 65cm", price: 1952 }, { label: "Green + Black / 65cm", price: 1952 }, { label: "Grey + Gold / 65cm", price: 1952 }, { label: "Grey + Black / 65cm", price: 1952 }, { label: "Navy + Gold / 65cm", price: 1952 }, { label: "Navy + Black / 65cm", price: 1952 }],
    desc: "A velvet swivel stool in black and gold or black on black, at 65cm or 75cm.",
    features: [
      "Velvet with swivel action",
      "65cm and 75cm heights",
      "Black + Gold or Black + Black"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Velvet", "Options": "20", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "dc12", name: "Leather Dining Chair on Steel", cat: "Living Room", room: "Living Room", price: 1828, memberPrice: 1645, sku: "SH-10366", tag: "New", ph: "", img: "assets/products/dc12.webp",
    imgs: ["assets/products/dc12.webp", "assets/products/dc12-2.webp", "assets/products/dc12-3.webp", "assets/products/dc12-4.webp", "assets/products/dc12-5.webp"],
    sizes: [{ label: "Ivory", price: 1828 }, { label: "Black", price: 1828 }],
    desc: "Leather on timber and steel, in ivory or black.",
    features: [
      "Leather on timber and steel",
      "Ivory or Black",
      "Firm, upright seat"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc13", name: "Swivel Chair in Tan or Grey", cat: "Living Room", room: "Living Room", price: 1830, memberPrice: 1647, sku: "SH-10367", tag: "New", ph: "", img: "assets/products/dc13.webp",
    imgs: ["assets/products/dc13.webp", "assets/products/dc13-2.webp", "assets/products/dc13-3.webp", "assets/products/dc13-4.webp", "assets/products/dc13-5.webp"],
    sizes: [{ label: "Tan", price: 1830 }, { label: "Charcoal Grey", price: 1830 }, { label: "Light Grey", price: 1830 }],
    desc: "A swivel chair in tan, charcoal grey or light grey, which works at a dining table or a desk.",
    features: [
      "Swivel base",
      "Tan, Charcoal Grey or Light Grey",
      "Dining or desk height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc14", name: "Leather Swivel Bar Stool", cat: "Living Room", room: "Living Room", price: 2111, memberPrice: 1900, sku: "SH-10368", tag: "New", ph: "", img: "assets/products/dc14.webp",
    imgs: ["assets/products/dc14.webp", "assets/products/dc14-2.webp", "assets/products/dc14-3.webp", "assets/products/dc14-4.webp", "assets/products/dc14-5.webp"],
    sizes: [{ label: "Tan", price: 2111 }, { label: "Beige", price: 2111 }, { label: "Emerald Green", price: 2111 }],
    desc: "Leather with a swivel seat, in tan, beige or emerald green.",
    features: [
      "Leather with swivel seat",
      "Tan, Beige or Emerald Green",
      "Bar height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc15", name: "Walnut & Leather Dining Chair", cat: "Living Room", room: "Living Room", price: 2180, memberPrice: 1962, sku: "SH-10369", tag: "New", ph: "", img: "assets/products/dc15.webp",
    imgs: ["assets/products/dc15.webp", "assets/products/dc15-2.webp", "assets/products/dc15-3.webp", "assets/products/dc15-4.webp", "assets/products/dc15-5.webp"],
    sizes: [{ label: "Black", price: 2180 }, { label: "Off White", price: 2180 }],
    desc: "Leather cushions on walnut, in black or off white.",
    features: [
      "Walnut frame",
      "Leather cushioned seat",
      "Black or Off White"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Solid timber", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun and check the joints occasionally, tightening any fixings." },

  { id: "dc16", name: "Leather Bar Stool on Steel", cat: "Living Room", room: "Living Room", price: 2198, memberPrice: 1978, sku: "SH-10370", tag: "New", ph: "", img: "assets/products/dc16.webp",
    imgs: ["assets/products/dc16.webp", "assets/products/dc16-2.webp", "assets/products/dc16-3.webp", "assets/products/dc16-4.webp", "assets/products/dc16-5.webp"],
    sizes: [{ label: "Tan", price: 2198 }, { label: "Beige", price: 2198 }, { label: "Khaki", price: 2198 }, { label: "Grey", price: 2198 }],
    desc: "Leather on stainless steel in tan, beige, khaki or grey.",
    features: [
      "Leather on stainless steel",
      "Four colourways",
      "Bar height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc17", name: "Leather Bar Stool", cat: "Living Room", room: "Living Room", price: 2202, memberPrice: 1982, sku: "SH-10371", tag: "New", ph: "", img: "assets/products/dc17.webp",
    imgs: ["assets/products/dc17.webp", "assets/products/dc17-2.webp", "assets/products/dc17-3.webp", "assets/products/dc17-4.webp", "assets/products/dc17-5.webp"],
    sizes: [{ label: "Black", price: 2202 }, { label: "Beige", price: 2202 }],
    desc: "Leather in black or beige.",
    features: [
      "Genuine leather",
      "Black or Beige",
      "Bar height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc18", name: "Linen Bar Stool, Gold or Silver", cat: "Living Room", room: "Living Room", price: 2204, memberPrice: 1984, sku: "SH-10372", tag: "New", ph: "", img: "assets/products/dc18.webp",
    imgs: ["assets/products/dc18.webp", "assets/products/dc18-2.webp", "assets/products/dc18-3.webp", "assets/products/dc18-4.webp", "assets/products/dc18-5.webp"],
    sizes: [{ label: "Gold / 65cm", price: 2204 }, { label: "Gold / 75cm", price: 2204 }, { label: "Silver / 65cm", price: 2204 }, { label: "Silver / 75cm", price: 2204 }],
    desc: "Linen and cotton on gold or silver metal, at 65cm or 75cm.",
    features: [
      "Linen and cotton upholstery",
      "Gold or Silver metal",
      "65cm and 75cm heights"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc19", name: "Velvet Bar Stool in Two Heights", cat: "Living Room", room: "Living Room", price: 2204, memberPrice: 1984, sku: "SH-10373", tag: "New", ph: "", img: "assets/products/dc19.webp",
    imgs: ["assets/products/dc19.webp", "assets/products/dc19-2.webp", "assets/products/dc19-3.webp", "assets/products/dc19-4.webp", "assets/products/dc19-5.webp"],
    sizes: [{ label: "Emerald Green / 65cm", price: 2204 }, { label: "Tan / 65cm", price: 2204 }, { label: "Royal Blue / 65cm", price: 2204 }, { label: "Ocean Blue / 65cm", price: 2204 }, { label: "Ivory / 65cm", price: 2204 }, { label: "Emerald Green / 75cm", price: 2389 }, { label: "Tan / 75cm", price: 2389 }, { label: "Royal Blue / 75cm", price: 2389 }, { label: "Ocean Blue / 75cm", price: 2389 }, { label: "Ivory / 75cm", price: 2389 }],
    desc: "Velvet in emerald green or tan, at 65cm or 75cm.",
    features: [
      "Velvet upholstery",
      "Emerald Green or Tan",
      "65cm and 75cm heights"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Velvet", "Options": "10", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "dc20", name: "Tall Velvet Stool (80cm)", cat: "Living Room", room: "Living Room", price: 2207, memberPrice: 1986, sku: "SH-10374", tag: "New", ph: "", img: "assets/products/dc20.webp",
    imgs: ["assets/products/dc20.webp", "assets/products/dc20-2.webp", "assets/products/dc20-3.webp", "assets/products/dc20-4.webp", "assets/products/dc20-5.webp"],
    sizes: [{ label: "Grey / 80cm", price: 2207 }, { label: "Emerald Green / 80cm", price: 2207 }, { label: "Navy / 80cm", price: 2207 }, { label: "Ivory / 80cm", price: 2207 }, { label: "Grey / 100cm", price: 2641 }, { label: "Emerald Green / 100cm", price: 2641 }, { label: "Navy / 100cm", price: 2641 }, { label: "Ivory / 100cm", price: 2641 }, { label: "Grey / 120cm", price: 3070 }, { label: "Emerald Green / 120cm", price: 3070 }, { label: "Navy / 120cm", price: 3070 }, { label: "Ivory / 120cm", price: 3070 }],
    desc: "Velvet on stainless steel at 80cm, in grey, emerald green, navy or ivory. Tall enough for a high bench.",
    features: [
      "80cm height",
      "Velvet on stainless steel",
      "Four colourways"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Velvet", "Options": "12", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "dc21", name: "Tan Dining Chair", cat: "Living Room", room: "Living Room", price: 2219, memberPrice: 1997, sku: "SH-10375", tag: "New", ph: "", img: "assets/products/dc21.webp",
    imgs: ["assets/products/dc21.webp", "assets/products/dc21-2.webp", "assets/products/dc21-3.webp", "assets/products/dc21-4.webp", "assets/products/dc21-5.webp"],
    sizes: [{ label: "Tan", price: 2219 }],
    desc: "A tan dining chair, plain and useful.",
    features: [
      "Tan upholstery",
      "Simple dining shape",
      "Everyday use"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc22", name: "Upholstered Hallway Bench (80 or 100cm)", cat: "Living Room", room: "Living Room", price: 2294, memberPrice: 2065, sku: "SH-10376", tag: "New", ph: "", img: "assets/products/dc22.webp",
    imgs: ["assets/products/dc22.webp", "assets/products/dc22-2.webp", "assets/products/dc22-3.webp", "assets/products/dc22-4.webp", "assets/products/dc22-5.webp"],
    sizes: [{ label: "80cm", price: 2294 }, { label: "100cm", price: 2665 }],
    desc: "A velvet bench at 80cm or 100cm, for pulling shoes on and off by the door.",
    features: [
      "80cm and 100cm",
      "Velvet upholstery",
      "Made for a hallway or bedroom end"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Velvet", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "dc23", name: "Velvet Bar Stool with Gold Base", cat: "Living Room", room: "Living Room", price: 2304, memberPrice: 2074, sku: "SH-10377", tag: "New", ph: "", img: "assets/products/dc23.webp",
    imgs: ["assets/products/dc23.webp", "assets/products/dc23-2.webp", "assets/products/dc23-3.webp", "assets/products/dc23-4.webp", "assets/products/dc23-5.webp"],
    sizes: [{ label: "Black", price: 2304 }, { label: "Grey", price: 2304 }, { label: "Emerald Green", price: 2304 }],
    desc: "Velvet on a gold stainless base, in black, grey or emerald green.",
    features: [
      "Velvet on a gold base",
      "Black, Grey or Emerald Green",
      "Bar height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Velvet", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "dc24", name: "Bar Stool in Four Colours", cat: "Living Room", room: "Living Room", price: 2352, memberPrice: 2117, sku: "SH-10378", tag: "New", ph: "", img: "assets/products/dc24.webp",
    imgs: ["assets/products/dc24.webp", "assets/products/dc24-2.webp", "assets/products/dc24-3.webp", "assets/products/dc24-4.webp", "assets/products/dc24-5.webp"],
    sizes: [{ label: "Grey", price: 2352 }, { label: "Black", price: 2352 }, { label: "Green", price: 2352 }, { label: "Off White", price: 2352 }],
    desc: "Grey, black, green or off white.",
    features: [
      "Four colourways",
      "Upholstered seat",
      "Bar height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc25", name: "Dining Chair in Green, Brown or Ivory", cat: "Living Room", room: "Living Room", price: 2352, memberPrice: 2117, sku: "SH-10379", tag: "New", ph: "", img: "assets/products/dc25.webp",
    imgs: ["assets/products/dc25.webp", "assets/products/dc25-2.webp", "assets/products/dc25-3.webp", "assets/products/dc25-4.webp", "assets/products/dc25-5.webp"],
    sizes: [{ label: "Green", price: 2352 }, { label: "Brown", price: 2352 }, { label: "Ivory", price: 2352 }],
    desc: "Three colours, green being the one that makes a plain table interesting.",
    features: [
      "Green, Brown or Ivory",
      "Upholstered seat and back",
      "Dining height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc26", name: "Leather & Ash Dining Chair", cat: "Living Room", room: "Living Room", price: 2376, memberPrice: 2138, sku: "SH-10380", tag: "New", ph: "", img: "assets/products/dc26.webp",
    imgs: ["assets/products/dc26.webp", "assets/products/dc26-2.webp", "assets/products/dc26-3.webp", "assets/products/dc26-4.webp", "assets/products/dc26-5.webp"],
    desc: "Leather on ash timber, one finish.",
    features: [
      "Leather on ash timber",
      "Single finish",
      "Solid timber legs"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc27", name: "Coffee-Toned Dining Chair", cat: "Living Room", room: "Living Room", price: 2511, memberPrice: 2260, sku: "SH-10381", tag: "New", ph: "", img: "assets/products/dc27.webp",
    imgs: ["assets/products/dc27.webp", "assets/products/dc27-2.webp", "assets/products/dc27-3.webp", "assets/products/dc27-4.webp", "assets/products/dc27-5.webp"],
    sizes: [{ label: "Coffee", price: 2511 }],
    desc: "A single coffee colourway.",
    features: [
      "Coffee colourway",
      "Upholstered seat",
      "Dining height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc28", name: "Sculptural Dining Chair", cat: "Living Room", room: "Living Room", price: 2574, memberPrice: 2317, sku: "SH-10382", tag: "New", ph: "", img: "assets/products/dc28.webp",
    imgs: ["assets/products/dc28.webp", "assets/products/dc28-2.webp", "assets/products/dc28-3.webp", "assets/products/dc28-4.webp", "assets/products/dc28-5.webp"],
    desc: "One shape, one finish, more sculptural than most dining chairs.",
    features: [
      "Sculptural silhouette",
      "Single finish",
      "Dining height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc29", name: "Shoe Changing Bench (Five Lengths)", cat: "Living Room", room: "Living Room", price: 2589, memberPrice: 2330, sku: "SH-10383", tag: "New", ph: "", img: "assets/products/dc29.webp",
    imgs: ["assets/products/dc29.webp", "assets/products/dc29-2.webp", "assets/products/dc29-3.webp", "assets/products/dc29-4.webp", "assets/products/dc29-5.webp"],
    sizes: [{ label: "Tan / 60cm", price: 2589 }, { label: "Black / 60cm", price: 2589 }, { label: "Natural / 60cm", price: 2589 }, { label: "Tan / 80cm", price: 3259 }, { label: "Black / 80cm", price: 3259 }, { label: "Natural / 80cm", price: 3259 }, { label: "Tan / 100cm", price: 4437 }, { label: "Black / 100cm", price: 4437 }, { label: "Natural / 100cm", price: 4437 }, { label: "Tan / 120cm", price: 4696 }, { label: "Black / 120cm", price: 4696 }, { label: "Natural / 120cm", price: 4696 }, { label: "Tan / 140cm", price: 5533 }, { label: "Black / 140cm", price: 5533 }, { label: "Natural / 140cm", price: 5533 }],
    desc: "Tan, from 60cm up to 140cm, so it fits the entry you actually have.",
    features: [
      "Five lengths, 60cm to 140cm",
      "Tan upholstery",
      "Made for an entry or hallway"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "15", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc30", name: "Leather Bar Stool in Five Colours", cat: "Living Room", room: "Living Room", price: 2739, memberPrice: 2465, sku: "SH-10384", tag: "New", ph: "", img: "assets/products/dc30.webp",
    imgs: ["assets/products/dc30.webp", "assets/products/dc30-2.webp", "assets/products/dc30-3.webp", "assets/products/dc30-4.webp", "assets/products/dc30-5.webp"],
    sizes: [{ label: "Orange", price: 2739 }, { label: "Black", price: 2739 }, { label: "Grey", price: 2739 }, { label: "Brown", price: 2739 }, { label: "White", price: 2739 }],
    desc: "Leather on stainless steel in orange, black, grey, brown or white.",
    features: [
      "Leather on stainless steel",
      "Five colourways",
      "Bar height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc31", name: "Cushioned Leather Bar Stool", cat: "Living Room", room: "Living Room", price: 3046, memberPrice: 2741, sku: "SH-10385", tag: "New", ph: "", img: "assets/products/dc31.webp",
    imgs: ["assets/products/dc31.webp", "assets/products/dc31-2.webp", "assets/products/dc31-3.webp", "assets/products/dc31-4.webp", "assets/products/dc31-5.webp"],
    desc: "Leather with a deeper cushion than most stools, on stainless steel.",
    features: [
      "Deep cushioned seat",
      "Leather on stainless steel",
      "Bar height"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Leather", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "dc32", name: "Velvet Bench (120cm)", cat: "Living Room", room: "Living Room", price: 3300, memberPrice: 2970, sku: "SH-10386", tag: "New", ph: "", img: "assets/products/dc32.webp",
    imgs: ["assets/products/dc32.webp", "assets/products/dc32-2.webp", "assets/products/dc32-3.webp", "assets/products/dc32-4.webp", "assets/products/dc32-5.webp"],
    sizes: [{ label: "Plaid / 120cm", price: 3300 }, { label: "Dark Grey / 120cm", price: 3300 }, { label: "Grey / 120cm", price: 3300 }, { label: "Off White / 120cm", price: 3300 }, { label: "Black + White / 120cm", price: 3300 }, { label: "Copper / 120cm", price: 3300 }, { label: "Plaid / 160cm", price: 3474 }, { label: "Dark Grey / 160cm", price: 3474 }, { label: "Grey / 160cm", price: 3474 }, { label: "Off White / 160cm", price: 3474 }, { label: "Black + White / 160cm", price: 3474 }, { label: "Copper / 160cm", price: 3474 }, { label: "Plaid / 180cm", price: 4026 }, { label: "Dark Grey / 180cm", price: 4026 }, { label: "Grey / 180cm", price: 4026 }, { label: "Off White / 180cm", price: 4026 }, { label: "Black + White / 180cm", price: 4026 }, { label: "Copper / 180cm", price: 4026 }],
    desc: "A 120cm velvet bench in plaid, dark grey, grey or off white.",
    features: [
      "120cm long",
      "Velvet upholstery",
      "Four colourways including plaid"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Velvet", "Options": "18", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "dc33", name: "Linen Dining Chair on Timber", cat: "Living Room", room: "Living Room", price: 3544, memberPrice: 3190, sku: "SH-10387", tag: "New", ph: "", img: "assets/products/dc33.webp",
    imgs: ["assets/products/dc33.webp", "assets/products/dc33-2.webp", "assets/products/dc33-3.webp", "assets/products/dc33-4.webp", "assets/products/dc33-5.webp"],
    desc: "Linen and cotton on timber, one finish.",
    features: [
      "Linen and cotton upholstery",
      "Timber frame",
      "Single finish"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "dc34", name: "Bouclé Bench in Six Lengths", cat: "Living Room", room: "Living Room", price: 4148, memberPrice: 3733, sku: "SH-10388", tag: "New", ph: "", img: "assets/products/dc34.webp",
    imgs: ["assets/products/dc34.webp", "assets/products/dc34-2.webp", "assets/products/dc34-3.webp", "assets/products/dc34-4.webp", "assets/products/dc34-5.webp"],
    sizes: [{ label: "60cm", price: 4148 }, { label: "80cm", price: 4185 }, { label: "100cm", price: 4550 }, { label: "120cm", price: 4981 }, { label: "140cm", price: 5369 }, { label: "160cm", price: 5556 }],
    desc: "Bouclé on walnut, from 60cm to 160cm. Use it at a dining table, at the end of a bed, or along a hallway.",
    features: [
      "Six lengths, 60cm to 160cm",
      "Bouclé on walnut",
      "Dining, bedroom or hallway"
    ],
    specs: { "Type": "Dining chair / stool", "Upholstery": "Bouclé", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "oc01", name: "Metal-Frame Chair & Ottoman", cat: "Living Room", room: "Living Room", price: 1444, memberPrice: 1300, sku: "SH-10389", tag: "New", ph: "", img: "assets/products/oc01.webp",
    imgs: ["assets/products/oc01.webp", "assets/products/oc01-2.webp", "assets/products/oc01-3.webp", "assets/products/oc01-4.webp", "assets/products/oc01-5.webp"],
    sizes: [{ label: "Ottoman", price: 1444 }, { label: "Chair", price: 4143 }, { label: "Complete Set", price: 5772 }],
    desc: "A slim metal-framed chair with a matching ottoman, sold separately or as the set. The lightest-looking seat in the range, which suits a small room.",
    features: [
      "Slim metal frame",
      "Chair, ottoman, or the complete set",
      "Light visual footprint"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Steel / metal", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Avoid abrasive pads on plated or brushed finishes, and check the feet for floor protectors." },

  { id: "oc02", name: "Swivel Chair & Footstool", cat: "Living Room", room: "Living Room", price: 1463, memberPrice: 1317, sku: "SH-10390", tag: "New", ph: "", img: "assets/products/oc02.webp",
    imgs: ["assets/products/oc02.webp", "assets/products/oc02-2.webp", "assets/products/oc02-3.webp", "assets/products/oc02-4.webp", "assets/products/oc02-5.webp"],
    sizes: [{ label: "Foot Stool", price: 1463 }, { label: "Chair", price: 5526 }],
    desc: "A swivel chair that turns to the conversation, or the view, with a footstool to match.",
    features: [
      "Full swivel base",
      "Chair and footstool sold separately",
      "Turns to face the room or the window"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc03", name: "Cushioned Chair in Three Colours", cat: "Living Room", room: "Living Room", price: 2293, memberPrice: 2064, sku: "SH-10391", tag: "New", ph: "", img: "assets/products/oc03.webp",
    imgs: ["assets/products/oc03.webp", "assets/products/oc03-2.webp", "assets/products/oc03-3.webp", "assets/products/oc03-4.webp", "assets/products/oc03-5.webp"],
    sizes: [{ label: "White", price: 2293 }, { label: "Green", price: 2293 }, { label: "Tan", price: 2293 }],
    desc: "A soft cushioned chair in white, green or tan. The green is the one that lifts a neutral room.",
    features: [
      "Deep cushioned seat",
      "White, Green or Tan",
      "Suits a lounge, bedroom or reading corner"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc04", name: "Bouclé Chair with Gold Base", cat: "Living Room", room: "Living Room", price: 2774, memberPrice: 2497, sku: "SH-10392", tag: "New", ph: "", img: "assets/products/oc04.webp",
    imgs: ["assets/products/oc04.webp", "assets/products/oc04-2.webp", "assets/products/oc04-3.webp", "assets/products/oc04-4.webp", "assets/products/oc04-5.webp"],
    sizes: [{ label: "White", price: 2774 }, { label: "Khaki", price: 2774 }, { label: "Light Green", price: 2774 }, { label: "Charcoal Grey", price: 2774 }, { label: "Ocean Blue", price: 2774 }],
    desc: "Bouclé on a gold base, in five colours from snow white to ocean blue. Texture and metal together, which is why it reads expensive.",
    features: [
      "Bouclé upholstery on a gold base",
      "Five colourways",
      "Textured fabric against polished metal"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Bouclé", "Options": "5", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "oc05", name: "Cotton Chair with Steel Frame", cat: "Living Room", room: "Living Room", price: 2831, memberPrice: 2548, sku: "SH-10393", tag: "New", ph: "", img: "assets/products/oc05.webp",
    imgs: ["assets/products/oc05.webp", "assets/products/oc05-2.webp", "assets/products/oc05-3.webp", "assets/products/oc05-4.webp", "assets/products/oc05-5.webp"],
    sizes: [{ label: "Tan", price: 2831 }, { label: "Navy", price: 2831 }, { label: "Grey", price: 2831 }, { label: "Beige", price: 2831 }, { label: "Emerald Green", price: 2831 }],
    desc: "Cotton over a steel frame in five colours, including an emerald green worth being bold about.",
    features: [
      "Cotton upholstery, steel frame",
      "Five colours including emerald green",
      "Cushioned seat and back"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "5", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc06", name: "Bouclé Chair in White or Pink", cat: "Living Room", room: "Living Room", price: 3130, memberPrice: 2817, sku: "SH-10394", tag: "New", ph: "", img: "assets/products/oc06.webp",
    imgs: ["assets/products/oc06.webp", "assets/products/oc06-2.webp", "assets/products/oc06-3.webp", "assets/products/oc06-4.webp", "assets/products/oc06-5.webp"],
    sizes: [{ label: "White", price: 3130 }, { label: "Pink", price: 3130 }],
    desc: "Bouclé in white or soft pink, rounded and quiet.",
    features: [
      "Soft bouclé upholstery",
      "White or Pink",
      "Rounded, enveloping shape"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Bouclé", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "oc07", name: "Two-Tone Leather Chair", cat: "Living Room", room: "Living Room", price: 3304, memberPrice: 2974, sku: "SH-10395", tag: "New", ph: "", img: "assets/products/oc07.webp",
    imgs: ["assets/products/oc07.webp", "assets/products/oc07-2.webp", "assets/products/oc07-3.webp", "assets/products/oc07-4.webp", "assets/products/oc07-5.webp"],
    sizes: [{ label: "Black +  White", price: 3304 }, { label: "Orange", price: 3304 }, { label: "Navy", price: 3304 }, { label: "Orange + Grey", price: 3304 }],
    desc: "Leather in two-tone combinations: black and white, orange and grey, or solid navy and orange.",
    features: [
      "Genuine leather",
      "Two-tone and solid colourways",
      "Four combinations to choose from"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc08", name: "Green Cotton Cushion Chair", cat: "Living Room", room: "Living Room", price: 3307, memberPrice: 2976, sku: "SH-10396", tag: "New", ph: "", img: "assets/products/oc08.webp",
    imgs: ["assets/products/oc08.webp", "assets/products/oc08-2.webp", "assets/products/oc08-3.webp", "assets/products/oc08-4.webp", "assets/products/oc08-5.webp"],
    sizes: [{ label: "Green", price: 3307 }],
    desc: "A single green cotton chair with a generous cushion. One colour, done properly.",
    features: [
      "Cotton upholstery",
      "Generous cushioned seat",
      "Single considered colourway"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc09", name: "Ash Timber Occasional Chair", cat: "Living Room", room: "Living Room", price: 3352, memberPrice: 3017, sku: "SH-10397", tag: "New", ph: "", img: "assets/products/oc09.webp",
    imgs: ["assets/products/oc09.webp", "assets/products/oc09-2.webp", "assets/products/oc09-3.webp", "assets/products/oc09-4.webp", "assets/products/oc09-5.webp"],
    desc: "Ash timber with a clean frame, the sort of chair that works at a desk as easily as beside a sofa.",
    features: [
      "Solid ash timber",
      "Clean, simple frame",
      "Works as a desk or lounge chair"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun and check the joints occasionally, tightening any fixings." },

  { id: "oc10", name: "Metal-Frame Chair in Three Tones", cat: "Living Room", room: "Living Room", price: 3519, memberPrice: 3167, sku: "SH-10398", tag: "New", ph: "", img: "assets/products/oc10.webp",
    imgs: ["assets/products/oc10.webp", "assets/products/oc10-2.webp", "assets/products/oc10-3.webp", "assets/products/oc10-4.webp", "assets/products/oc10-5.webp"],
    sizes: [{ label: "Snow White", price: 3519 }, { label: "Charcoal Grey", price: 3519 }, { label: "Black", price: 3519 }],
    desc: "A cushioned metal-framed chair in snow white, charcoal grey or black.",
    features: [
      "Metal frame with cushioned seat",
      "Snow White, Charcoal Grey or Black",
      "Slim profile"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Steel / metal", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Avoid abrasive pads on plated or brushed finishes, and check the feet for floor protectors." },

  { id: "oc11", name: "Plain or Plaid Cushion Chair", cat: "Living Room", room: "Living Room", price: 3519, memberPrice: 3167, sku: "SH-10399", tag: "New", ph: "", img: "assets/products/oc11.webp",
    imgs: ["assets/products/oc11.webp", "assets/products/oc11-2.webp", "assets/products/oc11-3.webp", "assets/products/oc11-4.webp", "assets/products/oc11-5.webp"],
    sizes: [{ label: "White", price: 3519 }, { label: "Plaid", price: 3519 }],
    desc: "A cushioned chair in plain white or a plaid, which is rare in a range this contemporary.",
    features: [
      "Cushioned seat and back",
      "White or Plaid",
      "An unusual patterned option"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc12", name: "Transparent Shell Chair", cat: "Living Room", room: "Living Room", price: 3656, memberPrice: 3290, sku: "SH-10400", tag: "New", ph: "", img: "assets/products/oc12.webp",
    imgs: ["assets/products/oc12.webp", "assets/products/oc12-2.webp", "assets/products/oc12-3.webp", "assets/products/oc12-4.webp", "assets/products/oc12-5.webp"],
    sizes: [{ label: "Green", price: 3656 }, { label: "Clear", price: 3656 }, { label: "Tan + White", price: 3656 }],
    desc: "A clear shell in green, clear or tan and white. It takes up visual space without filling the room.",
    features: [
      "Transparent shell",
      "Green, Clear, or Tan + White",
      "Fills a gap without blocking light"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Steel / metal", "Options": "3", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Avoid abrasive pads on plated or brushed finishes, and check the feet for floor protectors." },

  { id: "oc13", name: "Cushion Chair in Beige or Orange", cat: "Living Room", room: "Living Room", price: 3674, memberPrice: 3307, sku: "SH-10401", tag: "New", ph: "", img: "assets/products/oc13.webp",
    imgs: ["assets/products/oc13.webp", "assets/products/oc13-2.webp", "assets/products/oc13-3.webp", "assets/products/oc13-4.webp", "assets/products/oc13-5.webp"],
    sizes: [{ label: "Beige", price: 3674 }, { label: "Orange", price: 3674 }],
    desc: "Deeply cushioned, in beige or orange.",
    features: [
      "Deep cushioning",
      "Beige or Orange",
      "Soft, informal shape"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc14", name: "Snow White Chair with Optional Ottoman", cat: "Living Room", room: "Living Room", price: 3680, memberPrice: 3312, sku: "SH-10402", tag: "New", ph: "", img: "assets/products/oc14.webp",
    imgs: ["assets/products/oc14.webp", "assets/products/oc14-2.webp", "assets/products/oc14-3.webp", "assets/products/oc14-4.webp", "assets/products/oc14-5.webp"],
    sizes: [{ label: "Snow White / - Ottoman", price: 3680 }, { label: "Snow White / + Ottoman", price: 4941 }],
    desc: "Snow white, with or without the matching ottoman. Buy the ottoman: it changes how long you sit there.",
    features: [
      "Snow White upholstery",
      "With or without ottoman",
      "Made for long sitting"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc15", name: "Lambswool Chair in White & Black", cat: "Living Room", room: "Living Room", price: 3685, memberPrice: 3316, sku: "SH-10403", tag: "New", ph: "", img: "assets/products/oc15.webp",
    imgs: ["assets/products/oc15.webp", "assets/products/oc15-2.webp", "assets/products/oc15-3.webp", "assets/products/oc15-4.webp", "assets/products/oc15-5.webp"],
    sizes: [{ label: "White + Black", price: 3685 }],
    desc: "Lambswool in white with black detail, warm to the touch in a way flat fabric never is.",
    features: [
      "Lambswool upholstery",
      "White with black detail",
      "Warm, tactile surface"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Wool / lambswool", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum gently and air it rather than washing. Blot spills straight away, and keep it out of prolonged damp." },

  { id: "oc16", name: "Monochrome Occasional Chair", cat: "Living Room", room: "Living Room", price: 3693, memberPrice: 3324, sku: "SH-10404", tag: "New", ph: "", img: "assets/products/oc16.webp",
    imgs: ["assets/products/oc16.webp", "assets/products/oc16-2.webp", "assets/products/oc16-3.webp", "assets/products/oc16-4.webp", "assets/products/oc16-5.webp"],
    sizes: [{ label: "White", price: 3693 }, { label: "Black", price: 3693 }],
    desc: "White or black, nothing else to decide.",
    features: [
      "White or Black",
      "Simple contemporary shape",
      "Suits most rooms"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc17", name: "Velvet Chair in Six Colours", cat: "Living Room", room: "Living Room", price: 3920, memberPrice: 3528, sku: "SH-10405", tag: "New", ph: "", img: "assets/products/oc17.webp",
    imgs: ["assets/products/oc17.webp", "assets/products/oc17-2.webp", "assets/products/oc17-3.webp", "assets/products/oc17-4.webp", "assets/products/oc17-5.webp"],
    sizes: [{ label: "Ivory", price: 3920 }, { label: "Orange", price: 3920 }, { label: "Blue", price: 3920 }, { label: "Green", price: 3920 }, { label: "Pink", price: 3920 }, { label: "Grey", price: 3920 }],
    desc: "Velvet in ivory, orange, blue, green, pink or grey, which is the broadest colour choice in the range.",
    features: [
      "Velvet upholstery",
      "Six colourways",
      "A colour-led accent chair"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Velvet", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "oc18", name: "Velvet & Timber Chair", cat: "Living Room", room: "Living Room", price: 3952, memberPrice: 3557, sku: "SH-10406", tag: "New", ph: "", img: "assets/products/oc18.webp",
    imgs: ["assets/products/oc18.webp", "assets/products/oc18-2.webp", "assets/products/oc18-3.webp", "assets/products/oc18-4.webp", "assets/products/oc18-5.webp"],
    sizes: [{ label: "White", price: 3952 }, { label: "Green", price: 3952 }, { label: "Orange", price: 3952 }],
    desc: "Velvet on a timber frame in white, green or orange.",
    features: [
      "Velvet on a timber frame",
      "White, Green or Orange",
      "Cushioned seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Velvet", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "oc19", name: "Off White Cushion Chair", cat: "Living Room", room: "Living Room", price: 4130, memberPrice: 3717, sku: "SH-10407", tag: "New", ph: "", img: "assets/products/oc19.webp",
    imgs: ["assets/products/oc19.webp", "assets/products/oc19-2.webp", "assets/products/oc19-3.webp", "assets/products/oc19-4.webp"],
    sizes: [{ label: "Off White", price: 4130 }],
    desc: "A single off white chair, softly cushioned, that disappears politely into a room.",
    features: [
      "Off White upholstery",
      "Soft cushioning",
      "Quiet, unobtrusive shape"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc20", name: "Leather Swivel Chair", cat: "Living Room", room: "Living Room", price: 4135, memberPrice: 3722, sku: "SH-10408", tag: "New", ph: "", img: "assets/products/oc20.webp",
    imgs: ["assets/products/oc20.webp", "assets/products/oc20-2.webp", "assets/products/oc20-3.webp", "assets/products/oc20-4.webp", "assets/products/oc20-5.webp"],
    sizes: [{ label: "Beige", price: 4135 }],
    desc: "Beige leather on a swivel base, so it turns between the television and the conversation.",
    features: [
      "Genuine leather",
      "Swivel base",
      "Beige colourway"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc21", name: "Leather & Steel Chair", cat: "Living Room", room: "Living Room", price: 4137, memberPrice: 3723, sku: "SH-10409", tag: "New", ph: "", img: "assets/products/oc21.webp",
    imgs: ["assets/products/oc21.webp", "assets/products/oc21-2.webp", "assets/products/oc21-3.webp", "assets/products/oc21-4.webp", "assets/products/oc21-5.webp"],
    sizes: [{ label: "Off White", price: 4137 }],
    desc: "Off white leather on steel, structured rather than soft.",
    features: [
      "Leather on a steel frame",
      "Off White",
      "Structured, upright seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc22", name: "Ivory or Black Occasional Chair", cat: "Living Room", room: "Living Room", price: 4141, memberPrice: 3727, sku: "SH-10410", tag: "New", ph: "", img: "assets/products/oc22.webp",
    imgs: ["assets/products/oc22.webp", "assets/products/oc22-2.webp", "assets/products/oc22-3.webp", "assets/products/oc22-4.webp", "assets/products/oc22-5.webp"],
    sizes: [{ label: "Ivory", price: 4141 }, { label: "Black", price: 4141 }],
    desc: "Ivory or black, in a plain contemporary shape.",
    features: [
      "Ivory or Black",
      "Contemporary silhouette",
      "Everyday upholstery"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc23", name: "Linen & Metal Chair", cat: "Living Room", room: "Living Room", price: 4259, memberPrice: 3833, sku: "SH-10411", tag: "New", ph: "", img: "assets/products/oc23.webp",
    imgs: ["assets/products/oc23.webp", "assets/products/oc23-2.webp", "assets/products/oc23-3.webp", "assets/products/oc23-4.webp", "assets/products/oc23-5.webp"],
    sizes: [{ label: "Khaki", price: 4259 }, { label: "Brown", price: 4259 }],
    desc: "Linen and cotton over metal, in khaki or brown. Natural fabric against a hard frame.",
    features: [
      "Linen and cotton upholstery",
      "Metal frame",
      "Khaki or Brown"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc24", name: "Two-Tone Swivel Chair", cat: "Living Room", room: "Living Room", price: 4343, memberPrice: 3909, sku: "SH-10412", tag: "New", ph: "", img: "assets/products/oc24.webp",
    imgs: ["assets/products/oc24.webp", "assets/products/oc24-2.webp", "assets/products/oc24-3.webp", "assets/products/oc24-4.webp", "assets/products/oc24-5.webp"],
    sizes: [{ label: "Ivory/grey", price: 4343 }],
    desc: "Ivory and grey on a swivel base.",
    features: [
      "Swivel base",
      "Ivory and grey",
      "Turns through a full circle"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc25", name: "Occasional Chair in Five Colours", cat: "Living Room", room: "Living Room", price: 4350, memberPrice: 3915, sku: "SH-10413", tag: "New", ph: "", img: "assets/products/oc25.webp",
    imgs: ["assets/products/oc25.webp", "assets/products/oc25-2.webp", "assets/products/oc25-3.webp", "assets/products/oc25-4.webp", "assets/products/oc25-5.webp"],
    sizes: [{ label: "Snow White", price: 4350 }, { label: "Grey", price: 4350 }, { label: "Charcoal Grey", price: 4350 }, { label: "Khaki Green", price: 4350 }, { label: "Midnight Blue", price: 4350 }, { label: "Tan", price: 4350 }],
    desc: "Snow white, grey, charcoal, khaki green or midnight blue. Midnight blue is the one people don't expect.",
    features: [
      "Five colourways",
      "Including midnight blue and khaki green",
      "Soft upholstered seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc26", name: "Bouclé Chair with Timber Frame", cat: "Living Room", room: "Living Room", price: 4365, memberPrice: 3928, sku: "SH-10414", tag: "New", ph: "", img: "assets/products/oc26.webp",
    imgs: ["assets/products/oc26.webp", "assets/products/oc26-2.webp", "assets/products/oc26-3.webp", "assets/products/oc26-4.webp", "assets/products/oc26-5.webp"],
    desc: "Bouclé on timber, cushioned, in a single considered finish.",
    features: [
      "Bouclé on a timber frame",
      "Cushioned seat",
      "One finish"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Bouclé", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "oc27", name: "Tan Occasional Chair", cat: "Living Room", room: "Living Room", price: 4380, memberPrice: 3942, sku: "SH-10415", tag: "New", ph: "", img: "assets/products/oc27.webp",
    imgs: ["assets/products/oc27.webp", "assets/products/oc27-2.webp", "assets/products/oc27-3.webp", "assets/products/oc27-4.webp", "assets/products/oc27-5.webp"],
    sizes: [{ label: "Tan", price: 4380 }],
    desc: "A tan chair, warm and straightforward.",
    features: [
      "Tan upholstery",
      "Simple shape",
      "Warms a neutral room"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc28", name: "Metal Swing Chair", cat: "Living Room", room: "Living Room", price: 4406, memberPrice: 3965, sku: "SH-10416", tag: "New", ph: "", img: "assets/products/oc28.webp",
    imgs: ["assets/products/oc28.webp", "assets/products/oc28-2.webp", "assets/products/oc28-3.webp", "assets/products/oc28-4.webp", "assets/products/oc28-5.webp"],
    sizes: [{ label: "Black", price: 4406 }, { label: "Gold", price: 4406 }],
    desc: "A hanging swing chair in black or gold, for indoors or a covered balcony.",
    features: [
      "Hanging swing design",
      "Black or Gold metal",
      "Indoor or covered outdoor use"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Steel / metal", "Options": "2", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Avoid abrasive pads on plated or brushed finishes, and check the feet for floor protectors." },

  { id: "oc29", name: "Leather Chair in Eight Colours", cat: "Living Room", room: "Living Room", price: 4426, memberPrice: 3983, sku: "SH-10417", tag: "New", ph: "", img: "assets/products/oc29.webp",
    imgs: ["assets/products/oc29.webp", "assets/products/oc29-2.webp", "assets/products/oc29-3.webp", "assets/products/oc29-4.webp", "assets/products/oc29-5.webp"],
    sizes: [{ label: "Orange", price: 4426 }, { label: "Navy", price: 4426 }, { label: "Yellow", price: 4426 }, { label: "Pastel Blue", price: 4426 }, { label: "Tan", price: 4426 }, { label: "Ivory", price: 4426 }, { label: "Off White", price: 4426 }, { label: "Peacock Blue", price: 4426 }, { label: "Black", price: 4426 }, { label: "Orange + Grey", price: 4426 }, { label: "Yellow + Black", price: 4426 }],
    desc: "Leather in orange, navy, yellow, pastel blue, tan, ivory and more. Rarely do you get this many leather colours.",
    features: [
      "Genuine leather",
      "Eight colourways",
      "Bright options as well as neutrals"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "11", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc30", name: "Upholstered Corner Seat", cat: "Living Room", room: "Living Room", price: 4507, memberPrice: 4056, sku: "SH-10418", tag: "New", ph: "", img: "assets/products/oc30.webp",
    imgs: ["assets/products/oc30.webp", "assets/products/oc30-2.jpg", "assets/products/oc30-3.webp", "assets/products/oc30-4.webp", "assets/products/oc30-5.webp"],
    sizes: [{ label: "Snow White", price: 4507 }, { label: "Light Pink", price: 4507 }],
    desc: "A corner seat in snow white or light pink, for the corner that never had the right furniture.",
    features: [
      "Designed for a corner",
      "Snow White or Light Pink",
      "Cushioned seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc31", name: "Deep Orange Statement Chair", cat: "Living Room", room: "Living Room", price: 4565, memberPrice: 4108, sku: "SH-10419", tag: "New", ph: "", img: "assets/products/oc31.webp",
    imgs: ["assets/products/oc31.webp", "assets/products/oc31-2.webp", "assets/products/oc31-3.webp", "assets/products/oc31-4.webp", "assets/products/oc31-5.webp"],
    sizes: [{ label: "Deep Orange/Red", price: 4565 }],
    desc: "One chair, one colour: a deep orange-red that does the decorating for you.",
    features: [
      "Deep orange-red",
      "A single statement colour",
      "Soft upholstered seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc32", name: "Timber Swing Chair", cat: "Living Room", room: "Living Room", price: 4733, memberPrice: 4260, sku: "SH-10420", tag: "New", ph: "", img: "assets/products/oc32.webp",
    imgs: ["assets/products/oc32.webp", "assets/products/oc32-2.webp", "assets/products/oc32-3.webp", "assets/products/oc32-4.webp", "assets/products/oc32-5.webp"],
    sizes: [{ label: "120cm x 50cm", price: 4733 }, { label: "120cm x 60cm", price: 5181 }, { label: "140cm x 50cm", price: 5285 }, { label: "120cm x 70cm", price: 5556 }, { label: "140cm x 60cm", price: 5741 }, { label: "140cm x 70cm", price: 6444 }],
    desc: "A timber swing seat with cushions, in sizes from 120 x 50cm to 140cm wide. Big enough for two.",
    features: [
      "Timber frame with cushions",
      "Sizes from 120 x 50cm",
      "Seats one or two"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Solid timber", "Options": "6", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun and check the joints occasionally, tightening any fixings." },

  { id: "oc33", name: "Cream Bouclé Chair", cat: "Living Room", room: "Living Room", price: 4781, memberPrice: 4303, sku: "SH-10421", tag: "New", ph: "", img: "assets/products/oc33.webp",
    imgs: ["assets/products/oc33.webp", "assets/products/oc33-2.webp", "assets/products/oc33-3.webp", "assets/products/oc33-4.webp", "assets/products/oc33-5.webp"],
    sizes: [{ label: "Cream", price: 4781 }],
    desc: "Cream bouclé over timber, soft and unfussy.",
    features: [
      "Bouclé over timber",
      "Cream colourway",
      "Cushioned seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Bouclé", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "oc34", name: "Occasional Chair in Olive, White or Orange", cat: "Living Room", room: "Living Room", price: 4787, memberPrice: 4308, sku: "SH-10422", tag: "New", ph: "", img: "assets/products/oc34.webp",
    imgs: ["assets/products/oc34.webp", "assets/products/oc34-2.webp", "assets/products/oc34-3.webp", "assets/products/oc34-4.webp", "assets/products/oc34-5.webp"],
    sizes: [{ label: "Olive", price: 4787 }, { label: "White", price: 4787 }, { label: "Orange", price: 4787 }],
    desc: "Three colours, olive being the most interesting of them.",
    features: [
      "Olive, White or Orange",
      "Upholstered seat and back",
      "Contemporary shape"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc35", name: "Chair with Optional Foot Stool", cat: "Living Room", room: "Living Room", price: 4889, memberPrice: 4400, sku: "SH-10423", tag: "New", ph: "", img: "assets/products/oc35.webp",
    imgs: ["assets/products/oc35.webp", "assets/products/oc35-2.webp", "assets/products/oc35-3.webp", "assets/products/oc35-4.webp", "assets/products/oc35-5.webp"],
    sizes: [{ label: "Tan / - Foot Stool", price: 4889 }, { label: "Green / - Foot Stool", price: 4889 }, { label: "White / - Foot Stool", price: 4889 }, { label: "Tan / + Foot Stool", price: 6556 }, { label: "Green / + Foot Stool", price: 6556 }, { label: "White / + Foot Stool", price: 6556 }],
    desc: "Tan or green, with or without the foot stool.",
    features: [
      "Tan or Green",
      "With or without foot stool",
      "Relaxed lounge seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc36", name: "Off White Steel-Frame Chair", cat: "Living Room", room: "Living Room", price: 4915, memberPrice: 4424, sku: "SH-10424", tag: "New", ph: "", img: "assets/products/oc36.webp",
    imgs: ["assets/products/oc36.webp", "assets/products/oc36-2.webp", "assets/products/oc36-3.webp", "assets/products/oc36-4.webp", "assets/products/oc36-5.webp"],
    sizes: [{ label: "Off White", price: 4915 }],
    desc: "Off white cushions on a steel frame.",
    features: [
      "Steel frame",
      "Off White cushions",
      "Slim and light"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Steel / metal", "Options": "1", "Room": "Living / Indoor" },
    care: "Wipe with a soft, damp cloth and dry. Avoid abrasive pads on plated or brushed finishes, and check the feet for floor protectors." },

  { id: "oc37", name: "Velvet Chair on Stainless Steel", cat: "Living Room", room: "Living Room", price: 4924, memberPrice: 4432, sku: "SH-10425", tag: "New", ph: "", img: "assets/products/oc37.webp",
    imgs: ["assets/products/oc37.webp", "assets/products/oc37-2.webp", "assets/products/oc37-3.webp", "assets/products/oc37-4.webp", "assets/products/oc37-5.webp"],
    sizes: [{ label: "White", price: 4924 }, { label: "Green", price: 4924 }, { label: "Brown", price: 4924 }, { label: "Light Green", price: 4924 }, { label: "Beige", price: 4924 }],
    desc: "Velvet on stainless steel in five colours, from white through to a soft light green.",
    features: [
      "Velvet on stainless steel",
      "Five colourways",
      "Polished metal base"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Velvet", "Options": "5", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "oc38", name: "Gold & Cream Velvet Chair", cat: "Living Room", room: "Living Room", price: 4939, memberPrice: 4445, sku: "SH-10426", tag: "New", ph: "", img: "assets/products/oc38.webp",
    imgs: ["assets/products/oc38.webp", "assets/products/oc38-2.webp", "assets/products/oc38-3.webp", "assets/products/oc38-4.webp", "assets/products/oc38-5.webp"],
    sizes: [{ label: "Gold + Cream", price: 4939 }],
    desc: "Cream velvet on gold stainless steel. Unashamedly decorative.",
    features: [
      "Cream velvet, gold steel",
      "Decorative accent chair",
      "Single colourway"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Velvet", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "oc39", name: "Ivory Occasional Chair", cat: "Living Room", room: "Living Room", price: 4944, memberPrice: 4450, sku: "SH-10427", tag: "New", ph: "", img: "assets/products/oc39.webp",
    imgs: ["assets/products/oc39.webp", "assets/products/oc39-2.webp", "assets/products/oc39-3.webp", "assets/products/oc39-4.webp", "assets/products/oc39-5.webp"],
    sizes: [{ label: "Ivory", price: 4944 }],
    desc: "A plain ivory chair, soft and quiet.",
    features: [
      "Ivory upholstery",
      "Soft seat",
      "Understated"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc40", name: "Leather Chair in Seven Colours", cat: "Living Room", room: "Living Room", price: 4963, memberPrice: 4467, sku: "SH-10428", tag: "New", ph: "", img: "assets/products/oc40.webp",
    imgs: ["assets/products/oc40.webp", "assets/products/oc40-2.webp", "assets/products/oc40-3.webp", "assets/products/oc40-4.webp", "assets/products/oc40-5.webp"],
    sizes: [{ label: "Black", price: 4963 }, { label: "Pink", price: 4963 }, { label: "Khaki", price: 4963 }, { label: "Grey", price: 4963 }, { label: "White", price: 4963 }, { label: "Chocolate", price: 4963 }, { label: "Orange", price: 4963 }],
    desc: "Leather over timber in seven colours, from black and chocolate through to pink and khaki.",
    features: [
      "Leather over timber",
      "Seven colourways",
      "Cushioned seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "7", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc41", name: "Ash & Fabric Occasional Chair", cat: "Living Room", room: "Living Room", price: 5093, memberPrice: 4584, sku: "SH-10429", tag: "New", ph: "", img: "assets/products/oc41.webp",
    imgs: ["assets/products/oc41.webp", "assets/products/oc41-2.webp", "assets/products/oc41-3.webp", "assets/products/oc41-4.webp", "assets/products/oc41-5.webp"],
    desc: "Fabric on an ash timber frame, cushioned.",
    features: [
      "Ash timber frame",
      "Fabric upholstery",
      "Cushioned seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun and check the joints occasionally, tightening any fixings." },

  { id: "oc42", name: "Coffee-Toned Cushion Chair", cat: "Living Room", room: "Living Room", price: 5135, memberPrice: 4622, sku: "SH-10430", tag: "New", ph: "", img: "assets/products/oc42.webp",
    imgs: ["assets/products/oc42.webp", "assets/products/oc42-2.webp", "assets/products/oc42-3.webp", "assets/products/oc42-4.webp", "assets/products/oc42-5.webp"],
    sizes: [{ label: "Coffee", price: 5135 }],
    desc: "A deep coffee colour, heavily cushioned.",
    features: [
      "Coffee colourway",
      "Deeply cushioned",
      "Soft, enveloping seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc43", name: "Army Green Swivel Chair", cat: "Living Room", room: "Living Room", price: 5148, memberPrice: 4633, sku: "SH-10431", tag: "New", ph: "", img: "assets/products/oc43.webp",
    imgs: ["assets/products/oc43.webp", "assets/products/oc43-2.webp", "assets/products/oc43-3.webp", "assets/products/oc43-4.webp", "assets/products/oc43-5.webp"],
    sizes: [{ label: "Army Green", price: 5148 }],
    desc: "A swivel chair in army green, which is far easier to live with than it sounds.",
    features: [
      "Swivel base",
      "Army green",
      "Turns to face the room"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc44", name: "Occasional Chair in Burnt Orange", cat: "Living Room", room: "Living Room", price: 5178, memberPrice: 4660, sku: "SH-10432", tag: "New", ph: "", img: "assets/products/oc44.webp",
    imgs: ["assets/products/oc44.webp", "assets/products/oc44-2.webp", "assets/products/oc44-3.webp", "assets/products/oc44-4.webp", "assets/products/oc44-5.webp"],
    sizes: [{ label: "Burnt Orange", price: 5178 }, { label: "Emerald Green", price: 5178 }, { label: "Grey", price: 5178 }, { label: "Ocean Green", price: 5178 }, { label: "White", price: 5178 }],
    desc: "Burnt orange, emerald green, grey, ocean green or white.",
    features: [
      "Five colourways",
      "Burnt orange and emerald green options",
      "Upholstered seat and back"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "5", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc45", name: "Velvet Chair with Oak Legs", cat: "Living Room", room: "Living Room", price: 5202, memberPrice: 4682, sku: "SH-10433", tag: "New", ph: "", img: "assets/products/oc45.webp",
    imgs: ["assets/products/oc45.webp", "assets/products/oc45-2.webp", "assets/products/oc45-3.webp", "assets/products/oc45-4.webp", "assets/products/oc45-5.webp"],
    sizes: [{ label: "Army Green", price: 5202 }, { label: "Yellow", price: 5202 }, { label: "Orange", price: 5202 }, { label: "Purple Pink", price: 5202 }, { label: "Off-White", price: 5202 }, { label: "Grey", price: 5202 }, { label: "Black", price: 5202 }, { label: "Dark Green", price: 5202 }],
    desc: "Velvet on oak, in army green, yellow, orange, purple pink, off white and grey.",
    features: [
      "Velvet on oak legs",
      "Six colourways",
      "Bold and neutral options"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Velvet", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "oc46", name: "Ivory Wool Chair", cat: "Living Room", room: "Living Room", price: 5306, memberPrice: 4775, sku: "SH-10434", tag: "New", ph: "", img: "assets/products/oc46.webp",
    imgs: ["assets/products/oc46.webp", "assets/products/oc46-2.webp", "assets/products/oc46-3.webp", "assets/products/oc46-4.webp", "assets/products/oc46-5.webp"],
    sizes: [{ label: "Ivory", price: 5306 }],
    desc: "Wool in ivory, warm and textural.",
    features: [
      "Wool upholstery",
      "Ivory colourway",
      "Warm texture"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Wool / lambswool", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum gently and air it rather than washing. Blot spills straight away, and keep it out of prolonged damp." },

  { id: "oc47", name: "Leather Cushion Chair", cat: "Living Room", room: "Living Room", price: 5324, memberPrice: 4792, sku: "SH-10435", tag: "New", ph: "", img: "assets/products/oc47.webp",
    imgs: ["assets/products/oc47.webp", "assets/products/oc47-2.webp", "assets/products/oc47-3.webp", "assets/products/oc47-4.webp", "assets/products/oc47-5.webp"],
    desc: "Leather with deep cushions, one finish, no decisions.",
    features: [
      "Genuine leather",
      "Deeply cushioned",
      "Single finish"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc48", name: "Bouclé Chair with Ash & Metal Frame", cat: "Living Room", room: "Living Room", price: 5519, memberPrice: 4967, sku: "SH-10436", tag: "New", ph: "", img: "assets/products/oc48.webp",
    imgs: ["assets/products/oc48.webp", "assets/products/oc48-2.webp", "assets/products/oc48-3.webp", "assets/products/oc48-4.webp", "assets/products/oc48-5.webp"],
    sizes: [{ label: "Black", price: 5519 }, { label: "Beige", price: 5519 }, { label: "Caramel", price: 5519 }],
    desc: "Bouclé on ash and metal, in black, beige or caramel.",
    features: [
      "Bouclé on ash and metal",
      "Black, Beige or Caramel",
      "Structured frame"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Bouclé", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "oc49", name: "Chocolate or Black Cushion Chair", cat: "Living Room", room: "Living Room", price: 5533, memberPrice: 4980, sku: "SH-10437", tag: "New", ph: "", img: "assets/products/oc49.webp",
    imgs: ["assets/products/oc49.webp", "assets/products/oc49-2.webp", "assets/products/oc49-3.webp", "assets/products/oc49-4.webp", "assets/products/oc49-5.webp"],
    sizes: [{ label: "Chocolate", price: 5533 }, { label: "Black", price: 5533 }],
    desc: "Deeply cushioned, in chocolate or black.",
    features: [
      "Chocolate or Black",
      "Deep cushioning",
      "Dark, grounding colours"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc50", name: "Leather Chair in Four Colours", cat: "Living Room", room: "Living Room", price: 5533, memberPrice: 4980, sku: "SH-10438", tag: "New", ph: "", img: "assets/products/oc50.webp",
    imgs: ["assets/products/oc50.webp", "assets/products/oc50-2.webp", "assets/products/oc50-3.webp", "assets/products/oc50-4.webp", "assets/products/oc50-5.webp"],
    sizes: [{ label: "Navy", price: 5533 }, { label: "Orange", price: 5533 }, { label: "Brown", price: 5533 }, { label: "Black", price: 5533 }],
    desc: "Leather in navy, orange, brown or black.",
    features: [
      "Genuine leather",
      "Four colourways",
      "Classic accent chair"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc51", name: "Lounge Chair with Optional Stool", cat: "Living Room", room: "Living Room", price: 5741, memberPrice: 5167, sku: "SH-10439", tag: "New", ph: "", img: "assets/products/oc51.webp",
    imgs: ["assets/products/oc51.webp", "assets/products/oc51-2.webp", "assets/products/oc51-3.webp", "assets/products/oc51-4.webp", "assets/products/oc51-5.webp"],
    sizes: [{ label: "- Foot Stool", price: 5741 }, { label: "+ Foot Stool", price: 6791 }],
    desc: "With or without the foot stool. The stool makes it a reading chair rather than a sitting one.",
    features: [
      "With or without foot stool",
      "Relaxed lounge proportions",
      "Soft upholstery"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc52", name: "Bouclé & Leather Chair on Steel", cat: "Living Room", room: "Living Room", price: 5809, memberPrice: 5228, sku: "SH-10440", tag: "New", ph: "", img: "assets/products/oc52.webp",
    imgs: ["assets/products/oc52.webp", "assets/products/oc52-2.webp", "assets/products/oc52-3.webp", "assets/products/oc52-4.webp", "assets/products/oc52-5.webp"],
    sizes: [{ label: "Black", price: 5809 }, { label: "Orange", price: 5809 }],
    desc: "Bouclé with leather on stainless steel, in black or orange.",
    features: [
      "Bouclé with leather detail",
      "Stainless steel frame",
      "Black or Orange"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Bouclé", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills. Trim any snagged loop with scissors rather than pulling it." },

  { id: "oc53", name: "Leather Chair on Stainless Steel", cat: "Living Room", room: "Living Room", price: 6109, memberPrice: 5498, sku: "SH-10441", tag: "New", ph: "", img: "assets/products/oc53.webp",
    imgs: ["assets/products/oc53.webp", "assets/products/oc53-2.webp", "assets/products/oc53-3.webp", "assets/products/oc53-4.webp", "assets/products/oc53-5.webp"],
    sizes: [{ label: "French Cream", price: 6109 }, { label: "Black", price: 6109 }, { label: "Emerald Green", price: 6109 }],
    desc: "Leather on stainless steel in French cream, black or emerald green.",
    features: [
      "Leather on stainless steel",
      "French Cream, Black or Emerald Green",
      "Cushioned seat"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc54", name: "Leather & Timber Lounge Chair", cat: "Living Room", room: "Living Room", price: 6109, memberPrice: 5498, sku: "SH-10442", tag: "New", ph: "", img: "assets/products/oc54.webp",
    imgs: ["assets/products/oc54.webp", "assets/products/oc54-2.webp", "assets/products/oc54-3.webp", "assets/products/oc54-4.webp", "assets/products/oc54-5.webp"],
    desc: "Leather on timber, cushioned, in one finish.",
    features: [
      "Leather over timber",
      "Cushioned seat",
      "Single finish"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc55", name: "Leather Chair, Four Neutrals", cat: "Living Room", room: "Living Room", price: 6250, memberPrice: 5625, sku: "SH-10443", tag: "New", ph: "", img: "assets/products/oc55.webp",
    imgs: ["assets/products/oc55.webp", "assets/products/oc55-2.webp", "assets/products/oc55-3.webp", "assets/products/oc55-4.webp", "assets/products/oc55-5.webp"],
    sizes: [{ label: "Black", price: 6250 }, { label: "Grey", price: 6250 }, { label: "White", price: 6250 }, { label: "Tan", price: 6250 }],
    desc: "Leather in black, grey, white or tan: the four that go with everything.",
    features: [
      "Genuine leather",
      "Black, Grey, White or Tan",
      "Neutral palette"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc56", name: "Velvet Chair on Timber", cat: "Living Room", room: "Living Room", price: 6254, memberPrice: 5629, sku: "SH-10444", tag: "New", ph: "", img: "assets/products/oc56.webp",
    imgs: ["assets/products/oc56.webp", "assets/products/oc56-2.webp", "assets/products/oc56-3.webp", "assets/products/oc56-4.webp", "assets/products/oc56-5.webp"],
    sizes: [{ label: "Khaki", price: 6254 }, { label: "Creamy White", price: 6254 }, { label: "Grey", price: 6254 }],
    desc: "Velvet on timber in khaki, creamy white or grey.",
    features: [
      "Velvet on a timber frame",
      "Khaki, Creamy White or Grey",
      "Soft tailored shape"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Velvet", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "oc57", name: "Walnut Frame Occasional Chair", cat: "Living Room", room: "Living Room", price: 6406, memberPrice: 5765, sku: "SH-10445", tag: "New", ph: "", img: "assets/products/oc57.webp",
    imgs: ["assets/products/oc57.webp", "assets/products/oc57-2.webp", "assets/products/oc57-3.webp", "assets/products/oc57-4.webp", "assets/products/oc57-5.webp"],
    desc: "A walnut frame with cushions, dark timber doing the structural work.",
    features: [
      "Walnut frame",
      "Cushioned seat",
      "Single finish"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun and check the joints occasionally, tightening any fixings." },

  { id: "oc58", name: "Velvet Chair in Green, White or Blue", cat: "Living Room", room: "Living Room", price: 6411, memberPrice: 5770, sku: "SH-10446", tag: "New", ph: "", img: "assets/products/oc58.webp",
    imgs: ["assets/products/oc58.webp", "assets/products/oc58-2.webp", "assets/products/oc58-3.webp", "assets/products/oc58-4.webp", "assets/products/oc58-5.webp"],
    sizes: [{ label: "Green", price: 6411 }, { label: "Off White", price: 6411 }, { label: "Blue", price: 6411 }],
    desc: "Velvet in green, off white or blue.",
    features: [
      "Velvet upholstery",
      "Green, Off White or Blue",
      "Accent chair proportions"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Velvet", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile and blot spills rather than rubbing, since rubbing crushes the nap. Keep out of strong direct sun." },

  { id: "oc59", name: "Lambswool Chair on Timber", cat: "Living Room", room: "Living Room", price: 6644, memberPrice: 5980, sku: "SH-10447", tag: "New", ph: "", img: "assets/products/oc59.webp",
    imgs: ["assets/products/oc59.webp", "assets/products/oc59-2.webp", "assets/products/oc59-3.webp", "assets/products/oc59-4.webp", "assets/products/oc59-5.webp"],
    sizes: [{ label: "Beige", price: 6644 }],
    desc: "Lambswool on timber in beige, the warmest seat here.",
    features: [
      "Lambswool on timber",
      "Beige",
      "Very warm to sit in"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Wool / lambswool", "Options": "1", "Room": "Living / Indoor" },
    care: "Vacuum gently and air it rather than washing. Blot spills straight away, and keep it out of prolonged damp." },

  { id: "oc60", name: "Leather Rocking Chair", cat: "Living Room", room: "Living Room", price: 6806, memberPrice: 6125, sku: "SH-10448", tag: "New", ph: "", img: "assets/products/oc60.webp",
    imgs: ["assets/products/oc60.webp", "assets/products/oc60-2.webp", "assets/products/oc60-3.webp", "assets/products/oc60-4.webp", "assets/products/oc60-5.webp"],
    sizes: [{ label: "Cream", price: 6806 }],
    desc: "A cream leather rocking chair on a timber frame. Rare, and worth it beside a window.",
    features: [
      "Leather on a timber rocker",
      "Cream colourway",
      "Genuine rocking action"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc61", name: "Sculptural Chair in Three Colours", cat: "Living Room", room: "Living Room", price: 6809, memberPrice: 6128, sku: "SH-10449", tag: "New", ph: "", img: "assets/products/oc61.webp",
    imgs: ["assets/products/oc61.webp", "assets/products/oc61-2.webp", "assets/products/oc61-3.webp", "assets/products/oc61-4.webp", "assets/products/oc61-5.webp"],
    sizes: [{ label: "Black", price: 6809 }, { label: "Mustard", price: 6809 }, { label: "Snow White", price: 6809 }],
    desc: "A sculptural shape in black, mustard or snow white. Mustard is the brave one.",
    features: [
      "Sculptural silhouette",
      "Black, Mustard or Snow White",
      "A design-led accent chair"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc62", name: "Swivel Chair in Khaki, Navy or Orange", cat: "Living Room", room: "Living Room", price: 6887, memberPrice: 6198, sku: "SH-10450", tag: "New", ph: "", img: "assets/products/oc62.webp",
    imgs: ["assets/products/oc62.webp", "assets/products/oc62-2.webp", "assets/products/oc62-3.webp", "assets/products/oc62-4.webp", "assets/products/oc62-5.webp"],
    sizes: [{ label: "Khaki Green", price: 6887 }, { label: "Navy", price: 6887 }, { label: "Orange", price: 6887 }],
    desc: "A swivel chair in khaki green, navy or orange.",
    features: [
      "Swivel base",
      "Khaki Green, Navy or Orange",
      "Turns to face the room"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc63", name: "Two-Tone Leather Chair in Brown", cat: "Living Room", room: "Living Room", price: 6959, memberPrice: 6263, sku: "SH-10451", tag: "New", ph: "", img: "assets/products/oc63.webp",
    imgs: ["assets/products/oc63.webp", "assets/products/oc63-2.webp", "assets/products/oc63-3.webp", "assets/products/oc63-4.webp", "assets/products/oc63-5.webp"],
    sizes: [{ label: "White + Brown", price: 6959 }, { label: "Black + Brown", price: 6959 }],
    desc: "Leather in white and brown or black and brown.",
    features: [
      "Two-tone leather",
      "White + Brown or Black + Brown",
      "Structured shape"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "2", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc64", name: "Walnut & Cushion Lounge Chair", cat: "Living Room", room: "Living Room", price: 7204, memberPrice: 6484, sku: "SH-10452", tag: "New", ph: "", img: "assets/products/oc64.webp",
    imgs: ["assets/products/oc64.webp", "assets/products/oc64-2.webp", "assets/products/oc64-3.webp", "assets/products/oc64-4.webp", "assets/products/oc64-5.webp"],
    desc: "A walnut frame with deep cushions.",
    features: [
      "Walnut frame",
      "Deep cushions",
      "Single finish"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Solid timber", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun and check the joints occasionally, tightening any fixings." },

  { id: "oc65", name: "Ash Chair in Purple, Yellow or Beige", cat: "Living Room", room: "Living Room", price: 7204, memberPrice: 6484, sku: "SH-10453", tag: "New", ph: "", img: "assets/products/oc65.webp",
    imgs: ["assets/products/oc65.webp", "assets/products/oc65-2.webp", "assets/products/oc65-3.webp", "assets/products/oc65-4.webp", "assets/products/oc65-5.webp"],
    sizes: [{ label: "Royal Purple", price: 7204 }, { label: "Lemon Yellow", price: 7204 }, { label: "Cream Beige", price: 7204 }],
    desc: "Ash timber in royal purple, lemon yellow or cream beige. The colours are unusual and the better for it.",
    features: [
      "Ash timber",
      "Royal Purple, Lemon Yellow or Cream Beige",
      "Unusual colour range"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Solid timber", "Options": "3", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills promptly. Keep out of direct sun and check the joints occasionally, tightening any fixings." },

  { id: "oc66", name: "Leather & Walnut Chair", cat: "Living Room", room: "Living Room", price: 7370, memberPrice: 6633, sku: "SH-10454", tag: "New", ph: "", img: "assets/products/oc66.webp",
    imgs: ["assets/products/oc66.webp", "assets/products/oc66-2.webp", "assets/products/oc66-3.webp", "assets/products/oc66-4.webp", "assets/products/oc66-5.webp"],
    desc: "Leather on walnut, one finish, properly made.",
    features: [
      "Leather on walnut",
      "Single finish",
      "Solid timber frame"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "1", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  { id: "oc67", name: "Occasional Chair in Snow White or Charcoal", cat: "Living Room", room: "Living Room", price: 7659, memberPrice: 6893, sku: "SH-10455", tag: "New", ph: "", img: "assets/products/oc67.webp",
    imgs: ["assets/products/oc67.webp", "assets/products/oc67-2.webp", "assets/products/oc67-3.webp", "assets/products/oc67-4.webp", "assets/products/oc67-5.webp"],
    sizes: [{ label: "Snow White", price: 7659 }, { label: "Charcoal Grey", price: 7659 }],
    desc: "Snow white or charcoal grey.",
    features: [
      "Snow White or Charcoal Grey",
      "Upholstered seat and back",
      "Contemporary shape"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Upholstery fabric", "Options": "2", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately. Plump and rotate cushions so they wear evenly." },

  { id: "oc68", name: "Leather Chair with Optional Foot Stool", cat: "Living Room", room: "Living Room", price: 7759, memberPrice: 6983, sku: "SH-10456", tag: "New", ph: "", img: "assets/products/oc68.webp",
    imgs: ["assets/products/oc68.webp", "assets/products/oc68-2.webp", "assets/products/oc68-3.webp", "assets/products/oc68-4.webp", "assets/products/oc68-5.webp"],
    sizes: [{ label: "Brown / - Foot Stool", price: 7759 }, { label: "Black / - Foot Stool", price: 7759 }, { label: "Brown / + Foot Stool", price: 9611 }, { label: "Black / + Foot Stool", price: 9611 }],
    desc: "Brown or black leather, with or without the foot stool.",
    features: [
      "Genuine leather",
      "Brown or Black",
      "With or without foot stool"
    ],
    specs: { "Type": "Occasional chair", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills at once with a barely damp one. Keep out of direct sun and away from heaters, which dry and crack hide. Condition once or twice a year." },

  // ── Outdoor ──
  { id: "od01", name: "Steel Fire Pit with Built-In Log Store", cat: "Outdoor", room: "Outdoor", price: 7104, memberPrice: 6394, sku: "SH-10116", tag: "New", ph: "", img: "assets/products/od01.jpg",
    imgs: ["assets/products/od01.jpg", "assets/products/od01-2.jpg", "assets/products/od01-3.jpg", "assets/products/od01-4.jpg", "assets/products/od01-5.jpg", "assets/products/od01-6.webp", "assets/products/od01-7.webp", "assets/products/od01-8.webp"],
    sizes: [{ label: "80cm", price: 7104 }, { label: "90cm", price: 7443 }, { label: "100cm", price: 8180 }, { label: "120cm", price: 9815 }, { label: "150cm", price: 11611 }],
    desc: "The reason everyone ends up outside. A broad steel fire bowl sits at the centre of a sculptural low table, with the firewood stacked in the open curve beneath it, so the fuel is part of the design rather than something to hide. The surround gives you somewhere to rest drinks, a board or a hand while the fire does the work. Stainless steel under a textured, heat-resistant black powder coat, built to live outside through an Australian winter. Five diameters, from 80cm for a courtyard to 150cm for a lawn that gathers a crowd, with matching seats sold separately.",
    features: [
      "Generous steel fire bowl that takes full-size logs, not kindling",
      "Open log store curved into the base, so the firewood is part of the look",
      "Flat surround for drinks, platters and warming hands",
      "Stainless steel with a textured, heat-resistant black powder coat",
      "Five diameters: 80, 90, 100, 120 and 150cm",
      "Matching seats available on request"
    ],
    specs: { "Type": "Wood-burning fire pit", "Material": "Stainless steel", "Finish": "Textured heat-resistant black powder coat", "Fuel": "Firewood", "Sizes": "80 / 90 / 100 / 120 / 150cm", "Use": "Outdoor only" },
    care: "Let the pit cool completely, then empty the ash so it doesn't hold moisture against the steel. Wipe the surround with a damp cloth. Cover it or store it under shelter through long wet spells, and keep it on a non-combustible surface, clear of decking, fences and anything overhanging." },

  { id: "od02", name: "Caged Solar Garden Lantern", cat: "Outdoor", room: "Outdoor", price: 830, memberPrice: 747, sku: "SH-10117", tag: "New", ph: "", img: "assets/products/od02.jpg",
    imgs: ["assets/products/od02.jpg", "assets/products/od02-2.jpg", "assets/products/od02-3.jpg", "assets/products/od02-4.jpg", "assets/products/od02-5.webp", "assets/products/od02-6.jpg", "assets/products/od02-7.webp"],
    sizes: [{ label: "Small", price: 830 }, { label: "Medium", price: 1015 }, { label: "Large", price: 1200 }],
    colours: [{ name: "Warm White", hex: "#f2e4c4" }],
    desc: "A slender cage of stainless steel ribs around a column of warm light, charged by the sun and switched on by the dusk. No cable to run, no socket to find, so it can stand where you actually want light: along a path, beside the steps, at the end of a daybed, in a planter among the greenery. The frame is weather-resistant and heavy enough not to wander in the wind, and the glow is warm rather than blue-white, so an evening outside still feels like an evening. Three sizes, lovely in a row or in a cluster of mixed heights.",
    features: [
      "Solar powered, charges by day and lights itself at dusk",
      "Warm white light, not the cold blue of most garden solar",
      "Stainless steel birdcage frame, weather resistant",
      "No wiring, so it can stand anywhere you like",
      "Three sizes: Small, Medium and Large",
      "Group different heights together, or line a path with one size"
    ],
    specs: { "Type": "Solar lantern", "Frame": "Stainless steel", "Light": "Warm white LED", "Power": "Solar, no wiring required", "Sizes": "Small / Medium / Large", "Use": "Outdoor" },
    care: "Wipe the solar panel on the lid clear of dust and leaves now and then, since a dirty panel is the usual reason a solar light dims. Clean the frame with a damp cloth. In a long run of grey days, move it somewhere brighter to charge." },

  { id: "od03", name: "Rattan Outdoor Lounge Chair, Ottoman & Side Table", cat: "Outdoor", room: "Outdoor", price: 1050, memberPrice: 945, sku: "SH-10118", tag: "New", ph: "", img: "assets/products/od03.jpg",
    imgs: ["assets/products/od03.jpg", "assets/products/od03-2.jpg", "assets/products/od03-3.jpg", "assets/products/od03-4.jpg", "assets/products/od03-5.webp", "assets/products/od03-6.webp", "assets/products/od03-7.webp"],
    sizes: [{ label: "Ottoman", price: 1050 }, { label: "Chair", price: 2752 }, { label: "Side table", price: 3072 }],
    desc: "Built for the balcony, the courtyard and the shady corner that never quite had the right chair. This setting is woven in weather-resistant rattan over a steel frame, with a high curved back that cradles your shoulders and a seat deep enough to stay in. The ottoman slides under when you want the floor back, and doubles as a low table for a drink and a book. Buy the chair on its own, add the ottoman for proper lounging, or take all three and have a corner that's finished.",
    features: [
      "Weather-resistant woven rattan over a steel frame",
      "High curved back shaped for long sitting, not perching",
      "Ottoman tucks under the chair and doubles as a low table",
      "Pieces sold separately: chair, ottoman and side table",
      "Light enough to move into the shade as the sun comes round",
      "Suits balconies and courtyards where space is tight"
    ],
    specs: { "Type": "Outdoor lounge chair, ottoman and table", "Weave": "Weather-resistant rattan", "Frame": "Steel", "Sold as": "Individual pieces", "Use": "Outdoor, covered or open" },
    care: "Hose the weave down and let it dry in the air. Wipe spills before they dry into the rattan. Under long sun or heavy rain, a cover or a spot under the eaves will add years to it. Cushions, where used, should come inside when wet." },

  { id: "od04", name: "Teak & Metal Outdoor Dining Collection", cat: "Outdoor", room: "Outdoor", price: 1333, memberPrice: 1200, sku: "SH-10119", tag: "New", ph: "", img: "assets/products/od04.jpg",
    imgs: ["assets/products/od04.jpg", "assets/products/od04-2.jpg", "assets/products/od04-3.jpg", "assets/products/od04-4.jpg", "assets/products/od04-5.webp", "assets/products/od04-6.webp", "assets/products/od04-7.webp", "assets/products/od04-8.webp"],
    sizes: [{ label: "Chair", price: 1333 }, { label: "Round table", price: 5778 }, { label: "Square table", price: 5778 }, { label: "Dining table 160cm", price: 9565 }, { label: "Dining table 220cm", price: 10500 }, { label: "Dining table 260cm", price: 11074 }],
    desc: "Solid teak over a steel base, which is the combination that survives summers outside and still looks good doing it. The timber is warm and open-grained, the kind that silvers gracefully if you let it, and the metal base keeps the whole table steady on decking or pavers. Choose the shape your space wants: a round or square table for four, or a long dining table at 160, 220 or 260cm for the gatherings that run past dark. Chairs are priced individually, so you buy exactly the number you seat.",
    features: [
      "Premium solid teak top with warm, open grain",
      "Steel base for stability on decking, pavers or lawn",
      "Round and square tables, plus 160, 220 and 260cm dining lengths",
      "Chairs sold individually, so you buy the number you need",
      "Teak weathers to a soft silver-grey, or keep the honey tone with oil",
      "Built for full outdoor use, year round"
    ],
    specs: { "Type": "Outdoor dining collection", "Top": "Solid teak timber", "Base": "Metal", "Table sizes": "Round / Square / 160cm / 220cm / 260cm", "Chairs": "Sold individually", "Use": "Outdoor" },
    care: "Left alone, teak fades to a silver-grey, which is natural and does no harm. To keep the honey colour, clean it and apply teak oil once or twice a year. Wipe spills promptly, especially oil and wine, and use a cover through the worst of winter." },

  { id: "od05", name: "Weatherproof Rattan Outdoor Lounge Collection", cat: "Outdoor", room: "Outdoor", price: 1313, memberPrice: 1182, sku: "SH-10120", tag: "New", ph: "", img: "assets/products/od05.jpg",
    imgs: ["assets/products/od05.jpg", "assets/products/od05-2.jpg", "assets/products/od05-3.jpg", "assets/products/od05-4.jpg", "assets/products/od05-5.jpg", "assets/products/od05-6.webp", "assets/products/od05-7.jpg", "assets/products/od05-8.webp"],
    colours: [{ name: "Chocolate", hex: "#4b3a2c" }, { name: "Beige", hex: "#cdbfa6" }],
    sizes: [{ label: "Footstool", price: 1313 }, { label: "Chair", price: 1846 }, { label: "Sofa chair", price: 4172 }, { label: "Sun lounge", price: 7613 }, { label: "Two seater", price: 12485 }],
    desc: "A full outdoor living room you can build up a piece at a time. This collection is woven in weatherproof rattan over a sturdy frame, in a clean modern line that sits as happily by a pool as on a terrace. Start with a chair, add the deep sofa chair and footstool for the end of the day, stretch out on the sun lounge, or bring in the two seater when there's always someone staying. In chocolate for a darker, more grounded look, or beige to keep things light and coastal.",
    features: [
      "Weatherproof rattan weave over a sturdy frame",
      "Five pieces: chair, sofa chair, two seater, sun lounge and footstool",
      "Two colourways: Chocolate and Beige",
      "Build the setting up over time, a piece at a time",
      "Deep, relaxed seating made for long afternoons",
      "Clean modern lines that suit a pool, terrace or courtyard"
    ],
    specs: { "Type": "Outdoor lounge collection", "Weave": "Weatherproof rattan", "Pieces": "Chair, sofa chair, two seater, sun lounge, footstool", "Colours": "Chocolate, Beige", "Sold as": "Individual pieces", "Use": "Outdoor" },
    care: "Rinse the weave with fresh water and let it air dry, especially near salt water. Wipe spills before they dry in. Bring cushions inside when it rains, and cover or shelter the pieces through long wet or very hot spells." },

  { id: "od06", name: "Curved Sun Lounge with Sculptural Base", cat: "Outdoor", room: "Outdoor", price: 1961, memberPrice: 1765, sku: "SH-10121", tag: "New", ph: "", img: "assets/products/od06.jpg",
    imgs: ["assets/products/od06.jpg", "assets/products/od06-2.jpg", "assets/products/od06-3.jpg", "assets/products/od06-4.jpg", "assets/products/od06-5.webp"],
    sizes: [{ label: "Champagne Table", price: 1961 }, { label: "White Table", price: 1961 }, { label: "Champagne Lounge", price: 5500 }, { label: "White Lounge", price: 5500 }],
    desc: "A sun lounge with a curve to it, shaped so your back is supported whether you're reading or dozing. The hollow sculptural base lifts it off the ground and makes it look like a piece of furniture rather than a poolside afterthought, and the matching side table keeps a drink within arm's reach. In champagne or white, both of which sit well beside water and pale paving.",
    features: [
      "Curved, ergonomic frame shaped for long afternoons",
      "Sculptural hollow base that lifts the lounge off the ground",
      "Matching side table available separately",
      "Champagne or White",
      "Built for poolside and terrace use"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od07", name: "Grey Rattan Outdoor Sofa & Armchair Setting", cat: "Outdoor", room: "Outdoor", price: 4148, memberPrice: 3733, sku: "SH-10122", tag: "New", ph: "", img: "assets/products/od07.jpg",
    imgs: ["assets/products/od07.jpg", "assets/products/od07-2.jpg", "assets/products/od07-3.jpg", "assets/products/od07-4.jpg", "assets/products/od07-5.jpg", "assets/products/od07-6.jpg"],
    colours: [{ name: "Grey", hex: "#9a9892" }],
    sizes: [{ label: "Table", price: 4148 }, { label: "Chair", price: 5274 }, { label: "140cm Sofa", price: 6211 }, { label: "180cm Sofa", price: 9337 }],
    desc: "A grey rattan setting that does the whole corner: armchair, sofa in two lengths, and a table to pull between them. The weave is fine and even, the tone is a soft mid-grey rather than the orange-brown of cheaper rattan, and the proportions are generous enough that people stay put. Buy the pieces as your space allows.",
    features: [
      "Finely woven grey rattan over a sturdy frame",
      "Sofas in 140cm and 180cm, plus a matching armchair",
      "Coffee table sold separately",
      "Deep, relaxed seating proportions",
      "Suits a garden, patio or balcony"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od08", name: "Modular Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 2587, memberPrice: 2328, sku: "SH-10123", tag: "New", ph: "", img: "assets/products/od08.jpg",
    imgs: ["assets/products/od08.jpg", "assets/products/od08-2.jpg", "assets/products/od08-3.webp", "assets/products/od08-4.jpg", "assets/products/od08-5.webp", "assets/products/od08-6.webp"],
    sizes: [{ label: "Khaki - Table Option (B)", price: 2587 }, { label: "Grey - Table Option (B)", price: 2587 }, { label: "Khaki - Table Option (A)", price: 2631 }, { label: "Grey - Table Option (A)", price: 2631 }, { label: "Khaki - Single Seater", price: 5531 }, { label: "Grey - Single Seater", price: 5531 }, { label: "Khaki - Two Seater", price: 8556 }, { label: "Grey - Two Seater", price: 8556 }, { label: "Khaki - Three Seater", price: 11556 }, { label: "Grey - Three Seater", price: 11556 }],
    desc: "Clean-lined modular seating for an outdoor room you build yourself: single, two or three seater, with a choice of two tables. The frames are substantial, the cushions deep, and the khaki and grey colourways both sit quietly against greenery and stone. Start with a single seater and add as the space asks for it.",
    features: [
      "Single, two and three seater, plus two table designs",
      "Deep cushioned seating on a substantial frame",
      "Khaki or Grey",
      "Modular, so the setting can grow over time",
      "Contemporary lines that suit a courtyard or terrace"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "10" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od09", name: "Cushioned Outdoor Lounge Chair & Footstool", cat: "Outdoor", room: "Outdoor", price: 2217, memberPrice: 1995, sku: "SH-10124", tag: "New", ph: "", img: "assets/products/od09.jpg",
    imgs: ["assets/products/od09.jpg", "assets/products/od09-2.jpg", "assets/products/od09-3.jpg", "assets/products/od09-4.jpg", "assets/products/od09-5.webp", "assets/products/od09-6.webp"],
    sizes: [{ label: "Khaki Chair", price: 2217 }, { label: "Black Chair", price: 2217 }, { label: "Black Set", price: 3269 }, { label: "Khaki Set", price: 3269 }],
    desc: "A lounge chair with plush cushions and a quiet, timeless frame, the sort you end up reading in for an hour longer than you planned. Take the chair on its own, or the set with its matching footstool for a proper afternoon. Khaki or black, both easy to live with.",
    features: [
      "Plush cushions over a weather-resistant frame",
      "Chair alone, or the set with matching footstool",
      "Khaki or Black",
      "Timeless shape that suits a patio, balcony or garden",
      "Comfortable enough for reading, not just sitting"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od10", name: "Leaf-Shaped Sun Lounge", cat: "Outdoor", room: "Outdoor", price: 4146, memberPrice: 3731, sku: "SH-10125", tag: "New", ph: "", img: "assets/products/od10.jpg",
    imgs: ["assets/products/od10.jpg", "assets/products/od10-2.jpg", "assets/products/od10-3.jpg", "assets/products/od10-4.webp", "assets/products/od10-5.jpg"],
    sizes: [{ label: "Coffee / Small", price: 4146 }, { label: "Beige / Small", price: 4146 }, { label: "Coffee / Large", price: 4443 }, { label: "Beige / Large", price: 4443 }],
    desc: "Shaped after a leaf, which sounds fanciful until you lie on one: the curve holds your shoulders and knees exactly where they want to be. A sculptural piece that earns its spot by the pool or under a tree, in coffee or beige, and in two sizes so it suits the space you have.",
    features: [
      "Leaf-shaped frame that supports the whole body",
      "Sculptural enough to stand alone as a feature",
      "Two sizes: Small and Large",
      "Coffee or Beige",
      "Made for poolside, deck and garden"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od11", name: "Streamlined Outdoor Coffee Table", cat: "Outdoor", room: "Outdoor", price: 3102, memberPrice: 2792, sku: "SH-10126", tag: "New", ph: "", img: "assets/products/od11.jpg",
    imgs: ["assets/products/od11.jpg", "assets/products/od11-2.jpg", "assets/products/od11-3.jpg", "assets/products/od11-4.jpg", "assets/products/od11-5.webp", "assets/products/od11-6.webp"],
    colours: [{ name: "White", hex: "#f0ece4" }, { name: "Grey", hex: "#9a9892" }],
    desc: "A low, streamlined coffee table that gives an outdoor lounge its centre. The surface is broad enough for a tray, a stack of books and a pot of something green, and the simple silhouette keeps the focus on the seating around it. White or grey.",
    features: [
      "Broad, low surface built for trays, books and drinks",
      "Streamlined silhouette that sits under the furniture, not over it",
      "White or Grey",
      "Weather-resistant for full outdoor use",
      "Pairs with rattan, teak or metal seating"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Fibre cement / weather-resistant composite", "Use": "Outdoor" },
    care: "Wipe with a soft, damp cloth. Keep it away from acidic cleaners. Stand drinks on coasters, since cement and stone surfaces can mark, and cover it through the worst of winter." },

  { id: "od12", name: "Handwoven Rattan Resort Chair", cat: "Outdoor", room: "Outdoor", price: 2352, memberPrice: 2117, sku: "SH-10127", tag: "New", ph: "", img: "assets/products/od12.jpg",
    imgs: ["assets/products/od12.jpg", "assets/products/od12-2.jpg", "assets/products/od12-3.jpg", "assets/products/od12-4.jpg", "assets/products/od12-5.jpg"],
    colours: [{ name: "Black", hex: "#20201e" }, { name: "Black + Tan", hex: "#5a4634" }, { name: "Tan", hex: "#b08b5e" }],
    desc: "Handwoven rattan with a resort feel, the kind of chair you see on a terrace in the south of France. Sleek enough to pull up to a dining table, comfortable enough to leave in a corner with a cushion. Three colourways, including a two-tone black and tan.",
    features: [
      "Handwoven premium rattan",
      "Slim enough to use as dining or occasional seating",
      "Three colourways: Black, Tan, and two-tone Black + Tan",
      "Resort-style look that suits a pool or terrace",
      "Durable weave built for outdoor life"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od13", name: "Patterned Handwoven Outdoor Chair", cat: "Outdoor", room: "Outdoor", price: 2963, memberPrice: 2667, sku: "SH-10128", tag: "New", ph: "", img: "assets/products/od13.jpg",
    imgs: ["assets/products/od13.jpg", "assets/products/od13-2.jpg", "assets/products/od13-3.jpg", "assets/products/od13-4.jpg", "assets/products/od13-5.jpg"],
    colours: [{ name: "Khaki", hex: "#8d8365" }, { name: "Black", hex: "#20201e" }],
    desc: "The intricate handwoven pattern is what you notice first, catching the light differently through the day and giving an outdoor setting some texture to look at. Underneath it is a solid, comfortable chair that will take whatever the season does to it. Khaki or black.",
    features: [
      "Intricate handwoven pattern with real texture",
      "Premium rattan over a sturdy frame",
      "Khaki or Black",
      "Works as dining or occasional seating",
      "Built to stay outside year round"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od14", name: "Shaded Two-in-One Outdoor Lounge", cat: "Outdoor", room: "Outdoor", price: 2759, memberPrice: 2483, sku: "SH-10129", tag: "New", ph: "", img: "assets/products/od14.jpg",
    imgs: ["assets/products/od14.jpg", "assets/products/od14-2.jpg", "assets/products/od14-3.jpg", "assets/products/od14-4.jpg", "assets/products/od14-5.webp", "assets/products/od14-6.jpg"],
    sizes: [{ label: "Coffee Table", price: 2759 }, { label: "Sofa Set", price: 12444 }],
    desc: "A two-in-one lounge with its own overhead shade: sit under it through the middle of the day, fold it back when you want the sun. A generous piece for a poolside or a lawn, with a matching coffee table if you want the full setting.",
    features: [
      "Integrated overhead shade for sun or shelter",
      "Two-in-one design: shaded lounge or open seating",
      "Generous proportions for poolside and lawn",
      "Matching coffee table available separately",
      "Weather-resistant construction"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "2" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od15", name: "Oval-Base Lounge Chair & Coffee Table Set", cat: "Outdoor", room: "Outdoor", price: 3456, memberPrice: 3110, sku: "SH-10130", tag: "New", ph: "", img: "assets/products/od15.jpg",
    imgs: ["assets/products/od15.jpg", "assets/products/od15-2.jpg", "assets/products/od15-3.jpg", "assets/products/od15-4.jpg", "assets/products/od15-5.jpg", "assets/products/od15-6.jpg"],
    sizes: [{ label: "1 x Chair", price: 3456 }, { label: "1 x Chair + Coffee Table", price: 4381 }, { label: "2 x Chairs + Coffee Table", price: 7348 }],
    desc: "The chair is the statement here: an oval hollow base that reads as sculpture from across the garden, with a seat deep enough to actually live in. Take one chair, one chair with the coffee table, or a pair with the table for a corner that's finished.",
    features: [
      "Sculptural oval hollow base, a feature in its own right",
      "Deep, relaxed seat",
      "Three ways to buy: chair, chair + table, or two chairs + table",
      "Weather-resistant materials throughout",
      "Suits a courtyard, terrace or poolside"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "3" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od16", name: "Solid Teak Outdoor Sofa", cat: "Outdoor", room: "Outdoor", price: 20731, memberPrice: 18658, sku: "SH-10131", tag: "New", ph: "", img: "assets/products/od16.jpg",
    imgs: ["assets/products/od16.jpg", "assets/products/od16-2.jpg", "assets/products/od16-3.webp", "assets/products/od16-4.webp", "assets/products/od16-5.webp", "assets/products/od16-6.jpg"],
    desc: "The centrepiece sofa, built on a solid teak base with the proportions of indoor furniture. Generous, low and quietly expensive-looking, it anchors a large terrace the way a good sofa anchors a living room. One piece, no compromises.",
    features: [
      "Solid teak timber base",
      "Generous, low-slung proportions",
      "Made as a single statement piece for a large space",
      "Natural strength that weathers beautifully",
      "Indoor-quality comfort, built for outside"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Solid teak timber", "Use": "Outdoor" },
    care: "Teak left to itself fades to a soft silver-grey, which is natural and harms nothing. To hold the honey tone, wash it down and oil it once or twice a year. Wipe spills, especially oil and wine, before they soak in." },

  { id: "od17", name: "Rattan Hanging Swing Chair", cat: "Outdoor", room: "Outdoor", price: 5630, memberPrice: 5067, sku: "SH-10132", tag: "New", ph: "", img: "assets/products/od17.jpg",
    imgs: ["assets/products/od17.jpg", "assets/products/od17-2.jpg", "assets/products/od17-3.jpg", "assets/products/od17-4.jpg", "assets/products/od17-5.jpg", "assets/products/od17-6.jpg"],
    desc: "A rattan swing chair with a soft cotton cushion, hung for gentle movement rather than theatrics. Put it on a covered deck or in a corner of the garden and it will be the seat everyone reaches for first.",
    features: [
      "Handwoven rattan with a sturdy hanging frame",
      "Soft cotton cushion included",
      "Gentle swing, built for lounging",
      "Suits a covered deck, patio or garden corner",
      "Natural, elegant finish"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od18", name: "Woven String Sculptural Outdoor Chair", cat: "Outdoor", room: "Outdoor", price: 4711, memberPrice: 4240, sku: "SH-10133", tag: "New", ph: "", img: "assets/products/od18.jpg",
    imgs: ["assets/products/od18.jpg", "assets/products/od18-2.jpg", "assets/products/od18-3.jpg", "assets/products/od18-4.webp", "assets/products/od18-5.webp", "assets/products/od18-6.jpg"],
    colours: [{ name: "Ivory + Tan", hex: "#cbb79a" }],
    desc: "Hundreds of woven strings arranged across a sculptural outer frame, so the chair throws a pattern of light and shadow as the sun moves. As much a design piece as a seat, in ivory and tan that suits a pale, coastal palette.",
    features: [
      "Meticulously woven string detail across a sculptural frame",
      "Casts changing light and shadow through the day",
      "Ivory and tan colourway",
      "A design statement as much as a chair",
      "Weather-resistant construction"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od19", name: "Fibre Rattan Hanging Chair with Alloy Frame", cat: "Outdoor", room: "Outdoor", price: 4531, memberPrice: 4078, sku: "SH-10134", tag: "New", ph: "", img: "assets/products/od19.jpg",
    imgs: ["assets/products/od19.jpg", "assets/products/od19-2.jpg", "assets/products/od19-3.jpg", "assets/products/od19-4.jpg", "assets/products/od19-5.webp", "assets/products/od19-6.webp"],
    desc: "Fibre rattan over an aluminium alloy frame, which means it's light to move, strong to sit in, and happy indoors or out. A hanging chair for a reading corner, a balcony or a shaded part of the garden.",
    features: [
      "Fibre rattan over an aluminium alloy frame",
      "Light enough to move, strong enough to last",
      "Suits indoor rooms as well as covered outdoor spaces",
      "Comfortable, enveloping seat",
      "Weather-resistant finish"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od20", name: "Handcrafted Teak Outdoor Dining Collection", cat: "Outdoor", room: "Outdoor", price: 2911, memberPrice: 2620, sku: "SH-10135", tag: "New", ph: "", img: "assets/products/od20.jpg",
    imgs: ["assets/products/od20.jpg", "assets/products/od20-2.jpg", "assets/products/od20-3.jpg", "assets/products/od20-4.jpg", "assets/products/od20-5.webp", "assets/products/od20-6.webp"],
    sizes: [{ label: "Armless Chair", price: 2911 }, { label: "Dining Chair", price: 3146 }, { label: "Coffee Table", price: 5531 }, { label: "180cm Table", price: 8143 }, { label: "240cm Table", price: 14559 }, { label: "300cm Table", price: 17726 }],
    desc: "Handcrafted teak dining, from a coffee table up to a 300cm table that seats a proper gathering. The timber is warm and open-grained, the chairs are made to match, and the whole collection ages into that soft silver teak colour if you let it.",
    features: [
      "Handcrafted solid teak timber",
      "Dining tables at 180, 240 and 300cm, plus a coffee table",
      "Matching armless and dining chairs, sold individually",
      "Warm, open grain that weathers to silver-grey",
      "Built for courtyards, patios and gardens"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Solid teak timber", "Use": "Outdoor", "Pieces": "6" },
    care: "Teak left to itself fades to a soft silver-grey, which is natural and harms nothing. To hold the honey tone, wash it down and oil it once or twice a year. Wipe spills, especially oil and wine, before they soak in." },

  { id: "od21", name: "Premium Teak Outdoor Dining Table & Chairs", cat: "Outdoor", room: "Outdoor", price: 3517, memberPrice: 3165, sku: "SH-10136", tag: "New", ph: "", img: "assets/products/od21.jpg",
    imgs: ["assets/products/od21.jpg", "assets/products/od21-2.jpg", "assets/products/od21-3.jpg", "assets/products/od21-4.webp", "assets/products/od21-5.webp", "assets/products/od21-6.webp"],
    sizes: [{ label: "Chair", price: 3517 }, { label: "Table", price: 9852 }],
    desc: "Premium teak, a generous table and chairs cut to match it. Simple, heavy, well-made outdoor dining that doesn't try to be clever and will still be here in ten years.",
    features: [
      "Premium solid teak timber",
      "Generous dining table with matching chairs",
      "Chairs sold individually, so you seat exactly who you need",
      "Weathers to a natural silver-grey, or oil to keep the honey tone",
      "Built for full outdoor use"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Solid teak timber", "Use": "Outdoor", "Pieces": "2" },
    care: "Teak left to itself fades to a soft silver-grey, which is natural and harms nothing. To hold the honey tone, wash it down and oil it once or twice a year. Wipe spills, especially oil and wine, before they soak in." },

  { id: "od22", name: "Teak & Rattan Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 6480, memberPrice: 5832, sku: "SH-10137", tag: "New", ph: "", img: "assets/products/od22.jpg",
    imgs: ["assets/products/od22.jpg", "assets/products/od22-2.jpg", "assets/products/od22-3.jpg", "assets/products/od22-4.jpg", "assets/products/od22-5.webp", "assets/products/od22-6.webp"],
    sizes: [{ label: "Single Seater", price: 6480 }, { label: "Double Seater", price: 11624 }, { label: "Double Seater + Table", price: 12741 }, { label: "Three Seater + Chaise", price: 15517 }],
    desc: "A solid teak frame with rattan detailing woven into it, so you get the warmth of timber and the texture of weave in one piece. Single and double seaters, a double with table, and a three seater with chaise for the long end of a terrace.",
    features: [
      "Solid teak timber frame with woven rattan detail",
      "Single, double, double + table, and three seater with chaise",
      "Deep cushioned seating",
      "Natural materials that weather gracefully",
      "Made for terraces, gardens and poolsides"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Solid teak timber", "Use": "Outdoor", "Pieces": "4" },
    care: "Teak left to itself fades to a soft silver-grey, which is natural and harms nothing. To hold the honey tone, wash it down and oil it once or twice a year. Wipe spills, especially oil and wine, before they soak in." },

  { id: "od23", name: "Aluminium & Rattan Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 1994, memberPrice: 1795, sku: "SH-10138", tag: "New", ph: "", img: "assets/products/od23.jpg",
    imgs: ["assets/products/od23.jpg", "assets/products/od23-2.jpg", "assets/products/od23-3.jpg", "assets/products/od23-4.jpg", "assets/products/od23-5.jpg", "assets/products/od23-6.jpg"],
    sizes: [{ label: "Small Table", price: 1994 }, { label: "Large Table", price: 3746 }, { label: "Single Seater", price: 5309 }, { label: "Double Seater", price: 11570 }, { label: "Three Seater", price: 16294 }],
    desc: "A sleek aluminium frame with rattan detail: light to move, rust-resistant, and modern without being cold. Singles through to a three seater, with small and large tables to match.",
    features: [
      "Lightweight aluminium frame, rust resistant",
      "Rattan detailing for warmth and texture",
      "Single, double and three seater, plus two table sizes",
      "Easy to rearrange as the day moves",
      "Contemporary look for a patio or balcony"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Aluminium frame", "Use": "Outdoor", "Pieces": "5" },
    care: "Wash the frame with mild soapy water and rinse, then dry. Rinse more often near salt air. Wipe spills from the weave promptly, and store cushions dry." },

  { id: "od24", name: "Large Teak Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 4717, memberPrice: 4245, sku: "SH-10139", tag: "New", ph: "", img: "assets/products/od24.webp",
    imgs: ["assets/products/od24.webp", "assets/products/od24-2.webp", "assets/products/od24-3.webp", "assets/products/od24-4.webp", "assets/products/od24-5.webp", "assets/products/od24-6.webp"],
    sizes: [{ label: "Side Table", price: 4717 }, { label: "Coffee Table", price: 5961 }, { label: "Sofa Collection A", price: 24291 }, { label: "Sofa Collection Type C", price: 27485 }, { label: "Sofa Collection Type B", price: 28117 }],
    desc: "The largest of our outdoor sofa settings, built on solid teak and sold in three configurations so you can match it to a big terrace or a long garden room. Side and coffee tables complete it. This is the one for the house that entertains.",
    features: [
      "Solid teak timber frame",
      "Three full sofa configurations to choose from",
      "Matching side table and coffee table",
      "Scaled for large terraces and entertaining",
      "Timeless material that improves with age"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Solid teak timber", "Use": "Outdoor", "Pieces": "5" },
    care: "Teak left to itself fades to a soft silver-grey, which is natural and harms nothing. To hold the honey tone, wash it down and oil it once or twice a year. Wipe spills, especially oil and wine, before they soak in." },

  { id: "od25", name: "Cushioned Rattan Outdoor Sofa & Tables", cat: "Outdoor", room: "Outdoor", price: 1828, memberPrice: 1645, sku: "SH-10140", tag: "New", ph: "", img: "assets/products/od25.webp",
    imgs: ["assets/products/od25.webp", "assets/products/od25-2.jpg", "assets/products/od25-3.webp", "assets/products/od25-4.webp", "assets/products/od25-5.webp", "assets/products/od25-6.webp"],
    sizes: [{ label: "Small Table", price: 1828 }, { label: "Large Table", price: 2883 }, { label: "Single Chair", price: 3746 }, { label: "Double Seater Sofa", price: 5809 }],
    desc: "Rattan with soft cushion seats and a cosy, informal feel, at a price that makes a whole corner achievable. Chairs, a double seater sofa, and two table sizes.",
    features: [
      "Stylish rattan weave with soft cushioned seats",
      "Single chair and double seater sofa",
      "Small and large tables",
      "Sturdy construction for everyday outdoor use",
      "An easy way to furnish a balcony or courtyard"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od26", name: "Rattan & Reinforced Metal Outdoor Collection", cat: "Outdoor", room: "Outdoor", price: 2481, memberPrice: 2233, sku: "SH-10141", tag: "New", ph: "", img: "assets/products/od26.jpg",
    imgs: ["assets/products/od26.jpg", "assets/products/od26-2.jpg", "assets/products/od26-3.jpg", "assets/products/od26-4.webp", "assets/products/od26-5.webp", "assets/products/od26-6.webp"],
    sizes: [{ label: "Table", price: 2481 }, { label: "Single Seater", price: 2491 }, { label: "Double Seater", price: 11889 }, { label: "Three-Seater", price: 14283 }],
    desc: "Rattan over a reinforced metal frame, which is the combination that survives being left out all summer. Single, double and three seaters with a matching table, in a classic weave that suits almost any garden.",
    features: [
      "Rattan weave over a reinforced metal frame",
      "Single, double and three seater, plus matching table",
      "Classic look that sits well in most gardens",
      "Built for longevity outdoors",
      "Comfortable cushioned seating"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od27", name: "Powder-Coated Iron Outdoor Table & Chairs", cat: "Outdoor", room: "Outdoor", price: 1833, memberPrice: 1650, sku: "SH-10142", tag: "New", ph: "", img: "assets/products/od27.jpg",
    imgs: ["assets/products/od27.jpg", "assets/products/od27-2.jpg", "assets/products/od27-3.jpg", "assets/products/od27-4.jpg", "assets/products/od27-5.jpg", "assets/products/od27-6.webp"],
    sizes: [{ label: "Black / Single Chair", price: 1833 }, { label: "Green / Single Chair", price: 1833 }, { label: "White / Single Chair", price: 1833 }, { label: "Black / 3-Person Chair", price: 4963 }, { label: "Green / 3-Person Chair", price: 4963 }, { label: "White / 3-Person Chair", price: 4963 }, { label: "Black / Short Table", price: 6037 }, { label: "Green / Short Table", price: 6037 }, { label: "White / Short Table", price: 6037 }, { label: "Black / Long Table", price: 7704 }, { label: "Green / Long Table", price: 7704 }, { label: "White / Long Table", price: 7704 }],
    desc: "Iron, powder-coated and built to be left out through whatever the weather does. Long and short tables, single chairs and a three-person bench, in black or a deep garden green. The most hard-wearing setting we stock.",
    features: [
      "Durable iron frame with a weather-resistant coat",
      "Long table, short table, single chair and three-person seat",
      "Black or deep green",
      "Stands up to harsh weather without fuss",
      "Contemporary lines for a courtyard, balcony or garden"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Powder-coated iron", "Use": "Outdoor", "Pieces": "12" },
    care: "Wipe the frame with a damp cloth and dry it. Check the powder coat now and then for chips, and touch them up so moisture can't get underneath. Cover or shelter it through long wet spells." },

  { id: "od28", name: "Minimalist Teak Outdoor Dining Set", cat: "Outdoor", room: "Outdoor", price: 2944, memberPrice: 2650, sku: "SH-10143", tag: "New", ph: "", img: "assets/products/od28.jpg",
    imgs: ["assets/products/od28.jpg", "assets/products/od28-2.jpg", "assets/products/od28-3.jpg", "assets/products/od28-4.webp", "assets/products/od28-5.webp", "assets/products/od28-6.webp"],
    sizes: [{ label: "Chair", price: 2944 }, { label: "Table", price: 9239 }],
    desc: "Minimalist teak dining: clean lines, a natural finish and nothing extra. The table has real presence without ornament, and the chairs are cut to the same quiet logic.",
    features: [
      "Premium teak timber with a natural finish",
      "Clean, minimalist lines",
      "Table and chairs sold separately",
      "Warm grain that weathers to silver-grey",
      "Suits a modern alfresco setting"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Solid teak timber", "Use": "Outdoor", "Pieces": "2" },
    care: "Teak left to itself fades to a soft silver-grey, which is natural and harms nothing. To hold the honey tone, wash it down and oil it once or twice a year. Wipe spills, especially oil and wine, before they soak in." },

  { id: "od29", name: "Weather-Resistant Outdoor Side & Coffee Tables", cat: "Outdoor", room: "Outdoor", price: 4974, memberPrice: 4477, sku: "SH-10144", tag: "New", ph: "", img: "assets/products/od29.jpg",
    imgs: ["assets/products/od29.jpg", "assets/products/od29-2.webp", "assets/products/od29-3.jpg", "assets/products/od29-4.webp", "assets/products/od29-5.webp", "assets/products/od29-6.webp"],
    sizes: [{ label: "Grey / Side Table", price: 4974 }, { label: "Grey / Coffee Table", price: 6398 }],
    desc: "A side table and a coffee table in weather-resistant materials, designed to hold their look through a full year outside. Grey, low and unfussy, they work with rattan, teak and metal seating alike.",
    features: [
      "Weather-resistant construction that keeps its finish",
      "Side table and coffee table",
      "Grey, in a low unfussy shape",
      "Pairs with any outdoor seating",
      "Built for year-round use"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Fibre cement / weather-resistant composite", "Use": "Outdoor", "Pieces": "2" },
    care: "Wipe with a soft, damp cloth. Keep it away from acidic cleaners. Stand drinks on coasters, since cement and stone surfaces can mark, and cover it through the worst of winter." },

  { id: "od30", name: "Beige Teak Outdoor Lounge & Dining Collection", cat: "Outdoor", room: "Outdoor", price: 3661, memberPrice: 3295, sku: "SH-10145", tag: "New", ph: "", img: "assets/products/od30.jpg",
    imgs: ["assets/products/od30.jpg", "assets/products/od30-2.jpg", "assets/products/od30-3.webp", "assets/products/od30-4.jpg", "assets/products/od30-5.jpg", "assets/products/od30-6.jpg"],
    colours: [{ name: "Beige", hex: "#d3c6ae" }],
    sizes: [{ label: "Dining Chair", price: 3661 }, { label: "Coffee Table", price: 4500 }, { label: "Lounge Chair", price: 4796 }, { label: "Sun Bed", price: 5533 }, { label: "Two Seater Sofa", price: 7778 }, { label: "Three Seater Sofa", price: 9235 }],
    desc: "High-quality teak in a warm beige tone, across the widest spread of pieces we carry: lounge chairs, two and three seater sofas, a coffee table, dining chairs and a sun bed. Furnish a whole outdoor area from one collection and have it all match.",
    features: [
      "High-quality teak in a warm beige tone",
      "Six pieces: lounge chair, two and three seater, coffee table, dining chair and sun bed",
      "Furnish a whole outdoor area in one collection",
      "Natural charm that deepens with weathering",
      "Dining and lounging in the same family"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Solid teak timber", "Use": "Outdoor", "Pieces": "6" },
    care: "Teak left to itself fades to a soft silver-grey, which is natural and harms nothing. To hold the honey tone, wash it down and oil it once or twice a year. Wipe spills, especially oil and wine, before they soak in." },

  { id: "od31", name: "Warm Brown Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 6731, memberPrice: 6058, sku: "SH-10146", tag: "New", ph: "", img: "assets/products/od31.jpg",
    imgs: ["assets/products/od31.jpg", "assets/products/od31-2.jpg", "assets/products/od31-3.jpg", "assets/products/od31-4.webp", "assets/products/od31-5.webp", "assets/products/od31-6.webp"],
    colours: [{ name: "Brown", hex: "#6b5443" }],
    sizes: [{ label: "Coffee Table", price: 6731 }, { label: "Single Seat", price: 7406 }, { label: "2-Seater Sofa", price: 13496 }, { label: "3-Seater Sofa", price: 18981 }],
    desc: "A warm brown wood tone and generous, sink-into proportions. Coffee table, single seat, two and three seater sofas, for a terrace that's meant for sitting rather than passing through.",
    features: [
      "Warm brown wood tone throughout",
      "Coffee table, single seat, two and three seater sofas",
      "Generous, comfortable proportions",
      "Sophisticated look for a terrace or garden room",
      "Weather-resistant materials"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od32", name: "Modular Aluminium Outdoor Collection in Black & White", cat: "Outdoor", room: "Outdoor", price: 4581, memberPrice: 4123, sku: "SH-10147", tag: "New", ph: "", img: "assets/products/od32.jpg",
    imgs: ["assets/products/od32.jpg", "assets/products/od32-2.jpg", "assets/products/od32-3.jpg", "assets/products/od32-4.webp", "assets/products/od32-5.jpg", "assets/products/od32-6.jpg"],
    sizes: [{ label: "Black / Rectangle Coffee Table", price: 4581 }, { label: "White / Rectangle Coffee Table", price: 4581 }, { label: "Black / Square Coffee Table", price: 5315 }, { label: "White / Square Coffee Table", price: 5315 }, { label: "Black / Foot Stool", price: 5496 }, { label: "White / Foot Stool", price: 5496 }, { label: "Black / Middle Seat", price: 6107 }, { label: "White / Middle Seat", price: 6107 }, { label: "Black / Corner Seat", price: 6719 }, { label: "White / Corner Seat", price: 6719 }, { label: "Black / Sun Bed", price: 11107 }, { label: "White / Sun Bed", price: 11107 }],
    desc: "Black and white against premium aluminium, in a modular layout: corner seats, middle seats, a sun bed, two coffee table shapes and a footstool. Lay it out along a wall, wrap it round a corner, or spread it across a deck.",
    features: [
      "Premium aluminium frame in a black and white palette",
      "Modular: corner seats, middle seats, footstool",
      "Sun bed and two coffee table shapes",
      "Arrange it to fit the shape of your space",
      "Light, rust-resistant and easy to move"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Aluminium frame", "Use": "Outdoor", "Pieces": "12" },
    care: "Wash the frame with mild soapy water and rinse, then dry. Rinse more often near salt air. Wipe spills from the weave promptly, and store cushions dry." },

  { id: "od33", name: "Aluminium Alloy Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 5641, memberPrice: 5077, sku: "SH-10148", tag: "New", ph: "", img: "assets/products/od33.jpg",
    imgs: ["assets/products/od33.jpg", "assets/products/od33-2.jpg", "assets/products/od33-3.jpg", "assets/products/od33-4.jpg", "assets/products/od33-5.jpg", "assets/products/od33-6.jpg"],
    sizes: [{ label: "Chair", price: 5641 }, { label: "High Back Chair", price: 5830 }, { label: "Double Sofa", price: 12511 }, { label: "Three-Person Sofa", price: 14000 }],
    desc: "An aluminium alloy frame under clean modern seating, in chairs, high-back chairs and double or three-person sofas. Strong, light and built to look new for longer than most outdoor furniture manages.",
    features: [
      "Robust aluminium alloy frame",
      "Chair, high back chair, double and three-person sofa",
      "Light enough to rearrange, strong enough to last",
      "Modern lines for a statement setting",
      "Rust resistant, including near the coast"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Aluminium frame", "Use": "Outdoor", "Pieces": "4" },
    care: "Wash the frame with mild soapy water and rinse, then dry. Rinse more often near salt air. Wipe spills from the weave promptly, and store cushions dry." },

  { id: "od34", name: "Round Woven Occasional Chair", cat: "Outdoor", room: "Outdoor", price: 7148, memberPrice: 6433, sku: "SH-10149", tag: "New", ph: "", img: "assets/products/od34.jpg",
    imgs: ["assets/products/od34.jpg", "assets/products/od34-2.webp", "assets/products/od34-3.webp", "assets/products/od34-4.webp", "assets/products/od34-5.jpg", "assets/products/od34-6.webp"],
    colours: [{ name: "Natural Tan", hex: "#c49a6c" }, { name: "Chocolate", hex: "#4b3a2c" }],
    desc: "A round, enveloping occasional chair in tan or chocolate, the one you put where you want someone to stop and sit. Contemporary in shape, generous in scale, and comfortable enough to use every day.",
    features: [
      "Contemporary round silhouette",
      "Natural Tan or Chocolate",
      "Generous, enveloping seat",
      "Works as an accent chair indoors or out",
      "Weather-resistant construction"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od35", name: "Light Teak Outdoor Dining & Bar Collection", cat: "Outdoor", room: "Outdoor", price: 3630, memberPrice: 3267, sku: "SH-10150", tag: "New", ph: "", img: "assets/products/od35.jpg",
    imgs: ["assets/products/od35.jpg", "assets/products/od35-2.webp", "assets/products/od35-3.webp", "assets/products/od35-4.webp", "assets/products/od35-5.webp", "assets/products/od35-6.webp"],
    sizes: [{ label: "High Chair", price: 3630 }, { label: "Chair", price: 3630 }, { label: "Bars Stool", price: 3630 }, { label: "Bar Table", price: 4344 }, { label: "Square Table", price: 5444 }, { label: "Coffee Table", price: 6463 }],
    desc: "Light tan teak across a full set of pieces, including bar stools and a bar table, which almost nobody makes well for outdoors. Square and coffee tables, high chairs and dining chairs complete it.",
    features: [
      "Light tan teak timber finish",
      "Includes bar table and bar stools, as well as dining",
      "Square table, coffee table, high chair and chair",
      "A complete outdoor setting from one family",
      "Timeless material built to weather"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Solid teak timber", "Use": "Outdoor", "Pieces": "6" },
    care: "Teak left to itself fades to a soft silver-grey, which is natural and harms nothing. To hold the honey tone, wash it down and oil it once or twice a year. Wipe spills, especially oil and wine, before they soak in." },

  { id: "od36", name: "Fibre Cement Outdoor Coffee & Side Table", cat: "Outdoor", room: "Outdoor", price: 1656, memberPrice: 1490, sku: "SH-10151", tag: "New", ph: "", img: "assets/products/od36.jpg",
    imgs: ["assets/products/od36.jpg", "assets/products/od36-2.jpg", "assets/products/od36-3.jpg", "assets/products/od36-4.jpg", "assets/products/od36-5.jpg", "assets/products/od36-6.jpg"],
    sizes: [{ label: "Side Table", price: 1656 }, { label: "Coffee Table", price: 2767 }],
    desc: "Fibre cement, which gives you the look of poured concrete without the weight of it, in a coffee table and a side table. Tough, modern and completely at ease in the weather.",
    features: [
      "High-quality fibre cement with a concrete look",
      "Coffee table and side table",
      "Exceptionally durable in the weather",
      "Modern, architectural shape",
      "Pairs with rattan and timber seating"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Fibre cement / weather-resistant composite", "Use": "Outdoor", "Pieces": "2" },
    care: "Wipe with a soft, damp cloth. Keep it away from acidic cleaners. Stand drinks on coasters, since cement and stone surfaces can mark, and cover it through the worst of winter." },

  { id: "od37", name: "Clean-Line Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 5328, memberPrice: 4795, sku: "SH-10152", tag: "New", ph: "", img: "assets/products/od37.jpg",
    imgs: ["assets/products/od37.jpg", "assets/products/od37-2.webp", "assets/products/od37-3.jpg", "assets/products/od37-4.webp", "assets/products/od37-5.webp", "assets/products/od37-6.webp"],
    sizes: [{ label: "Coffee Table", price: 5328 }, { label: "Single Seater", price: 7037 }, { label: "Two Seater", price: 11989 }, { label: "Three Seater", price: 15185 }],
    desc: "Sleek, clean-lined sofa seating in singles through to a three seater, with a coffee table to match. Premium materials and a modern silhouette that suits a contemporary house.",
    features: [
      "Clean modern lines in premium materials",
      "Single, two and three seater",
      "Matching coffee table",
      "Deep cushioned comfort",
      "Suits a patio, poolside or terrace"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od38", name: "Complete Rattan Dining, Bar & Lounge Collection", cat: "Outdoor", room: "Outdoor", price: 1993, memberPrice: 1794, sku: "SH-10153", tag: "New", ph: "", img: "assets/products/od38.jpg",
    imgs: ["assets/products/od38.jpg", "assets/products/od38-2.jpg", "assets/products/od38-3.jpg", "assets/products/od38-4.jpg", "assets/products/od38-5.jpg", "assets/products/od38-6.jpg"],
    sizes: [{ label: "Foot Petal", price: 1993 }, { label: "Chair", price: 2111 }, { label: "Bar Stool", price: 2204 }, { label: "Coffee Table", price: 2900 }, { label: "Sofa Chair", price: 4322 }, { label: "Bar Table", price: 4444 }, { label: "Table", price: 4833 }, { label: "Three Seat Sofa", price: 10556 }],
    desc: "The most versatile collection we carry: chair, sofa chair, footstool, table, bar table, bar stool, coffee table and a three seat sofa. Durable rattan throughout, so dining, lounging and the bar corner can all match.",
    features: [
      "Eight pieces, from dining chair to three seat sofa",
      "Includes bar table and bar stool",
      "Durable rattan that holds its look",
      "Mix lounging and dining in one material",
      "Build the setting piece by piece"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "8" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od39", name: "Matching Outdoor Dining Chairs & Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 2404, memberPrice: 2164, sku: "SH-10154", tag: "New", ph: "", img: "assets/products/od39.jpg",
    imgs: ["assets/products/od39.jpg", "assets/products/od39-2.jpg", "assets/products/od39-3.jpg", "assets/products/od39-4.webp", "assets/products/od39-5.jpg", "assets/products/od39-6.webp"],
    sizes: [{ label: "Chair", price: 2404 }, { label: "Sofa Chair", price: 3119 }, { label: "Two Seat Sofa", price: 7185 }, { label: "Three Seat Sofa", price: 7833 }],
    desc: "Dining chairs and sofa seating from the same family, so an outdoor area can do both without looking like two separate purchases. Modern, well-made and sensibly priced for the size of the pieces.",
    features: [
      "Dining chairs and sofa seating that match",
      "Chair, sofa chair, two and three seat sofa",
      "Modern design with lasting construction",
      "One look across dining and lounging",
      "Weather-resistant materials"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od40", name: "Everyday Rattan Outdoor Lounge Collection", cat: "Outdoor", room: "Outdoor", price: 5252, memberPrice: 4727, sku: "SH-10155", tag: "New", ph: "", img: "assets/products/od40.jpg",
    imgs: ["assets/products/od40.jpg", "assets/products/od40-2.jpg", "assets/products/od40-3.webp", "assets/products/od40-4.webp", "assets/products/od40-5.webp"],
    sizes: [{ label: "Coffee Table", price: 5252 }, { label: "Single Seater", price: 7378 }, { label: "Double Seater", price: 12276 }],
    desc: "Durable rattan in a modern shape, made for everyday lounging rather than occasional use. Single and double seaters with a coffee table, equally at home on a balcony or a patio.",
    features: [
      "Durable rattan built for daily use",
      "Single seater, double seater and coffee table",
      "Modern silhouette that suits a balcony or patio",
      "Comfortable for long sitting",
      "Long-lasting outdoor performance"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "3" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od41", name: "Weather-Resistant Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 2037, memberPrice: 1833, sku: "SH-10156", tag: "New", ph: "", img: "assets/products/od41.jpg",
    imgs: ["assets/products/od41.jpg", "assets/products/od41-2.jpg", "assets/products/od41-3.jpg", "assets/products/od41-4.jpg", "assets/products/od41-5.webp", "assets/products/od41-6.webp"],
    sizes: [{ label: "Chair", price: 2037 }, { label: "Single Seater", price: 2370 }, { label: "Two Seater", price: 5093 }, { label: "Three Seater", price: 6759 }],
    desc: "Weather-resistant seating from a single chair up to a three seater, at the friendlier end of our outdoor range. A straightforward way to make a balcony or courtyard properly usable.",
    features: [
      "Premium weather-resistant materials",
      "Chair, single, two and three seater",
      "Comfortable cushioned seats",
      "An accessible way to furnish an outdoor area",
      "Modern style that suits most houses"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od42", name: "Curated Outdoor Sofa, Chairs & Table Set", cat: "Outdoor", room: "Outdoor", price: 2574, memberPrice: 2317, sku: "SH-10157", tag: "New", ph: "", img: "assets/products/od42.jpg",
    imgs: ["assets/products/od42.jpg", "assets/products/od42-2.jpg", "assets/products/od42-3.jpg", "assets/products/od42-4.jpg", "assets/products/od42-5.jpg", "assets/products/od42-6.jpg"],
    sizes: [{ label: "Coffee Table", price: 2574 }, { label: "Single Seater", price: 3539 }, { label: "2 Seater Sofa", price: 5511 }, { label: "3 Seater Sofa", price: 8693 }],
    desc: "A curated set: three seater sofa, occasional chairs and a coffee table, meant to be bought together and laid out as one outdoor room. Relaxed, refined and quick to make a space feel finished.",
    features: [
      "Curated set: three seater, occasional chairs and coffee table",
      "Designed to work together as one setting",
      "Relaxed proportions for real lounging",
      "Weather-resistant throughout",
      "Transforms a terrace in a single purchase"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od43", name: "Compact Outdoor Table & Chairs Set", cat: "Outdoor", room: "Outdoor", price: 1661, memberPrice: 1495, sku: "SH-10158", tag: "New", ph: "", img: "assets/products/od43.jpg",
    imgs: ["assets/products/od43.jpg", "assets/products/od43-2.jpg", "assets/products/od43-3.jpg", "assets/products/od43-4.jpg", "assets/products/od43-5.jpg", "assets/products/od43-6.webp"],
    sizes: [{ label: "1 x Chair", price: 1661 }, { label: "Set - Table + 2 x Chairs", price: 5007 }],
    desc: "A chair on its own, or the set with a table and two chairs: the right size for a balcony, a courtyard corner or a morning coffee spot. Contemporary without being stark.",
    features: [
      "Buy a single chair, or the table with two chairs",
      "Scaled for balconies and small courtyards",
      "Contemporary design with durable construction",
      "An easy first outdoor setting",
      "Weather-resistant materials"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "2" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od44", name: "Low & High Back Woven Rattan Collection", cat: "Outdoor", room: "Outdoor", price: 1643, memberPrice: 1479, sku: "SH-10159", tag: "New", ph: "", img: "assets/products/od44.jpg",
    imgs: ["assets/products/od44.jpg", "assets/products/od44-2.jpg", "assets/products/od44-3.jpg", "assets/products/od44-4.jpg", "assets/products/od44-5.jpg", "assets/products/od44-6.jpg"],
    sizes: [{ label: "Wooden Round Coffee Table", price: 1643 }, { label: "Wooden Square Table", price: 3304 }, { label: "High Back Chair", price: 3685 }, { label: "Single Seater - Low back", price: 5281 }, { label: "Wooden Rectangle Table", price: 5828 }, { label: "Sun Bed", price: 6185 }, { label: "Single Seater - High Back", price: 7352 }, { label: "Wooden Oval Table", price: 7641 }, { label: "Three Seater - Low back Sofa", price: 9694 }, { label: "Three Seater - High Back Sofa", price: 13330 }],
    desc: "Woven rattan in both low-back and high-back shapes, so you can choose between a relaxed lounge line and something more upright and supportive. Singles, three seaters and a sun bed.",
    features: [
      "Low-back and high-back options across the range",
      "Single seaters, three seaters and a sun bed",
      "Finely woven rattan over a solid frame",
      "Choose relaxed lounging or upright support",
      "Made for terraces, gardens and poolsides"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "10" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  { id: "od45", name: "Square & Round Woven Outdoor Seating Range", cat: "Outdoor", room: "Outdoor", price: 2587, memberPrice: 2328, sku: "SH-10160", tag: "New", ph: "", img: "assets/products/od45.jpg",
    imgs: ["assets/products/od45.jpg", "assets/products/od45-2.jpg", "assets/products/od45-3.jpg", "assets/products/od45-4.jpg", "assets/products/od45-5.jpg", "assets/products/od45-6.jpg"],
    sizes: [{ label: "Glass Table", price: 2587 }, { label: "Round - Single Seater", price: 4433 }, { label: "Square - Single Seater", price: 4622 }, { label: "Double Seater", price: 10511 }],
    desc: "Square or round single seaters, a double seater, and a glass-topped table to finish the group. A softer, more decorative shape than most outdoor seating, and lovely in a garden setting.",
    features: [
      "Square or round single seaters",
      "Double seater and matching glass table",
      "Softer, more decorative shape",
      "Natural woven charm",
      "Suits a garden, terrace or poolside"
    ],
    specs: { "Type": "Outdoor furniture", "Material": "Weather-resistant rattan", "Use": "Outdoor", "Pieces": "4" },
    care: "Rinse the weave with fresh water and let it dry in the air, particularly near the sea. Wipe spills before they dry into the fibre. Bring cushions inside when it rains, and cover or shelter the pieces through long wet spells." },

  // ── Home Décor ──
  { id: "lt01", name: "Gold Table Lamp Pair", cat: "Home Décor", room: "Home Décor", price: 204, memberPrice: 184, sku: "SH-10553", tag: "New", ph: "", img: "assets/products/lt01.webp",
    imgs: ["assets/products/lt01.webp", "assets/products/lt01-2.webp", "assets/products/lt01-3.webp", "assets/products/lt01-4.webp", "assets/products/lt01-5.webp"],
    sizes: [{ label: "Gold/sitting", price: 204 }, { label: "Gold/standing leg out", price: 204 }, { label: "Gold/sitting off ledge", price: 204 }, { label: "Gold/standing with arm crossed", price: 204 }, { label: "Gold/sitting knees bent", price: 204 }, { label: "Silver/sitting", price: 204 }, { label: "Silver/standing leg out", price: 204 }, { label: "Silver/sitting off ledge", price: 204 }, { label: "Silver/standing with arm crossed", price: 204 }, { label: "Silver/sitting knees bent", price: 204 }],
    desc: "A pair of small gold lamps, one sitting and one standing, meant to be used together on a console or a shelf.",
    features: [
      "Gold finish",
      "Sitting and standing forms",
      "Designed to be grouped"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "10", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt02", name: "Pendant Light (28 or 30cm)", cat: "Home Décor", room: "Home Décor", price: 267, memberPrice: 240, sku: "SH-10554", tag: "New", ph: "", img: "assets/products/lt02.webp",
    imgs: ["assets/products/lt02.webp", "assets/products/lt02-2.webp", "assets/products/lt02-3.webp", "assets/products/lt02-4.webp", "assets/products/lt02-5.webp"],
    sizes: [{ label: "28cm", price: 267 }, { label: "30cm", price: 309 }],
    desc: "A compact pendant in two diameters, the right scale above a bedside or a kitchen bench.",
    features: [
      "28cm and 30cm",
      "Suits a bedside or bench",
      "Compact scale"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt03", name: "Glass Wall Light, Gold or Black", cat: "Home Décor", room: "Home Décor", price: 406, memberPrice: 365, sku: "SH-10555", tag: "New", ph: "", img: "assets/products/lt03.webp",
    imgs: ["assets/products/lt03.webp", "assets/products/lt03-2.webp", "assets/products/lt03-3.webp", "assets/products/lt03-4.webp", "assets/products/lt03-5.webp"],
    sizes: [{ label: "Gold / Warm White", price: 406 }, { label: "Gold / Cool White", price: 406 }, { label: "Black / Warm White", price: 406 }, { label: "Black / Cool White", price: 406 }],
    desc: "An LED wall light in gold or black, with a choice of warm or cool white.",
    features: [
      "Gold or Black finish",
      "Warm or Cool White",
      "LED, wall mounted"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "4", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt04", name: "Tinted Glass Lamp", cat: "Home Décor", room: "Home Décor", price: 550, memberPrice: 495, sku: "SH-10556", tag: "New", ph: "", img: "assets/products/lt04.webp",
    imgs: ["assets/products/lt04.webp", "assets/products/lt04-2.webp", "assets/products/lt04-3.webp", "assets/products/lt04-4.webp", "assets/products/lt04-5.webp"],
    sizes: [{ label: "Black Tint / UK Plug", price: 550 }, { label: "Black Tint / EU Plug", price: 550 }, { label: "Black Tint / AU Plug", price: 550 }, { label: "Black Tint / US Plug", price: 550 }, { label: "Brown Tint / UK Plug", price: 550 }, { label: "Brown Tint / EU Plug", price: 550 }, { label: "Brown Tint / AU Plug", price: 550 }, { label: "Brown Tint / US Plug", price: 550 }],
    desc: "Tinted glass with a plug, available with a UK or EU fitting. Check you need an adaptor before ordering.",
    features: [
      "Tinted glass body",
      "UK or EU plug",
      "Table lamp scale"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "8", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt05", name: "Travertine Wall Light, Round or Square", cat: "Home Décor", room: "Home Décor", price: 550, memberPrice: 495, sku: "SH-10557", tag: "New", ph: "", img: "assets/products/lt05.webp",
    imgs: ["assets/products/lt05.webp", "assets/products/lt05-2.webp", "assets/products/lt05-3.webp", "assets/products/lt05-4.webp", "assets/products/lt05-5.webp"],
    sizes: [{ label: "Round", price: 550 }, { label: "Square", price: 550 }],
    desc: "Travertine on the wall, round or square. Stone diffuses light softly rather than throwing it.",
    features: [
      "Natural travertine",
      "Round or Square",
      "Soft, diffused light"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt06", name: "Pendant Light (40cm)", cat: "Home Décor", room: "Home Décor", price: 593, memberPrice: 534, sku: "SH-10558", tag: "New", ph: "", img: "assets/products/lt06.webp",
    imgs: ["assets/products/lt06.webp", "assets/products/lt06-2.webp", "assets/products/lt06-3.webp", "assets/products/lt06-4.webp", "assets/products/lt06-5.webp"],
    sizes: [{ label: "40cm / Warm White", price: 593 }, { label: "40cm / Cool White", price: 593 }, { label: "40cm / Neutral White", price: 593 }, { label: "50cm / Warm White", price: 811 }, { label: "50cm / Cool White", price: 811 }, { label: "50cm / Neutral White", price: 811 }, { label: "60cm / Warm White", price: 1022 }, { label: "60cm / Cool White", price: 1022 }, { label: "60cm / Neutral White", price: 1022 }, { label: "80cm / Warm White", price: 1387 }, { label: "80cm / Cool White", price: 1387 }, { label: "80cm / Neutral White", price: 1387 }],
    desc: "A 40cm pendant with warm, cool or neutral white.",
    features: [
      "40cm diameter",
      "Three colour temperatures",
      "Pendant fitting"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "12", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt07", name: "Marble Wall Light, Gold or Black", cat: "Home Décor", room: "Home Décor", price: 643, memberPrice: 579, sku: "SH-10559", tag: "New", ph: "", img: "assets/products/lt07.webp",
    imgs: ["assets/products/lt07.webp", "assets/products/lt07-2.webp", "assets/products/lt07-3.webp", "assets/products/lt07-4.webp", "assets/products/lt07-5.webp"],
    sizes: [{ label: "Gold / 35cm", price: 643 }, { label: "Black / 35cm", price: 643 }, { label: "Gold / 50cm", price: 972 }, { label: "Black / 50cm", price: 972 }],
    desc: "Marble with gold or black, at 35cm or 50cm.",
    features: [
      "Natural marble",
      "Gold or Black",
      "35cm and 50cm"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "4", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt08", name: "Travertine Wall Light", cat: "Home Décor", room: "Home Décor", price: 646, memberPrice: 581, sku: "SH-10560", tag: "New", ph: "", img: "assets/products/lt08.webp",
    imgs: ["assets/products/lt08.webp", "assets/products/lt08-2.webp", "assets/products/lt08-3.webp", "assets/products/lt08-4.webp", "assets/products/lt08-5.webp"],
    desc: "A single travertine LED wall light.",
    features: [
      "Natural travertine",
      "LED",
      "Single size"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "1", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt09", name: "Travertine Wall Light (Slim)", cat: "Home Décor", room: "Home Décor", price: 665, memberPrice: 598, sku: "SH-10561", tag: "New", ph: "", img: "assets/products/lt09.webp",
    imgs: ["assets/products/lt09.webp", "assets/products/lt09-2.webp", "assets/products/lt09-3.webp", "assets/products/lt09-4.webp", "assets/products/lt09-5.webp"],
    desc: "A slim travertine wall light, one size.",
    features: [
      "Natural travertine",
      "Slim profile",
      "Wall mounted"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "1", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt10", name: "Travertine Wall Light, Warm or Cool", cat: "Home Décor", room: "Home Décor", price: 717, memberPrice: 645, sku: "SH-10562", tag: "New", ph: "", img: "assets/products/lt10.webp",
    imgs: ["assets/products/lt10.webp", "assets/products/lt10-2.webp", "assets/products/lt10-3.webp", "assets/products/lt10-4.webp", "assets/products/lt10-5.webp"],
    sizes: [{ label: "Cool White", price: 717 }, { label: "Warm White", price: 717 }],
    desc: "Travertine with a choice of warm or cool white.",
    features: [
      "Natural travertine",
      "Warm or Cool White",
      "Wall mounted"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt11", name: "Gold-Trimmed Table Lamp", cat: "Home Décor", room: "Home Décor", price: 722, memberPrice: 650, sku: "SH-10563", tag: "New", ph: "", img: "assets/products/lt11.webp",
    imgs: ["assets/products/lt11.webp", "assets/products/lt11-2.webp", "assets/products/lt11-3.webp", "assets/products/lt11-4.webp", "assets/products/lt11-5.webp"],
    sizes: [{ label: "White + Gold", price: 722 }, { label: "Grey + Gold", price: 722 }],
    desc: "White and gold, or grey and gold.",
    features: [
      "Gold trim",
      "White + Gold or Grey + Gold",
      "Table lamp"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt12", name: "Linear Wall Light (60cm)", cat: "Home Décor", room: "Home Décor", price: 739, memberPrice: 665, sku: "SH-10564", tag: "New", ph: "", img: "assets/products/lt12.webp",
    imgs: ["assets/products/lt12.webp", "assets/products/lt12-2.webp", "assets/products/lt12-3.webp", "assets/products/lt12-4.webp", "assets/products/lt12-5.webp"],
    sizes: [{ label: "Gold / 60cm / Neutral White", price: 739 }, { label: "Gold / 60cm / Warm White", price: 739 }, { label: "Gold / 60cm / Cool White", price: 739 }, { label: "Black / 60cm / Neutral White", price: 739 }, { label: "Black / 60cm / Warm White", price: 739 }, { label: "Black / 60cm / Cool White", price: 739 }, { label: "Gold / 90cm / Neutral White", price: 906 }, { label: "Gold / 90cm / Warm White", price: 906 }, { label: "Gold / 90cm / Cool White", price: 906 }, { label: "Black / 90cm / Neutral White", price: 906 }, { label: "Black / 90cm / Warm White", price: 906 }, { label: "Black / 90cm / Cool White", price: 906 }, { label: "Gold / 120cm / Neutral White", price: 1070 }, { label: "Gold / 120cm / Warm White", price: 1070 }, { label: "Gold / 120cm / Cool White", price: 1070 }, { label: "Black / 120cm / Neutral White", price: 1070 }, { label: "Black / 120cm / Warm White", price: 1070 }, { label: "Black / 120cm / Cool White", price: 1070 }],
    desc: "A 60cm linear LED in gold, with three colour temperatures.",
    features: [
      "60cm linear LED",
      "Gold finish",
      "Neutral, Warm or Cool White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "18", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt13", name: "Travertine Pendant Light", cat: "Home Décor", room: "Home Décor", price: 767, memberPrice: 690, sku: "SH-10565", tag: "New", ph: "", img: "assets/products/lt13.webp",
    imgs: ["assets/products/lt13.webp", "assets/products/lt13-2.webp", "assets/products/lt13-3.webp", "assets/products/lt13-4.webp", "assets/products/lt13-5.webp"],
    sizes: [{ label: "A / Warm White", price: 767 }, { label: "A / Cool White", price: 767 }, { label: "A / Neutral White", price: 767 }, { label: "B / Warm White", price: 767 }, { label: "B / Cool White", price: 767 }, { label: "B / Neutral White", price: 767 }],
    desc: "Travertine pendants in several designs and three colour temperatures.",
    features: [
      "Natural travertine",
      "Several designs",
      "Three colour temperatures"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "6", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt14", name: "Travertine Wall Light (Three Tones)", cat: "Home Décor", room: "Home Décor", price: 776, memberPrice: 698, sku: "SH-10566", tag: "New", ph: "", img: "assets/products/lt14.webp",
    imgs: ["assets/products/lt14.webp", "assets/products/lt14-2.webp", "assets/products/lt14-3.webp", "assets/products/lt14-4.webp", "assets/products/lt14-5.webp"],
    sizes: [{ label: "Warm White", price: 776 }, { label: "Neutral White", price: 776 }, { label: "Cool White", price: 776 }],
    desc: "Travertine with warm, neutral or cool white.",
    features: [
      "Natural travertine",
      "Three colour temperatures",
      "Wall mounted"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "3", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt15", name: "Beige Travertine Pendant", cat: "Home Décor", room: "Home Décor", price: 828, memberPrice: 745, sku: "SH-10567", tag: "New", ph: "", img: "assets/products/lt15.webp",
    imgs: ["assets/products/lt15.webp", "assets/products/lt15-2.webp", "assets/products/lt15-3.webp", "assets/products/lt15-4.webp", "assets/products/lt15-5.webp"],
    sizes: [{ label: "Beige / Warm White 3000k", price: 828 }, { label: "Beige / Neutral White 4000K", price: 828 }, { label: "Beige / Cool White 6000K", price: 828 }, { label: "Black / Warm White 3000k", price: 828 }, { label: "Black / Neutral White 4000K", price: 828 }, { label: "Black / Cool White 6000K", price: 828 }],
    desc: "Beige travertine, with 3000K warm or 4000K neutral white.",
    features: [
      "Beige travertine",
      "3000K or 4000K",
      "Pendant fitting"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "6", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt16", name: "Table Lamp in Silver or Black", cat: "Home Décor", room: "Home Décor", price: 865, memberPrice: 778, sku: "SH-10568", tag: "New", ph: "", img: "assets/products/lt16.webp",
    imgs: ["assets/products/lt16.webp", "assets/products/lt16-2.webp", "assets/products/lt16-3.webp", "assets/products/lt16-4.webp", "assets/products/lt16-5.webp"],
    sizes: [{ label: "Silver", price: 865 }, { label: "Black", price: 865 }],
    desc: "Silver or black, a plain lamp done well.",
    features: [
      "Silver or Black",
      "Table lamp scale",
      "Simple form"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt17", name: "Pendant Light (35 or 45cm)", cat: "Home Décor", room: "Home Décor", price: 887, memberPrice: 798, sku: "SH-10569", tag: "New", ph: "", img: "assets/products/lt17.webp",
    imgs: ["assets/products/lt17.webp", "assets/products/lt17-2.webp", "assets/products/lt17-3.webp", "assets/products/lt17-4.webp", "assets/products/lt17-5.webp"],
    sizes: [{ label: "35cm / Cool White", price: 887 }, { label: "35cm / Warm White", price: 887 }, { label: "45cm / Cool White", price: 1087 }, { label: "45cm / Warm White", price: 1087 }, { label: "55cm / Cool White", price: 1402 }, { label: "55cm / Warm White", price: 1402 }, { label: "65cm / Cool White", price: 1991 }, { label: "65cm / Warm White", price: 1991 }],
    desc: "Two diameters, warm or cool white.",
    features: [
      "35cm and 45cm",
      "Warm or Cool White",
      "Pendant fitting"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "8", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt18", name: "Travertine Pendant (30 or 40cm)", cat: "Home Décor", room: "Home Décor", price: 898, memberPrice: 808, sku: "SH-10570", tag: "New", ph: "", img: "assets/products/lt18.webp",
    imgs: ["assets/products/lt18.webp", "assets/products/lt18-2.webp", "assets/products/lt18-3.webp", "assets/products/lt18-4.webp", "assets/products/lt18-5.webp"],
    sizes: [{ label: "30cm / Warm White", price: 898 }, { label: "30cm / Cool White", price: 898 }, { label: "40cm / Warm White", price: 1176 }, { label: "40cm / Cool White", price: 1176 }],
    desc: "Travertine at 30cm or 40cm, warm or cool.",
    features: [
      "Natural travertine",
      "30cm and 40cm",
      "Warm or Cool White"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "4", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt19", name: "Crystal Ceiling Light", cat: "Home Décor", room: "Home Décor", price: 907, memberPrice: 816, sku: "SH-10571", tag: "New", ph: "", img: "assets/products/lt19.webp",
    imgs: ["assets/products/lt19.webp", "assets/products/lt19-2.webp", "assets/products/lt19-3.webp", "assets/products/lt19-4.webp", "assets/products/lt19-5.webp"],
    sizes: [{ label: "Silver 60cm", price: 907 }, { label: "Gold 60cm", price: 907 }, { label: "Silver 80cm", price: 1278 }, { label: "Gold 80cm", price: 1278 }],
    desc: "Crystal glass at 60cm or 80cm, in silver or gold. A flush ceiling fitting rather than a pendant.",
    features: [
      "Crystal glass",
      "60cm and 80cm",
      "Silver or Gold"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "4", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt20", name: "Marble Wall Sconce", cat: "Home Décor", room: "Home Décor", price: 920, memberPrice: 828, sku: "SH-10572", tag: "New", ph: "", img: "assets/products/lt20.webp",
    imgs: ["assets/products/lt20.webp", "assets/products/lt20-2.webp", "assets/products/lt20-3.webp", "assets/products/lt20-4.webp", "assets/products/lt20-5.webp"],
    sizes: [{ label: "S / Warm White", price: 920 }, { label: "S / Nature White", price: 920 }, { label: "S / Cool White", price: 920 }, { label: "L / Warm White", price: 961 }, { label: "L / Nature White", price: 961 }, { label: "L / Cool White", price: 961 }],
    desc: "A marble LED sconce in three sizes and three colour temperatures.",
    features: [
      "Natural marble",
      "Three sizes",
      "Three colour temperatures"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "6", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt21", name: "Glass Pendant, 2 or 5 Heads", cat: "Home Décor", room: "Home Décor", price: 994, memberPrice: 895, sku: "SH-10573", tag: "New", ph: "", img: "assets/products/lt21.webp",
    imgs: ["assets/products/lt21.webp", "assets/products/lt21-2.webp", "assets/products/lt21-3.webp", "assets/products/lt21-4.webp", "assets/products/lt21-5.webp"],
    sizes: [{ label: "2 Heads / Warm White", price: 994 }, { label: "2 Heads / Cold White", price: 994 }, { label: "5 Heads / Warm White", price: 2583 }, { label: "5 Heads / Cold White", price: 2583 }, { label: "7 Heads / Warm White", price: 2961 }, { label: "7 Heads / Cold White", price: 2961 }],
    desc: "Glass pendants with two or five heads, warm or cold white.",
    features: [
      "Glass shades",
      "2 or 5 heads",
      "Warm or Cold White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "6", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt22", name: "Travertine Wall Light (3000K or 4000K)", cat: "Home Décor", room: "Home Décor", price: 1109, memberPrice: 998, sku: "SH-10574", tag: "New", ph: "", img: "assets/products/lt22.webp",
    imgs: ["assets/products/lt22.webp", "assets/products/lt22-2.webp", "assets/products/lt22-3.webp", "assets/products/lt22-4.webp", "assets/products/lt22-5.webp"],
    sizes: [{ label: "Travertine / 3000K", price: 1109 }, { label: "Travertine / 4000K", price: 1109 }, { label: "Travertine / 6000K", price: 1109 }],
    desc: "Travertine with a choice of two colour temperatures.",
    features: [
      "Natural travertine",
      "3000K or 4000K",
      "Wall mounted"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "3", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt23", name: "Multi-Head Pendant (Seven Lengths)", cat: "Home Décor", room: "Home Décor", price: 1157, memberPrice: 1041, sku: "SH-10575", tag: "New", ph: "", img: "assets/products/lt23.webp",
    imgs: ["assets/products/lt23.webp", "assets/products/lt23-2.webp", "assets/products/lt23-3.webp", "assets/products/lt23-4.webp", "assets/products/lt23-5.webp"],
    sizes: [{ label: "55cm", price: 1157 }, { label: "65cm", price: 1424 }, { label: "75cm", price: 1717 }, { label: "100cm", price: 2013 }, { label: "120cm", price: 2204 }, { label: "130cm", price: 2480 }, { label: "150cm", price: 3417 }, { label: "3-Heads", price: 3602 }],
    desc: "A three-head pendant across lengths from 55cm to 150cm, so it suits a bench or a stairwell.",
    features: [
      "Three heads",
      "Seven lengths, 55cm to 150cm",
      "Bench or stairwell"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "8", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt24", name: "Glass Floor Lamp (Three Heights)", cat: "Home Décor", room: "Home Décor", price: 1167, memberPrice: 1050, sku: "SH-10576", tag: "New", ph: "", img: "assets/products/lt24.webp",
    imgs: ["assets/products/lt24.webp", "assets/products/lt24-2.webp", "assets/products/lt24-3.webp", "assets/products/lt24-4.webp", "assets/products/lt24-5.webp"],
    sizes: [{ label: "32cm / Warm White", price: 1167 }, { label: "53cm / Warm White", price: 1667 }, { label: "57cm / Warm White", price: 1667 }, { label: "64cm / Warm White", price: 1833 }, { label: "89cm / Warm White", price: 2259 }, { label: "84cm / Warm White", price: 2389 }, { label: "96cm / Warm White", price: 2583 }, { label: "121cm / Warm White", price: 2867 }, { label: "117cm / Warm White", price: 3106 }, { label: "128cm / Warm White", price: 3583 }, { label: "149cm / Warm White", price: 3822 }, { label: "153cm / Warm White", price: 3867 }],
    desc: "Glass at 32cm, 53cm or 57cm, warm white.",
    features: [
      "Glass body",
      "Three heights",
      "Warm White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "12", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt25", name: "Crystal Lamp in Four Colours", cat: "Home Décor", room: "Home Décor", price: 1217, memberPrice: 1095, sku: "SH-10577", tag: "New", ph: "", img: "assets/products/lt25.webp",
    imgs: ["assets/products/lt25.webp", "assets/products/lt25-2.webp", "assets/products/lt25-3.webp", "assets/products/lt25-4.webp", "assets/products/lt25-5.webp"],
    sizes: [{ label: "Navy", price: 1217 }, { label: "Light Green", price: 1217 }, { label: "Emerald Green", price: 1217 }, { label: "Pink", price: 1217 }],
    desc: "Crystal in navy, light green, emerald green or pink. Coloured crystal is unusual and worth it.",
    features: [
      "Crystal construction",
      "Navy, Light Green, Emerald or Pink",
      "Table lamp"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "4", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt26", name: "Ceiling Light (45 or 65cm)", cat: "Home Décor", room: "Home Décor", price: 1220, memberPrice: 1098, sku: "SH-10578", tag: "New", ph: "", img: "assets/products/lt26.webp",
    imgs: ["assets/products/lt26.webp", "assets/products/lt26-2.webp", "assets/products/lt26-3.webp", "assets/products/lt26-4.webp", "assets/products/lt26-5.webp"],
    sizes: [{ label: "Ceiling Light / 45cm", price: 1220 }, { label: "Pendant Light / 45cm", price: 1220 }, { label: "Ceiling Light / 65cm", price: 1420 }, { label: "Pendant Light / 65cm", price: 1420 }, { label: "Ceiling Light / 80cm", price: 1831 }, { label: "Pendant Light / 80cm", price: 1831 }, { label: "Ceiling Light / 100cm", price: 2889 }, { label: "Pendant Light / 100cm", price: 2889 }],
    desc: "An LED ceiling fitting at 45cm or 65cm.",
    features: [
      "LED ceiling fitting",
      "45cm and 65cm",
      "Flush mounted"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "8", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt27", name: "Travertine Dish Lamp", cat: "Home Décor", room: "Home Décor", price: 1235, memberPrice: 1112, sku: "SH-10579", tag: "New", ph: "", img: "assets/products/lt27.webp",
    imgs: ["assets/products/lt27.webp", "assets/products/lt27-2.webp", "assets/products/lt27-3.webp", "assets/products/lt27-4.webp"],
    sizes: [{ label: "White 6000K", price: 1235 }, { label: "Warm White 3000K", price: 1235 }, { label: "Tri-Color Dimming", price: 1272 }],
    desc: "A travertine dish lamp with tri-colour dimming, so one fitting covers warm through to daylight.",
    features: [
      "Natural travertine",
      "Tri-colour dimming",
      "6000K or 3000K options"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "3", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt28", name: "Marble Pendant Chandelier", cat: "Home Décor", room: "Home Décor", price: 1254, memberPrice: 1129, sku: "SH-10580", tag: "New", ph: "", img: "assets/products/lt28.webp",
    imgs: ["assets/products/lt28.webp", "assets/products/lt28-2.webp", "assets/products/lt28-3.webp", "assets/products/lt28-4.webp", "assets/products/lt28-5.webp"],
    sizes: [{ label: "Warm White", price: 1254 }],
    desc: "Marble with LED, warm white.",
    features: [
      "Natural marble",
      "LED chandelier",
      "Warm White"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "1", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt29", name: "Travertine Wall Light, Light or Dark", cat: "Home Décor", room: "Home Décor", price: 1291, memberPrice: 1162, sku: "SH-10581", tag: "New", ph: "", img: "assets/products/lt29.webp",
    imgs: ["assets/products/lt29.webp", "assets/products/lt29-2.webp", "assets/products/lt29-3.webp", "assets/products/lt29-4.webp", "assets/products/lt29-5.webp"],
    sizes: [{ label: "Light", price: 1291 }, { label: "Dark", price: 1291 }],
    desc: "Travertine in a light or dark stone.",
    features: [
      "Natural travertine",
      "Light or Dark stone",
      "Wall mounted"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt30", name: "Travertine Wall Light (Statement)", cat: "Home Décor", room: "Home Décor", price: 1322, memberPrice: 1190, sku: "SH-10582", tag: "New", ph: "", img: "assets/products/lt30.webp",
    imgs: ["assets/products/lt30.webp", "assets/products/lt30-2.webp", "assets/products/lt30-3.webp", "assets/products/lt30-4.webp", "assets/products/lt30-5.webp"],
    sizes: [{ label: "Travertine", price: 1322 }],
    desc: "A larger travertine wall light, one finish.",
    features: [
      "Natural travertine",
      "Larger scale",
      "Single finish"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "1", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt31", name: "K9 Crystal Lamp (50cm)", cat: "Home Décor", room: "Home Décor", price: 1359, memberPrice: 1223, sku: "SH-10583", tag: "New", ph: "", img: "assets/products/lt31.webp",
    imgs: ["assets/products/lt31.webp", "assets/products/lt31-2.webp", "assets/products/lt31-3.jpg", "assets/products/lt31-4.webp", "assets/products/lt31-5.webp"],
    sizes: [{ label: "50cm / US Plug + Dimmer Switch", price: 1359 }, { label: "50cm / AU Plug + Dimmer Switch", price: 1359 }],
    desc: "K9 crystal at 50cm, with a dimmer and your choice of plug. Check the plug type before ordering.",
    features: [
      "K9 crystal",
      "50cm with dimmer",
      "US or AU plug"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt32", name: "Marble Wall Light, Warm or Cool", cat: "Home Décor", room: "Home Décor", price: 1387, memberPrice: 1248, sku: "SH-10584", tag: "New", ph: "", img: "assets/products/lt32.webp",
    imgs: ["assets/products/lt32.webp", "assets/products/lt32-2.webp", "assets/products/lt32-3.webp", "assets/products/lt32-4.webp", "assets/products/lt32-5.webp"],
    sizes: [{ label: "Warm White  - 3500K", price: 1387 }, { label: "Cool White - 6000K", price: 1387 }],
    desc: "Marble with gold and black detail, 3500K or 6000K.",
    features: [
      "Natural marble",
      "Gold and black detail",
      "3500K or 6000K"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt33", name: "Wave Ceiling Light (40 or 60cm)", cat: "Home Décor", room: "Home Décor", price: 1476, memberPrice: 1328, sku: "SH-10585", tag: "New", ph: "", img: "assets/products/lt33.webp",
    imgs: ["assets/products/lt33.webp", "assets/products/lt33-2.webp", "assets/products/lt33-3.webp", "assets/products/lt33-4.webp", "assets/products/lt33-5.webp"],
    sizes: [{ label: "Wave: 40cm ø x 5cm / Warm White", price: 1476 }, { label: "Wave: 60cm ø x 5cm / Warm White", price: 1711 }, { label: "Round: 85cm ø x 6cm / Warm White", price: 2509 }],
    desc: "A slim wave-form ceiling light, 5cm deep, at 40cm or 60cm.",
    features: [
      "Wave form, 5cm deep",
      "40cm and 60cm",
      "Warm White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "3", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt34", name: "Glass Pendant Light", cat: "Home Décor", room: "Home Décor", price: 1572, memberPrice: 1415, sku: "SH-10586", tag: "New", ph: "", img: "assets/products/lt34.webp",
    imgs: ["assets/products/lt34.webp", "assets/products/lt34-2.webp", "assets/products/lt34-3.webp", "assets/products/lt34-4.webp", "assets/products/lt34-5.webp"],
    sizes: [{ label: "Cool White", price: 1572 }, { label: "Warm White", price: 1572 }],
    desc: "Glass with LED, warm or cool white.",
    features: [
      "Glass shade",
      "LED",
      "Warm or Cool White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt35", name: "Travertine Dome Pendant (30 or 40cm)", cat: "Home Décor", room: "Home Décor", price: 1639, memberPrice: 1475, sku: "SH-10587", tag: "New", ph: "", img: "assets/products/lt35.webp",
    imgs: ["assets/products/lt35.webp", "assets/products/lt35-2.webp", "assets/products/lt35-3.webp", "assets/products/lt35-4.webp", "assets/products/lt35-5.webp"],
    sizes: [{ label: "30cm", price: 1639 }, { label: "40cm", price: 1824 }],
    desc: "Travertine at 30cm or 40cm.",
    features: [
      "Natural travertine",
      "30cm and 40cm",
      "Pendant fitting"
    ],
    specs: { "Type": "Light fitting", "Material": "Natural stone", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch off and let it cool before cleaning. Wipe natural stone with a soft, damp cloth and dry it, avoiding acidic cleaners. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt36", name: "Floor Lamp (Three Tones)", cat: "Home Décor", room: "Home Décor", price: 1665, memberPrice: 1498, sku: "SH-10588", tag: "New", ph: "", img: "assets/products/lt36.webp",
    imgs: ["assets/products/lt36.webp", "assets/products/lt36-2.webp", "assets/products/lt36-3.webp", "assets/products/lt36-4.webp", "assets/products/lt36-5.webp"],
    sizes: [{ label: "Neutral White", price: 1665 }, { label: "Warm White", price: 1665 }, { label: "Cool White", price: 1665 }],
    desc: "A floor lamp with warm, neutral or cool white.",
    features: [
      "Floor standing",
      "Three colour temperatures",
      "Reading height"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "3", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt37", name: "LED Crystal Chandelier (80cm)", cat: "Home Décor", room: "Home Décor", price: 1665, memberPrice: 1498, sku: "SH-10589", tag: "New", ph: "", img: "assets/products/lt37.webp",
    imgs: ["assets/products/lt37.webp", "assets/products/lt37-2.webp", "assets/products/lt37-3.webp", "assets/products/lt37-4.webp", "assets/products/lt37-5.webp"],
    sizes: [{ label: "80cm / Warm White / Gold", price: 1665 }, { label: "80cm / Warm White / Silver", price: 1665 }, { label: "80cm / White / Gold", price: 1665 }, { label: "80cm / White / Silver", price: 1665 }, { label: "80cm / Neutral White / Gold", price: 1665 }, { label: "80cm / Neutral White / Silver", price: 1665 }, { label: "100cm / Warm White / Gold", price: 1944 }, { label: "100cm / Warm White / Silver", price: 1944 }, { label: "100cm / White / Gold", price: 1944 }, { label: "100cm / White / Silver", price: 1944 }, { label: "100cm / Neutral White / Gold", price: 1944 }, { label: "100cm / Neutral White / Silver", price: 1944 }, { label: "120cm / Warm White / Gold", price: 2200 }, { label: "120cm / Warm White / Silver", price: 2200 }, { label: "120cm / White / Gold", price: 2200 }, { label: "120cm / White / Silver", price: 2200 }, { label: "120cm / Neutral White / Gold", price: 2200 }, { label: "120cm / Neutral White / Silver", price: 2200 }],
    desc: "An 80cm crystal chandelier in gold or silver.",
    features: [
      "Crystal with LED",
      "80cm",
      "Gold or Silver"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "18", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt38", name: "Five-Head Glass Pendant", cat: "Home Décor", room: "Home Décor", price: 2037, memberPrice: 1833, sku: "SH-10590", tag: "New", ph: "", img: "assets/products/lt38.webp",
    imgs: ["assets/products/lt38.webp", "assets/products/lt38-2.webp", "assets/products/lt38-3.webp", "assets/products/lt38-4.webp", "assets/products/lt38-5.webp"],
    sizes: [{ label: "Gold / 5 heads / Cool White", price: 2037 }, { label: "Gold / 5 heads / Warm White", price: 2037 }, { label: "Silver / 5 heads / Cool White", price: 2037 }, { label: "Silver / 5 heads / Warm White", price: 2037 }, { label: "Gold / 8 heads / Cool White", price: 2961 }, { label: "Gold / 8 heads / Warm White", price: 2961 }, { label: "Silver / 8 heads / Cool White", price: 2961 }, { label: "Silver / 8 heads / Warm White", price: 2961 }, { label: "Gold / 10 heads / Cool White", price: 3628 }, { label: "Gold / 10 heads / Warm White", price: 3628 }, { label: "Silver / 10 heads / Cool White", price: 3628 }, { label: "Silver / 10 heads / Warm White", price: 3628 }],
    desc: "Five glass heads in gold, warm or cool white.",
    features: [
      "Five glass heads",
      "Gold finish",
      "Warm or Cool White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "12", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt39", name: "Nine-Head Crystal Chandelier", cat: "Home Décor", room: "Home Décor", price: 2202, memberPrice: 1982, sku: "SH-10591", tag: "New", ph: "", img: "assets/products/lt39.webp",
    imgs: ["assets/products/lt39.webp", "assets/products/lt39-2.webp", "assets/products/lt39-3.webp", "assets/products/lt39-4.webp", "assets/products/lt39-5.webp"],
    sizes: [{ label: "Gold / 9 Heads / Cool White", price: 2202 }, { label: "Gold / 9 Heads / Warm White", price: 2202 }, { label: "Black / 9 Heads / Cool White", price: 2202 }, { label: "Black / 9 Heads / Warm White", price: 2202 }, { label: "Gold / 14 Heads / Cool White", price: 3583 }, { label: "Gold / 14 Heads / Warm White", price: 3583 }, { label: "Black / 14 Heads / Cool White", price: 3583 }, { label: "Black / 14 Heads / Warm White", price: 3583 }, { label: "Gold / 21 Heads / Cool White", price: 4346 }, { label: "Gold / 21 Heads / Warm White", price: 4346 }, { label: "Black / 21 Heads / Cool White", price: 4346 }, { label: "Black / 21 Heads / Warm White", price: 4346 }, { label: "Gold / 33 Heads / Cool White", price: 6850 }, { label: "Gold / 33 Heads / Warm White", price: 6850 }, { label: "Black / 33 Heads / Cool White", price: 6850 }, { label: "Black / 33 Heads / Warm White", price: 6850 }],
    desc: "Nine heads in gold or black crystal. A dining-room piece.",
    features: [
      "Nine heads",
      "Gold or Black",
      "Crystal detail"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "16", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt40", name: "Handwoven Rattan Pendant", cat: "Home Décor", room: "Home Décor", price: 2461, memberPrice: 2215, sku: "SH-10592", tag: "New", ph: "", img: "assets/products/lt40.webp",
    imgs: ["assets/products/lt40.webp", "assets/products/lt40-2.webp", "assets/products/lt40-3.webp", "assets/products/lt40-4.webp", "assets/products/lt40-5.webp"],
    sizes: [{ label: "S", price: 2461 }, { label: "L", price: 3109 }],
    desc: "Handwoven rattan in small or large, which warms a room full of hard surfaces.",
    features: [
      "Handwoven rattan",
      "Small and Large",
      "Warm, textured light"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt41", name: "Strapped Glass Pendant", cat: "Home Décor", room: "Home Décor", price: 2472, memberPrice: 2225, sku: "SH-10593", tag: "New", ph: "", img: "assets/products/lt41.webp",
    imgs: ["assets/products/lt41.webp", "assets/products/lt41-2.webp", "assets/products/lt41-3.webp", "assets/products/lt41-4.webp", "assets/products/lt41-5.webp"],
    sizes: [{ label: "1 Strap / Cold White", price: 2472 }, { label: "1 Strap / Warm White", price: 2472 }, { label: "2 Strap / Cold White", price: 3550 }, { label: "2 Strap / Warm White", price: 3550 }],
    desc: "Glass held in leather-look straps, one or two straps.",
    features: [
      "Glass with strap detail",
      "1 or 2 straps",
      "Cold or Warm White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "4", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt42", name: "Chandelier (Three Tones)", cat: "Home Décor", room: "Home Décor", price: 2574, memberPrice: 2317, sku: "SH-10594", tag: "New", ph: "", img: "assets/products/lt42.webp",
    imgs: ["assets/products/lt42.webp", "assets/products/lt42-2.webp", "assets/products/lt42-3.webp", "assets/products/lt42-4.webp", "assets/products/lt42-5.webp"],
    sizes: [{ label: "Cool White", price: 2574 }, { label: "Neutral White", price: 2574 }, { label: "Warm White", price: 2574 }],
    desc: "A chandelier with warm, neutral or cool white.",
    features: [
      "Chandelier fitting",
      "Three colour temperatures",
      "Dining or entry"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "3", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt43", name: "Linear Pendant (90 or 120cm)", cat: "Home Décor", room: "Home Décor", price: 2583, memberPrice: 2325, sku: "SH-10595", tag: "New", ph: "", img: "assets/products/lt43.webp",
    imgs: ["assets/products/lt43.webp", "assets/products/lt43-2.webp", "assets/products/lt43-3.webp", "assets/products/lt43-4.webp", "assets/products/lt43-5.webp"],
    sizes: [{ label: "90cm / Neutral White", price: 2583 }, { label: "120cm / Neutral White", price: 3241 }],
    desc: "A long linear LED at 90cm or 120cm, for above a dining table or island.",
    features: [
      "Linear LED",
      "90cm and 120cm",
      "Above a table or island"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt44", name: "Long Pendant (120 or 150cm)", cat: "Home Décor", room: "Home Décor", price: 2846, memberPrice: 2561, sku: "SH-10596", tag: "New", ph: "", img: "assets/products/lt44.webp",
    imgs: ["assets/products/lt44.webp", "assets/products/lt44-2.webp", "assets/products/lt44-3.webp", "assets/products/lt44-4.webp", "assets/products/lt44-5.webp"],
    sizes: [{ label: "120cm / Warm White", price: 2846 }, { label: "120cm / Cool White", price: 2846 }, { label: "150cm / Warm White", price: 3685 }, { label: "150cm / Cool White", price: 3685 }],
    desc: "120cm or 150cm, warm or cool white.",
    features: [
      "120cm and 150cm",
      "Warm or Cool White",
      "Long dining tables"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "4", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt45", name: "Stone Chandelier (150cm Drop)", cat: "Home Décor", room: "Home Décor", price: 3109, memberPrice: 2798, sku: "SH-10597", tag: "New", ph: "", img: "assets/products/lt45.webp",
    imgs: ["assets/products/lt45.webp", "assets/products/lt45-2.webp", "assets/products/lt45-3.webp", "assets/products/lt45-4.webp", "assets/products/lt45-5.webp"],
    sizes: [{ label: "40cm ø x 150cm L / Clear Stone / Warm White", price: 3109 }, { label: "40cm ø x 150cm L / Clear Stone / Cool White", price: 3109 }, { label: "40cm ø x 150cm L / Black Stone / Warm White", price: 3109 }, { label: "40cm ø x 150cm L / Black Stone / Cool White", price: 3109 }, { label: "60cm ø x 200cm L / Clear Stone / Warm White", price: 5735 }, { label: "60cm ø x 200cm L / Clear Stone / Cool White", price: 5735 }, { label: "60cm ø x 200cm L / Black Stone / Warm White", price: 5735 }, { label: "60cm ø x 200cm L / Black Stone / Cool White", price: 5735 }, { label: "80cm ø x 250cm L / Clear Stone / Warm White", price: 8272 }, { label: "80cm ø x 250cm L / Clear Stone / Cool White", price: 8272 }, { label: "80cm ø x 250cm L / Black Stone / Warm White", price: 8272 }, { label: "80cm ø x 250cm L / Black Stone / Cool White", price: 8272 }, { label: "100cm ø x 300cm L / Clear Stone / Warm White", price: 13006 }, { label: "100cm ø x 300cm L / Clear Stone / Cool White", price: 13006 }, { label: "100cm ø x 300cm L / Black Stone / Warm White", price: 13006 }, { label: "100cm ø x 300cm L / Black Stone / Cool White", price: 13006 }, { label: "120cm ø x 300cm L / Clear Stone / Warm White", price: 16231 }, { label: "120cm ø x 300cm L / Clear Stone / Cool White", price: 16231 }, { label: "120cm ø x 300cm L / Black Stone / Warm White", price: 16231 }, { label: "120cm ø x 300cm L / Black Stone / Cool White", price: 16231 }],
    desc: "A 40cm stone chandelier on a 150cm drop, for a stairwell or void.",
    features: [
      "40cm diameter, 150cm drop",
      "Clear stone",
      "Stairwell or void"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "20", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt46", name: "Gold & Black Floor Lamp", cat: "Home Décor", room: "Home Décor", price: 3478, memberPrice: 3130, sku: "SH-10598", tag: "New", ph: "", img: "assets/products/lt46.webp",
    imgs: ["assets/products/lt46.webp", "assets/products/lt46-2.webp", "assets/products/lt46-3.webp", "assets/products/lt46-4.webp", "assets/products/lt46-5.webp"],
    sizes: [{ label: "Warm White", price: 3478 }],
    desc: "An LED floor lamp in gold and black, warm white.",
    features: [
      "LED floor lamp",
      "Gold and black",
      "Warm White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "1", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt47", name: "Pendant in Brown or Black", cat: "Home Décor", room: "Home Décor", price: 3498, memberPrice: 3148, sku: "SH-10599", tag: "New", ph: "", img: "assets/products/lt47.webp",
    imgs: ["assets/products/lt47.webp", "assets/products/lt47-2.webp", "assets/products/lt47-3.webp", "assets/products/lt47-4.webp", "assets/products/lt47-5.webp"],
    sizes: [{ label: "Light Brown", price: 3498 }, { label: "Dark Brown", price: 3498 }, { label: "Black", price: 3498 }],
    desc: "Light brown, dark brown or black.",
    features: [
      "Three colourways",
      "LED",
      "Pendant fitting"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "3", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt48", name: "LED Chandelier, Small or Large", cat: "Home Décor", room: "Home Décor", price: 4137, memberPrice: 3723, sku: "SH-10600", tag: "New", ph: "", img: "assets/products/lt48.webp",
    imgs: ["assets/products/lt48.webp", "assets/products/lt48-2.webp", "assets/products/lt48-3.webp", "assets/products/lt48-4.webp", "assets/products/lt48-5.webp"],
    sizes: [{ label: "Small / Cold White", price: 4137 }, { label: "Small / Warm White", price: 4137 }, { label: "Large / Cold White", price: 5369 }, { label: "Large / Warm White", price: 5369 }],
    desc: "Two sizes, cold or warm white.",
    features: [
      "LED chandelier",
      "Small and Large",
      "Cold or Warm White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "4", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt49", name: "Crystal Chandelier (120 or 150cm)", cat: "Home Décor", room: "Home Décor", price: 4167, memberPrice: 3750, sku: "SH-10601", tag: "New", ph: "", img: "assets/products/lt49.webp",
    imgs: ["assets/products/lt49.webp", "assets/products/lt49-2.webp", "assets/products/lt49-3.webp", "assets/products/lt49-4.webp", "assets/products/lt49-5.webp"],
    sizes: [{ label: "120cm / Warm White 3000K", price: 4167 }, { label: "150cm / Warm White 3000K", price: 6481 }],
    desc: "Crystal at 120cm or 150cm, 3000K warm white. The largest fitting we carry.",
    features: [
      "Crystal chandelier",
      "120cm and 150cm",
      "3000K Warm White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "2", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "lt50", name: "Midnight Chandelier (60cm)", cat: "Home Décor", room: "Home Décor", price: 4322, memberPrice: 3890, sku: "SH-10602", tag: "New", ph: "", img: "assets/products/lt50.webp",
    imgs: ["assets/products/lt50.webp", "assets/products/lt50-2.webp", "assets/products/lt50-3.webp", "assets/products/lt50-4.webp", "assets/products/lt50-5.webp"],
    sizes: [{ label: "60cm ø x 38cm H / Dimmable Warm White", price: 4322 }, { label: "60cm ø x 38cm H / Dimmable Cool White", price: 4322 }, { label: "80cm ø 38cm H / Dimmable Warm White", price: 6393 }, { label: "80cm ø 38cm H / Dimmable Cool White", price: 6393 }, { label: "100cm ø 38cm H / Dimmable Warm White", price: 10463 }, { label: "100cm ø 38cm H / Dimmable Cool White", price: 10463 }, { label: "120cm ø 38cm H / Dimmable Warm White", price: 11915 }, { label: "120cm ø 38cm H / Dimmable Cool White", price: 11915 }],
    desc: "A black 60cm chandelier with dimmable warm white.",
    features: [
      "Black finish",
      "60cm diameter",
      "Dimmable Warm White"
    ],
    specs: { "Type": "Light fitting", "Material": "Glass / metal", "Options": "8", "Install": "Licensed electrician for hard-wired fittings" },
    care: "Switch it off and let it cool before cleaning. Dust with a dry, soft cloth; for glass or crystal, a barely damp cloth then dry buffing keeps it clear. Hard-wired fittings should be installed by a licensed electrician." },

  { id: "rg01", name: "Circular Rug (Five Sizes)", cat: "Home Décor", room: "Home Décor", price: 578, memberPrice: 520, sku: "SH-10603", tag: "New", ph: "", img: "assets/products/rg01.webp",
    imgs: ["assets/products/rg01.webp", "assets/products/rg01-2.webp", "assets/products/rg01-3.webp", "assets/products/rg01-4.webp", "assets/products/rg01-5.webp"],
    sizes: [{ label: "1 / 120cm", price: 578 }, { label: "2 / 120cm", price: 578 }, { label: "3 / 120cm", price: 578 }, { label: "4 / 120cm", price: 578 }, { label: "5 / 120cm", price: 578 }, { label: "6 / 120cm", price: 578 }, { label: "1 / 140cm", price: 767 }, { label: "2 / 140cm", price: 767 }, { label: "3 / 140cm", price: 767 }, { label: "4 / 140cm", price: 767 }, { label: "5 / 140cm", price: 767 }, { label: "6 / 140cm", price: 767 }, { label: "1 / 160cm", price: 1344 }, { label: "2 / 160cm", price: 1344 }, { label: "3 / 160cm", price: 1344 }, { label: "4 / 160cm", price: 1344 }, { label: "5 / 160cm", price: 1344 }, { label: "6 / 160cm", price: 1344 }, { label: "1 / 180cm", price: 1556 }, { label: "2 / 180cm", price: 1556 }, { label: "3 / 180cm", price: 1556 }, { label: "4 / 180cm", price: 1556 }, { label: "5 / 180cm", price: 1556 }, { label: "6 / 180cm", price: 1556 }, { label: "1 / 200cm", price: 1828 }, { label: "2 / 200cm", price: 1828 }, { label: "3 / 200cm", price: 1828 }, { label: "4 / 200cm", price: 1828 }, { label: "5 / 200cm", price: 1828 }, { label: "6 / 200cm", price: 1828 }, { label: "1 / 250cm", price: 3422 }, { label: "2 / 250cm", price: 3422 }, { label: "3 / 250cm", price: 3422 }, { label: "4 / 250cm", price: 3422 }, { label: "5 / 250cm", price: 3422 }, { label: "6 / 250cm", price: 3422 }, { label: "1 / 300cm", price: 4815 }, { label: "2 / 300cm", price: 4815 }, { label: "3 / 300cm", price: 4815 }, { label: "4 / 300cm", price: 4815 }, { label: "5 / 300cm", price: 4815 }, { label: "6 / 300cm", price: 4815 }],
    desc: "A round rug from 120cm to 200cm. Round rugs suit a reading corner or under a round table better than a rectangle does.",
    features: [
      "Round, 120cm to 200cm",
      "Several designs",
      "Suits a corner or round table"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "42" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg02", name: "Rug Collection (Five Sizes)", cat: "Home Décor", room: "Home Décor", price: 593, memberPrice: 534, sku: "SH-10604", tag: "New", ph: "", img: "assets/products/rg02.webp",
    imgs: ["assets/products/rg02.webp", "assets/products/rg02-2.webp", "assets/products/rg02-3.webp", "assets/products/rg02-4.webp", "assets/products/rg02-5.webp"],
    sizes: [{ label: "1 / 100cm", price: 593 }, { label: "2 / 100cm", price: 593 }, { label: "3 / 100cm", price: 593 }, { label: "4 / 100cm", price: 593 }, { label: "5 / 100cm", price: 593 }, { label: "6 / 100cm", price: 593 }, { label: "7 / 100cm", price: 593 }, { label: "8 / 100cm", price: 593 }, { label: "9 / 100cm", price: 593 }, { label: "10 / 100cm", price: 593 }, { label: "11 / 100cm", price: 593 }, { label: "1 / 120cm", price: 993 }, { label: "2 / 120cm", price: 993 }, { label: "3 / 120cm", price: 993 }, { label: "4 / 120cm", price: 993 }, { label: "5 / 120cm", price: 993 }, { label: "6 / 120cm", price: 993 }, { label: "7 / 120cm", price: 993 }, { label: "8 / 120cm", price: 993 }, { label: "9 / 120cm", price: 993 }, { label: "10 / 120cm", price: 993 }, { label: "11 / 120cm", price: 993 }, { label: "1 / 140cm", price: 1378 }, { label: "2 / 140cm", price: 1378 }, { label: "3 / 140cm", price: 1378 }, { label: "4 / 140cm", price: 1378 }, { label: "5 / 140cm", price: 1378 }, { label: "6 / 140cm", price: 1378 }, { label: "7 / 140cm", price: 1378 }, { label: "8 / 140cm", price: 1378 }, { label: "9 / 140cm", price: 1378 }, { label: "10 / 140cm", price: 1378 }, { label: "11 / 140cm", price: 1378 }, { label: "1 / 160cm", price: 1826 }, { label: "2 / 160cm", price: 1826 }, { label: "3 / 160cm", price: 1826 }, { label: "4 / 160cm", price: 1826 }, { label: "5 / 160cm", price: 1826 }, { label: "6 / 160cm", price: 1826 }, { label: "7 / 160cm", price: 1826 }, { label: "8 / 160cm", price: 1826 }, { label: "9 / 160cm", price: 1826 }, { label: "10 / 160cm", price: 1826 }, { label: "11 / 160cm", price: 1826 }, { label: "1 / 180cm", price: 2500 }, { label: "2 / 180cm", price: 2500 }, { label: "3 / 180cm", price: 2500 }, { label: "4 / 180cm", price: 2500 }, { label: "5 / 180cm", price: 2500 }, { label: "6 / 180cm", price: 2500 }, { label: "7 / 180cm", price: 2500 }, { label: "8 / 180cm", price: 2500 }, { label: "9 / 180cm", price: 2500 }, { label: "10 / 180cm", price: 2500 }, { label: "11 / 180cm", price: 2500 }, { label: "1 / 200cm", price: 2593 }, { label: "2 / 200cm", price: 2593 }, { label: "3 / 200cm", price: 2593 }, { label: "4 / 200cm", price: 2593 }, { label: "5 / 200cm", price: 2593 }, { label: "6 / 200cm", price: 2593 }, { label: "7 / 200cm", price: 2593 }, { label: "8 / 200cm", price: 2593 }, { label: "9 / 200cm", price: 2593 }, { label: "10 / 200cm", price: 2593 }, { label: "11 / 200cm", price: 2593 }, { label: "1 / 240cm", price: 4019 }, { label: "2 / 240cm", price: 4019 }, { label: "3 / 240cm", price: 4019 }, { label: "4 / 240cm", price: 4019 }, { label: "5 / 240cm", price: 4019 }, { label: "6 / 240cm", price: 4019 }, { label: "7 / 240cm", price: 4019 }, { label: "8 / 240cm", price: 4019 }, { label: "9 / 240cm", price: 4019 }, { label: "10 / 240cm", price: 4019 }, { label: "11 / 240cm", price: 4019 }],
    desc: "From 100cm to 180cm, in several designs.",
    features: [
      "100cm to 180cm",
      "Several designs",
      "Living or bedroom"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "77" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg03", name: "Urban Circle Rug", cat: "Home Décor", room: "Home Décor", price: 793, memberPrice: 714, sku: "SH-10605", tag: "New", ph: "", img: "assets/products/rg03.webp",
    imgs: ["assets/products/rg03.webp", "assets/products/rg03-2.webp", "assets/products/rg03-3.webp", "assets/products/rg03-4.webp"],
    sizes: [{ label: "120cm", price: 793 }, { label: "140cm", price: 1050 }, { label: "160cm", price: 1461 }, { label: "180cm", price: 1846 }, { label: "200cm", price: 2141 }],
    desc: "Round, from 120cm to 200cm.",
    features: [
      "Round format",
      "120cm to 200cm",
      "Five sizes"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "5" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg04", name: "Beige Rug (Five Sizes)", cat: "Home Décor", room: "Home Décor", price: 907, memberPrice: 816, sku: "SH-10606", tag: "New", ph: "", img: "assets/products/rg04.webp",
    imgs: ["assets/products/rg04.webp", "assets/products/rg04-2.webp", "assets/products/rg04-3.webp", "assets/products/rg04-4.webp", "assets/products/rg04-5.webp"],
    sizes: [{ label: "1 / 120cm", price: 907 }, { label: "2 / 120cm", price: 907 }, { label: "3 / 120cm", price: 907 }, { label: "4 / 120cm", price: 907 }, { label: "5 / 120cm", price: 907 }, { label: "1 / 140cm", price: 1167 }, { label: "2 / 140cm", price: 1167 }, { label: "3 / 140cm", price: 1167 }, { label: "4 / 140cm", price: 1167 }, { label: "5 / 140cm", price: 1167 }, { label: "1 / 160cm", price: 1417 }, { label: "2 / 160cm", price: 1417 }, { label: "3 / 160cm", price: 1417 }, { label: "4 / 160cm", price: 1417 }, { label: "5 / 160cm", price: 1417 }, { label: "1 / 180cm", price: 1646 }, { label: "2 / 180cm", price: 1646 }, { label: "3 / 180cm", price: 1646 }, { label: "4 / 180cm", price: 1646 }, { label: "5 / 180cm", price: 1646 }, { label: "1 / 200cm", price: 1907 }, { label: "2 / 200cm", price: 1907 }, { label: "3 / 200cm", price: 1907 }, { label: "4 / 200cm", price: 1907 }, { label: "5 / 200cm", price: 1907 }, { label: "1 / 250cm", price: 2593 }, { label: "2 / 250cm", price: 2593 }, { label: "3 / 250cm", price: 2593 }, { label: "4 / 250cm", price: 2593 }, { label: "5 / 250cm", price: 2593 }, { label: "1 / 300cm", price: 3000 }, { label: "2 / 300cm", price: 3000 }, { label: "3 / 300cm", price: 3000 }, { label: "4 / 300cm", price: 3000 }, { label: "5 / 300cm", price: 3000 }],
    desc: "Beige, 120cm to 200cm.",
    features: [
      "Beige colourway",
      "120cm to 200cm",
      "Neutral, easy to place"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "35" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg05", name: "Rug in Five Sizes (from 50 x 80cm)", cat: "Home Décor", room: "Home Décor", price: 920, memberPrice: 828, sku: "SH-10607", tag: "New", ph: "", img: "assets/products/rg05.webp",
    imgs: ["assets/products/rg05.webp", "assets/products/rg05-2.webp", "assets/products/rg05-3.webp", "assets/products/rg05-4.webp", "assets/products/rg05-5.webp"],
    sizes: [{ label: "50cm x 80cm", price: 920 }, { label: "80cm x 130cm", price: 2109 }, { label: "100cm x 160cm", price: 3157 }, { label: "120cm x 200cm", price: 4439 }, { label: "160cm x 250cm", price: 6257 }, { label: "200cm x 290cm", price: 7220 }],
    desc: "From a 50 by 80cm mat up to larger sizes, so it works in an entry or a lounge.",
    features: [
      "50 x 80cm up to large",
      "Entry mat or room rug",
      "Several sizes"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "6" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg06", name: "Rug Collection (100 x 150cm up)", cat: "Home Décor", room: "Home Décor", price: 1339, memberPrice: 1205, sku: "SH-10608", tag: "New", ph: "", img: "assets/products/rg06.webp",
    imgs: ["assets/products/rg06.webp", "assets/products/rg06-2.webp", "assets/products/rg06-3.webp", "assets/products/rg06-4.webp", "assets/products/rg06-5.webp"],
    sizes: [{ label: "1 / 100 x 150cm", price: 1339 }, { label: "2 / 100 x 150cm", price: 1339 }, { label: "3 / 100 x 150cm", price: 1339 }, { label: "4 / 100 x 150cm", price: 1339 }, { label: "5 / 100 x 150cm", price: 1339 }, { label: "6 / 100 x 150cm", price: 1339 }, { label: "7 / 100 x 150cm", price: 1339 }, { label: "8 / 100 x 150cm", price: 1339 }, { label: "9 / 100 x 150cm", price: 1339 }, { label: "10 / 100 x 150cm", price: 1339 }, { label: "1 / 120 x 160cm", price: 1522 }, { label: "2 / 120 x 160cm", price: 1522 }, { label: "3 / 120 x 160cm", price: 1522 }, { label: "4 / 120 x 160cm", price: 1522 }, { label: "5 / 120 x 160cm", price: 1522 }, { label: "6 / 120 x 160cm", price: 1522 }, { label: "7 / 120 x 160cm", price: 1522 }, { label: "8 / 120 x 160cm", price: 1522 }, { label: "9 / 120 x 160cm", price: 1522 }, { label: "10 / 120 x 160cm", price: 1522 }, { label: "1 / 100 x 200cm", price: 1561 }, { label: "2 / 100 x 200cm", price: 1561 }, { label: "3 / 100 x 200cm", price: 1561 }, { label: "4 / 100 x 200cm", price: 1561 }, { label: "5 / 100 x 200cm", price: 1561 }, { label: "6 / 100 x 200cm", price: 1561 }, { label: "7 / 100 x 200cm", price: 1561 }, { label: "8 / 100 x 200cm", price: 1561 }, { label: "9 / 100 x 200cm", price: 1561 }, { label: "10 / 100 x 200cm", price: 1561 }, { label: "1 / 140 x 200cm", price: 2072 }, { label: "2 / 140 x 200cm", price: 2072 }, { label: "3 / 140 x 200cm", price: 2072 }, { label: "4 / 140 x 200cm", price: 2072 }, { label: "5 / 140 x 200cm", price: 2072 }, { label: "6 / 140 x 200cm", price: 2072 }, { label: "7 / 140 x 200cm", price: 2072 }, { label: "8 / 140 x 200cm", price: 2072 }, { label: "9 / 140 x 200cm", price: 2072 }, { label: "10 / 140 x 200cm", price: 2072 }, { label: "1 / 160 x 230cm", price: 2628 }, { label: "2 / 160 x 230cm", price: 2628 }, { label: "3 / 160 x 230cm", price: 2628 }, { label: "4 / 160 x 230cm", price: 2628 }, { label: "5 / 160 x 230cm", price: 2628 }, { label: "6 / 160 x 230cm", price: 2628 }, { label: "7 / 160 x 230cm", price: 2628 }, { label: "8 / 160 x 230cm", price: 2628 }, { label: "9 / 160 x 230cm", price: 2628 }, { label: "10 / 160 x 230cm", price: 2628 }, { label: "1 / 180 x 250cm", price: 3361 }, { label: "2 / 180 x 250cm", price: 3361 }, { label: "3 / 180 x 250cm", price: 3361 }, { label: "4 / 180 x 250cm", price: 3361 }, { label: "5 / 180 x 250cm", price: 3361 }, { label: "6 / 180 x 250cm", price: 3361 }, { label: "7 / 180 x 250cm", price: 3361 }, { label: "8 / 180 x 250cm", price: 3361 }, { label: "9 / 180 x 250cm", price: 3361 }, { label: "10 / 180 x 250cm", price: 3361 }, { label: "1 / 180 x 280cm", price: 3681 }, { label: "2 / 180 x 280cm", price: 3681 }, { label: "3 / 180 x 280cm", price: 3681 }, { label: "4 / 180 x 280cm", price: 3681 }, { label: "5 / 180 x 280cm", price: 3681 }, { label: "6 / 180 x 280cm", price: 3681 }, { label: "7 / 180 x 280cm", price: 3681 }, { label: "8 / 180 x 280cm", price: 3681 }, { label: "9 / 180 x 280cm", price: 3681 }, { label: "10 / 180 x 280cm", price: 3681 }, { label: "1 / 200 x 250cm", price: 3889 }, { label: "2 / 200 x 250cm", price: 3889 }, { label: "3 / 200 x 250cm", price: 3889 }, { label: "4 / 200 x 250cm", price: 3889 }, { label: "5 / 200 x 250cm", price: 3889 }, { label: "6 / 200 x 250cm", price: 3889 }, { label: "7 / 200 x 250cm", price: 3889 }, { label: "8 / 200 x 250cm", price: 3889 }, { label: "9 / 200 x 250cm", price: 3889 }, { label: "10 / 200 x 250cm", price: 3889 }, { label: "1 / 200 x 300cm", price: 4135 }, { label: "2 / 200 x 300cm", price: 4135 }, { label: "3 / 200 x 300cm", price: 4135 }, { label: "4 / 200 x 300cm", price: 4135 }, { label: "5 / 200 x 300cm", price: 4135 }, { label: "6 / 200 x 300cm", price: 4135 }, { label: "7 / 200 x 300cm", price: 4135 }, { label: "8 / 200 x 300cm", price: 4135 }, { label: "9 / 200 x 300cm", price: 4135 }, { label: "10 / 200 x 300cm", price: 4135 }],
    desc: "From 100 by 150cm, in several designs.",
    features: [
      "From 100 x 150cm",
      "Several designs",
      "Multiple sizes"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "90" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg07", name: "Royale Beige Rug", cat: "Home Décor", room: "Home Décor", price: 1370, memberPrice: 1233, sku: "SH-10609", tag: "New", ph: "", img: "assets/products/rg07.webp",
    imgs: ["assets/products/rg07.webp", "assets/products/rg07-2.webp", "assets/products/rg07-3.webp", "assets/products/rg07-4.webp", "assets/products/rg07-5.webp"],
    sizes: [{ label: "120 x 160cm / Beige", price: 1370 }, { label: "140 x 200cm / Beige", price: 1804 }, { label: "160 x 230cm / Beige", price: 2222 }, { label: "180 x 280cm / Beige", price: 3083 }, { label: "200 x 300cm / Beige", price: 3676 }],
    desc: "Beige, from 120 by 160cm to 160 by 230cm.",
    features: [
      "Beige colourway",
      "120 x 160cm to 160 x 230cm",
      "Soft underfoot"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "5" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg08", name: "Eveline Rug (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 1567, memberPrice: 1410, sku: "SH-10610", tag: "New", ph: "", img: "assets/products/rg08.webp",
    imgs: ["assets/products/rg08.webp", "assets/products/rg08-2.webp", "assets/products/rg08-3.webp", "assets/products/rg08-4.webp"],
    sizes: [{ label: "120 x 160cm", price: 1567 }, { label: "100 x 200cm", price: 1593 }, { label: "140 x 200cm", price: 1817 }, { label: "160 x 230cm", price: 2194 }, { label: "200 x 250cm", price: 2911 }, { label: "180 x 280cm", price: 2939 }, { label: "200 x 300cm", price: 3406 }],
    desc: "100 by 200cm through to 160 by 230cm.",
    features: [
      "Four sizes",
      "100 x 200cm to 160 x 230cm",
      "Living or bedroom"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "7" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg09", name: "Black & White Artistic Rug", cat: "Home Décor", room: "Home Décor", price: 1600, memberPrice: 1440, sku: "SH-10611", tag: "New", ph: "", img: "assets/products/rg09.webp",
    imgs: ["assets/products/rg09.webp", "assets/products/rg09-2.webp", "assets/products/rg09-3.webp", "assets/products/rg09-4.webp", "assets/products/rg09-5.webp"],
    sizes: [{ label: "Black + White / 140 x 200cm", price: 1600 }, { label: "Black + White / 160 x 230cm", price: 1963 }, { label: "Black + White / 180 x 280cm", price: 2600 }, { label: "Black + White / 200 x 300cm", price: 3052 }],
    desc: "A bold black and white pattern, from 140 by 200cm.",
    features: [
      "Black and white pattern",
      "From 140 x 200cm",
      "A graphic statement"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "4" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg10", name: "Wool Rug (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 1717, memberPrice: 1545, sku: "SH-10612", tag: "New", ph: "", img: "assets/products/rg10.webp",
    imgs: ["assets/products/rg10.webp", "assets/products/rg10-2.webp", "assets/products/rg10-3.webp", "assets/products/rg10-4.webp", "assets/products/rg10-5.webp"],
    sizes: [{ label: "80cm x 130cm", price: 1717 }, { label: "100cm x 160cm", price: 2574 }, { label: "120cm x 200cm", price: 3406 }, { label: "160cm x 250cm", price: 6000 }, { label: "200cm x 290cm", price: 7759 }, { label: "220cm x 340cm", price: 10720 }],
    desc: "Wool from 80 by 130cm up to larger sizes. Wool wears better than synthetic and feels it.",
    features: [
      "Wool pile",
      "From 80 x 130cm",
      "Hard-wearing"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "6" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg11", name: "Florient Rug (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 1754, memberPrice: 1579, sku: "SH-10613", tag: "New", ph: "", img: "assets/products/rg11.webp",
    imgs: ["assets/products/rg11.webp", "assets/products/rg11-2.webp", "assets/products/rg11-3.webp", "assets/products/rg11-4.webp", "assets/products/rg11-5.webp"],
    sizes: [{ label: "1 / 80cm x 150cm", price: 1754 }, { label: "2 / 80cm x 150cm", price: 1754 }, { label: "1 / 120cm x 180cm", price: 2939 }, { label: "2 / 120cm x 180cm", price: 2939 }, { label: "1 / 140cm x 200cm", price: 3870 }, { label: "2 / 140cm x 200cm", price: 3870 }, { label: "1 / 160cm x 230cm", price: 4791 }, { label: "2 / 160cm x 230cm", price: 4791 }, { label: "1 / 200cm x 250cm", price: 6417 }, { label: "2 / 200cm x 250cm", price: 6417 }, { label: "1 / 200cm x 300cm", price: 7646 }, { label: "2 / 200cm x 300cm", price: 7646 }, { label: "1 / 240cm x 340cm", price: 10294 }, { label: "2 / 240cm x 340cm", price: 10294 }, { label: "1 / 300cm x 400cm", price: 14796 }, { label: "2 / 300cm x 400cm", price: 14796 }],
    desc: "From 80 by 150cm.",
    features: [
      "From 80 x 150cm",
      "Several designs",
      "Multiple sizes"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "16" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg12", name: "Milan Rug Collection", cat: "Home Décor", room: "Home Décor", price: 1815, memberPrice: 1634, sku: "SH-10614", tag: "New", ph: "", img: "assets/products/rg12.webp",
    imgs: ["assets/products/rg12.webp", "assets/products/rg12-2.webp", "assets/products/rg12-3.webp", "assets/products/rg12-4.webp", "assets/products/rg12-5.webp"],
    sizes: [{ label: "1 / 140 x 200cm", price: 1815 }, { label: "2 / 140 x 200cm", price: 1815 }, { label: "3 / 140 x 200cm", price: 1815 }, { label: "4 / 140 x 200cm", price: 1815 }, { label: "5 / 140 x 200cm", price: 1815 }, { label: "6 / 140 x 200cm", price: 1815 }, { label: "7 / 140 x 200cm", price: 1815 }, { label: "8 / 140 x 200cm", price: 1815 }, { label: "9 / 140 x 200cm", price: 1815 }, { label: "1 / 160 x 230cm", price: 2200 }, { label: "2 / 160 x 230cm", price: 2200 }, { label: "3 / 160 x 230cm", price: 2200 }, { label: "4 / 160 x 230cm", price: 2200 }, { label: "5 / 160 x 230cm", price: 2200 }, { label: "6 / 160 x 230cm", price: 2200 }, { label: "7 / 160 x 230cm", price: 2200 }, { label: "8 / 160 x 230cm", price: 2200 }, { label: "9 / 160 x 230cm", price: 2200 }, { label: "1 / 180 x 280cm", price: 2833 }, { label: "2 / 180 x 280cm", price: 2833 }, { label: "3 / 180 x 280cm", price: 2833 }, { label: "4 / 180 x 280cm", price: 2833 }, { label: "5 / 180 x 280cm", price: 2833 }, { label: "6 / 180 x 280cm", price: 2833 }, { label: "7 / 180 x 280cm", price: 2833 }, { label: "8 / 180 x 280cm", price: 2833 }, { label: "9 / 180 x 280cm", price: 2833 }, { label: "1 / 200 x 300cm", price: 3278 }, { label: "2 / 200 x 300cm", price: 3278 }, { label: "3 / 200 x 300cm", price: 3278 }, { label: "4 / 200 x 300cm", price: 3278 }, { label: "5 / 200 x 300cm", price: 3278 }, { label: "6 / 200 x 300cm", price: 3278 }, { label: "7 / 200 x 300cm", price: 3278 }, { label: "8 / 200 x 300cm", price: 3278 }, { label: "9 / 200 x 300cm", price: 3278 }, { label: "1 / 240 x 360cm", price: 4019 }, { label: "2 / 240 x 360cm", price: 4019 }, { label: "3 / 240 x 360cm", price: 4019 }, { label: "4 / 240 x 360cm", price: 4019 }, { label: "5 / 240 x 360cm", price: 4019 }, { label: "6 / 240 x 360cm", price: 4019 }, { label: "7 / 240 x 360cm", price: 4019 }, { label: "8 / 240 x 360cm", price: 4019 }, { label: "9 / 240 x 360cm", price: 4019 }],
    desc: "From 140 by 200cm up to 180 by 280cm.",
    features: [
      "140 x 200cm to 180 x 280cm",
      "Several designs",
      "Room-sized"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "45" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg13", name: "Large Round Rug (200-300cm)", cat: "Home Décor", room: "Home Décor", price: 2050, memberPrice: 1845, sku: "SH-10615", tag: "New", ph: "", img: "assets/products/rg13.webp",
    imgs: ["assets/products/rg13.webp", "assets/products/rg13-2.webp", "assets/products/rg13-3.webp", "assets/products/rg13-4.webp"],
    sizes: [{ label: "200cm ø", price: 2050 }, { label: "250cm ø", price: 3844 }, { label: "300cm ø", price: 5417 }],
    desc: "Round at 200cm, 250cm or 300cm. A 300cm circle anchors a whole seating group.",
    features: [
      "Round, 200cm to 300cm",
      "Three sizes",
      "Anchors a seating group"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "3" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg14", name: "Victoire Rug (Three Sizes)", cat: "Home Décor", room: "Home Décor", price: 2050, memberPrice: 1845, sku: "SH-10616", tag: "New", ph: "", img: "assets/products/rg14.webp",
    imgs: ["assets/products/rg14.webp", "assets/products/rg14-2.webp", "assets/products/rg14-3.webp", "assets/products/rg14-4.webp", "assets/products/rg14-5.webp"],
    sizes: [{ label: "200cm x 200cm", price: 2050 }, { label: "180cm x 280cm", price: 2383 }, { label: "200cm x 300cm", price: 2694 }],
    desc: "200 by 200cm, 180 by 280cm or 200 by 300cm.",
    features: [
      "Three sizes",
      "Up to 200 x 300cm",
      "Living room scale"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "3" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg15", name: "Zelie Wool Rug (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 2220, memberPrice: 1998, sku: "SH-10617", tag: "New", ph: "", img: "assets/products/rg15.webp",
    imgs: ["assets/products/rg15.webp", "assets/products/rg15-2.webp", "assets/products/rg15-3.webp", "assets/products/rg15-4.webp", "assets/products/rg15-5.webp"],
    sizes: [{ label: "140cm x 195cm", price: 2220 }, { label: "160cm x 220cm", price: 5296 }, { label: "200cm x 280cm", price: 8702 }, { label: "240cm x 330cm", price: 12037 }, { label: "300cm x 400cm", price: 17130 }],
    desc: "Wool from 140 by 195cm up to 240cm wide.",
    features: [
      "Wool pile",
      "140 x 195cm to 240cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "5" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg16", name: "Black Rug (Three Sizes)", cat: "Home Décor", room: "Home Décor", price: 2300, memberPrice: 2070, sku: "SH-10618", tag: "New", ph: "", img: "assets/products/rg16.webp",
    imgs: ["assets/products/rg16.webp", "assets/products/rg16-2.webp", "assets/products/rg16-3.webp"],
    sizes: [{ label: "Black / 200 x 200cm", price: 2300 }, { label: "Black / 180 x 250cm", price: 2517 }, { label: "Black / 200 x 250cm", price: 2704 }, { label: "Black / 180 x 280cm", price: 2870 }, { label: "Black / 200 x 300cm", price: 3294 }, { label: "Black / 220 x 330cm", price: 3519 }, { label: "Black / 240 x 360cm", price: 3972 }, { label: "Black / 300 x 400cm", price: 4961 }],
    desc: "Black, from 180 by 250cm.",
    features: [
      "Black colourway",
      "From 180 x 250cm",
      "Grounds a light room"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "8" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg17", name: "Gaspard Rug (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 2630, memberPrice: 2367, sku: "SH-10619", tag: "New", ph: "", img: "assets/products/rg17.webp",
    imgs: ["assets/products/rg17.webp", "assets/products/rg17-2.webp", "assets/products/rg17-3.webp", "assets/products/rg17-4.webp", "assets/products/rg17-5.webp"],
    sizes: [{ label: "140cm x 200cm", price: 2630 }, { label: "160cm x 240cm", price: 3593 }, { label: "200cm x 300cm", price: 5346 }, { label: "240cm x 340cm", price: 7204 }, { label: "300cm x 400cm", price: 9630 }],
    desc: "From 140 by 200cm to 240cm wide.",
    features: [
      "Four sizes",
      "140 x 200cm upward",
      "Living room scale"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "5" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg18", name: "Wool Rug (160 x 240cm up)", cat: "Home Décor", room: "Home Décor", price: 2717, memberPrice: 2445, sku: "SH-10620", tag: "New", ph: "", img: "assets/products/rg18.webp",
    imgs: ["assets/products/rg18.webp", "assets/products/rg18-2.webp", "assets/products/rg18-3.webp", "assets/products/rg18-4.webp", "assets/products/rg18-5.webp"],
    sizes: [{ label: "160cm x 240cm", price: 2717 }, { label: "200cm x 300cm", price: 4313 }, { label: "240cm x 340cm", price: 5907 }, { label: "300cm x 400cm", price: 8176 }],
    desc: "Wool from 160 by 240cm to 300cm.",
    features: [
      "Wool pile",
      "160 x 240cm to 300cm",
      "Large formats"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg19", name: "Wool & Cotton Rug", cat: "Home Décor", room: "Home Décor", price: 2754, memberPrice: 2479, sku: "SH-10621", tag: "New", ph: "", img: "assets/products/rg19.webp",
    imgs: ["assets/products/rg19.webp", "assets/products/rg19-2.webp", "assets/products/rg19-3.webp", "assets/products/rg19-4.webp", "assets/products/rg19-5.webp"],
    sizes: [{ label: "140cm x 200cm", price: 2754 }, { label: "160cm x 230cm", price: 4028 }, { label: "200cm x 290cm", price: 6009 }],
    desc: "Wool with cotton, three sizes.",
    features: [
      "Wool and cotton",
      "Three sizes",
      "Soft underfoot"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "3" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg20", name: "Cream Wool Rug", cat: "Home Décor", room: "Home Décor", price: 2991, memberPrice: 2692, sku: "SH-10622", tag: "New", ph: "", img: "assets/products/rg20.webp",
    imgs: ["assets/products/rg20.webp", "assets/products/rg20-2.webp", "assets/products/rg20-3.webp", "assets/products/rg20-4.webp", "assets/products/rg20-5.webp"],
    sizes: [{ label: "Cream / 160cm x 230cm", price: 2991 }, { label: "Grey / 160cm x 230cm", price: 2991 }, { label: "Cream / 200cm x 290cm", price: 4665 }, { label: "Grey / 200cm x 290cm", price: 4665 }, { label: "Cream / 240cm x 330cm", price: 6463 }, { label: "Grey / 240cm x 330cm", price: 6463 }, { label: "Cream / 300cm x 400cm", price: 9444 }, { label: "Grey / 300cm x 400cm", price: 9444 }],
    desc: "Cream wool from 160 by 230cm.",
    features: [
      "Wool pile",
      "Cream colourway",
      "From 160 x 230cm"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "8" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg21", name: "Cotton Rug (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 3241, memberPrice: 2917, sku: "SH-10623", tag: "New", ph: "", img: "assets/products/rg21.webp",
    imgs: ["assets/products/rg21.webp", "assets/products/rg21-2.webp", "assets/products/rg21-3.webp", "assets/products/rg21-4.webp", "assets/products/rg21-5.webp"],
    sizes: [{ label: "160cm x 230cm", price: 3241 }, { label: "200cm x 300cm", price: 5143 }, { label: "240cm x 340cm", price: 6961 }, { label: "280cm x 380cm", price: 9628 }],
    desc: "Cotton from 160 by 230cm to 280cm. Cotton is lighter and easier to clean than wool.",
    features: [
      "Cotton construction",
      "160 x 230cm to 280cm",
      "Easier to clean than wool"
    ],
    specs: { "Type": "Rug", "Material": "Mixed fibre", "Sizes": "4" },
    care: "Vacuum regularly and blot spills straight away rather than rubbing. Rotate every few months for even wear, and use an underlay on hard floors." },

  { id: "rg22", name: "Thali Wool Rug", cat: "Home Décor", room: "Home Décor", price: 3680, memberPrice: 3312, sku: "SH-10624", tag: "New", ph: "", img: "assets/products/rg22.webp",
    imgs: ["assets/products/rg22.webp", "assets/products/rg22-2.webp", "assets/products/rg22-3.webp", "assets/products/rg22-4.webp", "assets/products/rg22-5.webp"],
    sizes: [{ label: "140cm x 200cm", price: 3680 }, { label: "160cm x 230cm", price: 4528 }, { label: "200cm x 290cm", price: 7130 }, { label: "240cm x 340cm", price: 10231 }, { label: "300cm x 400cm", price: 14035 }],
    desc: "Wool from 140 by 200cm.",
    features: [
      "Wool pile",
      "From 140 x 200cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "5" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg23", name: "Eloi Wool Rug", cat: "Home Décor", room: "Home Décor", price: 3750, memberPrice: 3375, sku: "SH-10625", tag: "New", ph: "", img: "assets/products/rg23.webp",
    imgs: ["assets/products/rg23.webp", "assets/products/rg23-2.webp", "assets/products/rg23-3.webp", "assets/products/rg23-4.webp", "assets/products/rg23-5.webp"],
    sizes: [{ label: "160cm x 240cm", price: 3750 }, { label: "200cm x 300cm", price: 7546 }, { label: "240cm x 340cm", price: 10739 }, { label: "300cm x 400cm", price: 14124 }],
    desc: "Wool from 160 by 240cm up to 300cm.",
    features: [
      "Wool pile",
      "160 x 240cm to 300cm",
      "Large formats"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg24", name: "Handwoven Wool Rug", cat: "Home Décor", room: "Home Décor", price: 3778, memberPrice: 3400, sku: "SH-10626", tag: "New", ph: "", img: "assets/products/rg24.webp",
    imgs: ["assets/products/rg24.webp", "assets/products/rg24-2.webp", "assets/products/rg24-3.webp", "assets/products/rg24-4.webp", "assets/products/rg24-5.webp"],
    sizes: [{ label: "140cm x 200cm", price: 3778 }, { label: "160cm x 240cm", price: 5254 }, { label: "200cm x 300cm", price: 8426 }, { label: "240cm x 340cm", price: 11213 }, { label: "300cm x 400cm", price: 14254 }],
    desc: "Handwoven wool from 140 by 200cm. Handwoven means slight irregularities, which is the point.",
    features: [
      "Handwoven wool",
      "From 140 x 200cm",
      "Natural irregularity"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "5" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg25", name: "Handwoven Wool Rug (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 4013, memberPrice: 3612, sku: "SH-10627", tag: "New", ph: "", img: "assets/products/rg25.webp",
    imgs: ["assets/products/rg25.webp", "assets/products/rg25-2.webp", "assets/products/rg25-3.webp", "assets/products/rg25-4.webp", "assets/products/rg25-5.webp"],
    sizes: [{ label: "140cm x 200cm", price: 4013 }, { label: "160cm x 230cm", price: 5370 }, { label: "200cm x 290cm", price: 8217 }, { label: "240cm x 340cm", price: 9976 }, { label: "300cm x 400cm", price: 13333 }],
    desc: "Handwoven wool, 140 by 200cm up to 240cm.",
    features: [
      "Handwoven wool",
      "Four sizes",
      "From 140 x 200cm"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "5" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg26", name: "Margaux Handwoven Wool Rug", cat: "Home Décor", room: "Home Décor", price: 4209, memberPrice: 3788, sku: "SH-10628", tag: "New", ph: "", img: "assets/products/rg26.webp",
    imgs: ["assets/products/rg26.webp", "assets/products/rg26-2.webp", "assets/products/rg26-3.webp", "assets/products/rg26-4.webp", "assets/products/rg26-5.webp"],
    sizes: [{ label: "160cm x 230cm", price: 4209 }, { label: "200cm x 300cm", price: 6787 }, { label: "240cm x 340cm", price: 9324 }, { label: "300cm x 400cm", price: 13287 }],
    desc: "Handwoven wool from 160 by 230cm to 300cm.",
    features: [
      "Handwoven wool",
      "160 x 230cm to 300cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg27", name: "Norbert Handwoven Rug", cat: "Home Décor", room: "Home Décor", price: 4241, memberPrice: 3817, sku: "SH-10629", tag: "New", ph: "", img: "assets/products/rg27.webp",
    imgs: ["assets/products/rg27.webp", "assets/products/rg27-2.webp", "assets/products/rg27-3.webp", "assets/products/rg27-4.webp", "assets/products/rg27-5.webp"],
    sizes: [{ label: "160cm x 230cm", price: 4241 }, { label: "200cm x 290cm", price: 6328 }, { label: "240cm x 340cm", price: 9074 }],
    desc: "Handwoven wool in three large sizes.",
    features: [
      "Handwoven wool",
      "Three large sizes",
      "From 160 x 230cm"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "3" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg28", name: "Wool & Cotton Rug (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 4291, memberPrice: 3862, sku: "SH-10630", tag: "New", ph: "", img: "assets/products/rg28.webp",
    imgs: ["assets/products/rg28.webp", "assets/products/rg28-2.webp", "assets/products/rg28-3.webp", "assets/products/rg28-4.webp", "assets/products/rg28-5.webp"],
    sizes: [{ label: "160cm x 230cm", price: 4291 }, { label: "200cm x 290cm", price: 8235 }, { label: "240cm x 340cm", price: 12944 }, { label: "300cm x 400cm", price: 14157 }],
    desc: "Wool with cotton, 160 by 230cm to 300cm.",
    features: [
      "Wool and cotton",
      "160 x 230cm to 300cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg29", name: "Round Wool & Cotton Rug", cat: "Home Décor", room: "Home Décor", price: 4611, memberPrice: 4150, sku: "SH-10631", tag: "New", ph: "", img: "assets/products/rg29.webp",
    imgs: ["assets/products/rg29.webp", "assets/products/rg29-2.webp", "assets/products/rg29-3.webp", "assets/products/rg29-4.webp", "assets/products/rg29-5.webp"],
    sizes: [{ label: "1 / 230cm", price: 4611 }, { label: "2 / 230cm", price: 4611 }, { label: "3 / 230cm", price: 4611 }, { label: "1 / 290cm", price: 6944 }, { label: "2 / 290cm", price: 6944 }, { label: "3 / 290cm", price: 6944 }, { label: "1 / 340cm", price: 9198 }, { label: "2 / 340cm", price: 9198 }, { label: "3 / 340cm", price: 9198 }, { label: "1 / 400cm", price: 11757 }, { label: "2 / 400cm", price: 11757 }, { label: "3 / 400cm", price: 11757 }],
    desc: "Round, from 230cm to 400cm across, in two designs. A 400cm circle is an unusual thing to find.",
    features: [
      "Round, 230cm to 400cm",
      "Two designs",
      "Very large formats"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "12" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg30", name: "Claude Wool Rug", cat: "Home Décor", room: "Home Décor", price: 4620, memberPrice: 4158, sku: "SH-10632", tag: "New", ph: "", img: "assets/products/rg30.webp",
    imgs: ["assets/products/rg30.webp", "assets/products/rg30-2.webp", "assets/products/rg30-3.webp", "assets/products/rg30-4.webp", "assets/products/rg30-5.webp"],
    sizes: [{ label: "160cm x 230cm", price: 4620 }, { label: "200cm x 290cm", price: 7176 }, { label: "240cm x 340cm", price: 9920 }, { label: "300cm x 400cm", price: 14704 }],
    desc: "Wool from 160 by 230cm to 300cm.",
    features: [
      "Wool pile",
      "160 x 230cm to 300cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg31", name: "Yanni Wool Rug", cat: "Home Décor", room: "Home Décor", price: 4700, memberPrice: 4230, sku: "SH-10633", tag: "New", ph: "", img: "assets/products/rg31.webp",
    imgs: ["assets/products/rg31.webp", "assets/products/rg31-2.webp", "assets/products/rg31-3.webp", "assets/products/rg31-4.webp", "assets/products/rg31-5.webp"],
    sizes: [{ label: "200cm x 290cm", price: 4700 }, { label: "140cm x 200cm", price: 5833 }, { label: "160cm x 230cm", price: 7213 }, { label: "240cm x 340cm", price: 9402 }, { label: "300cm x 400cm", price: 14628 }],
    desc: "Wool from 140 by 200cm.",
    features: [
      "Wool pile",
      "From 140 x 200cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "5" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg32", name: "Constance Wool & Cotton Rug", cat: "Home Décor", room: "Home Décor", price: 5120, memberPrice: 4608, sku: "SH-10634", tag: "New", ph: "", img: "assets/products/rg32.webp",
    imgs: ["assets/products/rg32.webp", "assets/products/rg32-2.webp", "assets/products/rg32-3.webp", "assets/products/rg32-4.webp", "assets/products/rg32-5.webp"],
    sizes: [{ label: "140cm x 200cm", price: 5120 }, { label: "160cm x 230cm", price: 6639 }, { label: "200cm x 290cm", price: 10407 }, { label: "240cm x 340cm", price: 13889 }, { label: "300cm x 400cm", price: 16111 }],
    desc: "Wool with cotton, from 140 by 200cm.",
    features: [
      "Wool and cotton",
      "From 140 x 200cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "5" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg33", name: "Florent Wool Rug", cat: "Home Décor", room: "Home Décor", price: 5315, memberPrice: 4784, sku: "SH-10635", tag: "New", ph: "", img: "assets/products/rg33.webp",
    imgs: ["assets/products/rg33.webp", "assets/products/rg33-2.webp", "assets/products/rg33-3.webp", "assets/products/rg33-4.webp", "assets/products/rg33-5.webp"],
    sizes: [{ label: "01 / 160cm x 230cm", price: 5315 }, { label: "02 / 160cm x 230cm", price: 5315 }, { label: "01 / 200cm x 290cm", price: 7865 }, { label: "02 / 200cm x 290cm", price: 7865 }, { label: "01 / 240cm x 340cm", price: 10646 }, { label: "02 / 240cm x 340cm", price: 10646 }, { label: "01 / 300cm x 400cm", price: 14787 }, { label: "02 / 300cm x 400cm", price: 14787 }],
    desc: "Wool in several designs, from 160 by 230cm.",
    features: [
      "Wool pile",
      "Several designs",
      "From 160 x 230cm"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "8" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg34", name: "Aurelien Wool Rug", cat: "Home Décor", room: "Home Décor", price: 5324, memberPrice: 4792, sku: "SH-10636", tag: "New", ph: "", img: "assets/products/rg34.webp",
    imgs: ["assets/products/rg34.webp", "assets/products/rg34-2.webp", "assets/products/rg34-3.webp", "assets/products/rg34-4.webp", "assets/products/rg34-5.webp"],
    sizes: [{ label: "140cm x 200cm", price: 5324 }, { label: "160cm x 230cm", price: 6815 }, { label: "200cm x 290cm", price: 8661 }, { label: "240cm x 340cm", price: 11554 }, { label: "300cm x 400cm", price: 16402 }],
    desc: "Wool from 140 by 200cm.",
    features: [
      "Wool pile",
      "From 140 x 200cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "5" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg35", name: "Timothee Handwoven Wool Rug", cat: "Home Décor", room: "Home Décor", price: 5361, memberPrice: 4825, sku: "SH-10637", tag: "New", ph: "", img: "assets/products/rg35.webp",
    imgs: ["assets/products/rg35.webp", "assets/products/rg35-2.webp", "assets/products/rg35-3.webp", "assets/products/rg35-4.webp", "assets/products/rg35-5.webp"],
    sizes: [{ label: "140cm x 200cm", price: 5361 }, { label: "160cm x 240cm", price: 7161 }, { label: "200cm x 300cm", price: 12120 }, { label: "240cm x 340cm", price: 15852 }, { label: "300cm x 400cm", price: 17037 }],
    desc: "Handwoven wool from 140 by 200cm to 240cm.",
    features: [
      "Handwoven wool",
      "From 140 x 200cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "5" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg36", name: "Gaethan Handwoven Wool Rug", cat: "Home Décor", room: "Home Décor", price: 5537, memberPrice: 4983, sku: "SH-10638", tag: "New", ph: "", img: "assets/products/rg36.webp",
    imgs: ["assets/products/rg36.webp", "assets/products/rg36-2.webp", "assets/products/rg36-3.webp", "assets/products/rg36-4.webp", "assets/products/rg36-5.webp"],
    sizes: [{ label: "160cm x 230cm", price: 5537 }, { label: "200cm x 290cm", price: 8565 }, { label: "240cm x 340cm", price: 12000 }, { label: "300cm x 400cm", price: 14444 }],
    desc: "Handwoven wool from 160 by 230cm to 300cm.",
    features: [
      "Handwoven wool",
      "160 x 230cm to 300cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg37", name: "Yori Handwoven Wool Rug", cat: "Home Décor", room: "Home Décor", price: 6180, memberPrice: 5562, sku: "SH-10639", tag: "New", ph: "", img: "assets/products/rg37.webp",
    imgs: ["assets/products/rg37.webp", "assets/products/rg37-2.webp", "assets/products/rg37-3.webp", "assets/products/rg37-4.webp", "assets/products/rg37-5.webp"],
    sizes: [{ label: "160cm x 230cm", price: 6180 }, { label: "200cm x 290cm", price: 9056 }, { label: "240cm x 340cm", price: 13754 }, { label: "300cm x 400cm", price: 16220 }],
    desc: "Handwoven wool, large formats only.",
    features: [
      "Handwoven wool",
      "From 160 x 230cm",
      "Large formats"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg38", name: "Beige Wool Rug (Large)", cat: "Home Décor", room: "Home Décor", price: 6331, memberPrice: 5698, sku: "SH-10640", tag: "New", ph: "", img: "assets/products/rg38.webp",
    imgs: ["assets/products/rg38.webp", "assets/products/rg38-2.webp", "assets/products/rg38-3.webp", "assets/products/rg38-4.webp", "assets/products/rg38-5.webp"],
    sizes: [{ label: "Beige / 200cm x 290cm", price: 6331 }, { label: "Grey / 200cm x 290cm", price: 6331 }, { label: "Black / 200cm x 290cm", price: 6331 }, { label: "Beige / 240cm x 340cm", price: 8870 }, { label: "Grey / 240cm x 340cm", price: 8870 }, { label: "Black / 240cm x 340cm", price: 8870 }, { label: "Beige / 300cm x 400cm", price: 11574 }, { label: "Grey / 300cm x 400cm", price: 11574 }, { label: "Black / 300cm x 400cm", price: 11574 }],
    desc: "Beige wool from 200 by 290cm.",
    features: [
      "Wool pile",
      "Beige colourway",
      "From 200 x 290cm"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "9" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg39", name: "Charlie Handwoven Wool Rug", cat: "Home Décor", room: "Home Décor", price: 6481, memberPrice: 5833, sku: "SH-10641", tag: "New", ph: "", img: "assets/products/rg39.webp",
    imgs: ["assets/products/rg39.webp", "assets/products/rg39-2.webp", "assets/products/rg39-3.webp", "assets/products/rg39-4.webp", "assets/products/rg39-5.webp"],
    sizes: [{ label: "160cm x 230cm", price: 6481 }, { label: "200cm x 290cm", price: 10787 }, { label: "240cm x 340cm", price: 15556 }, { label: "300cm x 400cm", price: 17907 }],
    desc: "Handwoven wool from 160 by 230cm.",
    features: [
      "Handwoven wool",
      "From 160 x 230cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg40", name: "Lionel Handwoven Wool Rug", cat: "Home Décor", room: "Home Décor", price: 6754, memberPrice: 6079, sku: "SH-10642", tag: "New", ph: "", img: "assets/products/rg40.webp",
    imgs: ["assets/products/rg40.webp", "assets/products/rg40-2.webp", "assets/products/rg40-3.webp", "assets/products/rg40-4.webp", "assets/products/rg40-5.webp"],
    sizes: [{ label: "150cm x 230cm", price: 6754 }, { label: "195cm x 290cm", price: 6754 }, { label: "240cm x 330cm", price: 6754 }, { label: "300cm x 390cm", price: 6754 }],
    desc: "Handwoven wool from 150 by 230cm to 300cm.",
    features: [
      "Handwoven wool",
      "150 x 230cm to 300cm",
      "Four sizes"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "rg41", name: "Louison Handwoven Wool Rug", cat: "Home Décor", room: "Home Décor", price: 7696, memberPrice: 6926, sku: "SH-10643", tag: "New", ph: "", img: "assets/products/rg41.webp",
    imgs: ["assets/products/rg41.webp", "assets/products/rg41-2.webp", "assets/products/rg41-3.webp", "assets/products/rg41-4.webp", "assets/products/rg41-5.webp"],
    sizes: [{ label: "160cm x 240cm", price: 7696 }, { label: "200cm x 300cm", price: 12570 }, { label: "240cm x 340cm", price: 15291 }, { label: "300cm x 400cm", price: 19444 }],
    desc: "The finest rug we carry: handwoven wool from 160 by 240cm up to 300cm.",
    features: [
      "Handwoven wool",
      "160 x 240cm to 300cm",
      "The finest in the range"
    ],
    specs: { "Type": "Rug", "Material": "Wool", "Sizes": "4" },
    care: "Vacuum regularly without a beater bar, which pulls at the pile. Blot spills immediately, never rub. Rotate the rug every few months so it wears and fades evenly, and use an underlay to stop it creeping." },

  { id: "cd01", name: "Glass Candle Holder (Three Sizes)", cat: "Home Décor", room: "Home Décor", price: 104, memberPrice: 94, sku: "SH-10457", tag: "New", ph: "", img: "assets/products/cd01.webp",
    imgs: ["assets/products/cd01.webp", "assets/products/cd01-2.webp", "assets/products/cd01-3.webp", "assets/products/cd01-4.webp"],
    sizes: [{ label: "S", price: 104 }, { label: "M", price: 119 }, { label: "L", price: 141 }],
    desc: "Glass in small, medium and large. Group all three at different heights.",
    features: [
      "Glass construction",
      "Three sizes",
      "Group at varying heights"
    ],
    specs: { "Type": "Candle holder", "Material": "Glass", "Options": "3" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass." },

  { id: "cd02", name: "Candle Holder (Large or Small)", cat: "Home Décor", room: "Home Décor", price: 119, memberPrice: 107, sku: "SH-10458", tag: "New", ph: "", img: "assets/products/cd02.webp",
    imgs: ["assets/products/cd02.webp", "assets/products/cd02-2.webp", "assets/products/cd02-3.webp", "assets/products/cd02-4.webp", "assets/products/cd02-5.webp"],
    sizes: [{ label: "Large", price: 119 }, { label: "Small", price: 137 }],
    desc: "Two sizes, meant to be used as a pair.",
    features: [
      "Two sizes",
      "Designed as a pair",
      "Simple silhouette"
    ],
    specs: { "Type": "Candle holder", "Material": "Metal", "Options": "2" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "cd03", name: "Three-Piece Candle Holder Set", cat: "Home Décor", room: "Home Décor", price: 183, memberPrice: 165, sku: "SH-10459", tag: "New", ph: "", img: "assets/products/cd03.webp",
    imgs: ["assets/products/cd03.webp", "assets/products/cd03-2.webp", "assets/products/cd03-3.webp", "assets/products/cd03-4.webp", "assets/products/cd03-5.webp"],
    sizes: [{ label: "Silver / 3 Pcs", price: 183 }, { label: "Gold / 3 Pcs", price: 183 }, { label: "Black / 3 Pcs", price: 183 }, { label: "Rose Gold / 3 Pcs", price: 183 }],
    desc: "A set of three in silver, gold, black or rose gold. The easiest way to get a grouping right.",
    features: [
      "Set of three",
      "Silver, Gold, Black or Rose Gold",
      "Graduated heights"
    ],
    specs: { "Type": "Candle holder", "Material": "Metal", "Options": "4" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "cd04", name: "Marble & Gold Candle Holder", cat: "Home Décor", room: "Home Décor", price: 309, memberPrice: 278, sku: "SH-10460", tag: "New", ph: "", img: "assets/products/cd04.webp",
    imgs: ["assets/products/cd04.webp", "assets/products/cd04-2.webp", "assets/products/cd04-3.webp", "assets/products/cd04-4.webp", "assets/products/cd04-5.webp"],
    sizes: [{ label: "M", price: 309 }, { label: "L", price: 365 }],
    desc: "Marble with gold, medium or large.",
    features: [
      "Marble with gold detail",
      "Medium and Large",
      "Weighted base"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural marble", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath." },

  { id: "cd05", name: "Acrane Candle Holder", cat: "Home Décor", room: "Home Décor", price: 311, memberPrice: 280, sku: "SH-10461", tag: "New", ph: "", img: "assets/products/cd05.webp",
    imgs: ["assets/products/cd05.webp", "assets/products/cd05-2.webp", "assets/products/cd05-3.webp", "assets/products/cd05-4.webp", "assets/products/cd05-5.webp"],
    sizes: [{ label: "S", price: 311 }, { label: "M", price: 415 }, { label: "L", price: 530 }],
    desc: "Three sizes in a slim, architectural shape.",
    features: [
      "Three sizes",
      "Slim architectural form",
      "Group or use alone"
    ],
    specs: { "Type": "Candle holder", "Material": "Metal", "Options": "3" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "cd06", name: "Marble Candle Holder (Five Designs)", cat: "Home Décor", room: "Home Décor", price: 311, memberPrice: 280, sku: "SH-10462", tag: "New", ph: "", img: "assets/products/cd06.webp",
    imgs: ["assets/products/cd06.webp", "assets/products/cd06-2.webp", "assets/products/cd06-3.webp", "assets/products/cd06-4.webp", "assets/products/cd06-5.webp"],
    sizes: [{ label: "A", price: 311 }, { label: "B", price: 311 }, { label: "C", price: 311 }, { label: "D", price: 311 }, { label: "E", price: 311 }],
    desc: "Five marble designs, A through E, so a group can vary in shape as well as height.",
    features: [
      "Solid marble",
      "Five designs",
      "Vary shape and height in a group"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural marble", "Options": "5" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath." },

  { id: "cd07", name: "Travertine & Brass Oil Burner", cat: "Home Décor", room: "Home Décor", price: 350, memberPrice: 315, sku: "SH-10463", tag: "New", ph: "", img: "assets/products/cd07.webp",
    imgs: ["assets/products/cd07.webp", "assets/products/cd07-2.webp", "assets/products/cd07-3.webp", "assets/products/cd07-4.webp", "assets/products/cd07-5.webp"],
    desc: "Travertine with brass, for oil rather than candles.",
    features: [
      "Travertine with brass",
      "For essential oils",
      "Single size"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural travertine", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "cd08", name: "Marble Candle Holder in Three Stones", cat: "Home Décor", room: "Home Décor", price: 430, memberPrice: 387, sku: "SH-10464", tag: "New", ph: "", img: "assets/products/cd08.webp",
    imgs: ["assets/products/cd08.webp", "assets/products/cd08-2.webp", "assets/products/cd08-3.webp", "assets/products/cd08-4.webp", "assets/products/cd08-5.webp"],
    sizes: [{ label: "Black", price: 430 }, { label: "White", price: 430 }, { label: "Travertine", price: 430 }],
    desc: "Black marble, white marble or travertine.",
    features: [
      "Black, White or Travertine",
      "Natural stone",
      "Each piece unique"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural marble", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath." },

  { id: "cd09", name: "Travertine Candle Holder Pair", cat: "Home Décor", room: "Home Décor", price: 457, memberPrice: 411, sku: "SH-10465", tag: "New", ph: "", img: "assets/products/cd09.webp",
    imgs: ["assets/products/cd09.webp", "assets/products/cd09-2.webp", "assets/products/cd09-3.webp", "assets/products/cd09-4.webp"],
    sizes: [{ label: "2x Piece Set", price: 457 }],
    desc: "A pair of travertine holders, bought together.",
    features: [
      "Two-piece set",
      "Solid travertine",
      "Designed as a pair"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural travertine", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "cd10", name: "Candle Holder in Silver or Titanium", cat: "Home Décor", room: "Home Décor", price: 474, memberPrice: 427, sku: "SH-10466", tag: "New", ph: "", img: "assets/products/cd10.webp",
    imgs: ["assets/products/cd10.webp", "assets/products/cd10-2.webp", "assets/products/cd10-3.webp", "assets/products/cd10-4.webp", "assets/products/cd10-5.webp"],
    sizes: [{ label: "Silver", price: 474 }, { label: "Titanium Grey", price: 474 }],
    desc: "Silver or titanium grey, with a modern, hard-edged look.",
    features: [
      "Silver or Titanium Grey",
      "Contemporary form",
      "Metal construction"
    ],
    specs: { "Type": "Candle holder", "Material": "Metal", "Options": "2" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "cd11", name: "Twin Travertine Candle Holder", cat: "Home Décor", room: "Home Décor", price: 507, memberPrice: 456, sku: "SH-10467", tag: "New", ph: "", img: "assets/products/cd11.webp",
    imgs: ["assets/products/cd11.webp", "assets/products/cd11-2.webp", "assets/products/cd11-3.webp", "assets/products/cd11-4.webp", "assets/products/cd11-5.webp"],
    sizes: [{ label: "Smooth", price: 507 }, { label: "Rough", price: 507 }],
    desc: "Travertine in a smooth or rough finish. The rough one shows the stone honestly.",
    features: [
      "Smooth or Rough finish",
      "Solid travertine",
      "Twin form"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural travertine", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "cd12", name: "Serenity Stone Candle Holder", cat: "Home Décor", room: "Home Décor", price: 550, memberPrice: 495, sku: "SH-10468", tag: "New", ph: "", img: "assets/products/cd12.webp",
    imgs: ["assets/products/cd12.webp", "assets/products/cd12-2.webp", "assets/products/cd12-3.webp", "assets/products/cd12-4.webp", "assets/products/cd12-5.webp"],
    sizes: [{ label: "Travertine", price: 550 }],
    desc: "A single travertine holder, plainly done.",
    features: [
      "Solid travertine",
      "Single design",
      "Natural surface"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural travertine", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "cd13", name: "Travertine & Gold Candle Holder", cat: "Home Décor", room: "Home Décor", price: 583, memberPrice: 525, sku: "SH-10469", tag: "New", ph: "", img: "assets/products/cd13.webp",
    imgs: ["assets/products/cd13.webp", "assets/products/cd13-2.webp", "assets/products/cd13-3.webp", "assets/products/cd13-4.webp", "assets/products/cd13-5.webp"],
    sizes: [{ label: "S: Beige", price: 583 }, { label: "S: Black", price: 583 }, { label: "L: Beige", price: 713 }, { label: "L: Black", price: 713 }],
    desc: "Travertine with gold in beige or black, small or large.",
    features: [
      "Travertine with gold",
      "Beige or Black",
      "Small and Large"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural travertine", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "cd14", name: "Isaie Travertine Candle Holder", cat: "Home Décor", room: "Home Décor", price: 624, memberPrice: 562, sku: "SH-10470", tag: "New", ph: "", img: "assets/products/cd14.webp",
    imgs: ["assets/products/cd14.webp", "assets/products/cd14-2.webp", "assets/products/cd14-3.webp", "assets/products/cd14-4.webp"],
    desc: "One travertine holder, one size.",
    features: [
      "Solid travertine",
      "Single size",
      "Weighted base"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural travertine", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "cd15", name: "Volakos Marble Candle Holder", cat: "Home Décor", room: "Home Décor", price: 698, memberPrice: 628, sku: "SH-10471", tag: "New", ph: "", img: "assets/products/cd15.webp",
    imgs: ["assets/products/cd15.webp", "assets/products/cd15-2.webp", "assets/products/cd15-3.webp", "assets/products/cd15-4.webp", "assets/products/cd15-5.webp"],
    sizes: [{ label: "A", price: 698 }, { label: "D", price: 715 }, { label: "C", price: 759 }, { label: "B", price: 796 }],
    desc: "Volakos marble in four designs, A through D.",
    features: [
      "Volakos marble",
      "Four designs",
      "Pale veined stone"
    ],
    specs: { "Type": "Candle holder", "Material": "Natural marble", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath." },

  { id: "cd16", name: "Floor Candelabra (67cm)", cat: "Home Décor", room: "Home Décor", price: 1661, memberPrice: 1495, sku: "SH-10472", tag: "New", ph: "", img: "assets/products/cd16.webp",
    imgs: ["assets/products/cd16.webp", "assets/products/cd16-2.webp", "assets/products/cd16-3.webp", "assets/products/cd16-4.webp"],
    sizes: [{ label: "67cm x 47cm", price: 1661 }],
    desc: "A 67 by 47cm candelabra, which is a floor piece rather than a table one.",
    features: [
      "67cm x 47cm",
      "Floor-standing scale",
      "Holds multiple candles"
    ],
    specs: { "Type": "Candle holder", "Material": "Metal", "Options": "1" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "cl01", name: "Wall Clock in Black or Gold", cat: "Home Décor", room: "Home Décor", price: 343, memberPrice: 309, sku: "SH-10473", tag: "New", ph: "", img: "assets/products/cl01.webp",
    imgs: ["assets/products/cl01.webp", "assets/products/cl01-2.webp", "assets/products/cl01-3.webp", "assets/products/cl01-4.webp", "assets/products/cl01-5.webp"],
    sizes: [{ label: "Black / 50cm", price: 343 }, { label: "Gold / 50cm", price: 343 }, { label: "Black / 70cm", price: 420 }, { label: "Gold / 70cm", price: 420 }],
    desc: "A metal wall clock at 50cm or 70cm, in black or gold. The 70cm is a statement across a hallway.",
    features: [
      "Metal construction",
      "50cm and 70cm",
      "Black or Gold"
    ],
    specs: { "Type": "Wall clock", "Material": "Metal", "Options": "4" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "cl02", name: "Timber & Metal Wall Clock", cat: "Home Décor", room: "Home Décor", price: 378, memberPrice: 340, sku: "SH-10474", tag: "New", ph: "", img: "assets/products/cl02.webp",
    imgs: ["assets/products/cl02.webp", "assets/products/cl02-2.webp", "assets/products/cl02-3.webp"],
    sizes: [{ label: "Black", price: 378 }],
    desc: "Timber with metal, in black.",
    features: [
      "Timber with metal",
      "Black finish",
      "Single size"
    ],
    specs: { "Type": "Wall clock", "Material": "Timber", "Options": "1" },
    care: "Dust with a dry cloth. Keep out of direct sun and away from damp, and wipe spills promptly." },

  { id: "cl03", name: "Leather-Look Wall Clock", cat: "Home Décor", room: "Home Décor", price: 420, memberPrice: 378, sku: "SH-10475", tag: "New", ph: "", img: "assets/products/cl03.webp",
    imgs: ["assets/products/cl03.webp", "assets/products/cl03-2.webp", "assets/products/cl03-3.webp", "assets/products/cl03-4.webp", "assets/products/cl03-5.webp"],
    sizes: [{ label: "Grey", price: 420 }, { label: "Red", price: 420 }, { label: "Tan", price: 420 }, { label: "Light Tan", price: 420 }],
    desc: "A leather-look face in grey, red, tan or light tan.",
    features: [
      "Leather-look face",
      "Four colourways",
      "Warm alternative to metal"
    ],
    specs: { "Type": "Wall clock", "Material": "Leather", "Options": "4" },
    care: "Wipe with a barely damp cloth. Keep out of direct sun, and condition occasionally so the leather doesn't dry out." },

  { id: "cl04", name: "Arianna Wall Clock", cat: "Home Décor", room: "Home Décor", price: 493, memberPrice: 444, sku: "SH-10476", tag: "New", ph: "", img: "assets/products/cl04.webp",
    imgs: ["assets/products/cl04.webp", "assets/products/cl04-2.webp", "assets/products/cl04-3.webp"],
    sizes: [{ label: "Black", price: 493 }],
    desc: "Timber and metal in black.",
    features: [
      "Timber and metal",
      "Black finish",
      "Understated face"
    ],
    specs: { "Type": "Wall clock", "Material": "Timber", "Options": "1" },
    care: "Dust with a dry cloth. Keep out of direct sun and away from damp, and wipe spills promptly." },

  { id: "cl05", name: "Gold Iron Wall Clock (60cm)", cat: "Home Décor", room: "Home Décor", price: 1254, memberPrice: 1129, sku: "SH-10477", tag: "New", ph: "", img: "assets/products/cl05.webp",
    imgs: ["assets/products/cl05.webp", "assets/products/cl05-2.webp", "assets/products/cl05-3.webp", "assets/products/cl05-4.webp"],
    sizes: [{ label: "60cm", price: 1254 }],
    desc: "Gold iron at 60cm, decorative as much as functional.",
    features: [
      "Gold iron construction",
      "60cm",
      "Decorative statement"
    ],
    specs: { "Type": "Wall clock", "Material": "Metal", "Options": "1" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "cl06", name: "White Wall Clock (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 1474, memberPrice: 1327, sku: "SH-10478", tag: "New", ph: "", img: "assets/products/cl06.webp",
    imgs: ["assets/products/cl06.webp", "assets/products/cl06-2.webp", "assets/products/cl06-3.webp", "assets/products/cl06-4.webp"],
    sizes: [{ label: "White / 30cm", price: 1474 }, { label: "White / 40cm", price: 1619 }, { label: "White / 50cm", price: 1659 }, { label: "White / 60cm", price: 1769 }],
    desc: "White, from 30cm to 60cm, so it suits a kitchen or a stairwell.",
    features: [
      "White finish",
      "30, 40, 50 and 60cm",
      "Kitchen through to stairwell"
    ],
    specs: { "Type": "Wall clock", "Material": "Metal", "Options": "4" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "cl07", name: "Glass Wall Clock in Gold or Silver", cat: "Home Décor", room: "Home Décor", price: 2326, memberPrice: 2093, sku: "SH-10479", tag: "New", ph: "", img: "assets/products/cl07.webp",
    imgs: ["assets/products/cl07.webp", "assets/products/cl07-2.webp", "assets/products/cl07-3.webp", "assets/products/cl07-4.webp", "assets/products/cl07-5.webp"],
    sizes: [{ label: "Gold / 60cm", price: 2326 }, { label: "Silver / 60cm", price: 2326 }, { label: "Gold / 80cm", price: 2741 }, { label: "Silver / 80cm", price: 2741 }],
    desc: "Glass with gold or silver, at 60cm or 80cm. The largest clock we carry.",
    features: [
      "Glass with metal detail",
      "60cm and 80cm",
      "Gold or Silver"
    ],
    specs: { "Type": "Wall clock", "Material": "Glass", "Options": "4" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass." },

  { id: "tb01", name: "Folded Tray in Black or Yellow", cat: "Home Décor", room: "Home Décor", price: 96, memberPrice: 86, sku: "SH-10480", tag: "New", ph: "", img: "assets/products/tb01.webp",
    imgs: ["assets/products/tb01.webp", "assets/products/tb01-2.webp", "assets/products/tb01-3.webp", "assets/products/tb01-4.webp", "assets/products/tb01-5.webp"],
    sizes: [{ label: "Black / 20cm x 20cm", price: 96 }, { label: "Yellow / 20cm x 20cm", price: 96 }, { label: "Red / 20cm x 20cm", price: 96 }, { label: "Light Grey / 20cm x 20cm", price: 96 }, { label: "Light Pink / 20cm x 20cm", price: 96 }, { label: "Green / 20cm x 20cm", price: 96 }, { label: "Beige / 20cm x 20cm", price: 96 }, { label: "Black / 25cm x 25cm", price: 106 }, { label: "Yellow / 25cm x 25cm", price: 106 }, { label: "Red / 25cm x 25cm", price: 106 }, { label: "Light Grey / 25cm x 25cm", price: 106 }, { label: "Light Pink / 25cm x 25cm", price: 106 }, { label: "Green / 25cm x 25cm", price: 106 }, { label: "Beige / 25cm x 25cm", price: 106 }],
    desc: "A folded-edge tray at 20 or 25cm square, in black or yellow. Yellow is the braver choice and the better one.",
    features: [
      "Folded edge detail",
      "20cm and 25cm square",
      "Black or Yellow"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Metal", "Options": "14" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "tb02", name: "Gold Round Organiser Tray", cat: "Home Décor", room: "Home Décor", price: 128, memberPrice: 115, sku: "SH-10481", tag: "New", ph: "", img: "assets/products/tb02.webp",
    imgs: ["assets/products/tb02.webp", "assets/products/tb02-2.webp", "assets/products/tb02-3.webp", "assets/products/tb02-4.webp", "assets/products/tb02-5.webp"],
    sizes: [{ label: "12.5cm / Gold", price: 128 }, { label: "20cm / Gold", price: 183 }, { label: "30cm / Gold", price: 239 }],
    desc: "Gold stainless steel in three diameters, from 12.5cm for rings to 30cm for a coffee table.",
    features: [
      "Gold stainless steel",
      "12.5cm, 20cm and 30cm",
      "Jewellery through to coffee table"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Metal", "Options": "3" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "tb03", name: "Marble-Look Serving Tray", cat: "Home Décor", room: "Home Décor", price: 148, memberPrice: 133, sku: "SH-10482", tag: "New", ph: "", img: "assets/products/tb03.webp",
    imgs: ["assets/products/tb03.webp", "assets/products/tb03-2.webp", "assets/products/tb03-3.webp"],
    sizes: [{ label: "Black + Gold / 20cm (8\")", price: 148 }, { label: "White + Gold / 20cm (8\")", price: 148 }, { label: "Black + Gold / 25cm (10\")", price: 157 }, { label: "White + Gold / 25cm (10\")", price: 157 }],
    desc: "A marble-look tray with gold handles, at 20cm or 25cm.",
    features: [
      "Marble-look finish with gold",
      "20cm and 25cm",
      "Serving or display"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Ceramic", "Options": "4" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail." },

  { id: "tb04", name: "Timber Storage Tray", cat: "Home Décor", room: "Home Décor", price: 163, memberPrice: 147, sku: "SH-10483", tag: "New", ph: "", img: "assets/products/tb04.webp",
    imgs: ["assets/products/tb04.webp", "assets/products/tb04-2.webp", "assets/products/tb04-3.webp", "assets/products/tb04-4.webp"],
    sizes: [{ label: "White + Brown", price: 163 }],
    desc: "White and brown timber, for keys, glasses and the things that collect by a door.",
    features: [
      "Timber construction",
      "White and brown finish",
      "Entryway or dresser storage"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Timber", "Options": "1" },
    care: "Dust with a dry cloth. Keep out of direct sun and away from damp, and wipe spills promptly." },

  { id: "tb05", name: "Storage Tray in Grey or Coffee", cat: "Home Décor", room: "Home Décor", price: 180, memberPrice: 162, sku: "SH-10484", tag: "New", ph: "", img: "assets/products/tb05.webp",
    imgs: ["assets/products/tb05.webp", "assets/products/tb05-2.webp", "assets/products/tb05-3.webp", "assets/products/tb05-4.webp", "assets/products/tb05-5.webp"],
    sizes: [{ label: "Grey / S", price: 180 }, { label: "Coffee / S", price: 180 }, { label: "Grey / M", price: 254 }, { label: "Coffee / M", price: 254 }, { label: "Grey / L", price: 341 }, { label: "Coffee / L", price: 341 }],
    desc: "Three sizes in grey or coffee.",
    features: [
      "Grey or Coffee",
      "Small, Medium and Large",
      "Stackable storage"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Ceramic", "Options": "6" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail." },

  { id: "tb06", name: "Leather Organiser Tray (Four Colours)", cat: "Home Décor", room: "Home Décor", price: 204, memberPrice: 184, sku: "SH-10485", tag: "New", ph: "", img: "assets/products/tb06.webp",
    imgs: ["assets/products/tb06.webp", "assets/products/tb06-2.webp", "assets/products/tb06-3.webp", "assets/products/tb06-4.webp", "assets/products/tb06-5.webp"],
    sizes: [{ label: "Orange", price: 204 }, { label: "Blue", price: 204 }, { label: "Red", price: 204 }, { label: "Brown", price: 204 }],
    desc: "Leather in orange, blue, red or brown. The coloured ones lift a plain dresser.",
    features: [
      "Leather construction",
      "Orange, Blue, Red or Brown",
      "Dresser or desk organiser"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Leather", "Options": "4" },
    care: "Wipe with a barely damp cloth. Keep out of direct sun, and condition occasionally so the leather doesn't dry out." },

  { id: "tb07", name: "Leather Tray in Neutral Tones", cat: "Home Décor", room: "Home Décor", price: 222, memberPrice: 200, sku: "SH-10486", tag: "New", ph: "", img: "assets/products/tb07.webp",
    imgs: ["assets/products/tb07.webp", "assets/products/tb07-2.webp", "assets/products/tb07-3.webp", "assets/products/tb07-4.webp", "assets/products/tb07-5.webp"],
    sizes: [{ label: "White", price: 222 }, { label: "Beige", price: 222 }, { label: "Orange", price: 222 }],
    desc: "Leather in white, beige or orange.",
    features: [
      "Leather construction",
      "White, Beige or Orange",
      "Catch-all tray"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Leather", "Options": "3" },
    care: "Wipe with a barely damp cloth. Keep out of direct sun, and condition occasionally so the leather doesn't dry out." },

  { id: "tb08", name: "Storage Tray (Four Colours)", cat: "Home Décor", room: "Home Décor", price: 222, memberPrice: 200, sku: "SH-10487", tag: "New", ph: "", img: "assets/products/tb08.webp",
    imgs: ["assets/products/tb08.webp", "assets/products/tb08-2.webp", "assets/products/tb08-3.webp", "assets/products/tb08-4.webp", "assets/products/tb08-5.webp"],
    sizes: [{ label: "Dark Grey", price: 222 }, { label: "Orange", price: 222 }, { label: "Green", price: 222 }, { label: "Off White", price: 222 }],
    desc: "Dark grey, orange, green or off white.",
    features: [
      "Four colourways",
      "Everyday storage",
      "Wipe-clean surface"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Ceramic", "Options": "4" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail." },

  { id: "tb09", name: "Fruit Bowl in Gold or Silver", cat: "Home Décor", room: "Home Décor", price: 239, memberPrice: 215, sku: "SH-10488", tag: "New", ph: "", img: "assets/products/tb09.webp",
    imgs: ["assets/products/tb09.webp", "assets/products/tb09-2.webp", "assets/products/tb09-3.webp", "assets/products/tb09-4.webp"],
    sizes: [{ label: "Gold / Small", price: 239 }, { label: "Silver / Small", price: 239 }, { label: "Gold / Large", price: 276 }, { label: "Silver / Large", price: 276 }],
    desc: "A metal fruit bowl in gold or silver, small or large.",
    features: [
      "Gold or Silver",
      "Small and Large",
      "Fruit or display"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Metal", "Options": "4" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "tb10", name: "Round Travertine Tray", cat: "Home Décor", room: "Home Décor", price: 250, memberPrice: 225, sku: "SH-10489", tag: "New", ph: "", img: "assets/products/tb10.webp",
    imgs: ["assets/products/tb10.webp", "assets/products/tb10-2.webp", "assets/products/tb10-3.webp"],
    sizes: [{ label: "Travertine / S", price: 250 }, { label: "Travertine / M", price: 326 }, { label: "Travertine / L", price: 437 }],
    desc: "Solid travertine in three sizes, which also works as a base for candles.",
    features: [
      "Solid travertine",
      "Three sizes",
      "Doubles as a candle base"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "tb11", name: "Travertine Tray (Two Designs)", cat: "Home Décor", room: "Home Décor", price: 256, memberPrice: 230, sku: "SH-10490", tag: "New", ph: "", img: "assets/products/tb11.webp",
    imgs: ["assets/products/tb11.webp", "assets/products/tb11-2.webp", "assets/products/tb11-3.webp", "assets/products/tb11-4.webp", "assets/products/tb11-5.webp"],
    sizes: [{ label: "A", price: 256 }, { label: "B", price: 393 }],
    desc: "Two travertine designs, A and B.",
    features: [
      "Solid travertine",
      "Two designs",
      "Natural texture"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "tb12", name: "Round Marble Tray", cat: "Home Décor", room: "Home Décor", price: 267, memberPrice: 240, sku: "SH-10491", tag: "New", ph: "", img: "assets/products/tb12.webp",
    imgs: ["assets/products/tb12.webp", "assets/products/tb12-2.webp", "assets/products/tb12-3.webp"],
    sizes: [{ label: "Black / S", price: 267 }, { label: "Black / M", price: 339 }, { label: "Black / L", price: 552 }],
    desc: "Black marble in three sizes, equally at home under candles or perfume bottles.",
    features: [
      "Black marble",
      "Three sizes",
      "Candles, perfume or jewellery"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural marble", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath." },

  { id: "tb13", name: "Mirrored Glass Tray", cat: "Home Décor", room: "Home Décor", price: 272, memberPrice: 245, sku: "SH-10492", tag: "New", ph: "", img: "assets/products/tb13.webp",
    imgs: ["assets/products/tb13.webp", "assets/products/tb13-2.webp", "assets/products/tb13-3.webp", "assets/products/tb13-4.webp"],
    sizes: [{ label: "Gold", price: 272 }],
    desc: "Mirror glass with brass detail in gold. A tray that makes whatever sits on it look better.",
    features: [
      "Mirrored glass with brass",
      "Gold finish",
      "Reflects and lifts what sits on it"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Glass", "Options": "1" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass." },

  { id: "tb14", name: "Display Tray in Grey, Beige or Green", cat: "Home Décor", room: "Home Décor", price: 274, memberPrice: 247, sku: "SH-10493", tag: "New", ph: "", img: "assets/products/tb14.webp",
    imgs: ["assets/products/tb14.webp", "assets/products/tb14-2.webp", "assets/products/tb14-3.webp", "assets/products/tb14-4.webp", "assets/products/tb14-5.webp"],
    sizes: [{ label: "Grey", price: 274 }, { label: "Beige", price: 274 }, { label: "Green", price: 274 }],
    desc: "Three quiet colours for a tray that's meant to organise rather than announce itself.",
    features: [
      "Grey, Beige or Green",
      "Storage and display",
      "Understated finish"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Ceramic", "Options": "3" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail." },

  { id: "tb15", name: "Leather Tray in Green or Khaki", cat: "Home Décor", room: "Home Décor", price: 276, memberPrice: 248, sku: "SH-10494", tag: "New", ph: "", img: "assets/products/tb15.webp",
    imgs: ["assets/products/tb15.webp", "assets/products/tb15-2.webp", "assets/products/tb15-3.webp", "assets/products/tb15-4.webp", "assets/products/tb15-5.webp"],
    sizes: [{ label: "Green", price: 276 }, { label: "Black", price: 276 }, { label: "Khaki", price: 276 }],
    desc: "Leather in green, black or khaki.",
    features: [
      "Leather construction",
      "Green, Black or Khaki",
      "Desk or dresser"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Leather", "Options": "3" },
    care: "Wipe with a barely damp cloth. Keep out of direct sun, and condition occasionally so the leather doesn't dry out." },

  { id: "tb16", name: "Metallic Rectangular Serving Tray", cat: "Home Décor", room: "Home Décor", price: 291, memberPrice: 262, sku: "SH-10495", tag: "New", ph: "", img: "assets/products/tb16.webp",
    imgs: ["assets/products/tb16.webp", "assets/products/tb16-2.webp", "assets/products/tb16-3.webp", "assets/products/tb16-4.webp", "assets/products/tb16-5.webp"],
    sizes: [{ label: "Gold - Rectangular Tray", price: 291 }, { label: "Silver - Rectangular Tray", price: 291 }, { label: "Gold - Round Tray", price: 291 }, { label: "Silver - Round Tray", price: 291 }],
    desc: "Rectangular, in gold or silver.",
    features: [
      "Gold or Silver",
      "Rectangular format",
      "Serving or display"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Metal", "Options": "4" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "tb17", name: "Decorative Bowl, Off White or Silver", cat: "Home Décor", room: "Home Décor", price: 294, memberPrice: 265, sku: "SH-10496", tag: "New", ph: "", img: "assets/products/tb17.webp",
    imgs: ["assets/products/tb17.webp", "assets/products/tb17-2.webp", "assets/products/tb17-3.webp", "assets/products/tb17-4.webp"],
    sizes: [{ label: "Off White", price: 294 }, { label: "Silver", price: 294 }],
    desc: "A decorative ceramic bowl in off white or silver.",
    features: [
      "Ceramic construction",
      "Off White or Silver",
      "Decorative rather than functional"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail." },

  { id: "tb18", name: "Mirror Tray in Black & Gold", cat: "Home Décor", room: "Home Décor", price: 296, memberPrice: 266, sku: "SH-10497", tag: "New", ph: "", img: "assets/products/tb18.webp",
    imgs: ["assets/products/tb18.webp", "assets/products/tb18-2.webp", "assets/products/tb18-3.webp", "assets/products/tb18-4.webp"],
    sizes: [{ label: "Black + Gold", price: 296 }],
    desc: "Mirror with black and gold trim, good under a cluster of candles.",
    features: [
      "Mirrored surface",
      "Black and gold trim",
      "Suits a candle grouping"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Glass", "Options": "1" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass." },

  { id: "tb19", name: "Silver Display Plate", cat: "Home Décor", room: "Home Décor", price: 304, memberPrice: 274, sku: "SH-10498", tag: "New", ph: "", img: "assets/products/tb19.webp",
    imgs: ["assets/products/tb19.webp", "assets/products/tb19-2.webp", "assets/products/tb19-3.webp"],
    sizes: [{ label: "Silver", price: 304 }],
    desc: "Stainless steel in silver, a plate for display rather than dinner.",
    features: [
      "Stainless steel",
      "Silver finish",
      "Display piece"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Metal", "Options": "1" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp." },

  { id: "tb20", name: "Travertine Keepsake Box", cat: "Home Décor", room: "Home Décor", price: 307, memberPrice: 276, sku: "SH-10499", tag: "New", ph: "", img: "assets/products/tb20.webp",
    imgs: ["assets/products/tb20.webp", "assets/products/tb20-2.webp", "assets/products/tb20-3.webp", "assets/products/tb20-4.webp", "assets/products/tb20-5.webp"],
    sizes: [{ label: "Small", price: 307 }, { label: "Large", price: 417 }],
    desc: "A lidded travertine box in two sizes, for the things that shouldn't be on show.",
    features: [
      "Solid travertine with lid",
      "Small and Large",
      "Hides small clutter"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "tb21", name: "Travertine Tray Collection", cat: "Home Décor", room: "Home Décor", price: 383, memberPrice: 345, sku: "SH-10500", tag: "New", ph: "", img: "assets/products/tb21.webp",
    imgs: ["assets/products/tb21.webp", "assets/products/tb21-2.webp", "assets/products/tb21-3.webp", "assets/products/tb21-4.webp", "assets/products/tb21-5.webp"],
    sizes: [{ label: "Travertine / S: Round", price: 383 }, { label: "Travertine / L: Oval", price: 517 }, { label: "Travertine / S: Square", price: 537 }, { label: "Travertine / L: Round", price: 546 }, { label: "Travertine / L: Square", price: 556 }],
    desc: "Oval, square and other shapes in travertine, bought singly.",
    features: [
      "Solid travertine",
      "Oval and square shapes",
      "Several sizes"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "5" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "tb22", name: "Marble & Gold Tray", cat: "Home Décor", room: "Home Décor", price: 394, memberPrice: 355, sku: "SH-10501", tag: "New", ph: "", img: "assets/products/tb22.webp",
    imgs: ["assets/products/tb22.webp", "assets/products/tb22-2.webp", "assets/products/tb22-3.webp", "assets/products/tb22-4.webp", "assets/products/tb22-5.webp"],
    sizes: [{ label: "Small", price: 394 }, { label: "Large", price: 517 }],
    desc: "Marble with gold stainless handles, small or large.",
    features: [
      "Marble with gold handles",
      "Small and Large",
      "Serving or display"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural marble", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath." },

  { id: "tb23", name: "Travertine Tray (Small or Large)", cat: "Home Décor", room: "Home Décor", price: 398, memberPrice: 358, sku: "SH-10502", tag: "New", ph: "", img: "assets/products/tb23.webp",
    imgs: ["assets/products/tb23.webp", "assets/products/tb23-2.webp", "assets/products/tb23-3.webp", "assets/products/tb23-4.webp", "assets/products/tb23-5.webp"],
    sizes: [{ label: "S", price: 398 }, { label: "L", price: 498 }],
    desc: "Travertine in two sizes, good under candles.",
    features: [
      "Solid travertine",
      "Small and Large",
      "Candle base or tray"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "tb24", name: "Decorative Bowl, Low or High", cat: "Home Décor", room: "Home Décor", price: 417, memberPrice: 375, sku: "SH-10503", tag: "New", ph: "", img: "assets/products/tb24.webp",
    imgs: ["assets/products/tb24.webp", "assets/products/tb24-2.webp", "assets/products/tb24-3.webp", "assets/products/tb24-4.webp", "assets/products/tb24-5.webp"],
    sizes: [{ label: "Low Bowl", price: 417 }, { label: "High Bowl", price: 417 }],
    desc: "The same bowl in a low or a high profile.",
    features: [
      "Low or high profile",
      "Decorative bowl",
      "Choose the proportion"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail." },

  { id: "tb25", name: "Charlot Travertine Tray", cat: "Home Décor", room: "Home Décor", price: 461, memberPrice: 415, sku: "SH-10504", tag: "New", ph: "", img: "assets/products/tb25.webp",
    imgs: ["assets/products/tb25.webp", "assets/products/tb25-2.webp", "assets/products/tb25-3.webp", "assets/products/tb25-4.webp", "assets/products/tb25-5.webp"],
    desc: "One travertine tray, one size, cut from solid stone.",
    features: [
      "Solid travertine",
      "Single size",
      "Natural variation"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "tb26", name: "Marble & Brass Tray", cat: "Home Décor", room: "Home Décor", price: 591, memberPrice: 532, sku: "SH-10505", tag: "New", ph: "", img: "assets/products/tb26.webp",
    imgs: ["assets/products/tb26.webp", "assets/products/tb26-2.webp", "assets/products/tb26-3.webp", "assets/products/tb26-4.webp", "assets/products/tb26-5.webp"],
    sizes: [{ label: "Beige / Small", price: 591 }, { label: "Black / Small", price: 591 }, { label: "Beige / Large", price: 813 }, { label: "Black / Large", price: 813 }],
    desc: "Marble with brass in beige or black, small or large.",
    features: [
      "Marble with brass detail",
      "Beige or Black",
      "Small and Large"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural marble", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath." },

  { id: "tb27", name: "Travertine Pot (19 or 26cm)", cat: "Home Décor", room: "Home Décor", price: 822, memberPrice: 740, sku: "SH-10506", tag: "New", ph: "", img: "assets/products/tb27.webp",
    imgs: ["assets/products/tb27.webp", "assets/products/tb27-2.webp", "assets/products/tb27-3.webp", "assets/products/tb27-4.webp", "assets/products/tb27-5.webp"],
    sizes: [{ label: "19cm", price: 822 }, { label: "26cm", price: 859 }],
    desc: "A travertine pot at 19cm or 26cm, for a plant or simply as an object.",
    features: [
      "Solid travertine",
      "19cm and 26cm",
      "Planter or sculptural object"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "tb28", name: "Travertine Tray Collection (Three Designs)", cat: "Home Décor", room: "Home Décor", price: 1285, memberPrice: 1156, sku: "SH-10507", tag: "New", ph: "", img: "assets/products/tb28.webp",
    imgs: ["assets/products/tb28.webp", "assets/products/tb28-2.webp", "assets/products/tb28-3.webp", "assets/products/tb28-4.webp", "assets/products/tb28-5.webp"],
    sizes: [{ label: "B", price: 1285 }, { label: "C", price: 1522 }, { label: "A", price: 1637 }],
    desc: "Three travertine designs, A, B and C.",
    features: [
      "Solid travertine",
      "Three designs",
      "Substantial pieces"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "tb29", name: "Travertine Bowl", cat: "Home Décor", room: "Home Décor", price: 1433, memberPrice: 1290, sku: "SH-10508", tag: "New", ph: "", img: "assets/products/tb29.webp",
    imgs: ["assets/products/tb29.webp", "assets/products/tb29-2.webp", "assets/products/tb29-3.webp", "assets/products/tb29-4.webp", "assets/products/tb29-5.webp"],
    sizes: [{ label: "Travertine", price: 1433 }],
    desc: "A large travertine bowl, carved from solid stone. The heaviest décor piece we stock.",
    features: [
      "Carved from solid travertine",
      "Large format",
      "Very substantial weight"
    ],
    specs: { "Type": "Tray / bowl", "Material": "Natural travertine", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners." },

  { id: "vs01", name: "Golden Ball Vase (Three Sizes)", cat: "Home Décor", room: "Home Décor", price: 63, memberPrice: 57, sku: "SH-10509", tag: "New", ph: "", img: "assets/products/vs01.webp",
    imgs: ["assets/products/vs01.webp", "assets/products/vs01-2.webp", "assets/products/vs01-3.webp", "assets/products/vs01-4.webp"],
    sizes: [{ label: "Small", price: 63 }, { label: "Medium", price: 89 }, { label: "Large", price: 133 }],
    desc: "A spherical vase with a gold finish, in three sizes. Group all three for a proper display, or use the large one alone with a single stem.",
    features: [
      "Gold finish",
      "Small, Medium and Large",
      "Group the sizes or use one alone"
    ],
    specs: { "Type": "Vase", "Material": "Metal", "Options": "3" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs02", name: "Abstract Vase in Black or White", cat: "Home Décor", room: "Home Décor", price: 83, memberPrice: 75, sku: "SH-10510", tag: "New", ph: "", img: "assets/products/vs02.webp",
    imgs: ["assets/products/vs02.webp", "assets/products/vs02-2.webp", "assets/products/vs02-3.webp", "assets/products/vs02-4.webp", "assets/products/vs02-5.webp"],
    sizes: [{ label: "Black / Small", price: 83 }, { label: "White / Small", price: 83 }, { label: "Black / Large", price: 120 }, { label: "White / Large", price: 120 }],
    desc: "A sculptural, asymmetric shape that holds its own empty. Black or white, small or large.",
    features: [
      "Sculptural asymmetric form",
      "Black or White",
      "Small and Large"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "4" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs03", name: "Regal Bouquet Vase (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 106, memberPrice: 95, sku: "SH-10511", tag: "New", ph: "", img: "assets/products/vs03.webp",
    imgs: ["assets/products/vs03.webp", "assets/products/vs03-2.webp", "assets/products/vs03-3.webp", "assets/products/vs03-4.webp", "assets/products/vs03-5.webp"],
    sizes: [{ label: "Extra Large", price: 106 }, { label: "Large", price: 119 }, { label: "Medium", price: 124 }, { label: "Small", price: 137 }],
    desc: "A wide-mouthed vase built for a full bouquet rather than a few stems, in four sizes to extra large.",
    features: [
      "Wide mouth for full bouquets",
      "Four sizes to Extra Large",
      "Classic silhouette"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "4" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs04", name: "Glass & Gold Vase (Four Designs)", cat: "Home Décor", room: "Home Décor", price: 109, memberPrice: 98, sku: "SH-10512", tag: "New", ph: "", img: "assets/products/vs04.webp",
    imgs: ["assets/products/vs04.webp", "assets/products/vs04-2.webp", "assets/products/vs04-3.webp", "assets/products/vs04-4.webp", "assets/products/vs04-5.webp"],
    sizes: [{ label: "A", price: 109 }, { label: "C", price: 178 }, { label: "B", price: 211 }, { label: "D", price: 217 }],
    desc: "Glass with gold detail in four designs, A through D, so a group can vary without clashing.",
    features: [
      "Glass with gold detail",
      "Four designs",
      "Mix designs in a group"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "4" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs05", name: "Monochrome Vase, Black or White", cat: "Home Décor", room: "Home Décor", price: 109, memberPrice: 98, sku: "SH-10513", tag: "New", ph: "", img: "assets/products/vs05.webp",
    imgs: ["assets/products/vs05.webp", "assets/products/vs05-2.webp", "assets/products/vs05-3.webp", "assets/products/vs05-4.webp", "assets/products/vs05-5.webp"],
    sizes: [{ label: "Black", price: 109 }, { label: "White", price: 128 }],
    desc: "One clean shape in black or white.",
    features: [
      "Black or White",
      "Simple contemporary shape",
      "Suits most interiors"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs06", name: "Marble-Look Ceramic Vase", cat: "Home Décor", room: "Home Décor", price: 133, memberPrice: 120, sku: "SH-10514", tag: "New", ph: "", img: "assets/products/vs06.webp",
    imgs: ["assets/products/vs06.webp", "assets/products/vs06-2.webp", "assets/products/vs06-3.webp", "assets/products/vs06-4.webp", "assets/products/vs06-5.webp"],
    sizes: [{ label: "M", price: 133 }, { label: "L", price: 206 }],
    desc: "Ceramic finished to look like marble, in medium or large. The look of stone at a fraction of the weight.",
    features: [
      "Marble-look ceramic",
      "Medium and Large",
      "Lighter than real stone"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs07", name: "White Vase (Small or Large)", cat: "Home Décor", room: "Home Décor", price: 137, memberPrice: 123, sku: "SH-10515", tag: "New", ph: "", img: "assets/products/vs07.webp",
    imgs: ["assets/products/vs07.webp", "assets/products/vs07-2.webp", "assets/products/vs07-3.webp", "assets/products/vs07-4.webp"],
    sizes: [{ label: "White / Small", price: 137 }, { label: "White / Large", price: 204 }],
    desc: "A plain white vase in two sizes, the sort that disappears and lets the flowers talk.",
    features: [
      "White glaze",
      "Small and Large",
      "Understated shape"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs08", name: "Nova Vase in Black or White", cat: "Home Décor", room: "Home Décor", price: 161, memberPrice: 145, sku: "SH-10516", tag: "New", ph: "", img: "assets/products/vs08.webp",
    imgs: ["assets/products/vs08.webp", "assets/products/vs08-2.webp", "assets/products/vs08-3.webp", "assets/products/vs08-4.webp", "assets/products/vs08-5.webp"],
    sizes: [{ label: "Black / Small", price: 161 }, { label: "White / Small", price: 161 }, { label: "Black / Medium", price: 217 }, { label: "White / Medium", price: 217 }, { label: "Black / Large", price: 293 }, { label: "White / Large", price: 293 }],
    desc: "Three sizes in black or white, meant to be grouped.",
    features: [
      "Black or White",
      "Small, Medium and Large",
      "Designed to be grouped"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "6" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs09", name: "Black Vase (Seven Designs)", cat: "Home Décor", room: "Home Décor", price: 161, memberPrice: 145, sku: "SH-10517", tag: "New", ph: "", img: "assets/products/vs09.webp",
    imgs: ["assets/products/vs09.webp", "assets/products/vs09-2.webp", "assets/products/vs09-3.webp", "assets/products/vs09-4.webp", "assets/products/vs09-5.webp"],
    sizes: [{ label: "1", price: 161 }, { label: "2", price: 161 }, { label: "3", price: 161 }, { label: "5", price: 161 }, { label: "6", price: 233 }, { label: "4", price: 256 }, { label: "7", price: 256 }],
    desc: "Seven different black vases, numbered 1 to 7. Pick two or three that differ in height.",
    features: [
      "Seven designs to choose from",
      "Matte black finish",
      "Vary the heights in a group"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "7" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs10", name: "Sculptural Vase (Small or Large)", cat: "Home Décor", room: "Home Décor", price: 167, memberPrice: 150, sku: "SH-10518", tag: "New", ph: "", img: "assets/products/vs10.webp",
    imgs: ["assets/products/vs10.webp", "assets/products/vs10-2.webp", "assets/products/vs10-3.webp", "assets/products/vs10-4.webp", "assets/products/vs10-5.webp"],
    sizes: [{ label: "Small", price: 167 }, { label: "Large", price: 220 }],
    desc: "A sculptural form in two sizes.",
    features: [
      "Sculptural silhouette",
      "Small and Large",
      "Works with or without flowers"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs11", name: "Ceramic Vase in Black or Cream", cat: "Home Décor", room: "Home Décor", price: 178, memberPrice: 160, sku: "SH-10519", tag: "New", ph: "", img: "assets/products/vs11.webp",
    imgs: ["assets/products/vs11.webp", "assets/products/vs11-2.webp", "assets/products/vs11-3.webp", "assets/products/vs11-4.webp", "assets/products/vs11-5.webp"],
    sizes: [{ label: "Black", price: 178 }, { label: "Cream", price: 178 }],
    desc: "Ceramic in black or cream, simple and well proportioned.",
    features: [
      "Ceramic construction",
      "Black or Cream",
      "Well-balanced proportions"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs12", name: "Liquid Silver Vase", cat: "Home Décor", room: "Home Décor", price: 180, memberPrice: 162, sku: "SH-10520", tag: "New", ph: "", img: "assets/products/vs12.webp",
    imgs: ["assets/products/vs12.webp", "assets/products/vs12-2.webp", "assets/products/vs12-3.webp", "assets/products/vs12-4.webp"],
    sizes: [{ label: "Small", price: 180 }, { label: "Large", price: 231 }],
    desc: "A silver finish with a poured, molten look to it. Small or large.",
    features: [
      "Liquid silver finish",
      "Small and Large",
      "Catches light from every angle"
    ],
    specs: { "Type": "Vase", "Material": "Metal", "Options": "2" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs13", name: "Vase in Black, White or Khaki", cat: "Home Décor", room: "Home Décor", price: 180, memberPrice: 162, sku: "SH-10521", tag: "New", ph: "", img: "assets/products/vs13.webp",
    imgs: ["assets/products/vs13.webp", "assets/products/vs13-2.webp", "assets/products/vs13-3.webp", "assets/products/vs13-4.webp", "assets/products/vs13-5.webp"],
    sizes: [{ label: "Black", price: 180 }, { label: "White", price: 180 }, { label: "Khaki", price: 180 }],
    desc: "Three colours, khaki being the one that suits a room with timber and greenery.",
    features: [
      "Black, White or Khaki",
      "Matte finish",
      "Khaki suits natural interiors"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "3" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs14", name: "Cube Cascade Crystal Vase", cat: "Home Décor", room: "Home Décor", price: 185, memberPrice: 166, sku: "SH-10522", tag: "New", ph: "", img: "assets/products/vs14.webp",
    imgs: ["assets/products/vs14.webp", "assets/products/vs14-2.webp", "assets/products/vs14-3.webp", "assets/products/vs14-4.webp"],
    sizes: [{ label: "Small", price: 185 }, { label: "Medium", price: 204 }, { label: "Large", price: 222 }, { label: "Extra Large", price: 241 }],
    desc: "Clear crystal in a stepped, cubic form, in four sizes up to extra large.",
    features: [
      "Clear crystal glass",
      "Stepped cubic form",
      "Four sizes"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "4" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs15", name: "Glass Vase (Small or Large)", cat: "Home Décor", room: "Home Décor", price: 200, memberPrice: 180, sku: "SH-10523", tag: "New", ph: "", img: "assets/products/vs15.webp",
    imgs: ["assets/products/vs15.webp", "assets/products/vs15-2.webp", "assets/products/vs15-3.webp", "assets/products/vs15-4.webp", "assets/products/vs15-5.webp"],
    sizes: [{ label: "Small", price: 200 }, { label: "Large", price: 289 }],
    desc: "Plain glass in two sizes, the practical choice for cut flowers.",
    features: [
      "Clear glass",
      "Small and Large",
      "Easy to clean"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "2" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs16", name: "Textured Ceramic Vase", cat: "Home Décor", room: "Home Décor", price: 213, memberPrice: 192, sku: "SH-10524", tag: "New", ph: "", img: "assets/products/vs16.webp",
    imgs: ["assets/products/vs16.webp", "assets/products/vs16-2.webp", "assets/products/vs16-3.webp", "assets/products/vs16-4.webp", "assets/products/vs16-5.webp"],
    sizes: [{ label: "Dark Grey / Small", price: 213 }, { label: "Beige / Small", price: 213 }, { label: "Dark Grey / Large", price: 259 }, { label: "Beige / Large", price: 259 }],
    desc: "A textured ceramic surface in dark grey or beige, small or large. Texture reads better than pattern in a neutral room.",
    features: [
      "Textured ceramic surface",
      "Dark Grey or Beige",
      "Small and Large"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "4" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs17", name: "Spectra Vase in Silver", cat: "Home Décor", room: "Home Décor", price: 220, memberPrice: 198, sku: "SH-10525", tag: "New", ph: "", img: "assets/products/vs17.webp",
    imgs: ["assets/products/vs17.webp", "assets/products/vs17-2.webp", "assets/products/vs17-3.webp", "assets/products/vs17-4.webp", "assets/products/vs17-5.webp"],
    sizes: [{ label: "S", price: 220 }, { label: "M", price: 274 }, { label: "L", price: 330 }],
    desc: "A silver vase in three sizes.",
    features: [
      "Silver finish",
      "Small, Medium and Large",
      "Reflective surface"
    ],
    specs: { "Type": "Vase", "Material": "Metal", "Options": "3" },
    care: "Dust with a dry cloth and buff gently. Avoid abrasive cleaners on plated finishes, and keep away from prolonged damp. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs18", name: "Opal Glass Vase (Four Sizes)", cat: "Home Décor", room: "Home Décor", price: 222, memberPrice: 200, sku: "SH-10526", tag: "New", ph: "", img: "assets/products/vs18.webp",
    imgs: ["assets/products/vs18.webp", "assets/products/vs18-2.webp", "assets/products/vs18-3.webp", "assets/products/vs18-4.webp", "assets/products/vs18-5.webp"],
    sizes: [{ label: "Black / Extra Small", price: 222 }, { label: "Orange / Extra Small", price: 222 }, { label: "Black / Small", price: 278 }, { label: "Orange / Small", price: 278 }, { label: "Black / Medium", price: 324 }, { label: "Orange / Medium", price: 324 }, { label: "Black / Large", price: 389 }, { label: "Orange / Large", price: 389 }],
    desc: "Opal-finish crystal glass in black or other tones, from extra small to medium.",
    features: [
      "Opal crystal glass",
      "Four sizes from Extra Small",
      "Several colourways"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "8" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs19", name: "Textured Flower Vase (Five Designs)", cat: "Home Décor", room: "Home Décor", price: 222, memberPrice: 200, sku: "SH-10527", tag: "New", ph: "", img: "assets/products/vs19.webp",
    imgs: ["assets/products/vs19.webp", "assets/products/vs19-2.webp", "assets/products/vs19-3.webp", "assets/products/vs19-4.webp", "assets/products/vs19-5.webp"],
    sizes: [{ label: "1", price: 222 }, { label: "2", price: 222 }, { label: "3", price: 222 }, { label: "4", price: 222 }, { label: "5", price: 222 }],
    desc: "Five textured ceramic designs, numbered 1 to 5.",
    features: [
      "Five textured designs",
      "Ceramic construction",
      "Mix in a group"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "5" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs20", name: "Resin Sculptural Vase", cat: "Home Décor", room: "Home Décor", price: 239, memberPrice: 215, sku: "SH-10528", tag: "New", ph: "", img: "assets/products/vs20.webp",
    imgs: ["assets/products/vs20.webp", "assets/products/vs20-2.webp", "assets/products/vs20-3.webp", "assets/products/vs20-4.webp", "assets/products/vs20-5.webp"],
    desc: "A single resin vase with a sculptural shape, light enough for a shelf.",
    features: [
      "Resin construction",
      "Sculptural form",
      "Light enough for shelving"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs21", name: "Ceramic Vase (Small or Large)", cat: "Home Décor", room: "Home Décor", price: 254, memberPrice: 229, sku: "SH-10529", tag: "New", ph: "", img: "assets/products/vs21.webp",
    imgs: ["assets/products/vs21.webp", "assets/products/vs21-2.webp", "assets/products/vs21-3.webp", "assets/products/vs21-4.webp", "assets/products/vs21-5.webp"],
    sizes: [{ label: "S", price: 254 }, { label: "L", price: 306 }],
    desc: "Ceramic in two sizes, plain and useful.",
    features: [
      "Ceramic construction",
      "Small and Large",
      "Simple form"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs22", name: "Glass Vase: Clear, Frosted or Coloured", cat: "Home Décor", room: "Home Décor", price: 254, memberPrice: 229, sku: "SH-10530", tag: "New", ph: "", img: "assets/products/vs22.webp",
    imgs: ["assets/products/vs22.webp", "assets/products/vs22-2.webp", "assets/products/vs22-3.webp", "assets/products/vs22-4.webp", "assets/products/vs22-5.webp"],
    sizes: [{ label: "Transparent", price: 254 }, { label: "Frosted", price: 254 }, { label: "Multi Colour", price: 254 }],
    desc: "The same shape in transparent, frosted or multi-colour glass.",
    features: [
      "Transparent, Frosted or Multi Colour",
      "Glass construction",
      "One shape, three moods"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "3" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs23", name: "Two-Piece Vase Set", cat: "Home Décor", room: "Home Décor", price: 269, memberPrice: 242, sku: "SH-10531", tag: "New", ph: "", img: "assets/products/vs23.webp",
    imgs: ["assets/products/vs23.webp", "assets/products/vs23-2.webp", "assets/products/vs23-3.webp"],
    sizes: [{ label: "2 Piece Set", price: 269 }],
    desc: "A pair designed together, so the heights and shapes work as a group from the start.",
    features: [
      "Two pieces, designed as a pair",
      "Complementary heights",
      "Ready-made grouping"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs24", name: "Crystal Vase, Smoke or Clear", cat: "Home Décor", room: "Home Décor", price: 272, memberPrice: 245, sku: "SH-10532", tag: "New", ph: "", img: "assets/products/vs24.webp",
    imgs: ["assets/products/vs24.webp", "assets/products/vs24-2.webp", "assets/products/vs24-3.webp", "assets/products/vs24-4.webp"],
    sizes: [{ label: "Smoke Grey", price: 272 }, { label: "Transparent", price: 272 }],
    desc: "Crystal in smoke grey or transparent. Smoke grey is the more interesting of the two.",
    features: [
      "Crystal glass",
      "Smoke Grey or Transparent",
      "Weighty, clear finish"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "2" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs25", name: "Porcelain Vase in Black or White", cat: "Home Décor", room: "Home Décor", price: 276, memberPrice: 248, sku: "SH-10533", tag: "New", ph: "", img: "assets/products/vs25.webp",
    imgs: ["assets/products/vs25.webp", "assets/products/vs25-2.webp", "assets/products/vs25-3.webp", "assets/products/vs25-4.webp", "assets/products/vs25-5.webp"],
    sizes: [{ label: "Black / S", price: 276 }, { label: "White / S", price: 276 }, { label: "Black / L", price: 443 }, { label: "White / L", price: 443 }],
    desc: "Porcelain in black or white, small or large.",
    features: [
      "Porcelain construction",
      "Black or White",
      "Small and Large"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "4" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs26", name: "Sculptural Floral Vase", cat: "Home Décor", room: "Home Décor", price: 287, memberPrice: 258, sku: "SH-10534", tag: "New", ph: "", img: "assets/products/vs26.webp",
    imgs: ["assets/products/vs26.webp", "assets/products/vs26-2.webp", "assets/products/vs26-3.webp", "assets/products/vs26-4.webp", "assets/products/vs26-5.webp"],
    sizes: [{ label: "S / Black", price: 287 }, { label: "S / Orange", price: 287 }, { label: "M / Black", price: 324 }, { label: "M / Orange", price: 324 }, { label: "L / Black", price: 367 }, { label: "L / Orange", price: 367 }],
    desc: "Glass in black or orange, across three sizes. Orange glass is rare and worth it.",
    features: [
      "Glass construction",
      "Black or Orange",
      "Three sizes"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "6" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs27", name: "Grey Vase (Three Sizes)", cat: "Home Décor", room: "Home Décor", price: 289, memberPrice: 260, sku: "SH-10535", tag: "New", ph: "", img: "assets/products/vs27.webp",
    imgs: ["assets/products/vs27.webp", "assets/products/vs27-2.webp", "assets/products/vs27-3.webp", "assets/products/vs27-4.webp"],
    sizes: [{ label: "Grey / Small", price: 289 }, { label: "Grey / Large", price: 457 }, { label: "Grey / X Large", price: 554 }],
    desc: "Grey, from small to extra large.",
    features: [
      "Grey finish",
      "Small, Large and X Large",
      "Group the sizes"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "3" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs28", name: "Ribbed Vase, Black or Clear", cat: "Home Décor", room: "Home Décor", price: 306, memberPrice: 275, sku: "SH-10536", tag: "New", ph: "", img: "assets/products/vs28.webp",
    imgs: ["assets/products/vs28.webp", "assets/products/vs28-2.webp", "assets/products/vs28-3.webp", "assets/products/vs28-4.webp", "assets/products/vs28-5.webp"],
    sizes: [{ label: "S / Black", price: 306 }, { label: "S / Transparent", price: 306 }, { label: "M / Black", price: 350 }, { label: "M / Transparent", price: 350 }, { label: "L / Black", price: 478 }, { label: "L / Transparent", price: 478 }],
    desc: "A ribbed surface that catches light down the sides, in black or transparent, small or medium.",
    features: [
      "Ribbed surface",
      "Black or Transparent",
      "Small and Medium"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "6" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs29", name: "Resin & Timber Vase", cat: "Home Décor", room: "Home Décor", price: 330, memberPrice: 297, sku: "SH-10537", tag: "New", ph: "", img: "assets/products/vs29.webp",
    imgs: ["assets/products/vs29.webp", "assets/products/vs29-2.webp", "assets/products/vs29-3.webp", "assets/products/vs29-4.webp", "assets/products/vs29-5.webp"],
    sizes: [{ label: "Tan / Small", price: 330 }, { label: "Chocolate / Small", price: 330 }, { label: "Tan / Large", price: 478 }, { label: "Chocolate / Large", price: 478 }],
    desc: "Resin with timber in tan or chocolate, small or large.",
    features: [
      "Resin with timber",
      "Tan or Chocolate",
      "Small and Large"
    ],
    specs: { "Type": "Vase", "Material": "Timber", "Options": "4" },
    care: "Dust with a dry cloth. Keep out of direct sun and away from damp, and wipe spills promptly. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs30", name: "Ceramic Vase Set", cat: "Home Décor", room: "Home Décor", price: 331, memberPrice: 298, sku: "SH-10538", tag: "New", ph: "", img: "assets/products/vs30.webp",
    imgs: ["assets/products/vs30.webp", "assets/products/vs30-2.webp", "assets/products/vs30-3.webp", "assets/products/vs30-4.webp", "assets/products/vs30-5.webp"],
    sizes: [{ label: "Complete Set", price: 331 }],
    desc: "A complete ceramic set, bought together.",
    features: [
      "Complete set",
      "Ceramic construction",
      "Pieces designed together"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs31", name: "Handmade Ceramic Vase Set", cat: "Home Décor", room: "Home Décor", price: 346, memberPrice: 311, sku: "SH-10539", tag: "New", ph: "", img: "assets/products/vs31.webp",
    imgs: ["assets/products/vs31.webp", "assets/products/vs31-2.webp", "assets/products/vs31-3.webp", "assets/products/vs31-4.webp", "assets/products/vs31-5.webp"],
    sizes: [{ label: "White Set", price: 346 }, { label: "Black Set", price: 346 }, { label: "Black + White Set", price: 346 }],
    desc: "Handmade ceramic in white, black, or black and white together. Handmade means each one varies slightly.",
    features: [
      "Handmade ceramic",
      "White, Black, or Black + White",
      "Slight variation in every piece"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "3" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs32", name: "Marble & Glass Vase", cat: "Home Décor", room: "Home Décor", price: 387, memberPrice: 348, sku: "SH-10540", tag: "New", ph: "", img: "assets/products/vs32.webp",
    imgs: ["assets/products/vs32.webp", "assets/products/vs32-2.webp", "assets/products/vs32-3.webp", "assets/products/vs32-4.webp", "assets/products/vs32-5.webp"],
    desc: "Marble with glass, one size, quietly expensive.",
    features: [
      "Marble with glass",
      "Single size",
      "Substantial weight"
    ],
    specs: { "Type": "Vase", "Material": "Natural marble", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs33", name: "Serene Vase Set", cat: "Home Décor", room: "Home Décor", price: 389, memberPrice: 350, sku: "SH-10541", tag: "New", ph: "", img: "assets/products/vs33.webp",
    imgs: ["assets/products/vs33.webp", "assets/products/vs33-2.jpg", "assets/products/vs33-3.webp", "assets/products/vs33-4.webp", "assets/products/vs33-5.webp"],
    sizes: [{ label: "1 x Set", price: 389 }],
    desc: "A set designed as a group.",
    features: [
      "Complete set",
      "Coordinated shapes",
      "Ready-made display"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs34", name: "Mirko Vase (Three Designs)", cat: "Home Décor", room: "Home Décor", price: 444, memberPrice: 400, sku: "SH-10542", tag: "New", ph: "", img: "assets/products/vs34.webp",
    imgs: ["assets/products/vs34.webp", "assets/products/vs34-2.webp", "assets/products/vs34-3.webp", "assets/products/vs34-4.webp", "assets/products/vs34-5.webp"],
    sizes: [{ label: "A", price: 444 }, { label: "B", price: 444 }, { label: "C", price: 444 }],
    desc: "Three designs, A, B and C.",
    features: [
      "Three designs",
      "Ceramic construction",
      "Mix for a layered look"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "3" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs35", name: "White Onyx Marble Vase", cat: "Home Décor", room: "Home Décor", price: 452, memberPrice: 407, sku: "SH-10543", tag: "New", ph: "", img: "assets/products/vs35.webp",
    imgs: ["assets/products/vs35.webp", "assets/products/vs35-2.webp", "assets/products/vs35-3.webp", "assets/products/vs35-4.webp", "assets/products/vs35-5.webp"],
    sizes: [{ label: "1", price: 452 }, { label: "2", price: 569 }, { label: "3", price: 628 }],
    desc: "White onyx marble in three designs. Onyx has a translucence that ordinary marble doesn't.",
    features: [
      "White onyx marble",
      "Three designs",
      "Translucent stone"
    ],
    specs: { "Type": "Vase", "Material": "Natural marble", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs36", name: "Vase Set in Black or Off White", cat: "Home Décor", room: "Home Décor", price: 452, memberPrice: 407, sku: "SH-10544", tag: "New", ph: "", img: "assets/products/vs36.webp",
    imgs: ["assets/products/vs36.webp", "assets/products/vs36-2.webp", "assets/products/vs36-3.webp", "assets/products/vs36-4.webp", "assets/products/vs36-5.webp"],
    sizes: [{ label: "Black Set", price: 452 }, { label: "Off White Set", price: 452 }],
    desc: "A set in black or off white.",
    features: [
      "Complete set",
      "Black or Off White",
      "Coordinated heights"
    ],
    specs: { "Type": "Vase", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads, which scratch the glaze and dull any metallic detail. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs37", name: "Stone Vase: Travertine, Calacatta or Red", cat: "Home Décor", room: "Home Décor", price: 476, memberPrice: 428, sku: "SH-10545", tag: "New", ph: "", img: "assets/products/vs37.webp",
    imgs: ["assets/products/vs37.webp", "assets/products/vs37-2.webp", "assets/products/vs37-3.webp", "assets/products/vs37-4.webp", "assets/products/vs37-5.webp"],
    sizes: [{ label: "Travertine", price: 476 }, { label: "Calcatta", price: 476 }, { label: "Red", price: 476 }],
    desc: "Three stones: travertine, calacatta white and a red marble that is genuinely unusual.",
    features: [
      "Travertine, Calacatta or Red stone",
      "Natural stone, each piece unique",
      "Red is a rare option"
    ],
    specs: { "Type": "Vase", "Material": "Natural stone", "Options": "3" },
    care: "Wipe with a soft, damp cloth. Avoid acidic and abrasive cleaners, which dull natural stone. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs38", name: "Midnight Glass Vase Set", cat: "Home Décor", room: "Home Décor", price: 489, memberPrice: 440, sku: "SH-10546", tag: "New", ph: "", img: "assets/products/vs38.webp",
    imgs: ["assets/products/vs38.webp", "assets/products/vs38-2.webp", "assets/products/vs38-3.webp"],
    sizes: [{ label: "Complete Set", price: 489 }],
    desc: "A dark glass set, bought complete.",
    features: [
      "Dark glass set",
      "Pieces designed together",
      "One purchase"
    ],
    specs: { "Type": "Vase", "Material": "Glass", "Options": "1" },
    care: "Wash by hand in warm soapy water and dry with a soft cloth to keep it clear. Avoid sudden temperature changes, which can crack glass. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs39", name: "Travertine Vase (Small or Large)", cat: "Home Décor", room: "Home Décor", price: 700, memberPrice: 630, sku: "SH-10547", tag: "New", ph: "", img: "assets/products/vs39.webp",
    imgs: ["assets/products/vs39.webp", "assets/products/vs39-2.webp", "assets/products/vs39-3.webp", "assets/products/vs39-4.webp", "assets/products/vs39-5.webp"],
    sizes: [{ label: "Small", price: 700 }, { label: "Large", price: 885 }],
    desc: "Solid travertine in two sizes, with the open texture the stone is known for.",
    features: [
      "Solid travertine",
      "Small and Large",
      "Open natural texture"
    ],
    specs: { "Type": "Vase", "Material": "Natural travertine", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs40", name: "Marble Vase (Small or Large)", cat: "Home Décor", room: "Home Décor", price: 924, memberPrice: 832, sku: "SH-10548", tag: "New", ph: "", img: "assets/products/vs40.webp",
    imgs: ["assets/products/vs40.webp", "assets/products/vs40-2.webp", "assets/products/vs40-3.webp", "assets/products/vs40-4.webp", "assets/products/vs40-5.webp"],
    sizes: [{ label: "S", price: 924 }, { label: "L", price: 996 }],
    desc: "Solid marble in two sizes.",
    features: [
      "Solid marble",
      "Small and Large",
      "Veining unique to each piece"
    ],
    specs: { "Type": "Vase", "Material": "Natural marble", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs41", name: "Black or White Marble Vase", cat: "Home Décor", room: "Home Décor", price: 1111, memberPrice: 1000, sku: "SH-10549", tag: "New", ph: "", img: "assets/products/vs41.webp",
    imgs: ["assets/products/vs41.webp", "assets/products/vs41-2.webp", "assets/products/vs41-3.webp", "assets/products/vs41-4.webp", "assets/products/vs41-5.webp"],
    sizes: [{ label: "Black Marble / Small", price: 1111 }, { label: "White Marble / Small", price: 1111 }, { label: "Travertine / Small", price: 1111 }, { label: "Black Marble / Large", price: 1194 }, { label: "White Marble / Large", price: 1194 }, { label: "Travertine / Large", price: 1194 }],
    desc: "Marble and travertine in black or white, small or large. The most substantial vases we carry.",
    features: [
      "Black or White marble",
      "Small and Large",
      "Considerable weight"
    ],
    specs: { "Type": "Vase", "Material": "Natural marble", "Options": "6" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs42", name: "Natural White Marble Vase", cat: "Home Décor", room: "Home Décor", price: 1176, memberPrice: 1058, sku: "SH-10550", tag: "New", ph: "", img: "assets/products/vs42.webp",
    imgs: ["assets/products/vs42.webp", "assets/products/vs42-2.webp", "assets/products/vs42-3.webp"],
    sizes: [{ label: "Natural White", price: 1176 }],
    desc: "One vase, cut from natural white marble.",
    features: [
      "Natural white marble",
      "Single size",
      "Cut from solid stone"
    ],
    specs: { "Type": "Vase", "Material": "Natural marble", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs43", name: "Marble Vase in Black or White", cat: "Home Décor", room: "Home Décor", price: 1193, memberPrice: 1074, sku: "SH-10551", tag: "New", ph: "", img: "assets/products/vs43.webp",
    imgs: ["assets/products/vs43.webp", "assets/products/vs43-2.webp", "assets/products/vs43-3.webp", "assets/products/vs43-4.webp", "assets/products/vs43-5.webp"],
    sizes: [{ label: "Small / Black", price: 1193 }, { label: "Small / White", price: 1193 }, { label: "Large / Black", price: 1248 }, { label: "Large / White", price: 1248 }],
    desc: "Marble in black or white, small or large.",
    features: [
      "Solid marble",
      "Black or White",
      "Small and Large"
    ],
    specs: { "Type": "Vase", "Material": "Natural marble", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry. Marble is porous, so keep it from vinegar, citrus and bleach, and stand it on felt or a coaster to protect the surface underneath. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "vs44", name: "Natural Travertine Vase", cat: "Home Décor", room: "Home Décor", price: 1200, memberPrice: 1080, sku: "SH-10552", tag: "New", ph: "", img: "assets/products/vs44.webp",
    imgs: ["assets/products/vs44.webp", "assets/products/vs44-2.webp", "assets/products/vs44-3.webp"],
    sizes: [{ label: "Travertine", price: 1200 }],
    desc: "A single travertine vase, heavy and honest.",
    features: [
      "Solid travertine",
      "Single size",
      "Natural pitted surface"
    ],
    specs: { "Type": "Vase", "Material": "Natural travertine", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. The open pores hold liquid, so clear spills quickly and never use acidic cleaners. If you're using fresh flowers, a glass liner or a smaller jar inside will protect the inside of the piece and make it far easier to clean." },

  { id: "hd01", name: "Aura Mist Ultrasonic Diffuser 160ml", cat: "Home Décor", price: 184, memberPrice: 154, sku: "SH-10101", tag: "New", ph: "", img: "assets/products/hd01.webp",
    imgs: ["assets/products/hd01.webp", "assets/products/hd01-2.webp"],
    desc: "A sculptural teardrop diffuser that turns fragrance into a moment. Whisper-quiet ultrasonic mist, soft ambient light and a 160ml reservoir bring calm, scent and a designer silhouette to any room." },
  { id: "hd09", name: "Flame-Effect Ultrasonic Humidifier & Diffuser", cat: "Home Décor", room: "Home Décor", price: 90.10, memberPrice: 85.75, sku: "SH-10111", tag: "New", ph: "", img: "assets/products/hd09.webp",
    imgs: ["assets/products/hd09.webp", "assets/products/hd09-2.webp", "assets/products/hd09-3.webp", "assets/products/hd09-4.webp", "assets/products/hd09-5.webp"],
    colours: [{ name: "White", hex: "#f2efe9" }, { name: "Black", hex: "#1c1c1c" }],
    desc: "Set the mood with the gentle flicker of a flame, without the flame. A 3-in-1 essential-oil diffuser, air humidifier and flame-effect night light in one 200ml unit, it projects a remarkably realistic dancing flame while releasing a fine, whisper-quiet mist (as low as 40 decibels) that softens dry air and carries your favourite oils through the room. A calming centrepiece for the living room, bedroom, office, yoga studio or gym, with 1/3/5-hour timers and an auto shut-off when the water runs low. Add a few drops of oil, dim the lights, and unwind.",
    features: [
      "3-in-1: essential-oil diffuser, air humidifier & flame-effect night light in one 200ml unit",
      "Add a few drops of your favourite oil to relieve fatigue and relax, while improving air quality",
      "Timer with 3 modes, 1 / 3 / 5 hours, set the spray and light mode to suit you",
      "Auto shut-off when there's no more water, making it secure and reliable",
      "Ultra-quiet noise-reduction technology, as low as 40 decibels, a silent partner for work, study or rest",
      "Available in White or Black"
    ],
    specs: { "Type": "3-in-1 diffuser / humidifier / night light", "Capacity": "200ml", "Timer": "1 / 3 / 5 hours", "Noise level": "As low as 40 dB", "Feature": "Flame-effect light" },
    boxContents: ["1 × Oil Diffuser", "1 × English manual"],
    care: "Do not open the cap while in use, to avoid water leakage. Fill with water below the maximum line, overfilling can let water re-enter the main unit and damage the circuit board. Keep water away from the heat-dissipation vents (they are not waterproof). Empty and wipe dry after use." },
  { id: "hd08", name: "Alban Bouclé Pillow Cover", cat: "Home Décor", room: "Living Room", price: 59, memberPrice: 55, sku: "SH-10110", tag: "New", ph: "", img: "assets/products/hd08.webp?v=2",
    imgs: ["assets/products/hd08.webp?v=2", "assets/products/hd08-2.webp?v=2", "assets/products/hd08-3.webp?v=2", "assets/products/hd08-4.webp?v=2", "assets/products/hd08-5.webp?v=2", "assets/products/hd08-6.webp?v=2", "assets/products/hd08-7.webp?v=2", "assets/products/hd08-8.webp?v=2", "assets/products/hd08-9.webp?v=2"],
    colours: [{ name: "Red", hex: "#7c1c26" }, { name: "Pink", hex: "#e9c3cb" }, { name: "White", hex: "#f2efe9" }, { name: "Brown", hex: "#5b4636" }, { name: "Blue", hex: "#9fb2c4" }, { name: "Khaki", hex: "#b3a37a" }, { name: "Green", hex: "#b9c7a8" }],
    sizes: ["30cm x 50cm", "45cm x 45cm", "50cm x 50cm"],
    desc: "Wrap your space in texture. The Alban cushion cover is crafted from a deep, curly bouclé with a soft, teddy-like pile that instantly adds warmth and understated luxury to sofas, beds, benches and reading nooks. In a considered palette of seven rich tones, from berry red to sage, soft blush and espresso, it layers effortlessly with linen, wool and neutrals to refresh a room in seconds. A concealed zip keeps the finish clean and makes seasonal swaps easy, and because it's sold as a cover only (insert not included), you can restyle again and again without the bulk.",
    features: [
      "Plush curly bouclé with a soft, teddy-like pile",
      "Hidden zip closure for a clean finish and easy removal",
      "Layers effortlessly with linen, knits and neutral tones",
      "Seven colourways: Red, Pink, White, Brown, Blue, Khaki & Green",
      "Cover only, cushion insert not included"
    ],
    specs: { "Type": "Cushion cover", "Material": "Bouclé", "Closure": "Hidden zip", "Insert included": "No" },
    care: "Spot clean, or gentle cold machine wash on a delicate cycle. Do not tumble dry." },
  { id: "hd02", name: "Fleur Sculptural Glass Vase", cat: "Home Décor", price: 225, memberPrice: 205, sku: "SH-10102", ph: "", img: "assets/products/hd02.webp",
    imgs: ["assets/products/hd02.webp", "assets/products/hd02-2.webp", "assets/products/hd02-3.webp", "assets/products/hd02-4.webp"],
    desc: "The Fleur glass vase brings sculptural charm to any room with a wavy silhouette that resembles an open flower. This visual statement piece is a work of art and enhances any floral arrangement you choose. Made from glass and designed for tabletop display, it suits both real and everlasting flowers. Place it on a dining table, bedside table, coffee table or kitchen bench to create an effortless centrepiece, or let it stand alone to add sculptural interest to a living space and brighten your home.",
    features: [
      "Displays a wavy silhouette that resembles an open flower, making it a visual statement piece",
      "A true work of art that enhances any floral arrangement of your choosing",
      "Great for presenting both real & everlasting flowers, for a stunning display around the home",
      "A classic addition to any dining table, bedside table, coffee table, kitchen bench & more"
    ],
    specs: { "Type": "Vase", "Location": "Tabletop", "Material": "Glass", "Primary Colour": "Blue" },
    dimensions: "26cm H x 23cm W x 23cm D", weight: "1.97 kg", boxContents: "1 x vase", care: "Wipe clean with a dry cloth" },
  { id: "hd03", name: "Ceramic Electric Oil Vaporiser", cat: "Home Décor", price: 98.90, memberPrice: 78.95, sku: "SH-10103", tag: "New", ph: "", img: "assets/products/hd03.webp",
    imgs: ["assets/products/hd03.webp", "assets/products/hd03-2.webp", "assets/products/hd03-3.webp", "assets/products/hd03-4.webp", "assets/products/hd03-5.webp"],
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
  { id: "hd04", name: "Diamond Velvet Throw Pillow Cover", cat: "Home Décor", price: 15.99, sku: "SH-10104", tag: "New", ph: "", img: "assets/products/hd04.webp",
    imgs: ["assets/products/hd04.webp", "assets/products/hd04-2.webp", "assets/products/hd04-3.webp", "assets/products/hd04-4.webp", "assets/products/hd04-5.webp", "assets/products/hd04-6.webp", "assets/products/hd04-7.webp"],
    colours: [{ name: "Beige", hex: "#d9c7a8" }, { name: "Cerulean", hex: "#2a7fba" }, { name: "Forest Green", hex: "#33513a" }, { name: "Grey", hex: "#9b9b9b" }, { name: "Navy", hex: "#232f4d" }, { name: "Orange", hex: "#d5843a" }, { name: "Rosy Brown", hex: "#bc8f8f" }, { name: "Turquoise", hex: "#3fb8ad" }],
    sizes: [{ label: "30 × 50 cm", price: 15.99 }, { label: "45 × 45 cm", price: 18.99 }, { label: "50 × 50 cm", price: 21.99 }],
    desc: "Add instant warmth and texture to any sofa, bed or reading nook with this diamond-quilted velvet cushion cover. Irresistibly soft with a subtle sheen and a plush, tactile finish, it layers beautifully with linen, knits and neutrals, and comes in a curated palette of eight rich colours to suit any space. Choose your size and shade, and style your own way.",
    features: [
      "Plush diamond-quilted velvet with a soft, subtle sheen",
      "Available in 8 curated colours and 3 versatile sizes",
      "Hidden zip closure for a clean, seamless finish",
      "Layers beautifully on sofas, beds and armchairs",
      "Cushion cover only, insert not included"
    ],
    specs: { "Type": "Cushion cover", "Material": "Velvet", "Style": "Diamond quilted", "Closure": "Hidden zip" },
    care: "Machine wash cold on a gentle cycle with like colours; do not tumble dry; cool iron if needed." },

  // ── Lifestyle ──
  { id: "l07", name: "Soft Cotton Face Washer Towels — 10 Pack (450GSM)", cat: "Lifestyle", price: 28.99, memberPrice: 25.99, sku: "SH-10105", tag: "New", ph: "", img: "assets/products/l07.webp",
    imgs: ["assets/products/l07.webp", "assets/products/l07-2.webp", "assets/products/l07-3.webp", "assets/products/l07-4.webp", "assets/products/l07-5.webp", "assets/products/l07-6.webp"],
    colours: [{ name: "Teal", hex: "#2a8d8d" }, { name: "Navy", hex: "#1f2a44" }, { name: "Blue Suede", hex: "#6a7fa0" }, { name: "Pea Pod", hex: "#a3b18a" }, { name: "Coral", hex: "#e0897a" }, { name: "Burgundy", hex: "#7b2d3a" }, { name: "Chocolate Brown", hex: "#4a3428" }, { name: "Charcoal", hex: "#4a4a4f" }, { name: "Linen", hex: "#d9cbb2" }, { name: "Silver", hex: "#c7c7c7" }, { name: "White", hex: "#f2f0ea" }],
    desc: "Wrap your everyday routine in softness with this set of 10 premium 450GSM cotton face washers. Beautifully plush yet quick-drying, with a satin-finish border and double-stitched hems that hold their shape wash after wash. Gentle on skin and endlessly useful for face, hands and travel, in a rich palette of eleven colours to suit any bathroom.",
    features: [
      "Set of 10 soft, absorbent 450GSM cotton face washers",
      "Satin-process border for an elegant, simple finish",
      "Double-stitched hemmed edges for lasting durability",
      "Quick-drying and gentle on skin, ideal for face, hands & travel",
      "Available in 11 versatile colours"
    ],
    specs: { "Material": "100% Cotton", "Weight": "450 GSM", "Pack size": "10 pieces", "Type": "Face washer / flannel" },
    care: "Machine wash cold and separately before first use. Gentle cycle; wash dark colours separately. Do not bleach. Tumble dry low. Do not iron. Do not dry clean." },

  { id: "hd05", name: "Oval Marble-Effect Coffee Table", cat: "Furniture", room: "Living Room", price: 115.37, memberPrice: 99.99, sku: "SH-10106", tag: "New", ph: "", img: "assets/products/hd05.webp",
    imgs: ["assets/products/hd05.webp", "assets/products/hd05-2.webp", "assets/products/hd05-3.webp", "assets/products/hd05-4.webp", "assets/products/hd05-5.webp", "assets/products/hd05-6.webp"],
    desc: "A sculptural centrepiece for the living room, this oval coffee table pairs a smooth marble-effect top with a warm, angular timber-look base. The soft oval silhouette keeps the room feeling open, while the crossed legs add architectural interest, a timeless, mid-century-inspired piece that anchors a lounge with quiet luxury. Style it with a stack of design books, a low vase or a scented candle to complete the look.",
    features: [
      "Elegant oval top with a natural marble-effect finish",
      "Warm timber-look base with a sculptural crossed-leg design",
      "Smooth, wipe-clean surface made for everyday living",
      "Mid-century-inspired silhouette that suits any lounge",
      "A statement centrepiece to pair with sofas, rugs & accent chairs"
    ],
    specs: { "Type": "Coffee Table", "Shape": "Oval", "Tabletop": "Marble-effect", "Base": "Timber-look", "Primary Colour": "White & Walnut", "Room": "Living / Indoor" },
    dims: { w: 80, d: 50, h: 45, unit: "cm", img: "assets/products/hd05-2.webp", printed: true },
    spin360: ["assets/products/hd05.webp"],
    care: "Wipe clean with a soft, dry or slightly damp cloth. Avoid harsh chemicals and abrasive cleaners. Use coasters to protect the surface from heat and moisture." },

  { id: "hd06", name: "Marble-Look Glass Table Set — 2 Piece (80cm)", cat: "Furniture", room: "Living Room", price: 198.37, memberPrice: 168.55, sku: "SH-10107", tag: "New", ph: "", img: "assets/products/hd06.webp",
    imgs: ["assets/products/hd06.webp", "assets/products/hd06-3.webp", "assets/products/hd06-4.webp", "assets/products/hd06-5.webp", "assets/products/hd06-6.webp", "assets/products/hd06-7.webp", "assets/products/hd06-8.webp", "assets/products/hd06-9.webp", "assets/products/hd06-10.webp"],
    desc: "A refined two-piece table set that brings a soft, luxe finish to any living space. Each table is topped with marble-look tempered glass, tough enough for everyday use yet elegant enough to feel like a designer piece. Nest them together for a compact footprint, or set them apart as a coffee table and matching side table. With clean lines and neutral marble tones, they layer effortlessly with sofas, rugs and accent chairs, an easy way to elevate a lounge, bedroom or reading corner.",
    features: [
      "Two-piece set, use nested together or apart as coffee & side tables",
      "Marble-look tempered glass tops, toughened for everyday durability",
      "Neutral marble tones that suit any palette and style",
      "Slim, contemporary frame with a light, airy footprint",
      "Wipe-clean glass surface with a polished, high-end finish"
    ],
    specs: { "Type": "Coffee & Side Table Set", "Pieces": "2", "Tabletop": "Marble-look tempered glass", "Larger table width": "80cm", "Style": "Contemporary", "Room": "Living / Indoor" },
    dims: { w: 80, d: 80, h: 45, unit: "cm", img: "assets/products/hd06-4.webp", printed: true, note: "Larger table shown (80 cm ⌀ × 45 cm high); smaller nesting table is 60 cm ⌀ × 38 cm high." },
    spin360: ["assets/products/hd06-4.webp"],
    care: "Clean the glass with a soft, damp cloth and a mild glass cleaner; avoid abrasive or harsh chemicals. Lift rather than drag when moving, and use coasters to protect from heat and moisture." },

  { id: "hd07", name: "Modern Coffee Table with Storage Drawer & Open Shelf", cat: "Furniture", room: "Living Room", price: 155.09, memberPrice: 135.55, sku: "SH-10108", tag: "New", ph: "", img: "assets/products/hd07.webp",
    imgs: ["assets/products/hd07.webp", "assets/products/hd07-2.webp", "assets/products/hd07-3.webp", "assets/products/hd07-4.webp", "assets/products/hd07-5.webp", "assets/products/hd07-6.webp", "assets/products/hd07-7.webp", "assets/products/hd07-8.webp"],
    desc: "Style and storage in one considered piece. This modern coffee table pairs a sleek marble-look top with a smart two-tone body, a soft-close drawer keeps remotes, chargers and clutter neatly out of sight, while the open shelf is ideal for books, baskets or a styling tray. Raised on slender metal legs, it feels light and contemporary, the perfect centrepiece for a living room that likes to stay tidy and effortlessly put-together.",
    features: [
      "Marble-look tabletop with a polished, contemporary finish",
      "Handy storage drawer to hide remotes, chargers & clutter",
      "Open display shelf for books, baskets or a styling tray",
      "Slim metal legs for a light, modern silhouette",
      "A functional statement piece for any living room"
    ],
    specs: { "Type": "Coffee Table", "Shape": "Rectangular", "Tabletop": "Marble-look", "Storage": "Drawer + open shelf", "Legs": "Metal", "Room": "Living / Indoor" },
    dims: { w: 100, d: 50, h: 45, unit: "cm", img: "assets/products/hd07-2.webp" },
    spin360: ["assets/products/hd07-2.webp"],
    care: "Wipe clean with a soft, damp cloth; avoid abrasive cleaners and excess water. Use coasters to protect the surface from heat and moisture." },

  { id: "of01", name: "Ergolux Plus Ergonomic Mesh Office Chair with Footrest (Grey)", brand: "Ergolux", cat: "Office", room: "Office", price: 150.45, memberPrice: 135.45, sku: "SH-10112", tag: "New", ph: "", img: "assets/products/of01.webp",
    imgs: ["assets/products/of01.webp", "assets/products/of01-2.webp", "assets/products/of01-3.webp", "assets/products/of01-4.webp", "assets/products/of01-5.webp", "assets/products/of01-6.webp", "assets/products/of01-7.webp", "assets/products/of01-8.webp", "assets/products/of01-9.webp"],
    colours: [{ name: "Grey", hex: "#9b9b9b" }],
    sizes: [{ label: "Core", price: 150.45 }, { label: "Plus", price: 171.45 }, { label: "Elite (Mesh)", price: 517.95 }, { label: "Elite (Foam)", price: 591.45 }],
    desc: "Work, study or game in all-day comfort with the Ergolux Plus ergonomic mesh office chair. The breathable mesh back keeps you cool through the longest sessions, while adaptive lumbar support, an adjustable headrest and 3D armrests shape the chair around you. Recline up to 140°, put your feet up on the retractable footrest, and glide silently on quiet castor wheels. Choose the model that suits you, from the everyday Core to the fully loaded Elite, each finished in a cool, contemporary grey.",
    features: [
      "Breathable mesh back that stays cool through long sittings",
      "Adaptive lumbar support and an adjustable headrest",
      "3D adjustable armrests plus adjustable seat height & depth",
      "Reclines up to 140° (90° / 110° / 140°) to shift your posture",
      "Retractable footrest to lean back and put your feet up",
      "Quiet castor wheels and a polished chrome base",
      "Four models to choose from: Core, Plus, Elite (Mesh) & Elite (Foam)"
    ],
    specs: { "Type": "Ergonomic office chair", "Back": "Breathable mesh", "Armrests": "3D adjustable", "Recline": "Up to 140°", "Footrest": "Retractable", "Base": "Chrome with castor wheels", "Colour": "Grey" },
    care: "Wipe the mesh and frame with a soft, dry or lightly damp cloth. Avoid harsh chemicals. Periodically check and tighten fittings, and keep the castors clear of debris for smooth rolling." },

  { id: "pk01", name: "Food-Vendor Stand-Up Pouches — Resealable Zipper (10-Pack)", cat: "Packaging", room: "Packaging", price: 12.95, memberPrice: 11.65, sku: "SH-10113", tag: "New", ph: "", img: "assets/products/foodpouch-1.webp",
    imgs: ["assets/products/foodpouch-1.webp", "assets/products/foodpouch-2.webp", "assets/products/foodpouch-3.webp"],
    sizes: [{ label: "100 × 150 + 35 mm · 10-pack", price: 12.95 }, { label: "120 × 170 + 35 mm · 10-pack", price: 15.95 }],
    desc: "Food-safe, resealable stand-up pouches that keep your product fresh and looking retail-ready — ideal for coffee, granola, nuts, dried fruit, spices, lollies, protein and pet treats. The multi-layer PET + PA + PE structure blocks moisture and odour, while the zipper top opens and reseals again and again. Made with recycled materials and finished with vibrant flexo printing. Buy retail packs here, or order wholesale in bulk with your own logo and artwork — message us on WhatsApp for the rate card, samples or custom branding.",
    features: [
      "Resealable zipper top keeps food fresh between uses",
      "Food-grade multi-layer PET + PA + PE barrier",
      "Stands upright on the shelf for great presentation",
      "Two sizes: 100×150+35mm and 120×170+35mm",
      "Two thicknesses available: 0.1 mm and 0.3 mm",
      "Made with recycled materials",
      "Custom logo, artwork & packaging available (min. order 2 pcs) — wholesale/bulk pricing on request"
    ],
    specs: { "Material structure": "PET + PA + PE", "Sealing & handle": "Resealable zipper top", "Bag type": "Stand-up pouch", "Feature": "Recycled materials", "Industrial use": "Food-grade", "Surface handling": "Flexo printing", "Thickness": "0.1 mm / 0.3 mm" },
    care: "Store in a cool, dry place out of direct sunlight. For food use, fill with dry or sealed goods and press the zipper fully closed to keep contents fresh." },
  { id: "bd01", name: "Amara Upholstered Bed Frame with 3 Drawers \u2014 Oat White", cat: "Bedroom", room: "Bedroom", price: 1350, memberPrice: 1300, sku: "SH-10114", tag: "New", ph: "", img: "assets/products/bd01.webp",
    imgs: ["assets/products/bd01.webp", "assets/products/bd01-2.webp", "assets/products/bd01-3.webp", "assets/products/bd01-4.webp", "assets/products/bd01-5.webp", "assets/products/bd01-6.webp"],
    dims: { w: 286.6, d: 219, h: 141.2, unit: "cm", img: "assets/products/bd01-3.webp", note: "King shown. Queen is the same height and depth with a narrower bedhead \u2014 see the size guide images." },
    colours: [{ name: "Oat White", hex: "#e6ded0" }],
    sizes: [{ label: "Queen", price: 1350 }, { label: "King", price: 1460 }],
    desc: "A bed that anchors the whole room. The Amara's bedhead runs extra wide and stands tall, softly padded and panelled with angled stitching that catches the light differently through the day, so the wall behind your bed stops being an afterthought. It is upholstered in a warm oat white that reads cream rather than grey, and sits on a sturdy slatted platform base, so your mattress needs no box spring underneath. Three deep drawers roll out on castors for spare linen, winter blankets and everything a bedroom quietly accumulates. Wide enough that bedside tables tuck neatly against either side, which is exactly how it is meant to be styled.",
    features: [
      "Extra-wide, extra-tall padded bedhead with angled panel stitching",
      "Three spacious under-bed drawers on castors, two at the sides and one at the foot",
      "Slatted LVL timber platform base, no box spring needed",
      "Rubberwood legs with a powder-coated iron centre rail and support feet",
      "Holds up to 200 kg",
      "Available in Queen and King",
      "Flat-packed for home assembly \u2014 two people recommended",
      "Mattress and bedside tables are not included"
    ],
    specs: { "Type": "Platform bed with storage", "Upholstery": "100% polyester over foam padding", "Frame": "MDF & particleboard", "Legs": "Rubberwood", "Slats": "LVL timber", "Centre rail": "Powder-coated iron", "Drawers": "3, on castors", "Side drawer (internal)": "19cm H x 80cm W x 50cm D", "Footboard drawer (King)": "19.8cm H x 166.1cm W x 53cm D", "Maximum weight capacity": "200 kg", "Product weight": "88 kg (Queen) / 100 kg (King)", "Mattress": "Not included", "Colour": "Oat White", "Style": "Traditional / Luxe" },
    dimensions: "Queen: 141.2cm H x 259cm W x 219cm D \u00b7 King: 141.2cm H x 286.6cm W x 219cm D \u00b7 Bedhead depth 9cm",
    weight: "88 kg",
    boxContents: ["1 \u00d7 bed", "1 \u00d7 set of assembly parts", "1 \u00d7 assembly manual"],
    warranty: "1 Year",
    guide: "assets/guides/bd01-assembly-guide.pdf",
    care: "Wipe clean with a dry cloth. Use floor protection on hard surfaces, such as a non-slip rug or felt feet protectors, and check periodically that the fixings are tight and the support legs sit firmly on the floor." }
];

/* ---- Coming-soon placeholders ---------------------------------
   Shown as "Back Soon" cards (Samira Home Decor logo) so every category
   looks stocked while real products are being added. Delete a
   category's list here once you've published real products for it. */
const COMING_SOON = {
  "Living Room": ["Bouclé Accent Armchair", "Arched Floor Mirror", "Hand-Knotted Area Rug", "Ceramic Table Lamp"],
  "Home Décor": ["Sculptural Ceramic Vase", "Framed Line-Art Print", "Marble Trinket Tray", "Faux Olive Stem"],
  "Bedroom": ["French Linen Quilt Set", "Oak Bedside Table", "Cushion & Throw Bundle", "Bedside Reading Lamp"],
  "Bathroom": ["Waffle Cotton Towel Set", "Bamboo Bath Caddy", "Woven Storage Basket", "Stoneware Soap Dispenser"],
  "Office": ["Oak Writing Desk", "Ergonomic Studio Chair", "Leather Desk Organiser", "Brass Task Lamp"],
  "Outdoor": ["Rattan Lounge Set", "Textured Ceramic Planter", "Solar Lantern Pair", "Weatherproof Cushion Set"],
  "Kitchenware": ["Stoneware Dinner Set", "Acacia Serving Board", "Glass Canister Trio", "Linen Tea Towel Set"],
  "Lifestyle": ["Soy Candle Trio", "Reed Diffuser Duo", "Travel Wash Bag", "Stoneware Mug Set"],
  "Packaging": ["Kraft Gift Boxes 10pk", "Stand-Up Food Pouches 50pk", "Ribbon & Gift Tag Kit", "Mailer Boxes 20pk"]
};
const CS_STYLES = ["", "Classic", "Luxe", "Petite", "Grand", "Studio", "Signature", "Heritage", "Everyday", "Deluxe", "Modern", "Coastal", "Nordic"];
const CS_PER_CAT = 0; // 'Back Soon' placeholder cards (0 = off; priced demo products below fill the pages instead)
Object.keys(COMING_SOON).forEach(function (cat) {
  var base = COMING_SOON[cat];
  for (var i = 0; i < CS_PER_CAT; i++) {
    var nm = base[i % base.length];
    var st = CS_STYLES[Math.floor(i / base.length) % CS_STYLES.length];
    PRODUCTS.push({
      id: "cs-" + cat.toLowerCase().replace(/[^a-z]+/g, "") + "-" + (i + 1),
      name: st ? st + " " + nm : nm,
      cat: cat, comingSoon: true, ph: "", img: "assets/logo.jpg"
    });
  }
});

/* Merge any products added via the Admin form on this device (drafts / live preview).
   These show on the site immediately; use the Admin "Copy code" to make them permanent. */
try {
  const _extra = JSON.parse(localStorage.getItem("dm_admin_products") || "[]");
  if (Array.isArray(_extra)) _extra.forEach(p => { if (p && p.id && !PRODUCTS.some(x => x.id === p.id)) PRODUCTS.push(p); });
} catch (e) {}

/* ---- How a gift is packed, and how soon it leaves ---- */
const PACKING_SPEEDS = [
  { id: "ready", name: "Ready to send", days: "3 to 5 business days",
    note: "Packed in a plain navy gift box with gold ribbon, our foil sticker and a hand-written tag.",
    kits: false },
  { id: "signature", name: "Signature packaging", days: "14 working days",
    note: "Our full printed kit in navy and gold. Choose the style below. Worth the wait for a gift that has to land well.",
    kits: true }
];

/* ---- Gift packaging styles (chosen when a hamper is built) ---- */
const PACKAGING_KITS = [
  { id: "pk-bag",    name: "Rope-handle gift bag",   note: "Navy bag with gold rope handles, tissue included", img: "assets/packaging/gift-bag.webp" },
  { id: "pk-ribbon", name: "Ribbon-tied gift box",   note: "Lidded box, gold ribbon, navy and gold tissue",    img: "assets/packaging/ribbon-box.webp" },
  { id: "pk-duo",    name: "Gift box & carry bag",   note: "Ribbon-tied box with a matching carry bag",        img: "assets/packaging/bag-and-box.webp" },
  { id: "pk-tag",    name: "Gift box with tag",      note: "Magnetic box, gold tissue and a hand-written tag", img: "assets/packaging/box-and-tag.webp" },
  { id: "pk-pouch",  name: "Drawstring pouch & box", note: "For smaller pieces, gold cord and gold tissue",    img: "assets/packaging/pouch-and-box.webp" },
  { id: "pk-trio",   name: "Three-box set",          note: "Small, medium and large, each ribbon-tied",        img: "assets/packaging/box-trio.webp" }
];

/* ---- Gift Hamper Maker items ---- */
const HAMPER_ITEMS = [
  { id: "h-gb001", name: "Chef Solid Grey Apron", price: 34.51, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h001.webp" },
  { id: "h-gb002", name: "Chef Solid Grey Oven Glove", price: 15.99, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h002.webp" },
  { id: "h-gb003", name: "Bar Geek Cocktail Strainer - Stainless Steel", price: 20.93, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h003.webp" },
  { id: "h-gb004", name: "Wine X Cocktail Muddler", price: 16.23, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h004.webp" },
  { id: "h-gb005", name: "Wine X Cocktail Strainer", price: 8.09, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h005.webp" },
  { id: "h-gb006", name: "Riedel Ouverture Set of 2 Red Wine Glasses", price: 76.0, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h006.webp" },
  { id: "h-gb007", name: "Huggables Toys Bud the Elf", price: 15.99, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h007.webp" },
  { id: "h-gb008", name: "Plain Gift Card — Black", price: 0.0, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h008.webp" },
  { id: "h-gb009", name: "Plain Gift Card — Cream", price: 0.0, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h009.webp" },
  { id: "h-gb010", name: "Premium Baby", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h010.webp" },
  { id: "h-gb011", name: "Good Mood Food", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h011.webp" },
  { id: "h-gb012", name: "Love You", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h012.webp" },
  { id: "h-gb013", name: "Get Well", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h013.webp" },
  { id: "h-gb014", name: "Sympathy", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h014.webp" },
  { id: "h-gb015", name: "Thank You", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h015.webp" },
  { id: "h-gb016", name: "Congrats", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h016.webp" },
  { id: "h-gb017", name: "Sorry", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h017.webp" },
  { id: "h-gb018", name: "Thinking of You", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h018.webp" },
  { id: "h-gb019", name: "Happy Birthday", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h019.webp" },
  { id: "h-gb020", name: "Mother's Day", price: 3.64, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h020.webp" },
  { id: "h-gb021", name: "Plain Black Corp Card", price: 0.0, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h021.webp" },
  { id: "h-gb022", name: "Plain White Corp Card", price: 0.0, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h022.webp" },
  { id: "h-gb023", name: "Video Message", price: 6.11, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h023.webp" },
  { id: "h-gb024", name: "Full Colour Printed Box Branding", price: 4.94, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h024.webp" },
  { id: "h-gb025", name: "Confetti Canon", price: 7.4, cat: "Finishing", emoji: "🎀", img: "assets/hamper/h025.webp" },
  { id: "h-gb026", name: "Gift Packaging — Medium", price: 41.91, cat: "The Box", emoji: "🎁" },
  { id: "h-gb027", name: "Gift Packaging — Small", price: 41.91, cat: "The Box", emoji: "🎁" },
  { id: "h-gb028", name: "Gift Packaging — Large", price: 48.09, cat: "The Box", emoji: "🎁" },
  { id: "h-gb029", name: "Gift Packaging — Extra", price: 60.43, cat: "The Box", emoji: "🎁" },
  { id: "h-gb030", name: "Signature Gift Box", price: 0.0, cat: "The Box", emoji: "🎁", img: "assets/hamper/h030.webp" },
  { id: "h-gb031", name: "Alfresco Picnic Basket", price: 179.01, cat: "The Box", emoji: "🎁", img: "assets/hamper/h031.webp" },
  { id: "h-gb032", name: "Heritage Picnic Basket", price: 183.95, cat: "The Box", emoji: "🎁", img: "assets/hamper/h032.webp" },
  { id: "h-gb033", name: "Signature Woven Gift Basket", price: 104.94, cat: "The Box", emoji: "🎁", img: "assets/hamper/h033.webp" },
  { id: "h-gb034", name: "Robert Gordon Market Basket", price: 72.84, cat: "The Box", emoji: "🎁", img: "assets/hamper/h034.webp" },
  { id: "h-gb035", name: "Robert Gordon Picnic Basket", price: 85.19, cat: "The Box", emoji: "🎁", img: "assets/hamper/h035.webp" },
  { id: "h-gb036", name: "French Market Basket", price: 109.88, cat: "The Box", emoji: "🎁", img: "assets/hamper/h036.webp" },
  { id: "h-gb037", name: "Hampton's Cooler Bag", price: 92.59, cat: "The Box", emoji: "🎁", img: "assets/hamper/h037.webp" },
  { id: "h-gb038", name: "Moroccan Tote Small", price: 92.59, cat: "The Box", emoji: "🎁", img: "assets/hamper/h038.webp" },
  { id: "h-gb039", name: "Moroccan Market Basket Large", price: 97.53, cat: "The Box", emoji: "🎁", img: "assets/hamper/h039.webp" },
  { id: "h-gb040", name: "Hello Baby Cookie", price: 8.58, cat: "Baby", emoji: "🍼", img: "assets/hamper/h040.webp" },
  { id: "h-gb041", name: "Baby Essentials White Blanket", price: 70.31, cat: "Baby", emoji: "🍼", img: "assets/hamper/h041.webp" },
  { id: "h-gb042", name: "Baby Made Baby Imprint Kit", price: 30.85, cat: "Baby", emoji: "🍼", img: "assets/hamper/h042.webp" },
  { id: "h-gb043", name: "Bamboo Muslin Wrap", price: 16.48, cat: "Baby", emoji: "🍼", img: "assets/hamper/h043.webp" },
  { id: "h-gb044", name: "Botany Naturals Baby Lotion 175ml", price: 18.52, cat: "Baby", emoji: "🍼", img: "assets/hamper/h044.webp" },
  { id: "h-gb045", name: "Botany Naturals Baby Shampoo & Wash", price: 18.52, cat: "Baby", emoji: "🍼", img: "assets/hamper/h045.webp" },
  { id: "h-gb046", name: "Coco Chanel Board Book Small Version", price: 16.04, cat: "Baby", emoji: "🍼", img: "assets/hamper/h046.webp" },
  { id: "h-gb047", name: "Elephant Teether", price: 24.68, cat: "Baby", emoji: "🍼", img: "assets/hamper/h047.webp" },
  { id: "h-gb048", name: "Flatout Bear Latte", price: 61.73, cat: "Baby", emoji: "🍼", img: "assets/hamper/h048.webp" },
  { id: "h-gb049", name: "Guess How Much I Love You", price: 18.51, cat: "Baby", emoji: "🍼", img: "assets/hamper/h049.webp" },
  { id: "h-gb050", name: "Little Tradie Booties", price: 36.98, cat: "Baby", emoji: "🍼", img: "assets/hamper/h050.webp" },
  { id: "h-gb051", name: "Martin Luther King Jr Book Small Version", price: 16.04, cat: "Baby", emoji: "🍼", img: "assets/hamper/h051.webp" },
  { id: "h-gb052", name: "Pure Baby Essentials White Zip Growsuit", price: 43.15, cat: "Baby", emoji: "🍼", img: "assets/hamper/h052.webp" },
  { id: "h-gb053", name: "Sophie the Giraffe Teething Toy", price: 56.73, cat: "Baby", emoji: "🍼", img: "assets/hamper/h053.webp" },
  { id: "h-gb054", name: "Stories For Kids Who Dare To Be Different", price: 49.37, cat: "Baby", emoji: "🍼", img: "assets/hamper/h054.webp" },
  { id: "h-gb055", name: "Snuggle Hunny Eucalypt Growsuit", price: 49.32, cat: "Baby", emoji: "🍼", img: "assets/hamper/h055.webp" },
  { id: "h-gb056", name: "Snuggle Hunny Eucalypt Milestone Cards", price: 43.15, cat: "Baby", emoji: "🍼", img: "assets/hamper/h056.webp" },
  { id: "h-gb057", name: "Snuggle Hunny Lion Growsuit", price: 49.32, cat: "Baby", emoji: "🍼", img: "assets/hamper/h057.webp" },
  { id: "h-gb058", name: "Snuggle Hunny Lion Knotted Beanie", price: 18.46, cat: "Baby", emoji: "🍼", img: "assets/hamper/h058.webp" },
  { id: "h-gb059", name: "Snuggle Hunny Lion Milestone Cards", price: 43.15, cat: "Baby", emoji: "🍼", img: "assets/hamper/h059.webp" },
  { id: "h-gb060", name: "Snuggle Hunny Rosebud Milestone Cards", price: 43.15, cat: "Baby", emoji: "🍼", img: "assets/hamper/h060.webp" },
  { id: "h-gb061", name: "Snuggle Hunny Rosebud Short Sleeve Bodysuit", price: 45.62, cat: "Baby", emoji: "🍼", img: "assets/hamper/h061.webp" },
  { id: "h-gb062", name: "Snuggle Hunny Rosebud Topknot", price: 18.46, cat: "Baby", emoji: "🍼", img: "assets/hamper/h062.webp" },
  { id: "h-gb063", name: "Ten Fingers and Ten Toes", price: 20.98, cat: "Baby", emoji: "🍼", img: "assets/hamper/h063.webp" },
  { id: "h-gb064", name: "The Very Hungry Caterpillar", price: 18.51, cat: "Baby", emoji: "🍼", img: "assets/hamper/h064.webp" },
  { id: "h-gb065", name: "Grounded Pleasures Original Drinking Chocolate 200g", price: 18.46, cat: "Drinks", emoji: "☕", img: "assets/hamper/h065.webp" },
  { id: "h-gb066", name: "Grounded Pleasures Marshmallows 140g", price: 14.26, cat: "Drinks", emoji: "☕", img: "assets/hamper/h066.webp" },
  { id: "h-gb067", name: "Harney & Sons English Breakfast Tea Sachets 40g", price: 35.74, cat: "Drinks", emoji: "☕", img: "assets/hamper/h067.webp" },
  { id: "h-gb068", name: "Monista Tea Co. French Earl Grey Loose Leaf Tea 100g", price: 40.56, cat: "Drinks", emoji: "☕", img: "assets/hamper/h068.webp" },
  { id: "h-gb069", name: "Pukka Herbal Collection 35g", price: 13.52, cat: "Drinks", emoji: "☕", img: "assets/hamper/h069.webp" },
  { id: "h-gb070", name: "T2 English Breakfast", price: 28.33, cat: "Drinks", emoji: "☕", img: "assets/hamper/h070.webp" },
  { id: "h-gb071", name: "Toby's Estate Coffee Woolloomoolloo 200g", price: 24.63, cat: "Drinks", emoji: "☕", img: "assets/hamper/h071.webp" },
  { id: "h-gb072", name: "Addition Studio Bath Brew Milk Bath Soak 55g", price: 28.33, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h072.webp" },
  { id: "h-gb073", name: "Cosy Luxe Pink Slippers", price: 43.15, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h073.webp" },
  { id: "h-gb074", name: "Balsa Wood Diffuser Flower", price: 6.11, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h074.webp" },
  { id: "h-gb075", name: "Equilibrium Himalyas Bath Salts 200g", price: 27.1, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h075.webp" },
  { id: "h-gb076", name: "Luxury Blush Microplush Throw Rug", price: 43.15, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h076.webp" },
  { id: "h-gb077", name: "Luxury White Robe", price: 61.67, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h077.webp" },
  { id: "h-gb078", name: "Urban Rituelle Uplifting Lemongrass, Lemon Myrtle, Grapefruit and Eucalyptus Diffuser Set 220ml", price: 70.31, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h078.webp" },
  { id: "h-gb079", name: "Urban Rituelle Uplifting Lemongrass, Lemon Myrtle, Grapefruit and Eucalyptus Hand and Body Wash 500ml", price: 54.26, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h079.webp" },
  { id: "h-gb080", name: "Urban Rituelle Uplifting Lemongrass, Lemon Myrtle, Grapefruit and Eucalyptus Hand Cream 100ml", price: 36.98, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h080.webp" },
  { id: "h-gb081", name: "Urban Rituelle Love Neroli Blossom and Cardamom Hand Cream 100ml", price: 36.98, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h081.webp" },
  { id: "h-gb082", name: "Urban Rituelle White Lotus Geranium Leaf and Bergamot Hand and Body Wash 500ml", price: 54.26, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h082.webp" },
  { id: "h-gb083", name: "Urban Rituelle White Lotus Geranium Leaf and Bergamot Hand Cream 100ml", price: 36.98, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h083.webp" },
  { id: "h-gb084", name: "Urban Rituelle White Lotus Geranium Leaf and Bergamot Soy Candle 140g", price: 43.15, cat: "Pamper", emoji: "🕯️", img: "assets/hamper/h084.webp" },
  { id: "h-gb085", name: "Beechworth Honey Eucalyptus Sweets 225g", price: 23.4, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h085.webp" },
  { id: "h-gb086", name: "Byron Bay Cookie White Choc Chunk Macadamia Cookies Gift Bag 150g", price: 19.69, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h086.webp" },
  { id: "h-gb087", name: "Chocolatier Pure Indulgence Assorted Milk Chocolate Giftbox 190g", price: 39.44, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h087.webp" },
  { id: "h-gb088", name: "Charlies Mini Melting Moments Choc & Salty Caramel 50g", price: 11.05, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h088.webp" },
  { id: "h-gb089", name: "Charlies Mini Melting Moments Raspberry Bliss 50g", price: 11.05, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h089.webp" },
  { id: "h-gb090", name: "Coco and Lulu Caramel Pecan Popcorn", price: 14.75, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h090.webp" },
  { id: "h-gb091", name: "Coco and Lulu Chocolate Almonds 150g", price: 15.99, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h091.webp" },
  { id: "h-gb092", name: "Coco and Lulu Dark Chocolate Pretzels 100g", price: 12.28, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h092.webp" },
  { id: "h-gb093", name: "Coco and Lulu Milk Chocolate Fruit and Nut Mix 90g", price: 7.35, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h093.webp" },
  { id: "h-gb094", name: "Duck Creek Choc Orange Macadamia 165g", price: 23.4, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h094.webp" },
  { id: "h-gb095", name: "Fudge by Rich Chocolate and Walnut 115g", price: 13.52, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h095.webp" },
  { id: "h-gb096", name: "Green Grove Organics Liquorice 180g", price: 12.28, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h096.webp" },
  { id: "h-gb097", name: "Gumnut Dark Vanilla Salted Caramel Twin Pack 35g", price: 13.52, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h097.webp" },
  { id: "h-gb098", name: "Highgrove Almond Crispbread 150g", price: 14.07, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h098.webp" },
  { id: "h-gb099", name: "Highgrove Butter Shortbread 135g", price: 11.05, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h099.webp" },
  { id: "h-gb100", name: "Highgrove Chocolate Fudge Biscuits 330g", price: 22.16, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h100.webp" },
  { id: "h-gb101", name: "Highgrove Raspberry & Almond Chocolate Block 90g", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h101.webp" },
  { id: "h-gb102", name: "Koko Black Chocolatier's Selection 6 Piece Selection Gift Box 70g", price: 45.62, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h102.webp" },
  { id: "h-gb103", name: "Koko Black Espresso Martini Marbles 54g", price: 23.4, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h103.webp" },
  { id: "h-gb104", name: "Koko Black Neat Negroni Marbles 54g", price: 23.4, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h104.webp" },
  { id: "h-gb105", name: "Maya Sunny Honey 100% Raw Macadamia Crunch 300g", price: 24.63, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h105.webp" },
  { id: "h-gb106", name: "Milk Chocolate Strawberries Freeze Dried 60g", price: 9.81, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h106.webp" },
  { id: "h-gb107", name: "Walters Nougat 50g", price: 6.11, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h107.webp" },
  { id: "h-gb108", name: "Whisk & Pin Milk Chocolate Rocky Road 150g", price: 20.93, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h108.webp" },
  { id: "h-gb109", name: "Wynn's Caramelised Popcorn Brittle 135g", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h109.webp" },
  { id: "h-gb110", name: "Wynn's Creme Brulee Roasted Peanuts 150g", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h110.webp" },
  { id: "h-gb111", name: "Wynn's Salted Caramel Cashews Box 180g", price: 6.11, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h111.webp" },
  { id: "h-gb112", name: "Zokoko Goddess Dark Chocolate 57g", price: 15.99, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h112.webp" },
  { id: "h-gb113", name: "Hand Decorated Gingerbread Moustache 30g", price: 11.05, cat: "For Him", emoji: "🧔", img: "assets/hamper/h113.webp" },
  { id: "h-gb114", name: "Aussie BBQ Bible", price: 50.56, cat: "For Him", emoji: "🧔", img: "assets/hamper/h114.webp" },
  { id: "h-gb115", name: "Aromatherapy Co. Therapy Man Sea Salt and Sandalwood Hand and Body Wash 500ml", price: 35.74, cat: "For Him", emoji: "🧔", img: "assets/hamper/h115.webp" },
  { id: "h-gb116", name: "Aromatherapy Co. Therapy Man Sea Salt and Sandalwood Shave Cream 100ml", price: 28.33, cat: "For Him", emoji: "🧔", img: "assets/hamper/h116.jpg" },
  { id: "h-gb117", name: "Callaway Golf Cap", price: 67.84, cat: "For Him", emoji: "🧔", img: "assets/hamper/h117.webp" },
  { id: "h-gb118", name: "Callaway Golf Tee Pack", price: 11.05, cat: "For Him", emoji: "🧔", img: "assets/hamper/h118.webp" },
  { id: "h-gb119", name: "Callaway Warbird Golf Balls 3 Pack", price: 18.46, cat: "For Him", emoji: "🧔", img: "assets/hamper/h119.webp" },
  { id: "h-gb120", name: "Luxury Brown Robe", price: 61.67, cat: "For Him", emoji: "🧔", img: "assets/hamper/h120.webp" },
  { id: "h-gb121", name: "Sir Sock Golden Eye (Grey with Yellow Polka Dots)", price: 17.22, cat: "For Him", emoji: "🧔", img: "assets/hamper/h121.jpg" },
  { id: "h-gb122", name: "Wild and Wolf Gentlemans Hardware Beard Survival Kit", price: 40.68, cat: "For Him", emoji: "🧔", img: "assets/hamper/h122.webp" },
  { id: "h-gb123", name: "Wild and Wolf Gentlemans Hardware Shoe Shine Kit", price: 56.73, cat: "For Him", emoji: "🧔", img: "assets/hamper/h123.webp" },
  { id: "h-gb124", name: "Wild and Wolf Gentlemans Hardware Wash Bag", price: 40.68, cat: "For Him", emoji: "🧔", img: "assets/hamper/h124.webp" },
  { id: "h-gb125", name: "101 Whiskies to Try Before You Die", price: 59.2, cat: "For Him", emoji: "🧔", img: "assets/hamper/h125.webp" },
  { id: "h-gb126", name: "Bar Geek Copper Cocktail Set: Parisian Shaker 630ml, Strainer, Japanese Style Jigger 15/30ml", price: 113.52, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h126.webp" },
  { id: "h-gb127", name: "Riedel Ouverture Set of 2 Champagne Glasses", price: 95.0, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h127.webp" },
  { id: "h-gb128", name: "Riedel Ouverture Set of 2 Red Wine Glasses", price: 76.0, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h128.webp" },
  { id: "h-gb129", name: "S&P Winston Double Old Fashioned Tumbler 355ml", price: 12.28, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h129.webp" },
  { id: "h-gb130", name: "S&P Winston High Ball Glass 450ml", price: 13.52, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h130.webp" },
  { id: "h-gb131", name: "Vera Wang Wedgwood Love Knots Toasting Flute Pair", price: 208.58, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h131.webp" },
  { id: "h-gb132", name: "W&P Peak Sphere Ice Tray", price: 22.16, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h132.webp" },
  { id: "h-gb133", name: "Congratulations Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h133.webp" },
  { id: "h-gb134", name: "Get Well Soon Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h134.webp" },
  { id: "h-gb135", name: "Happy Birthday Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h135.webp" },
  { id: "h-gb136", name: "Hello Baby Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h136.webp" },
  { id: "h-gb137", name: "Just Because Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h137.webp" },
  { id: "h-gb138", name: "Love You Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h138.webp" },
  { id: "h-gb139", name: "Thank You Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h139.webp" },
  { id: "h-gb140", name: "Thinking Of You Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h140.webp" },
  { id: "h-gb141", name: "With Sympathy Cookie", price: 8.58, cat: "Sweet", emoji: "🍫", img: "assets/hamper/h141.webp" },
  { id: "h-gb142", name: "Artisan Cranberry and Pumpkin Seed Crispbread 100g", price: 12.28, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h142.webp" },
  { id: "h-gb143", name: "Artisan Lavosh 100g", price: 7.35, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h143.webp" },
  { id: "h-gb144", name: "Artisan Wafers 100g", price: 6.11, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h144.webp" },
  { id: "h-gb145", name: "Australia on a Plate Simon Johnson Wasabi Peanuts 100g", price: 12.28, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h145.webp" },
  { id: "h-gb146", name: "Fancy Hank's Australian Made Tomato Sauce 375ml", price: 27.1, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h146.webp" },
  { id: "h-gb147", name: "Gran Luchito Red Pepper Salsa 300g", price: 17.22, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h147.webp" },
  { id: "h-gb148", name: "Great Southern Black Truffle Salsa 110g", price: 43.15, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h148.webp" },
  { id: "h-gb149", name: "Great Southern Truffle Infused Extra Virgin Olive Oil 100ml", price: 32.04, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h149.webp" },
  { id: "h-gb150", name: "Mount Zero Olives 80g", price: 8.58, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h150.webp" },
  { id: "h-gb151", name: "Olssons Macrobiotic Fine Sea Salt Hessian Pouch 250g", price: 12.28, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h151.webp" },
  { id: "h-gb152", name: "Pukara Estate Premium Extra Virgin Olive Oil 250ml", price: 33.27, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h152.webp" },
  { id: "h-gb153", name: "Pukara Estate Caramelised Balsamic Vinegar 250ml", price: 43.15, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h153.webp" },
  { id: "h-gb154", name: "Roco's Mediterranean Nuts 120g", price: 9.81, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h154.webp" },
  { id: "h-gb155", name: "Roco's Salted Pistachios 90g", price: 11.05, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h155.webp" },
  { id: "h-gb156", name: "Tostitos Tortilla Corn Chips", price: 17.22, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h156.webp" },
  { id: "h-gb157", name: "A Little Book of Comfort (Sympathy)", price: 11.05, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h157.webp" },
  { id: "h-gb158", name: "Avanti Coffee Plunger 350ml", price: 57.96, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h158.webp" },
  { id: "h-gb159", name: "Barkly Basics Nectarine and Mint Hand Wash 500ml", price: 19.69, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h159.webp" },
  { id: "h-gb160", name: "Chef Grey Striped Apron", price: 46.85, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h160.webp" },
  { id: "h-gb161", name: "Chef Grey Striped Oven Glove", price: 23.4, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h161.webp" },
  { id: "h-gb162", name: "Cristina Re Signature Blush Teacup and Saucer", price: 61.67, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h162.webp" },
  { id: "h-gb163", name: "Compendium In Loving Memory Book", price: 33.27, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h163.webp" },
  { id: "h-gb164", name: "French Linen Tea Towel", price: 14.75, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h164.webp" },
  { id: "h-gb165", name: "Gold Cheese Knife Set", price: 19.69, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h165.webp" },
  { id: "h-gb166", name: "Robert Gordon Snow Hug Me Mug", price: 13.52, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h166.webp" },
  { id: "h-gb167", name: "Salt & Pepper Acacia Grinders", price: 30.31, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h167.webp" },
  { id: "h-gb168", name: "Sow 'n Sow Forget Me Not Seeds", price: 15.99, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h168.webp" },
  { id: "h-gb169", name: "Profile Silver Photo Frame 5x7", price: 43.15, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h169.webp" },
  { id: "h-gb170", name: "Potted Artificial Orchid", price: 36.98, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h170.webp" },
  { id: "h-gb171", name: "Waffle Tea Towel", price: 12.28, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h171.webp" },
  { id: "h-gb172", name: "Wedgwood Camellia Teacup & Saucer", price: 192.53, cat: "Home Touch", emoji: "🍽️", img: "assets/hamper/h172.webp" },
  { id: "h-gb173", name: "Apple Isle Pear and Pistachio Paste 100g", price: 8.58, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h173.webp" },
  { id: "h-gb174", name: "Apple Isle Quince Paste 100g", price: 8.58, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h174.webp" },
  { id: "h-gb175", name: "Small Acacia Cheeseboard", price: 34.51, cat: "Savoury", emoji: "🧀", img: "assets/hamper/h175.webp" },
  { id: "h-gb176", name: "Bondi Circus Cold Brew Coffee Concentrate 500ml", price: 24.63, cat: "Drinks", emoji: "☕", img: "assets/hamper/h176.webp" },
  { id: "h-gb177", name: "Bondi Circus Nitro Black 250ml", price: 9.81, cat: "Drinks", emoji: "☕", img: "assets/hamper/h177.webp" },
  { id: "h-gb178", name: "Capi Lemonade 250ml", price: 6.11, cat: "Drinks", emoji: "☕", img: "assets/hamper/h178.webp" },
  { id: "h-gb179", name: "Joe's Classic Orange Juice 350ml", price: 7.96, cat: "Drinks", emoji: "☕", img: "assets/hamper/h179.webp" },
  { id: "h-gb180", name: "Joe's Classic Pineapple Juice 350ml", price: 7.96, cat: "Drinks", emoji: "☕", img: "assets/hamper/h180.webp" },
  { id: "h-gb181", name: "Strangelove Coastal Tonic 180ml", price: 6.11, cat: "Drinks", emoji: "☕", img: "assets/hamper/h181.jpg" },
  { id: "h-gb182", name: "Strangelove Soda Water 180ml", price: 6.11, cat: "Drinks", emoji: "☕", img: "assets/hamper/h182.webp" },
];
const HAMPER_MIN = 60;

/* ---- Ready-made hampers, built from the items above ----
   Each one lists real item ids, so the price is the sum of its parts
   and checkout re-prices it server-side like any custom hamper. */
const CURATED_HAMPERS = [
  { id: "ch-baby", name: "New Baby Hamper", tagline: "For the first weeks at home",
    items: ["h-gb041", "h-gb043", "h-gb044", "h-gb047", "h-gb040", "h-gb010"] },
  { id: "ch-pamper", name: "Pamper & Unwind Hamper", tagline: "An afternoon off, in a box",
    items: ["h-gb077", "h-gb075", "h-gb081", "h-gb073", "h-gb070", "h-gb012"] },
  { id: "ch-sweet", name: "Sweet Tooth Hamper", tagline: "Chocolate, fudge and biscuits",
    items: ["h-gb087", "h-gb086", "h-gb090", "h-gb091", "h-gb095", "h-gb019"] },
  { id: "ch-gourmet", name: "Gourmet Grazing Hamper", tagline: "Everything but the cheese board",
    items: ["h-gb152", "h-gb148", "h-gb142", "h-gb150", "h-gb147", "h-gb015"] },
  { id: "ch-him", name: "For Him Hamper", tagline: "Beard kit, socks and something to read",
    items: ["h-gb122", "h-gb121", "h-gb114", "h-gb115", "h-gb113", "h-gb016"] },
  { id: "ch-home", name: "Housewarming Hamper", tagline: "For the first night in a new place",
    items: ["h-gb001", "h-gb002", "h-gb129", "h-gb130", "h-gb065", "h-gb011"] }
];


/* ---- Rotating announcement bar ---- */
const ANNOUNCEMENTS = [
  "✦ Free shipping on orders over $500, Australia-wide",
  "🌏 We ship to Australia, NZ, UK, USA, Canada &amp; Nigeria",
  "🌸 New décor finds added weekly",
  "💝 Members save 10% on their first order, join free",
  "⭐ Loved by 500+ Australian homes · 4.9★ average review",
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
  { rating: 5, title: "Candles I keep reordering", body: "The Wattle soy candle is divine and the ceramic vessel is something I'll keep forever. Samira Home Decor is my go-to for considered little luxuries.", who: "Sofia R. · Brisbane, QLD" },
  { rating: 4, title: "Beautiful local store", body: "Such a lovely curated range of home and lifestyle pieces. Friendly service and thoughtful packaging every time.", who: "Marcus L. · Perth, WA" },
  { rating: 5, title: "The vase is a showstopper", body: "The Fleur glass vase is even more beautiful in person. It's the first thing everyone comments on when they walk in.", who: "Amelia K. · Adelaide, SA" },
  { rating: 5, title: "Made my home feel calm", body: "The diffuser is whisper-quiet and the light is so soothing at night. It's become part of my wind-down ritual.", who: "Chloe W. · Gold Coast, QLD" },
  { rating: 5, title: "Fast shipping, gorgeous packaging", body: "Ordered on a Monday and it arrived beautifully wrapped by Wednesday. You can tell they care about the details.", who: "Nadia R. · Canberra, ACT" },
  { rating: 5, title: "My go-to for gifts now", body: "I've bought three hampers for different friends and every single one has been a hit. So easy to build my own.", who: "Bianca T. · Newcastle, NSW" },
  { rating: 4, title: "Lovely cushions", body: "The velvet throw pillow covers are plush and the colours are true to the photos. Layered perfectly on our bed.", who: "Georgia M. · Hobart, TAS" },
  { rating: 5, title: "Exceptional customer care", body: "Had a question before ordering and got a warm, helpful reply within the hour. Rare to find service this personal.", who: "Daniel P. · Melbourne, VIC" },
  { rating: 5, title: "Towels are so soft", body: "The cotton face washers are thick, absorbent and wash beautifully. Bought a second set in another colour.", who: "Sarah J. · Darwin, NT" },
  { rating: 5, title: "Styling consult was worth every cent", body: "The in-home styling session completely transformed our living room. Practical, shoppable and so on-brand for us.", who: "Olivia & Tom · Brisbane, QLD" },
  { rating: 5, title: "Beautiful pieces that last", body: "Everything I've bought feels considered and well made. Samira Home Decor has become my first stop for the home.", who: "Isla F. · Sydney, NSW" },
  { rating: 4, title: "Vaporiser I adore", body: "Cool to touch, no water needed and the ceramic finish is gorgeous. Fills the whole room with a subtle scent.", who: "Ruby N. · Perth, WA" },
  { rating: 5, title: "Gift card delivered instantly", body: "Sent a last-minute gift card and it landed in my sister's inbox looking so elegant. She loved choosing her own pieces.", who: "Hannah C. · Wollongong, NSW" }
];
