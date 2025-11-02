<template>
  <div class="checkout-page">
    <Navbar />
    <main class="main-content">
      <div class="container">
        <h1>Checkout</h1>
        <div class="checkout-content">
          <div class="checkout-form">
            <h2>Customer Information</h2>
            <form @submit.prevent="submitOrder">
              <div class="form-group">
                <label>Full Name *</label>
                <input v-model="customerInfo.name" type="text" required />
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input v-model="customerInfo.email" type="email" required />
              </div>
              <div class="form-group">
                <label>Phone *</label>
                <input v-model="customerInfo.phone" type="tel" required />
              </div>
              <div class="form-group">
                <label>Address *</label>
                <textarea v-model="customerInfo.address" required></textarea>
              </div>
              <div class="form-group">
                <label>City *</label>
                <input v-model="customerInfo.city" type="text" required />
              </div>
              <button type="submit" class="submit-btn" :disabled="submitting">
                {{ submitting ? 'Processing...' : 'Place Order' }}
              </button>
            </form>
          </div>
          <div class="order-summary">
            <h2>Order Summary</h2>
            <div class="summary-items">
              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span>{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="summary-total">
              <span>Total:</span>
              <span>{{ formatPrice(cartTotal) }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="./Checkout.js"></script>

<style scoped>
.checkout-page {
  min-height: 100vh;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  margin-top: 30px;
}

.checkout-form h2,
.order-summary h2 {
  margin: 0 0 24px 0;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-btn {
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

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.order-summary {
  background: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  height: fit-content;
}

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  border-top: 1px solid #ddd;
  padding-top: 12px;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
}
</style>
