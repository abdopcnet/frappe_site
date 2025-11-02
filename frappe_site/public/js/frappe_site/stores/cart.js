import { reactive } from 'vue';

// Cart Store using Vue 3 Composition API
const cartState = reactive({
  items: [],
  total: 0,
});

// Load cart from localStorage on init
function loadCart() {
  const savedCart = localStorage.getItem('frappe_site_cart');
  if (savedCart) {
    try {
      const parsed = JSON.parse(savedCart);
      cartState.items = parsed.items || [];
      calculateTotal();
    } catch (e) {
      console.error('Error loading cart:', e);
    }
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem(
    'frappe_site_cart',
    JSON.stringify({
      items: cartState.items,
    }),
  );
}

// Calculate total
function calculateTotal() {
  cartState.total = cartState.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

// Add item to cart
function addToCart(product, quantity = 1) {
  const existingItem = cartState.items.find((item) => item.id === product.name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartState.items.push({
      id: product.name,
      name: product.item_name || product.name,
      price: product.price || 0,
      image: product.image || '',
      quantity: quantity,
    });
  }

  calculateTotal();
  saveCart();
}

// Remove item from cart
function removeFromCart(itemId) {
  const index = cartState.items.findIndex((item) => item.id === itemId);
  if (index > -1) {
    cartState.items.splice(index, 1);
    calculateTotal();
    saveCart();
  }
}

// Update item quantity
function updateQuantity(itemId, quantity) {
  const item = cartState.items.find((item) => item.id === itemId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      item.quantity = quantity;
      calculateTotal();
      saveCart();
    }
  }
}

// Clear cart
function clearCart() {
  cartState.items = [];
  cartState.total = 0;
  localStorage.removeItem('frappe_site_cart');
}

// Get cart items count
function getCartCount() {
  return cartState.items.reduce((sum, item) => sum + item.quantity, 0);
}

// Initialize cart on load
loadCart();

export const cartStore = {
  state: cartState,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartCount,
};
