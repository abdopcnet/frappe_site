<template>
  <div class="checkout-page">
    <Navbar />
    <main class="main-content">
      <div class="container">
        <h1>Checkout</h1>
        <div class="checkout-content">
          <div class="checkout-form">
            <h2>معلومات العميل</h2>

            <!-- Success Message -->
            <div v-if="orderSuccess" class="success-message">
              <div class="success-icon">✓</div>
              <h3>تم إتمام الطلب بنجاح!</h3>
              <p>شكراً لك. سيتم توجيهك إلى الصفحة الرئيسية...</p>
            </div>

            <!-- Error Message -->
            <div v-if="orderError" class="error-message">
              <div class="error-icon">✗</div>
              <p>{{ orderError }}</p>
            </div>

            <!-- Order Form -->
            <form v-if="!orderSuccess" @submit.prevent="submitOrder">
              <div class="form-group">
                <label>الاسم *</label>
                <input v-model="customerInfo.name" type="text" required />
              </div>
              <div class="form-group">
                <label>رقم الهاتف *</label>
                <input v-model="customerInfo.phone" type="tel" required />
              </div>
              <div class="form-group">
                <label>العنوان *</label>
                <textarea v-model="customerInfo.address" required></textarea>
              </div>
              <div class="form-group">
                <label>تاريخ التسليم *</label>
                <input
                  v-model="customerInfo.delivery_date"
                  type="date"
                  :min="minDeliveryDate"
                  required
                />
              </div>
              <button type="submit" class="submit-btn" :disabled="submitting">
                {{ submitting ? 'جاري المعالجة...' : 'إتمام الطلب' }}
              </button>
            </form>
          </div>
          <div class="order-summary">
            <h2>ملخص الطلب</h2>
            <div class="summary-items">
              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span>{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="summary-total">
              <span>الإجمالي:</span>
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

.success-message {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
}

.success-icon {
  font-size: 48px;
  color: #28a745;
  margin-bottom: 16px;
}

.success-message h3 {
  color: #155724;
  margin: 0 0 8px 0;
  font-size: 24px;
}

.success-message p {
  color: #155724;
  margin: 0;
}

.error-message {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.error-icon {
  font-size: 24px;
  color: #721c24;
}

.error-message p {
  color: #721c24;
  margin: 0;
}
</style>
