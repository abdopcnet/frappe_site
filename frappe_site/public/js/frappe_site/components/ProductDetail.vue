<template>
  <div class="product-detail-page">
    <Navbar />
    <main class="main-content">
      <div class="container" v-if="product">
        <div class="product-detail">
          <div class="product-image-section">
            <img
              :src="getImageUrl(product.image)"
              :alt="product.item_name"
              @error="handleImageError"
            />
          </div>
          <div class="product-info-section">
            <h1>{{ product.item_name || product.name }}</h1>
            <p class="product-price">{{ formatPrice(product.price) }}</p>
            <p class="product-description">
              {{ product.description || 'No description available' }}
            </p>
            <div class="product-actions">
              <div class="quantity-selector">
                <button @click="decreaseQuantity">-</button>
                <input v-model.number="quantity" type="number" min="1" />
                <button @click="increaseQuantity">+</button>
              </div>
              <button class="add-to-cart-btn-large" @click="addToCart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading">Loading product...</div>
    </main>
  </div>
</template>

<script src="./ProductDetail.js"></script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px 0;
}

.product-image-section img {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.product-info-section h1 {
  margin: 0 0 16px 0;
  font-size: 32px;
  color: #333;
}

.product-price {
  font-size: 28px;
  font-weight: bold;
  color: #ff6b35;
  margin: 0 0 24px 0;
}

.product-description {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 32px;
}

.product-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-selector button {
  background: #f5f5f5;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 18px;
}

.quantity-selector input {
  border: none;
  width: 60px;
  text-align: center;
  padding: 10px;
  font-size: 16px;
}

.add-to-cart-btn-large {
  background: #ff6b35;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.add-to-cart-btn-large:hover {
  background: #e55a2b;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}
</style>
