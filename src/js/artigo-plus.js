/* artigo-plus.js — interações do cabeçalho e laterais dos artigos */
(function () {
  "use strict";
  var WA = "https://wa.me/5591986344794?text=" + encodeURIComponent(
    "Olá! Vim através de um artigo do site da SBA e gostaria de falar com um advogado."
  );

  function ready(fn){ if(document.readyState!=="loading"){fn();} else {document.addEventListener("DOMContentLoaded",fn);} }

  ready(function () {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- Menu mobile ---- */
    var burger = document.getElementById("apxBurger");
    var menu = document.getElementById("apxMenu");
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* ---- Barra de progresso (idempotente com script.js) ---- */
    var bar = document.getElementById("scrollProgress");
    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max * 100 : 0;
      if (bar) bar.style.width = pct + "%";
      var top = document.getElementById("apxTop");
      if (top) { (window.scrollY > 700) ? top.classList.add("is-show") : top.classList.remove("is-show"); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---- Botões flutuantes (WhatsApp + voltar ao topo) ---- */
    var fabs = document.createElement("div");
    fabs.className = "apx-fabs";
    fabs.innerHTML =
      '<a class="apx-fab apx-fab-wa" href="' + WA + '" aria-label="Falar no WhatsApp">' +
        '<i class="fab fa-whatsapp" style="font-size:1.25rem"></i><span class="apx-lbl">Fale com um advogado</span></a>' +
      '<button class="apx-fab apx-fab-top" id="apxTop" aria-label="Voltar ao topo"><i class="fas fa-arrow-up"></i></button>';
    document.body.appendChild(fabs);
    var topBtn = document.getElementById("apxTop");
    if (topBtn) topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });

    /* ---- Índice flutuante nas laterais (a partir do "Sumário") ---- */
    var sumario = document.querySelector('nav[aria-label="Sumário"]');
    var links = sumario ? Array.prototype.slice.call(sumario.querySelectorAll('a[href^="#"]')) : [];
    if (!links.length) {
      // fallback: monta a partir das seções com id
      links = Array.prototype.slice.call(document.querySelectorAll("article section[id]")).map(function (s) {
        var h = s.querySelector("h2");
        if (!h) return null;
        var a = document.createElement("a");
        a.href = "#" + s.id; a.textContent = h.textContent.trim();
        return a;
      }).filter(Boolean);
    }
    if (links.length >= 3) {
      var toc = document.createElement("aside");
      toc.className = "apx-toc"; toc.setAttribute("aria-label", "Índice do artigo");
      toc.innerHTML = '<p class="apx-toc-title">Neste artigo</p>';
      var map = [];
      links.forEach(function (src) {
        var id = (src.getAttribute("href") || "").replace(/^#/, "");
        if (!id) return;
        var a = document.createElement("a");
        a.href = "#" + id;
        a.textContent = src.textContent.trim();
        a.addEventListener("click", function (e) {
          var target = document.getElementById(id);
          if (target) { e.preventDefault(); target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); history.replaceState(null, "", "#" + id); }
        });
        toc.appendChild(a);
        map.push({ id: id, link: a });
      });
      document.body.appendChild(toc);
      setTimeout(function () { toc.classList.add("is-ready"); }, 30);

      /* scrollspy */
      if ("IntersectionObserver" in window) {
        var spy = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              map.forEach(function (m) { m.link.classList.toggle("is-active", m.id === en.target.id); });
            }
          });
        }, { rootMargin: "-30% 0px -60% 0px" });
        map.forEach(function (m) { var el = document.getElementById(m.id); if (el) spy.observe(el); });
      }
    }

    onScroll();
  });
})();
