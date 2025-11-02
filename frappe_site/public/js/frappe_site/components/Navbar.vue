<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="/assets/frappe_site/js/frappe_site/assets/logo2.jpg" alt="Company Logo" class="logo" />
    </div>
    
    <!-- Hamburger Menu Button -->
    <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'is-open': isMenuOpen }">
      <div class="navbar-center">
        <a href="#" class="nav-item">العروض</a>
        <a href="#" class="nav-item"><img src="/assets/frappe_site/js/frappe_site/assets/location.png" alt="">حدد موقعك</a>
        <a href="#" class="nav-item"><img src="/assets/frappe_site/js/frappe_site/assets/phone.png" alt="">اتصل بنا</a>
      </div>
      <div class="navbar-right">
        <a href="#" class="nav-item login-icon"><img src="/assets/frappe_site/js/frappe_site/assets/Group 1.png" alt=""> تسجيل الدخول</a>
        <a href="#" class="nav-item cart-icon"><img src="/assets/frappe_site/js/frappe_site/assets/uil_down-arrow.png" alt="">عربة التسوق<img src="/assets/frappe_site/js/frappe_site/assets/Vectorcart.png" alt=""></a>
      </div>
    </div>

    <!-- Desktop Menu -->
    <div class="desktop-menu">
      <div class="navbar-center">
        <a href="#" class="nav-item"><i class="fas fa-percent"></i>العروض</a>
        <a href="#" class="nav-item"><img src="/assets/frappe_site/js/frappe_site/assets/location.png" alt="">حدد موقعك</a>
        <a href="#" class="nav-item"><img src="/assets/frappe_site/js/frappe_site/assets/phone.png" alt="">اتصل بنا</a>
      </div>
      <div class="navbar-right">
        <router-link to="/login" class="nav-item login-icon"><img src="/assets/frappe_site/js/frappe_site/assets/Group 1.png" alt=""> تسجيل الدخول</router-link>
        <router-link to="/orders" class="nav-item cart-icon"><img src="/assets/frappe_site/js/frappe_site/assets/uil_down-arrow.png" alt="">عربة التسوق<img src="/assets/frappe_site/js/frappe_site/assets/Vectorcart.png" alt=""></router-link>
      </div>
    </div>
  </nav>

  <div class="secondary-nav">
    <router-link to="/sweets-restaurant" class="secondary-nav-item active"><img src="/assets/frappe_site/js/frappe_site/assets/image.png" class="secondary-nav-icon"> حلويات الاندلس</router-link>
    <router-link to="/food-restaurant" class="secondary-nav-item"><img src="/assets/frappe_site/js/frappe_site/assets/logo2.jpg" class="secondary-nav-icon">مذاق النبلاء </router-link>
    <router-link to="/orders" class="secondary-nav-item"><img src="/assets/frappe_site/js/frappe_site/assets/solar_chef-hat-broken.png" class="secondary-nav-icon">طلبات خاصة</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 8px 18px;
  box-shadow: 0 2px 4px rgba(173, 106, 68, 0.479);
  direction: rtl;
  position: relative;
  min-height: 64px;
  flex-wrap: nowrap;
}

.logo {
  height: 70px; 
  max-height: 64px;
  margin-left: 10px;
}

.desktop-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 auto;
  width: auto;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.menu-toggle span {
  width: 100%;
  height: 3px;
  background-color: #ff6f00;
  transition: all 0.3s ease;
}

.mobile-menu {
  display: none;
}

.navbar-center, .navbar-right {
  display: flex;
  align-items: center;
}

.navbar-center {
  flex: 1 1 auto;
  justify-content: center;
  gap: 8px;
}

.navbar-right {
  flex: 0 0 auto;
  gap: 8px;
}

.nav-item {
  color: #000;
  text-decoration: none;
  margin: 0 16px;
  padding: 6px 12px;
  display: flex;
  font-weight: 700;
  align-items: center;
  font-size: 16px;
  white-space: nowrap;
  border-radius: 6px;
}

.nav-item:hover {
  background: rgba(255,111,0,0.06);
}

.nav-item img {
  margin-left: 5px;
  height: 20px;
  width: auto;
}

.login-icon {
  color: #e46911;
}

.cart-icon {
  background-color: #ff6f00;
  color: #fff;
  padding: 8px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.cart-icon:hover {
  background-color: #f59d5a;
  border: 1px #ff6f00 solid;
}

.secondary-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #ff6f00;
  padding: 10px 0;
  direction: rtl;
  height: auto;
}

.secondary-nav-item {
  color: #fff;
  text-decoration: none;
  margin: 5px 10px;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
  white-space: nowrap;
}

.secondary-nav-item.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.secondary-nav-icon {
  width: 24px;
  height: 24px;
  margin-left: 5px;
  object-fit: contain;
}

@media screen and (max-width: 1024px) {
  .nav-item {
    margin: 0 8px;
    padding: 6px 8px;
    font-size: 14px;
  }

  .logo {
    height: 48px;
  }

  .secondary-nav-icon {
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .mobile-menu.is-open {
    display: block;
  }

  .mobile-menu .navbar-center,
  .mobile-menu .navbar-right {
    flex-direction: column;
    align-items: stretch;
  }

  .mobile-menu .nav-item {
    margin: 10px 0;
    padding: 10px;
    justify-content: flex-start;
  }

  .mobile-menu .nav-item {
    font-size: 16px;
  }

  .cart-icon {
    margin-top: 10px;
  }

  .secondary-nav {
    padding: 5px;
  }

  .secondary-nav-item {
    font-size: 14px;
    margin: 3px 5px;
  }
}

@media screen and (max-width: 480px) {
  .logo {
    height: 40px;
  }

  .nav-item {
    font-size: 14px;
  }
 
  .secondary-nav-item {
    font-size: 12px;
    margin: 2px;
    padding: 3px 5px;
  }

  .secondary-nav-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
