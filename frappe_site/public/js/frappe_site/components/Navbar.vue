<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/">{{ brandName }}</router-link>
      </div>
      <ul class="navbar-menu">
        <li v-for="item in menuItems" :key="item.id">
          <router-link :to="item.url">{{ item.label }}</router-link>
        </li>
        <li class="cart-icon">
          <router-link to="/cart">
            🛒
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </router-link>
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
.navbar-menu li a.router-link-active {
  color: #ff6b35;
}

.cart-icon {
  position: relative;
}

.cart-icon a {
  font-size: 24px;
  text-decoration: none;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b35;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
