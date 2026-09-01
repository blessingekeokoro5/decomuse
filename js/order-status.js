/* ============================================================
   DecoMuse — Live order tracker (picking + shipping history)
   ------------------------------------------------------------
   renderOrderStatus(order, el) draws:
     • an Estimated-arrival banner
     • a live "being picked" checklist (green tick when found,
       moving cart while searching) for the first minutes
     • a full shipping history timeline with timestamps:
       placed → picked → packed → left warehouse → in transit →
       arrived at facility → customs clearance → out for delivery
       → delivered.
   Progression is timed from when the order was placed — no
   backend needed. Only shown to logged-in customers (the account
   page gates it).
   ============================================================ */
(function () {
  var MIN = 60 * 1000, HOUR = 60 * MIN, DAY = 24 * HOUR;
  var PER_ITEM = 25 * 1000, PACK_DELAY = 30 * 1000;

  function placedAt(o) {
    if (o.placedAt) return o.placedAt;
    if (o.date) { var t = Date.parse(o.date + "T09:00:00"); if (!isNaN(t)) return t; }
    return Date.now();
  }
  function fmtDate(d) { return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }); }
  function fmtTime(d) { return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

  function timeline(o) {
    var start = placedAt(o);
    var itemCount = (o.items || []).filter(Boolean).length || 1;
    var packedOff = itemCount * PER_ITEM + PACK_DELAY;
    return [
      { label: "Order placed",               detail: "We've received your order.",                off: 0 },
      { label: "Being picked",               detail: "Our team is collecting your items.",        off: 20 * 1000 },
      { label: "Packed & ready to ship",     detail: "Carefully packed and labelled.",            off: packedOff },
      { label: "Left the warehouse",         detail: "Handed to the courier for dispatch.",       off: 1 * DAY },
      { label: "In transit",                 detail: "On the move toward your city.",             off: 1 * DAY + 8 * HOUR },
      { label: "Arrived at delivery facility", detail: "Scanned in at the local sorting hub.",    off: 2 * DAY },
      { label: "Customs clearance",          detail: "Processing through customs.",               off: 2 * DAY + 12 * HOUR },
      { label: "Out for delivery",           detail: "With your driver today.",                   off: 3 * DAY + 2 * HOUR },
      { label: "Delivered",                  detail: "Left at your delivery address.",            off: 4 * DAY }
    ].map(function (e) { return { label: e.label, detail: e.detail, time: new Date(start + e.off) }; });
  }

  var TICK = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var CART = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L22 7H6"/></svg>';

  window.renderOrderStatus = function (order, el) {
    if (!el) return;
    if (el._otimer) { clearInterval(el._otimer); el._otimer = null; }
    var now = Date.now();
    var events = timeline(order);
    var packedTime = events[2].time.getTime();
    var deliveredTime = events[8].time.getTime();
    var outForDelivery = events[7].time;

    // current step = last event whose time has passed
    var current = 0;
    events.forEach(function (e, i) { if (now >= e.time.getTime()) current = i; });
    var delivered = now >= deliveredTime;
    var picking = now < packedTime;

    // ---- Estimated arrival banner ----
    var eta;
    if (delivered) eta = "Delivered on " + fmtDate(events[8].time);
    else if (now >= outForDelivery.getTime()) eta = "Estimated arrival today, from " + fmtTime(outForDelivery);
    else eta = "Estimated arrival " + fmtDate(events[8].time) + ", from " + fmtTime(outForDelivery);
    var etaBanner = '<div class="ostat-eta">📍 <span>' + eta + '</span></div>';

    // ---- Live picking checklist (only while still picking) ----
    var pickingHtml = "";
    if (picking) {
      var items = (order.items || []).filter(Boolean);
      var states = items.map(function (it, i) { return { it: it, found: now >= (placedAt(order) + (i + 1) * PER_ITEM) }; });
      var found = states.filter(function (s) { return s.found; }).length;
      if (items.length) {
        pickingHtml = '<div class="ostat-picking"><div class="ostat-picking-h">🛒 Picking your order — ' + found + ' of ' + items.length + ' found</div><ul class="ostat-items">' +
          states.map(function (s) {
            var qty = (s.it.qty && s.it.qty > 1) ? ' <span class="oi-qty">× ' + s.it.qty + '</span>' : "";
            var icon = s.found ? '<span class="ostat-ic ostat-tick">' + TICK + '</span>' : '<span class="ostat-ic ostat-cart">' + CART + '</span>';
            var word = s.found ? '<span class="oi-found">Found</span>' : '<span class="oi-search">Searching…</span>';
            return '<li class="ostat-item ' + (s.found ? "is-found" : "") + '"><span class="oi-name">' + (s.it.name || s.it.id || "Item") + qty + '</span><span class="oi-st">' + icon + word + '</span></li>';
          }).join("") + '</ul></div>';
      }
    }

    // ---- Shipping history timeline ----
    var tl = '<ol class="ostat-timeline">' + events.map(function (e, i) {
      var done = now >= e.time.getTime();
      var isCurrent = i === current && !delivered;
      var cls = done ? (isCurrent ? "done current" : "done") : "upcoming";
      var when = done ? (fmtDate(e.time) + " · " + fmtTime(e.time)) : ("Est. " + fmtDate(e.time) + " · " + fmtTime(e.time));
      return '<li class="ostat-ev ' + cls + '">' +
        '<span class="ostat-ev-dot">' + (done ? TICK : "") + '</span>' +
        '<div class="ostat-ev-body"><div class="ostat-ev-top"><strong>' + e.label + '</strong><span class="ostat-ev-time">' + when + '</span></div>' +
        '<p class="ostat-ev-detail">' + e.detail + '</p></div></li>';
    }).join("") + '</ol>';

    el.innerHTML = '<div class="ostat">' + etaBanner + pickingHtml + tl + '</div>';

    if (picking) {
      el._otimer = setInterval(function () {
        if (!document.body.contains(el)) { clearInterval(el._otimer); return; }
        window.renderOrderStatus(order, el);
      }, 3000);
    }
  };
})();
