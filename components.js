/**
 * Shared site components - header, nav, footer.
 * Injected into every page so markup stays in sync.
 * Include this script before app.js on every page.
 */

(function () {
  "use strict";

  /* ===== Detect current page for active nav highlight ===== */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  function navClass(page) {
    if (page === currentPage) return ' class="nav-active"';
    // Treat index.html as home
    if (page === "index.html" && (currentPage === "" || currentPage === "/")) return ' class="nav-active"';
    return "";
  }

  /* ===== Header ===== */
  function renderHeader() {
    var el = document.getElementById("siteHeader");
    if (!el) return;

    el.innerHTML =
      '<header class="site-header">' +
        '<div class="header-inner">' +
          '<div class="logo-area">' +
            '<a href="index.html" class="logo-link">' +
              '<div class="logo-heading">CHAPTER TWO</div>' +
              '<div class="logo-text">' +
                '<span class="logo-tagline">ANTIQUES & DECORATIVE</span>' +
              '</div>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</header>';
  }

  /* ===== Navigation ===== */
  function renderNav() {
    var el = document.getElementById("siteNav");
    if (!el) return;

    el.innerHTML =
      '<nav class="site-nav">' +
        '<div class="nav-inner">' +
          '<ul class="nav-links">' +
            '<li><a href="index.html"' + navClass("index.html") + '>HOME</a></li>' +
            '<li><a href="about.html"' + navClass("about.html") + '>ABOUT</a></li>' +
            '<li><a href="collections.html"' + navClass("collections.html") + '>COLLECTIONS</a></li>' +
            '<li><a href="https://instagram.com" target="_blank" rel="noopener">INSTAGRAM</a></li>' +
            '<li><a href="contact.html"' + navClass("contact.html") + '>CONTACT</a></li>' +
            '<li><a href="terms.html"' + navClass("terms.html") + ">T&C's</a></li>" +
          '</ul>' +
          '<div class="nav-right">' +
            '<a href="cart.html" class="nav-cart" aria-label="Shopping cart">' +
              '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>' +
                '<line x1="3" y1="6" x2="21" y2="6"/>' +
                '<path d="M16 10a4 4 0 01-8 0"/>' +
              '</svg>' +
              '<span class="nav-cart-count" id="cartCount">0</span>' +
            '</a>' +
            '<a href="https://instagram.com" target="_blank" rel="noopener" class="nav-instagram" aria-label="Instagram">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>' +
                '<circle cx="12" cy="12" r="5"/>' +
                '<circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>' +
              '</svg>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  /* ===== Footer ===== */
  function renderFooter() {
    var el = document.getElementById("siteFooter");
    if (!el) return;

    el.innerHTML =
      '<footer class="site-footer">' +
        '<div class="footer-inner">' +
          '<div class="footer-grid">' +
            '<div class="footer-col">' +
              '<h4 class="footer-heading">CHAPTER TWO</h4>' +
              '<p class="footer-text">Curated antiques and decorative pieces for the modern home. Each item is hand-selected for its character, craftsmanship and beauty.</p>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4 class="footer-heading">NAVIGATE</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="index.html">Home</a></li>' +
                '<li><a href="about.html">About</a></li>' +
                '<li><a href="collections.html">Collections</a></li>' +
                '<li><a href="contact.html">Contact</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4 class="footer-heading">INFORMATION</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="terms.html">Terms & Conditions</a></li>' +
                '<li><a href="terms.html#shipping">Shipping Policy</a></li>' +
                '<li><a href="terms.html#returns">Returns Policy</a></li>' +
                '<li><a href="terms.html#privacy">Privacy Policy</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4 class="footer-heading">FOLLOW US</h4>' +
              '<div class="footer-social">' +
                '<a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">' +
                  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>' +
                '</a>' +
              '</div>' +
              '<p class="footer-text" style="margin-top:16px;">Sign up for updates on new arrivals and events.</p>' +
              '<form class="footer-newsletter" onsubmit="event.preventDefault();this.querySelector(\'button\').textContent=\'SUBSCRIBED\';this.querySelector(\'input\').value=\'\';">' +
                '<input type="email" placeholder="Email address" required />' +
                '<button type="submit">SIGN UP</button>' +
              '</form>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<p>&copy; 2026 Chapter Two - Antiques & Decorative. All rights reserved.</p>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* ===== Init ===== */
  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderNav();
    renderFooter();
    // Update cart count from localStorage
    if (window.Cart) window.Cart.updateBadge();
  });
})();
