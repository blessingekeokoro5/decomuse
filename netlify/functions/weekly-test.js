/* TEMPORARY diagnostic for the weekly email — remove after use.
   GET/POST /.netlify/functions/weekly-test?token=shd-weekly-diag
   Reports env, list subscriber count, and a DRAFT campaign create result
   (draft = not sent) so we can see the exact Brevo error. */

const wf = require("./weekly-email.js");

const KEY = process.env.BREVO_API_KEY || "";
const LIST_ID = parseInt(process.env.BREVO_LIST_ID || "0", 10);
const SENDER_EMAIL = process.env.SENDER_EMAIL || "hello@samirahomedecor.com.au";
const SENDER_NAME = process.env.SENDER_NAME || "Samira Home Decor";

const json = (code, obj) => ({ statusCode: code, headers: { "Content-Type": "application/json" }, body: JSON.stringify(obj, null, 2) });

async function brevo(path, method, body) {
  const res = await fetch("https://api.brevo.com/v3/" + path, {
    method,
    headers: { "api-key": KEY, "Content-Type": "application/json", "Accept": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text().catch(() => "");
  let data; try { data = JSON.parse(text); } catch (e) { data = text; }
  return { status: res.status, ok: res.ok, data };
}

exports.handler = async (event) => {
  const token = (event.queryStringParameters && event.queryStringParameters.token) || "";
  if (token !== "shd-weekly-diag") return json(403, { error: "forbidden" });

  const out = { hasKey: !!KEY, listId: LIST_ID, sender: SENDER_EMAIL };
  if (!KEY) return json(200, { ...out, verdict: "BREVO_API_KEY missing" });
  if (!LIST_ID) return json(200, { ...out, verdict: "BREVO_LIST_ID not set" });

  // 1) list details (subscriber count)
  const list = await brevo("contacts/lists/" + LIST_ID, "GET");
  out.list = list.ok ? { name: list.data.name, total: list.data.totalSubscribers, blacklisted: list.data.totalBlacklisted } : { error: list.status, detail: list.data };

  // 2) verified senders
  const senders = await brevo("senders", "GET");
  out.senders = senders.ok ? (senders.data.senders || []).map(s => ({ email: s.email, active: s.active })) : { error: senders.status, detail: senders.data };

  // 3) try creating a DRAFT campaign (not sent) to surface any blocking error
  try {
    const P = await wf.loadProducts();
    const html = wf.buildHtml(wf.pickFeatured(P, 4));
    const create = await brevo("emailCampaigns", "POST", {
      name: "Samira Weekly TEST (draft) " + Date.now(),
      subject: "Weekly test (draft)",
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      type: "classic",
      htmlContent: html,
      recipients: { listIds: [LIST_ID] },
    });
    out.campaignCreate = { status: create.status, ok: create.ok, detail: create.ok ? { id: create.data.id } : create.data };
  } catch (e) { out.campaignCreate = { error: e.message }; }

  out.verdict = "see fields above";
  return json(200, out);
};
