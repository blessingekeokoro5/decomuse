/* ============================================================
   DÉCOMUSE — Booking calendar (Home Styling, Staging & Interior Design)
   Embeds a scheduling page if configured (DECOMUSE.bookingsUrl),
   else a built-in calendar that emails the business on submit.
   ============================================================ */

const MEETING_TYPES = [
  { key: "virtual",  icon: "💻", label: "Virtual Styling (video call)", place: "Online via video call. A join link is sent when we confirm your session. Available worldwide 🌏." },
  { key: "inhome",   icon: "🏠", label: "In-home Consultation",         place: "One of our stylists visits your home, within our service areas." },
  { key: "interior", icon: "🎨", label: "Interior Design Consultation", place: "A full interior design consult, in-home or virtual, to plan your whole space." }
];

const BK_DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let bk = { type: "virtual", date: "", slot: "" };

function initBooking() {
  const host = document.getElementById("bookingWidget");
  if (!host) return;
  const url = (typeof DECOMUSE !== "undefined" && DECOMUSE.bookingsUrl) || "";
  if (url) {
    host.innerHTML = `<iframe src="${url}" class="bookings-embed" title="DecoMuse booking calendar" loading="lazy"></iframe>`;
    return;
  }
  renderBooking(host);
}

function bkHour(h) { const ap = h >= 12 ? "pm" : "am"; return `${((h + 11) % 12) + 1}${ap}`; }

function bkAvailabilityNote() {
  const av = (typeof DECOMUSE !== "undefined" && DECOMUSE.availability) || {};
  const rows = [];
  for (let d = 1; d <= 6; d++) {
    const a = av[d];
    rows.push(`<div class="bk-av-row"><span>${BK_DAYS[d]}</span><span>${a ? `${bkHour(a[0])} to ${bkHour(a[1])}` : "Closed"}</span></div>`);
  }
  rows.push(`<div class="bk-av-row"><span>Sunday</span><span>Closed</span></div>`);
  return rows.join("");
}

function bkSlotsFor(dateStr) {
  if (!dateStr) return [];
  const d = new Date(dateStr + "T00:00:00");
  const av = ((typeof DECOMUSE !== "undefined" && DECOMUSE.availability) || {})[d.getDay()];
  if (!av) return [];
  const slots = [];
  for (let h = av[0]; h < av[1]; h++) slots.push(`${String(h).padStart(2, "0")}:00`);
  return slots;
}

function renderBooking(host) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const min = today.toISOString().slice(0, 10);
  host.innerHTML = `
    <div class="bk-grid">
      <div class="bk-main">
        <div class="bk-step-label">1 · Choose a service</div>
        <div class="bk-types">
          ${MEETING_TYPES.map(m => `
            <button type="button" class="bk-type ${m.key === bk.type ? "active" : ""}" data-type="${m.key}">
              <span class="bk-type-ic">${m.icon}</span><strong>${m.label}</strong>
            </button>`).join("")}
        </div>
        <div class="bk-place" id="bkPlace"></div>

        <div class="bk-step-label">2 · Pick a date &amp; time</div>
        <div class="field"><label>Date</label><input type="date" id="bkDate" min="${min}"></div>
        <div id="bkSlots" class="bk-slots-empty">Select a date to see available times.</div>

        <div class="bk-step-label">3 · Your details</div>
        <form id="bkForm">
          <div class="field-row">
            <div class="field"><label>Name</label><input id="bkName" required></div>
            <div class="field"><label>Email</label><input id="bkEmail" type="email" required></div>
          </div>
          <div class="field-row">
            <div class="field"><label>Phone (optional)</label><input id="bkPhone" type="tel"></div>
            <div class="field" id="bkAddrWrap" style="display:none"><label>Home address</label><input id="bkAddr"></div>
          </div>
          <div class="field"><label>Tell us about your space</label><textarea id="bkNotes" placeholder="Which rooms, your goals, style, timeline…" style="min-height:90px"></textarea></div>
          <button type="submit" class="btn btn--primary btn--block" id="bkSubmit">Request booking</button>
          <div class="form-success" id="bkSuccess"></div>
        </form>
      </div>

      <aside class="bk-side">
        <h4 style="margin-bottom:10px">Availability</h4>
        <div class="bk-av">${bkAvailabilityNote()}</div>
        <div class="bk-summary" id="bkSummary">
          <div class="bk-sum-line"><span>Service</span><strong id="sumType">Virtual Styling</strong></div>
          <div class="bk-sum-line"><span>Date</span><strong id="sumDate">—</strong></div>
          <div class="bk-sum-line"><span>Time</span><strong id="sumTime">—</strong></div>
        </div>
        <p class="form-note">📧 Your request is emailed to our team for confirmation. Virtual sessions receive a video link once confirmed.</p>
      </aside>
    </div>`;

  wireBooking(host);
  updatePlace();
  updateSummary();
}

