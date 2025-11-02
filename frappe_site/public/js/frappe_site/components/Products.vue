<template>
  <div class="products-page">
    <Navbar />
    <Slideshow />
    <main class="main-content">
      <div class="container">
        <div class="products-header">
          <h1>Our Products</h1>
          <div class="search-bar">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              @input="handleSearch"
            />
          </div>
        </div>

        <div class="products-layout">
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <h3>Categories</h3>
            <ul class="category-list">
              <li>
                <a
                  href="#"
                  :class="{ active: !selectedCategory }"
                  @click.prevent="selectCategory(null)"
                >
                  All Products
                </a>
              </li>
              <li v-for="category in categories" :key="category.name">
                <a
                  href="#"
                  :class="{
                    active: selectedCategory === (category.item_group_name || category.name),
                  }"
                  @click.prevent="selectCategory(category.item_group_name || category.name)"
                >
                  {{ category.item_group_name || category.name }}
                </a>
              </li>
            </ul>
          </aside>

          <!-- Products Grid -->
          <div class="products-content">
            <ProductList :products="products" :loading="loading" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="./Products.js"></script>

<style scoped>
.products-page {
  min-height: 100vh;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px 0;
}

.products-header h1 {
  margin: 0;
  font-size: 32px;
  color: #333;
}

.search-bar input {
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 300px;
}

.products-layout {
  display: flex;
  gap: 30px;
}

.filters-sidebar {
  width: 250px;
  flex-shrink: 0;
}

.filters-sidebar h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #333;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 8px;
}

.category-list a {
  display: block;
  padding: 10px;
  color: #666;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.category-list a:hover,
.category-list a.active {
  background: #f5f5f5;
  color: #ff6b35;
}

.products-content {
  flex: 1;
}

@media (max-width: 768px) {
  .products-layout {
    flex-direction: column;
  }

  .filters-sidebar {
    width: 100%;
  }
}
</style>
