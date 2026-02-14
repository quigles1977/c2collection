/**
 * App - Handles all page rendering:
 *   index.html       - Home with hero + featured products
 *   product.html      - Product detail page
 *   collections.html  - Filterable/sortable product grid
 *   cart.html          - Shopping cart
 *   contact.html       - Contact form
 *
 * Replace PRODUCTS lookups with Shopify Storefront API queries when ready.
 */

(function () {
  "use strict";

  /* ===== Helpers ===== */

  function formatPrice(pence) {
    var pounds = pence / 100;
    return "\u00A3" + pounds.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function findProductBySlug(slug) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].slug === slug) return PRODUCTS[i];
    }
    return null;
  }

  function getFirstImage(product) {
    return product.images ? product.images[0].src : product.image;
  }

  function getFirstAlt(product) {
    return product.images ? product.images[0].alt : product.title;
  }

  function getFirstPrice(product) {
    return product.variants ? product.variants[0].price : product.price;
  }

  /* ===== Product Card (shared) ===== */

  function createProductCard(product) {
    var card = document.createElement("a");
    card.className = "product-card";
    card.href = "product.html?product=" + product.slug;
    card.setAttribute("data-product-id", product.id);

    card.innerHTML =
      '<div class="product-card-image">' +
        '<img src="' + getFirstImage(product) + '" alt="' + getFirstAlt(product) + '" loading="lazy" />' +
      '</div>' +
      '<h3 class="product-card-title">' + product.title + '</h3>' +
      '<p class="product-card-price">' + formatPrice(getFirstPrice(product)) + '</p>';

    return card;
  }

  /* ========================================================
     HOME PAGE (index.html)
     ======================================================== */

  function renderProductGrid() {
    var grid = document.getElementById("productGrid");
    if (!grid) return;
    // Don't render on collections page (handled separately)
    if (document.getElementById("collectionGrid")) return;

    var fragment = document.createDocumentFragment();
    PRODUCTS.forEach(function (product) {
      fragment.appendChild(createProductCard(product));
    });
    grid.appendChild(fragment);
  }

  /* ========================================================
     PRODUCT DETAIL PAGE (product.html)
     ======================================================== */

  function renderProductDetail() {
    var container = document.getElementById("productDetail");
    if (!container) return;

    var slug = getQueryParam("product");
    if (!slug) { window.location.href = "index.html"; return; }

    var product = findProductBySlug(slug);
    if (!product) { window.location.href = "index.html"; return; }

    document.title = product.title + " - CHAPTER TWO";

    var bc = document.getElementById("breadcrumbTitle");
    if (bc) bc.textContent = product.title;

    setText("pdpVendor", product.vendor || "");
    setText("pdpTitle", product.title);

    var activeVariant = product.variants[0];
    updatePrice(activeVariant);
    updateAvailability(activeVariant);

    var skuEl = document.getElementById("pdpSku");
    if (skuEl && activeVariant.sku) skuEl.textContent = "SKU: " + activeVariant.sku;

    var descEl = document.getElementById("pdpDescription");
    if (descEl) descEl.innerHTML = product.descriptionHtml || "";

    renderGallery(product);
    renderVariants(product);
    renderMetafields(product);
    renderTags(product);
    setupShareLinks(product);
    setupQuantity();
    setupAddToCart(product);
    setupAccordions();
    renderRelated(product);
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function updatePrice(variant) {
    var priceEl = document.getElementById("pdpPrice");
    var compareEl = document.getElementById("pdpComparePrice");
    if (priceEl) priceEl.textContent = formatPrice(variant.price);
    if (compareEl) {
      if (variant.compareAtPrice) {
        compareEl.textContent = formatPrice(variant.compareAtPrice);
        compareEl.style.display = "";
      } else {
        compareEl.style.display = "none";
      }
    }
  }

  function updateAvailability(variant) {
    var el = document.getElementById("pdpAvailability");
    if (!el) return;
    el.textContent = variant.available ? "In Stock" : "Sold Out";
    el.className = "pdp-availability " + (variant.available ? "in-stock" : "sold-out");
    var btn = document.getElementById("addToCartBtn");
    if (btn) {
      btn.disabled = !variant.available;
      btn.textContent = variant.available ? "ADD TO CART" : "SOLD OUT";
    }
  }

  function renderGallery(product) {
    var mainImg = document.getElementById("pdpMainImg");
    var thumbsContainer = document.getElementById("pdpThumbs");
    var images = product.images || [];
    if (images.length === 0) return;

    mainImg.src = images[0].src;
    mainImg.alt = images[0].alt || product.title;

    if (images.length > 1 && thumbsContainer) {
      images.forEach(function (img, idx) {
        var thumb = document.createElement("div");
        thumb.className = "pdp-thumb" + (idx === 0 ? " active" : "");
        thumb.innerHTML = '<img src="' + img.src + '" alt="' + (img.alt || "") + '" />';
        thumb.addEventListener("click", function () {
          mainImg.src = img.src;
          mainImg.alt = img.alt || product.title;
          thumbsContainer.querySelectorAll(".pdp-thumb").forEach(function (t) { t.classList.remove("active"); });
          thumb.classList.add("active");
        });
        thumbsContainer.appendChild(thumb);
      });
    }
  }

  function renderVariants(product) {
    var wrapper = document.getElementById("pdpVariants");
    var select = document.getElementById("variantSelect");
    if (!wrapper || !select) return;
    if (product.variants.length <= 1) { wrapper.style.display = "none"; return; }

    wrapper.style.display = "";
    var label = wrapper.querySelector(".pdp-label");
    if (label && product.variants[0].options && product.variants[0].options.length > 0) {
      label.textContent = product.variants[0].options[0].name;
    }

    product.variants.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = v.id;
      opt.textContent = v.title + " - " + formatPrice(v.price);
      select.appendChild(opt);
    });

    select.addEventListener("change", function () {
      var selectedId = select.value;
      for (var i = 0; i < product.variants.length; i++) {
        if (product.variants[i].id === selectedId) {
          updatePrice(product.variants[i]);
          updateAvailability(product.variants[i]);
          setText("pdpSku", "SKU: " + product.variants[i].sku);
          break;
        }
      }
    });
  }

  function renderMetafields(product) {
    var m = product.metafields || {};
    setText("pdpDimensions", m.dimensions || "Contact us for dimensions.");
    setText("pdpCondition", m.condition || "Please enquire.");
    var provEl = document.getElementById("pdpProvenance");
    if (provEl) {
      var parts = [];
      if (m.period) parts.push("Period: " + m.period);
      if (m.origin) parts.push("Origin: " + m.origin);
      if (m.material) parts.push("Material: " + m.material);
      provEl.innerHTML = parts.join("<br>");
    }
  }

  function renderTags(product) {
    var container = document.getElementById("pdpTags");
    if (!container || !product.tags) return;
    product.tags.forEach(function (tag) {
      var el = document.createElement("a");
      el.className = "pdp-tag";
      el.href = "collections.html?filter=" + encodeURIComponent(tag);
      el.textContent = tag;
      container.appendChild(el);
    });
  }

  function setupShareLinks(product) {
    var url = window.location.href;
    var title = product.title;
    var tw = document.getElementById("shareTwitter");
    if (tw) tw.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url);
    var fb = document.getElementById("shareFacebook");
    if (fb) fb.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    var pin = document.getElementById("sharePinterest");
    if (pin && product.images && product.images[0]) {
      pin.href = "https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(url) + "&media=" + encodeURIComponent(product.images[0].src) + "&description=" + encodeURIComponent(title);
    }
  }

  function setupQuantity() {
    var input = document.getElementById("qtyInput");
    var minus = document.getElementById("qtyMinus");
    var plus = document.getElementById("qtyPlus");
    if (!input || !minus || !plus) return;
    minus.addEventListener("click", function () {
      var val = parseInt(input.value, 10) || 1;
      if (val > 1) input.value = val - 1;
    });
    plus.addEventListener("click", function () {
      var val = parseInt(input.value, 10) || 1;
      if (val < 10) input.value = val + 1;
    });
  }

  function setupAddToCart(product) {
    var btn = document.getElementById("addToCartBtn");
    var buyBtn = document.getElementById("buyNowBtn");

    if (btn) {
      btn.addEventListener("click", function () {
        var select = document.getElementById("variantSelect");
        var qty = parseInt(document.getElementById("qtyInput").value, 10) || 1;
        var variant = product.variants[0];

        if (select && product.variants.length > 1) {
          for (var i = 0; i < product.variants.length; i++) {
            if (product.variants[i].id === select.value) { variant = product.variants[i]; break; }
          }
        }

        window.Cart.add({
          productId: product.id,
          variantId: variant.id,
          title: product.title,
          variantTitle: variant.title !== "Default" ? variant.title : "",
          price: variant.price,
          image: getFirstImage(product),
          quantity: qty,
          slug: product.slug
        });

        btn.textContent = "ADDED!";
        setTimeout(function () { btn.textContent = "ADD TO CART"; }, 1500);
      });
    }

    if (buyBtn) {
      buyBtn.addEventListener("click", function () {
        btn.click(); // Add to cart first
        setTimeout(function () { window.location.href = "cart.html"; }, 200);
      });
    }
  }

  function setupAccordions() {
    document.querySelectorAll(".pdp-accordion-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-target");
        var panel = document.getElementById(targetId);
        if (!panel) return;
        var isOpen = panel.classList.contains("open");
        document.querySelectorAll(".pdp-accordion-panel").forEach(function (p) { p.classList.remove("open"); });
        document.querySelectorAll(".pdp-accordion-btn").forEach(function (b) { b.classList.remove("open"); });
        if (!isOpen) { panel.classList.add("open"); btn.classList.add("open"); }
      });
    });
  }

  function renderRelated(currentProduct) {
    var container = document.getElementById("relatedProducts");
    if (!container) return;
    var related = PRODUCTS.filter(function (p) {
      return p.id !== currentProduct.id && p.productType === currentProduct.productType;
    });
    if (related.length < 4) {
      var others = PRODUCTS.filter(function (p) {
        return p.id !== currentProduct.id && p.productType !== currentProduct.productType;
      });
      related = related.concat(others);
    }
    related.slice(0, 4).forEach(function (p) { container.appendChild(createProductCard(p)); });
  }

  /* ========================================================
     COLLECTIONS PAGE (collections.html)
     ======================================================== */

  function renderCollections() {
    var grid = document.getElementById("collectionGrid");
    if (!grid) return;

    // Build filter buttons from product types
    var types = [];
    PRODUCTS.forEach(function (p) {
      if (p.productType && types.indexOf(p.productType) === -1) types.push(p.productType);
    });
    types.sort();

    var filterBar = document.getElementById("filterBar");
    if (filterBar) {
      types.forEach(function (type) {
        var btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.setAttribute("data-filter", type);
        btn.textContent = type;
        filterBar.appendChild(btn);
      });
    }

    var activeFilter = getQueryParam("filter") || "all";
    var activeSort = "default";

    function getFiltered() {
      var filtered = PRODUCTS;
      if (activeFilter !== "all") {
        filtered = PRODUCTS.filter(function (p) {
          if (p.productType === activeFilter) return true;
          if (p.tags && p.tags.indexOf(activeFilter) !== -1) return true;
          return false;
        });
      }

      // Sort
      filtered = filtered.slice(); // copy
      if (activeSort === "price-asc") {
        filtered.sort(function (a, b) { return getFirstPrice(a) - getFirstPrice(b); });
      } else if (activeSort === "price-desc") {
        filtered.sort(function (a, b) { return getFirstPrice(b) - getFirstPrice(a); });
      } else if (activeSort === "title-asc") {
        filtered.sort(function (a, b) { return a.title.localeCompare(b.title); });
      } else if (activeSort === "title-desc") {
        filtered.sort(function (a, b) { return b.title.localeCompare(a.title); });
      }

      return filtered;
    }

    function render() {
      grid.innerHTML = "";
      var items = getFiltered();
      var countEl = document.getElementById("collectionCount");
      if (countEl) countEl.textContent = items.length + " piece" + (items.length !== 1 ? "s" : "");
      items.forEach(function (p) { grid.appendChild(createProductCard(p)); });

      // Highlight active filter
      if (filterBar) {
        filterBar.querySelectorAll(".filter-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-filter") === activeFilter);
        });
      }
    }

    // Filter click handlers
    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        if (e.target.classList.contains("filter-btn")) {
          activeFilter = e.target.getAttribute("data-filter");
          render();
        }
      });
    }

    // Sort change handler
    var sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        activeSort = sortSelect.value;
        render();
      });
    }

    render();
  }

  /* ========================================================
     CART PAGE (cart.html)
     ======================================================== */

  function renderCart() {
    var emptyEl = document.getElementById("cartEmpty");
    var contentEl = document.getElementById("cartContent");
    if (!emptyEl || !contentEl) return;

    function render() {
      var items = window.Cart.get();

      if (items.length === 0) {
        emptyEl.style.display = "";
        contentEl.style.display = "none";
        return;
      }

      emptyEl.style.display = "none";
      contentEl.style.display = "";

      var itemsContainer = document.getElementById("cartItems");
      itemsContainer.innerHTML = "";

      items.forEach(function (item) {
        var row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML =
          '<div class="cart-item-product">' +
            '<a href="product.html?product=' + item.slug + '" class="cart-item-image">' +
              '<img src="' + item.image + '" alt="' + item.title + '" />' +
            '</a>' +
            '<div>' +
              '<div class="cart-item-title">' + item.title + '</div>' +
              (item.variantTitle ? '<div class="cart-item-variant">' + item.variantTitle + '</div>' : '') +
            '</div>' +
          '</div>' +
          '<div class="cart-item-price">' + formatPrice(item.price) + '</div>' +
          '<div>' +
            '<div class="pdp-qty-control">' +
              '<button class="pdp-qty-btn cart-qty-minus" data-variant="' + item.variantId + '">&minus;</button>' +
              '<input type="number" class="pdp-qty-input cart-qty-input" value="' + item.quantity + '" min="1" max="10" data-variant="' + item.variantId + '" />' +
              '<button class="pdp-qty-btn cart-qty-plus" data-variant="' + item.variantId + '">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-item-total">' + formatPrice(item.price * item.quantity) + '</div>' +
          '<button class="cart-item-remove" data-variant="' + item.variantId + '" title="Remove">&times;</button>';

        itemsContainer.appendChild(row);
      });

      // Subtotal
      var subtotalEl = document.getElementById("cartSubtotal");
      if (subtotalEl) subtotalEl.textContent = formatPrice(window.Cart.total());

      // Event delegation for cart actions
      itemsContainer.onclick = function (e) {
        var target = e.target;
        var variantId = target.getAttribute("data-variant");
        if (!variantId) return;

        if (target.classList.contains("cart-item-remove")) {
          window.Cart.remove(variantId);
          render();
        } else if (target.classList.contains("cart-qty-minus")) {
          var current = window.Cart.get().find(function (i) { return i.variantId === variantId; });
          if (current && current.quantity > 1) {
            window.Cart.updateQty(variantId, current.quantity - 1);
            render();
          }
        } else if (target.classList.contains("cart-qty-plus")) {
          var currentPlus = window.Cart.get().find(function (i) { return i.variantId === variantId; });
          if (currentPlus && currentPlus.quantity < 10) {
            window.Cart.updateQty(variantId, currentPlus.quantity + 1);
            render();
          }
        }
      };

      itemsContainer.onchange = function (e) {
        if (e.target.classList.contains("cart-qty-input")) {
          var vid = e.target.getAttribute("data-variant");
          var newQty = parseInt(e.target.value, 10);
          if (newQty >= 1 && newQty <= 10) {
            window.Cart.updateQty(vid, newQty);
            render();
          }
        }
      };
    }

    render();

    // Checkout button
    var checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function () {
        alert("This will redirect to Shopify checkout when connected.");
      });
    }
  }

  /* ========================================================
     CONTACT FORM
     ======================================================== */

  function setupContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // In production, POST to a form handler or Shopify's contact endpoint
      form.style.display = "none";
      var success = document.getElementById("formSuccess");
      if (success) success.style.display = "";
    });
  }

  /* ========================================================
     INIT
     ======================================================== */

  document.addEventListener("DOMContentLoaded", function () {
    renderProductGrid();
    renderProductDetail();
    renderCollections();
    renderCart();
    setupContactForm();
  });
})();
