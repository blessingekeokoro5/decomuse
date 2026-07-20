/* ============================================================
   DÉCOMUSE, Page interactions
   Hero carousel · scroll reveal · demo forms
   ============================================================ */

/* ---- Hero carousel ---- */
function initHeroCarousel() {
  const slider = document.getElementById("heroSlider");
  const dotsWrap = document.getElementById("heroDots");
  if (!slider) return;
  const slides = [...slider.querySelectorAll(".hero-slide")];
  if (slides.length < 2) return;
  let i = 0;

  dotsWrap.innerHTML = slides.map((_, idx) =>
    `<button aria-label="Slide ${idx + 1}" class="${idx === 0 ? 'active' : ''}"></button>`).join("");
  const dots = [...dotsWrap.querySelectorAll("button")];

  const go = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  };
  dots.forEach((d, idx) => d.addEventListener("click", () => { go(idx); reset(); }));

  let timer = setInterval(() => go(i + 1), 5000);
  const reset = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 5000); };
}

/* ---- Scroll reveal ---- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(e => e.classList.add("in")); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* ---- Form delivery: send bookings & enquiries to the business inbox ---- */

// Read every field into [label, value] pairs (uses labels, else placeholders)
function collectForm(form) {
  const out = [];
  const seen = new Set();
  const push = (label, val) => { if (val) out.push([label, val]); };
  form.querySelectorAll(".field").forEach(f => {
    const input = f.querySelector("input, select, textarea");
    if (!input) return;
    seen.add(input);
    const labelEl = f.querySelector("label");
    const label = (labelEl ? labelEl.textContent : (input.placeholder || input.getAttribute("aria-label") || input.name || "Field")).trim();
    push(label, input.type === "checkbox" ? (input.checked ? "Yes" : "No") : input.value);
  });
  // Inputs that aren't inside a .field wrapper (e.g. the quick callback form)
  form.querySelectorAll("input, select, textarea").forEach(input => {
    if (seen.has(input) || input.type === "hidden") return;
    const label = (input.placeholder || input.getAttribute("aria-label") || input.name || "Field").trim();
    push(label, input.type === "checkbox" ? (input.checked ? "Yes" : "No") : input.value);
  });
  return out;
}

// Build a readable subject line from the form / page context
function formSubject(form) {
  if (form.dataset.formName) return "DecoMuse, " + form.dataset.formName;
  const sec = form.closest("section");
  const h = sec && sec.querySelector(".section-head h2, .page-banner h1, h2, h3");
  const base = h ? h.textContent.trim() : (document.title.split(/[, |]/)[0].trim() || "Website enquiry");
  return "DecoMuse, " + base;
}

// Deliver: POST to Formspree if configured, otherwise open a pre-addressed email
async function deliverForm(data, subject) {
  const cfg = (typeof DECOMUSE !== "undefined" && DECOMUSE) || {};
  const email = cfg.formEmail || "decormuseofficial@outlook.com";
  const endpoint = cfg.formEndpoint || "";
  const accessKey = cfg.formAccessKey || "";
  const replyto = (data.find(d => /email/i.test(d[0])) || [])[1] || "";
  const body = data.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\n, Sent from the DecoMuse website";

  // 1) Web3Forms silent delivery (recommended, just an access key, no account)
  if (accessKey) {
    try {
      const payload = { access_key: accessKey, subject, from_name: "DecoMuse Website", replyto };
      data.forEach(([k, v]) => { payload[k] = v; });
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(payload)
      });
      if (res.ok) return true;
    } catch (e) { /* fall through */ }
  }

  if (endpoint) {
    try {
      const payload = { _subject: subject, _replyto: (data.find(d => /email/i.test(d[0])) || [])[1] || "" };
      data.forEach(([k, v]) => { payload[k] = v; });
      const res = await fetch(endpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) return true;
    } catch (e) { /* fall through to email */ }
  }
  // Fallback: open the shopper's email client, pre-addressed to the business
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return true;
}

function initForms() {
  // Booking / contact / review / application forms
  document.querySelectorAll("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const success = form.querySelector(".form-success");
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }

      const data = collectForm(form);
      const subject = formSubject(form);
      let ok = true;
      try { ok = await deliverForm(data, subject); } catch (err) { ok = false; }

      if (success) {
        success.classList.add("show");
        success.textContent = ok
          ? (form.dataset.successMsg || "Thank you! Your request has been sent to the DecoMuse team, we'll be in touch within 2 business hours.")
          : "Sorry, something went wrong. Please email decormuseofficial@outlook.com or message us on WhatsApp.";
      }
      form.reset();
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
    });
  });

  // Newsletter (footer), emails you only if an endpoint is set, else just confirms
  document.querySelectorAll("form[data-newsletter]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (form.querySelector("input") || {}).value || "";
      if (typeof DECOMUSE !== "undefined" && DECOMUSE.formEndpoint) {
        deliverForm([["Newsletter subscriber", email]], "DecoMuse, New newsletter subscriber");
      }
      form.reset();
      showToast("You're on the list, welcome to The Edit ✦");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroCarousel();
  initReveal();
  initForms();
});

