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
    const customerInfo = ref({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
    });

    const cartItems = computed(() => cartStore.state.items);
    const cartTotal = computed(() => cartStore.state.total);

    async function submitOrder() {
      if (cartItems.value.length === 0) {
        alert('Your cart is empty');
        return;
      }

      submitting.value = true;

      try {
        // Create customer first
        let customerName = customerInfo.value.email;

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
                email_id: customerInfo.value.email,
                mobile_no: customerInfo.value.phone,
                address_line1: customerInfo.value.address,
                city: customerInfo.value.city,
              },
            },
            callback: (r) => {
              if (r && r.message) {
                customerName = r.message.name || customerInfo.value.email;
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

        // Redirect to success page or show success message
        alert('Order placed successfully!');
        router.push({ name: 'Home' });
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
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
      submitOrder,
      formatPrice,
    };
  },
};
