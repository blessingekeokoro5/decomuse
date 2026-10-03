/* ============================================================
   Per-product link previews
   ------------------------------------------------------------
   WhatsApp, Facebook, iMessage and the rest read a page's head and
   never run its JavaScript. product.html builds itself in the
   browser, so every shared product link used to preview the same
   static photo.

   This edge function runs before the page is served, reads the id
   from the URL, and rewrites the title, description and image tags
   to that product's own. Photos are served through Netlify's image
   CDN as JPEG, because some chat apps still won't render WebP.
   ============================================================ */

const SITE = "https://samirahomedecor.com.au";
const FALLBACK_IMG = "/assets/og/sofa.jpg";

let indexCache = null;
let fetchedAt = 0;

async function shareIndex(request) {
  // cached per edge instance; refreshed every 10 minutes
  if (indexCache && Date.now() - fetchedAt < 600000) return indexCache;
  try {
    const res = await fetch(new URL("/share-index.json", request.url));
    if (res.ok) { indexCache = await res.json(); fetchedAt = Date.now(); }
  } catch (_) { /* fall through to whatever is cached, or nothing */ }
  return indexCache || {};
}

function money(n) {
  if (n == null) return "";
  return "$" + Number(n).toLocaleString("en-AU", { maximumFractionDigits: 0 });
}

export default async function handler(request, context) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const response = await context.next();

  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  const index = await shareIndex(request);
  const product = id && index[id];

  // A JPEG at a sensible size, built on the fly by Netlify's image CDN.
  const raw = product && product.i ? "/" + product.i.replace(/^\//, "") : FALLBACK_IMG;
  const image = `${SITE}/.netlify/images?url=${encodeURIComponent(raw)}&w=1200&h=630&fit=cover&fm=jpg&q=82`;

  const title = product
    ? `${product.n}${product.p ? " — " + money(product.p) : ""} | Samira Home Decor`
    : "Samira Home Decor";
  const description = product && product.d
    ? product.d
    : "Home décor for every house — furniture, lighting, rugs and gifting, delivered Australia-wide.";
  const pageUrl = product ? `${SITE}/product.html?id=${encodeURIComponent(id)}` : `${SITE}/`;

  return new HTMLRewriter()
    .on('meta[property="og:image"]', { element: (e) => e.setAttribute("content", image) })
    .on('meta[name="twitter:image"]', { element: (e) => e.setAttribute("content", image) })
    .on('meta[property="og:title"]', { element: (e) => e.setAttribute("content", title) })
    .on('meta[property="og:description"]', { element: (e) => e.setAttribute("content", description) })
    .on('meta[name="description"]', { element: (e) => e.setAttribute("content", description) })
    .on('meta[property="og:url"]', { element: (e) => e.setAttribute("content", pageUrl) })
    .on("title", {
      element: (e) => { e.setInnerContent(title); }
    })
    .transform(response);
}

export const config = { path: "/product.html" };
