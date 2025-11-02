import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Navbar.vue';
import ProductList from './ProductList.vue';

export default {
  name: 'Products',
  components: {
    Navbar,
    ProductList,
  },
  setup() {
    const route = useRoute();
    const products = ref([]);
    const categories = ref([]);
    const loading = ref(true);
    const searchQuery = ref('');
    const selectedCategory = ref(null);

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
          limit: 50,
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

    // Load products
    function loadProducts() {
      loading.value = true;
      const filters = {};

      if (selectedCategory.value) {
        filters.item_group = selectedCategory.value;
      }

      if (searchQuery.value) {
        filters.item_name = ['like', `%${searchQuery.value}%`];
      }

      /* global frappe */
      frappe.call({
        method:
          window.API_MAP?.ITEM?.GET_MANY_ITEMS ||
          'frappe_site.api.item.get_many_items.get_many_items',
        args: {
          filters: filters,
          limit: 50,
          order_by: 'item_name asc',
        },
        callback: (r) => {
          loading.value = false;
          if (r && r.message) {
            products.value = r.message || [];
          }
        },
      });
    }

    function selectCategory(category) {
      selectedCategory.value = category;
      loadProducts();
    }

    function handleSearch() {
      loadProducts();
    }

    onMounted(() => {
      loadCategories();
      if (route.query.category) {
        selectedCategory.value = route.query.category;
      }
      loadProducts();
    });

    watch(
      () => route.query.category,
      (newCategory) => {
        if (newCategory) {
          selectedCategory.value = newCategory;
          loadProducts();
        }
      },
    );

    return {
      products,
      categories,
      loading,
      searchQuery,
      selectedCategory,
      selectCategory,
      handleSearch,
    };
  },
};
