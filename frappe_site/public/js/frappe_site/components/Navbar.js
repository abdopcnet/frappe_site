import { computed } from 'vue';
import { cartStore } from '../stores/cart.js';

export default {
  name: 'Navbar',
  setup() {
    const cartCount = computed(() => cartStore.getCartCount());

    return {
      brandName: 'Sweets Shop',
      menuItems: [
        { id: 1, label: 'الرئيسية', url: '/' },
        { id: 2, label: 'المنتجات', url: '/products' },
        { id: 3, label: 'من نحن', url: '/about' },
        { id: 4, label: 'اتصل بنا', url: '/contact' },
      ],
      cartCount,
    };
  },
};
