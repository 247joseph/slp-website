/* ============================================================
   SENTINEL LAW PRACTITIONERS — shared site behaviour
   Injects header / mobile drawer / bottom bar / footer,
   wires nav, accordions, scroll-reveal, forms, uploads.
   ============================================================ */
(function () {
  "use strict";

  // ---- Firm contact details (placeholders — update with real values) ----
  var FIRM = {
    name: "Sentinel Law Practitioners",
    phoneDisplay: "+91 495 796 7341",
    phoneHref: "+914957967341",
    mobiles: [
      { display: "+91 96330 91582", href: "+919633091582" },
      { display: "+91 96334 20844", href: "+919633420844" }
    ],
    whatsapp: "919633091582",
    whatsappMsg: "Hello%20Sentinel%20Law%2C%20I%27d%20like%20to%20schedule%20a%20consultation.",
    email: "sentinellaw.info@gmail.com",
    addressLine1: "Kurial Lane, Convent Road",
    addressLine2: "Kozhikode, Kerala 673032"
  };
  window.SLP_FIRM = FIRM;
  var WA = "https://wa.me/" + FIRM.whatsapp + "?text=" + FIRM.whatsappMsg;
  var TEL = "tel:" + FIRM.phoneHref;

  var LOGO = "assets/img/logo-lockup.png";
  var LOGO_WHITE = "assets/img/logo-lockup-white.png";

  // ---- Primary navigation model ----
  var PRACTICE = [
    ["criminal-law.html", "Criminal Law"],
    ["civil-litigation.html", "Civil Litigation"],
    ["family-law.html", "Family Law"],
    ["consumer-law.html", "Consumer Law"],
    ["property-litigation.html", "Property Litigation"],
    ["real-estate-law.html", "Real Estate Law"],
    ["property-verification-due-diligence.html", "Property Verification & Due Diligence"],
    ["registration-services.html", "Registration Services"],
    ["documentation-services.html", "Documentation Services"],
    ["legal-opinions.html", "Legal Opinions"],
    ["nri-legal-services.html", "NRI Legal Services"]
  ];

  // ---- Client dashboard (Whibl workspace for SLP) ----
  var DASHBOARD_URL = "https://www.whibl.live/slp";
  var EXT = ' target="_blank" rel="noopener"';

  var NAV = [
    ["home.html", "Home", null],
    ["about.html", "Firm", null],
    ["practice-areas.html", "Practice Areas", PRACTICE],
    ["team.html", "Our Experts", null],
    ["blog.html", "Insights", null],
    ["faq.html", "FAQ", null],
    ["contact.html", "Contact", null]
  ];

  function practiceMenu() {
    return PRACTICE.map(function (p) {
      return '<a href="' + p[0] + '">' + p[1] + "</a>";
    }).join("");
  }

  function navLinks(active) {
    return NAV.map(function (n) {
      var cls = n[0] === active ? "active" : "";
      if (n[2]) {
        return '<div class="nav-has-menu"><a href="' + n[0] + '" class="' + cls + '">' + n[1] +
          '</a><div class="nav-menu">' + practiceMenu() + "</div></div>";
      }
      return '<a href="' + n[0] + '" class="' + cls + '">' + n[1] + "</a>";
    }).join("");
  }

  function brand(dark) {
    var src = dark ? LOGO_WHITE : LOGO;
    return '<a class="brand" href="home.html" aria-label="Sentinel Law Practitioners home">' +
      '<img class="brand-logo" src="' + src + '" alt="Sentinel Law Practitioners"/></a>';
  }

  // ---- Header ----
  function buildHeader(active) {
    var hdr = document.createElement("header");
    hdr.className = "site-header";
    hdr.innerHTML =
      '<div class="container nav-inner">' +
        brand() +
        '<nav class="nav-links" aria-label="Primary">' + navLinks(active) + "</nav>" +
        '<div class="nav-cta">' +
          '<a class="btn btn-gold btn-dash" href="' + DASHBOARD_URL + '"' + EXT + '><span class="micn">dashboard</span>Dashboard</a>' +
          '<a class="btn btn-primary" href="contact.html#consult">Schedule Consultation</a>' +
          '<button class="nav-toggle" aria-label="Open menu" id="navToggle"><span class="micn">menu</span></button>' +
        "</div>" +
      "</div>";
    return hdr;
  }

  // ---- Mobile drawer ----
  function buildDrawer(active) {
    var d = document.createElement("div");
    d.className = "mobile-drawer";
    d.id = "mobileDrawer";
    var links = NAV.filter(function (n) { return !n[2]; }).map(function (n) {
      return '<a href="' + n[0] + '">' + n[1] + "</a>";
    }).join("");
    var practice = PRACTICE.map(function (p) {
      return '<a class="sub-link" href="' + p[0] + '">' + p[1] + "</a>";
    }).join("");
    d.innerHTML =
      '<div class="mobile-drawer-top">' + brand(true) +
        '<button class="nav-toggle" id="navClose" aria-label="Close menu"><span class="micn">close</span></button></div>' +
      '<a class="btn btn-gold btn-block btn-dash" href="' + DASHBOARD_URL + '"' + EXT + '><span class="micn">dashboard</span>Dashboard</a>' +
      '<nav class="mobile-nav" aria-label="Mobile">' +
        '<a href="home.html">Home</a><a href="about.html">Firm</a>' +
        '<div class="sub">Practice Areas</div>' + practice +
        '<a href="team.html">Our Experts</a><a href="blog.html">Insights</a>' +
        '<a href="faq.html">FAQ</a><a href="contact.html">Contact</a>' +
      "</nav>" +
      '<a class="btn btn-gold btn-block" href="contact.html#consult">Schedule Consultation</a>' +
      '<a class="btn btn-outline-light btn-block mt-2" href="' + WA + '" target="_blank" rel="noopener">WhatsApp Now</a>';
    return d;
  }

  // ---- Bottom action bar ----
  function buildBottomBar() {
    var b = document.createElement("nav");
    b.className = "bottom-bar";
    b.setAttribute("aria-label", "Quick actions");
    b.innerHTML =
      '<a href="' + TEL + '"><span class="micn">call</span><span class="lbl">Call</span></a>' +
      '<a href="' + WA + '" target="_blank" rel="noopener"><span class="micn">chat</span><span class="lbl">WhatsApp</span></a>' +
      '<a class="accent" href="contact.html#consult"><span class="micn">event_available</span><span class="lbl">Consult</span></a>';
    return b;
  }

  // ---- Footer ----
  function buildFooter() {
    var f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML =
      '<div class="container">' +
        '<div class="top">' +
          '<div class="footer-col brandcol">' + brand(true) +
            '<p class="footer-about">A Kerala-based full-service law firm safeguarding rights, securing assets, and delivering justice for individuals, families, NRIs, businesses and institutions.</p>' +
          "</div>" +
          '<div class="footer-col"><h5>Practice Areas</h5>' +
            '<a href="property-verification-due-diligence.html">Property Verification</a>' +
            '<a href="civil-litigation.html">Civil Litigation</a>' +
            '<a href="criminal-law.html">Criminal Law</a>' +
            '<a href="family-law.html">Family Law</a>' +
            '<a href="nri-legal-services.html">NRI Legal Services</a>' +
            '<a href="practice-areas.html">View All</a>' +
          "</div>" +
          '<div class="footer-col"><h5>Office</h5>' +
            '<span class="line"><b>Kozhikode, Kerala</b></span>' +
            '<span class="line">' + FIRM.addressLine1 + "</span>" +
            '<span class="line">' + FIRM.addressLine2 + "</span>" +
            '<a href="' + TEL + '">' + FIRM.phoneDisplay + "</a>" +
            FIRM.mobiles.map(function (m) { return '<a href="tel:' + m.href + '">' + m.display + "</a>"; }).join("") +
            '<a href="mailto:' + FIRM.email + '">' + FIRM.email + "</a>" +
          "</div>" +
          '<div class="footer-col"><h5>Firm</h5>' +
            '<a href="about.html">About Us</a>' +
            '<a href="team.html">Our Experts</a>' +
            '<a href="blog.html">Legal Insights</a>' +
            '<a href="faq.html">FAQ</a>' +
            '<a href="contact.html">Contact & Consultation</a>' +
            '<a href="' + DASHBOARD_URL + '"' + EXT + '>Dashboard</a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<p>© " + new Date().getFullYear() + " " + FIRM.name + ". All Rights Reserved.</p>" +
          '<div class="footer-social">' +
            '<a href="' + WA + '" target="_blank" rel="noopener" aria-label="WhatsApp"><span class="micn">chat</span></a>' +
            '<a href="mailto:' + FIRM.email + '" aria-label="Email"><span class="micn">mail</span></a>' +
            '<a href="' + TEL + '" aria-label="Call"><span class="micn">call</span></a>' +
          "</div>" +
        "</div>" +
        '<p class="footer-disclaimer">Disclaimer: The information on this website is provided for general informational purposes only and does not constitute legal advice or create an attorney–client relationship. In accordance with the rules of the Bar Council of India, this website is not intended as advertising or solicitation. Please consult a qualified advocate regarding your specific circumstances.</p>' +
      "</div>";
    return f;
  }

  // ---- Mount shared chrome ----
  function mount() {
    var active = document.body.getAttribute("data-page");
    document.body.insertBefore(buildHeader(active), document.body.firstChild);
    document.body.appendChild(buildDrawer(active));
    document.body.appendChild(buildBottomBar());
    document.body.appendChild(buildFooter());

    var toggle = document.getElementById("navToggle");
    var drawer = document.getElementById("mobileDrawer");
    var close = document.getElementById("navClose");
    function open() { drawer.classList.add("open"); document.body.style.overflow = "hidden"; }
    function shut() { drawer.classList.remove("open"); document.body.style.overflow = ""; }
    if (toggle) toggle.addEventListener("click", open);
    if (close) close.addEventListener("click", shut);
    drawer.addEventListener("click", function (e) {
      if (e.target.tagName === "A") shut();
    });

    // solid header on scroll
    var hdr = document.querySelector(".site-header");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) hdr.classList.add("is-solid");
      else hdr.classList.remove("is-solid");
    });
  }

  // ---- Accordion ----
  function wireAccordions() {
    document.querySelectorAll(".acc-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".acc-item");
        var ans = item.querySelector(".acc-a");
        var isOpen = item.classList.contains("open");
        if (isOpen) { item.classList.remove("open"); ans.style.maxHeight = null; }
        else { item.classList.add("open"); ans.style.maxHeight = ans.scrollHeight + "px"; }
      });
    });
  }

  // ---- Scroll reveal ----
  function wireReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---- Forms (demo handling) ----
  function wireForms() {
    document.querySelectorAll("form[data-demo]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = form.querySelector(".form-success");
        if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
        form.querySelectorAll("input, textarea, select").forEach(function (f) {
          if (f.type !== "submit" && f.type !== "button") f.value = "";
        });
      });
    });
  }

  // ---- File upload dropzone ----
  function wireDropzones() {
    document.querySelectorAll(".dropzone").forEach(function (zone) {
      var input = zone.querySelector('input[type="file"]');
      var list = zone.querySelector(".file-list");
      if (!input) return;
      function show() {
        if (!list) return;
        if (!input.files.length) { list.textContent = ""; return; }
        var names = Array.prototype.map.call(input.files, function (f) { return f.name; });
        list.textContent = names.join(", ");
      }
      zone.addEventListener("click", function (e) { if (e.target.tagName !== "INPUT") input.click(); });
      input.addEventListener("change", show);
      ["dragover", "dragenter"].forEach(function (ev) {
        zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.add("drag"); });
      });
      ["dragleave", "drop"].forEach(function (ev) {
        zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.remove("drag"); });
      });
      zone.addEventListener("drop", function (e) {
        if (e.dataTransfer && e.dataTransfer.files.length) { input.files = e.dataTransfer.files; show(); }
      });
    });
  }

  // ---- Contact shortcuts (data-wa / data-tel / data-mail) ----
  function wireShortcuts() {
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = WA; a.target = "_blank"; a.rel = "noopener";
    });
    document.querySelectorAll("[data-tel]").forEach(function (a) { a.href = TEL; });
    document.querySelectorAll("[data-mail]").forEach(function (a) { a.href = "mailto:" + FIRM.email; });
    document.querySelectorAll("[data-phone-text]").forEach(function (el) { el.textContent = FIRM.phoneDisplay; });
    document.querySelectorAll("[data-email-text]").forEach(function (el) { el.textContent = FIRM.email; });
  }

  // ---- Bar Council of India disclaimer (dismissible, bottom-left) ----
  function buildDisclaimer() {
    var el = document.createElement("aside");
    el.className = "bci-disclaimer";
    el.id = "bciDisclaimer";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Bar Council of India disclaimer");
    el.innerHTML =
      '<button class="bci-close" type="button" aria-label="Dismiss disclaimer">&times;</button>' +
      '<div class="bci-head"><span class="micn">gavel</span><span>Disclaimer &middot; Bar Council of India Rules</span></div>' +
      '<p class="bci-body">In accordance with the rules of the Bar Council of India, ' + FIRM.name +
      ' does not advertise or solicit work. By accessing this website (www.sentinellaw.in), you acknowledge that you are seeking ' +
      'information about the firm of your own accord and that no form of solicitation, advertisement or inducement has been made. ' +
      'The contents are for general information only, do not constitute legal advice, and do not create an attorney&ndash;client relationship.</p>' +
      '<div class="bci-actions"><button class="btn btn-gold bci-accept" type="button"><span class="micn">check</span>I Understand &amp; Agree</button></div>';
    return el;
  }

  function wireDisclaimer() {
    var KEY = "slp_bci_ack";
    var ok = false;
    try { ok = window.localStorage.getItem(KEY) === "1"; } catch (e) {}
    if (ok) return;
    var el = buildDisclaimer();
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    function dismiss(remember) {
      el.classList.remove("show");
      if (remember) { try { window.localStorage.setItem(KEY, "1"); } catch (e) {} }
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
    }
    el.querySelector(".bci-accept").addEventListener("click", function () { dismiss(true); });
    el.querySelector(".bci-close").addEventListener("click", function () { dismiss(false); });
  }

  function init() {
    mount();
    wireAccordions();
    wireReveal();
    wireForms();
    wireDropzones();
    wireShortcuts();
    wireDisclaimer();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
