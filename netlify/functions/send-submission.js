/* ============================================================
   Samira Home Decor — Branded form submissions (Netlify Function, Brevo)
   ------------------------------------------------------------
   For any website form (Contact, Booking, Careers, Supplier,
   Reviews, etc.). Sends TWO branded (blue + gold) emails:
     1. A notification to the business inbox with every field,
        with Reply-To set to the customer so you can reply直接ly.
     2. A confirmation to the customer: "we've received your message".

   The frontend (js/main.js → deliverForm) POSTs this FIRST. If the
   key isn't set or Brevo errors, it returns {fallback:true} / an
   error so the frontend falls back to Web3Forms, then mailto —
   so a submission can never be lost.

   Endpoint (after deploy):
     /.netlify/functions/send-submission

   Required env var (set in Netlify):  BREVO_API_KEY
   Optional: SENDER_EMAIL, SENDER_NAME, BUSINESS_EMAIL, SITE_URL

   POST body:
     { subject, fields:[[label,value],...], replyto, name }
   ============================================================ */

const BREVO_API_KEY  = process.env.BREVO_API_KEY || "";
const SENDER_EMAIL   = process.env.SENDER_EMAIL || "hello@samirahomedecor.com.au";
const SENDER_NAME    = process.env.SENDER_NAME || "Samira Home Decor";
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "hello@samirahomedecor.com.au";
const SITE_URL       = process.env.SITE_URL || "https://samirahomedecor.com.au";

function jsonResponse(statusCode, obj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(obj),
  };
}

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const isEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(s || ""));

// Shared branded header: blue banner + gold accent bar — matches the order email
function brandHeader(title, subtitle) {
  return `
    <div style="text-align:center;padding:22px 0 6px">
      <div style="font-family:Georgia,serif;font-size:28px;font-weight:bold;letter-spacing:3px;color:#14365F">Samira Home Decor</div>
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a7f77">Home décor for every house</div>
    </div>
    <div style="background:#14365F;color:#fff;border-radius:14px;padding:24px 28px;text-align:center;border-bottom:4px solid #C6A15B">
      <div style="font-size:22px;font-family:Georgia,serif">${esc(title)}</div>
      ${subtitle ? `<p style="color:#E0C992;margin:8px 0 0">${esc(subtitle)}</p>` : ""}
    </div>`;
}

const wrap = (inner, maxw) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;max-width:${maxw || 560}px;margin:0 auto;color:#0B1F3A;padding:8px">${inner}</div>`;

