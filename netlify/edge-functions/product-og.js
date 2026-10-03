/* ============================================================
   Per-product link previews
   ------------------------------------------------------------
   WhatsApp, Facebook, iMessage and the rest read a page's head and
   never run its JavaScript. product.html builds itself in the
   browser, so without this every shared product link previews the
   same photo.

   This rewrites the title, description and image tags per product
   before the page is served. Photos go through Netlify's image CDN
   as JPEG, because some chat apps still won't render WebP.

   Everything is wrapped so that if anything here fails, the page is
   served untouched. A broken preview is a nuisance; a broken product
   page is lost business.
   ============================================================ */

const SITE = "https://samirahomedecor.com.au";
const FALLBACK_IMG = "/assets/og/sofa.jpg";

let indexCache = null;
let fetchedAt = 0;

async function shareIndex(request) {
  if (indexCache && Date.now() - fetchedAt < 600000) return indexCache;
  const res = await fetch(new URL("/share-index.json", request.url));
  if (res.ok) { indexCache = await res.json(); fetchedAt = Date.now(); }
  return indexCache || {};
}

const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function money(n) {
  if (n == null) return "";
  return "$" + Number(n).toLocaleString("en-AU", { maximumFractionDigits: 0 });
}

export default async function handler(request, context) {
  const response = await context.next();
  let html = null;
  try {
    const type = response.headers.get("content-type") || "";
    if (!type.includes("text/html")) return response;

    const id = new URL(request.url).searchParams.get("id");
    if (!id) return response;

    const index = await shareIndex(request);
    const product = index[id];
    if (!product) return response;

    const raw = product.i ? "/" + String(product.i).replace(/^\//, "") : FALLBACK_IMG;
    const image = `${SITE}/.netlify/images?url=${encodeURIComponent(raw)}&w=1200&h=630&fit=cover&fm=jpg&q=82`;
    const title = `${product.n}${product.p ? " — " + money(product.p) : ""} | Samira Home Decor`;
    const description = product.d || "Home décor for every house, delivered Australia-wide.";
    const pageUrl = `${SITE}/product.html?id=${encodeURIComponent(id)}`;

    // Straight string work on the head: no rewriter dependency, nothing to break.
    html = await response.text();
    const set = (pattern, replacement) => { html = html.replace(pattern, replacement); };

    set(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
    set(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${esc(description)}">`);
    set(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${esc(title)}">`);
    set(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${esc(description)}">`);
    set(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${esc(pageUrl)}">`);
    set(/<meta property="og:image" content="[^"]*">/i, `<meta property="og:image" content="${esc(image)}">`);
    set(/<meta name="twitter:image" content="[^"]*">/i, `<meta name="twitter:image" content="${esc(image)}">`);

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(html, { status: response.status, headers });
  } catch (err) {
    console.error("product-og:", err && err.message);
    // If the body was already read, hand back what we have rather than nothing.
    if (html !== null) {
      const headers = new Headers(response.headers);
      headers.delete("content-length");
      return new Response(html, { status: response.status, headers });
    }
    return response;   // serve the page as it was
  }
}

export const config = { path: "/product.html" };
