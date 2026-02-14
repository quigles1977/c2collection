/**
 * Cart - localStorage-based shopping cart.
 * When connecting to Shopify, replace with Storefront API cartCreate / cartLinesAdd mutations.
 *
 * Cart items shape: { productId, variantId, title, variantTitle, price, image, quantity, slug }
 */

(function () {
  "use strict";

  var CART_KEY = "c2collection_cart";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateBadge();
  }

  function addItem(item) {
    var cart = getCart();
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].variantId === item.variantId) {
        existing = cart[i];
        break;
      }
    }

    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      item.quantity = item.quantity || 1;
      cart.push(item);
    }

    saveCart(cart);
    return cart;
  }

  function removeItem(variantId) {
    var cart = getCart().filter(function (item) {
      return item.variantId !== variantId;
    });
    saveCart(cart);
    return cart;
  }

  function updateQuantity(variantId, qty) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].variantId === variantId) {
        if (qty <= 0) {
          cart.splice(i, 1);
        } else {
          cart[i].quantity = qty;
        }
        break;
      }
    }
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateBadge();
  }

  function getTotal() {
    return getCart().reduce(function (sum, item) {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  function getItemCount() {
    return getCart().reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);
  }

  function updateBadge() {
    var count = getItemCount();
    var badges = document.querySelectorAll("#cartCount");
    badges.forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? "" : "none";
    });
  }

  // Expose globally
  window.Cart = {
    get: getCart,
    add: addItem,
    remove: removeItem,
    updateQty: updateQuantity,
    clear: clearCart,
    total: getTotal,
    count: getItemCount,
    updateBadge: updateBadge
  };
})();
