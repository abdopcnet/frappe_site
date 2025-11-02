import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './Navbar.vue';
import CartItem from './CartItem.vue';
import { cartStore } from '../stores/cart.js';
import { formatCurrency } from '../utils/currency.js';

export default {
  name: 'ShoppingCart',
  components: {
    Navbar,
    CartItem,
  },
  setup() {
    const router = useRouter();

    const cartItems = computed(() => cartStore.state.items);
    const cartTotal = computed(() => cartStore.state.total);

    function updateQuantity(itemId, quantity) {
      cartStore.updateQuantity(itemId, quantity);
    }

    function removeItem(itemId) {
      cartStore.removeFromCart(itemId);
    }

    function goToCheckout() {
      router.push({ name: 'Checkout' });
    }

    function formatPrice(price) {
      if (!price && price !== 0) return '0';
      return formatCurrency(price);
    }

    return {
      cartItems,
      cartTotal,
      updateQuantity,
      removeItem,
      goToCheckout,
      formatPrice,
    };
  },
};
