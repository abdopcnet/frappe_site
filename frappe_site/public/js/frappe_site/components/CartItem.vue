<template>
  <div class="cart-item">
    <img :src="getImageUrl(item.image)" :alt="item.name" @error="handleImageError" />
    <div class="item-info">
      <h3>{{ item.name }}</h3>
      <p class="item-price">{{ formatPrice(item.price) }}</p>
    </div>
    <div class="item-quantity">
      <button @click="decreaseQty">-</button>
      <input v-model.number="localQuantity" type="number" min="1" @change="updateQty" />
      <button @click="increaseQty">+</button>
    </div>
    <div class="item-total">
      {{ formatPrice(item.price * item.quantity) }}
    </div>
    <button class="remove-btn" @click="remove">×</button>
  </div>
</template>

<script src="./CartItem.js"></script>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.item-price {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-quantity button {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
}

.item-quantity input {
  width: 50px;
  text-align: center;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.item-total {
  font-weight: bold;
  font-size: 18px;
  color: #ff6b35;
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 60px 1fr;
    gap: 12px;
  }

  .item-quantity,
  .item-total,
  .remove-btn {
    grid-column: 2;
  }
}
</style>
