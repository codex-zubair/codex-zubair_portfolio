(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sticky nav shrink ---------- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".section, .card, .project, .contact-card, .stats, .fiverr-card, .timeline li, .stack-col"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    if (prefersReduced) { el.textContent = target + suffix; return; }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Stack bars ---------- */
  function fillBars() {
    document.querySelectorAll(".bar").forEach(function (b) { b.classList.add("in"); });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.classList.contains("stat-num")) animateCount(el);
        if (el.classList.contains("stack-grid")) fillBars();
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(function (el) { io.observe(el); });
    document.querySelectorAll(".stat-num").forEach(function (el) { io.observe(el); });
    var stackGrid = document.querySelector(".stack-grid");
    if (stackGrid) io.observe(stackGrid);
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll(".stat-num").forEach(animateCount);
    fillBars();
  }

  /* ---------- Card cursor glow ---------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("id");
        navAnchors.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + id;
          a.style.color = on ? "var(--text)" : "";
        });
      });
    }, { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