/* ============================================================
   Product image zoom lightbox (shop, product & other grids)
   ============================================================ */
let _zoomState = { scale: 1, x: 0, y: 0, drag: false, sx: 0, sy: 0 };

function openZoom(e, btn) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const media = btn.closest(".card-media") || btn.closest(".product-gallery") || document;
  const img = media.querySelector("img.ph-img") || media.querySelector("img");
  if (!img || !img.getAttribute("src")) return;
  showZoom(img.currentSrc || img.src, img.alt || "");
}

function _zoomApply() {
  const img = document.getElementById("zoomImg");
  if (img) img.style.transform = `translate(${_zoomState.x}px, ${_zoomState.y}px) scale(${_zoomState.scale})`;
}
function _zoomSet(s) {
  _zoomState.scale = Math.min(5, Math.max(1, Math.round(s * 10) / 10));
  if (_zoomState.scale === 1) { _zoomState.x = 0; _zoomState.y = 0; }
  const stage = document.querySelector(".zoom-stage");
  if (stage) stage.style.cursor = _zoomState.scale > 1 ? "grab" : "zoom-in";
  _zoomApply();
}
function closeZoom() {
  const lb = document.getElementById("zoomLightbox");
  if (lb) { lb.classList.remove("open"); document.body.style.overflow = ""; }
}
function showZoom(src, alt) {
  let lb = document.getElementById("zoomLightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "zoomLightbox";
    lb.className = "zoom-lightbox";
    lb.innerHTML =
      '<button class="zoom-close" aria-label="Close">✕</button>' +
      '<div class="zoom-stage"><img id="zoomImg" alt="" draggable="false"></div>' +
      '<div class="zoom-controls">' +
        '<button class="zoom-ctrl" data-z="out" aria-label="Zoom out">−</button>' +
        '<button class="zoom-ctrl" data-z="reset" aria-label="Reset zoom">Reset</button>' +
        '<button class="zoom-ctrl" data-z="in" aria-label="Zoom in">+</button>' +
      '</div>';
    document.body.appendChild(lb);
    lb.querySelector(".zoom-close").addEventListener("click", closeZoom);
    lb.addEventListener("click", (ev) => { if (ev.target === lb) closeZoom(); });
    lb.querySelectorAll(".zoom-ctrl").forEach((b) => b.addEventListener("click", () => {
      const z = b.dataset.z;
      if (z === "in") _zoomSet(_zoomState.scale + 0.5);
      else if (z === "out") _zoomSet(_zoomState.scale - 0.5);
      else _zoomSet(1);
    }));
    const stage = lb.querySelector(".zoom-stage");
    stage.addEventListener("wheel", (ev) => { ev.preventDefault(); _zoomSet(_zoomState.scale + (ev.deltaY < 0 ? 0.3 : -0.3)); }, { passive: false });
    stage.addEventListener("dblclick", () => _zoomSet(_zoomState.scale > 1 ? 1 : 2));
    stage.addEventListener("mousedown", (ev) => {
      if (_zoomState.scale <= 1) return;
      _zoomState.drag = true; _zoomState.sx = ev.clientX - _zoomState.x; _zoomState.sy = ev.clientY - _zoomState.y;
      stage.style.cursor = "grabbing";
    });
    window.addEventListener("mousemove", (ev) => {
      if (!_zoomState.drag) return;
      _zoomState.x = ev.clientX - _zoomState.sx; _zoomState.y = ev.clientY - _zoomState.sy; _zoomApply();
    });
    window.addEventListener("mouseup", () => {
      if (!_zoomState.drag) return;
      _zoomState.drag = false;
      const st = document.querySelector(".zoom-stage");
      if (st) st.style.cursor = _zoomState.scale > 1 ? "grab" : "zoom-in";
    });
    document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") closeZoom(); });
  }
  const zi = lb.querySelector("#zoomImg");
  zi.src = src; zi.alt = alt;
  _zoomState = { scale: 1, x: 0, y: 0, drag: false, sx: 0, sy: 0 };
  _zoomApply();
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}
