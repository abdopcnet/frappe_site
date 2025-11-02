<template>
  <div class="frappe-site-home">
    <Navbar />
    <Slideshow />
    <main class="main-content">
      <!-- Categories Section -->
      <section class="categories-section">
        <div class="container">
          <h2 class="section-title">Our Categories</h2>
          <div class="categories-grid" v-if="categories.length > 0">
            <div
              v-for="category in categories"
              :key="category.name"
              class="category-card"
              @click="goToProducts(category.item_group_name || category.name)"
            >
              <div class="category-image">
                <img
                  :src="getImageUrl(category.image, 'category')"
                  :alt="category.item_group_name || category.name"
                  data-type="category"
                  @error="handleImageError"
                />
              </div>
              <h3>{{ category.item_group_name || category.name }}</h3>
            </div>
          </div>
          <div v-else class="loading">Loading categories...</div>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="featured-products-section">
        <div class="container">
          <h2 class="section-title">Featured Products</h2>
          <ProductList :products="featuredProducts" :loading="loadingProducts" />
        </div>
      </section>
    </main>
  </div>
</template>

<script src="./Home.js"></script>
