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
      delivery_date: '',
    });

    const cartItems = computed(() => cartStore.state.items);
    const cartTotal = computed(() => cartStore.state.total);

    async function submitOrder() {
      if (cartItems.value.length === 0) {
        orderError.value = 'السلة فارغة';
        return;
      }

      // Validate delivery date
      if (!customerInfo.value.delivery_date) {
        orderError.value = 'يرجى اختيار تاريخ التسليم';
        return;
      }

      const deliveryDate = new Date(customerInfo.value.delivery_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      deliveryDate.setHours(0, 0, 0, 0);

      if (deliveryDate < today) {
        orderError.value = 'تاريخ التسليم لا يمكن أن يكون قبل اليوم';
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
                transaction_date: new Date().toISOString().split('T')[0], // Today's date
                delivery_date: customerInfo.value.delivery_date,
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

    // Get minimum delivery date (today)
    const minDeliveryDate = computed(() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    });

    return {
      customerInfo,
      cartItems,
      cartTotal,
      submitting,
      orderSuccess,
      orderError,
      minDeliveryDate,
      submitOrder,
      formatPrice,
    };
  },
};