function wireBooking(host) {
  host.querySelectorAll(".bk-type").forEach(b => b.addEventListener("click", () => {
    bk.type = b.dataset.type;
    host.querySelectorAll(".bk-type").forEach(x => x.classList.toggle("active", x === b));
    document.getElementById("bkAddrWrap").style.display = (bk.type === "inhome" || bk.type === "interior") ? "block" : "none";
    updatePlace(); updateSummary();
  }));

  document.getElementById("bkDate").addEventListener("change", (e) => {
    bk.date = e.target.value; bk.slot = "";
    renderSlots(); updateSummary();
  });

  document.getElementById("bkForm").addEventListener("submit", submitBooking);
}

function updatePlace() {
  const m = MEETING_TYPES.find(x => x.key === bk.type);
  document.getElementById("bkPlace").innerHTML = `📍 ${m.place}`;
}

function renderSlots() {
  const wrap = document.getElementById("bkSlots");
  const slots = bkSlotsFor(bk.date);
  if (!bk.date) { wrap.className = "bk-slots-empty"; wrap.textContent = "Select a date to see available times."; return; }
  if (!slots.length) { wrap.className = "bk-slots-empty"; wrap.textContent = "No availability that day, please try another date (we're closed Sundays)."; return; }
  wrap.className = "bk-slots";
  wrap.innerHTML = slots.map(s => `<button type="button" class="bk-slot ${s === bk.slot ? "active" : ""}" data-slot="${s}">${bkHour(parseInt(s))}</button>`).join("");
  wrap.querySelectorAll(".bk-slot").forEach(b => b.addEventListener("click", () => {
    bk.slot = b.dataset.slot;
    wrap.querySelectorAll(".bk-slot").forEach(x => x.classList.toggle("active", x === b));
    updateSummary();
  }));
}

function updateSummary() {
  const m = MEETING_TYPES.find(x => x.key === bk.type);
  document.getElementById("sumType").textContent = m.label;
  document.getElementById("sumDate").textContent = bk.date ? new Date(bk.date + "T00:00:00").toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" }) : "—";
  document.getElementById("sumTime").textContent = bk.slot ? bkHour(parseInt(bk.slot)) : "—";
}

async function submitBooking(e) {
  e.preventDefault();
  if (!bk.date || !bk.slot) { showToast("Please choose a date and time first"); return; }
  const btn = document.getElementById("bkSubmit");
  const success = document.getElementById("bkSuccess");
  const m = MEETING_TYPES.find(x => x.key === bk.type);
  const name = document.getElementById("bkName").value;

  const data = [
    ["Service", "Home Styling / Interior Design consultation"],
    ["Type", m.label],
    ["Where", m.place],
    ["Date", new Date(bk.date + "T00:00:00").toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" })],
    ["Time", bkHour(parseInt(bk.slot))],
    ["Name", name],
    ["Email", document.getElementById("bkEmail").value],
    ["Phone", document.getElementById("bkPhone").value],
    ["Home address", document.getElementById("bkAddr") ? document.getElementById("bkAddr").value : ""],
    ["Notes", document.getElementById("bkNotes").value]
  ].filter(d => d[1]);

  btn.disabled = true; btn.textContent = "Sending…";
  try { if (typeof deliverForm === "function") await deliverForm(data, "DecoMuse — Styling / Interior Design booking"); } catch (err) {}

  success.classList.add("show");
  success.innerHTML = `Thank you${name ? ", " + name.split(" ")[0] : ""}! Your <strong>${m.label}</strong> booking request for <strong>${document.getElementById("sumDate").textContent} at ${bkHour(parseInt(bk.slot))}</strong> has been sent. We'll confirm by email${bk.type === "virtual" ? " and include your video link" : ""}.`;
  btn.disabled = false; btn.textContent = "Request booking";
}

document.addEventListener("DOMContentLoaded", initBooking);
