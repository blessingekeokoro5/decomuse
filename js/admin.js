/* ============================================================
   DÉCOMUSE, Admin + customer base (client-side)
   - Captures client-form submissions into a browser-side store (dm_admin_db)
   - Every submission is ALSO emailed to the business (authoritative record)
   NOTE: localStorage is per-device. For a true shared cross-device database,
   a backend is required — the email delivery covers you in the meantime.
   ============================================================ */
(function () {
  var DB_KEY = "dm_admin_db";

  window.dmGetDB = function () { try { return JSON.parse(localStorage.getItem(DB_KEY) || "[]"); } catch (e) { return []; } };
  window.dmSetDB = function (db) { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) {} };
  window.dmSaveClient = function (type, fields) {
    var db = window.dmGetDB();
    db.unshift({ id: Date.now() + "-" + Math.floor(Math.random() * 1000), type: type, date: new Date().toISOString(), fields: fields });
    window.dmSetDB(db);
  };

  // Lightweight (non-cryptographic) hash for the admin gate — keeps casual users out.
  window.dmHash = function (s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) { h = ((h << 5) + h) + s.charCodeAt(i); h = h & 0xffffffff; }
    return (h >>> 0).toString(16);
  };

  // Wire any form with [data-client-form] → save to customer base + email the business
  function initClientForms() {
    document.querySelectorAll("form[data-client-form]").forEach(function (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        var type = form.getAttribute("data-client-form") || "Client submission";
        var btn = form.querySelector('button[type="submit"]');
        var data = (typeof collectForm === "function") ? collectForm(form) : [];
        window.dmSaveClient(type, data);
        if (btn) { btn.disabled = true; btn.dataset.l = btn.textContent; btn.textContent = "Submitting…"; }

        // 1) Netlify Forms — server-side capture, viewable in the Netlify dashboard (cross-device)
        if (form.getAttribute("data-netlify") === "true") {
          try {
            var fd = new FormData(form);
            var body = new URLSearchParams();
            fd.forEach(function (v, k) { if (typeof v === "string") body.append(k, v); });
            await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
          } catch (err) {}
        }
        // 2) Instant email notification via Web3Forms
        try { if (typeof deliverForm === "function") await deliverForm(data, "DecoMuse — " + type + " (new client)"); } catch (err) {}
        var ok = form.querySelector(".form-success");
        if (ok) { ok.classList.add("show"); ok.innerHTML = form.getAttribute("data-success") || "Thank you! Your details have been submitted to DecoMuse."; }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.l; }
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    // Optional auto-print for shareable "download as PDF" links (?print=1)
    try { if (/[?&]print=1/.test(location.search)) setTimeout(function () { window.print(); }, 600); } catch (e) {}
  }
  document.addEventListener("DOMContentLoaded", initClientForms);
})();
