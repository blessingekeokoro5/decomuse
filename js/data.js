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
  { id: "bt01", name: "Aurelia Marble & Gold Bathroom Set (5-Piece)", cat: "Bathroom", price: 250, memberPrice: 220, sku: "SH-10109", tag: "New", ph: "", img: "assets/products/bt01-5.png",
    imgs: ["assets/products/bt01-5.png", "assets/products/bt01.png", "assets/products/bt01-2.png", "assets/products/bt01-3.png", "assets/products/bt01-4.png"],
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

  { id: "bt02", name: "Dark Marble Bathroom Set (4-Piece)", cat: "Bathroom", room: "Bathroom", price: 700, memberPrice: 630, sku: "SH-10115", tag: "New", ph: "", img: "assets/products/bt02-4.jpg",
    imgs: ["assets/products/bt02-4.jpg", "assets/products/bt02-2.jpg", "assets/products/bt02-3.jpg", "assets/products/bt02.jpg", "assets/products/bt02-5.jpg", "assets/products/bt02-6.jpg", "assets/products/bt02-7.jpg", "assets/products/bt02-8.jpg"],
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

  // ── Outdoor ──
  { id: "od01", name: "Steel Fire Pit with Built-In Log Store", cat: "Outdoor", room: "Outdoor", price: 5370, memberPrice: 4833, sku: "SH-10116", tag: "New", ph: "", img: "assets/products/od01.jpg",
    imgs: ["assets/products/od01.jpg", "assets/products/od01-2.jpg", "assets/products/od01-3.jpg", "assets/products/od01-4.jpg", "assets/products/od01-5.jpg", "assets/products/od01-6.jpg", "assets/products/od01-7.jpg", "assets/products/od01-8.jpg"],
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
    imgs: ["assets/products/od02.jpg", "assets/products/od02-2.jpg", "assets/products/od02-3.jpg", "assets/products/od02-4.jpg", "assets/products/od02-5.jpg", "assets/products/od02-6.jpg", "assets/products/od02-7.jpg"],
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
    imgs: ["assets/products/od03.jpg", "assets/products/od03-2.jpg", "assets/products/od03-3.jpg", "assets/products/od03-4.jpg", "assets/products/od03-5.jpg", "assets/products/od03-6.jpg", "assets/products/od03-7.jpg"],
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
    imgs: ["assets/products/od04.jpg", "assets/products/od04-2.jpg", "assets/products/od04-3.jpg", "assets/products/od04-4.jpg", "assets/products/od04-5.jpg", "assets/products/od04-6.jpg", "assets/products/od04-7.jpg", "assets/products/od04-8.jpg"],
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
    imgs: ["assets/products/od05.jpg", "assets/products/od05-2.jpg", "assets/products/od05-3.jpg", "assets/products/od05-4.jpg", "assets/products/od05-5.jpg", "assets/products/od05-6.jpg", "assets/products/od05-7.jpg", "assets/products/od05-8.jpg"],
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
    imgs: ["assets/products/od06.jpg", "assets/products/od06-2.jpg", "assets/products/od06-3.jpg", "assets/products/od06-4.jpg", "assets/products/od06-5.jpg"],
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
    imgs: ["assets/products/od08.jpg", "assets/products/od08-2.jpg", "assets/products/od08-3.jpg", "assets/products/od08-4.jpg", "assets/products/od08-5.jpg", "assets/products/od08-6.jpg"],
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
    imgs: ["assets/products/od09.jpg", "assets/products/od09-2.jpg", "assets/products/od09-3.jpg", "assets/products/od09-4.jpg", "assets/products/od09-5.jpg", "assets/products/od09-6.jpg"],
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
    imgs: ["assets/products/od10.jpg", "assets/products/od10-2.jpg", "assets/products/od10-3.jpg", "assets/products/od10-4.jpg", "assets/products/od10-5.jpg"],
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
    imgs: ["assets/products/od11.jpg", "assets/products/od11-2.jpg", "assets/products/od11-3.jpg", "assets/products/od11-4.jpg", "assets/products/od11-5.jpg", "assets/products/od11-6.jpg"],
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
    imgs: ["assets/products/od14.jpg", "assets/products/od14-2.jpg", "assets/products/od14-3.jpg", "assets/products/od14-4.jpg", "assets/products/od14-5.jpg", "assets/products/od14-6.jpg"],
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
    imgs: ["assets/products/od16.jpg", "assets/products/od16-2.jpg", "assets/products/od16-3.jpg", "assets/products/od16-4.jpg", "assets/products/od16-5.jpg", "assets/products/od16-6.jpg"],
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
    imgs: ["assets/products/od18.jpg", "assets/products/od18-2.jpg", "assets/products/od18-3.jpg", "assets/products/od18-4.jpg", "assets/products/od18-5.jpg", "assets/products/od18-6.jpg"],
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
    imgs: ["assets/products/od19.jpg", "assets/products/od19-2.jpg", "assets/products/od19-3.jpg", "assets/products/od19-4.jpg", "assets/products/od19-5.jpg", "assets/products/od19-6.jpg"],
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
    imgs: ["assets/products/od20.jpg", "assets/products/od20-2.jpg", "assets/products/od20-3.jpg", "assets/products/od20-4.jpg", "assets/products/od20-5.jpg", "assets/products/od20-6.jpg"],
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
    imgs: ["assets/products/od21.jpg", "assets/products/od21-2.jpg", "assets/products/od21-3.jpg", "assets/products/od21-4.jpg", "assets/products/od21-5.jpg", "assets/products/od21-6.jpg"],
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
    imgs: ["assets/products/od22.jpg", "assets/products/od22-2.jpg", "assets/products/od22-3.jpg", "assets/products/od22-4.jpg", "assets/products/od22-5.jpg", "assets/products/od22-6.jpg"],
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

  { id: "od24", name: "Large Teak Outdoor Sofa Collection", cat: "Outdoor", room: "Outdoor", price: 3566, memberPrice: 3209, sku: "SH-10139", tag: "New", ph: "", img: "assets/products/od24.jpg",
    imgs: ["assets/products/od24.jpg", "assets/products/od24-2.jpg", "assets/products/od24-3.jpg", "assets/products/od24-4.jpg", "assets/products/od24-5.jpg", "assets/products/od24-6.jpg"],
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

  { id: "od25", name: "Cushioned Rattan Outdoor Sofa & Tables", cat: "Outdoor", room: "Outdoor", price: 1382, memberPrice: 1244, sku: "SH-10140", tag: "New", ph: "", img: "assets/products/od25.jpg",
    imgs: ["assets/products/od25.jpg", "assets/products/od25-2.jpg", "assets/products/od25-3.jpg", "assets/products/od25-4.jpg", "assets/products/od25-5.jpg", "assets/products/od25-6.jpg"],
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
    imgs: ["assets/products/od26.jpg", "assets/products/od26-2.jpg", "assets/products/od26-3.jpg", "assets/products/od26-4.jpg", "assets/products/od26-5.jpg", "assets/products/od26-6.jpg"],
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
    imgs: ["assets/products/od27.jpg", "assets/products/od27-2.jpg", "assets/products/od27-3.jpg", "assets/products/od27-4.jpg", "assets/products/od27-5.jpg", "assets/products/od27-6.jpg"],
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
    imgs: ["assets/products/od28.jpg", "assets/products/od28-2.jpg", "assets/products/od28-3.jpg", "assets/products/od28-4.jpg", "assets/products/od28-5.jpg", "assets/products/od28-6.jpg"],
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
    imgs: ["assets/products/od29.jpg", "assets/products/od29-2.jpg", "assets/products/od29-3.jpg", "assets/products/od29-4.jpg", "assets/products/od29-5.jpg", "assets/products/od29-6.jpg"],
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
    imgs: ["assets/products/od30.jpg", "assets/products/od30-2.jpg", "assets/products/od30-3.jpg", "assets/products/od30-4.jpg", "assets/products/od30-5.jpg", "assets/products/od30-6.jpg"],
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
    imgs: ["assets/products/od31.jpg", "assets/products/od31-2.jpg", "assets/products/od31-3.jpg", "assets/products/od31-4.jpg", "assets/products/od31-5.jpg", "assets/products/od31-6.jpg"],
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
    imgs: ["assets/products/od32.jpg", "assets/products/od32-2.jpg", "assets/products/od32-3.jpg", "assets/products/od32-4.jpg", "assets/products/od32-5.jpg", "assets/products/od32-6.jpg"],
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
    imgs: ["assets/products/od34.jpg", "assets/products/od34-2.jpg", "assets/products/od34-3.jpg", "assets/products/od34-4.jpg", "assets/products/od34-5.jpg", "assets/products/od34-6.jpg"],
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
    imgs: ["assets/products/od35.jpg", "assets/products/od35-2.jpg", "assets/products/od35-3.jpg", "assets/products/od35-4.jpg", "assets/products/od35-5.jpg", "assets/products/od35-6.jpg"],
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
    imgs: ["assets/products/od37.jpg", "assets/products/od37-2.jpg", "assets/products/od37-3.jpg", "assets/products/od37-4.jpg", "assets/products/od37-5.jpg", "assets/products/od37-6.jpg"],
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
    imgs: ["assets/products/od39.jpg", "assets/products/od39-2.jpg", "assets/products/od39-3.jpg", "assets/products/od39-4.jpg", "assets/products/od39-5.jpg", "assets/products/od39-6.jpg"],
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
    imgs: ["assets/products/od40.jpg", "assets/products/od40-2.jpg", "assets/products/od40-3.jpg", "assets/products/od40-4.jpg", "assets/products/od40-5.jpg"],
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
    imgs: ["assets/products/od41.jpg", "assets/products/od41-2.jpg", "assets/products/od41-3.jpg", "assets/products/od41-4.jpg", "assets/products/od41-5.jpg", "assets/products/od41-6.jpg"],
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
    imgs: ["assets/products/od43.jpg", "assets/products/od43-2.jpg", "assets/products/od43-3.jpg", "assets/products/od43-4.jpg", "assets/products/od43-5.jpg", "assets/products/od43-6.jpg"],
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
  { id: "hd01", name: "Aura Mist Ultrasonic Diffuser 160ml", cat: "Home Décor", price: 184, memberPrice: 154, sku: "SH-10101", tag: "New", ph: "", img: "assets/products/hd01.png",
    imgs: ["assets/products/hd01.png", "assets/products/hd01-2.png"],
    desc: "A sculptural teardrop diffuser that turns fragrance into a moment. Whisper-quiet ultrasonic mist, soft ambient light and a 160ml reservoir bring calm, scent and a designer silhouette to any room." },
  { id: "hd09", name: "Flame-Effect Ultrasonic Humidifier & Diffuser", cat: "Home Décor", room: "Home Décor", price: 90.10, memberPrice: 85.75, sku: "SH-10111", tag: "New", ph: "", img: "assets/products/hd09.png",
    imgs: ["assets/products/hd09.png", "assets/products/hd09-2.png", "assets/products/hd09-3.png", "assets/products/hd09-4.png", "assets/products/hd09-5.png"],
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
  { id: "hd08", name: "Alban Bouclé Pillow Cover", cat: "Home Décor", room: "Living Room", price: 59, memberPrice: 55, sku: "SH-10110", tag: "New", ph: "", img: "assets/products/hd08.png?v=2",
    imgs: ["assets/products/hd08.png?v=2", "assets/products/hd08-2.png?v=2", "assets/products/hd08-3.png?v=2", "assets/products/hd08-4.png?v=2", "assets/products/hd08-5.png?v=2", "assets/products/hd08-6.png?v=2", "assets/products/hd08-7.png?v=2", "assets/products/hd08-8.png?v=2", "assets/products/hd08-9.png?v=2"],
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
  { id: "hd02", name: "Fleur Sculptural Glass Vase", cat: "Home Décor", price: 225, memberPrice: 205, sku: "SH-10102", ph: "", img: "assets/products/hd02.png",
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
  { id: "hd03", name: "Ceramic Electric Oil Vaporiser", cat: "Home Décor", price: 98.90, memberPrice: 78.95, sku: "SH-10103", tag: "New", ph: "", img: "assets/products/hd03.png",
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
  { id: "hd04", name: "Diamond Velvet Throw Pillow Cover", cat: "Home Décor", price: 15.99, sku: "SH-10104", tag: "New", ph: "", img: "assets/products/hd04.png",
    imgs: ["assets/products/hd04.png", "assets/products/hd04-2.png", "assets/products/hd04-3.png", "assets/products/hd04-4.png", "assets/products/hd04-5.png", "assets/products/hd04-6.png", "assets/products/hd04-7.png"],
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
  { id: "l07", name: "Soft Cotton Face Washer Towels — 10 Pack (450GSM)", cat: "Lifestyle", price: 28.99, memberPrice: 25.99, sku: "SH-10105", tag: "New", ph: "", img: "assets/products/l07.png",
    imgs: ["assets/products/l07.png", "assets/products/l07-2.png", "assets/products/l07-3.png", "assets/products/l07-4.png", "assets/products/l07-5.png", "assets/products/l07-6.png"],
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

  { id: "hd05", name: "Oval Marble-Effect Coffee Table", cat: "Furniture", room: "Living Room", price: 115.37, memberPrice: 99.99, sku: "SH-10106", tag: "New", ph: "", img: "assets/products/hd05.jpg",
    imgs: ["assets/products/hd05.jpg", "assets/products/hd05-2.jpg", "assets/products/hd05-3.jpg", "assets/products/hd05-4.jpg", "assets/products/hd05-5.jpg", "assets/products/hd05-6.jpg"],
    desc: "A sculptural centrepiece for the living room, this oval coffee table pairs a smooth marble-effect top with a warm, angular timber-look base. The soft oval silhouette keeps the room feeling open, while the crossed legs add architectural interest, a timeless, mid-century-inspired piece that anchors a lounge with quiet luxury. Style it with a stack of design books, a low vase or a scented candle to complete the look.",
    features: [
      "Elegant oval top with a natural marble-effect finish",
      "Warm timber-look base with a sculptural crossed-leg design",
      "Smooth, wipe-clean surface made for everyday living",
      "Mid-century-inspired silhouette that suits any lounge",
      "A statement centrepiece to pair with sofas, rugs & accent chairs"
    ],
    specs: { "Type": "Coffee Table", "Shape": "Oval", "Tabletop": "Marble-effect", "Base": "Timber-look", "Primary Colour": "White & Walnut", "Room": "Living / Indoor" },
    dims: { w: 80, d: 50, h: 45, unit: "cm", img: "assets/products/hd05-2.jpg", printed: true },
    spin360: ["assets/products/hd05.jpg"],
    care: "Wipe clean with a soft, dry or slightly damp cloth. Avoid harsh chemicals and abrasive cleaners. Use coasters to protect the surface from heat and moisture." },

  { id: "hd06", name: "Marble-Look Glass Table Set — 2 Piece (80cm)", cat: "Furniture", room: "Living Room", price: 198.37, memberPrice: 168.55, sku: "SH-10107", tag: "New", ph: "", img: "assets/products/hd06.jpg",
    imgs: ["assets/products/hd06.jpg", "assets/products/hd06-3.jpg", "assets/products/hd06-4.jpg", "assets/products/hd06-5.jpg", "assets/products/hd06-6.jpg", "assets/products/hd06-7.jpg", "assets/products/hd06-8.jpg", "assets/products/hd06-9.jpg", "assets/products/hd06-10.jpg"],
    desc: "A refined two-piece table set that brings a soft, luxe finish to any living space. Each table is topped with marble-look tempered glass, tough enough for everyday use yet elegant enough to feel like a designer piece. Nest them together for a compact footprint, or set them apart as a coffee table and matching side table. With clean lines and neutral marble tones, they layer effortlessly with sofas, rugs and accent chairs, an easy way to elevate a lounge, bedroom or reading corner.",
    features: [
      "Two-piece set, use nested together or apart as coffee & side tables",
      "Marble-look tempered glass tops, toughened for everyday durability",
      "Neutral marble tones that suit any palette and style",
      "Slim, contemporary frame with a light, airy footprint",
      "Wipe-clean glass surface with a polished, high-end finish"
    ],
    specs: { "Type": "Coffee & Side Table Set", "Pieces": "2", "Tabletop": "Marble-look tempered glass", "Larger table width": "80cm", "Style": "Contemporary", "Room": "Living / Indoor" },
    dims: { w: 80, d: 80, h: 45, unit: "cm", img: "assets/products/hd06-4.jpg", printed: true, note: "Larger table shown (80 cm ⌀ × 45 cm high); smaller nesting table is 60 cm ⌀ × 38 cm high." },
    spin360: ["assets/products/hd06-4.jpg"],
    care: "Clean the glass with a soft, damp cloth and a mild glass cleaner; avoid abrasive or harsh chemicals. Lift rather than drag when moving, and use coasters to protect from heat and moisture." },

  { id: "hd07", name: "Modern Coffee Table with Storage Drawer & Open Shelf", cat: "Furniture", room: "Living Room", price: 155.09, memberPrice: 135.55, sku: "SH-10108", tag: "New", ph: "", img: "assets/products/hd07.jpg",
    imgs: ["assets/products/hd07.jpg", "assets/products/hd07-2.jpg", "assets/products/hd07-3.jpg", "assets/products/hd07-4.jpg", "assets/products/hd07-5.jpg", "assets/products/hd07-6.jpg", "assets/products/hd07-7.jpg", "assets/products/hd07-8.jpg"],
    desc: "Style and storage in one considered piece. This modern coffee table pairs a sleek marble-look top with a smart two-tone body, a soft-close drawer keeps remotes, chargers and clutter neatly out of sight, while the open shelf is ideal for books, baskets or a styling tray. Raised on slender metal legs, it feels light and contemporary, the perfect centrepiece for a living room that likes to stay tidy and effortlessly put-together.",
    features: [
      "Marble-look tabletop with a polished, contemporary finish",
      "Handy storage drawer to hide remotes, chargers & clutter",
      "Open display shelf for books, baskets or a styling tray",
      "Slim metal legs for a light, modern silhouette",
      "A functional statement piece for any living room"
    ],
    specs: { "Type": "Coffee Table", "Shape": "Rectangular", "Tabletop": "Marble-look", "Storage": "Drawer + open shelf", "Legs": "Metal", "Room": "Living / Indoor" },
    dims: { w: 100, d: 50, h: 45, unit: "cm", img: "assets/products/hd07-2.jpg" },
    spin360: ["assets/products/hd07-2.jpg"],
    care: "Wipe clean with a soft, damp cloth; avoid abrasive cleaners and excess water. Use coasters to protect the surface from heat and moisture." },

  { id: "of01", name: "Ergolux Plus Ergonomic Mesh Office Chair with Footrest (Grey)", brand: "Ergolux", cat: "Office", room: "Office", price: 150.45, memberPrice: 135.45, sku: "SH-10112", tag: "New", ph: "", img: "assets/products/of01.png",
    imgs: ["assets/products/of01.png", "assets/products/of01-2.png", "assets/products/of01-3.png", "assets/products/of01-4.png", "assets/products/of01-5.png", "assets/products/of01-6.png", "assets/products/of01-7.png", "assets/products/of01-8.png", "assets/products/of01-9.png"],
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

  { id: "pk01", name: "Food-Vendor Stand-Up Pouches — Resealable Zipper (10-Pack)", cat: "Packaging", room: "Packaging", price: 12.95, memberPrice: 11.65, sku: "SH-10113", tag: "New", ph: "", img: "assets/products/foodpouch-1.png",
    imgs: ["assets/products/foodpouch-1.png", "assets/products/foodpouch-2.png", "assets/products/foodpouch-3.png"],
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
  { id: "bd01", name: "Amara Upholstered Bed Frame with 3 Drawers \u2014 Oat White", cat: "Bedroom", room: "Bedroom", price: 1350, memberPrice: 1300, sku: "SH-10114", tag: "New", ph: "", img: "assets/products/bd01.jpg",
    imgs: ["assets/products/bd01.jpg", "assets/products/bd01-2.jpg", "assets/products/bd01-3.jpg", "assets/products/bd01-4.jpg", "assets/products/bd01-5.jpg", "assets/products/bd01-6.jpg"],
    dims: { w: 286.6, d: 219, h: 141.2, unit: "cm", img: "assets/products/bd01-3.jpg", note: "King shown. Queen is the same height and depth with a narrower bedhead \u2014 see the size guide images." },
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
