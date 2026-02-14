/**
 * App - Renders the product grid.
 * Later this can be replaced with Shopify Storefront API fetch calls.
 */

(function () {
  "use strict";

  /**
   * Format price from pence to display string (e.g. 720000 -> "£7,200.00")
   */
  function formatPrice(pence) {
    const pounds = pence / 100;
    return "£" + pounds.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Create a single product card element
   */
  function createProductCard(product) {
    const card = document.createElement("a");
    card.className = "product-card";
    card.href = "/product/" + product.slug;
    card.setAttribute("data-product-id", product.id);

    card.innerHTML = `
      <div class="product-card-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
      </div>
      <h3 class="product-card-title">${product.title}</h3>
      <p class="product-card-price">${formatPrice(product.price)}</p>
    `;

    return card;
  }

  /**
   * Render all products into the grid
   */
  function renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const fragment = document.createDocumentFragment();

    PRODUCTS.forEach(function (product) {
      fragment.appendChild(createProductCard(product));
    });

    grid.appendChild(fragment);
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", renderProducts);
})();
