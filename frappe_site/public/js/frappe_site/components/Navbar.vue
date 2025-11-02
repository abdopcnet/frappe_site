<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/">{{ brandName }}</router-link>
      </div>
      <ul class="navbar-menu">
        <li v-for="item in menuItems" :key="item.id">
          <a href="#" @click.prevent="navigateTo(item)" :class="{ active: isActive(item) }">
            {{ item.label }}
            <span v-if="item.path === '/cart' && cartCount > 0" class="cart-badge-inline">{{
              cartCount
            }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script src="./Navbar.js"></script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.navbar-brand a {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 24px;
  align-items: center;
}

.navbar-menu li a {
  color: #666;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.navbar-menu li a:hover,
.navbar-menu li a.active {
  color: #ff6b35;
}

.cart-badge-inline {
  display: inline-block;
  background: #ff6b35;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: 4px;
  font-weight: bold;
}
</style>
