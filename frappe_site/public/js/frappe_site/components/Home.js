import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './Navbar.vue';
import Slideshow from './Slideshow.vue';
import ProductList from './ProductList.vue';
import { getImageUrl, handleImageError } from '../utils/image.js';

export default {
  name: 'Home',
  components: {
    Navbar,
    Slideshow,
    ProductList,
  },
  setup() {
    const router = useRouter();
    const categories = ref([]);
    const featuredProducts = ref([]);
    const loadingProducts = ref(true);

    // Load categories
    function loadCategories() {
      /* global frappe */
      frappe.call({
        method:
          window.API_MAP?.ITEM_GROUP?.GET_MANY_ITEM_GROUPS ||
          'frappe_site.api.item_group.get_many_item_groups.get_many_item_groups',
        args: {
          filters: {
            custom_website_group: 1,
          },
          limit: 10, // Limit to 10 categories only
        },
        callback: (r) => {
          if (r && r.message) {
            // Filter and deduplicate categories
            const apiCategories = r.message || [];

            // Filter only categories with custom_website_group=1
            const filteredCategories = apiCategories.filter(
              (cat) => cat.custom_website_group === 1,
            );

            // Remove duplicates based on name or item_group_name
            const uniqueCategories = [];
            const seen = new Set();

            filteredCategories.forEach((cat) => {
              const key = cat.item_group_name || cat.name;
              if (key && !seen.has(key)) {
                seen.add(key);
                uniqueCategories.push(cat);
              }
            });

            // Only show categories from API that have custom_website_group=1
            categories.value = uniqueCategories;
          } else {
            // If API fails, show empty array
            categories.value = [];
          }
        },
      });
    }

    // Load featured products
    function loadFeaturedProducts() {
      loadingProducts.value = true;
      /* global frappe */
      frappe.call({
        method:
          window.API_MAP?.ITEM?.GET_MANY_ITEMS ||
          'frappe_site.api.item.get_many_items.get_many_items',
        args: {
          filters: {},
          limit: 8,
          order_by: 'creation desc',
        },
        callback: (r) => {
          loadingProducts.value = false;
          if (r && r.message) {
            featuredProducts.value = r.message || [];
          }
        },
      });
    }

    // Navigate to products page
    function goToProducts(categoryName) {
      router.push({
        name: 'Products',
        query: { category: categoryName },
      });
    }

    onMounted(() => {
      loadCategories();
      loadFeaturedProducts();
    });

    return {
      categories,
      featuredProducts,
      loadingProducts,
      goToProducts,
      getImageUrl,
      handleImageError,
    };
  },
};
