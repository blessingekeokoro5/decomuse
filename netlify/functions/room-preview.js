/* ============================================================
   Samira Home Decor — "See It in Your Room" (AI virtual staging)
   ------------------------------------------------------------
   Takes a shopper's room photo + a product image and returns an
   AI-generated preview with the product placed into the room,
   using Google Gemini 2.5 Flash Image ("Nano Banana").

   POST body (JSON):
     { room: "data:image/jpeg;base64,...", productImg: "<absolute url>", productName: "..." }

   Returns: { ok:true, image:"data:image/png;base64,..." }
     or     { ok:false, error:"..." }  (friendly message for the UI)

   Required env var (set in Netlify):  GEMINI_API_KEY
   Cost: ~US$0.04 per generated image. Nothing is stored.
   ============================================================ */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GEMINI || "";
const MODEL = "gemini-2.5-flash-image"; // image-capable (Nano Banana)

function json(statusCode, obj) {
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

// Split a data URL into { mime, data(base64) }
function parseDataUrl(s) {
  const m = /^data:([^;]+);base64,(.*)$/s.exec(String(s || ""));
  return m ? { mime: m[1], data: m[2] } : null;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, {});
  if (event.httpMethod !== "POST") return json(405, { ok: false, error: "Method Not Allowed" });

  if (!GEMINI_API_KEY) {
    return json(200, { ok: false, error: "Room preview isn't switched on yet. Please check back soon." });
  }

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { ok: false, error: "Bad request." }); }

  const room = parseDataUrl(body.room);
  if (!room) return json(400, { ok: false, error: "Please upload a room photo (JPG or PNG)." });
  // Guard payload size (base64) ~ keep well under Netlify's 6MB request limit
  if (room.data.length > 5_200_000) return json(413, { ok: false, error: "That photo is too large — please use a smaller image." });

  const productName = String(body.productName || "this product").slice(0, 160);

  // Fetch the product image and base64-encode it
  let productPart = null;
  try {
    if (body.productImg) {
      const ac = new AbortController();
      const t = setTimeout(() => ac.abort(), 6000);
      const r = await fetch(body.productImg, { signal: ac.signal });
      clearTimeout(t);
      if (r.ok) {
        const buf = Buffer.from(await r.arrayBuffer());
        const mime = r.headers.get("content-type") || "image/jpeg";
        productPart = { inline_data: { mime_type: mime, data: buf.toString("base64") } };
      }
    }
  } catch (e) { /* proceed without a product image if it can't be fetched */ }

  const prompt =
    "You are a photorealistic virtual interior-staging tool. The FIRST image is a photo of a customer's real room. " +
    (productPart
      ? `The SECOND image shows a home furniture / décor product: "${productName}". Edit the FIRST image to place this exact product naturally into the room. `
      : `Edit the FIRST image to add a "${productName}" naturally into the room. `) +
    "Match realistic size, perspective, lighting, shadows and reflections so it looks like it genuinely belongs there. " +
    "Keep the product's design, materials, colour and proportions exactly as shown. " +
    "Do not change the room's walls, floor, windows or ceiling beyond what is needed to place the product. " +
    "Return only the edited room photo.";

  const parts = [{ text: prompt }, { inline_data: { mime_type: room.mime, data: room.data } }];
  if (productPart) parts.push(productPart);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 9200); // stay under Netlify's sync 10s limit
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { responseModalities: ["IMAGE"] },
      }),
      signal: ac.signal,
    });
    clearTimeout(t);

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      if (res.status === 429) return json(200, { ok: false, error: "We're a little busy right now — please try again in a moment." });
      return json(200, { ok: false, error: "We couldn't create your preview this time. Please try another photo.", detail: detail.slice(0, 300) });
    }

    const j = await res.json();
    const out = (((j.candidates || [])[0] || {}).content || {}).parts || [];
    const imgPart = out.find((p) => p.inline_data || p.inlineData);
    const b64 = imgPart ? ((imgPart.inline_data && imgPart.inline_data.data) || (imgPart.inlineData && imgPart.inlineData.data)) : null;
    const mime = imgPart ? ((imgPart.inline_data && imgPart.inline_data.mime_type) || (imgPart.inlineData && imgPart.inlineData.mimeType) || "image/png") : "image/png";

    if (!b64) {
      return json(200, { ok: false, error: "The preview couldn't be generated for this photo. Try a clearer, well-lit room photo taken straight on." });
    }
    return json(200, { ok: true, image: `data:${mime};base64,${b64}` });
  } catch (e) {
    if (e.name === "AbortError") return json(200, { ok: false, error: "That took too long — please try again with a smaller or clearer photo." });
    return json(200, { ok: false, error: "Something went wrong creating your preview. Please try again." });
  }
};

