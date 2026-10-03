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

  { id: "bt02", name: "Dark Marble Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 700, memberPrice: 630, sku: "SH-10115", tag: "New", ph: "", img: "assets/products/bt02-4.webp",
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

  { id: "bt03", name: "Minimalist Pump Soap Dispenser", cat: "Bathroom", room: "Bathroom", price: 77, memberPrice: 69, sku: "SH-10161", tag: "New", ph: "", img: "assets/products/bt03.jpg",
    imgs: ["assets/products/bt03.jpg", "assets/products/bt03-2.webp", "assets/products/bt03-3.jpg", "assets/products/bt03-4.jpg", "assets/products/bt03-5.webp", "assets/products/bt03-6.webp"],
    sizes: [{ label: "Black / Small", price: 77 }, { label: "Silver / Small", price: 77 }, { label: "Ivory / Small", price: 77 }, { label: "Black / Large", price: 98 }, { label: "Silver / Large", price: 98 }, { label: "Ivory / Large", price: 98 }],
    desc: "A plain, well-proportioned pump dispenser for hand soap or lotion, in a finish that doesn't shout. Two sizes, so it suits a small powder room or a busy family basin, and three colours that sit quietly against most tiles.",
    features: [
      "Smooth pump action, built for daily use",
      "Two sizes: Small and Large",
      "Black, Silver or Ivory",
      "Minimalist shape that suits most bathrooms"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "6" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt04", name: "Black Marble-Look & Gold Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 50, memberPrice: 45, sku: "SH-10162", tag: "New", ph: "", img: "assets/products/bt04.webp",
    imgs: ["assets/products/bt04.webp", "assets/products/bt04-2.webp", "assets/products/bt04-3.webp", "assets/products/bt04-4.webp", "assets/products/bt04-5.webp", "assets/products/bt04-6.webp"],
    sizes: [{ label: "Toothbrush Holder B", price: 50 }, { label: "Mouthwash Cup", price: 50 }, { label: "Soap Dish", price: 69 }, { label: "Soap Dispenser", price: 70 }, { label: "Cotton Swab Box", price: 70 }, { label: "Tray A", price: 83 }, { label: "Toothbrush Holder A", price: 88 }, { label: "Tray B", price: 116 }, { label: "Tissue Box", price: 133 }, { label: "Tray C", price: 136 }, { label: "Tray D", price: 139 }],
    desc: "Black marble-look pieces with slim gold detailing, bought individually so you take only what your basin needs. Toothbrush holders, cups, a dispenser, a cotton swab box, soap dish, tissue box and two tray sizes, all cut to the same restrained line.",
    features: [
      "Black marble-look finish with gold accents",
      "Pieces sold individually, so you buy what you need",
      "Includes dispenser, holders, soap dish, tissue box and trays",
      "Coordinated across the whole range"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "11" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt05", name: "White Marble & Gold Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 140, memberPrice: 126, sku: "SH-10163", tag: "New", ph: "", img: "assets/products/bt05.webp",
    imgs: ["assets/products/bt05.webp", "assets/products/bt05-2.webp", "assets/products/bt05-3.webp", "assets/products/bt05-4.webp", "assets/products/bt05-5.webp", "assets/products/bt05-6.webp"],
    sizes: [{ label: "Soap Dish (square)", price: 140 }, { label: "Soap Dish (round)", price: 140 }, { label: "Diffuser", price: 189 }, { label: "Cotton Swab (square)", price: 210 }, { label: "Cotton Swab (round)", price: 210 }, { label: "Soap Dispenser (square)", price: 210 }, { label: "Soap Dispenser (round)", price: 210 }, { label: "Toothbrush Holder (square)", price: 210 }, { label: "Toothbrush Holder (round)", price: 210 }, { label: "Tray 01", price: 210 }, { label: "Toothbrush Holder (long)", price: 231 }, { label: "Tray 03", price: 238 }, { label: "Tray 02", price: 252 }, { label: "Tray 04", price: 294 }, { label: "Tissue Holder (Small)", price: 301 }, { label: "Tissue Holder (Big)", price: 350 }],
    desc: "Natural white marble with gold trim, in square or round shapes depending on how soft you want the look. The veining runs differently through every piece, so a set assembled from these never looks mass-produced.",
    features: [
      "Natural white marble with gold accents",
      "Square or round shapes across the range",
      "Veining differs in every piece",
      "Pieces sold individually"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "16" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt06", name: "Two-Tone Bathroom Bin", cat: "Bathroom", room: "Bathroom", price: 209, memberPrice: 188, sku: "SH-10164", tag: "New", ph: "", img: "assets/products/bt06.webp",
    imgs: ["assets/products/bt06.webp", "assets/products/bt06-2.webp", "assets/products/bt06-3.webp", "assets/products/bt06-4.webp", "assets/products/bt06-5.webp", "assets/products/bt06-6.webp"],
    sizes: [{ label: "Orange (with lid)", price: 209 }, { label: "White + Gold (no lid)", price: 209 }, { label: "Green + Gold (no lid)", price: 209 }, { label: "White + Pink (with lid)", price: 209 }, { label: "Lime + Gold (with lid)", price: 209 }, { label: "White + Grey (with lid)", price: 209 }],
    desc: "A bin you don't have to hide. Clean-sided and weighted enough to stay put, in two-tone colourways with and without a lid, so it works beside a vanity or under a desk just as well.",
    features: [
      "Sleek silhouette that suits a visible spot",
      "With or without lid, depending on the colourway",
      "Six two-tone colour combinations",
      "Wipe-clean finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Resin / composite", "Options": "6" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners and harsh solvents, which can dull the finish." },

  { id: "bt07", name: "Touchless Sensor Bathroom Bin", cat: "Bathroom", room: "Bathroom", price: 307, memberPrice: 276, sku: "SH-10165", tag: "New", ph: "", img: "assets/products/bt07.webp",
    imgs: ["assets/products/bt07.webp", "assets/products/bt07-2.webp", "assets/products/bt07-3.webp", "assets/products/bt07-4.webp"],
    sizes: [{ label: "Round - 10L", price: 307 }, { label: "Oval - 10L", price: 307 }, { label: "Square - 10L", price: 307 }, { label: "Square - 15L", price: 307 }],
    desc: "Opens as your hand approaches and closes itself afterwards, which matters more in a bathroom than anywhere else in the house. Fully waterproof, in round, oval and square shapes, at 10 or 15 litres.",
    features: [
      "Touchless sensor lid, no contact needed",
      "Fully waterproof construction",
      "Round, oval or square",
      "10L and 15L capacities"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt08", name: "Emerald Marble Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 123, memberPrice: 111, sku: "SH-10166", tag: "New", ph: "", img: "assets/products/bt08.jpg",
    imgs: ["assets/products/bt08.jpg", "assets/products/bt08-2.jpg", "assets/products/bt08-3.jpg", "assets/products/bt08-4.jpg", "assets/products/bt08-5.jpg", "assets/products/bt08-6.webp"],
    sizes: [{ label: "Soap Dish (square)", price: 123 }, { label: "Soap Dish (round)", price: 123 }, { label: "Soap Dispenser (square)", price: 206 }, { label: "Soap Dispenser  (round)", price: 206 }, { label: "Toothbrush Holder (Round)", price: 207 }, { label: "Toothbrush Holder (square)", price: 207 }, { label: "3-Hole Holder", price: 207 }, { label: "Cotton Swab Box (square)", price: 223 }, { label: "Cotton Swab Box (round)", price: 223 }, { label: "Diffuser (square)", price: 223 }, { label: "Diffuser (round)", price: 223 }, { label: "Tray", price: 227 }, { label: "Handle Tray", price: 237 }, { label: "Tissue Box (tall)", price: 384 }, { label: "Tissue Box (long)", price: 419 }],
    desc: "Deep green natural marble with pale veining running through it, which is a far braver choice than white and looks remarkable against brass tapware. Square or round pieces, bought one at a time.",
    features: [
      "Premium natural green marble",
      "Dramatic pale veining, unique to each piece",
      "Square or round shapes",
      "Dispenser, cotton swab box, soap dish and holders"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "15" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt09", name: "Fluted Sandstone-Look Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 91, memberPrice: 82, sku: "SH-10167", tag: "New", ph: "", img: "assets/products/bt09.webp",
    imgs: ["assets/products/bt09.webp", "assets/products/bt09-2.webp", "assets/products/bt09-3.webp", "assets/products/bt09-4.webp", "assets/products/bt09-5.webp", "assets/products/bt09-6.webp"],
    sizes: [{ label: "Marble White Soap Dish", price: 91 }, { label: "Black Soap Dish", price: 91 }, { label: "White & Gold Soap Dish", price: 91 }, { label: "Marble White Toothbrush Cup", price: 94 }, { label: "Black Toothbrush Cup", price: 94 }, { label: "White & Gold Toothbrush Cup", price: 94 }, { label: "Marble White Cotton Swab Box", price: 97 }, { label: "Black Cotton Swab Box", price: 97 }, { label: "White & Gold Cotton Swab Box", price: 97 }, { label: "Marble White & Silver Soap Dispenser", price: 125 }, { label: "Marble White Diffuser", price: 125 }, { label: "Black & Silver Soap Dispenser", price: 125 }, { label: "Black Diffuser", price: 125 }, { label: "White & Gold Soap Dispenser", price: 125 }, { label: "White & Gold Diffuser", price: 125 }, { label: "Marble White Tray", price: 181 }, { label: "Black Tray", price: 181 }, { label: "White & Gold Tray", price: 181 }],
    desc: "Bevelled vertical grooves give these pieces their texture, catching the light down the sides so a plain basin suddenly has something to look at. In marble white and warmer sandstone tones.",
    features: [
      "Bevelled vertical fluting with real depth",
      "Marble white and sandstone colourways",
      "Dispenser, cotton swab box, diffuser, cup and soap dish",
      "Pieces sold individually"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural stone", "Options": "18" },
    care: "Wipe with a soft, damp cloth and dry. Avoid acidic or abrasive cleaners, which mark natural stone. Wipe spills promptly, especially oils and toothpaste." },

  { id: "bt10", name: "Sandstone Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 104, memberPrice: 94, sku: "SH-10168", tag: "New", ph: "", img: "assets/products/bt10.jpg",
    imgs: ["assets/products/bt10.jpg", "assets/products/bt10-2.webp", "assets/products/bt10-3.webp", "assets/products/bt10-4.webp", "assets/products/bt10-5.webp", "assets/products/bt10-6.webp"],
    sizes: [{ label: "Soap Dish", price: 104 }, { label: "Cup", price: 151 }, { label: "Soap Dispenser", price: 185 }, { label: "Tooth Brush Holder", price: 202 }, { label: "Tray", price: 206 }, { label: "Complete Set", price: 769 }],
    desc: "Premium sandstone, where the texture is the whole point: matte, grainy and warm rather than polished and cold. Buy the complete set, or add pieces one at a time.",
    features: [
      "Premium natural sandstone with a matte finish",
      "Complete set, or individual pieces",
      "Cup, tray, soap dish, dispenser and toothbrush holder",
      "Natural variation in every piece"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural stone", "Options": "6" },
    care: "Wipe with a soft, damp cloth and dry. Avoid acidic or abrasive cleaners, which mark natural stone. Wipe spills promptly, especially oils and toothpaste." },

  { id: "bt11", name: "Black Marble Bathroom Accessories Collection", cat: "Bathroom", room: "Bathroom", price: 168, memberPrice: 151, sku: "SH-10169", tag: "New", ph: "", img: "assets/products/bt11.webp",
    imgs: ["assets/products/bt11.webp", "assets/products/bt11-2.jpg", "assets/products/bt11-3.jpg", "assets/products/bt11-4.webp", "assets/products/bt11-5.webp", "assets/products/bt11-6.webp"],
    sizes: [{ label: "Soap Dish A", price: 168 }, { label: "Soap Dish B", price: 168 }, { label: "Soap Dispenser (gold)", price: 210 }, { label: "Soap Dispenser (silver)", price: 210 }, { label: "Soap Dispenser A (gold)", price: 210 }, { label: "Soap Dispenser A (silver)", price: 210 }, { label: "Cotton Swab box (silver)", price: 210 }, { label: "Cotton Swab box (gold)", price: 210 }, { label: "Toothbrush Holder B", price: 210 }, { label: "Toothbrush Holder C", price: 210 }, { label: "Toothbrush Holder A", price: 231 }, { label: "Aromatherapy Bottle (gold)", price: 231 }, { label: "Aromatherapy Bottle (silver)", price: 231 }, { label: "Cosmetic Mirror (silver)", price: 238 }, { label: "Cosmetic Mirror (gold)", price: 238 }, { label: "Tray A", price: 294 }, { label: "Tray B", price: 378 }, { label: "Tray C", price: 420 }, { label: "Tray D", price: 420 }],
    desc: "Black natural marble with your choice of gold or silver fittings, which is the detail that decides whether a bathroom reads warm or cool. Each piece is cut from stone, so the veining is never repeated.",
    features: [
      "Premium black natural marble",
      "Gold or silver fittings throughout",
      "Veining unique to every piece",
      "Dispensers, cotton swab boxes and more, sold individually"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "19" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt12", name: "Crystal Glass Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 672, memberPrice: 605, sku: "SH-10170", tag: "New", ph: "", img: "assets/products/bt12.webp",
    imgs: ["assets/products/bt12.webp", "assets/products/bt12-2.jpg", "assets/products/bt12-3.webp", "assets/products/bt12-4.jpg", "assets/products/bt12-5.jpg", "assets/products/bt12-6.webp"],
    sizes: [{ label: "1", price: 672 }, { label: "2", price: 672 }, { label: "3", price: 672 }, { label: "4", price: 672 }, { label: "5", price: 672 }],
    desc: "Crystal glass with faceted sides that throw light around a basin the way cut glass does on a dining table. Five styles to choose between, all finished to the same standard.",
    features: [
      "Faceted crystal glass that catches the light",
      "Five styles available",
      "Weighty, substantial feel in the hand",
      "A quiet touch of luxury for a vanity"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Glass", "Options": "5" },
    care: "Wipe with a soft, damp cloth and buff dry to keep the clarity. Avoid abrasive cleaners, and lift rather than slide the pieces across stone benchtops." },

  { id: "bt13", name: "Countertop Hand Towel Rack", cat: "Bathroom", room: "Bathroom", price: 209, memberPrice: 188, sku: "SH-10171", tag: "New", ph: "", img: "assets/products/bt13.jpg",
    imgs: ["assets/products/bt13.jpg", "assets/products/bt13-2.webp", "assets/products/bt13-3.webp", "assets/products/bt13-4.webp", "assets/products/bt13-5.webp", "assets/products/bt13-6.webp"],
    sizes: [{ label: "Black", price: 209 }, { label: "Gold", price: 209 }, { label: "Silver", price: 209 }],
    desc: "A 32cm standing rack for the bench or vanity, so a hand towel has somewhere to live that isn't the edge of the basin. Black, gold or silver.",
    features: [
      "32cm tall, sized for benches and vanities",
      "Keeps hand towels off the basin edge",
      "Black, Gold or Silver",
      "Freestanding, no fixing required"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt14", name: "Egyptian Cotton Towel Set (700GSM, 3-Piece)", cat: "Bathroom", room: "Bathroom", price: 167, memberPrice: 150, sku: "SH-10172", tag: "New", ph: "", img: "assets/products/bt14.jpg",
    imgs: ["assets/products/bt14.jpg", "assets/products/bt14-2.jpg", "assets/products/bt14-3.jpg", "assets/products/bt14-4.webp", "assets/products/bt14-5.jpg", "assets/products/bt14-6.jpg"],
    sizes: [{ label: "Light Grey / 3 Piece Towel Set", price: 167 }, { label: "Royal Blue / 3 Piece Towel Set", price: 167 }, { label: "Dark Grey / 3 Piece Towel Set", price: 167 }, { label: "White / 3 Piece Towel Set", price: 167 }, { label: "Peachy Pink / 3 Piece Towel Set", price: 167 }, { label: "Tuscan Tan / 3 Piece Towel Set", price: 167 }],
    desc: "700GSM Egyptian cotton, which is the weight where a towel stops being thin and starts feeling like a hotel. Three pieces per set, in six colours, absorbent from the first wash and soft after many.",
    features: [
      "700GSM Egyptian cotton",
      "Three-piece set",
      "Highly absorbent with a plush hand",
      "Six colours: light grey, royal blue, dark grey, white, peachy pink and more"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Egyptian cotton", "Options": "6" },
    care: "Machine wash warm with like colours. Avoid fabric softener, which coats the fibres and reduces absorbency. Tumble dry low, and skip the iron." },

  { id: "bt15", name: "Black & White Veined Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 76, memberPrice: 68, sku: "SH-10173", tag: "New", ph: "", img: "assets/products/bt15.jpg",
    imgs: ["assets/products/bt15.jpg", "assets/products/bt15-2.webp", "assets/products/bt15-3.webp", "assets/products/bt15-4.webp", "assets/products/bt15-5.webp", "assets/products/bt15-6.webp"],
    sizes: [{ label: "Soap Dish", price: 76 }, { label: "Soap Dispenser", price: 81 }, { label: "Mouthwash Cup", price: 81 }, { label: "Cotton Swab Box", price: 81 }, { label: "Toothbrush Holder", price: 90 }, { label: "Tray", price: 206 }],
    desc: "A black finish with white veining running across it, which reads as marble from across the room and costs considerably less. The tray pulls the set together on a vanity.",
    features: [
      "Black finish with elegant white veining",
      "Dispenser, mouthwash cup, toothbrush holder, cotton swab box, soap dish and tray",
      "Pieces sold individually",
      "Contemporary look at an accessible price"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "6" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt16", name: "Travertine Bathroom Collection", cat: "Bathroom", room: "Bathroom", price: 164, memberPrice: 148, sku: "SH-10174", tag: "New", ph: "", img: "assets/products/bt16.webp",
    imgs: ["assets/products/bt16.webp", "assets/products/bt16-2.jpg", "assets/products/bt16-3.jpg", "assets/products/bt16-4.webp", "assets/products/bt16-5.webp", "assets/products/bt16-6.webp"],
    sizes: [{ label: "Soap Dish A", price: 164 }, { label: "Soap Dish B", price: 164 }, { label: "Cup", price: 188 }, { label: "Toothbrush Holder", price: 195 }, { label: "Soap Dispenser A", price: 202 }, { label: "Soap Dispenser B", price: 202 }, { label: "Cotton Swab Box A", price: 202 }, { label: "Cotton Swab Box B", price: 202 }, { label: "Storage Container", price: 202 }, { label: "Tray A", price: 258 }, { label: "Aromatherapy Bottle", price: 262 }, { label: "Tray C", price: 319 }, { label: "Tray B", price: 402 }, { label: "Tissue Box", price: 414 }],
    desc: "Travertine has an open, pitted texture that reads as old-world rather than glossy, and it suits a bathroom that's meant to feel calm. The widest set of pieces we carry, including a storage container and two soap dish shapes.",
    features: [
      "Natural travertine with an open, tactile texture",
      "Includes dispensers, cotton swab boxes, cup, storage container and soap dishes",
      "Two shapes across several pieces",
      "Calm, understated finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural stone", "Options": "14" },
    care: "Wipe with a soft, damp cloth and dry. Avoid acidic or abrasive cleaners, which mark natural stone. Wipe spills promptly, especially oils and toothpaste." },

  { id: "bt17", name: "Rose Gold Bathroom Accessories Set", cat: "Bathroom", room: "Bathroom", price: 94, memberPrice: 85, sku: "SH-10175", tag: "New", ph: "", img: "assets/products/bt17.jpg",
    imgs: ["assets/products/bt17.jpg", "assets/products/bt17-2.jpg", "assets/products/bt17-3.jpg", "assets/products/bt17-4.jpg", "assets/products/bt17-5.jpg", "assets/products/bt17-6.webp"],
    sizes: [{ label: "Toothbrush Holder", price: 94 }, { label: "Soap Dispenser", price: 94 }, { label: "Soap Dish", price: 94 }, { label: "Cup", price: 94 }, { label: "Complete Set", price: 346 }],
    desc: "Rose gold detailing across a four-piece set: toothbrush holder, dispenser, soap dish and cup. Take the set, or fill a gap with a single piece.",
    features: [
      "Rose gold accents throughout",
      "Complete four-piece set or individual pieces",
      "Toothbrush holder, soap dispenser, soap dish and cup",
      "Warm metallic tone that flatters most tiles"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "5" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt18", name: "Expandable Bamboo Bath Caddy", cat: "Bathroom", room: "Bathroom", price: 189, memberPrice: 170, sku: "SH-10176", tag: "New", ph: "", img: "assets/products/bt18.jpg",
    imgs: ["assets/products/bt18.jpg", "assets/products/bt18-2.jpg", "assets/products/bt18-3.jpg", "assets/products/bt18-4.webp", "assets/products/bt18-5.webp", "assets/products/bt18-6.webp"],
    sizes: [{ label: "White", price: 189 }, { label: "Black", price: 189 }],
    desc: "Extends to fit across the bath, then holds a book, a glass and a candle where you can reach them. Bamboo, so it copes with the steam, in white or black.",
    features: [
      "Extends to fit most baths",
      "Holds a book, glass and candle",
      "Bamboo, suited to a humid room",
      "White or Black"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Timber", "Options": "2" },
    care: "Wipe dry after each use and let it air properly, since standing water is what eventually splits timber. Avoid soaking, and oil occasionally to keep the grain fed." },

  { id: "bt19", name: "Clear Cosmetic Storage Box", cat: "Bathroom", room: "Bathroom", price: 77, memberPrice: 69, sku: "SH-10177", tag: "New", ph: "", img: "assets/products/bt19.webp",
    imgs: ["assets/products/bt19.webp", "assets/products/bt19-2.webp", "assets/products/bt19-3.webp", "assets/products/bt19-4.webp", "assets/products/bt19-5.webp"],
    sizes: [{ label: "Small", price: 77 }, { label: "Large", price: 104 }],
    desc: "A clear box that keeps brushes, lipsticks and skincare upright and visible instead of rolling loose in a drawer. Two sizes, and tidy enough to leave out on the vanity.",
    features: [
      "Clear sides, so you can see what you have",
      "Keeps brushes and bottles upright",
      "Two sizes: Small and Large",
      "Smart enough to leave on display"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Resin / composite", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners and harsh solvents, which can dull the finish." },

  { id: "bt20", name: "Glass Bathroom Accessories Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 412, memberPrice: 371, sku: "SH-10178", tag: "New", ph: "", img: "assets/products/bt20.webp",
    imgs: ["assets/products/bt20.webp", "assets/products/bt20-2.webp", "assets/products/bt20-3.webp", "assets/products/bt20-4.webp", "assets/products/bt20-5.webp", "assets/products/bt20-6.webp"],
    sizes: [{ label: "4 x Piece Set / Black", price: 412 }, { label: "4 x Piece Set / White", price: 412 }],
    desc: "Four pieces in high-quality glass, in black or white, with the weight and clarity that cheap acrylic never manages. A whole basin dressed in one purchase.",
    features: [
      "High-quality glass construction",
      "Four-piece set",
      "Black or White",
      "Substantial weight and clarity"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Glass", "Options": "2" },
    care: "Wipe with a soft, damp cloth and buff dry to keep the clarity. Avoid abrasive cleaners, and lift rather than slide the pieces across stone benchtops." },

  { id: "bt21", name: "Ceramic Marble-Look Bathroom Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 266, memberPrice: 239, sku: "SH-10179", tag: "New", ph: "", img: "assets/products/bt21.webp",
    imgs: ["assets/products/bt21.webp", "assets/products/bt21-2.webp", "assets/products/bt21-3.webp", "assets/products/bt21-4.webp", "assets/products/bt21-5.webp", "assets/products/bt21-6.webp"],
    sizes: [{ label: "Emerald Green: 5 x Piece Set", price: 266 }, { label: "Snow White: 5 x Piece Set", price: 266 }, { label: "Black: 5 x Piece Set", price: 266 }],
    desc: "Five ceramic pieces finished to look like marble, with gold accents, in emerald green, snow white or black. All the drama of stone, at a fraction of the price and weight.",
    features: [
      "Five-piece ceramic set",
      "Marble-look finish with gold accents",
      "Emerald Green, Snow White or Black",
      "Lighter and more affordable than natural stone"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "3" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt22", name: "Marble & Copper Floor Towel Holder", cat: "Bathroom", room: "Bathroom", price: 1537, memberPrice: 1383, sku: "SH-10180", tag: "New", ph: "", img: "assets/products/bt22.jpg",
    imgs: ["assets/products/bt22.jpg", "assets/products/bt22-2.webp", "assets/products/bt22-3.jpg", "assets/products/bt22-4.jpg", "assets/products/bt22-5.jpg", "assets/products/bt22-6.jpg"],
    sizes: [{ label: "White + Gold", price: 1537 }, { label: "White + Black", price: 1537 }, { label: "Black + Black", price: 1537 }, { label: "Black + Gold", price: 1537 }],
    desc: "A freestanding towel holder on a solid marble base with copper rods, heavy enough to stay exactly where you put it. The piece that makes a bathroom look finished rather than furnished.",
    features: [
      "Solid marble base with copper rods",
      "Freestanding, no wall fixing",
      "Four colour combinations",
      "Weighted for stability"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt23", name: "Porcelain Bathroom Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 262, memberPrice: 236, sku: "SH-10181", tag: "New", ph: "", img: "assets/products/bt23.jpg",
    imgs: ["assets/products/bt23.jpg", "assets/products/bt23-2.jpg", "assets/products/bt23-3.jpg", "assets/products/bt23-4.jpg", "assets/products/bt23-5.jpg"],
    sizes: [{ label: "5 Piece Set", price: 262 }],
    desc: "Five porcelain pieces with clean lines and nothing superfluous, made to work together on a single vanity.",
    features: [
      "Five coordinated porcelain pieces",
      "Minimalist, contemporary lines",
      "Designed to be used as a set",
      "Smooth, wipe-clean glaze"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt24", name: "Ceramic Bathroom Accessories Collection", cat: "Bathroom", room: "Bathroom", price: 97, memberPrice: 87, sku: "SH-10182", tag: "New", ph: "", img: "assets/products/bt24.webp",
    imgs: ["assets/products/bt24.webp", "assets/products/bt24-2.webp", "assets/products/bt24-3.webp", "assets/products/bt24-4.webp", "assets/products/bt24-5.webp", "assets/products/bt24-6.webp"],
    sizes: [{ label: "Soap Dish / Silver", price: 97 }, { label: "Soap Dish / White", price: 97 }, { label: "Soap Dish / Gold", price: 97 }, { label: "Holder / Silver", price: 104 }, { label: "Holder / White", price: 104 }, { label: "Holder / Gold", price: 104 }, { label: "Cup / Silver", price: 108 }, { label: "Cup / White", price: 108 }, { label: "Cup / Gold", price: 108 }, { label: "Dispenser / Silver", price: 111 }, { label: "Dispenser / White", price: 111 }, { label: "Dispenser / Gold", price: 111 }],
    desc: "Good ceramic in silver, white or gold trims, sold piece by piece: dispenser, cup and holder. The easy way to replace one tired item without rebuying the lot.",
    features: [
      "High-quality ceramic",
      "Silver, White or Gold trims",
      "Dispenser, cup and holder",
      "Buy single pieces to fill a gap"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "12" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt25", name: "Marble-Base Rotating Vanity Mirror", cat: "Bathroom", room: "Bathroom", price: 482, memberPrice: 434, sku: "SH-10183", tag: "New", ph: "", img: "assets/products/bt25.jpg",
    imgs: ["assets/products/bt25.jpg", "assets/products/bt25-2.webp", "assets/products/bt25-3.webp", "assets/products/bt25-4.webp", "assets/products/bt25-5.webp", "assets/products/bt25-6.webp"],
    sizes: [{ label: "White", price: 482 }, { label: "Black", price: 482 }],
    desc: "A vanity mirror on a marble base that turns to the angle you need and stays there. Heavy enough not to creep across the bench while you use it.",
    features: [
      "Rotates to the angle you need",
      "Solid marble base",
      "White or Black",
      "Weighted so it stays put"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt26", name: "Marble Toiletry Collection", cat: "Bathroom", room: "Bathroom", price: 140, memberPrice: 126, sku: "SH-10184", tag: "New", ph: "", img: "assets/products/bt26.webp",
    imgs: ["assets/products/bt26.webp", "assets/products/bt26-2.jpg", "assets/products/bt26-3.webp", "assets/products/bt26-4.webp", "assets/products/bt26-5.webp", "assets/products/bt26-6.webp"],
    sizes: [{ label: "Soap Dish", price: 140 }, { label: "Mouth Cup", price: 196 }, { label: "Soap Dispenser (gold)", price: 210 }, { label: "Soap Dispenser (silver)", price: 210 }, { label: "Cotton Swab Box", price: 210 }, { label: "Toothbrush Holder", price: 231 }, { label: "Tissue Box B", price: 308 }, { label: "Tissue Box A", price: 350 }, { label: "Tray", price: 420 }],
    desc: "Marble pieces at a larger scale than most: two tissue box designs, a generous tray, dispensers in gold or silver. For a bathroom with the bench space to carry them.",
    features: [
      "Genuine marble throughout",
      "Two tissue box designs and a generous tray",
      "Gold or silver dispenser fittings",
      "Larger scale than most accessory ranges"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "9" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt27", name: "Expandable Timber Bath Caddy", cat: "Bathroom", room: "Bathroom", price: 223, memberPrice: 201, sku: "SH-10185", tag: "New", ph: "", img: "assets/products/bt27.jpg",
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

  { id: "bt28", name: "Luxe Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 455, memberPrice: 410, sku: "SH-10186", tag: "New", ph: "", img: "assets/products/bt28.webp",
    imgs: ["assets/products/bt28.webp", "assets/products/bt28-2.jpg", "assets/products/bt28-3.webp", "assets/products/bt28-4.jpg", "assets/products/bt28-5.webp", "assets/products/bt28-6.webp"],
    sizes: [{ label: "4 Piece Set A", price: 455 }, { label: "4 Piece Set B", price: 455 }],
    desc: "A four-piece set in two arrangements, made to dress a whole basin at once rather than be collected slowly.",
    features: [
      "Four-piece set",
      "Two arrangements to choose from",
      "Coordinated finish across every piece",
      "A complete basin in one purchase"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt29", name: "Gilded Bathroom Accessories Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 83, memberPrice: 75, sku: "SH-10187", tag: "New", ph: "", img: "assets/products/bt29.jpg",
    imgs: ["assets/products/bt29.jpg", "assets/products/bt29-2.jpg", "assets/products/bt29-3.jpg"],
    sizes: [{ label: "Soap Dish", price: 83 }, { label: "Toothbrush Holder", price: 83 }, { label: "Soap Dispenser", price: 83 }, { label: "Cup", price: 83 }, { label: "4 Piece Set", price: 321 }],
    desc: "Four pieces with gilded detailing, available as a set or individually, so a single soap dish can be replaced without starting again.",
    features: [
      "Four-piece set or individual pieces",
      "Gilded detailing",
      "Soap dish, toothbrush holder, dispenser and cup",
      "Consistent finish across the range"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "5" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt30", name: "Three-Tier Standing Towel Rack", cat: "Bathroom", room: "Bathroom", price: 966, memberPrice: 869, sku: "SH-10188", tag: "New", ph: "", img: "assets/products/bt30.jpg",
    imgs: ["assets/products/bt30.jpg", "assets/products/bt30-2.jpg", "assets/products/bt30-3.jpg", "assets/products/bt30-4.webp", "assets/products/bt30-5.webp", "assets/products/bt30-6.webp"],
    sizes: [{ label: "Black / Small", price: 966 }, { label: "Gold / Small", price: 966 }, { label: "Black / Large", price: 1036 }, { label: "Gold / Large", price: 1036 }],
    desc: "Three hanging levels on a freestanding frame, which is what a family bathroom actually needs: somewhere for three towels to dry properly rather than overlap on one rail.",
    features: [
      "Three hanging levels",
      "Freestanding, no wall fixing required",
      "Black or Gold",
      "Small and Large sizes"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "4" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt31", name: "Stainless Steel & Marble Towel Holder", cat: "Bathroom", room: "Bathroom", price: 349, memberPrice: 314, sku: "SH-10189", tag: "New", ph: "", img: "assets/products/bt31.webp",
    imgs: ["assets/products/bt31.webp", "assets/products/bt31-2.webp", "assets/products/bt31-3.webp", "assets/products/bt31-4.webp", "assets/products/bt31-5.jpg", "assets/products/bt31-6.jpg"],
    sizes: [{ label: "Black", price: 349 }, { label: "Brushed Gold", price: 349 }],
    desc: "Stainless steel rods on a marble foot: the steel handles the damp, the marble handles the standing still. Black or brushed gold.",
    features: [
      "Premium stainless steel with a marble base",
      "Resists rust in a humid room",
      "Black or Brushed Gold",
      "Freestanding"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt32", name: "Beige Bathroom Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 314, memberPrice: 283, sku: "SH-10190", tag: "New", ph: "", img: "assets/products/bt32.webp",
    imgs: ["assets/products/bt32.webp", "assets/products/bt32-2.webp", "assets/products/bt32-3.webp", "assets/products/bt32-4.webp", "assets/products/bt32-5.jpg", "assets/products/bt32-6.jpg"],
    sizes: [{ label: "Beige / 5pc Set", price: 314 }],
    desc: "Five pieces in a soft beige that works with timber vanities and warm tiles, where a stark white set would look cold.",
    features: [
      "Five-piece set",
      "Soft beige tone",
      "Suits timber and warm-toned bathrooms",
      "Coordinated across every piece"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "1" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt33", name: "Tree Branch Wall Hook (78cm)", cat: "Bathroom", room: "Bathroom", price: 434, memberPrice: 391, sku: "SH-10191", tag: "New", ph: "", img: "assets/products/bt33.jpg",
    imgs: ["assets/products/bt33.jpg", "assets/products/bt33-2.jpg", "assets/products/bt33-3.jpg", "assets/products/bt33-4.jpg", "assets/products/bt33-5.webp", "assets/products/bt33-6.webp"],
    sizes: [{ label: "Black + Gold / 78cm x 1.5cm", price: 434 }],
    desc: "A branching wall hook, 78cm long, that holds robes, towels and bags without looking like hardware. Black with gold.",
    features: [
      "78cm branching design",
      "Holds robes, towels and bags",
      "Black and gold finish",
      "A decorative piece as much as storage"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt34", name: "Dual-Rod Rotating Towel Rack", cat: "Bathroom", room: "Bathroom", price: 686, memberPrice: 617, sku: "SH-10192", tag: "New", ph: "", img: "assets/products/bt34.webp",
    imgs: ["assets/products/bt34.webp", "assets/products/bt34-2.jpg", "assets/products/bt34-3.webp", "assets/products/bt34-4.webp", "assets/products/bt34-5.jpg"],
    sizes: [{ label: "Silver", price: 686 }, { label: "Gold", price: 686 }],
    desc: "Two rods that rotate independently, so towels can be spread out to dry rather than bunched together. Silver or gold.",
    features: [
      "Two independently rotating rods",
      "Spreads towels so they dry properly",
      "Silver or Gold",
      "Freestanding frame"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt35", name: "Standing Stainless Steel Towel Rack", cat: "Bathroom", room: "Bathroom", price: 259, memberPrice: 233, sku: "SH-10193", tag: "New", ph: "", img: "assets/products/bt35.jpg",
    imgs: ["assets/products/bt35.jpg", "assets/products/bt35-2.jpg", "assets/products/bt35-3.jpg", "assets/products/bt35-4.jpg", "assets/products/bt35-5.webp", "assets/products/bt35-6.webp"],
    sizes: [{ label: "Black", price: 259 }, { label: "Brushed Gold", price: 259 }, { label: "Brushed Silver", price: 259 }],
    desc: "A simple standing rack in stainless steel, which is the material that survives a wet bathroom without rusting at the joints. Black, brushed gold or brushed silver.",
    features: [
      "High-quality stainless steel",
      "Resists rust and water spotting",
      "Black, Brushed Gold or Brushed Silver",
      "Clean, modern lines"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "3" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt36", name: "Two-Bar Floor Towel Rack with Storage", cat: "Bathroom", room: "Bathroom", price: 1182, memberPrice: 1064, sku: "SH-10194", tag: "New", ph: "", img: "assets/products/bt36.webp",
    imgs: ["assets/products/bt36.webp", "assets/products/bt36-2.jpg", "assets/products/bt36-3.webp", "assets/products/bt36-4.jpg", "assets/products/bt36-5.webp", "assets/products/bt36-6.webp"],
    sizes: [{ label: "Black", price: 1182 }, { label: "Gold", price: 1182 }],
    desc: "Two sturdy bars for towels with storage built into the frame below, so the bathroom gains a shelf as well as a rail.",
    features: [
      "Two sturdy towel bars",
      "Built-in storage below",
      "Durable metal construction",
      "Black or Gold"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt37", name: "Marble-Base Vertical Towel Rack", cat: "Bathroom", room: "Bathroom", price: 1232, memberPrice: 1109, sku: "SH-10195", tag: "New", ph: "", img: "assets/products/bt37.webp",
    imgs: ["assets/products/bt37.webp", "assets/products/bt37-2.webp", "assets/products/bt37-3.webp", "assets/products/bt37-4.jpg", "assets/products/bt37-5.webp"],
    sizes: [{ label: "Black", price: 1232 }],
    desc: "A tall vertical rack on a marble base, which keeps the footprint small while holding full-size bath towels. Black.",
    features: [
      "Solid marble base",
      "Vertical design with a small footprint",
      "Holds full-size bath towels",
      "Movable, no fixing required"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "1" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt38", name: "Modern Bath Accessories Collection", cat: "Bathroom", room: "Bathroom", price: 90, memberPrice: 81, sku: "SH-10196", tag: "New", ph: "", img: "assets/products/bt38.jpg",
    imgs: ["assets/products/bt38.jpg", "assets/products/bt38-2.jpg", "assets/products/bt38-3.jpg", "assets/products/bt38-4.webp", "assets/products/bt38-5.webp", "assets/products/bt38-6.webp"],
    sizes: [{ label: "Soap dish", price: 90 }, { label: "Cotton Swab Box", price: 101 }, { label: "Soap Dispenser", price: 101 }, { label: "Tray", price: 168 }],
    desc: "Clean lines and a contemporary finish across a cotton swab box, dispenser, soap dish and tray. Unfussy pieces for a bathroom that doesn't want a theme.",
    features: [
      "Cotton swab box, dispenser, soap dish and tray",
      "Clean contemporary lines",
      "Pieces sold individually",
      "Easy to wipe down"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Resin / composite", "Options": "4" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners and harsh solvents, which can dull the finish." },

  { id: "bt39", name: "Matte Bathroom Accessories Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 349, memberPrice: 314, sku: "SH-10197", tag: "New", ph: "", img: "assets/products/bt39.webp",
    imgs: ["assets/products/bt39.webp", "assets/products/bt39-2.jpg", "assets/products/bt39-3.jpg", "assets/products/bt39-4.jpg", "assets/products/bt39-5.jpg", "assets/products/bt39-6.webp"],
    sizes: [{ label: "Grey - 5 Pcs", price: 349 }, { label: "Sandstone- 5 Pcs", price: 349 }],
    desc: "A five-piece set in a soft matte finish, in grey or sandstone, that hides water spots far better than anything glossy.",
    features: [
      "Five-piece set",
      "Soft matte finish",
      "Grey or Sandstone",
      "Hides water marks better than gloss"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Resin / composite", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive cleaners and harsh solvents, which can dull the finish." },

  { id: "bt40", name: "Veined Marble Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 167, memberPrice: 150, sku: "SH-10198", tag: "New", ph: "", img: "assets/products/bt40.webp",
    imgs: ["assets/products/bt40.webp", "assets/products/bt40-2.jpg", "assets/products/bt40-3.webp", "assets/products/bt40-4.webp", "assets/products/bt40-5.webp", "assets/products/bt40-6.webp"],
    sizes: [{ label: "Soap dish", price: 167 }, { label: "Soap Dispenser", price: 207 }, { label: "Cup", price: 207 }, { label: "Cotton Swab Box", price: 248 }, { label: "Tray A", price: 357 }, { label: "Tray B", price: 382 }],
    desc: "Premium marble with pronounced veining, including two tray sizes for whatever bench space you have. Sold piece by piece.",
    features: [
      "Premium marble with pronounced veining",
      "Two tray sizes",
      "Dispenser, cotton swab box, cup and soap dish",
      "Each piece individually cut"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "6" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt41", name: "Faceted Ceramic Bathroom Set (5-Piece)", cat: "Bathroom", room: "Bathroom", price: 277, memberPrice: 249, sku: "SH-10199", tag: "New", ph: "", img: "assets/products/bt41.jpg",
    imgs: ["assets/products/bt41.jpg", "assets/products/bt41-2.jpg", "assets/products/bt41-3.jpg", "assets/products/bt41-4.jpg", "assets/products/bt41-5.jpg", "assets/products/bt41-6.webp"],
    sizes: [{ label: "5 Pcs White Set", price: 277 }, { label: "5 Pcs Black Set", price: 277 }],
    desc: "Five ceramic pieces with faceted, polygonal sides that give a plain white or black set some shape and shadow.",
    features: [
      "Faceted, polygonal shape",
      "Five-piece ceramic set",
      "White or Black",
      "Smooth, wipe-clean glaze"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt42", name: "Natural Marble Bathroom Accessories", cat: "Bathroom", room: "Bathroom", price: 188, memberPrice: 169, sku: "SH-10200", tag: "New", ph: "", img: "assets/products/bt42.jpg",
    imgs: ["assets/products/bt42.jpg", "assets/products/bt42-2.jpg", "assets/products/bt42-3.jpg", "assets/products/bt42-4.webp", "assets/products/bt42-5.webp", "assets/products/bt42-6.webp"],
    sizes: [{ label: "Toothbrush Cup", price: 188 }, { label: "Soap Dispenser A", price: 210 }, { label: "Soap Dispenser B", price: 210 }, { label: "Cotton Swab Box", price: 210 }, { label: "Diffuser", price: 230 }, { label: "Soap Dish", price: 308 }, { label: "Tray", price: 412 }],
    desc: "Genuine marble, including a diffuser and a generous tray alongside the usual pieces, so the whole vanity can be in one stone.",
    features: [
      "Genuine natural marble",
      "Includes diffuser and tray as well as the basics",
      "Two dispenser designs",
      "Veining unique to each piece"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Natural marble", "Options": "7" },
    care: "Wipe with a soft, damp cloth and dry straight away. Marble is porous, so keep it away from vinegar, citrus and bleach, which dull and etch the surface. Stand bottles on a tray rather than directly on the stone." },

  { id: "bt43", name: "Ceramic Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 328, memberPrice: 295, sku: "SH-10201", tag: "New", ph: "", img: "assets/products/bt43.webp",
    imgs: ["assets/products/bt43.webp", "assets/products/bt43-2.webp", "assets/products/bt43-3.webp", "assets/products/bt43-4.webp", "assets/products/bt43-5.webp", "assets/products/bt43-6.webp"],
    sizes: [{ label: "Green Set", price: 328 }, { label: "Coffee Set", price: 328 }],
    desc: "Four premium ceramic pieces in green or coffee, a quieter palette than the usual white and gold.",
    features: [
      "Four-piece premium ceramic set",
      "Green or Coffee colourway",
      "Minimalist shape",
      "Coordinated finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Ceramic", "Options": "2" },
    care: "Wipe clean with a soft, damp cloth. Avoid abrasive pads and scouring powders, which scratch the glaze and dull any metallic detail." },

  { id: "bt44", name: "Crystal Glass Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 1016, memberPrice: 914, sku: "SH-10202", tag: "New", ph: "", img: "assets/products/bt44.webp",
    imgs: ["assets/products/bt44.webp", "assets/products/bt44-2.jpg", "assets/products/bt44-3.webp", "assets/products/bt44-4.webp", "assets/products/bt44-5.webp"],
    sizes: [{ label: "4 Piece Set", price: 1016 }],
    desc: "Four pieces in crystal glass, bought together, for a vanity that catches the light every time someone walks past.",
    features: [
      "Four-piece crystal glass set",
      "Catches and throws light",
      "Substantial, weighty feel",
      "Timeless finish"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Glass", "Options": "1" },
    care: "Wipe with a soft, damp cloth and buff dry to keep the clarity. Avoid abrasive cleaners, and lift rather than slide the pieces across stone benchtops." },

  { id: "bt45", name: "Corner Towel Rack (40 × 50cm)", cat: "Bathroom", room: "Bathroom", price: 448, memberPrice: 403, sku: "SH-10203", tag: "New", ph: "", img: "assets/products/bt45.webp",
    imgs: ["assets/products/bt45.webp", "assets/products/bt45-2.webp", "assets/products/bt45-3.webp", "assets/products/bt45-4.webp", "assets/products/bt45-5.webp"],
    sizes: [{ label: "Black / 40cm x 50cm", price: 448 }, { label: "Gold / 40cm x 50cm", price: 448 }],
    desc: "Built for the corner that nothing else fits, 40 by 50cm, keeping towels off the floor and out of the way. Black or gold.",
    features: [
      "Fits an unused corner",
      "40 × 50cm",
      "Black or Gold",
      "Keeps towels tidy and off the floor"
    ],
    specs: { "Type": "Bathroom accessory", "Material": "Stainless steel / metal", "Options": "2" },
    care: "Wipe with a soft, damp cloth and dry to prevent water spotting, which is the usual reason a finish looks tired. Avoid abrasive cleaners on brushed and coloured finishes." },

  { id: "bt46", name: "Granite-Look Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 406, memberPrice: 365, sku: "SH-10204", tag: "New", ph: "", img: "assets/products/bt46.jpg",
    imgs: ["assets/products/bt46.jpg", "assets/products/bt46-2.jpg", "assets/products/bt46-3.jpg", "assets/products/bt46-4.jpg", "assets/products/bt46-5.jpg", "assets/products/bt46-6.jpg"],
    sizes: [{ label: "4 x Piece Set", price: 406 }],
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
  { id: "sf01", name: "Deep-Seat Family Sofa", cat: "Living Room", room: "Living Room", price: 1210, memberPrice: 1089, sku: "SH-10205", tag: "New", ph: "", img: "assets/products/sf01.webp",
    imgs: ["assets/products/sf01.webp", "assets/products/sf01-2.webp", "assets/products/sf01-3.webp", "assets/products/sf01-4.webp", "assets/products/sf01-5.webp"],
    sizes: [{ label: "Beige / Foot Petal", price: 1210 }, { label: "Beige / 120cm", price: 3283 }, { label: "Beige / 180cm", price: 9855 }, { label: "Beige / 200cm", price: 10084 }, { label: "Beige / 220cm", price: 10438 }, { label: "Beige / 240cm", price: 11180 }, { label: "Beige / 260cm", price: 11851 }, { label: "Beige / 280cm", price: 13982 }, { label: "Beige / 300cm", price: 14482 }],
    desc: "Built for the household where everyone piles on at once: a deep seat, a soft back and widths right up to 260cm. Beige, which is the colour that forgives a family.",
    features: [
      "Deep seat and soft, yielding back",
      "Widths from 120cm to 260cm",
      "Warm beige upholstery",
      "Made for daily family use"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "9", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf02", name: "Modular Sofa with Chaise Options", cat: "Living Room", room: "Living Room", price: 1238, memberPrice: 1114, sku: "SH-10206", tag: "New", ph: "", img: "assets/products/sf02.webp",
    imgs: ["assets/products/sf02.webp", "assets/products/sf02-2.webp", "assets/products/sf02-3.webp", "assets/products/sf02-4.webp", "assets/products/sf02-5.webp"],
    sizes: [{ label: "Beige / Foot Pedal", price: 1238 }, { label: "Emerald Green / Foot Pedal", price: 1238 }, { label: "Charcoal Grey / Foot Pedal", price: 1238 }, { label: "Tan / Foot Pedal", price: 1238 }, { label: "Beige / 110cm", price: 3296 }, { label: "Emerald Green / 110cm", price: 3296 }, { label: "Charcoal Grey / 110cm", price: 3296 }, { label: "Tan / 110cm", price: 3296 }, { label: "Beige / 180cm", price: 5330 }, { label: "Emerald Green / 180cm", price: 5330 }, { label: "Charcoal Grey / 180cm", price: 5330 }, { label: "Tan / 180cm", price: 5330 }, { label: "Beige / 220cm", price: 5838 }, { label: "Emerald Green / 220cm", price: 5838 }, { label: "Charcoal Grey / 220cm", price: 5838 }, { label: "Tan / 220cm", price: 5838 }, { label: "Beige / 250cm", price: 6234 }, { label: "Emerald Green / 250cm", price: 6234 }, { label: "Charcoal Grey / 250cm", price: 6234 }, { label: "Tan / 250cm", price: 6234 }, { label: "Beige / 280cm", price: 6565 }, { label: "Emerald Green / 280cm", price: 6565 }, { label: "Charcoal Grey / 280cm", price: 6565 }, { label: "Tan / 280cm", price: 6565 }, { label: "Beige / 320cm", price: 7407 }, { label: "Emerald Green / 320cm", price: 7407 }, { label: "Charcoal Grey / 320cm", price: 7407 }, { label: "Tan / 320cm", price: 7407 }, { label: "Beige / 280cm + 180cm Chaise", price: 7532 }, { label: "Emerald Green / 280cm + 180cm Chaise", price: 7532 }, { label: "Charcoal Grey / 280cm + 180cm Chaise", price: 7532 }, { label: "Tan / 280cm + 180cm Chaise", price: 7532 }, { label: "Beige / 360cm", price: 7561 }, { label: "Emerald Green / 360cm", price: 7561 }, { label: "Charcoal Grey / 360cm", price: 7561 }, { label: "Tan / 360cm", price: 7561 }, { label: "Beige / 310cm + 180cm Chaise", price: 8056 }, { label: "Emerald Green / 310cm + 180cm Chaise", price: 8056 }, { label: "Charcoal Grey / 310cm + 180cm Chaise", price: 8056 }, { label: "Tan / 310cm + 180cm Chaise", price: 8056 }, { label: "Beige / 320cm + 180cm Chaise", price: 8705 }, { label: "Emerald Green / 320cm + 180cm Chaise", price: 8705 }, { label: "Charcoal Grey / 320cm + 180cm Chaise", price: 8705 }, { label: "Tan / 320cm + 180cm Chaise", price: 8705 }, { label: "Beige / 360cm + 180cm Chaise", price: 9344 }, { label: "Emerald Green / 360cm + 180cm Chaise", price: 9344 }, { label: "Charcoal Grey / 360cm + 180cm Chaise", price: 9344 }, { label: "Tan / 360cm + 180cm Chaise", price: 9344 }, { label: "Beige / 400cm + 180cm Chaise", price: 10192 }, { label: "Emerald Green / 400cm + 180cm Chaise", price: 10192 }, { label: "Charcoal Grey / 400cm + 180cm Chaise", price: 10192 }, { label: "Tan / 400cm + 180cm Chaise", price: 10192 }],
    desc: "A modular sofa that scales from a 110cm two-seater to a 320cm run with a chaise, so it fits the room you have now and the one you move to later. Several colourways.",
    features: [
      "Modular, from 110cm to 320cm",
      "Chaise configurations available",
      "Several colourways",
      "Rearrange as your room changes"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "52", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf03", name: "Low-Line Linen Lounge Sofa", cat: "Living Room", room: "Living Room", price: 1313, memberPrice: 1182, sku: "SH-10207", tag: "New", ph: "", img: "assets/products/sf03.webp",
    imgs: ["assets/products/sf03.webp", "assets/products/sf03-2.webp", "assets/products/sf03-3.webp", "assets/products/sf03-4.webp", "assets/products/sf03-5.webp"],
    sizes: [{ label: "45cm", price: 1313 }, { label: "50cm", price: 1330 }, { label: "55cm", price: 1439 }, { label: "60cm", price: 1470 }, { label: "120cm", price: 2033 }, { label: "Single Seater", price: 2467 }, { label: "Double Seater", price: 3063 }],
    desc: "A low, lounging sofa in linen with feather-filled cushions, the sort you sink into rather than perch on. Single and double modules plus small widths for a reading corner.",
    features: [
      "Linen upholstery with feather-filled cushions",
      "Low, relaxed seat height",
      "Single and double seater modules",
      "Small widths suit a reading nook"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Linen", "Options": "7", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head and blot spills at once. Linen softens and creases with use, which is part of its character. Keep out of harsh direct sun." },

  { id: "sf04", name: "Square-Stitched L-Shape Sofa", cat: "Living Room", room: "Living Room", price: 2030, memberPrice: 1827, sku: "SH-10208", tag: "New", ph: "", img: "assets/products/sf04.webp",
    imgs: ["assets/products/sf04.webp", "assets/products/sf04-2.webp", "assets/products/sf04-3.webp", "assets/products/sf04-4.webp", "assets/products/sf04-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 2030 }, { label: "Single Armchair", price: 3877 }, { label: "3 Seater", price: 12306 }, { label: "L-Shape", price: 13146 }],
    desc: "Clean square stitching across generous cushions, in a three seater or an L-shape that turns a corner properly. Armchair and footstool to match.",
    features: [
      "Square-stitched cushion detail",
      "Three seater or L-shape",
      "Matching armchair and footstool",
      "Clean contemporary lines"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf05", name: "Velvet Sofa Collection", cat: "Living Room", room: "Living Room", price: 2086, memberPrice: 1877, sku: "SH-10209", tag: "New", ph: "", img: "assets/products/sf05.webp",
    imgs: ["assets/products/sf05.webp", "assets/products/sf05-2.webp", "assets/products/sf05-3.webp", "assets/products/sf05-4.webp", "assets/products/sf05-5.webp"],
    sizes: [{ label: "Chair / Green", price: 2086 }, { label: "Chair / Red", price: 2086 }, { label: "Chair / Ivory", price: 2086 }, { label: "Ottoman / Green", price: 3262 }, { label: "Ottoman / Red", price: 3262 }, { label: "Ottoman / Ivory", price: 3262 }, { label: "110cm / Green", price: 4340 }, { label: "110cm / Red", price: 4340 }, { label: "110cm / Ivory", price: 4340 }, { label: "170cm / Green", price: 7868 }, { label: "170cm / Red", price: 7868 }, { label: "170cm / Ivory", price: 7868 }, { label: "215cm / Green", price: 9268 }, { label: "215cm / Red", price: 9268 }, { label: "215cm / Ivory", price: 9268 }, { label: "280cm / Green", price: 11116 }, { label: "280cm / Red", price: 11116 }, { label: "280cm / Ivory", price: 11116 }],
    desc: "Velvet over high-density foam, in green, red or ivory, at widths from 110cm to 280cm. The colours are the point here: a velvet sofa is the piece a room gets built around.",
    features: [
      "Velvet upholstery over high-density foam",
      "Green, Red or Ivory",
      "Widths from 110cm to 280cm",
      "A statement piece for a living room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "18", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf06", name: "Modular Leather Sectional Sofa", cat: "Living Room", room: "Living Room", price: 2086, memberPrice: 1877, sku: "SH-10210", tag: "New", ph: "", img: "assets/products/sf06.webp",
    imgs: ["assets/products/sf06.webp", "assets/products/sf06-2.webp", "assets/products/sf06-3.webp", "assets/products/sf06-4.webp", "assets/products/sf06-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 2086 }, { label: "Single Seater", price: 5740 }, { label: "210cm", price: 10804 }, { label: "280cm", price: 14350 }, { label: "330cm", price: 16786 }],
    desc: "Leather on a timber frame in a modular sectional layout, from a single seater to 330cm. Minimalist enough to disappear into a room, substantial enough to last in it.",
    features: [
      "Leather upholstery on a timber frame",
      "Modular sectional layout",
      "Single seater through to 330cm",
      "Matching footstool available"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf07", name: "Velvet Sofa with Chaise", cat: "Living Room", room: "Living Room", price: 2162, memberPrice: 1946, sku: "SH-10211", tag: "New", ph: "", img: "assets/products/sf07.webp",
    imgs: ["assets/products/sf07.webp", "assets/products/sf07-2.webp", "assets/products/sf07-3.webp", "assets/products/sf07-4.webp", "assets/products/sf07-5.webp"],
    sizes: [{ label: "Foot Petal", price: 2162 }, { label: "Single Armchair", price: 4893 }, { label: "180cm", price: 10696 }, { label: "200cm", price: 11199 }, { label: "220cm", price: 11886 }, { label: "240cm", price: 13818 }, { label: "260cm", price: 14783 }, { label: "280cm", price: 15564 }, { label: "300cm", price: 15981 }, { label: "280cm + Chaise", price: 16964 }, { label: "300cm + Chaise", price: 17381 }, { label: "350cm + Chaise", price: 20184 }, { label: "380cm + Chaise", price: 21504 }],
    desc: "Velvet across a timber frame, in widths to 300cm with chaise versions for the end of a long room. The armchair matches if you want a pair.",
    features: [
      "Velvet over a solid timber frame",
      "Chaise configurations at 280cm and 300cm",
      "Matching single armchair",
      "Eight widths to choose from"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "13", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf08", name: "Curved Sofa in Black", cat: "Living Room", room: "Living Room", price: 2176, memberPrice: 1958, sku: "SH-10212", tag: "New", ph: "", img: "assets/products/sf08.webp",
    imgs: ["assets/products/sf08.webp", "assets/products/sf08-2.webp", "assets/products/sf08-3.webp", "assets/products/sf08-4.webp", "assets/products/sf08-5.webp"],
    sizes: [{ label: "Black / Foot Petal", price: 2176 }, { label: "Black / 120cm", price: 4535 }, { label: "Black / 190cm", price: 6513 }, { label: "Black / 220cm", price: 7529 }, { label: "Black / 250cm", price: 8487 }, { label: "Black / 280cm", price: 9071 }, { label: "Black / 310cm", price: 10522 }, { label: "Black / 340cm", price: 11287 }],
    desc: "A curved back that softens a square room, in black, at widths from 120cm right up to 310cm. The curve is what makes it feel designed rather than bought.",
    features: [
      "Curved back and arms",
      "Widths from 120cm to 310cm",
      "Black upholstery",
      "Softens a square or narrow room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf09", name: "Wide Chaise Sofa Collection", cat: "Living Room", room: "Living Room", price: 2176, memberPrice: 1958, sku: "SH-10213", tag: "New", ph: "", img: "assets/products/sf09.webp",
    imgs: ["assets/products/sf09.webp", "assets/products/sf09-2.webp", "assets/products/sf09-3.webp", "assets/products/sf09-4.webp", "assets/products/sf09-5.webp"],
    sizes: [{ label: "Foot Petal", price: 2176 }, { label: "120cm", price: 3594 }, { label: "220cm", price: 7675 }, { label: "240cm", price: 8382 }, { label: "260cm", price: 9279 }, { label: "280cm", price: 9782 }, { label: "300cm", price: 10286 }, { label: "300cm + 160cm Chaise", price: 13646 }, { label: "320cm + 160cm Chaise", price: 15120 }, { label: "340cm + 160cm Chaise", price: 15856 }, { label: "360cm + 160cm Chaise", price: 16498 }, { label: "380cm + 160cm Chaise", price: 17284 }, { label: "400cm + 160cm Chaise", price: 18178 }, { label: "420cm + 160cm Chaise", price: 18698 }],
    desc: "Very wide seating with chaise options up to 340cm plus a 160cm chaise, for the living room that doubles as the place everyone falls asleep.",
    features: [
      "Widths from 120cm to 340cm",
      "160cm chaise configurations",
      "Deep, wide seat",
      "Built for lounging, not perching"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "14", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf10", name: "Modular Sofa with Footstool", cat: "Living Room", room: "Living Room", price: 2239, memberPrice: 2015, sku: "SH-10214", tag: "New", ph: "", img: "assets/products/sf10.webp",
    imgs: ["assets/products/sf10.webp", "assets/products/sf10-2.webp", "assets/products/sf10-3.webp", "assets/products/sf10-4.webp", "assets/products/sf10-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 2239 }, { label: "120cm", price: 5250 }, { label: "180cm", price: 12250 }, { label: "200cm", price: 13566 }, { label: "220cm", price: 14938 }, { label: "240cm", price: 16352 }, { label: "260cm", price: 17681 }, { label: "280cm", price: 19250 }],
    desc: "Modular seating on a timber frame with high-density foam, from 120cm to 280cm, with a footstool that doubles as extra seating when people arrive.",
    features: [
      "Modular layout, 120cm to 280cm",
      "Timber frame with high-density foam",
      "Footstool doubles as seating",
      "Rearrange to suit the room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf11", name: "Velvet Modular Sofa", cat: "Living Room", room: "Living Room", price: 2310, memberPrice: 2079, sku: "SH-10215", tag: "New", ph: "", img: "assets/products/sf11.webp",
    imgs: ["assets/products/sf11.webp", "assets/products/sf11-2.webp", "assets/products/sf11-3.webp", "assets/products/sf11-4.webp", "assets/products/sf11-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 2310 }, { label: "Single Armchair", price: 4953 }, { label: "180cm", price: 12005 }, { label: "200cm", price: 13562 }, { label: "220cm", price: 14686 }, { label: "240cm", price: 15889 }, { label: "260cm", price: 17205 }, { label: "280cm", price: 18620 }, { label: "300cm", price: 20002 }, { label: "320cm", price: 21266 }],
    desc: "Velvet, modular, and available up to 320cm, so a big room gets filled without three separate purchases. Armchair and footstool complete it.",
    features: [
      "Velvet over a timber frame",
      "Modular, up to 320cm",
      "Matching armchair and footstool",
      "High-density foam seating"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "10", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf12", name: "Bouclé Fabric Sofa", cat: "Living Room", room: "Living Room", price: 2769, memberPrice: 2492, sku: "SH-10216", tag: "New", ph: "", img: "assets/products/sf12.webp",
    imgs: ["assets/products/sf12.webp", "assets/products/sf12-2.webp", "assets/products/sf12-3.webp", "assets/products/sf12-4.webp", "assets/products/sf12-5.webp"],
    sizes: [{ label: "White / 105cm", price: 2769 }, { label: "Grey / 105cm", price: 2769 }, { label: "Brown / 105cm", price: 2769 }, { label: "Green / 105cm", price: 2769 }, { label: "White / 155cm", price: 6891 }, { label: "Grey / 155cm", price: 6891 }, { label: "Brown / 155cm", price: 6891 }, { label: "Green / 155cm", price: 6891 }, { label: "White / 200cm", price: 9954 }, { label: "Grey / 200cm", price: 9954 }, { label: "Brown / 200cm", price: 9954 }, { label: "Green / 200cm", price: 9954 }, { label: "White / 240cm", price: 11605 }, { label: "Grey / 240cm", price: 11605 }, { label: "Brown / 240cm", price: 11605 }, { label: "Green / 240cm", price: 11605 }],
    desc: "Soft bouclé in white or grey, at 105cm through to 240cm. The texture does the work: no pattern, no trim, just a quiet, tactile surface.",
    features: [
      "Soft bouclé upholstery",
      "White or Grey",
      "Widths from 105cm to 240cm",
      "Texture rather than pattern"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "16", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf13", name: "Compact Three-Size Sofa", cat: "Living Room", room: "Living Room", price: 2782, memberPrice: 2504, sku: "SH-10217", tag: "New", ph: "", img: "assets/products/sf13.webp",
    imgs: ["assets/products/sf13.webp", "assets/products/sf13-2.webp", "assets/products/sf13-3.webp", "assets/products/sf13-4.webp", "assets/products/sf13-5.webp"],
    sizes: [{ label: "110cm", price: 2782 }, { label: "160cm", price: 4543 }, { label: "190cm", price: 6114 }],
    desc: "A straightforward sofa in three sensible sizes, on a timber frame with high-density foam. For the room that needs a good sofa, not a statement.",
    features: [
      "Timber frame with high-density foam",
      "110cm, 160cm and 190cm",
      "Simple contemporary shape",
      "Hard-wearing everyday upholstery"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf14", name: "Low Lounger Modular Sofa", cat: "Living Room", room: "Living Room", price: 2782, memberPrice: 2504, sku: "SH-10218", tag: "New", ph: "", img: "assets/products/sf14.webp",
    imgs: ["assets/products/sf14.webp", "assets/products/sf14-2.webp", "assets/products/sf14-3.webp", "assets/products/sf14-4.webp", "assets/products/sf14-5.webp"],
    sizes: [{ label: "Off White / Single Seater Module", price: 2782 }, { label: "Off White / Double Seater Module", price: 4038 }, { label: "Off White / Corner Module", price: 4724 }],
    desc: "Low modules in off white that you arrange yourself: single, double and corner pieces, for a lounge that sits closer to the floor.",
    features: [
      "Single, double and corner modules",
      "Low lounging height",
      "Off white upholstery",
      "Arrange and rearrange at will"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf15", name: "Real Leather Sofa with Footstool", cat: "Living Room", room: "Living Room", price: 2782, memberPrice: 2504, sku: "SH-10219", tag: "New", ph: "", img: "assets/products/sf15.webp",
    imgs: ["assets/products/sf15.webp", "assets/products/sf15-2.webp", "assets/products/sf15-3.webp", "assets/products/sf15-4.webp", "assets/products/sf15-5.webp"],
    sizes: [{ label: "100cm (foot petal) / Black", price: 2782 }, { label: "100cm (foot petal) / Olive", price: 2782 }, { label: "100cm (foot petal) / Ocean Green", price: 2782 }, { label: "100cm (foot petal) / Beige", price: 2782 }, { label: "100cm (foot petal) / Burgundy", price: 2782 }, { label: "260cm / Black", price: 12309 }, { label: "260cm / Olive", price: 12309 }, { label: "260cm / Ocean Green", price: 12309 }, { label: "260cm / Beige", price: 12309 }, { label: "260cm / Burgundy", price: 12309 }, { label: "300cm / Black", price: 14417 }, { label: "300cm / Olive", price: 14417 }, { label: "300cm / Ocean Green", price: 14417 }, { label: "300cm / Beige", price: 14417 }, { label: "300cm / Burgundy", price: 14417 }, { label: "335cm / Black", price: 16520 }, { label: "335cm / Olive", price: 16520 }, { label: "335cm / Ocean Green", price: 16520 }, { label: "335cm / Beige", price: 16520 }, { label: "335cm / Burgundy", price: 16520 }, { label: "365cm / Black", price: 18640 }, { label: "365cm / Olive", price: 18640 }, { label: "365cm / Ocean Green", price: 18640 }, { label: "365cm / Beige", price: 18640 }, { label: "365cm / Burgundy", price: 18640 }],
    desc: "Real leather in black, olive and ocean green, from a 100cm footstool up to full-length seating. Leather that will look better in five years than it does today.",
    features: [
      "Genuine leather upholstery",
      "Black, Olive and Ocean Green",
      "Footstool through to full-length seating",
      "Ages into a softer patina"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "25", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf16", name: "Down-Filled Modular Sectional", cat: "Living Room", room: "Living Room", price: 2794, memberPrice: 2515, sku: "SH-10220", tag: "New", ph: "", img: "assets/products/sf16.webp",
    imgs: ["assets/products/sf16.webp", "assets/products/sf16-2.webp", "assets/products/sf16-3.webp", "assets/products/sf16-4.webp", "assets/products/sf16-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 2794 }, { label: "120cm", price: 5316 }, { label: "270cm", price: 14570 }, { label: "300cm", price: 16502 }, { label: "282cm + 150cm Chaise", price: 17370 }, { label: "330cm", price: 18530 }, { label: "360cm", price: 20560 }, { label: "310cm + 150cm Chaise", price: 21330 }, { label: "338cm + 150cm Chaise", price: 22550 }, { label: "360cm + 150cm Chaise", price: 23360 }],
    desc: "Down-filled cushions on a modular sectional, up to 360cm with a 150cm chaise. Soft enough that people stop sitting and start lying down.",
    features: [
      "Down-filled cushions",
      "Modular sectional up to 360cm",
      "150cm chaise configurations",
      "Deep, cloud-like seat"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "10", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf17", name: "Premium Velvet Chaise Sofa", cat: "Living Room", room: "Living Room", price: 3066, memberPrice: 2759, sku: "SH-10221", tag: "New", ph: "", img: "assets/products/sf17.webp",
    imgs: ["assets/products/sf17.webp", "assets/products/sf17-2.webp", "assets/products/sf17-3.webp", "assets/products/sf17-4.webp", "assets/products/sf17-5.webp"],
    sizes: [{ label: "Foot Petal", price: 3066 }, { label: "Single Arcmchair", price: 4199 }, { label: "200cm", price: 8743 }, { label: "220cm", price: 9660 }, { label: "240cm", price: 10384 }, { label: "260cm", price: 11186 }, { label: "280cm + Chaise", price: 14980 }, { label: "300cm + Chaise", price: 16239 }, { label: "320cm + Chaise", price: 16772 }],
    desc: "Premium velvet on a timber frame, in widths to 320cm with chaise versions. The armchair and footstool match for a full setting.",
    features: [
      "Premium velvet upholstery",
      "Chaise versions from 280cm",
      "Matching armchair and footstool",
      "High-density foam seating"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "9", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf18", name: "Two-Tone Cotton Sofa Collection", cat: "Living Room", room: "Living Room", price: 3144, memberPrice: 2830, sku: "SH-10222", tag: "New", ph: "", img: "assets/products/sf18.webp",
    imgs: ["assets/products/sf18.webp", "assets/products/sf18-2.webp", "assets/products/sf18-3.webp", "assets/products/sf18-4.webp", "assets/products/sf18-5.webp"],
    sizes: [{ label: "Dusty Grey + Ivory / Foot Petal", price: 3144 }, { label: "Dusty Grey + Ivory / 120cm", price: 3886 }, { label: "Dusty Grey + Ivory / 180cm", price: 6387 }, { label: "Dusty Grey + Ivory / 285cm", price: 12125 }, { label: "Dusty Grey + Ivory / 360cm", price: 18512 }, { label: "Dusty Grey + Ivory / 285cm + 180cm Chaise", price: 19345 }, { label: "Dusty Grey + Ivory / 360cm + 180cm Chaise", price: 19716 }, { label: "Dusty Grey + Ivory / 435cm + 180cm Chaise", price: 24714 }],
    desc: "Dusty grey paired with ivory, in cotton, from 120cm to 285cm. The two-tone treatment stops a large sofa reading as a single heavy block.",
    features: [
      "Two-tone dusty grey and ivory",
      "Cotton upholstery",
      "Widths from 120cm to 285cm",
      "Breaks up the bulk of a large sofa"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf19", name: "Floating Ash Timber & Leather Sofa", cat: "Living Room", room: "Living Room", price: 3300, memberPrice: 2970, sku: "SH-10223", tag: "New", ph: "", img: "assets/products/sf19.webp",
    imgs: ["assets/products/sf19.webp", "assets/products/sf19-2.webp", "assets/products/sf19-3.webp", "assets/products/sf19-4.webp", "assets/products/sf19-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 3300 }, { label: "Singe Armchair", price: 5299 }, { label: "230cm", price: 14700 }, { label: "260cm", price: 15732 }, { label: "290cm", price: 17065 }, { label: "320cm", price: 18199 }],
    desc: "Leather seating that appears to float on a premium ash timber base, in widths to 320cm. The detail is in the gap between frame and cushion.",
    features: [
      "Premium ash timber base",
      "Leather upholstery",
      "Floating silhouette",
      "Widths from 230cm to 320cm"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "6", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf20", name: "Sculptural Curved Sofa", cat: "Living Room", room: "Living Room", price: 3332, memberPrice: 2999, sku: "SH-10224", tag: "New", ph: "", img: "assets/products/sf20.webp",
    imgs: ["assets/products/sf20.webp", "assets/products/sf20-2.webp", "assets/products/sf20-3.webp", "assets/products/sf20-4.webp", "assets/products/sf20-5.webp"],
    sizes: [{ label: "90cm", price: 3332 }, { label: "210cm", price: 7252 }, { label: "240cm", price: 9212 }],
    desc: "A curved, sculptural shape in three sizes, from a 90cm loveseat to a 240cm three seater. Looks considered from every angle, which matters in an open-plan room.",
    features: [
      "Curved, sculptural silhouette",
      "90cm, 210cm and 240cm",
      "Works in the middle of an open-plan room",
      "Contemporary upholstery"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf21", name: "Wide-Cushion Velvet Sofa", cat: "Living Room", room: "Living Room", price: 3384, memberPrice: 3046, sku: "SH-10225", tag: "New", ph: "", img: "assets/products/sf21.webp",
    imgs: ["assets/products/sf21.webp", "assets/products/sf21-2.webp", "assets/products/sf21-3.webp", "assets/products/sf21-4.webp", "assets/products/sf21-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 3384 }, { label: "170cm", price: 10286 }, { label: "190cm", price: 11045 }, { label: "220cm", price: 11647 }, { label: "250cm", price: 12767 }, { label: "280cm", price: 13878 }, { label: "310cm", price: 14629 }, { label: "340cm", price: 15609 }],
    desc: "Luxuriously wide cushions in velvet, from 170cm to 340cm. Fewer, bigger cushions means fewer seams and a cleaner line.",
    features: [
      "Extra-wide velvet cushions",
      "Widths from 170cm to 340cm",
      "Matching footstool",
      "Clean, uninterrupted seat line"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf22", name: "Colour-Block Sofa Collection", cat: "Living Room", room: "Living Room", price: 3417, memberPrice: 3075, sku: "SH-10226", tag: "New", ph: "", img: "assets/products/sf22.webp",
    imgs: ["assets/products/sf22.webp", "assets/products/sf22-2.webp", "assets/products/sf22-3.webp", "assets/products/sf22-4.webp", "assets/products/sf22-5.webp"],
    sizes: [{ label: "Single Seater / Yellow", price: 3417 }, { label: "Single Seater / White", price: 3417 }, { label: "160cm / Yellow", price: 6675 }, { label: "160cm / White", price: 6675 }, { label: "200cm / Yellow", price: 8189 }, { label: "200cm / White", price: 8189 }, { label: "230cm / Yellow", price: 9625 }, { label: "230cm / White", price: 9625 }],
    desc: "An unusual shape in yellow or white, from a single seater to 200cm. For a room that wants some personality rather than another beige three seater.",
    features: [
      "Distinctive contemporary shape",
      "Yellow or White",
      "Single seater to 200cm",
      "A colour-led statement piece"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf23", name: "Modular Leather & Ash Sofa", cat: "Living Room", room: "Living Room", price: 3486, memberPrice: 3137, sku: "SH-10227", tag: "New", ph: "", img: "assets/products/sf23.webp",
    imgs: ["assets/products/sf23.webp", "assets/products/sf23-2.webp", "assets/products/sf23-3.webp", "assets/products/sf23-4.webp", "assets/products/sf23-5.webp"],
    sizes: [{ label: "Foot Pedal", price: 3486 }, { label: "Single Armchair", price: 5459 }, { label: "210cm", price: 12596 }, { label: "280cm", price: 16177 }, { label: "360cm", price: 18900 }],
    desc: "Leather modules on an ash timber frame, up to 360cm, arranged how you like. Armchair and footstool available separately.",
    features: [
      "Leather over ash timber",
      "Modular layout to 360cm",
      "Armchair and footstool sold separately",
      "Clean modern proportions"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf24", name: "Leather Sofa in Four Colours", cat: "Living Room", room: "Living Room", price: 3590, memberPrice: 3231, sku: "SH-10228", tag: "New", ph: "", img: "assets/products/sf24.webp",
    imgs: ["assets/products/sf24.webp", "assets/products/sf24-2.webp", "assets/products/sf24-3.webp", "assets/products/sf24-4.webp", "assets/products/sf24-5.webp"],
    sizes: [{ label: "Foot Pedal / Green", price: 3590 }, { label: "Foot Pedal / Beige", price: 3590 }, { label: "Foot Pedal / Navy", price: 3590 }, { label: "Foot Pedal / Grey", price: 3590 }, { label: "145cm / Green", price: 9163 }, { label: "145cm / Beige", price: 9163 }, { label: "145cm / Navy", price: 9163 }, { label: "145cm / Grey", price: 9163 }, { label: "215cm / Green", price: 10601 }, { label: "215cm / Beige", price: 10601 }, { label: "215cm / Navy", price: 10601 }, { label: "215cm / Grey", price: 10601 }, { label: "260cm / Green", price: 14644 }, { label: "260cm / Beige", price: 14644 }, { label: "260cm / Navy", price: 14644 }, { label: "260cm / Grey", price: 14644 }, { label: "300cm / Green", price: 18507 }, { label: "300cm / Beige", price: 18507 }, { label: "300cm / Navy", price: 18507 }, { label: "300cm / Grey", price: 18507 }, { label: "310cm + 190cm Chaise / Green", price: 22707 }, { label: "310cm + 190cm Chaise / Beige", price: 22707 }, { label: "310cm + 190cm Chaise / Navy", price: 22707 }, { label: "310cm + 190cm Chaise / Grey", price: 22707 }],
    desc: "Leather in green, beige, navy or grey, at 145cm, 215cm or 260cm. The colour range is wider than most leather sofas offer.",
    features: [
      "Genuine leather upholstery",
      "Green, Beige, Navy or Grey",
      "145cm, 215cm and 260cm",
      "Timeless shape"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "24", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf25", name: "Italian-Style Leather Sectional", cat: "Living Room", room: "Living Room", price: 3657, memberPrice: 3291, sku: "SH-10229", tag: "New", ph: "", img: "assets/products/sf25.webp",
    imgs: ["assets/products/sf25.webp", "assets/products/sf25-2.webp", "assets/products/sf25-3.webp", "assets/products/sf25-4.webp", "assets/products/sf25-5.webp"],
    sizes: [{ label: "Charcoal Grey / 105cm", price: 3657 }, { label: "Green / 105cm", price: 3657 }, { label: "Tan/Orange / 105cm", price: 3657 }, { label: "Charcoal Grey / 165cm", price: 6549 }, { label: "Green / 165cm", price: 6549 }, { label: "Tan/Orange / 165cm", price: 6549 }, { label: "Charcoal Grey / 215cm", price: 7896 }, { label: "Green / 215cm", price: 7896 }, { label: "Tan/Orange / 215cm", price: 7896 }, { label: "Charcoal Grey / 280cm", price: 11535 }, { label: "Green / 280cm", price: 11535 }, { label: "Tan/Orange / 280cm", price: 11535 }, { label: "Charcoal Grey / 250cm + Chaise", price: 16993 }, { label: "Green / 250cm + Chaise", price: 16993 }, { label: "Tan/Orange / 250cm + Chaise", price: 16993 }],
    desc: "A sectional in charcoal grey or grey leather, from 105cm to 280cm, with the restrained lines of Italian design.",
    features: [
      "Leather sectional",
      "Charcoal Grey or Grey",
      "Widths from 105cm to 280cm",
      "Restrained, tailored lines"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "15", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf26", name: "Bouclé Sofa with Footstool", cat: "Living Room", room: "Living Room", price: 3801, memberPrice: 3421, sku: "SH-10230", tag: "New", ph: "", img: "assets/products/sf26.webp",
    imgs: ["assets/products/sf26.webp", "assets/products/sf26-2.webp", "assets/products/sf26-3.webp", "assets/products/sf26-4.webp", "assets/products/sf26-5.webp"],
    sizes: [{ label: "90cm x 60cm", price: 3801 }, { label: "90cm x 90cm", price: 3854 }, { label: "90cm x 90cm + Right Armrest", price: 4241 }, { label: "90cm x 90cm + Left Armrest", price: 4241 }, { label: "90cm x 90cm + Backrest", price: 4241 }, { label: "90cm x 60cm + Backrest", price: 4241 }, { label: "180cm", price: 8480 }, { label: "180cm + Foot Pedal", price: 12422 }, { label: "240cm", price: 12422 }, { label: "240cm + Foot Pedal", price: 15382 }, { label: "270cm + Foot Pedal", price: 16345 }],
    desc: "Bouclé on a timber frame, at 180cm, 240cm or 270cm, with or without the matching footstool. There is also a 90 by 90cm corner piece.",
    features: [
      "Bouclé over a timber frame",
      "180cm, 240cm and 270cm",
      "With or without footstool",
      "90 x 90cm corner module available"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "11", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf27", name: "Curved Leather Sofa", cat: "Living Room", room: "Living Room", price: 3833, memberPrice: 3450, sku: "SH-10231", tag: "New", ph: "", img: "assets/products/sf27.webp",
    imgs: ["assets/products/sf27.webp", "assets/products/sf27-2.webp", "assets/products/sf27-3.webp", "assets/products/sf27-4.webp", "assets/products/sf27-5.webp"],
    sizes: [{ label: "Single Seater", price: 3833 }, { label: "150cm", price: 9034 }, { label: "170cm", price: 9656 }, { label: "200cm", price: 10171 }, { label: "230cm", price: 10773 }],
    desc: "Leather with a curved back on a timber frame, from a single seater to 230cm. High-density foam keeps the curve from collapsing over time.",
    features: [
      "Curved back in genuine leather",
      "Timber frame, high-density foam",
      "Single seater to 230cm",
      "Holds its shape with use"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf28", name: "Classic Leather Sofa", cat: "Living Room", room: "Living Room", price: 4616, memberPrice: 4154, sku: "SH-10232", tag: "New", ph: "", img: "assets/products/sf28.webp",
    imgs: ["assets/products/sf28.webp", "assets/products/sf28-2.webp", "assets/products/sf28-3.webp", "assets/products/sf28-4.webp", "assets/products/sf28-5.webp"],
    sizes: [{ label: "86cm", price: 4616 }, { label: "136cm", price: 7965 }, { label: "186cm", price: 12922 }, { label: "235cm", price: 15816 }],
    desc: "A classic leather sofa in four sizes, from an 86cm chair to a 235cm three seater, on a timber frame.",
    features: [
      "Genuine leather over timber",
      "86cm, 136cm, 186cm and 235cm",
      "High-density foam seating",
      "Classic, uncomplicated shape"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf29", name: "Curved Velvet Modular Sofa", cat: "Living Room", room: "Living Room", price: 4882, memberPrice: 4394, sku: "SH-10233", tag: "New", ph: "", img: "assets/products/sf29.webp",
    imgs: ["assets/products/sf29.webp", "assets/products/sf29-2.webp", "assets/products/sf29-3.webp", "assets/products/sf29-4.webp", "assets/products/sf29-5.webp"],
    sizes: [{ label: "Occasional Chair", price: 4882 }, { label: "Single Armchair", price: 5530 }, { label: "160cm", price: 13831 }, { label: "170cm", price: 15386 }, { label: "180cm", price: 15743 }, { label: "210cm", price: 16660 }, { label: "220xcm", price: 16981 }, { label: "240cm", price: 18032 }, { label: "260cm", price: 18900 }, { label: "280cm", price: 20296 }, { label: "320cm", price: 21938 }],
    desc: "Velvet, curved and modular, in widths from 160cm to 320cm, with an armchair and an occasional chair that match. The widest choice of sizes we carry.",
    features: [
      "Curved velvet modules",
      "Eleven widths, 160cm to 320cm",
      "Matching armchair and occasional chair",
      "Timber frame"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "11", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf30", name: "Velvet & Linen Sofa", cat: "Living Room", room: "Living Room", price: 5082, memberPrice: 4574, sku: "SH-10234", tag: "New", ph: "", img: "assets/products/sf30.webp",
    imgs: ["assets/products/sf30.webp", "assets/products/sf30-2.webp", "assets/products/sf30-3.webp", "assets/products/sf30-4.webp", "assets/products/sf30-5.webp"],
    sizes: [{ label: "120cm", price: 5082 }, { label: "180cm", price: 8847 }, { label: "210cm", price: 11448 }, { label: "260cm", price: 15245 }],
    desc: "Velvet and linen together on a timber frame, in four sizes. Two textures in one piece, which stops a big sofa looking flat.",
    features: [
      "Velvet and linen upholstery",
      "Timber frame",
      "120cm, 180cm, 210cm and 260cm",
      "Two textures in one piece"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf31", name: "Leather Sofa & Armchair", cat: "Living Room", room: "Living Room", price: 5246, memberPrice: 4721, sku: "SH-10235", tag: "New", ph: "", img: "assets/products/sf31.webp",
    imgs: ["assets/products/sf31.webp", "assets/products/sf31-2.webp", "assets/products/sf31-3.webp", "assets/products/sf31-4.webp", "assets/products/sf31-5.webp"],
    sizes: [{ label: "Chair", price: 5246 }, { label: "160cm", price: 11365 }, { label: "200cm", price: 14860 }, { label: "240cm", price: 16593 }, { label: "280cm", price: 18872 }],
    desc: "Leather on a timber frame, from a single chair to 280cm, with high-density foam that holds its shape.",
    features: [
      "Genuine leather over timber",
      "Chair through to 280cm",
      "High-density foam",
      "Matching chair and sofa"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "5", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf32", name: "Everyday Fabric Sofa", cat: "Living Room", room: "Living Room", price: 5572, memberPrice: 5015, sku: "SH-10236", tag: "New", ph: "", img: "assets/products/sf32.webp",
    imgs: ["assets/products/sf32.webp", "assets/products/sf32-2.webp", "assets/products/sf32-3.webp", "assets/products/sf32-4.webp", "assets/products/sf32-5.webp"],
    sizes: [{ label: "80cm", price: 5572 }, { label: "210cm", price: 10052 }, { label: "240cm", price: 12572 }],
    desc: "A plain, well-made fabric sofa in three sizes, including an 80cm chair. The sensible choice for a first home or a second living room.",
    features: [
      "Hard-wearing fabric upholstery",
      "80cm, 210cm and 240cm",
      "Simple contemporary shape",
      "Suits a first home or rental"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf33", name: "Curved Lounge Sofa in Six Colours", cat: "Living Room", room: "Living Room", price: 5585, memberPrice: 5026, sku: "SH-10237", tag: "New", ph: "", img: "assets/products/sf33.webp",
    imgs: ["assets/products/sf33.webp", "assets/products/sf33-2.webp", "assets/products/sf33-3.webp", "assets/products/sf33-4.webp", "assets/products/sf33-5.webp"],
    sizes: [{ label: "Brown / 150cm", price: 5585 }, { label: "Green / 150cm", price: 5585 }, { label: "Pink / 150cm", price: 5585 }, { label: "White / 150cm", price: 5585 }, { label: "Brown / 200cm", price: 6968 }, { label: "Green / 200cm", price: 6968 }, { label: "Pink / 200cm", price: 6968 }, { label: "White / 200cm", price: 6968 }],
    desc: "A curved lounge sofa on a timber frame, in brown, green, pink, white and more, at 150cm or 200cm. The colour choice is unusually broad.",
    features: [
      "Curved lounge shape",
      "Six colourways",
      "150cm or 200cm",
      "Timber frame"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf34", name: "Tan Leather Sofa", cat: "Living Room", room: "Living Room", price: 6313, memberPrice: 5682, sku: "SH-10238", tag: "New", ph: "", img: "assets/products/sf34.webp",
    imgs: ["assets/products/sf34.webp", "assets/products/sf34-2.webp", "assets/products/sf34-3.webp", "assets/products/sf34-4.webp", "assets/products/sf34-5.webp"],
    sizes: [{ label: "130cm / Tan", price: 6313 }, { label: "190cm / Tan", price: 9829 }, { label: "272cm / Tan", price: 12467 }, { label: "298cm / Tan", price: 13611 }, { label: "326cm / Tan", price: 14227 }, { label: "253cm / Tan", price: 15632 }, { label: "353cm / Tan", price: 15632 }],
    desc: "Tan leather on timber, in seven widths from 130cm to 353cm. Tan is the leather that warms a room rather than darkening it.",
    features: [
      "Tan leather over a timber frame",
      "Seven widths, 130cm to 353cm",
      "Warm, light leather tone",
      "Ages beautifully"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "7", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf35", name: "Leather Sofa with Long Chaise", cat: "Living Room", room: "Living Room", price: 6395, memberPrice: 5756, sku: "SH-10239", tag: "New", ph: "", img: "assets/products/sf35.webp",
    imgs: ["assets/products/sf35.webp", "assets/products/sf35-2.webp", "assets/products/sf35-3.webp", "assets/products/sf35-4.webp", "assets/products/sf35-5.webp"],
    sizes: [{ label: "190cm", price: 6395 }, { label: "260cm", price: 8196 }, { label: "260cm + 165cm Chaise", price: 9993 }, { label: "330cm", price: 10892 }, { label: "330cm + 165cm Chaise", price: 11990 }, { label: "400cm + 165cm Chaise", price: 13334 }],
    desc: "Leather seating with a 165cm chaise, in overall lengths to 400cm. For the room with a long wall and nothing on it.",
    features: [
      "Genuine leather upholstery",
      "165cm chaise configurations",
      "Lengths to 400cm",
      "Built for a large living room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "6", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf36", name: "Full-Grain Look Leather Sofa", cat: "Living Room", room: "Living Room", price: 6955, memberPrice: 6260, sku: "SH-10240", tag: "New", ph: "", img: "assets/products/sf36.webp",
    imgs: ["assets/products/sf36.webp", "assets/products/sf36-2.webp", "assets/products/sf36-3.webp", "assets/products/sf36-4.webp", "assets/products/sf36-5.webp"],
    sizes: [{ label: "120cm / Tan", price: 6955 }, { label: "120cm / Black", price: 6955 }, { label: "120cm / Light Grey", price: 6955 }, { label: "120cm / Grey", price: 6955 }, { label: "120cm / Charcoal Grey", price: 6955 }, { label: "120cm / Chocolate", price: 6955 }, { label: "180cm / Tan", price: 9534 }, { label: "180cm / Black", price: 9534 }, { label: "180cm / Light Grey", price: 9534 }, { label: "180cm / Grey", price: 9534 }, { label: "180cm / Charcoal Grey", price: 9534 }, { label: "180cm / Chocolate", price: 9534 }, { label: "200cm / Tan", price: 10226 }, { label: "200cm / Black", price: 10226 }, { label: "200cm / Light Grey", price: 10226 }, { label: "200cm / Grey", price: 10226 }, { label: "200cm / Charcoal Grey", price: 10226 }, { label: "200cm / Chocolate", price: 10226 }, { label: "220cm / Tan", price: 12292 }, { label: "220cm / Black", price: 12292 }, { label: "220cm / Light Grey", price: 12292 }, { label: "220cm / Grey", price: 12292 }, { label: "220cm / Charcoal Grey", price: 12292 }, { label: "220cm / Chocolate", price: 12292 }, { label: "240cm / Tan", price: 14070 }, { label: "240cm / Black", price: 14070 }, { label: "240cm / Light Grey", price: 14070 }, { label: "240cm / Grey", price: 14070 }, { label: "240cm / Charcoal Grey", price: 14070 }, { label: "240cm / Chocolate", price: 14070 }, { label: "260cm / Tan", price: 15448 }, { label: "260cm / Black", price: 15448 }, { label: "260cm / Light Grey", price: 15448 }, { label: "260cm / Grey", price: 15448 }, { label: "260cm / Charcoal Grey", price: 15448 }, { label: "260cm / Chocolate", price: 15448 }, { label: "280cm / Tan", price: 17228 }, { label: "280cm / Black", price: 17228 }, { label: "280cm / Light Grey", price: 17228 }, { label: "280cm / Grey", price: 17228 }, { label: "280cm / Charcoal Grey", price: 17228 }, { label: "280cm / Chocolate", price: 17228 }],
    desc: "Tan leather in eight widths from 120cm to 280cm, so it fits a snug or a formal lounge equally.",
    features: [
      "Leather upholstery",
      "Eight widths, 120cm to 280cm",
      "Tan colourway",
      "Suits snug or formal rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "42", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf37", name: "Velvet Sofa in Five Sizes", cat: "Living Room", room: "Living Room", price: 7766, memberPrice: 6989, sku: "SH-10241", tag: "New", ph: "", img: "assets/products/sf37.webp",
    imgs: ["assets/products/sf37.webp", "assets/products/sf37-2.webp", "assets/products/sf37-3.webp", "assets/products/sf37-4.webp", "assets/products/sf37-5.webp"],
    sizes: [{ label: "White / 210cm", price: 7766 }, { label: "Green / 210cm", price: 7766 }, { label: "Black / 210cm", price: 7766 }, { label: "White / 240cm", price: 8364 }, { label: "Green / 240cm", price: 8364 }, { label: "Black / 240cm", price: 8364 }, { label: "White / 270cm", price: 9176 }, { label: "Green / 270cm", price: 9176 }, { label: "Black / 270cm", price: 9176 }, { label: "White / 300cm", price: 10158 }, { label: "Green / 300cm", price: 10158 }, { label: "Black / 300cm", price: 10158 }, { label: "White / 330cm", price: 10734 }, { label: "Green / 330cm", price: 10734 }, { label: "Black / 330cm", price: 10734 }],
    desc: "Velvet over high-density foam, in white or green, from 210cm to 330cm. Large sizes only, for rooms that can take them.",
    features: [
      "Velvet over high-density foam",
      "White or Green",
      "210cm to 330cm",
      "Generous proportions"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "15", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf38", name: "Sectional Sofa Modules", cat: "Living Room", room: "Living Room", price: 8159, memberPrice: 7343, sku: "SH-10242", tag: "New", ph: "", img: "assets/products/sf38.webp",
    imgs: ["assets/products/sf38.webp", "assets/products/sf38-2.webp", "assets/products/sf38-3.webp", "assets/products/sf38-4.webp", "assets/products/sf38-5.webp"],
    sizes: [{ label: "80cm", price: 8159 }, { label: "80cm (A)", price: 8159 }, { label: "120cm", price: 10496 }, { label: "120cm (A)", price: 10496 }, { label: "160cm", price: 12524 }, { label: "160cm (A)", price: 12524 }, { label: "200cm", price: 17186 }, { label: "200cm (A)", price: 17186 }],
    desc: "Buy the modules and build the shape: 80cm, 120cm, 160cm and 200cm pieces in two arrangements. The flexible answer to an awkward room.",
    features: [
      "Modules at 80, 120, 160 and 200cm",
      "Two arrangements of each",
      "Build the shape your room needs",
      "Add pieces later"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf39", name: "Oversized Beige Sofa", cat: "Living Room", room: "Living Room", price: 8289, memberPrice: 7460, sku: "SH-10243", tag: "New", ph: "", img: "assets/products/sf39.webp",
    imgs: ["assets/products/sf39.webp", "assets/products/sf39-2.webp", "assets/products/sf39-3.webp", "assets/products/sf39-4.webp", "assets/products/sf39-5.webp"],
    sizes: [{ label: "Beige / 240cm", price: 8289 }, { label: "Beige / 270cm", price: 9009 }, { label: "Beige / 300cm", price: 9796 }, { label: "Beige / 330cm", price: 10408 }, { label: "Beige / 360cm", price: 11528 }],
    desc: "Beige, and very large: 240cm to 360cm. A sofa for a room where a normal three seater would look lost.",
    features: [
      "Widths from 240cm to 360cm",
      "Beige upholstery",
      "Deep, generous seat",
      "For large open-plan rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "5", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf40", name: "Linen Sofa with Timber Frame", cat: "Living Room", room: "Living Room", price: 8382, memberPrice: 7544, sku: "SH-10244", tag: "New", ph: "", img: "assets/products/sf40.webp",
    imgs: ["assets/products/sf40.webp", "assets/products/sf40-2.webp", "assets/products/sf40-3.webp", "assets/products/sf40-4.webp", "assets/products/sf40-5.webp"],
    sizes: [{ label: "160cm", price: 8382 }, { label: "210cm", price: 11172 }, { label: "260cm", price: 13391 }],
    desc: "Linen over a timber frame with high-density foam, in three sizes. Linen creases, softens and looks better for it.",
    features: [
      "Linen upholstery",
      "Timber frame, high-density foam",
      "160cm, 210cm and 260cm",
      "Softens with use"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Linen", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head and blot spills at once. Linen softens and creases with use, which is part of its character. Keep out of harsh direct sun." },

  { id: "sf41", name: "Bouclé Sofa in Ten Sizes", cat: "Living Room", room: "Living Room", price: 8540, memberPrice: 7686, sku: "SH-10245", tag: "New", ph: "", img: "assets/products/sf41.webp",
    imgs: ["assets/products/sf41.webp", "assets/products/sf41-2.webp", "assets/products/sf41-3.webp", "assets/products/sf41-4.webp", "assets/products/sf41-5.webp"],
    sizes: [{ label: "120cm", price: 8540 }, { label: "180cm", price: 13688 }, { label: "220cm", price: 15680 }, { label: "240cm", price: 17107 }, { label: "260cm", price: 20061 }, { label: "280cm", price: 22245 }, { label: "300cm", price: 23380 }, { label: "330cm", price: 27439 }, { label: "360cm", price: 31416 }, { label: "390cm", price: 32199 }],
    desc: "Bouclé on a timber frame in ten widths from 120cm to 390cm, which is the broadest size range in the range.",
    features: [
      "Bouclé over a timber frame",
      "Ten widths, 120cm to 390cm",
      "High-density foam seating",
      "Fits almost any room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "10", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf42", name: "Large Leather Lounge Sofa", cat: "Living Room", room: "Living Room", price: 8574, memberPrice: 7717, sku: "SH-10246", tag: "New", ph: "", img: "assets/products/sf42.webp",
    imgs: ["assets/products/sf42.webp", "assets/products/sf42-2.webp", "assets/products/sf42-3.webp", "assets/products/sf42-4.webp", "assets/products/sf42-5.webp"],
    sizes: [{ label: "230cm", price: 8574 }, { label: "260cm", price: 10738 }, { label: "290cm", price: 11272 }, { label: "320cm", price: 13040 }],
    desc: "Leather on timber in four large sizes, 230cm to 320cm, for a lounge that seats everyone at once.",
    features: [
      "Leather over a timber frame",
      "230cm to 320cm",
      "Deep lounge seat",
      "Seats a full room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "4", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf43", name: "Curved Bouclé Sofa", cat: "Living Room", room: "Living Room", price: 9038, memberPrice: 8134, sku: "SH-10247", tag: "New", ph: "", img: "assets/products/sf43.webp",
    imgs: ["assets/products/sf43.webp", "assets/products/sf43-2.webp", "assets/products/sf43-3.webp", "assets/products/sf43-4.webp", "assets/products/sf43-5.webp"],
    sizes: [{ label: "170cm", price: 9038 }, { label: "210cm", price: 11089 }, { label: "240cm", price: 12597 }],
    desc: "A curved bouclé sofa in three sizes. The combination of curve and texture is what makes it feel expensive.",
    features: [
      "Curved silhouette in bouclé",
      "170cm, 210cm and 240cm",
      "Soft, tactile surface",
      "Works as a room divider in open-plan spaces"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf44", name: "Down-Filled Pull Sofa", cat: "Living Room", room: "Living Room", price: 9579, memberPrice: 8621, sku: "SH-10248", tag: "New", ph: "", img: "assets/products/sf44.webp",
    imgs: ["assets/products/sf44.webp", "assets/products/sf44-2.webp", "assets/products/sf44-3.webp", "assets/products/sf44-4.webp", "assets/products/sf44-5.webp"],
    sizes: [{ label: "125cm (Single Seater)", price: 9579 }, { label: "145cm", price: 10214 }, { label: "175cm", price: 11166 }, { label: "205cm", price: 12443 }, { label: "225cm", price: 15711 }, { label: "265cm", price: 18508 }, { label: "325cm", price: 22162 }, { label: "385cm", price: 24749 }],
    desc: "Down and cotton filling in widths from a 125cm single seater to 385cm. Soft rather than firm, and it shows: these cushions need plumping.",
    features: [
      "Down and cotton filling",
      "125cm single seater to 385cm",
      "Soft, relaxed seat",
      "Needs regular plumping, like all down"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf45", name: "Single-Armrest Chaise Sofa", cat: "Living Room", room: "Living Room", price: 10069, memberPrice: 9062, sku: "SH-10249", tag: "New", ph: "", img: "assets/products/sf45.webp",
    imgs: ["assets/products/sf45.webp", "assets/products/sf45-2.webp", "assets/products/sf45-3.webp", "assets/products/sf45-4.webp", "assets/products/sf45-5.webp"],
    sizes: [{ label: "300cm (Double Armrest)", price: 10069 }, { label: "280cm (Double Armrest)", price: 10606 }, { label: "300cm (Single Armrest)", price: 11094 }, { label: "320cm (Single Armrest)", price: 11595 }, { label: "320cm (Double Armrest)", price: 11595 }, { label: "340cm (Single Armrest)", price: 12132 }, { label: "365cm (Single Armrest)", price: 13121 }, { label: "405cm (Single Armrest)", price: 14269 }],
    desc: "A single-armrest design in leather and linen, from 300cm to 365cm, so one end stays open for stretching out.",
    features: [
      "Single armrest, open at one end",
      "Leather and linen upholstery",
      "300cm to 365cm",
      "Timber frame"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "8", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf46", name: "Four-Colour Fabric Sofa", cat: "Living Room", room: "Living Room", price: 10150, memberPrice: 9135, sku: "SH-10250", tag: "New", ph: "", img: "assets/products/sf46.webp",
    imgs: ["assets/products/sf46.webp", "assets/products/sf46-2.webp", "assets/products/sf46-3.webp", "assets/products/sf46-4.webp", "assets/products/sf46-5.webp"],
    sizes: [{ label: "260cm / Grey", price: 10150 }, { label: "260cm / Light Grey", price: 10150 }, { label: "260cm / Off White", price: 10150 }, { label: "260cm / Emerald Green", price: 10150 }, { label: "280cm / Grey", price: 11466 }, { label: "280cm / Light Grey", price: 11466 }, { label: "280cm / Off White", price: 11466 }, { label: "280cm / Emerald Green", price: 11466 }],
    desc: "Fabric at 260cm or 280cm, in grey, light grey, off white or emerald green. Emerald is the one worth being brave about.",
    features: [
      "Four colourways including emerald green",
      "260cm and 280cm",
      "Hard-wearing fabric",
      "Generous seat depth"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "8", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf47", name: "Two-Colour Lounge Sofa", cat: "Living Room", room: "Living Room", price: 10163, memberPrice: 9147, sku: "SH-10251", tag: "New", ph: "", img: "assets/products/sf47.webp",
    imgs: ["assets/products/sf47.webp", "assets/products/sf47-2.webp", "assets/products/sf47-3.webp", "assets/products/sf47-4.webp", "assets/products/sf47-5.webp"],
    sizes: [{ label: "220cm / White", price: 10163 }, { label: "220cm / Green", price: 10163 }, { label: "280cm / White", price: 11446 }, { label: "280cm / Green", price: 11446 }, { label: "320cm / White", price: 12559 }, { label: "320cm / Green", price: 12559 }],
    desc: "White or green, at 220cm, 280cm or 320cm. Large, simple and easy to live with.",
    features: [
      "White or Green",
      "220cm, 280cm and 320cm",
      "Simple contemporary lines",
      "Deep, comfortable seat"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf48", name: "Extended Leather Sofa", cat: "Living Room", room: "Living Room", price: 10500, memberPrice: 9450, sku: "SH-10252", tag: "New", ph: "", img: "assets/products/sf48.webp",
    imgs: ["assets/products/sf48.webp", "assets/products/sf48-2.webp", "assets/products/sf48-3.webp", "assets/products/sf48-4.webp", "assets/products/sf48-5.webp"],
    sizes: [{ label: "190cm", price: 10500 }, { label: "210cm", price: 11319 }, { label: "230cm", price: 12810 }, { label: "260cm", price: 14083 }, { label: "290cm", price: 15043 }, { label: "320cm", price: 16855 }, { label: "330cm", price: 17485 }, { label: "370cm", price: 18829 }, { label: "410cm", price: 20160 }],
    desc: "Leather on a timber frame in nine widths, 190cm all the way to 410cm. The longest sofa in the range.",
    features: [
      "Leather over a timber frame",
      "Nine widths, 190cm to 410cm",
      "High-density foam",
      "Suits very large rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "9", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf49", name: "Three-Colour Statement Sofa", cat: "Living Room", room: "Living Room", price: 10679, memberPrice: 9611, sku: "SH-10253", tag: "New", ph: "", img: "assets/products/sf49.webp",
    imgs: ["assets/products/sf49.webp", "assets/products/sf49-2.webp", "assets/products/sf49-3.webp", "assets/products/sf49-4.webp", "assets/products/sf49-5.webp"],
    sizes: [{ label: "Ivory / 280cm", price: 10679 }, { label: "Red / 280cm", price: 10679 }, { label: "Green / 280cm", price: 10679 }, { label: "Ivory / 320cm", price: 12232 }, { label: "Red / 320cm", price: 12232 }, { label: "Green / 320cm", price: 12232 }, { label: "Ivory / 350cm", price: 13784 }, { label: "Red / 350cm", price: 13784 }, { label: "Green / 350cm", price: 13784 }],
    desc: "Ivory, red or green, at 280cm to 350cm. Red is rarely offered at this size, and it transforms a room.",
    features: [
      "Ivory, Red or Green",
      "280cm, 320cm and 350cm",
      "Statement colour at scale",
      "Deep lounge seating"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "9", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf50", name: "Curved Sofa in Three Colours", cat: "Living Room", room: "Living Room", price: 11105, memberPrice: 9994, sku: "SH-10254", tag: "New", ph: "", img: "assets/products/sf50.webp",
    imgs: ["assets/products/sf50.webp", "assets/products/sf50-2.webp", "assets/products/sf50-3.webp", "assets/products/sf50-4.webp", "assets/products/sf50-5.webp"],
    sizes: [{ label: "Charcoal Grey / 200cm", price: 11105 }, { label: "Beige / 200cm", price: 11105 }, { label: "Peach / 200cm", price: 11105 }, { label: "Charcoal Grey / 300cm", price: 11983 }, { label: "Beige / 300cm", price: 11983 }, { label: "Peach / 300cm", price: 11983 }],
    desc: "A curved sofa in charcoal grey, beige or peach, at 200cm or 300cm. Peach is softer in a room than it sounds on paper.",
    features: [
      "Curved silhouette",
      "Charcoal Grey, Beige or Peach",
      "200cm or 300cm",
      "Softens a hard-edged room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf51", name: "Lambswool Sofa", cat: "Living Room", room: "Living Room", price: 11452, memberPrice: 10307, sku: "SH-10255", tag: "New", ph: "", img: "assets/products/sf51.webp",
    imgs: ["assets/products/sf51.webp", "assets/products/sf51-2.webp", "assets/products/sf51-3.webp", "assets/products/sf51-4.webp", "assets/products/sf51-5.webp"],
    sizes: [{ label: "180cm", price: 11452 }, { label: "210cm", price: 13552 }, { label: "260cm", price: 16954 }, { label: "280cm", price: 18182 }],
    desc: "Lambswool on a timber frame, in four sizes. Warm underhand in a way that flat-weave fabric never is.",
    features: [
      "Lambswool upholstery",
      "Timber frame, high-density foam",
      "180cm, 210cm, 260cm and 280cm",
      "Warm, soft texture"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf52", name: "Two-Tone Wide Sofa", cat: "Living Room", room: "Living Room", price: 11563, memberPrice: 10407, sku: "SH-10256", tag: "New", ph: "", img: "assets/products/sf52.webp",
    imgs: ["assets/products/sf52.webp", "assets/products/sf52-2.webp", "assets/products/sf52-3.webp", "assets/products/sf52-4.webp", "assets/products/sf52-5.webp"],
    sizes: [{ label: "240cm / Blue", price: 11563 }, { label: "240cm / Beige", price: 11563 }, { label: "260cm / Blue", price: 12515 }, { label: "260cm / Beige", price: 12515 }],
    desc: "Blue or beige at 240cm and 260cm. Wide, low and straightforward.",
    features: [
      "Blue or Beige",
      "240cm and 260cm",
      "Wide, low proportions",
      "Everyday upholstery"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "4", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf53", name: "Configurable Leather Sofa", cat: "Living Room", room: "Living Room", price: 11970, memberPrice: 10773, sku: "SH-10257", tag: "New", ph: "", img: "assets/products/sf53.webp",
    imgs: ["assets/products/sf53.webp", "assets/products/sf53-2.webp", "assets/products/sf53-3.webp", "assets/products/sf53-4.webp", "assets/products/sf53-5.webp"],
    sizes: [{ label: "A / Brown", price: 11970 }, { label: "A / Light Grey", price: 11970 }, { label: "A / Charcoal Grey", price: 11970 }, { label: "B / Brown", price: 17640 }, { label: "B / Light Grey", price: 17640 }, { label: "B / Charcoal Grey", price: 17640 }, { label: "C1 / Brown", price: 22260 }, { label: "C2 / Brown", price: 22260 }, { label: "C1 / Light Grey", price: 22260 }, { label: "C1 / Charcoal Grey", price: 22260 }, { label: "C2 / Light Grey", price: 22260 }, { label: "C2 / Charcoal Grey", price: 22260 }, { label: "D1 / Brown", price: 26600 }, { label: "D1 / Light Grey", price: 26600 }, { label: "D2 / Brown", price: 26600 }, { label: "D1 / Charcoal Grey", price: 26600 }, { label: "D2 / Light Grey", price: 26600 }, { label: "D2 / Charcoal Grey", price: 26600 }],
    desc: "Leather in three configurations, A, B and C, across brown, light grey and charcoal. Pick the layout, then the colour.",
    features: [
      "Three configurations: A, B and C",
      "Brown, Light Grey or Charcoal Grey",
      "Genuine leather",
      "Choose layout and colour separately"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "18", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  { id: "sf54", name: "Velvet Sofa, White or Green", cat: "Living Room", room: "Living Room", price: 12166, memberPrice: 10949, sku: "SH-10258", tag: "New", ph: "", img: "assets/products/sf54.webp",
    imgs: ["assets/products/sf54.webp", "assets/products/sf54-2.webp", "assets/products/sf54-3.webp", "assets/products/sf54-4.webp", "assets/products/sf54-5.webp"],
    sizes: [{ label: "180cm / White", price: 12166 }, { label: "180cm / Green", price: 12166 }, { label: "180cm / Pink", price: 12166 }, { label: "230cm / Pink", price: 12166 }, { label: "260cm / Pink", price: 12166 }, { label: "290cm / Pink", price: 12166 }, { label: "230cm / White", price: 13566 }, { label: "230cm / Green", price: 13566 }, { label: "260cm / White", price: 14966 }, { label: "260cm / Green", price: 14966 }, { label: "290cm / White", price: 16366 }, { label: "290cm / Green", price: 16366 }],
    desc: "Velvet at 180cm, 230cm or 260cm, in white or green. Velvet at a size that suits an ordinary room rather than a ballroom.",
    features: [
      "Velvet upholstery",
      "White or Green",
      "180cm, 230cm and 260cm",
      "Suits normal-sized living rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "12", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf55", name: "Curved Fabric Sofa", cat: "Living Room", room: "Living Room", price: 12180, memberPrice: 10962, sku: "SH-10259", tag: "New", ph: "", img: "assets/products/sf55.webp",
    imgs: ["assets/products/sf55.webp", "assets/products/sf55-2.webp", "assets/products/sf55-3.webp", "assets/products/sf55-4.webp", "assets/products/sf55-5.webp"],
    sizes: [{ label: "180cm", price: 12180 }, { label: "210cm", price: 13146 }, { label: "240cm", price: 14416 }],
    desc: "A curved fabric sofa on a timber frame with high-density foam, in three sizes.",
    features: [
      "Curved shape in fabric",
      "Timber frame, high-density foam",
      "180cm, 210cm and 240cm",
      "Softens a square room"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf56", name: "Oversized Bouclé Sofa", cat: "Living Room", room: "Living Room", price: 12320, memberPrice: 11088, sku: "SH-10260", tag: "New", ph: "", img: "assets/products/sf56.webp",
    imgs: ["assets/products/sf56.webp", "assets/products/sf56-2.webp", "assets/products/sf56-3.webp", "assets/products/sf56-4.webp", "assets/products/sf56-5.webp"],
    sizes: [{ label: "Navy Blue / 280cm", price: 12320 }, { label: "Snow Beige / 280cm", price: 12320 }, { label: "Navy Blue / 310cm", price: 13818 }, { label: "Snow Beige / 310cm", price: 13818 }, { label: "Navy Blue / 420cm", price: 14826 }, { label: "Snow Beige / 420cm", price: 14826 }],
    desc: "Bouclé in navy blue or snow beige, at 280cm, 310cm or 420cm. Very large, very soft.",
    features: [
      "Bouclé upholstery",
      "Navy Blue or Snow Beige",
      "280cm, 310cm and 420cm",
      "Oversized proportions"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Bouclé", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum gently with a brush head and blot spills rather than rubbing, so the loops aren't pulled. Snagged loops should be trimmed, never tugged." },

  { id: "sf57", name: "Feather-Filled Sofa in Four Colours", cat: "Living Room", room: "Living Room", price: 15182, memberPrice: 13664, sku: "SH-10261", tag: "New", ph: "", img: "assets/products/sf57.webp",
    imgs: ["assets/products/sf57.webp", "assets/products/sf57-2.webp", "assets/products/sf57-3.webp", "assets/products/sf57-4.webp", "assets/products/sf57-5.webp"],
    sizes: [{ label: "Grey / 280cm", price: 15182 }, { label: "Blue / 280cm", price: 15182 }, { label: "Tan / 280cm", price: 15182 }, { label: "Chocolate / 280cm", price: 15182 }, { label: "Grey / 300cm", price: 15726 }, { label: "Blue / 300cm", price: 15726 }, { label: "Tan / 300cm", price: 15726 }, { label: "Chocolate / 300cm", price: 15726 }, { label: "Grey / 330cm", price: 19130 }, { label: "Blue / 330cm", price: 19130 }, { label: "Tan / 330cm", price: 19130 }, { label: "Chocolate / 330cm", price: 19130 }],
    desc: "Feather and down filling in grey, blue, tan or chocolate, from 280cm to 330cm. The softest seat in the range.",
    features: [
      "Feather and down filling",
      "Grey, Blue, Tan or Chocolate",
      "280cm to 330cm",
      "Very soft, sink-in seat"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "12", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf58", name: "Rounded Velvet Sofa", cat: "Living Room", room: "Living Room", price: 16726, memberPrice: 15053, sku: "SH-10262", tag: "New", ph: "", img: "assets/products/sf58.webp",
    imgs: ["assets/products/sf58.webp", "assets/products/sf58-2.webp", "assets/products/sf58-3.webp", "assets/products/sf58-4.webp", "assets/products/sf58-5.webp"],
    sizes: [{ label: "Chocolate / 180cm", price: 16726 }, { label: "Mocha / 180cm", price: 16726 }, { label: "Grey / 180cm", price: 16726 }, { label: "Chocolate / 200cm", price: 17206 }, { label: "Mocha / 200cm", price: 17206 }, { label: "Grey / 200cm", price: 17206 }],
    desc: "Velvet in chocolate, mocha or grey, at 180cm or 200cm, with softly rounded arms and back.",
    features: [
      "Velvet over a timber frame",
      "Chocolate, Mocha or Grey",
      "180cm or 200cm",
      "Softly rounded arms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Velvet", "Options": "6", "Room": "Living / Indoor" },
    care: "Vacuum with a brush head to lift the pile. Blot spills, never rub, since rubbing crushes the nap. Keep out of direct sun, which fades velvet faster than any other upholstery." },

  { id: "sf59", name: "Extra-Large Lounge Sofa", cat: "Living Room", room: "Living Room", price: 16866, memberPrice: 15179, sku: "SH-10263", tag: "New", ph: "", img: "assets/products/sf59.webp",
    imgs: ["assets/products/sf59.webp", "assets/products/sf59-2.webp", "assets/products/sf59-3.webp", "assets/products/sf59-4.webp", "assets/products/sf59-5.webp"],
    sizes: [{ label: "320cm x 245cm", price: 16866 }, { label: "370cm x 245m", price: 18746 }, { label: "420cm x 245cm", price: 21966 }],
    desc: "320, 370 or 420cm across and 245cm deep. This is a sofa for a room you could park a car in, and it will swallow a family whole.",
    features: [
      "Up to 420cm x 245cm",
      "Three enormous sizes",
      "Deep enough to lie across",
      "For very large open-plan rooms"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Upholstery fabric", "Options": "3", "Room": "Living / Indoor" },
    care: "Vacuum regularly and blot spills immediately with a clean cloth. Rotate and plump the cushions so they wear evenly. Professional cleaning for anything stubborn." },

  { id: "sf60", name: "Long Leather Sofa", cat: "Living Room", room: "Living Room", price: 17920, memberPrice: 16128, sku: "SH-10264", tag: "New", ph: "", img: "assets/products/sf60.webp",
    imgs: ["assets/products/sf60.webp", "assets/products/sf60-2.webp", "assets/products/sf60-3.webp", "assets/products/sf60-4.webp", "assets/products/sf60-5.webp"],
    sizes: [{ label: "260cm", price: 17920 }, { label: "280cm", price: 19246 }, { label: "300cm", price: 20531 }, { label: "320cm", price: 22144 }, { label: "335cm", price: 23085 }, { label: "345cm", price: 23723 }, { label: "360cm", price: 24626 }],
    desc: "Leather on a timber frame in seven lengths from 260cm to 360cm, all of them long.",
    features: [
      "Leather over a timber frame",
      "Seven lengths, 260cm to 360cm",
      "High-density foam",
      "Built for a long wall"
    ],
    specs: { "Type": "Sofa", "Upholstery": "Leather", "Options": "7", "Room": "Living / Indoor" },
    care: "Dust with a dry cloth and wipe spills straight away with a barely damp one. Keep it out of direct sun and away from heaters, which dry the hide and crack it. Condition once or twice a year." },

  // ── Outdoor ──
  { id: "od01", name: "Steel Fire Pit with Built-In Log Store", cat: "Outdoor", room: "Outdoor", price: 5370, memberPrice: 4833, sku: "SH-10116", tag: "New", ph: "", img: "assets/products/od01.jpg",
    imgs: ["assets/products/od01.jpg", "assets/products/od01-2.jpg", "assets/products/od01-3.jpg", "assets/products/od01-4.jpg", "assets/products/od01-5.jpg", "assets/products/od01-6.webp", "assets/products/od01-7.webp", "assets/products/od01-8.webp"],
    sizes: [{ label: "80cm", price: 5370 }, { label: "90cm", price: 5627 }, { label: "100cm", price: 6184 }, { label: "120cm", price: 7420 }, { label: "150cm", price: 8778 }],
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

  { id: "od02", name: "Caged Solar Garden Lantern", cat: "Outdoor", room: "Outdoor", price: 627, memberPrice: 564, sku: "SH-10117", tag: "New", ph: "", img: "assets/products/od02.jpg",
    imgs: ["assets/products/od02.jpg", "assets/products/od02-2.jpg", "assets/products/od02-3.jpg", "assets/products/od02-4.jpg", "assets/products/od02-5.webp", "assets/products/od02-6.jpg", "assets/products/od02-7.webp"],
    sizes: [{ label: "Small", price: 627 }, { label: "Medium", price: 767 }, { label: "Large", price: 907 }],
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

  { id: "od03", name: "Rattan Outdoor Lounge Chair, Ottoman & Side Table", cat: "Outdoor", room: "Outdoor", price: 794, memberPrice: 715, sku: "SH-10118", tag: "New", ph: "", img: "assets/products/od03.jpg",
    imgs: ["assets/products/od03.jpg", "assets/products/od03-2.jpg", "assets/products/od03-3.jpg", "assets/products/od03-4.jpg", "assets/products/od03-5.webp", "assets/products/od03-6.webp", "assets/products/od03-7.webp"],
    sizes: [{ label: "Ottoman", price: 794 }, { label: "Chair", price: 2080 }, { label: "Side table", price: 2323 }],
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

  { id: "od04", name: "Teak & Metal Outdoor Dining Collection", cat: "Outdoor", room: "Outdoor", price: 1008, memberPrice: 907, sku: "SH-10119", tag: "New", ph: "", img: "assets/products/od04.jpg",
    imgs: ["assets/products/od04.jpg", "assets/products/od04-2.jpg", "assets/products/od04-3.jpg", "assets/products/od04-4.jpg", "assets/products/od04-5.webp", "assets/products/od04-6.webp", "assets/products/od04-7.webp", "assets/products/od04-8.webp"],
    sizes: [{ label: "Chair", price: 1008 }, { label: "Round table", price: 4368 }, { label: "Square table", price: 4368 }, { label: "Dining table 160cm", price: 7231 }, { label: "Dining table 220cm", price: 7938 }, { label: "Dining table 260cm", price: 8372 }],
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

  { id: "od05", name: "Weatherproof Rattan Outdoor Lounge Collection", cat: "Outdoor", room: "Outdoor", price: 993, memberPrice: 894, sku: "SH-10120", tag: "New", ph: "", img: "assets/products/od05.jpg",
    imgs: ["assets/products/od05.jpg", "assets/products/od05-2.jpg", "assets/products/od05-3.jpg", "assets/products/od05-4.jpg", "assets/products/od05-5.jpg", "assets/products/od05-6.webp", "assets/products/od05-7.jpg", "assets/products/od05-8.webp"],
    colours: [{ name: "Chocolate", hex: "#4b3a2c" }, { name: "Beige", hex: "#cdbfa6" }],
    sizes: [{ label: "Footstool", price: 993 }, { label: "Chair", price: 1396 }, { label: "Sofa chair", price: 3154 }, { label: "Sun lounge", price: 5755 }, { label: "Two seater", price: 9439 }],
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

  { id: "od06", name: "Curved Sun Lounge with Sculptural Base", cat: "Outdoor", room: "Outdoor", price: 1483, memberPrice: 1335, sku: "SH-10121", tag: "New", ph: "", img: "assets/products/od06.jpg",
    imgs: ["assets/products/od06.jpg", "assets/products/od06-2.jpg", "assets/products/od06-3.jpg", "assets/products/od06-4.jpg", "assets/products/od06-5.webp"],
    sizes: [{ label: "Champagne Table", price: 1483 }, { label: "White Table", price: 1483 }, { label: "Champagne Lounge", price: 4158 }, { label: "White Lounge", price: 4158 }],
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

  { id: "od07", name: "Grey Rattan Outdoor Sofa & Armchair Setting", cat: "Outdoor", room: "Outdoor", price: 3136, memberPrice: 2822, sku: "SH-10122", tag: "New", ph: "", img: "assets/products/od07.jpg",
    imgs: ["assets/products/od07.jpg", "assets/products/od07-2.jpg", "assets/products/od07-3.jpg", "assets/products/od07-4.jpg", "assets/products/od07-5.jpg", "assets/products/od07-6.jpg"],
    colours: [{ name: "Grey", hex: "#9a9892" }],
    sizes: [{ label: "Table", price: 3136 }, { label: "Chair", price: 3987 }, { label: "140cm Sofa", price: 4696 }, { label: "180cm Sofa", price: 7059 }],
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

  { id: "od08", name: "Modular Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 1956, memberPrice: 1760, sku: "SH-10123", tag: "New", ph: "", img: "assets/products/od08.jpg",
    imgs: ["assets/products/od08.jpg", "assets/products/od08-2.jpg", "assets/products/od08-3.webp", "assets/products/od08-4.jpg", "assets/products/od08-5.webp", "assets/products/od08-6.webp"],
    sizes: [{ label: "Khaki - Table Option (B)", price: 1956 }, { label: "Grey - Table Option (B)", price: 1956 }, { label: "Khaki - Table Option (A)", price: 1989 }, { label: "Grey - Table Option (A)", price: 1989 }, { label: "Khaki - Single Seater", price: 4182 }, { label: "Grey - Single Seater", price: 4182 }, { label: "Khaki - Two Seater", price: 6468 }, { label: "Grey - Two Seater", price: 6468 }, { label: "Khaki - Three Seater", price: 8736 }, { label: "Grey - Three Seater", price: 8736 }],
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

  { id: "od09", name: "Cushioned Outdoor Lounge Chair & Footstool", cat: "Outdoor", room: "Outdoor", price: 1676, memberPrice: 1508, sku: "SH-10124", tag: "New", ph: "", img: "assets/products/od09.jpg",
    imgs: ["assets/products/od09.jpg", "assets/products/od09-2.jpg", "assets/products/od09-3.jpg", "assets/products/od09-4.jpg", "assets/products/od09-5.webp", "assets/products/od09-6.webp"],
    sizes: [{ label: "Khaki Chair", price: 1676 }, { label: "Black Chair", price: 1676 }, { label: "Black Set", price: 2471 }, { label: "Khaki Set", price: 2471 }],
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

  { id: "od10", name: "Leaf-Shaped Sun Lounge", cat: "Outdoor", room: "Outdoor", price: 3135, memberPrice: 2822, sku: "SH-10125", tag: "New", ph: "", img: "assets/products/od10.jpg",
    imgs: ["assets/products/od10.jpg", "assets/products/od10-2.jpg", "assets/products/od10-3.jpg", "assets/products/od10-4.webp", "assets/products/od10-5.jpg"],
    sizes: [{ label: "Coffee / Small", price: 3135 }, { label: "Beige / Small", price: 3135 }, { label: "Coffee / Large", price: 3359 }, { label: "Beige / Large", price: 3359 }],
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

  { id: "od11", name: "Streamlined Outdoor Coffee Table", cat: "Outdoor", room: "Outdoor", price: 2346, memberPrice: 2111, sku: "SH-10126", tag: "New", ph: "", img: "assets/products/od11.jpg",
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

  { id: "od12", name: "Handwoven Rattan Resort Chair", cat: "Outdoor", room: "Outdoor", price: 1778, memberPrice: 1600, sku: "SH-10127", tag: "New", ph: "", img: "assets/products/od12.jpg",
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

  { id: "od13", name: "Patterned Handwoven Outdoor Chair", cat: "Outdoor", room: "Outdoor", price: 2240, memberPrice: 2016, sku: "SH-10128", tag: "New", ph: "", img: "assets/products/od13.jpg",
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

  { id: "od14", name: "Shaded Two-in-One Outdoor Lounge", cat: "Outdoor", room: "Outdoor", price: 2086, memberPrice: 1877, sku: "SH-10129", tag: "New", ph: "", img: "assets/products/od14.jpg",
    imgs: ["assets/products/od14.jpg", "assets/products/od14-2.jpg", "assets/products/od14-3.jpg", "assets/products/od14-4.jpg", "assets/products/od14-5.webp", "assets/products/od14-6.jpg"],
    sizes: [{ label: "Coffee Table", price: 2086 }, { label: "Sofa Set", price: 9408 }],
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

  { id: "od15", name: "Oval-Base Lounge Chair & Coffee Table Set", cat: "Outdoor", room: "Outdoor", price: 2612, memberPrice: 2351, sku: "SH-10130", tag: "New", ph: "", img: "assets/products/od15.jpg",
    imgs: ["assets/products/od15.jpg", "assets/products/od15-2.jpg", "assets/products/od15-3.jpg", "assets/products/od15-4.jpg", "assets/products/od15-5.jpg", "assets/products/od15-6.jpg"],
    sizes: [{ label: "1 x Chair", price: 2612 }, { label: "1 x Chair + Coffee Table", price: 3312 }, { label: "2 x Chairs + Coffee Table", price: 5555 }],
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

  { id: "od16", name: "Solid Teak Outdoor Sofa", cat: "Outdoor", room: "Outdoor", price: 15673, memberPrice: 14106, sku: "SH-10131", tag: "New", ph: "", img: "assets/products/od16.jpg",
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

  { id: "od17", name: "Rattan Hanging Swing Chair", cat: "Outdoor", room: "Outdoor", price: 4256, memberPrice: 3830, sku: "SH-10132", tag: "New", ph: "", img: "assets/products/od17.jpg",
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

  { id: "od18", name: "Woven String Sculptural Outdoor Chair", cat: "Outdoor", room: "Outdoor", price: 3562, memberPrice: 3206, sku: "SH-10133", tag: "New", ph: "", img: "assets/products/od18.jpg",
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

  { id: "od19", name: "Fibre Rattan Hanging Chair with Alloy Frame", cat: "Outdoor", room: "Outdoor", price: 3426, memberPrice: 3083, sku: "SH-10134", tag: "New", ph: "", img: "assets/products/od19.jpg",
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

  { id: "od20", name: "Handcrafted Teak Outdoor Dining Collection", cat: "Outdoor", room: "Outdoor", price: 2201, memberPrice: 1981, sku: "SH-10135", tag: "New", ph: "", img: "assets/products/od20.jpg",
    imgs: ["assets/products/od20.jpg", "assets/products/od20-2.jpg", "assets/products/od20-3.jpg", "assets/products/od20-4.jpg", "assets/products/od20-5.webp", "assets/products/od20-6.webp"],
    sizes: [{ label: "Armless Chair", price: 2201 }, { label: "Dining Chair", price: 2379 }, { label: "Coffee Table", price: 4182 }, { label: "180cm Table", price: 6156 }, { label: "240cm Table", price: 11007 }, { label: "300cm Table", price: 13401 }],
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

  { id: "od21", name: "Premium Teak Outdoor Dining Table & Chairs", cat: "Outdoor", room: "Outdoor", price: 2659, memberPrice: 2393, sku: "SH-10136", tag: "New", ph: "", img: "assets/products/od21.jpg",
    imgs: ["assets/products/od21.jpg", "assets/products/od21-2.jpg", "assets/products/od21-3.jpg", "assets/products/od21-4.webp", "assets/products/od21-5.webp", "assets/products/od21-6.webp"],
    sizes: [{ label: "Chair", price: 2659 }, { label: "Table", price: 7448 }],
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

  { id: "od22", name: "Teak & Rattan Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 4899, memberPrice: 4409, sku: "SH-10137", tag: "New", ph: "", img: "assets/products/od22.jpg",
    imgs: ["assets/products/od22.jpg", "assets/products/od22-2.jpg", "assets/products/od22-3.jpg", "assets/products/od22-4.jpg", "assets/products/od22-5.webp", "assets/products/od22-6.webp"],
    sizes: [{ label: "Single Seater", price: 4899 }, { label: "Double Seater", price: 8788 }, { label: "Double Seater + Table", price: 9632 }, { label: "Three Seater + Chaise", price: 11731 }],
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

  { id: "od23", name: "Aluminium & Rattan Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 1508, memberPrice: 1357, sku: "SH-10138", tag: "New", ph: "", img: "assets/products/od23.jpg",
    imgs: ["assets/products/od23.jpg", "assets/products/od23-2.jpg", "assets/products/od23-3.jpg", "assets/products/od23-4.jpg", "assets/products/od23-5.jpg", "assets/products/od23-6.jpg"],
    sizes: [{ label: "Small Table", price: 1508 }, { label: "Large Table", price: 2832 }, { label: "Single Seater", price: 4014 }, { label: "Double Seater", price: 8747 }, { label: "Three Seater", price: 12319 }],
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

  { id: "od24", name: "Large Teak Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 3566, memberPrice: 3209, sku: "SH-10139", tag: "New", ph: "", img: "assets/products/od24.webp",
    imgs: ["assets/products/od24.webp", "assets/products/od24-2.webp", "assets/products/od24-3.webp", "assets/products/od24-4.webp", "assets/products/od24-5.webp", "assets/products/od24-6.webp"],
    sizes: [{ label: "Side Table", price: 3566 }, { label: "Coffee Table", price: 4507 }, { label: "Sofa Collection A", price: 18364 }, { label: "Sofa Collection Type C", price: 20779 }, { label: "Sofa Collection Type B", price: 21256 }],
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

  { id: "od25", name: "Cushioned Rattan Outdoor Sofa & Tables", cat: "Outdoor", room: "Outdoor", price: 1382, memberPrice: 1244, sku: "SH-10140", tag: "New", ph: "", img: "assets/products/od25.webp",
    imgs: ["assets/products/od25.webp", "assets/products/od25-2.jpg", "assets/products/od25-3.webp", "assets/products/od25-4.webp", "assets/products/od25-5.webp", "assets/products/od25-6.webp"],
    sizes: [{ label: "Small Table", price: 1382 }, { label: "Large Table", price: 2180 }, { label: "Single Chair", price: 2832 }, { label: "Double Seater Sofa", price: 4392 }],
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

  { id: "od26", name: "Rattan & Reinforced Metal Outdoor Collection", cat: "Outdoor", room: "Outdoor", price: 1876, memberPrice: 1688, sku: "SH-10141", tag: "New", ph: "", img: "assets/products/od26.jpg",
    imgs: ["assets/products/od26.jpg", "assets/products/od26-2.jpg", "assets/products/od26-3.jpg", "assets/products/od26-4.webp", "assets/products/od26-5.webp", "assets/products/od26-6.webp"],
    sizes: [{ label: "Table", price: 1876 }, { label: "Single Seater", price: 1883 }, { label: "Double Seater", price: 8988 }, { label: "Three-Seater", price: 10798 }],
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

  { id: "od27", name: "Powder-Coated Iron Outdoor Table & Chairs", cat: "Outdoor", room: "Outdoor", price: 1386, memberPrice: 1247, sku: "SH-10142", tag: "New", ph: "", img: "assets/products/od27.jpg",
    imgs: ["assets/products/od27.jpg", "assets/products/od27-2.jpg", "assets/products/od27-3.jpg", "assets/products/od27-4.jpg", "assets/products/od27-5.jpg", "assets/products/od27-6.webp"],
    sizes: [{ label: "Black / Single Chair", price: 1386 }, { label: "Green / Single Chair", price: 1386 }, { label: "White / Single Chair", price: 1386 }, { label: "Black / 3-Person Chair", price: 3752 }, { label: "Green / 3-Person Chair", price: 3752 }, { label: "White / 3-Person Chair", price: 3752 }, { label: "Black / Short Table", price: 4564 }, { label: "Green / Short Table", price: 4564 }, { label: "White / Short Table", price: 4564 }, { label: "Black / Long Table", price: 5824 }, { label: "Green / Long Table", price: 5824 }, { label: "White / Long Table", price: 5824 }],
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

  { id: "od28", name: "Minimalist Teak Outdoor Dining Set", cat: "Outdoor", room: "Outdoor", price: 2226, memberPrice: 2003, sku: "SH-10143", tag: "New", ph: "", img: "assets/products/od28.jpg",
    imgs: ["assets/products/od28.jpg", "assets/products/od28-2.jpg", "assets/products/od28-3.jpg", "assets/products/od28-4.webp", "assets/products/od28-5.webp", "assets/products/od28-6.webp"],
    sizes: [{ label: "Chair", price: 2226 }, { label: "Table", price: 6985 }],
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

  { id: "od29", name: "Weather-Resistant Outdoor Side & Coffee Tables", cat: "Outdoor", room: "Outdoor", price: 3760, memberPrice: 3384, sku: "SH-10144", tag: "New", ph: "", img: "assets/products/od29.jpg",
    imgs: ["assets/products/od29.jpg", "assets/products/od29-2.webp", "assets/products/od29-3.jpg", "assets/products/od29-4.webp", "assets/products/od29-5.webp", "assets/products/od29-6.webp"],
    sizes: [{ label: "Grey / Side Table", price: 3760 }, { label: "Grey / Coffee Table", price: 4837 }],
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

  { id: "od30", name: "Beige Teak Outdoor Lounge & Dining Collection", cat: "Outdoor", room: "Outdoor", price: 2768, memberPrice: 2491, sku: "SH-10145", tag: "New", ph: "", img: "assets/products/od30.jpg",
    imgs: ["assets/products/od30.jpg", "assets/products/od30-2.jpg", "assets/products/od30-3.webp", "assets/products/od30-4.jpg", "assets/products/od30-5.jpg", "assets/products/od30-6.jpg"],
    colours: [{ name: "Beige", hex: "#d3c6ae" }],
    sizes: [{ label: "Dining Chair", price: 2768 }, { label: "Coffee Table", price: 3402 }, { label: "Lounge Chair", price: 3626 }, { label: "Sun Bed", price: 4183 }, { label: "Two Seater Sofa", price: 5880 }, { label: "Three Seater Sofa", price: 6982 }],
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

  { id: "od31", name: "Warm Brown Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 5089, memberPrice: 4580, sku: "SH-10146", tag: "New", ph: "", img: "assets/products/od31.jpg",
    imgs: ["assets/products/od31.jpg", "assets/products/od31-2.jpg", "assets/products/od31-3.jpg", "assets/products/od31-4.webp", "assets/products/od31-5.webp", "assets/products/od31-6.webp"],
    colours: [{ name: "Brown", hex: "#6b5443" }],
    sizes: [{ label: "Coffee Table", price: 5089 }, { label: "Single Seat", price: 5599 }, { label: "2-Seater Sofa", price: 10203 }, { label: "3-Seater Sofa", price: 14350 }],
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

  { id: "od32", name: "Modular Aluminium Outdoor Collection in Black & White", cat: "Outdoor", room: "Outdoor", price: 3464, memberPrice: 3118, sku: "SH-10147", tag: "New", ph: "", img: "assets/products/od32.jpg",
    imgs: ["assets/products/od32.jpg", "assets/products/od32-2.jpg", "assets/products/od32-3.jpg", "assets/products/od32-4.webp", "assets/products/od32-5.jpg", "assets/products/od32-6.jpg"],
    sizes: [{ label: "Black / Rectangle Coffee Table", price: 3464 }, { label: "White / Rectangle Coffee Table", price: 3464 }, { label: "Black / Square Coffee Table", price: 4018 }, { label: "White / Square Coffee Table", price: 4018 }, { label: "Black / Foot Stool", price: 4155 }, { label: "White / Foot Stool", price: 4155 }, { label: "Black / Middle Seat", price: 4617 }, { label: "White / Middle Seat", price: 4617 }, { label: "Black / Corner Seat", price: 5079 }, { label: "White / Corner Seat", price: 5079 }, { label: "Black / Sun Bed", price: 8397 }, { label: "White / Sun Bed", price: 8397 }],
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

  { id: "od33", name: "Aluminium Alloy Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 4264, memberPrice: 3838, sku: "SH-10148", tag: "New", ph: "", img: "assets/products/od33.jpg",
    imgs: ["assets/products/od33.jpg", "assets/products/od33-2.jpg", "assets/products/od33-3.jpg", "assets/products/od33-4.jpg", "assets/products/od33-5.jpg", "assets/products/od33-6.jpg"],
    sizes: [{ label: "Chair", price: 4264 }, { label: "High Back Chair", price: 4407 }, { label: "Double Sofa", price: 9458 }, { label: "Three-Person Sofa", price: 10584 }],
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

  { id: "od34", name: "Round Woven Occasional Chair", cat: "Outdoor", room: "Outdoor", price: 5404, memberPrice: 4864, sku: "SH-10149", tag: "New", ph: "", img: "assets/products/od34.jpg",
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

  { id: "od35", name: "Light Teak Outdoor Dining & Bar Collection", cat: "Outdoor", room: "Outdoor", price: 2744, memberPrice: 2470, sku: "SH-10150", tag: "New", ph: "", img: "assets/products/od35.jpg",
    imgs: ["assets/products/od35.jpg", "assets/products/od35-2.webp", "assets/products/od35-3.webp", "assets/products/od35-4.webp", "assets/products/od35-5.webp", "assets/products/od35-6.webp"],
    sizes: [{ label: "High Chair", price: 2744 }, { label: "Chair", price: 2744 }, { label: "Bars Stool", price: 2744 }, { label: "Bar Table", price: 3284 }, { label: "Square Table", price: 4116 }, { label: "Coffee Table", price: 4886 }],
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

  { id: "od36", name: "Fibre Cement Outdoor Coffee & Side Table", cat: "Outdoor", room: "Outdoor", price: 1252, memberPrice: 1127, sku: "SH-10151", tag: "New", ph: "", img: "assets/products/od36.jpg",
    imgs: ["assets/products/od36.jpg", "assets/products/od36-2.jpg", "assets/products/od36-3.jpg", "assets/products/od36-4.jpg", "assets/products/od36-5.jpg", "assets/products/od36-6.jpg"],
    sizes: [{ label: "Side Table", price: 1252 }, { label: "Coffee Table", price: 2092 }],
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

  { id: "od37", name: "Clean-Line Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 4028, memberPrice: 3625, sku: "SH-10152", tag: "New", ph: "", img: "assets/products/od37.jpg",
    imgs: ["assets/products/od37.jpg", "assets/products/od37-2.webp", "assets/products/od37-3.jpg", "assets/products/od37-4.webp", "assets/products/od37-5.webp", "assets/products/od37-6.webp"],
    sizes: [{ label: "Coffee Table", price: 4028 }, { label: "Single Seater", price: 5320 }, { label: "Two Seater", price: 9064 }, { label: "Three Seater", price: 11480 }],
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

  { id: "od38", name: "Complete Rattan Dining, Bar & Lounge Collection", cat: "Outdoor", room: "Outdoor", price: 1506, memberPrice: 1355, sku: "SH-10153", tag: "New", ph: "", img: "assets/products/od38.jpg",
    imgs: ["assets/products/od38.jpg", "assets/products/od38-2.jpg", "assets/products/od38-3.jpg", "assets/products/od38-4.jpg", "assets/products/od38-5.jpg", "assets/products/od38-6.jpg"],
    sizes: [{ label: "Foot Petal", price: 1506 }, { label: "Chair", price: 1596 }, { label: "Bar Stool", price: 1666 }, { label: "Coffee Table", price: 2192 }, { label: "Sofa Chair", price: 3268 }, { label: "Bar Table", price: 3360 }, { label: "Table", price: 3654 }, { label: "Three Seat Sofa", price: 7980 }],
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

  { id: "od39", name: "Matching Outdoor Dining Chairs & Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 1817, memberPrice: 1635, sku: "SH-10154", tag: "New", ph: "", img: "assets/products/od39.jpg",
    imgs: ["assets/products/od39.jpg", "assets/products/od39-2.jpg", "assets/products/od39-3.jpg", "assets/products/od39-4.webp", "assets/products/od39-5.jpg", "assets/products/od39-6.webp"],
    sizes: [{ label: "Chair", price: 1817 }, { label: "Sofa Chair", price: 2358 }, { label: "Two Seat Sofa", price: 5432 }, { label: "Three Seat Sofa", price: 5922 }],
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

  { id: "od40", name: "Everyday Rattan Outdoor Lounge Collection", cat: "Outdoor", room: "Outdoor", price: 3970, memberPrice: 3573, sku: "SH-10155", tag: "New", ph: "", img: "assets/products/od40.jpg",
    imgs: ["assets/products/od40.jpg", "assets/products/od40-2.jpg", "assets/products/od40-3.webp", "assets/products/od40-4.webp", "assets/products/od40-5.webp"],
    sizes: [{ label: "Coffee Table", price: 3970 }, { label: "Single Seater", price: 5578 }, { label: "Double Seater", price: 9281 }],
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

  { id: "od41", name: "Weather-Resistant Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 1540, memberPrice: 1386, sku: "SH-10156", tag: "New", ph: "", img: "assets/products/od41.jpg",
    imgs: ["assets/products/od41.jpg", "assets/products/od41-2.jpg", "assets/products/od41-3.jpg", "assets/products/od41-4.jpg", "assets/products/od41-5.webp", "assets/products/od41-6.webp"],
    sizes: [{ label: "Chair", price: 1540 }, { label: "Single Seater", price: 1792 }, { label: "Two Seater", price: 3850 }, { label: "Three Seater", price: 5110 }],
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

  { id: "od42", name: "Curated Outdoor Sofa, Chairs & Table Set", cat: "Outdoor", room: "Outdoor", price: 1946, memberPrice: 1751, sku: "SH-10157", tag: "New", ph: "", img: "assets/products/od42.jpg",
    imgs: ["assets/products/od42.jpg", "assets/products/od42-2.jpg", "assets/products/od42-3.jpg", "assets/products/od42-4.jpg", "assets/products/od42-5.jpg", "assets/products/od42-6.jpg"],
    sizes: [{ label: "Coffee Table", price: 1946 }, { label: "Single Seater", price: 2675 }, { label: "2 Seater Sofa", price: 4166 }, { label: "3 Seater Sofa", price: 6572 }],
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

  { id: "od43", name: "Compact Outdoor Table & Chairs Set", cat: "Outdoor", room: "Outdoor", price: 1256, memberPrice: 1130, sku: "SH-10158", tag: "New", ph: "", img: "assets/products/od43.jpg",
    imgs: ["assets/products/od43.jpg", "assets/products/od43-2.jpg", "assets/products/od43-3.jpg", "assets/products/od43-4.jpg", "assets/products/od43-5.jpg", "assets/products/od43-6.webp"],
    sizes: [{ label: "1 x Chair", price: 1256 }, { label: "Set - Table + 2 x Chairs", price: 3786 }],
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

  { id: "od44", name: "Low & High Back Woven Rattan Collection", cat: "Outdoor", room: "Outdoor", price: 1242, memberPrice: 1118, sku: "SH-10159", tag: "New", ph: "", img: "assets/products/od44.jpg",
    imgs: ["assets/products/od44.jpg", "assets/products/od44-2.jpg", "assets/products/od44-3.jpg", "assets/products/od44-4.jpg", "assets/products/od44-5.jpg", "assets/products/od44-6.jpg"],
    sizes: [{ label: "Wooden Round Coffee Table", price: 1242 }, { label: "Wooden Square Table", price: 2498 }, { label: "High Back Chair", price: 2786 }, { label: "Single Seater - Low back", price: 3993 }, { label: "Wooden Rectangle Table", price: 4406 }, { label: "Sun Bed", price: 4676 }, { label: "Single Seater - High Back", price: 5558 }, { label: "Wooden Oval Table", price: 5776 }, { label: "Three Seater - Low back Sofa", price: 7329 }, { label: "Three Seater - High Back Sofa", price: 10077 }],
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

  { id: "od45", name: "Square & Round Woven Outdoor Seating Range", cat: "Outdoor", room: "Outdoor", price: 1956, memberPrice: 1760, sku: "SH-10160", tag: "New", ph: "", img: "assets/products/od45.jpg",
    imgs: ["assets/products/od45.jpg", "assets/products/od45-2.jpg", "assets/products/od45-3.jpg", "assets/products/od45-4.jpg", "assets/products/od45-5.jpg", "assets/products/od45-6.jpg"],
    sizes: [{ label: "Glass Table", price: 1956 }, { label: "Round - Single Seater", price: 3352 }, { label: "Square - Single Seater", price: 3494 }, { label: "Double Seater", price: 7946 }],
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
