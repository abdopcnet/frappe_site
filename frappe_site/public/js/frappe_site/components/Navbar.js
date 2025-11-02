import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { cartStore } from '../stores/cart.js';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const cartCount = computed(() => cartStore.getCartCount());

    const menuItems = [
      { id: 1, label: 'حلوبات الأندلس', path: '/products', query: { category: 'item_group1' } },
      {
        id: 2,
        label: 'مأكولات مذاق النبلاء',
        path: '/products',
        query: { category: 'item_group2' },
      },
      { id: 3, label: 'عروض ومناسبات', path: '/products', query: { category: 'item_group3' } },
      { id: 4, label: 'سلة المشتريات', path: '/cart', query: {} },
    ];

    function navigateTo(item) {
      router.push({
        path: item.path,
        query: item.query,
      });
    }

    function isActive(item) {
      if (item.path === '/cart') {
        return route.path === '/cart';
      }
      if (item.path === '/products' && item.query.category) {
        return route.path === '/products' && route.query.category === item.query.category;
      }
      return route.path === item.path;
    }

    return {
      brandName: 'Sweets Shop',
      menuItems,
      cartCount,
      navigateTo,
      isActive,
    };
  },
};
