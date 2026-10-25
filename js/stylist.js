/* ============================================================
   SAMIRA HOME DECOR, Samira Stylera (client-side demo)
   Upload a room photo → "analyse" → recommend shoppable pieces.
   (Simulated on-device; swap analyseRoom() for a real API later.)
   ============================================================ */

const ROOM_TYPES = [
  { key: "living", label: "Living room / lounge", palette: "Warm neutrals", vibe: "Layered & inviting",
    rooms: ["living"], cats: ["Living Room", "Furniture"],
    pieces: [/\bsofa\b|lounge suite|modular|sectional|recliner/i, /coffee table/i, /armchair|accent chair|boucl[eé] chair|occasional chair|lounge chair|reading chair/i, /\brug\b/i, /floor lamp|table lamp|\blamp\b|pendant/i, /cushion|throw\b/i, /tv unit|tv cabinet|console table|sideboard|entertainment/i, /wall art|artwork|framed print|\bmirror\b|\bvase\b/i] },
  { key: "bedroom", label: "Bedroom", palette: "Soft blush & oat", vibe: "Calm & restful",
    rooms: ["bedroom"], cats: ["Bedroom", "Bedroom & Bath"],
    pieces: [/\bbed\b|bed frame|bedhead|headboard/i, /bedside|nightstand/i, /dresser|tallboy|chest of drawers|\bdrawers\b/i, /\brug\b/i, /table lamp|\blamp\b/i, /cushion|throw|quilt|duvet|blanket|bed linen/i, /\bmirror\b/i, /\bvase\b|candle|diffuser/i] },
  { key: "dining", label: "Dining room", palette: "Earthy & natural", vibe: "Gathered & warm",
    rooms: ["dining"], cats: ["Dining", "Kitchenware"],
    pieces: [/dining table/i, /dining chair|dining bench/i, /sideboard|buffet|server/i, /pendant|chandelier/i, /\brug\b/i, /\bvase\b|centrepiece|\bbowl\b|candle/i, /bar stool/i] },
  { key: "kitchen", label: "Kitchen", palette: "Fresh & bright", vibe: "Functional & warm",
    rooms: ["kitchen", "kitchenware"], cats: ["Kitchenware"],
    pieces: [/bar stool|counter stool/i, /canister|\bjar\b|storage|container/i, /\bboard\b|platter|serving/i, /cookware|\bpan\b|\bpot\b|utensil/i, /\bvase\b|\bbowl\b/i, /pendant|\blamp\b/i] },
  { key: "bathroom", label: "Bathroom", palette: "Spa & serene", vibe: "Clean & calm",
    rooms: ["bathroom"], cats: ["Bathroom", "Bedroom & Bath"],
    pieces: [/towel/i, /bath mat|\bmat\b/i, /\bmirror\b/i, /soap|dispenser|caddy|storage|basket/i, /candle|diffuser|reed/i, /\bvase\b|\btray\b/i] },
  { key: "office", label: "Home office", palette: "Focused & refined", vibe: "Productive & calm",
    rooms: ["office"], cats: ["Office"],
    pieces: [/\bdesk\b/i, /office chair|ergonomic chair|task chair|desk chair/i, /bookcase|bookshelf|shelf|shelving/i, /desk lamp|\blamp\b/i, /storage|organiser|\bdrawer\b|filing/i, /wall art|artwork|\bmirror\b|\bplant\b/i] },
  { key: "outdoor", label: "Outdoor / patio", palette: "Relaxed & natural", vibe: "Alfresco & easy",
    rooms: ["outdoor"], cats: ["Outdoor"],
    pieces: [/outdoor (lounge|sofa|setting|set)|patio/i, /outdoor dining|dining set/i, /\bchair\b/i, /planter|\bpot\b|\bplant\b/i, /cushion|throw/i, /\brug\b|lantern/i] }
];

