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
  const gBtn = (url, label, dark) =>
    `<a href="${url}" style="display:inline-block;background:${dark ? "#14365F" : "#C6A15B"};color:${dark ? "#fff" : "#0B1F3A"};text-decoration:none;padding:12px 26px;border-radius:30px;font-weight:bold;font-size:14px">${esc(label)}</a>`;
  const card = (img, title, sub, url) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:#F6EEE8;border-radius:14px;overflow:hidden;margin:0 0 12px">
      <tr>
        <td width="150" style="padding:0"><img src="${img}" width="150" alt="${esc(title)}" style="display:block;width:150px;height:140px;object-fit:cover"></td>
        <td style="padding:14px 16px;vertical-align:middle">
          <div style="font:bold 17px Georgia,serif;color:#0B1F3A">${esc(title)}</div>
          <div style="color:#6E675C;font-size:12.5px;margin:4px 0 11px;line-height:1.5">${esc(sub)}</div>
          ${gBtn(url, "Shop now", true)}
        </td>
      </tr>
    </table>`;
  const review = (stars, text, who) =>
    `<div style="background:#fff;border:1px solid #E6DCC9;border-radius:12px;padding:16px 18px;margin:0 0 12px;text-align:center">
      <div style="color:#C6A15B;font-size:17px;letter-spacing:2px">${"★".repeat(stars)}</div>
      <div style="color:#0B1F3A;font-size:14px;margin:7px 0 4px">${esc(text)}</div>
      <div style="color:#8a7f77;font-size:12px;font-weight:bold">${esc(who)}</div>
    </div>`;

  return wrap(`
    <!-- promo strip -->
    <div style="background:#0B1F3A;color:#E0C992;text-align:center;padding:12px 16px;border-radius:12px;font-size:14px;font-weight:bold">
      Welcome gift unlocked — ${esc(discountLabel)} 🎉
    </div>
    <!-- brand header -->
    <div style="text-align:center;padding:22px 0 10px">
      <div style="font-family:Georgia,serif;font-size:26px;font-weight:bold;letter-spacing:3px;color:#14365F">SAMIRA HOME DECOR</div>
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a7f77">Home décor for every house</div>
      <div style="margin-top:12px;font-size:12px;letter-spacing:1px;color:#6E675C">
        <a href="${S}/living-room.html" style="color:#6E675C;text-decoration:none;margin:0 7px">LIVING ROOM</a>·
        <a href="${S}/home-decor.html" style="color:#6E675C;text-decoration:none;margin:0 7px">HOME DÉCOR</a>·
        <a href="${S}/dining.html" style="color:#6E675C;text-decoration:none;margin:0 7px">DINING</a>
      </div>
    </div>
    <!-- hero -->
    <img src="${A}hero.jpg" width="100%" alt="Samira Home Decor styled living space" style="display:block;width:100%;border-radius:14px 14px 0 0">
    <div style="background:#14365F;color:#fff;border-radius:0 0 14px 14px;padding:22px;text-align:center;border-bottom:4px solid #C6A15B">
      <div style="font:22px Georgia,serif">Welcome to Samira Home Decor</div>
      <div style="color:#E0C992;margin:6px 0 14px">+ your ${esc(discountLabel)}</div>
      ${gBtn(S + "/shop.html", "Claim my " + discountLabel.replace(" your first order", "") + " now")}
    </div>
    <!-- code -->
    <p style="color:#5a5049;line-height:1.7;margin-top:22px">Hi${name ? " " + esc(name) : " there"},</p>
    <p style="color:#5a5049;line-height:1.7">Thanks for joining the <strong>Samira Home Decor</strong> community. To help you get started, here's your exclusive <strong>${esc(discountLabel)}</strong> code:</p>
    <div style="text-align:center;margin:18px 0">
      <div style="display:inline-block;background:#F6EEE8;border:2px dashed #C6A15B;border-radius:12px;padding:16px 34px;font:bold 26px/1 Georgia,serif;letter-spacing:4px;color:#14365F">${esc(code)}</div>
    </div>
    <div style="text-align:center;margin:18px 0">${gBtn(S + "/shop.html", "Claim your discount now")}</div>
    <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6">Enter <strong>${esc(code)}</strong> at checkout to apply it to your first order. Applies to your items (excludes shipping). One use per customer · T&amp;Cs apply.</p>
    <!-- subscriber perks -->
    <div style="background:#F6EEE8;border-radius:14px;padding:18px 22px;margin:22px 0">
      <div style="font:bold 17px Georgia,serif;color:#0B1F3A;text-align:center;margin-bottom:10px">As a subscriber, you'll also enjoy</div>
      <ul style="color:#5a5049;font-size:14px;line-height:1.9;margin:0;padding-left:20px">
        <li>Early access to new collections</li>
        <li>Exclusive offers and member-only events</li>
        <li>Styling ideas to elevate your spaces</li>
        <li>Delivery updates and seamless shopping</li>
      </ul>
    </div>
    <!-- category cards -->
    <div style="font:bold 20px Georgia,serif;color:#0B1F3A;text-align:center;margin:26px 0 16px">Design the space you deserve</div>
    ${card(A + "hero-slide-1.jpg", "Living room bliss", "Sofas, lounges & coffee tables", S + "/living-room.html")}
    ${card(A + "cat-home-decor.jpg", "Home décor accents", "Vases, mirrors, wall art & candles", S + "/home-decor.html")}
    ${card(A + "about-collective.jpg", "Dining delights", "Tables, chairs & console sets", S + "/dining.html")}
    ${card(A + "hero-slide-7.jpg", "Bedroom sanctuary", "Styling and finishing touches", S + "/bedroom.html")}
    <p style="text-align:center;color:#5a5049;font-size:14px;line-height:1.7;margin:22px 0">Cheers to creating a home you'll love,<br><strong>— The Samira Home Decor Team</strong></p>
    <!-- reviews -->
    <div style="font:bold 19px Georgia,serif;color:#0B1F3A;text-align:center;margin:26px 0 4px">What people say about us</div>
    <p style="text-align:center;color:#8a7f77;font-size:13px;margin:0 0 16px">Real words from our shoppers</p>
    ${review(5, "Beautiful pieces and so well packaged — my living room feels brand new.", "Amara T.")}
    ${review(5, "Gorgeous quality and quick, friendly service. Will shop again!", "Jade M.")}
    <!-- referral -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;background:#F6EEE8;border-radius:14px;overflow:hidden;margin:22px 0">
      <tr>
        <td width="150" style="padding:0"><img src="${A}about-studio.png" width="150" alt="Refer a friend" style="display:block;width:150px;height:150px;object-fit:cover"></td>
        <td style="padding:16px 18px;vertical-align:middle">
          <div style="font:bold 18px Georgia,serif;color:#0B1F3A">Share the love</div>
          <div style="color:#6E675C;font-size:13px;margin:5px 0 12px;line-height:1.5">Refer a friend and you'll both be rewarded on their first order.</div>
          ${gBtn(S + "/refer-a-friend.html", "Refer a friend", true)}
        </td>
      </tr>
    </table>
    <!-- trust -->
    <div style="border-top:1px solid #E6DCC9;border-bottom:1px solid #E6DCC9;padding:16px 0;margin:22px 0;text-align:center;color:#6E675C;font-size:12.5px;line-height:2">
      <strong style="color:#0B1F3A">Shop with confidence</strong><br>
      🇦🇺 Australian owned &nbsp;·&nbsp; 🔒 Secure checkout &nbsp;·&nbsp; 💳 Afterpay, Zip &amp; card<br>
      ↩️ Easy returns &nbsp;·&nbsp; ✉️ Here to help: hello@samirahomedecor.com.au
    </div>
    <!-- footer -->
    <div style="text-align:center;padding:8px 0 4px">
      <div style="font-family:Georgia,serif;font-size:18px;letter-spacing:2px;color:#14365F">SAMIRA HOME DECOR</div>
      <div style="margin:10px 0;font-size:13px">
        <a href="https://www.instagram.com/samirahomedecor" style="color:#14365F;text-decoration:none;margin:0 6px">Instagram</a>·
        <a href="https://www.facebook.com/share/17aCKqQ3ns/?mibextid=wwXIfr" style="color:#14365F;text-decoration:none;margin:0 6px">Facebook</a>·
        <a href="https://www.tiktok.com/@sys_samira" style="color:#14365F;text-decoration:none;margin:0 6px">TikTok</a>·
        <a href="https://www.youtube.com/@sys_samira" style="color:#14365F;text-decoration:none;margin:0 6px">YouTube</a>
      </div>
      <div style="color:#8a7f77;font-size:12px;line-height:1.7">Visa · Mastercard · Amex · Apple Pay · Afterpay · Zip<br>
      © ${new Date().getFullYear()} Samira Home Decor · ABN 41 991 812 955 · AUD, no GST charged<br>
      You're receiving this because you subscribed at samirahomedecor.com.au.</div>
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
