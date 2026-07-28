/* ============================================================
   DÉCOMUSE, Muse Stylist AI (client-side demo)
   Upload a room photo → "analyse" → recommend shoppable pieces.
   (Simulated on-device; swap analyseRoom() for a real API later.)
   ============================================================ */

const ROOM_TYPES = [
  { key: "living", label: "Living room", palette: "Warm neutrals", vibe: "Layered & inviting" },
  { key: "bedroom", label: "Bedroom", palette: "Soft blush & oat", vibe: "Calm & restful" },
  { key: "dining", label: "Dining space", palette: "Earthy & natural", vibe: "Gathered & warm" }
];

let uploadedImage = null;

function initStylist() {
  const stage = document.getElementById("stylistStage");
  const acc = (typeof getAccount === "function") ? getAccount() : null;
  if (stage && !(acc && acc.email)) {
    // Members-only: prompt to log in / create an account
    stage.innerHTML = `
      <div class="upload-zone" style="text-align:center">
        <div class="up-ic">✦</div>
        <h3>Muse Stylist AI is for members</h3>
        <p style="color:var(--muted);max-width:440px;margin:8px auto 0">Log in or create a free DecoMuse account to upload your room and get instant, shoppable styling recommendations, it only takes a minute.</p>
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
    <div style="text-align:center;margin-top:24px">
      <button class="btn btn--primary" onclick="analyseRoom()">✦ Analyse my room</button>
      <button class="btn btn--outline" onclick="resetStylist()" style="margin-left:8px">Upload another</button>
    </div>`;
  initReveal();
}

function analyseRoom() {
  const stage = document.getElementById("stylistStage");
  stage.innerHTML = `
    <div class="analyzing">
      <div class="spinner"></div>
      <h3>Reading your space…</h3>
      <p style="color:var(--muted)">Detecting palette, proportions and style cues</p>
    </div>`;

  // Pick a room profile pseudo-randomly from the image data length (deterministic-ish, no Math.random needed)
  const seed = uploadedImage ? uploadedImage.length : 0;
  const room = ROOM_TYPES[seed % ROOM_TYPES.length];

  setTimeout(() => showResults(room), 1900);
}

function showResults(room) {
  const stage = document.getElementById("stylistStage");
  // Recommend products matching the detected room, fall back to tagged pieces
  let recs = PRODUCTS.filter(p => p.room && p.room.includes(room.key));
  if (recs.length < 4) recs = recs.concat(PRODUCTS.filter(p => !recs.includes(p)));
  recs = recs.slice(0, 6);

  stage.innerHTML = `
    <div class="reveal">
      <div class="split" style="gap:36px;align-items:flex-start">
        <div class="upload-preview"><img src="${uploadedImage}" alt="Your room"></div>
        <div>
          <span class="eyebrow">Analysis complete</span>
          <h2 style="margin-bottom:12px">We styled your ${room.label.toLowerCase()}</h2>
          <p class="lead" style="font-size:1.05rem">Here's what the Muse Stylist read from your space:</p>
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
