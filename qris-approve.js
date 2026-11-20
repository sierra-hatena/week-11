(function () {
  "use strict";

  const ORDERS_KEY = "nk_orders_v1";
  const CHANNEL_NAME = "nada_klasik_realtime_v1";

  const root = document.getElementById("sim-root");
  const logEl = document.getElementById("sim-log");
  const params = new URLSearchParams(window.location.search);
  const focusOrderId = params.get("order") || "";

  let channel = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (_) {
      channel = null;
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatRupiah(amount) {
    return "Rp " + (Number(amount) || 0).toLocaleString("id-ID");
  }

  function formatTime(iso) {
    if (!iso) return "-";
    return new Date(iso).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  function getOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function setOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const target = orders.find(function (o) {
      return o.id === orderId;
    });
    if (!target) return;

    target.status = newStatus;
    if (newStatus === "PAID") {
      target.paidAt = new Date().toISOString();
      target.approvalRef = "APR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    } else if (newStatus === "REJECTED") {
      target.rejectedAt = new Date().toISOString();
    }

    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    if (channel) {
      try {
        channel.postMessage({
          type: "ORDER_STATUS_CHANGED",
          payload: { orderId: orderId, status: newStatus },
          ts: Date.now()
        });
      } catch (_) {}
    }

    logEl.textContent =
      "Sinyal realtime terkirim: " + orderId + " -> " + newStatus + " (" + formatTime(new Date().toISOString()) + ")";
    render();
  }

  function render() {
    const orders = getOrders();
    const pending = orders.filter(function (o) {
      return o.status === "PENDING";
    });
    const processed = orders.filter(function (o) {
      return o.status !== "PENDING";
    });

    if (focusOrderId) {
      pending.sort(function (a, b) {
        if (a.id === focusOrderId) return -1;
        if (b.id === focusOrderId) return 1;
        return 0;
      });
    }

    const pendingHtml =
      pending.length === 0
        ? '<div class="empty">Tidak ada pembayaran QRIS yang menunggu approval.</div>'
        : '<div class="list">' +
          pending.map(function (o) {
            const isFocus = focusOrderId && o.id === focusOrderId;
            return (
              '<div class="tx-card ' + (isFocus ? "highlight" : "") + '">' +
              '  <div>' +
              '    <div class="tx-id">' + escapeHtml(o.id) + (isFocus ? " &bull; TARGET" : "") + '</div>' +
              '    <div class="tx-meta">' + escapeHtml(o.customer.nama) + ' &bull; ' + escapeHtml(o.qrisRef) + ' &bull; ' + formatTime(o.createdAt) + '</div>' +
              '    <div class="tx-amount">' + formatRupiah(o.grandTotal) + '</div>' +
              '  </div>' +
              '  <div class="tx-actions">' +
              '    <button type="button" class="btn btn-approve" data-action="PAID" data-id="' + escapeHtml(o.id) + '">Approve</button>' +
              '    <button type="button" class="btn btn-reject" data-action="REJECTED" data-id="' + escapeHtml(o.id) + '">Reject</button>' +
              '  </div>' +
              '</div>'
            );
          }).join("") +
          '</div>';

    const processedHtml =
      processed.length === 0
        ? '<div class="empty">Belum ada transaksi yang diproses.</div>'
        : '<div class="list">' +
          processed.slice(0, 10).map(function (o) {
            const tag =
              o.status === "PAID"
                ? '<span class="tag tag-paid">PAID</span>'
                : '<span class="tag tag-rejected">REJECTED</span>';
            return (
              '<div class="tx-card">' +
              '  <div>' +
              '    <div class="tx-id">' + escapeHtml(o.id) + '</div>' +
              '    <div class="tx-meta">' + escapeHtml(o.customer.nama) + ' &bull; ' + formatRupiah(o.grandTotal) + '</div>' +
              '  </div>' +
              '  <div>' + tag + '</div>' +
              '</div>'
            );
          }).join("") +
          '</div>';

    root.innerHTML =
      '<div class="section-label">Menunggu Approval (' + pending.length + ')</div>' +
      pendingHtml +
      '<div class="section-label">Baru Diproses (' + processed.length + ')</div>' +
      processedHtml;
  }

  root.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    const id = btn.getAttribute("data-id");
    setOrderStatus(id, action);
  });

  window.addEventListener("storage", function (e) {
    if (e.key === ORDERS_KEY) {
      render();
    }
  });

  if (channel) {
    channel.addEventListener("message", function () {
      render();
    });
  }

  setInterval(render, 1500);
  render();
})();