/* Pick a varied set of shoppable pieces that actually suit the chosen room type */
function pickForRoom(profile) {
  const picks = [], used = new Set();
  const shoppable = (typeof PRODUCTS !== "undefined" ? PRODUCTS : []).filter(p => p && p.price != null && p.cat !== "Packaging");
  const text = p => (p.name + " " + (p.cat || "") + " " + (p.room || ""));
  // one product per piece type → a real spread (sofa, coffee table, rug, lamp…)
  (profile.pieces || []).forEach(re => {
    const p = shoppable.find(x => !used.has(x.id) && re.test(text(x)));
    if (p) { picks.push(p); used.add(p.id); }
  });
  // top up from the room's own category / room
  const inRoom = shoppable.filter(x => !used.has(x.id) &&
    ((x.room && (profile.rooms || []).some(r => String(x.room).toLowerCase().includes(r))) ||
     (x.cat && (profile.cats || []).includes(x.cat))));
  for (const p of inRoom) { if (picks.length >= 8) break; picks.push(p); used.add(p.id); }
  // final fallback so there's never an empty result
  if (picks.length < 4) for (const p of shoppable) { if (picks.length >= 6) break; if (!used.has(p.id)) { picks.push(p); used.add(p.id); } }
  return picks.slice(0, 8);
}

let uploadedImage = null;

