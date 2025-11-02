import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './Navbar.vue';
import { cartStore } from '../stores/cart.js';
import { formatCurrency } from '../utils/currency.js';

export default {
  name: 'Checkout',
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const submitting = ref(false);
    const orderSuccess = ref(false);
    const orderError = ref('');
    const customerInfo = ref({
      name: '',
      phone: '',
      address: '',
    });

    const cartItems = computed(() => cartStore.state.items);
    const cartTotal = computed(() => cartStore.state.total);

    async function submitOrder() {
      if (cartItems.value.length === 0) {
        orderError.value = 'السلة فارغة';
        return;
      }

      submitting.value = true;
      orderError.value = '';
      orderSuccess.value = false;

      try {
        // Create customer first
        let customerName = customerInfo.value.name;

        /* global frappe */
        await new Promise((resolve, reject) => {
          frappe.call({
            method:
              window.API_MAP?.CUSTOMER?.CREATE_CUSTOMER ||
              'frappe_site.api.customer.create_customer.create_customer',
            args: {
              customer_data: {
                customer_name: customerInfo.value.name,
                customer_type: 'Individual',
                customer_group: 'Individual',
                email_id: '',
                mobile_no: customerInfo.value.phone,
                address_line1: customerInfo.value.address,
                city: '',
              },
            },
            callback: (r) => {
              if (r && r.message) {
                customerName = r.message.name || customerInfo.value.name;
                resolve();
              } else {
                reject(r);
              }
            },
          });
        });

        // Create sales order
        await new Promise((resolve, reject) => {
          frappe.call({
            method:
              window.API_MAP?.SALES_ORDER?.CREATE_SALES_ORDER ||
              'frappe_site.api.sales_order.create_sales_order.create_sales_order',
            args: {
              order_data: {
                customer: customerName,
                items: cartItems.value.map((item) => ({
                  item_code: item.id,
                  qty: item.quantity,
                  rate: item.price,
                })),
              },
            },
            callback: (r) => {
              if (r && r.message) {
                resolve();
              } else {
                reject(r);
              }
            },
          });
        });

        // Clear cart
        cartStore.clearCart();

        // Show success message
        orderSuccess.value = true;

        // Redirect to home after 3 seconds
        setTimeout(() => {
          router.push({ name: 'Home' });
        }, 3000);
      } catch (error) {
        console.error('Error placing order:', error);
        orderError.value = 'حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.';
      } finally {
        submitting.value = false;
      }
    }

    function formatPrice(price) {
      if (!price && price !== 0) return '0';
      return formatCurrency(price);
    }

    return {
      customerInfo,
      cartItems,
      cartTotal,
      submitting,
      orderSuccess,
      orderError,
      submitOrder,
      formatPrice,
    };
  },
};
