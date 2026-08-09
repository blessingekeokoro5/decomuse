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

  // Build & download a blank, fillable PDF of a client form (uses jsPDF if loaded, else prints)
  window.dmDownloadFormPDF = function (form, title) {
    if (!form) return;
    title = title || (form.getAttribute && form.getAttribute("data-client-form")) || "DecoMuse form";
    if (!(window.jspdf && window.jspdf.jsPDF)) { window.print(); return; }
    var doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
    var M = 48, PH = doc.internal.pageSize.getHeight(), maxW = doc.internal.pageSize.getWidth() - M * 2, y = M;
    function brk(h) { if (y + h > PH - M) { doc.addPage(); y = M; } }
    function line(str, size, bold, color) {
      doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(size);
      doc.setTextColor(color ? color[0] : 40, color ? color[1] : 38, color ? color[2] : 35);
      doc.splitTextToSize(str, maxW).forEach(function (ln) { brk(size * 1.45); doc.text(ln, M, y); y += size * 1.45; });
    }
    line(title || "DecoMuse", 20, true, [71, 86, 59]);
    line("www.decomuse.com.au", 9, false, [150, 140, 132]); y += 8;
    Array.prototype.forEach.call(form.querySelectorAll(".form-sec-title, .field, .consent, .terms, .sig-block"), function (el) {
      if (el.classList.contains("form-sec-title")) { y += 12; line(el.textContent.trim().toUpperCase(), 11, true, [165, 88, 106]); y += 2; }
      else if (el.classList.contains("terms")) {
        Array.prototype.forEach.call(el.children, function (c) {
          if (c.tagName === "H4") { y += 5; line(c.textContent.trim(), 9.5, true); }
          else line(c.textContent.trim(), 9, false, [90, 85, 80]);
        });
      }
      else if (el.classList.contains("consent")) { y += 6; line("[   ]  " + el.textContent.replace(/\s+/g, " ").trim(), 9.5, false); }
      else if (el.classList.contains("sig-block")) { y += 8; line("Signature:", 10, true); brk(64); y += 8; doc.setDrawColor(205); doc.rect(M, y, maxW * 0.62, 52); y += 66; }
      else {
        var label = el.querySelector("label"), input = el.querySelector("input, select, textarea");
        line((label ? label.textContent.replace(/\s+/g, " ").trim() : ""), 10, true);
        if (input && input.tagName === "TEXTAREA") { brk(56); y += 6; doc.setDrawColor(205); doc.rect(M, y, maxW, 46); y += 58; }
        else { brk(26); y += 6; doc.setDrawColor(205); doc.line(M, y + 8, M + maxW, y + 8); y += 22; }
      }
    });
    doc.save((title || "DecoMuse-form").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") + ".pdf");
  };

  // Branded, filled INVOICE pdf — logo + "DecoMuse Official" + Bill To + amounts + status
  window.dmInvoicePDF = function (form) {
    if (!form) return;
    if (!(window.jspdf && window.jspdf.jsPDF)) { window.print(); return; }
    var data = (typeof collectForm === "function") ? collectForm(form) : [];
    var map = {}; data.forEach(function (p) { if (p && p[0]) map[p[0]] = p[1]; });
    var g = function (k) { return map[k] == null ? "" : String(map[k]); };
    var money = function (v) { if (v == null || String(v).trim() === "") return ""; var n = Number(String(v).replace(/[^0-9.\-]/g, "")); return isNaN(n) ? String(v) : "$" + n.toFixed(2); };
    var img = new Image();
    img.onload = function () { try { var c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight; c.getContext("2d").drawImage(img, 0, 0); build(c.toDataURL("image/jpeg", 0.92), img.naturalWidth / img.naturalHeight); } catch (e) { build(null, 1.4); } };
    img.onerror = function () { build(null, 1.4); };
    img.src = "assets/logo.jpg";
    function build(logo, ratio) {
      var doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
      var M = 48, PW = doc.internal.pageSize.getWidth(), y = 52;
      if (logo) { var lw = 118, lh = lw / (ratio || 1.4); try { doc.addImage(logo, "JPEG", M, y, lw, lh); } catch (e) {} }
      doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(71, 86, 59); doc.text("DecoMuse Official", PW - M, y + 12, { align: "right" });
      doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(90, 80, 76);
      ["ABN 41 991 812 955", "decormuseofficial@outlook.com", "0451 609 398", "www.decomuse.com.au"].forEach(function (t, i) { doc.text(t, PW - M, y + 28 + i * 13, { align: "right" }); });
      y += 96;
      doc.setDrawColor(71, 86, 59); doc.setLineWidth(1.4); doc.line(M, y, PW - M, y); y += 26;
      doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(165, 88, 106); doc.text("BILL TO", M, y);
      doc.setFontSize(12); doc.setTextColor(44, 38, 35); doc.text(g("Client name") || "-", M, y + 17);
      doc.setFont("helvetica", "normal"); doc.setFontSize(10);
      var bl = [g("Client address"), g("Client phone"), g("Email")].filter(Boolean);
      bl.forEach(function (t, i) { doc.text(String(t), M, y + 33 + i * 13); });
      doc.setFontSize(10); doc.setTextColor(44, 38, 35);
      doc.text("Invoice #  " + (g("Invoice number") || "-"), PW - M, y, { align: "right" });
      doc.text("Date  " + (g("Invoice date") || "-"), PW - M, y + 16, { align: "right" });
      doc.text("Due  " + (g("Due date") || "-"), PW - M, y + 32, { align: "right" });
      var st = (g("Status") || "Unpaid"), s = st.toLowerCase();
      var sc = s === "paid" ? [71, 86, 59] : s === "overdue" ? [178, 58, 58] : s.indexOf("partial") >= 0 ? [198, 161, 91] : [165, 88, 106];
      doc.setFillColor(sc[0], sc[1], sc[2]); doc.roundedRect(PW - M - 96, y + 44, 96, 20, 10, 10, "F");
      doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.text(st.toUpperCase(), PW - M - 48, y + 57, { align: "center" });
      y += 33 + bl.length * 13 + 28;
      if (g("Description")) { doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(165, 88, 106); doc.text("DETAILS", M, y); y += 15; doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(44, 38, 35); doc.splitTextToSize(g("Description"), PW - 2 * M).forEach(function (ln) { doc.text(ln, M, y); y += 14; }); y += 8; }
      function amt(label, v, bold) { if (!v) return; doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(bold ? 12 : 10.5); doc.setTextColor(44, 38, 35); doc.text(label, M, y); doc.text(money(v), PW - M, y, { align: "right" }); doc.setDrawColor(228); doc.setLineWidth(0.7); doc.line(M, y + 7, PW - M, y + 7); y += 23; }
      amt("Amount (ex GST)", g("Amount")); amt("GST", g("GST")); amt("Total (incl GST)", g("Total"), true); amt("Amount paid", g("Amount paid")); amt("Balance due", g("Balance due"), true);
      if (g("Payment details")) {
        y += 10;
        var pd = doc.splitTextToSize(g("Payment details") + (g("Payment terms") ? "\nTerms: " + g("Payment terms") : ""), PW - 2 * M - 28);
        var h = Math.max(52, 30 + pd.length * 12);
        doc.setFillColor(246, 238, 232); doc.roundedRect(M, y, PW - 2 * M, h, 8, 8, "F");
        doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(44, 38, 35); doc.text("Payment details", M + 14, y + 18);
        doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(90, 80, 76);
        pd.forEach(function (ln, i) { doc.text(ln, M + 14, y + 33 + i * 12); });
        y += h + 14;
      }
      doc.setFontSize(10);
      if (s === "paid") { doc.setTextColor(71, 86, 59); doc.text("Paid - thank you!", M, y); }
      else { doc.setTextColor(165, 88, 106); var due = g("Due date"); doc.text("Payment reminder: " + (due ? "due by " + due : "please arrange payment") + (g("Invoice number") ? " (ref " + g("Invoice number") + ")" : ""), M, y); }
      doc.save("Invoice-" + (g("Invoice number") || Date.now()) + ".pdf");
    }
  };

  // Email a filled form (e.g. an invoice) to the recipient found in its Email field (via Brevo)
  window.dmSendFilledForm = async function (form, title) {
    if (!form) return;
    title = title || (form.getAttribute && form.getAttribute("data-client-form")) || "Invoice";
    var data = (typeof collectForm === "function") ? collectForm(form) : [];
    var emailPair = data.find(function (d) { return /email/i.test(d[0]); });
    var namePair = data.find(function (d) { return /name/i.test(d[0]); });
    var email = emailPair ? emailPair[1] : "";
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { alert("Please enter the client's email in the form first."); return; }
    // Always save my own copy to the Customer base first (whether or not the email sends)
    window.dmSaveClient(title, data);
    var clean = data.filter(function (p) { return !/^data:image\//.test(String(p[1])); });
    var out = form.querySelector(".form-success");
    var sent = false;
    try {
      var res = await fetch("/.netlify/functions/send-invoice", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, name: namePair ? namePair[1] : "", title: title, fields: clean })
      });
      var d = await res.json().catch(function () { return {}; });
      sent = res.ok && d.ok;
    } catch (e) { sent = false; }
    if (out) {
      out.classList.add("show");
      out.innerHTML = sent
        ? "✓ Emailed to " + email + " — a copy is saved in your Customer base and inbox."
        : "Saved to your Customer base. Opening your email app to send it…";
    }
    if (!sent) {
      var body = "Please find your DecoMuse " + title.toLowerCase() + " details below:\n\n" + clean.map(function (p) { return p[0] + ": " + p[1]; }).join("\n") + "\n\nThank you,\nDecoMuse";
      location.href = "mailto:" + encodeURIComponent(email) + "?subject=" + encodeURIComponent(title + " — DecoMuse") + "&body=" + encodeURIComponent(body);
    }
  };

  // Signature pads — draw with mouse/finger; value stored as a PNG data URL in .sig-input
  function initSigPads() {
    document.querySelectorAll(".sig-block .sig-pad").forEach(function (pad) {
      if (pad.dataset.wired) return; pad.dataset.wired = "1";
      var canvas = pad.querySelector("canvas");
      var block = pad.closest(".sig-block");
      var input = block ? block.querySelector(".sig-input") : null;
      if (!canvas || !input) return;
      var ctx = canvas.getContext("2d");
      function sizeCanvas() {
        var r = canvas.getBoundingClientRect();
        if (!r.width) { setTimeout(sizeCanvas, 200); return; }
        canvas.width = r.width; canvas.height = r.height;
        ctx.lineWidth = 2.2; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#2C2623";
      }
      var drawing = false, last = null;
      function pos(e) { var r = canvas.getBoundingClientRect(); var t = (e.touches && e.touches[0]) ? e.touches[0] : e; return { x: t.clientX - r.left, y: t.clientY - r.top }; }
      function start(e) { drawing = true; last = pos(e); e.preventDefault(); }
      function move(e) { if (!drawing) return; var p = pos(e); ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); last = p; input.value = canvas.toDataURL("image/png"); pad.classList.add("signed"); e.preventDefault(); }
      function end() { drawing = false; }
      canvas.addEventListener("mousedown", start); canvas.addEventListener("mousemove", move); window.addEventListener("mouseup", end);
      canvas.addEventListener("touchstart", start, { passive: false }); canvas.addEventListener("touchmove", move, { passive: false }); canvas.addEventListener("touchend", end);
      var clr = block.querySelector(".sig-clear");
      if (clr) clr.addEventListener("click", function () { ctx.clearRect(0, 0, canvas.width, canvas.height); input.value = ""; pad.classList.remove("signed"); });
      sizeCanvas();
    });
  }

  // Wire any form with [data-client-form] → save to customer base + email the business (+ Netlify if flagged)
  function initClientForms() {
    document.querySelectorAll("form[data-client-form]").forEach(function (form) {
      if (form.dataset.wired) return; form.dataset.wired = "1";
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        var type = form.getAttribute("data-client-form") || "Client submission";
        // Compulsory drawn signature
        var pad = form.querySelector(".sig-pad");
        var sigInput = form.querySelector(".sig-input");
        if (pad && (!sigInput || !sigInput.value)) {
          var hint = form.querySelector(".sig-hint");
          if (hint) { hint.style.color = "var(--rose-deep)"; hint.textContent = "Please add your signature to continue."; }
          pad.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
        var btn = form.querySelector('button[type="submit"]');
        var base = (typeof collectForm === "function") ? collectForm(form) : [];
        var sigData = sigInput ? sigInput.value : "";
        var localData = base.slice(); if (sigData) localData.push(["Signature", sigData]);
        window.dmSaveClient(type, localData);
        if (btn) { btn.disabled = true; btn.dataset.l = btn.textContent; btn.textContent = "Submitting…"; }
        // 1) Netlify Forms (only for static forms flagged data-netlify)
        if (form.getAttribute("data-netlify") === "true") {
          try { var fd = new FormData(form); var body = new URLSearchParams(); fd.forEach(function (v, k) { if (typeof v === "string") body.append(k, v); }); await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() }); } catch (err) {}
        }
        // 2) Email (signature sent as a note; the full image is in the saved record)
        var emailData = base.slice(); if (sigData) emailData.push(["Signature", "Provided (drawn signature captured)"]);
        try { if (typeof deliverForm === "function") await deliverForm(emailData, "DecoMuse — " + type); } catch (err) {}
        var ok = form.querySelector(".form-success");
        if (ok) { ok.classList.add("show"); ok.innerHTML = form.getAttribute("data-success") || "Thank you! Your details have been submitted to DecoMuse."; }
        form.reset();
        if (pad && sigInput) { var c = pad.querySelector("canvas"); if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height); pad.classList.remove("signed"); sigInput.value = ""; }
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.l; }
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    // Shareable links: ?pdf=1 auto-downloads a PDF; ?print=1 opens the print dialog
    try {
      if (/[?&]pdf=1/.test(location.search)) {
        var f = document.querySelector("form[data-client-form]");
        setTimeout(function () { if (f && f.getAttribute("data-invoice")) window.dmInvoicePDF(f); else window.dmDownloadFormPDF(f); }, 1000);
      } else if (/[?&]print=1/.test(location.search)) {
        setTimeout(function () { window.print(); }, 600);
      }
    } catch (e) {}
  }
  // Public initializer (also called by the generic form renderer after it injects a form)
  window.dmInitForms = function () { initSigPads(); initClientForms(); };
  document.addEventListener("DOMContentLoaded", window.dmInitForms);
})();
