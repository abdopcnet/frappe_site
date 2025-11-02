import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from './Navbar.vue';
import { cartStore } from '../stores/cart.js';
import { getImageUrl, handleImageError } from '../utils/image.js';
import { formatCurrency } from '../utils/currency.js';

export default {
  name: 'ProductDetail',
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null);
    const quantity = ref(1);

    function loadProduct() {
      /* global frappe */
      frappe.call({
        method: window.API_MAP?.ITEM?.GET_ITEM || 'frappe_site.api.item.get_item.get_item',
        args: {
          item_code: route.params.id,
        },
        callback: (r) => {
          if (r && r.message) {
            product.value = r.message;
          }
        },
      });
    }

    function increaseQuantity() {
      quantity.value++;
    }

    function decreaseQuantity() {
      if (quantity.value > 1) {
        quantity.value--;
      }
    }

    function addToCart() {
      if (product.value) {
        cartStore.addToCart(product.value, quantity.value);
        router.push({ name: 'ShoppingCart' });
      }
    }

    function formatPrice(price) {
      return formatCurrency(price);
    }

    onMounted(() => {
      loadProduct();
    });

    return {
      product,
      quantity,
      increaseQuantity,
      decreaseQuantity,
      addToCart,
      formatPrice,
      getImageUrl,
      handleImageError,
    };
  },
};
