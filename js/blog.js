/* ============================================================
   DÉCOMUSE — The Edit (journal / blog)
   SEO content. Add a new object to POSTS to publish an article.
   Drop a cover photo at assets/blog/<slug>.jpg (optional; falls
   back to a tinted placeholder). Body is HTML.
   ============================================================ */
const POSTS = [
  {
    slug: "how-to-style-a-console-table",
    title: "How to Style a Console Table Like a Stylist",
    excerpt: "The entryway sets the tone for your whole home. Here's the simple three-layer formula our stylists use to make a console table feel considered, not cluttered.",
    date: "2026-07-20",
    cat: "Styling",
    read: 4,
    cover: "assets/blog/how-to-style-a-console-table.jpg",
    ph: "rose",
    body: `
      <p>The console table is the first thing guests see, and the piece most people get wrong. Too bare and it feels unfinished; too busy and it reads as clutter. The trick professional stylists use is to work in <strong>three layers</strong>.</p>
      <h2>1. The anchor (height)</h2>
      <p>Start with one tall element to draw the eye up, a piece of framed art leaning against the wall, or a mirror. A mirror does double duty: it bounces light and makes a narrow hallway feel wider.</p>
      <h2>2. The moment (interest)</h2>
      <p>In front of the anchor, add a sculptural object with presence, a <a href="shop.html">vase</a>, a stack of design books, or a diffuser that scents the entry as you walk in. Vary the heights so nothing lines up in a flat row.</p>
      <h2>3. The softener (organic)</h2>
      <p>Finish with something living or textural, a single stem, dried botanicals, or a low bowl. This breaks up the hard lines and stops the vignette feeling staged.</p>
      <p>Leave a third of the surface empty. Negative space is what makes a styled table look expensive rather than crowded.</p>
      <h3>The DecoMuse formula</h3>
      <p>Odd numbers, varied heights, one hero, and breathing room. Style it once with intention and it will look effortless every day after.</p>`
  },
  {
    slug: "choosing-a-home-fragrance",
    title: "Choosing a Home Fragrance for Every Room",
    excerpt: "Scent is the fastest way to change how a room feels. A quick guide to matching fragrance families to the mood you want, room by room.",
    date: "2026-07-12",
    cat: "Fragrance",
    read: 5,
    cover: "assets/blog/choosing-a-home-fragrance.jpg",
    ph: "forest",
    body: `
      <p>Fragrance is the invisible layer of styling. You can't see it, but it's the first thing people notice and the last thing they remember. Here's how to scent a home with intention.</p>
      <h2>Entryway — make a first impression</h2>
      <p>Reach for something fresh and green, or a soft floral. A <a href="shop.html">diffuser</a> works beautifully here because it releases scent continuously without a flame.</p>
      <h2>Living room — warm and welcoming</h2>
      <p>Amber, sandalwood and vanilla notes make a space feel cosy and lived-in, perfect for the room where people gather.</p>
      <h2>Bedroom — calm and grounding</h2>
      <p>Lavender, chamomile and light woods signal the body to wind down. Keep it subtle; the bedroom should whisper, not shout.</p>
      <h2>Bathroom — clean and uplifting</h2>
      <p>Citrus, eucalyptus and sea-salt notes read as fresh and spa-like.</p>
      <h3>A note on strength</h3>
      <p>Match the scent throw to the room size. An ultrasonic diffuser suits open-plan living, while a smaller vaporiser is perfect for a bedside table. Rotate fragrances with the seasons, brighter in summer, warmer in winter.</p>`
  },
  {
    slug: "the-art-of-gifting",
    title: "The Art of Gifting: Building a Hamper They'll Remember",
    excerpt: "A thoughtful hamper says more than any card. Our stylists share how to build a gift that feels personal, generous and beautifully considered.",
    date: "2026-07-04",
    cat: "Gifting",
    read: 3,
    cover: "assets/blog/the-art-of-gifting.jpg",
    ph: "espresso",
    body: `
      <p>The best gifts feel personal, not purchased. When you build a hamper yourself, you get to tell a little story about the person receiving it.</p>
      <h2>Start with a theme</h2>
      <p>Pick one idea and build around it, a cosy night in, a self-care reset, a celebration. A theme turns a box of nice things into a considered gift.</p>
      <h2>Balance the senses</h2>
      <p>The most memorable hampers hit several senses at once: something to taste, something to smell, and something to keep long after the treats are gone, a candle, a ceramic dish, a linen coaster set.</p>
      <h2>Layer the presentation</h2>
      <p>Presentation is half the gift. A <a href="hamper-maker.html">keepsake box</a>, tissue, ribbon and a handwritten card elevate even simple contents.</p>
      <h3>Build your own</h3>
      <p>Our <a href="hamper-maker.html">Hamper Maker</a> lets you choose the box, the treats and the finishing touches, so every gift is one of a kind.</p>`
  },
  {
    slug: "small-space-styling",
    title: "Five Small-Space Styling Tricks That Actually Work",
    excerpt: "A small home doesn't have to feel small. Five stylist-approved moves to make a compact space feel calm, considered and much bigger than it is.",
    date: "2026-06-26",
    cat: "Styling",
    read: 4,
    cover: "assets/blog/small-space-styling.jpg",
    ph: "rose",
    body: `
      <p>Small spaces reward restraint. The goal isn't to fit more in, it's to make what's there feel intentional. Five tricks our stylists rely on:</p>
      <h2>1. Mirrors, always</h2>
      <p>A large mirror opposite a window doubles the light and the sense of depth. It's the single highest-impact change in a small room.</p>
      <h2>2. Lift things off the floor</h2>
      <p>Wall-mounted lighting, floating shelves and legs on furniture all keep sightlines to the floor open, which reads as more space.</p>
      <h2>3. One palette, layered</h2>
      <p>Tonal styling, shades of the same warm neutral, makes a room feel expansive and calm. Add interest through texture, not contrast.</p>
      <h2>4. Fewer, larger pieces</h2>
      <p>One generous vase beats five small trinkets. Scale up your décor and scale down the quantity.</p>
      <h2>5. Scent the space</h2>
      <p>A <a href="shop.html">diffuser</a> makes a small room feel cared for and complete, a finishing layer that costs no floor space at all.</p>`
  }
];
