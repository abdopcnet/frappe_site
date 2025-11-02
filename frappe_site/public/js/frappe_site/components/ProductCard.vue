<template>
  <div class="product-card" @click="goToDetail">
    <div class="product-image">
      <img :src="getImageUrl(product.image)" :alt="product.name" @error="handleImageError" />
      <button class="add-to-cart-btn" @click.stop="addToCart">Add to Cart</button>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.item_name || product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </div>
  </div>
</template>

<script src="./ProductCard.js"></script>
