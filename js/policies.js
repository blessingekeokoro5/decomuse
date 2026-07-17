/* ============================================================
   DÉCOMUSE, Policy content (Australian standards)
   ------------------------------------------------------------
   NOTE: These are good-faith template policies aligned to the
   Australian Consumer Law (ACL), Privacy Act 1988 (Cth) and the
   Australian Privacy Principles (APPs). They are a starting point,
   not legal advice, please have them reviewed by a qualified
   Australian legal professional before relying on them.
   ============================================================ */

const POLICY_UPDATED = "14 July 2026";

const POLICY_ORDER = [
  { slug: "faq",      label: "FAQ" },
  { slug: "delivery", label: "Delivery, Shipping & Order Tracking Policy" },
  { slug: "returns",  label: "Returns & Refund Policy" },
  { slug: "privacy",  label: "Privacy Policy" },
  { slug: "terms",    label: "Terms & Conditions" }
];

const FAQ_ITEMS = [
  { q: "Where do you ship from and how long does it take?",
    a: "All home-décor products are dispatched from our Melbourne warehouse. Orders are usually processed within 1 to 2 business days. Standard delivery within Australia typically takes 3 to 8 business days depending on your location; larger furniture items may take longer and are quoted at checkout." },
  { q: "Do you ship internationally?",
    a: "Yes, we ship worldwide, including Australia, New Zealand, USA, Canada, the Netherlands, Morocco, China, Germany, Switzerland and the UAE. International delivery times and costs vary by destination and are calculated at checkout. Any import duties or taxes are the responsibility of the customer." },
  { q: "How do I track my order?",
    a: "Use our <a href='track.html'>Track Your Order</a> page and enter your order number, email or phone used at checkout. You'll also receive a tracking link by email once your order ships." },
  { q: "What payment methods do you accept?",
    a: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, Afterpay, Klarna and Zip. All prices are in Australian Dollars (AUD) and include GST where applicable." },
  { q: "Can I return an item?",
    a: "Yes. Your rights under the Australian Consumer Law always apply, and we also offer a 30-day change-of-mind window on eligible items. See our <a href='policy.html?doc=returns'>Returns &amp; Refund Policy</a> for full details." },
  { q: "Do you deliver gift hampers locally?",
    a: "Yes, gift hampers can be delivered locally in select metro areas for a fast, thoughtful delivery. See options on our <a href='hampers.html'>Gifting</a> page, or we ship hampers Australia-wide." },
  { q: "How does the Gift Hamper Maker work?",
    a: "Head to our <a href='hamper-maker.html'>Gift Hamper Maker</a>, choose a box and add treats, drinks, pamper and home touches. Your box builds live with a running total (minimum $60), then add a gift note and pop it in your cart." },
  { q: "Can I create a custom gift?",
    a: "Absolutely, build your own with the <a href='hamper-maker.html'>Gift Hamper Maker</a>, browse ready-made <a href='hampers.html'>hampers</a>, or send a <a href='gift-cards.html'>gift card</a>." },
  { q: "Do you offer gift cards?",
    a: "Yes, digital <a href='gift-cards.html'>gift cards</a> are delivered by email, never expire, and can be used on anything in store." },
  { q: "Can I customise or personalise a product?",
    a: "Yes! Many pieces can be customised, personalised or made to order, for example custom hampers, monogrammed or engraved gifts, and bespoke colour or size options. Just add a note with your order or contact us with what you'd like. Please note that customised and made-to-order items take a few extra days to prepare, so they take a little longer to be delivered than a standard order." },
  { q: "How long do customised orders take to be delivered?",
    a: "Standard orders are dispatched within 1 to 2 business days. Customised, personalised and made-to-order items take a few additional days to create before they ship, so your total delivery time will be a little longer. We'll always confirm an estimated timeframe once we accept your custom order." },
  { q: "How can I contact DecoMuse?",
    a: "Email <a href='mailto:Decormuseofficial@outlook.com'>Decormuseofficial@outlook.com</a>, or message us on WhatsApp. We're a proudly Australian online store 🇦🇺." }
];

const POLICIES = {
  delivery: {
    title: "Delivery, Shipping & Order Tracking Policy",
    intro: "This policy explains how we ship, fulfil, deliver and track DecoMuse orders. It should be read together with our Terms & Conditions and Returns & Refund Policy.",
    body: `
      <h3>1. Dispatch &amp; processing</h3>
      <p>All DecoMuse home-décor products are shipped from our <strong>Melbourne warehouse</strong>. Orders are generally processed and dispatched within <strong>1 to 2 business days</strong> of payment being received and cleared. During sale periods and holidays, processing may take a little longer.</p>

      <h3>2. Shipping &amp; fulfilment</h3>
      <p>Once your order is placed, our team picks, packs and fulfils it from our Melbourne warehouse with care. Our shipping &amp; fulfilment standards:</p>
      <ul>
        <li><strong>Handling time:</strong> most orders are packed and handed to the carrier within 1 to 2 business days; made-to-order and bulky furniture items may take longer and are noted at checkout.</li>
        <li><strong>Carriers:</strong> we dispatch via trusted carriers including Australia Post and Aramex, and specialist couriers for large or fragile furniture.</li>
        <li><strong>Packaging:</strong> items are protectively packed, using recyclable and sustainable materials wherever possible.</li>
        <li><strong>Split shipments:</strong> if your order contains multiple items, they may be fulfilled and arrive in separate deliveries, you are only charged shipping once.</li>
        <li><strong>Authority to leave:</strong> unless a signature is required, parcels may be left in a safe place at the carrier's discretion. Please provide clear delivery instructions at checkout.</li>
        <li><strong>Confirmation:</strong> you'll receive an order confirmation and, once fulfilled, a dispatch email with tracking.</li>
      </ul>
      <p>Fulfilment timeframes are estimates and may vary during sale periods, public holidays and peak demand.</p>

      <h3>3. Delivery times &amp; costs (Australia)</h3>
      <ul>
        <li>Standard delivery: typically <strong>3 to 8 business days</strong> depending on your state and postcode.</li>
        <li><strong>Free standard shipping on orders over $500</strong> (Australia-wide).</li>
        <li>Bulky and furniture items may incur additional freight, shown at checkout, and can require longer transit times.</li>
        <li>Remote and regional areas may experience extended delivery times.</li>
      </ul>

      <h3>4. International delivery</h3>
      <p>We ship worldwide, including New Zealand, the USA, Canada, the Netherlands, Morocco, China, Germany, Switzerland and the UAE. Delivery times and costs are calculated at checkout. <strong>Any customs duties, import taxes or fees are the responsibility of the customer</strong> and are not included in our prices or shipping charges.</p>

      <h3>5. Local gift delivery</h3>
      <p>Selected gift hampers can be delivered within select metro areas for fast local delivery. Delivery fees and availability are confirmed at the time of ordering.</p>

      <h3>6. Order tracking</h3>
      <p>Once dispatched, you'll receive a confirmation with a tracking number. You can track your order at any time via our <a href="track.html">Track Your Order</a> page using your order number, email or phone number used at checkout. Deliveries are carried by reputable carriers such as Australia Post and Aramex.</p>

      <h3>7. Incorrect address &amp; failed delivery</h3>
      <p>Please ensure your delivery details are correct. Re-delivery or redirection caused by an incorrect address may incur additional charges. If a parcel is returned to us as undeliverable, we'll contact you to arrange re-delivery (additional postage may apply).</p>

      <h3>8. Damaged or lost in transit</h3>
      <p>If your order arrives damaged, or does not arrive within a reasonable time, please contact us within 7 days at <a href="mailto:Decormuseofficial@outlook.com">Decormuseofficial@outlook.com</a> so we can help resolve it. Nothing in this policy limits your rights under the Australian Consumer Law.</p>
    `
  },

  returns: {
    title: "Returns & Refund Policy",
    intro: "DecoMuse is committed to your satisfaction and to meeting our obligations under the Australian Consumer Law (ACL).",
    body: `
      <h3>1. Your rights under the Australian Consumer Law</h3>
      <p>Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. For a <strong>major failure</strong> you are entitled to a replacement or refund, and to compensation for any other reasonably foreseeable loss or damage. For a failure that does not amount to a major failure, you are entitled to have the goods repaired or replaced if the failure can be remedied. These rights are in addition to any change-of-mind policy below.</p>

      <h3>2. Change of mind</h3>
      <p>We gladly accept change-of-mind returns on eligible items within <strong>30 days</strong> of delivery, provided the item is:</p>
      <ul>
        <li>unused, in its original condition and original packaging;</li>
        <li>not a excluded item (see section 4); and</li>
        <li>accompanied by proof of purchase.</li>
      </ul>
      <p>Change-of-mind return shipping is at the customer's expense, and the original shipping charge is non-refundable. A store credit or refund of the item price is issued once the item is received and inspected.</p>

      <h3>3. Faulty, damaged or incorrect items</h3>
      <p>If your item is faulty, damaged on arrival, or not what you ordered, please contact us within 7 days with your order number and photos. We will arrange a repair, replacement or refund in line with the ACL, and we'll cover reasonable return postage for verified faults.</p>

      <h3>4. Items we can't accept for change of mind</h3>
      <ul>
        <li>Perishable or consumable goods (e.g. food items within hampers);</li>
        <li>Custom or personalised items, including custom-built gift hampers and personalised cards;</li>
        <li>Gift cards and vouchers;</li>
        <li>Items marked final sale or clearance.</li>
      </ul>
      <p>This does not exclude your ACL rights where such an item is faulty.</p>

      <h3>5. How to request a return</h3>
      <p>Email <a href="mailto:Decormuseofficial@outlook.com">Decormuseofficial@outlook.com</a>, or message us on WhatsApp, with your order number and reason for return. We'll provide return instructions. Please do not send items back before contacting us.</p>

      <h3>6. Refunds</h3>
      <p>Approved refunds are made to your original payment method within <strong>5 to 10 business days</strong> of us receiving and inspecting the returned item. Payment processing times may vary by provider.</p>

      <h3>7. Cancellations</h3>
      <p>If you need to cancel an order, contact us as soon as possible. We can usually cancel before dispatch. Once dispatched, our standard returns process applies.</p>

      <h3>8. Custom &amp; personalised gifts</h3>
      <p>Custom hampers, personalised gifts and gift cards are made to order. Please choose carefully, as change-of-mind returns may not apply to personalised items, though your rights for faulty items under the Australian Consumer Law always apply.</p>
    `
  },

  privacy: {
    title: "Privacy Policy",
    intro: "DecoMuse (ABN 41 991 812 955) respects your privacy and is committed to protecting your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).",
    body: `
      <h3>1. Information we collect</h3>
      <p>We may collect personal information including your name, delivery and billing address, email, phone number, order details and, where relevant, information you provide when booking a service, applying for a role, or contacting us. We do not store full card numbers, payments are handled by secure third-party processors.</p>

      <h3>2. How we collect it</h3>
      <p>We collect information directly from you when you place an order, create an account, subscribe to our newsletter, book a service, use the Muse Stylist AI or chat, or contact us. Some information (such as cookies and site analytics) is collected automatically when you use our website.</p>

      <h3>3. Why we use it</h3>
      <ul>
        <li>To process and deliver your orders and bookings;</li>
        <li>To communicate with you about orders, enquiries and support;</li>
        <li>To send marketing and offers where you have opted in (you can unsubscribe at any time);</li>
        <li>To improve our products, services and website;</li>
        <li>To meet our legal and regulatory obligations.</li>
      </ul>

      <h3>4. Disclosure to third parties</h3>
      <p>We may share your information with trusted third parties who help us operate, such as payment providers, delivery couriers (e.g. Australia Post, Aramex), Uber for local delivery, and IT and marketing service providers. We require these parties to protect your information. We do not sell your personal information.</p>

      <h3>5. Storage &amp; security</h3>
      <p>We take reasonable steps to protect your personal information from misuse, loss, and unauthorised access, including secure systems and access controls. No method of transmission over the internet is completely secure, but we work to safeguard your data.</p>

      <h3>6. The Muse Stylist AI &amp; images</h3>
      <p>Photos uploaded to the Muse Stylist AI tool are processed to generate styling recommendations. In the current version, images are processed in your browser and are not stored on our servers.</p>

      <h3>7. Access, correction &amp; complaints</h3>
      <p>You may request access to, or correction of, the personal information we hold about you by contacting us. If you have a privacy concern, contact us first and we'll work to resolve it. You may also contact the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener">oaic.gov.au</a>.</p>

      <h3>8. Cookies</h3>
      <p>Our website uses cookies to remember your cart and preferences and to understand site usage. You can control cookies through your browser settings; disabling them may affect some features.</p>

      <h3>9. Contact</h3>
      <p>Privacy enquiries: <a href="mailto:Decormuseofficial@outlook.com">Decormuseofficial@outlook.com</a> · Australia 🇦🇺.</p>
    `
  },

  terms: {
    title: "Terms & Conditions",
    intro: "These Terms & Conditions govern your use of the DecoMuse website and your purchase of our products and services. By using our site or placing an order, you agree to these terms.",
    body: `
      <h3>1. About us</h3>
      <p>This website is operated by DecoMuse (ABN 41 991 812 955), an Australian home, lifestyle and fragrance business.</p>

      <h3>2. Pricing &amp; GST</h3>
      <p>All prices are in Australian Dollars (AUD) and include GST where applicable, unless stated otherwise. We may update prices, products and promotions at any time. Sale discounts (such as Spend &amp; Save) apply per their stated terms.</p>

      <h3>3. Orders &amp; acceptance</h3>
      <p>Your order is an offer to purchase. We may accept or decline any order, including where an item is out of stock, mispriced, or where we suspect fraud. A contract forms when we confirm dispatch. We'll contact you if we cannot fulfil an order and arrange a refund.</p>

      <h3>4. Payment</h3>
      <p>We accept the payment methods shown at checkout. Payments are processed securely by third-party providers. You warrant that you are authorised to use the chosen payment method.</p>

      <h3>5. Services &amp; bookings</h3>
      <p>Muse Stylist AI recommendations are provided as a guide only. Custom hampers, personalised gifts and gift cards are made to order.</p>

      <h3>6. External links</h3>
      <p>Our site may link to third-party sites and services (for example payment providers, delivery partners and social media). We are not responsible for the content or practices of third-party websites.</p>

      <h3>7. Intellectual property</h3>
      <p>All content on this website, including text, imagery, branding and design, is owned by or licensed to DecoMuse and may not be used without our written permission.</p>

      <h3>8. Consumer guarantees &amp; liability</h3>
      <p>Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or remedy you have under the Australian Consumer Law. To the extent permitted by law, our liability for a failure to comply with a consumer guarantee is limited to re-supplying, replacing or repairing the goods or services, or paying the cost of doing so.</p>

      <h3>9. Governing law</h3>
      <p>These terms are governed by the laws of South Australia, and you submit to the non-exclusive jurisdiction of its courts.</p>

      <h3>10. Changes</h3>
      <p>We may update these terms from time to time. The version published on this page applies to your use of the site and orders placed after it is posted.</p>
    `
  }
};