function initStylist() {
  const stage = document.getElementById("stylistStage");
  const acc = (typeof getAccount === "function") ? getAccount() : null;
  if (stage && !(acc && acc.email)) {
    // Members-only: prompt to log in / create an account
    stage.innerHTML = `
      <div class="upload-zone" style="text-align:center">
        <div class="up-ic">✦</div>
        <h3>Samira Stylera is for members</h3>
        <p style="color:var(--muted);max-width:440px;margin:8px auto 0">Log in or create a free Samira Home Decor account to upload your room and get instant, shoppable styling recommendations, it only takes a minute.</p>
        <div class="btn-row" style="justify-content:center;margin-top:18px">
          <a class="btn btn--primary" href="account.html">Log in / Create account</a>
          <a class="btn btn--outline" href="shop.html">Browse the shop</a>
        </div>
      </div>`;
    return;
  }
  const zone = document.getElementById("uploadZone");
  const input = document.getElementById("fileInput");
  if (!zone || !input) return;

  // Photo handed over from the header "search by photo" camera button
  try {
    const fromCam = sessionStorage.getItem("dm_visual_search");
    if (fromCam) { sessionStorage.removeItem("dm_visual_search"); uploadedImage = fromCam; showPreview(); return; }
  } catch (e) {}

  zone.addEventListener("click", () => input.click());
  zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("drag"); });
  zone.addEventListener("dragleave", () => zone.classList.remove("drag"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault(); zone.classList.remove("drag");
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener("change", () => { if (input.files[0]) handleFile(input.files[0]); });
}

function handleFile(file) {
  if (!file.type.startsWith("image/")) { showToast("Please upload an image file"); return; }
  const reader = new FileReader();
  reader.onload = (e) => { uploadedImage = e.target.result; showPreview(); };
  reader.readAsDataURL(file);
}

function showPreview() {
  const stage = document.getElementById("stylistStage");
  stage.innerHTML = `
    <div class="upload-preview reveal">
      <img src="${uploadedImage}" alt="Your room">
    </div>
    <div style="max-width:380px;margin:22px auto 0;text-align:center">
      <label for="roomType" style="display:block;font-weight:600;margin-bottom:8px">Which room is this?</label>
      <select id="roomType" style="width:100%;padding:12px 14px;border:1.5px solid var(--line);border-radius:10px;font-family:var(--font-body);font-size:0.98rem;background:#fff;color:var(--ink)">
        ${ROOM_TYPES.map(r => `<option value="${r.key}">${r.label}</option>`).join("")}
      </select>
      <p style="color:var(--muted);font-size:0.82rem;margin:8px 0 0">Tell us the room so the picks suit it (sofa &amp; coffee table for a lounge, bed &amp; bedsides for a bedroom, and so on).</p>
      <div style="margin-top:18px">
        <button class="btn btn--primary" onclick="analyseRoom()">✦ Analyse my room</button>
        <button class="btn btn--outline" onclick="resetStylist()" style="margin-left:8px">Upload another</button>
      </div>
    </div>`;
  initReveal();
}

function analyseRoom() {
  const stage = document.getElementById("stylistStage");
  // Read the chosen room BEFORE we replace the stage (which removes the select)
  const sel = document.getElementById("roomType");
  const key = sel ? sel.value : "living";
  const room = ROOM_TYPES.find(r => r.key === key) || ROOM_TYPES[0];

  stage.innerHTML = `
    <div class="analyzing">
      <div class="spinner"></div>
      <h3>Reading your space…</h3>
      <p style="color:var(--muted)">Matching pieces to your ${room.label.toLowerCase()}</p>
    </div>`;

  setTimeout(() => showResults(room), 1600);
}

function showResults(room) {
  const stage = document.getElementById("stylistStage");
  // Recommend a varied set of real pieces that suit the chosen room
  const recs = pickForRoom(room);

  stage.innerHTML = `
    <div class="reveal">
      <div class="split" style="gap:36px;align-items:flex-start">
        <div class="upload-preview"><img src="${uploadedImage}" alt="Your room"></div>
        <div>
          <span class="eyebrow">Analysis complete</span>
          <h2 style="margin-bottom:12px">We styled your ${room.label.toLowerCase()}</h2>
          <p class="lead" style="font-size:1.05rem">Here's what the Samira Stylera read from your space:</p>
          <div class="detected">
            <span class="chip">🏠 ${room.label}</span>
            <span class="chip">🎨 ${room.palette}</span>
            <span class="chip">✦ ${room.vibe}</span>
          </div>
          <div class="ai-note" style="margin-top:16px">These picks are matched to your room's palette and proportions. Add your favourites to the cart, or keep browsing the shop for more.</div>
          <div class="btn-row" style="margin-top:20px">
            <button class="btn btn--outline btn--sm" onclick="resetStylist()">↻ Try another room</button>
            <a class="btn btn--dark btn--sm" href="shop.html">Shop the look</a>
          </div>
        </div>
      </div>

      <h3 style="margin:44px 0 20px;text-align:center">Recommended for your space</h3>
      <div class="grid grid-3" id="recGrid"></div>
      <div style="text-align:center;margin-top:32px">
        <button class="btn btn--primary" onclick="addAllRecs()">Add all picks to cart</button>
      </div>
    </div>`;

  window._recIds = recs.map(p => p.id);
  renderProducts("recGrid", recs);
  initReveal();
  showToast(`Styled your ${room.label.toLowerCase()} ✦`);
}

function addAllRecs() {
  (window._recIds || []).forEach(id => {
    const cart = getCart();
    const p = findProduct(id);
    const line = cart.find(i => i.id === id);
    if (line) line.qty += 1;
    else cart.push({ id: p.id, name: p.name, price: p.price, cat: p.cat, ph: p.ph, qty: 1 });
    saveCart(cart);
  });
  showToast("All picks added to your cart ✦");
}

function resetStylist() {
  uploadedImage = null;
  const stage = document.getElementById("stylistStage");
  stage.innerHTML = `
    <div class="upload-zone" id="uploadZone">
      <div class="up-ic">✦</div>
      <h3>Upload a photo of your room</h3>
      <p style="color:var(--muted)">Drag &amp; drop or click to browse, we'll recommend décor that suits your space.</p>
      <button class="btn btn--primary" style="margin-top:14px">Choose a photo</button>
      <input type="file" id="fileInput" accept="image/*" hidden>
    </div>`;
  initStylist();
}

document.addEventListener("DOMContentLoaded", initStylist);
