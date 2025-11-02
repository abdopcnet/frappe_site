import { useRouter } from 'vue-router';
import { cartStore } from '../stores/cart.js';
import { getImageUrl, handleImageError } from '../utils/image.js';
import { formatCurrency } from '../utils/currency.js';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    function goToDetail() {
      router.push({
        name: 'ProductDetail',
        params: { id: props.product.name },
      });
    }

    function addToCart() {
      cartStore.addToCart(props.product, 1);
      // Show notification or toast
      console.log('Added to cart:', props.product.item_name);
    }

    function formatPrice(price) {
      return formatCurrency(price);
    }

    return {
      goToDetail,
      addToCart,
      formatPrice,
      getImageUrl,
      handleImageError,
    };
  },
};
