<template>
  <div class="product-list">
    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="products.length === 0" class="no-products">No products found</div>
    <div v-else class="products-grid">
      <ProductCard v-for="product in products" :key="product.name" :product="product" />
    </div>
  </div>
</template>

<script src="./ProductList.js"></script>

<style scoped>
.product-list {
  width: 100%;
}

.loading,
.no-products {
  text-align: center;
  padding: 40px;
  color: #666;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
}
</style>
