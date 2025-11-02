import { ref, watch } from 'vue';
import { getImageUrl, handleImageError } from '../utils/image.js';
import { formatCurrency } from '../utils/currency.js';

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-quantity', 'remove'],
  setup(props, { emit }) {
    const localQuantity = ref(props.item.quantity);

    watch(
      () => props.item.quantity,
      (newVal) => {
        localQuantity.value = newVal;
      },
    );

    function increaseQty() {
      localQuantity.value++;
      updateQty();
    }

    function decreaseQty() {
      if (localQuantity.value > 1) {
        localQuantity.value--;
        updateQty();
      }
    }

    function updateQty() {
      emit('update-quantity', props.item.id, localQuantity.value);
    }

    function remove() {
      emit('remove', props.item.id);
    }

    function formatPrice(price) {
      if (!price && price !== 0) return '0';
      return formatCurrency(price);
    }

    return {
      localQuantity,
      increaseQty,
      decreaseQty,
      updateQty,
      remove,
      formatPrice,
      getImageUrl,
      handleImageError,
    };
  },
};
