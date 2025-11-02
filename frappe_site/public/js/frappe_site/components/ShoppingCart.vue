<template>
  <div class="shopping-cart-page">
    <Navbar />
    <main class="main-content">
      <div class="container">
        <h1>Shopping Cart</h1>
        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>Your cart is empty</p>
          <router-link to="/products" class="shop-btn">Continue Shopping</router-link>
        </div>
        <div v-else class="cart-content">
          <div class="cart-items">
            <CartItem
              v-for="item in cartItems"
              :key="item.id"
              :item="item"
              @update-quantity="updateQuantity"
              @remove="removeItem"
            />
          </div>
          <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>{{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>{{ formatPrice(cartTotal) }}</span>
            </div>
            <button class="checkout-btn" @click="goToCheckout">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="./ShoppingCart.js"></script>

<style scoped>
.shopping-cart-page {
  min-height: 100vh;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
  margin-top: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-summary {
  background: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  height: fit-content;
}

.cart-summary h3 {
  margin: 0 0 20px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  border-top: 1px solid #ddd;
  padding-top: 12px;
  margin-top: 12px;
}

.checkout-btn {
  width: 100%;
  background: #ff6b35;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.shop-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background: #ff6b35;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>