// Rich, Luxo-style welcome email for new newsletter subscribers (rebranded to Samira Home Decor)
function welcomeHtml(name, code, discountLabel) {
  const S = SITE_URL;
  const A = S + "/assets/";
  // SYS_Samira brand palette
  const NAVY = "#0B1F3A", MID = "#061525", GOLD = "#C6A15B", CHAMP = "#E0C992",
        IVORY = "#F4EFE6", CREAM = "#E8DCC8", TAUPE = "#A89886", BODY = "#4B4540";
  const gBtn = (url, label, dark) =>
    `<a href="${url}" style="display:inline-block;background:${dark ? NAVY : GOLD};color:${dark ? "#fff" : NAVY};text-decoration:none;padding:12px 26px;border-radius:30px;font-weight:bold;font-size:14px">${esc(label)}</a>`;
  const card = (img, title, sub, url) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:${IVORY};border-radius:14px;overflow:hidden;margin:0 0 12px">
      <tr>
        <td width="150" style="padding:0"><img src="${img}" width="150" alt="${esc(title)}" style="display:block;width:150px;height:140px;object-fit:cover"></td>
        <td style="padding:14px 16px;vertical-align:middle">
          <div style="font:bold 17px Georgia,serif;color:${NAVY}">${esc(title)}</div>
          <div style="color:${TAUPE};font-size:12.5px;margin:4px 0 11px;line-height:1.5">${esc(sub)}</div>
          ${gBtn(url, "Shop now", true)}
        </td>
      </tr>
    </table>`;
  const review = (stars, text, who) =>
    `<div style="background:#fff;border:1px solid ${CREAM};border-radius:12px;padding:16px 18px;margin:0 0 12px;text-align:center">
      <div style="color:${GOLD};font-size:17px;letter-spacing:2px">${"★".repeat(stars)}</div>
      <div style="color:${NAVY};font-size:14px;margin:7px 0 4px">${esc(text)}</div>
      <div style="color:${TAUPE};font-size:12px;font-weight:bold">${esc(who)}</div>
    </div>`;
  const trust = (emoji, label, sub) =>
    `<td width="20%" style="padding:4px;text-align:center;vertical-align:top">
      <div style="font-size:22px;line-height:1">${emoji}</div>
      <div style="color:#fff;font-size:11px;font-weight:bold;margin-top:7px;line-height:1.3">${esc(label)}</div>
      <div style="color:${CHAMP};font-size:9.5px;line-height:1.35;margin-top:3px">${esc(sub)}</div>
    </td>`;
  const soc = (url, label) => `<a href="${url}" style="color:${GOLD};text-decoration:none;font-size:12px;white-space:nowrap">${esc(label)}</a>`;
  const pay = (nm, color) => `<span style="display:inline-block;background:#fff;color:${color};font-weight:bold;font-size:11px;padding:6px 10px;border-radius:5px;margin:3px">${esc(nm)}</span>`;

  return wrap(`
    <!-- brand header -->
    <div style="text-align:center;padding:20px 0 12px">
      <div style="font-family:Georgia,serif;font-size:27px;font-weight:bold;color:${NAVY}">Samira Home Decor</div>
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${TAUPE};margin-top:4px">Home décor for every house</div>
    </div>
    <!-- welcome banner -->
    <div style="background:${NAVY};border-radius:14px;padding:24px;text-align:center;border-bottom:4px solid ${GOLD}">
      <div style="font:22px Georgia,serif;color:#fff">Welcome to Samira Home Decor ✦</div>
      <div style="color:${CHAMP};margin-top:7px;font-size:14px">Your ${esc(discountLabel)}</div>
    </div>
    <!-- hero photo -->
    <img src="${A}hero.jpg" width="100%" alt="Samira Home Decor styled living space" style="display:block;width:100%;border-radius:14px;margin-top:16px">
    <!-- code -->
    <p style="color:${BODY};line-height:1.7;margin-top:22px">Hi${name ? " " + esc(name) : " there"},</p>
    <p style="color:${BODY};line-height:1.7">Thanks for joining the <strong>Samira Home Decor</strong> community. To help you get started, here's your exclusive <strong>${esc(discountLabel)}</strong> code:</p>
    <div style="text-align:center;margin:18px 0">
      <div style="display:inline-block;background:${IVORY};border:2px dashed ${GOLD};border-radius:12px;padding:16px 34px;font:bold 26px/1 Georgia,serif;letter-spacing:4px;color:${NAVY}">${esc(code)}</div>
    </div>
    <div style="text-align:center;margin:18px 0">${gBtn(S + "/shop.html", "Claim your discount now")}</div>
    <p style="color:${TAUPE};font-size:12px;text-align:center;line-height:1.6">Enter <strong>${esc(code)}</strong> at checkout to apply it to your first order. Applies to your items (excludes shipping). One use per customer · T&amp;Cs apply.</p>
    <!-- subscriber perks -->
    <div style="background:${IVORY};border-radius:14px;padding:18px 22px;margin:22px 0">
      <div style="font:bold 17px Georgia,serif;color:${NAVY};text-align:center;margin-bottom:10px">As a subscriber, you'll also enjoy</div>
      <ul style="color:${BODY};font-size:14px;line-height:1.9;margin:0;padding-left:20px">
        <li>Early access to new collections</li>
        <li>Exclusive offers and member-only events</li>
        <li>Styling ideas to elevate your spaces</li>
        <li>Delivery updates and seamless shopping</li>
      </ul>
    </div>
    <!-- category cards -->
    <div style="font:bold 20px Georgia,serif;color:${NAVY};text-align:center;margin:26px 0 16px">Design the space you deserve</div>
    ${card(A + "hero-slide-1.jpg", "Living room bliss", "Sofas, lounges & coffee tables", S + "/living-room.html")}
    ${card(A + "cat-home-decor.jpg", "Home décor accents", "Vases, mirrors, wall art & candles", S + "/home-decor.html")}
    ${card(A + "about-collective.jpg", "Dining delights", "Tables, chairs & console sets", S + "/dining.html")}
    ${card(A + "hero-slide-7.jpg", "Bedroom sanctuary", "Styling and finishing touches", S + "/bedroom.html")}
    <p style="text-align:center;color:${BODY};font-size:14px;line-height:1.7;margin:22px 0">Cheers to creating a home you'll love,<br><strong>— The Samira Home Decor Team</strong></p>
    <!-- reviews -->
    <div style="font:bold 19px Georgia,serif;color:${NAVY};text-align:center;margin:26px 0 4px">What people say about us</div>
    <p style="text-align:center;color:${TAUPE};font-size:13px;margin:0 0 16px">Real words from our shoppers</p>
    ${review(5, "Beautiful pieces and so well packaged — my living room feels brand new.", "Amara T.")}
    ${review(5, "Gorgeous quality and quick, friendly service. Will shop again!", "Jade M.")}
    <!-- referral: Share the savings -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:${IVORY};border-radius:14px;overflow:hidden;margin:22px 0">
      <tr>
        <td width="160" style="padding:0"><img src="${A}products/bt01-5.webp" width="160" alt="Samira Home Decor product" style="display:block;width:160px;height:172px;object-fit:cover"></td>
        <td style="padding:16px 18px;vertical-align:middle">
          <div style="font:bold 19px Georgia,serif;color:${NAVY}">Refer a friend, get 40% off</div>
          <div style="font-weight:bold;color:${GOLD};font-size:14px;margin:3px 0">40% off your next order</div>
          <div style="color:${TAUPE};font-size:12.5px;margin:4px 0 12px;line-height:1.5">When your friend books a service or makes their first purchase, you get 40% off your next service or order.</div>
          ${gBtn(S + "/refer-a-friend.html", "Refer a friend")}
        </td>
      </tr>
    </table>
    <!-- trust row (navy band, icon columns) -->
    <div style="background:${NAVY};border-radius:14px;padding:20px 8px;margin:22px 0;border-bottom:4px solid ${GOLD}">
      <div style="color:#fff;text-align:center;font:bold 15px Georgia,serif;margin-bottom:14px">Shop with confidence @ Samira Home Decor</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        ${trust("🎧", "Here to help", "Message us any time")}
        ${trust("🚚", "Fast dispatch", "Carefully packed")}
        ${trust("🔒", "Secure checkout", "Encrypted payments")}
        ${trust("↩️", "Easy returns", "Simple process")}
        ${trust("💳", "Flexible pay", "Afterpay · Zip · card")}
      </tr></table>
    </div>
    <!-- footer (navy band) -->
    <div style="background:${MID};border-radius:14px;padding:26px 22px;text-align:center">
      <div style="font-family:Georgia,serif;font-size:21px;letter-spacing:1px;color:#fff">Samira Home Decor</div>
      <div style="margin:12px 0 10px">
        ${soc("https://www.instagram.com/samirahomedecor", "Instagram")} <span style="color:${TAUPE}">·</span>
        ${soc("https://www.facebook.com/share/17aCKqQ3ns/?mibextid=wwXIfr", "Facebook")} <span style="color:${TAUPE}">·</span>
        ${soc("https://www.tiktok.com/@sys_samira", "TikTok")} <span style="color:${TAUPE}">·</span>
        ${soc("https://www.youtube.com/@sys_samira", "YouTube")}
      </div>
      <div style="color:${TAUPE};font-size:11px;margin-bottom:14px">© ${new Date().getFullYear()} Samira Home Decor. All rights reserved.</div>
      <div>
        ${pay("VISA", "#1a1f71")}${pay("Mastercard", "#c8102e")}${pay("AMEX", "#2e77bb")}${pay("afterpay", "#111111")}${pay("Zip", "#6a3fb5")}
      </div>
    </div>
    <!-- unsubscribe strip -->
    <div style="text-align:center;color:${TAUPE};font-size:11px;line-height:1.8;padding:14px 8px">
      No longer want to receive these emails? <a href="mailto:hello@samirahomedecor.com.au?subject=Unsubscribe" style="color:${TAUPE}">Unsubscribe</a>.<br>
      Samira Home Decor · Australia · You subscribed at samirahomedecor.com.au
    </div>
  `, 600);
}

async function sendBrevo(payload) {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Add / update a subscriber in Brevo contacts (and the newsletter list, if BREVO_LIST_ID is set).
async function addBrevoContact(email, attributes) {
  if (!BREVO_API_KEY || !isEmail(email)) return;
  const listId = parseInt(process.env.BREVO_LIST_ID || "0", 10);
  const body = { email, updateEnabled: true };
  if (attributes) body.attributes = attributes;
  if (listId) body.listIds = [listId];
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) { /* best effort */ }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return jsonResponse(200, {});
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });

  // No key yet → tell the frontend to fall back to Web3Forms.
  if (!BREVO_API_KEY) return jsonResponse(200, { ok: false, fallback: true, reason: "Email service not configured yet." });

  try {
    const data = JSON.parse(event.body || "{}");
    const subject = data.subject || "New website enquiry — Samira Home Decor";
    let fields = Array.isArray(data.fields) ? data.fields : [];
    // Accept either [[k,v]...] or a plain object {k:v}
    if (!fields.length && data.fields && typeof data.fields === "object") fields = Object.entries(data.fields);
    fields = fields.filter((p) => Array.isArray(p) && p[0] != null && String(p[1] == null ? "" : p[1]).trim() !== "");

    // Derive customer email / name from the submitted fields if not given explicitly
    const replyto = data.replyto || (fields.find((p) => /e-?mail/i.test(p[0])) || [])[1] || "";
    const name = data.name || (fields.find((p) => /name/i.test(p[0])) || [])[1] || "";

    // ---- 1) Business notification (branded) ----
    const rows = fields.map(([k, v]) => `
      <tr>
        <td style="padding:10px 14px 10px 0;border-bottom:1px solid #eee;color:#8a7f77;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#0B1F3A;font-size:14px;white-space:pre-wrap">${esc(v)}</td>
      </tr>`).join("");

    const bizHtml = wrap(`
      ${brandHeader("New website submission", subject)}
      <table role="presentation" width="100%" style="margin-top:20px;border-collapse:collapse">${rows}</table>
      <div style="background:#F6EEE8;border-radius:12px;padding:14px 18px;margin-top:20px;font-size:13px;color:#5a5049;line-height:1.6">
        📩 ${replyto ? `Reply straight to this email to respond to <strong>${esc(replyto)}</strong>.` : "Submitted via the Samira Home Decor website."}
      </div>
      <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6;margin-top:18px">Sent from the Samira Home Decor website · samirahomedecor.com.au</p>
    `);

    const bizPayload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: BUSINESS_EMAIL }],
      subject,
      htmlContent: bizHtml,
    };
    if (isEmail(replyto)) bizPayload.replyTo = { email: replyto, name: name || undefined };

    const bizRes = await sendBrevo(bizPayload);
    if (!bizRes.ok) {
      const detail = await bizRes.text();
      // Let the frontend fall back to Web3Forms so the enquiry is never lost.
      return jsonResponse(502, { error: "Email service error.", detail, fallback: true });
    }

    // ---- 2) Customer confirmation (branded) — best effort ----
    if (isEmail(replyto) && data.welcomeCode) {
      // New newsletter subscriber → save to Brevo contacts/list for the weekly email
      await addBrevoContact(replyto, { FIRSTNAME: name || "", SOURCE: "Welcome popup" });
      // Rich welcome email for newsletter subscribers
      try {
        await sendBrevo({
          sender: { name: SENDER_NAME, email: SENDER_EMAIL },
          to: [{ email: replyto, name: name || undefined }],
          replyTo: { email: BUSINESS_EMAIL, name: SENDER_NAME },
          subject: data.customerSubject || ((data.discountLabel || "Your welcome") + " — Samira Home Decor"),
          htmlContent: welcomeHtml(name, data.welcomeCode, data.discountLabel || "10% off your first order"),
        });
      } catch (e) { /* best effort */ }
    } else if (isEmail(replyto)) {
      // Optional itemised summary (e.g. a cleaning quote estimate) to show the customer
      let summary = Array.isArray(data.summary) ? data.summary : [];
      summary = summary.filter((p) => Array.isArray(p) && p[0] != null && String(p[1] == null ? "" : p[1]).trim() !== "");

      let custHtml, custSubject;
      if (summary.length) {
        // Quote / estimate style confirmation: show the breakdown
        const sRows = summary.map(([k, v], i) => {
          const isTotal = /total/i.test(String(k));
          return `<tr>
            <td style="padding:10px 14px 10px 0;border-bottom:1px solid #eee;color:${isTotal ? "#0B1F3A" : "#8a7f77"};font-size:${isTotal ? "15px" : "13px"};${isTotal ? "font-weight:bold;" : ""}vertical-align:top;white-space:nowrap">${esc(k)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#0B1F3A;font-size:${isTotal ? "16px" : "14px"};${isTotal ? "font-weight:bold;" : ""}text-align:right;white-space:pre-wrap">${esc(v)}</td>
          </tr>`;
        }).join("");
        custSubject = data.customerSubject || "Your cleaning estimate — Samira Home Decor";
        custHtml = wrap(`
          ${brandHeader(data.customerHeading || "Your cleaning estimate ✦", "")}
          <p style="color:#5a5049;line-height:1.7;margin-top:20px">Hi${name ? " " + esc(name) : ""},</p>
          <p style="color:#5a5049;line-height:1.7">${esc(data.customerLead || "Thank you for your enquiry. Here's your estimated quote based on the details you gave us:")}</p>
          <table role="presentation" width="100%" style="margin-top:14px;border-collapse:collapse">${sRows}</table>
          <div style="background:#F6EEE8;border-radius:12px;padding:14px 18px;margin-top:18px;font-size:13px;color:#5a5049;line-height:1.6">
            This is an <strong>estimate only</strong> and not a final invoice. Your final price and time are confirmed when you book — a member of our Adelaide team will be in touch <strong>within 2 business hours</strong> (on business days) to confirm your quote and lock in a date.
          </div>
          <div style="text-align:center;margin:24px 0">
            <a href="${SITE_URL}/cleaning-services.html#book" style="background:#C6A15B;color:#fff;text-decoration:none;padding:13px 28px;border-radius:30px;font-weight:bold">Book your clean</a>
          </div>
          <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6">Questions? Just reply to this email or call 0451 609 398.<br>Warm regards, The Samira Home Decor team 💛</p>
        `);
      } else {
        custSubject = "We've received your message — Samira Home Decor";
        custHtml = wrap(`
          ${brandHeader("We've received your message ✦", "")}
          <p style="color:#5a5049;line-height:1.7;margin-top:20px">Hi${name ? " " + esc(name) : ""},</p>
          <p style="color:#5a5049;line-height:1.7">Thank you for reaching out to <strong>Samira Home Decor</strong>. We've received your message and a member of our Australian-based team will get back to you <strong>within 2 business hours</strong> (during business days).</p>
          <p style="color:#5a5049;line-height:1.7">In the meantime, feel free to keep exploring our collection.</p>
          <div style="text-align:center;margin:24px 0">
            <a href="${SITE_URL}/shop.html" style="background:#C6A15B;color:#fff;text-decoration:none;padding:13px 28px;border-radius:30px;font-weight:bold">Browse the shop</a>
          </div>
          <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6">If you didn't contact us, you can ignore this email.<br>Warm regards, The Samira Home Decor team 💛</p>
        `);
      }
      try {
        await sendBrevo({
          sender: { name: SENDER_NAME, email: SENDER_EMAIL },
          to: [{ email: replyto, name: name || undefined }],
          replyTo: { email: BUSINESS_EMAIL, name: SENDER_NAME },
          subject: custSubject,
          htmlContent: custHtml,
        });
      } catch (e) { /* confirmation is best-effort; business copy already sent */ }
    }

    return jsonResponse(200, { ok: true });
  } catch (err) {
    return jsonResponse(500, { error: err.message || "Unexpected error.", fallback: true });
  }
};
