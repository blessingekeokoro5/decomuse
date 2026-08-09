/* ============================================================
   DÉCOMUSE, Form library + generic renderer
   All admin/client/employee forms are defined as data here and
   rendered by form.html?f=<slug>. Every form gets a compulsory
   drawn-signature block. Submissions save to the customer base
   (js/admin.js) and email the business.
   ============================================================ */
(function () {
  var esc = function (s) { return String(s == null ? "" : s).replace(/"/g, "&quot;"); };

  var SIGNATURE_BLOCK =
    '<div class="form-sec-title">Signature</div>' +
    '<div class="sig-block">' +
      '<label>Draw your signature *</label>' +
      '<div class="sig-pad"><canvas class="sig-canvas" aria-label="Signature pad"></canvas><button type="button" class="sig-clear">Clear</button></div>' +
      '<div class="sig-hint">Sign above with your mouse or finger. Signature is required.</div>' +
      '<input type="hidden" name="Signature image" class="sig-input">' +
    '</div>' +
    '<div class="field-row" style="margin-top:8px">' +
      '<div class="field"><label>Full name (printed)</label><input name="Signed by"></div>' +
      '<div class="field"><label>Date</label><input name="Date signed" type="date"></div>' +
    '</div>';

  function fieldHtml(f) {
    var star = f.required ? " *" : "";
    var req = f.required ? " required" : "";
    var ph = f.ph ? ' placeholder="' + esc(f.ph) + '"' : "";
    var nm = ' name="' + esc(f.name) + '"';
    if (f.type === "textarea") return '<div class="field"><label>' + f.label + star + '</label><textarea' + nm + ph + ' style="min-height:100px"' + req + '></textarea></div>';
    if (f.type === "select") return '<div class="field"><label>' + f.label + star + '</label><select' + nm + req + '><option value="">Select…</option>' + f.options.map(function (o) { return '<option>' + o + '</option>'; }).join("") + '</select></div>';
    return '<div class="field"><label>' + f.label + star + '</label><input' + nm + ' type="' + (f.type || "text") + '"' + ph + req + '></div>';
  }
  function consentHtml(c) {
    return '<label class="consent"><input type="checkbox" name="' + esc(c.name || c.consent.slice(0, 40)) + '" aria-label="' + esc(c.name || "consent") + '"' + (c.required ? " required" : "") + '> ' + c.consent + '</label>';
  }
  function renderFields(fields) {
    var html = "", buf = [];
    function flush() {
      if (!buf.length) return;
      if (buf.length === 1) { html += buf[0]; }
      else { for (var i = 0; i < buf.length; i += 2) { html += buf[i + 1] ? '<div class="field-row">' + buf[i] + buf[i + 1] + '</div>' : buf[i]; } }
      buf = [];
    }
    fields.forEach(function (f) {
      if (f.sec) { flush(); html += '<div class="form-sec-title">' + f.sec + '</div>'; }
      else if (f.consent) { flush(); html += consentHtml(f); }
      else if (f.half) { buf.push(fieldHtml(f)); }
      else { flush(); html += fieldHtml(f); }
    });
    flush();
    return html;
  }

  window.dmRenderForm = function (f) {
    var body = renderFields(f.fields || []);
    if (f.terms) body += '<div class="form-sec-title">Terms</div><div class="terms">' + f.terms + '</div>';
    if (!f.noSignature) body += SIGNATURE_BLOCK;
    return '<form data-client-form="' + esc(f.title) + '" data-success="' + esc(f.success || "Thank you! Your form has been submitted to DecoMuse. 💛") + '">' +
      body +
      '<button type="submit" class="btn btn--primary btn--block" style="margin-top:18px">' + (f.submit || "Submit form") + '</button>' +
      '<div class="form-success"></div></form>';
  };

  // Shorthand builders
  var NAME = { name: "Name", label: "Full name", required: true, half: true };
  var EMAIL = { name: "Email", label: "Email", type: "email", required: true, half: true };
  var PHONE = { name: "Phone", label: "Phone", type: "tel", half: true };
  var SERVICES = ["Property Styling & Staging", "Interior Design", "Vacation Rental Styling", "Home Décor Personal Shopper"];

  window.DM_FORMS = {
    /* ---------------- CLIENT ---------------- */
    "client-intake": {
      title: "Client Intake / Booking Form", cat: "client",
      intro: "Tell us about you and your booking so we can get started.",
      fields: [
        { sec: "Your details" }, NAME, EMAIL, PHONE, { name: "Address", label: "Address", half: true },
        { sec: "Your booking" },
        { name: "Service", label: "Service", type: "select", options: SERVICES.concat(["Not sure yet"]), required: true, half: true },
        { name: "Preferred date", label: "Preferred date", type: "date", half: true },
        { name: "Preferred time", label: "Preferred time", type: "select", options: ["Morning", "Afternoon", "Evening", "Flexible"], half: true },
        { name: "How did you hear", label: "How did you hear about us?", type: "select", options: ["Google", "Instagram", "Facebook", "Referral", "Real estate agent", "Shopped before", "Other"], half: true },
        { name: "Notes", label: "Anything we should know?", type: "textarea", ph: "Goals, timing, access…" },
        { consent: "I agree to be contacted about my booking and consent to DecoMuse collecting these details.", name: "Consent to contact", required: true }
      ]
    },
    "project-brief": {
      title: "Project Brief Form", cat: "client",
      intro: "A short brief so we can plan your space beautifully.",
      fields: [
        { sec: "Client" }, NAME, EMAIL,
        { sec: "Project" },
        { name: "Service", label: "Service", type: "select", options: SERVICES, required: true, half: true },
        { name: "Rooms / areas", label: "Rooms / areas", half: true },
        { name: "Project goals", label: "What do you want to achieve?", type: "textarea" },
        { name: "Style direction", label: "Style direction", half: true }, { name: "Budget", label: "Budget range", type: "select", options: ["Under $1,000", "$1,000–$3,000", "$3,000–$5,000", "$5,000–$10,000", "$10,000+"], half: true },
        { name: "Must haves", label: "Must-haves", type: "textarea" },
        { name: "Deadline", label: "Deadline", type: "date", half: true }
      ]
    },
    "service-agreement": {
      title: "Service Agreement / Terms & Conditions", cat: "client",
      intro: "Please review the terms and complete your details to confirm your booking.",
      fields: [
        { sec: "Client & booking" }, NAME, EMAIL, PHONE,
        { name: "Service", label: "Service", type: "select", options: SERVICES, required: true, half: true },
        { name: "Project address", label: "Project address" },
        { name: "Agreed fee / quote", label: "Agreed fee / quote reference", half: true }, { name: "Start date", label: "Preferred start date", type: "date", half: true },
        { consent: "I do NOT consent to DecoMuse using photos of my project for portfolio / marketing.", name: "Opt out of marketing photos" },
        { consent: "I have read and agree to the DecoMuse Service Agreement terms.", name: "Agrees to terms", required: true }
      ],
      terms: "<h4>1. Scope</h4><p>DecoMuse provides the agreed service. Work beyond the agreed scope may be quoted separately.</p><h4>2. Fees & GST</h4><p>Fees are per the agreed quote, in AUD, GST-inclusive where applicable. Product & third-party costs are additional unless stated.</p><h4>3. Deposit</h4><p>A 50% deposit secures your booking and dates; the balance is due on/before completion.</p><h4>4. Hire items</h4><p>For staging, hired furniture & décor remain DecoMuse property for the hire period; the client is responsible for reasonable care.</p><h4>5. Cancellations</h4><p>Please give 48 hours' notice to reschedule. Deposits are non-refundable within 7 days of a scheduled service.</p><h4>6. Liability</h4><p>Nothing in these terms limits your rights under the Australian Consumer Law.</p>"
    },
    "scope-of-work": {
      title: "Scope of Work Form", cat: "client",
      intro: "Confirm exactly what's included in your project.",
      fields: [
        NAME, EMAIL, { name: "Service", label: "Service", type: "select", options: SERVICES, required: true },
        { sec: "Scope" },
        { name: "Rooms included", label: "Rooms / areas included", type: "textarea" },
        { name: "Work included", label: "Work included", type: "textarea" },
        { name: "Work excluded", label: "Work excluded", type: "textarea" },
        { name: "Deliverables", label: "Deliverables", type: "textarea" },
        { name: "Estimated timeline", label: "Estimated timeline", half: true }, { name: "Estimated fee", label: "Estimated fee", half: true },
        { consent: "I agree to the scope of work described above.", name: "Agrees to scope", required: true }
      ]
    },
    "design-preferences": {
      title: "Design Preferences Questionnaire", cat: "client",
      intro: "Help us understand your taste so we can match your style.",
      fields: [
        NAME, EMAIL,
        { sec: "Your style" },
        { name: "Preferred styles", label: "Styles you love", ph: "e.g. warm minimal, coastal, classic", half: true },
        { name: "Colours you love", label: "Colours you love", half: true },
        { name: "Colours to avoid", label: "Colours / things to avoid", half: true },
        { name: "Textures", label: "Patterns & textures you like", half: true },
        { name: "Inspiration", label: "Inspiration (links / notes)", type: "textarea" },
        { name: "Lifestyle", label: "Lifestyle notes", type: "textarea", ph: "How you use the space, entertaining, work-from-home…" },
        { name: "Pets or kids", label: "Pets or children at home?", type: "select", options: ["No", "Children", "Pets", "Both"], half: true }
      ]
    },
    "home-access-safety": {
      title: "Home Access & Safety Form", cat: "client",
      intro: "So our team can access and work in your space safely.",
      fields: [
        NAME, EMAIL, { name: "Property address", label: "Property address", required: true },
        { sec: "Access" },
        { name: "Access method", label: "Access method", type: "select", options: ["I'll be home", "Key", "Lockbox", "Agent / building", "Other"], half: true },
        { name: "Key or lockbox details", label: "Key / lockbox details", half: true },
        { name: "Alarm instructions", label: "Alarm code / instructions", half: true },
        { name: "Parking notes", label: "Parking notes", half: true },
        { name: "Preferred access times", label: "Preferred access times" },
        { sec: "Safety" },
        { name: "Pets on site", label: "Pets on site?", type: "select", options: ["No", "Dog", "Cat", "Other"], half: true },
        { name: "Emergency contact", label: "Emergency contact name", half: true },
        { name: "Emergency phone", label: "Emergency contact phone", type: "tel", half: true },
        { name: "Hazards", label: "Any hazards we should know about?", type: "textarea" },
        { consent: "The access & safety details above are accurate.", name: "Info accurate", required: true }
      ]
    },
    "shopper-budget": {
      title: "Décor Personal Shopper Budget Form", cat: "client",
      intro: "Set your budget and priorities for your personal shopping.",
      fields: [
        NAME, EMAIL,
        { sec: "Budget" },
        { name: "Total budget", label: "Total budget (AUD)", type: "number", required: true, half: true },
        { name: "Timeline", label: "Timeline", type: "select", options: ["ASAP", "This week", "This month", "1–3 months", "Flexible"], half: true },
        { name: "Rooms to shop", label: "Rooms / areas to shop for", type: "textarea" },
        { name: "Priority items", label: "Priority items", type: "textarea" },
        { name: "Preferred stores", label: "Preferred stores / brands", half: true }, { name: "Items to avoid", label: "Items / materials to avoid", half: true },
        { consent: "I authorise DecoMuse to source & recommend items within the budget above.", name: "Authorise purchasing", required: true }
      ]
    },
    "inventory-list": {
      title: "Property Styling Inventory List", cat: "client",
      intro: "A record of the pieces supplied for your styling / staging.",
      fields: [
        NAME, EMAIL, { name: "Property address", label: "Property address" },
        { sec: "Inventory" },
        { name: "Room", label: "Room", type: "select", options: ["Living", "Bedroom", "Kitchen / Dining", "Bathroom", "Office", "Outdoor", "Whole home"], half: true },
        { name: "Hire value", label: "Total hire value (AUD)", type: "number", half: true },
        { name: "Items supplied", label: "Items supplied", type: "textarea", ph: "List each piece…" },
        { name: "Hire start", label: "Hire period start", type: "date", half: true }, { name: "Hire end", label: "Hire period end", type: "date", half: true },
        { name: "Condition notes", label: "Condition notes", type: "textarea" },
        { consent: "I am responsible for the reasonable care of the hired items listed above.", name: "Responsible for items", required: true }
      ]
    },
    "photo-release": {
      title: "Before & After Photo Release Form", cat: "client",
      intro: "Permission to photograph your project for our portfolio.",
      fields: [
        NAME, EMAIL, { name: "Property address", label: "Property address" },
        { sec: "Release" },
        { name: "Permission", label: "Do you grant photo permission?", type: "select", options: ["Yes, full use", "Yes, no address shown", "No"], required: true, half: true },
        { name: "Credit", label: "Credit / tag preference", half: true },
        { consent: "I grant DecoMuse permission to use before & after photos of my project per my selection above.", name: "Grants photo release", required: true }
      ]
    },
    "gift-card-redemption": {
      title: "Gift Card Redemption Form", cat: "client",
      intro: "Redeem a DecoMuse gift card.",
      fields: [
        NAME, EMAIL,
        { sec: "Gift card" },
        { name: "Gift card code", label: "Gift card code", required: true, half: true },
        { name: "Amount to redeem", label: "Amount to redeem (AUD)", type: "number", half: true },
        { name: "Order or booking reference", label: "Order / booking reference", half: true },
        { name: "Notes", label: "Notes", type: "textarea" },
        { consent: "The details above are correct.", name: "Details correct", required: true }
      ]
    },
    "membership-registration": {
      title: "Membership Registration Form", cat: "client",
      intro: "Join DecoMuse Rewards.",
      fields: [
        NAME, EMAIL, PHONE, { name: "Birthday", label: "Birthday", type: "date", half: true },
        { sec: "Preferences" },
        { name: "Interests", label: "What are you most interested in?", type: "textarea" },
        { name: "How did you hear", label: "How did you hear about us?", type: "select", options: ["Google", "Instagram", "Facebook", "Referral", "In store", "Other"], half: true },
        { name: "Marketing consent", label: "Email me offers & news?", type: "select", options: ["Yes", "No"], half: true },
        { consent: "I agree to the DecoMuse membership & privacy terms.", name: "Agrees to membership terms", required: true }
      ]
    },
    "cancellation-ack": {
      title: "Cancellation & Refund Policy Acknowledgement", cat: "client",
      intro: "Please acknowledge our cancellation & refund policy.",
      fields: [
        NAME, EMAIL, { name: "Service", label: "Service", type: "select", options: SERVICES, half: true }, { name: "Booking reference", label: "Booking reference", half: true },
        { consent: "I acknowledge and accept the cancellation & refund policy below.", name: "Acknowledges policy", required: true }
      ],
      terms: "<h4>Cancellations</h4><p>Please provide at least 48 hours' notice to reschedule or cancel a booked service.</p><h4>Deposits</h4><p>Deposits secure your date and inventory and are non-refundable within 7 days of the scheduled service.</p><h4>Refunds</h4><p>Where a refund applies, it is processed to the original payment method. Your rights under the Australian Consumer Law always apply.</p><h4>Products</h4><p>Change-of-mind returns on eligible products are accepted within 30 days per our Returns Policy.</p>"
    },
    "invoice": {
      title: "Invoice", cat: "client",
      intro: "DecoMuse tax invoice.",
      success: "Invoice saved.",
      submit: "Save invoice",
      noSignature: true, sendToClient: true,
      fields: [
        { sec: "Bill to (customer)" },
        { name: "Client name", label: "Customer name", required: true, half: true },
        { name: "Email", label: "Customer email", type: "email", required: true, half: true },
        { name: "Client phone", label: "Customer phone", type: "tel", half: true },
        { name: "Client address", label: "Customer address", half: true },
        { sec: "Invoice details" },
        { name: "Invoice number", label: "Invoice number", half: true },
        { name: "Invoice date", label: "Invoice date", type: "date", half: true },
        { name: "Due date", label: "Due date", type: "date", half: true },
        { name: "Status", label: "Payment status", type: "select", options: ["Unpaid", "Paid", "Partially paid", "Overdue"], half: true },
        { sec: "Items & amounts" },
        { name: "Description", label: "Description of services / items", type: "textarea" },
        { name: "Amount", label: "Amount (ex GST)", type: "number", half: true }, { name: "GST", label: "GST", type: "number", half: true },
        { name: "Total", label: "Total (incl GST)", type: "number", half: true }, { name: "Amount paid", label: "Amount paid", type: "number", half: true },
        { name: "Balance due", label: "Balance due", type: "number", half: true },
        { sec: "Payment" },
        { name: "Payment terms", label: "Payment terms", ph: "e.g. Due in 7 days", half: true },
        { name: "Payment details", label: "Payment details", type: "textarea", ph: "Account name, BSB, Account number, reference…" }
      ]
    },
    "project-completion": {
      title: "Project Completion & Feedback Form", cat: "client",
      intro: "Sign off your project and share your feedback.",
      fields: [
        NAME, EMAIL, { name: "Service", label: "Service", type: "select", options: SERVICES, half: true }, { name: "Completion date", label: "Completion date", type: "date", half: true },
        { sec: "Feedback" },
        { name: "Satisfaction", label: "Overall satisfaction", type: "select", options: ["★★★★★ Exceptional", "★★★★ Great", "★★★ Good", "★★ Fair", "★ Poor"], half: true },
        { name: "Recommend", label: "Would you recommend us?", type: "select", options: ["Definitely", "Probably", "Maybe", "No"], half: true },
        { name: "Loved", label: "What did you love?", type: "textarea" },
        { name: "Improve", label: "What could we improve?", type: "textarea" },
        { name: "Testimonial", label: "Testimonial (we may share this)", type: "textarea" },
        { consent: "This feedback is accurate and the project is complete.", name: "Confirms completion", required: true }
      ]
    },

    /* ---------------- EMPLOYEE ---------------- */
    "employee-onboarding": {
      title: "Employee Onboarding Form", cat: "employee",
      intro: "Welcome to the team. Please complete your onboarding details.",
      fields: [
        { sec: "Personal" }, NAME, EMAIL, PHONE, { name: "Date of birth", label: "Date of birth", type: "date", half: true }, { name: "Home address", label: "Home address" },
        { sec: "Role" },
        { name: "Position", label: "Position / role", required: true, half: true }, { name: "Start date", label: "Start date", type: "date", half: true },
        { name: "Employment type", label: "Employment type", type: "select", options: ["Full-time", "Part-time", "Casual", "Contractor"], half: true }, { name: "Manager", label: "Reporting to", half: true },
        { sec: "Payroll (kept confidential)" },
        { name: "Bank name", label: "Bank name", half: true }, { name: "BSB", label: "BSB", half: true },
        { name: "Account number", label: "Account number", half: true }, { name: "Tax File Number", label: "Tax File Number", half: true },
        { name: "Super fund", label: "Superannuation fund", half: true }, { name: "Super member number", label: "Super member no.", half: true },
        { consent: "The information above is true and correct, and I authorise DecoMuse to use it for payroll & onboarding.", name: "Info accurate & authorised", required: true }
      ]
    },
    "employee-emergency": {
      title: "Employee Emergency Contact & Availability", cat: "employee",
      intro: "Your emergency contact and availability.",
      fields: [
        NAME, EMAIL,
        { sec: "Emergency contact" },
        { name: "Emergency contact name", label: "Contact name", required: true, half: true }, { name: "Relationship", label: "Relationship", half: true },
        { name: "Emergency contact phone", label: "Contact phone", type: "tel", required: true, half: true },
        { sec: "Availability" },
        { name: "Days available", label: "Days available", type: "textarea" }, { name: "Hours available", label: "Preferred hours", half: true },
        { consent: "These details are accurate.", name: "Accurate", required: true }
      ]
    },
    "employee-confidentiality": {
      title: "Employee Confidentiality & Conduct Agreement", cat: "employee",
      intro: "Please review and agree to our confidentiality & conduct terms.",
      fields: [
        NAME, EMAIL, { name: "Position", label: "Position / role", half: true },
        { consent: "I have read and agree to the confidentiality & conduct terms below.", name: "Agrees to confidentiality", required: true }
      ],
      terms: "<h4>Confidentiality</h4><p>I will keep confidential all client details, business information, supplier terms, pricing and any personal data I access, during and after my engagement with DecoMuse.</p><h4>Client privacy</h4><p>I will handle client information respectfully and only use it for DecoMuse work, in line with the Privacy Policy.</p><h4>Conduct</h4><p>I will represent DecoMuse professionally, care for client homes and property, and follow reasonable health & safety directions.</p><h4>Property</h4><p>Inventory, tools and materials remain DecoMuse property and will be returned on request.</p>"
    },
    "contractor-agreement": {
      title: "Contractor / Stylist Engagement Agreement", cat: "employee",
      intro: "For stylists & contractors engaged by DecoMuse.",
      fields: [
        NAME, EMAIL, PHONE, { name: "ABN", label: "ABN", half: true },
        { name: "Services provided", label: "Services you provide", type: "textarea" },
        { name: "Rate", label: "Agreed rate", half: true }, { name: "Start date", label: "Start date", type: "date", half: true },
        { consent: "I have read and agree to the contractor engagement terms below.", name: "Agrees to contractor terms", required: true }
      ],
      terms: "<h4>Engagement</h4><p>You are engaged as an independent contractor and are responsible for your own tax, superannuation and insurances.</p><h4>Services & rate</h4><p>You will provide the agreed services at the agreed rate, invoiced per completed job unless otherwise agreed.</p><h4>Confidentiality</h4><p>You will keep client and business information confidential during and after engagement.</p><h4>Care & conduct</h4><p>You will care for client homes and DecoMuse inventory and represent the brand professionally.</p>"
    },
    "employee-bank-super": {
      title: "Employee Bank & Superannuation Details", cat: "employee",
      intro: "Your payment & super details, kept strictly confidential.",
      fields: [
        NAME, EMAIL,
        { sec: "Bank account" },
        { name: "Account name", label: "Account name", half: true }, { name: "Bank name", label: "Bank name", half: true },
        { name: "BSB", label: "BSB", half: true }, { name: "Account number", label: "Account number", half: true },
        { sec: "Tax & super" },
        { name: "Tax File Number", label: "Tax File Number", half: true }, { name: "Super fund", label: "Superannuation fund", half: true },
        { name: "Super member number", label: "Super member number", half: true }, { name: "Super USI", label: "Fund USI (if known)", half: true },
        { consent: "These details are correct and I authorise DecoMuse to use them for payroll & superannuation.", name: "Authorises payroll details", required: true }
      ]
    },
    "policy-handbook-ack": {
      title: "Policy Handbook Acknowledgement", cat: "employee",
      intro: "Please confirm you've read and understood our workplace policies.",
      fields: [
        NAME, EMAIL, { name: "Position", label: "Position / role", half: true }, { name: "Date", label: "Date", type: "date", half: true },
        { consent: "I have read, understood and agree to abide by the DecoMuse policies summarised below.", name: "Acknowledges policies", required: true }
      ],
      terms: "<h4>Code of conduct</h4><p>Act professionally, honestly and respectfully toward clients, colleagues and suppliers.</p><h4>Work health & safety</h4><p>Follow safe work practices, report hazards &amp; incidents, and take care in client homes and the warehouse.</p><h4>Privacy &amp; confidentiality</h4><p>Protect client and business information and only use it for DecoMuse work.</p><h4>Equal opportunity</h4><p>DecoMuse is committed to a workplace free from discrimination, bullying and harassment.</p><h4>Social media &amp; brand</h4><p>Represent DecoMuse positively and never share confidential or client information online.</p><h4>Attendance</h4><p>Be reliable and communicate promptly about availability, delays or absences.</p>"
    }
  };

  window.DM_BUNDLES = {
    "client-onboarding": { label: "Client onboarding documents", forms: ["client-intake", "project-brief", "design-preferences", "service-agreement", "home-access-safety", "photo-release", "cancellation-ack"] },
    "employee-onboarding": { label: "Employee onboarding documents", forms: ["employee-onboarding", "employee-bank-super", "employee-emergency", "employee-confidentiality", "policy-handbook-ack"] }
  };
})();
