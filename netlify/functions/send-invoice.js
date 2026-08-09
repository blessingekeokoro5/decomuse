/* ============================================================
   DecoMuse — Send an invoice / filled form to a recipient (Brevo)
   ------------------------------------------------------------
   Emails a branded invoice (from DecoMuse Official, billed to the
   customer) with a payment-status badge and a paid/unpaid reminder,
   with a copy to the business inbox for your records.

   Endpoint: /.netlify/functions/send-invoice
   Env var:  BREVO_API_KEY = xkeysib-...   (same key as gift-card emails)

   Frontend POSTs: { email, name, title, fields:[[label,value],...] }
   ============================================================ */

const BREVO_API_KEY  = process.env.BREVO_API_KEY || "";
const SENDER_EMAIL   = process.env.SENDER_EMAIL || "decormuseofficial@outlook.com";
const SENDER_NAME    = process.env.SENDER_NAME || "DecoMuse";
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "decormuseofficial@outlook.com";
const SITE_URL       = process.env.SITE_URL || "https://www.decomuse.com.au";
const BIZ_PHONE      = process.env.BUSINESS_PHONE || "0451 609 398";
const ABN            = "41 991 812 955";

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
const money = (v) => {
  if (v == null || String(v).trim() === "") return "";
  const n = Number(String(v).replace(/[^0-9.\-]/g, ""));
  return isNaN(n) ? esc(v) : "$" + n.toFixed(2);
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return jsonResponse(200, {});
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method Not Allowed" });

  if (!BREVO_API_KEY) {
    return jsonResponse(200, { ok: false, fallback: true, reason: "Email service not configured yet." });
  }

  try {
    const { email, name, title, fields } = JSON.parse(event.body || "{}");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return jsonResponse(400, { error: "A valid recipient email is required." });
    }
    const heading = title || "Invoice";
    const map = {};
    (Array.isArray(fields) ? fields : []).forEach((p) => { if (p && p[0]) map[p[0]] = p[1]; });
    const g = (k) => (map[k] == null ? "" : String(map[k]));

    const isInvoice = /invoice/i.test(heading) || g("Total") || g("Invoice number");
    const logo = `${SITE_URL}/assets/logo.jpg`;

    // Business "from" block + logo — reused by both layouts
    const fromBlock = `
      <table role="presentation" width="100%"><tr>
        <td valign="top"><img src="${logo}" alt="DecoMuse" width="150" style="max-width:160px;height:auto"></td>
        <td valign="top" align="right" style="font-size:12px;color:#5a5049;line-height:1.7">
          <strong style="color:#47563B;font-size:15px">DecoMuse Official</strong><br>
          ABN ${ABN}<br>${esc(BUSINESS_EMAIL)}<br>${esc(BIZ_PHONE)}<br>${esc(SITE_URL.replace(/^https?:\/\//, ""))}
        </td>
      </tr></table>
      <div style="height:2px;background:#47563B;margin:14px 0 18px"></div>`;

    let inner;
    if (isInvoice) {
      const status = g("Status") || "Unpaid";
      const s = status.toLowerCase();
      const statusColor = s === "paid" ? "#47563B" : s === "overdue" ? "#b23a3a" : s.indexOf("partial") >= 0 ? "#C6A15B" : "#A5586A";
      const amtRow = (label, v, bold) => v ? `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#5a5049">${label}</td>
        <td align="right" style="padding:8px 0;border-bottom:1px solid #eee;${bold ? "font-weight:bold;font-size:16px;color:#2C2623" : "color:#2C2623"}">${money(v)}</td></tr>` : "";
      const due = g("Due date");
      const reminder = s === "paid"
        ? `<div style="margin-top:16px;background:#eef2e8;border-radius:10px;padding:12px 16px;font-size:13px;color:#47563B">✓ This invoice is marked <strong>paid</strong> — thank you!</div>`
        : `<div style="margin-top:16px;background:#fbeef0;border-radius:10px;padding:12px 16px;font-size:13px;color:#A5586A">⏰ <strong>Payment reminder:</strong> ${due ? "this invoice is due by <strong>" + esc(due) + "</strong>" : "please arrange payment at your earliest convenience"}${g("Invoice number") ? ", quoting reference <strong>" + esc(g("Invoice number")) + "</strong>" : ""}.</div>`;

      inner = `
        <table role="presentation" width="100%"><tr>
          <td valign="top">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A5586A">Bill to</div>
            <div style="font-size:14px;color:#2C2623;line-height:1.7;margin-top:4px">
              <strong>${esc(g("Client name")) || "&mdash;"}</strong><br>
              ${g("Client address") ? esc(g("Client address")) + "<br>" : ""}
              ${g("Client phone") ? esc(g("Client phone")) + "<br>" : ""}
              ${esc(email)}
            </div>
          </td>
          <td valign="top" align="right" style="font-size:13px;color:#2C2623;line-height:1.8">
            <div><span style="color:#8a7f77">Invoice&nbsp;#</span> <strong>${esc(g("Invoice number")) || "&mdash;"}</strong></div>
            <div><span style="color:#8a7f77">Date</span> ${esc(g("Invoice date")) || "&mdash;"}</div>
            <div><span style="color:#8a7f77">Due</span> ${esc(due) || "&mdash;"}</div>
            <div style="margin-top:8px"><span style="background:${statusColor};color:#fff;padding:5px 14px;border-radius:20px;font-size:12px;text-transform:uppercase;letter-spacing:1px">${esc(status)}</span></div>
          </td>
        </tr></table>
        ${g("Description") ? `<div style="margin:20px 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A5586A">Details</div><div style="font-size:14px;color:#2C2623;line-height:1.6;white-space:pre-wrap">${esc(g("Description"))}</div>` : ""}
        <table role="presentation" width="100%" style="margin-top:16px;border-collapse:collapse;font-size:14px">
          ${amtRow("Amount (ex GST)", g("Amount"))}
          ${amtRow("GST", g("GST"))}
          ${amtRow("Total (incl GST)", g("Total"), true)}
          ${amtRow("Amount paid", g("Amount paid"))}
          ${amtRow("Balance due", g("Balance due"), true)}
        </table>
        ${g("Payment details") ? `<div style="margin-top:18px;background:#F6EEE8;border-radius:10px;padding:14px 16px;font-size:13px;color:#5a5049"><strong style="color:#2C2623">Payment details</strong><br>${esc(g("Payment details")).replace(/\n/g, "<br>")}${g("Payment terms") ? "<br><em>Terms: " + esc(g("Payment terms")) + "</em>" : ""}</div>` : ""}
        ${reminder}`;
    } else {
      const rows = (Array.isArray(fields) ? fields : [])
        .filter((p) => p && p[1] != null && String(p[1]).trim() !== "" && !/^data:image\//.test(String(p[1])))
        .map((p) => `<tr><td style="padding:9px 0;border-bottom:1px solid #eee;color:#5a5049">${esc(p[0])}</td><td align="right" style="padding:9px 0;border-bottom:1px solid #eee;color:#2C2623">${esc(p[1])}</td></tr>`).join("");
      inner = `<p style="color:#5a5049;line-height:1.6">Hi${name ? " " + esc(name) : ""}, please find your ${esc(heading.toLowerCase())} below.</p>
        <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px">${rows}</table>`;
    }

    const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;color:#2C2623;padding:10px">
      ${fromBlock}
      ${inner}
      <p style="color:#8a7f77;font-size:12px;text-align:center;line-height:1.6;margin-top:22px">Thank you for choosing DecoMuse ✦<br>Questions? Just reply to this email.</p>
    </div>`;

    const subject = isInvoice
      ? `${heading}${g("Invoice number") ? " #" + g("Invoice number") : ""} — DecoMuse`
      : `${heading} — DecoMuse`;

    const payload = {
      sender: { name: "DecoMuse Official", email: SENDER_EMAIL },
      to: [{ email, name: name || undefined }],
      bcc: [{ email: BUSINESS_EMAIL }],
      replyTo: { email: BUSINESS_EMAIL, name: SENDER_NAME },
      subject,
      htmlContent: html,
    };

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text();
      return jsonResponse(502, { error: "Email service error.", detail });
    }
    return jsonResponse(200, { ok: true });
  } catch (err) {
    return jsonResponse(500, { error: err.message || "Unexpected error." });
  }
};
