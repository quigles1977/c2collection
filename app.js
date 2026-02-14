/**
 * App - Handles both the product grid (index.html) and
 * the product detail page (product.html).
 *
 * Later, replace the local PRODUCTS lookup with
 * Shopify Storefront API GraphQL queries.
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
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function findProductBySlug(slug) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].slug === slug) return PRODUCTS[i];
    }
    return null;
  }

  /* ===== Collection Grid (index.html) ===== */

  function createProductCard(product) {
    var card = document.createElement("a");
    card.className = "product-card";
    card.href = "product.html?product=" + product.slug;
    card.setAttribute("data-product-id", product.id);

    var img = product.images ? product.images[0].src : product.image;
    var alt = product.images ? product.images[0].alt : product.title;
    var price = product.variants ? product.variants[0].price : product.price;

    card.innerHTML =
      '<div class="product-card-image">' +
        '<img src="' + img + '" alt="' + alt + '" loading="lazy" />' +
      '</div>' +
      '<h3 class="product-card-title">' + product.title + '</h3>' +
      '<p class="product-card-price">' + formatPrice(price) + '</p>';

    return card;
  }

  function renderProductGrid() {
    var grid = document.getElementById("productGrid");
    if (!grid) return;

    var fragment = document.createDocumentFragment();
    PRODUCTS.forEach(function (product) {
      fragment.appendChild(createProductCard(product));
    });
    grid.appendChild(fragment);
  }

  /* ===== Product Detail Page (product.html) ===== */

  function renderProductDetail() {
    var container = document.getElementById("productDetail");
    if (!container) return;

    var slug = getQueryParam("product");
    if (!slug) { window.location.href = "index.html"; return; }

    var product = findProductBySlug(slug);
    if (!product) { window.location.href = "index.html"; return; }

    // Page title
    document.title = product.title + " - C2 COLLECTION";

    // Breadcrumb
    var bc = document.getElementById("breadcrumbTitle");
    if (bc) bc.textContent = product.title;

    // Vendor
    var vendorEl = document.getElementById("pdpVendor");
    if (vendorEl) vendorEl.textContent = product.vendor || "";

    // Title
    var titleEl = document.getElementById("pdpTitle");
    if (titleEl) titleEl.textContent = product.title;

    // Active variant (default to first)
    var activeVariant = product.variants[0];

    // Price
    updatePrice(activeVariant);

    // Availability
    updateAvailability(activeVariant);

    // SKU
    var skuEl = document.getElementById("pdpSku");
    if (skuEl && activeVariant.sku) {
      skuEl.textContent = "SKU: " + activeVariant.sku;
    }

    // Description
    var descEl = document.getElementById("pdpDescription");
    if (descEl) descEl.innerHTML = product.descriptionHtml || "";

    // Images
    renderGallery(product);

    // Variants
    renderVariants(product);

    // Metafields / accordion details
    renderMetafields(product);

    // Tags
    renderTags(product);

    // Share links
    setupShareLinks(product);

    // Quantity controls
    setupQuantity();

    // Add to cart
    setupAddToCart(product);

    // Accordion
    setupAccordions();

    // Related products
    renderRelated(product);
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
    if (variant.available) {
      el.textContent = "In Stock";
      el.className = "pdp-availability in-stock";
    } else {
      el.textContent = "Sold Out";
      el.className = "pdp-availability sold-out";
    }
    // Update add to cart button
    var btn = document.getElementById("addToCartBtn");
    if (btn) {
      btn.disabled = !variant.available;
      btn.textContent = variant.available ? "ADD TO CART" : "SOLD OUT";
    }
  }

  /* --- Gallery --- */

  function renderGallery(product) {
    var mainImg = document.getElementById("pdpMainImg");
    var thumbsContainer = document.getElementById("pdpThumbs");
    var images = product.images || [];

    if (images.length === 0) return;

    // Set main image
    mainImg.src = images[0].src;
    mainImg.alt = images[0].alt || product.title;

    // Thumbnails (only if >1 image)
    if (images.length > 1 && thumbsContainer) {
      images.forEach(function (img, idx) {
        var thumb = document.createElement("div");
        thumb.className = "pdp-thumb" + (idx === 0 ? " active" : "");
        thumb.innerHTML = '<img src="' + img.src + '" alt="' + (img.alt || "") + '" />';
        thumb.addEventListener("click", function () {
          mainImg.src = img.src;
          mainImg.alt = img.alt || product.title;
          // Update active state
          var all = thumbsContainer.querySelectorAll(".pdp-thumb");
          for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
          thumb.classList.add("active");
        });
        thumbsContainer.appendChild(thumb);
      });
    }
  }

  /* --- Variants --- */

  function renderVariants(product) {
    var wrapper = document.getElementById("pdpVariants");
    var select = document.getElementById("variantSelect");
    if (!wrapper || !select) return;

    // Only show if more than one variant
    if (product.variants.length <= 1) {
      wrapper.style.display = "none";
      return;
    }

    wrapper.style.display = "";

    // Build option label from first option name
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
          // Update SKU
          var skuEl = document.getElementById("pdpSku");
          if (skuEl) skuEl.textContent = "SKU: " + product.variants[i].sku;
          break;
        }
      }
    });
  }

  /* --- Metafields --- */

  function renderMetafields(product) {
    var m = product.metafields || {};

    var dimEl = document.getElementById("pdpDimensions");
    if (dimEl) dimEl.textContent = m.dimensions || "Contact us for dimensions.";

    var condEl = document.getElementById("pdpCondition");
    if (condEl) condEl.textContent = m.condition || "Please enquire.";

    var provEl = document.getElementById("pdpProvenance");
    if (provEl) {
      var parts = [];
      if (m.period) parts.push("Period: " + m.period);
      if (m.origin) parts.push("Origin: " + m.origin);
      if (m.material) parts.push("Material: " + m.material);
      provEl.innerHTML = parts.join("<br>");
    }
  }

  /* --- Tags --- */

  function renderTags(product) {
    var container = document.getElementById("pdpTags");
    if (!container || !product.tags) return;

    product.tags.forEach(function (tag) {
      var el = document.createElement("a");
      el.className = "pdp-tag";
      el.href = "index.html";
      el.textContent = tag;
      container.appendChild(el);
    });
  }

  /* --- Share --- */

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

  /* --- Quantity --- */

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
      var max = parseInt(input.max, 10) || 10;
      if (val < max) input.value = val + 1;
    });
  }

  /* --- Add to Cart --- */

  function setupAddToCart(product) {
    var btn = document.getElementById("addToCartBtn");
    var buyBtn = document.getElementById("buyNowBtn");

    if (btn) {
      btn.addEventListener("click", function () {
        var select = document.getElementById("variantSelect");
        var qty = parseInt(document.getElementById("qtyInput").value, 10) || 1;
        var variantId = select ? select.value : product.variants[0].id;

        // Placeholder: log to console. Replace with Shopify Cart API call.
        console.log("Add to cart:", {
          productId: product.id,
          variantId: variantId,
          quantity: qty
        });

        btn.textContent = "ADDED!";
        setTimeout(function () { btn.textContent = "ADD TO CART"; }, 1500);
      });
    }

    if (buyBtn) {
      buyBtn.addEventListener("click", function () {
        // Placeholder: would redirect to Shopify checkout
        console.log("Buy now:", product.id);
        alert("This will redirect to checkout when connected to Shopify.");
      });
    }
  }

  /* --- Accordions --- */

  function setupAccordions() {
    var buttons = document.querySelectorAll(".pdp-accordion-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-target");
        var panel = document.getElementById(targetId);
        if (!panel) return;

        var isOpen = panel.classList.contains("open");
        // Close all
        document.querySelectorAll(".pdp-accordion-panel").forEach(function (p) { p.classList.remove("open"); });
        document.querySelectorAll(".pdp-accordion-btn").forEach(function (b) { b.classList.remove("open"); });

        // Toggle this one
        if (!isOpen) {
          panel.classList.add("open");
          btn.classList.add("open");
        }
      });
    });
  }

  /* --- Related Products --- */

  function renderRelated(currentProduct) {
    var container = document.getElementById("relatedProducts");
    if (!container) return;

    // Pick up to 4 other products (same productType preferred, else random)
    var related = PRODUCTS.filter(function (p) {
      return p.id !== currentProduct.id && p.productType === currentProduct.productType;
    });

    // If not enough of same type, fill with others
    if (related.length < 4) {
      var others = PRODUCTS.filter(function (p) {
        return p.id !== currentProduct.id && p.productType !== currentProduct.productType;
      });
      related = related.concat(others);
    }

    related = related.slice(0, 4);

    var fragment = document.createDocumentFragment();
    related.forEach(function (product) {
      fragment.appendChild(createProductCard(product));
    });
    container.appendChild(fragment);
  }

  /* ===== Initialise ===== */

  document.addEventListener("DOMContentLoaded", function () {
    renderProductGrid();
    renderProductDetail();
  });
})();
