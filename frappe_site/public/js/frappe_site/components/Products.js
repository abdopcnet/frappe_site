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

    // Featured categories (hardcoded)
    const featuredCategories = [
      {
        name: 'حلوبات الاندلس',
        item_group_name: 'حلوبات الاندلس',
        image: null,
        is_featured: true,
      },
      {
        name: 'مأكولات مذاق النبلاء',
        item_group_name: 'مأكولات مذاق النبلاء',
        image: null,
        is_featured: true,
      },
      {
        name: 'عروض الحفلات والمناسبات',
        item_group_name: 'عروض الحفلات والمناسبات',
        image: null,
        is_featured: true,
      },
    ];

    // Load categories
    function loadCategories() {
      /* global frappe */
      frappe.call({
        method:
          window.API_MAP?.ITEM_GROUP?.GET_MANY_ITEM_GROUPS ||
          'frappe_site.api.item_group.get_many_item_groups.get_many_item_groups',
        args: {
          filters: {},
          limit: 50,
        },
        callback: (r) => {
          if (r && r.message) {
            const apiCategories = r.message || [];

            // Merge featured categories with API categories
            const allCategories = [...featuredCategories];

            // Add API categories that are not in featured list
            apiCategories.forEach((cat) => {
              const exists = featuredCategories.find(
                (fc) => fc.name === cat.name || fc.item_group_name === cat.item_group_name,
              );
              if (!exists) {
                allCategories.push(cat);
              }
            });

            categories.value = allCategories;
          } else {
            // If API fails, use featured categories only
            categories.value = featuredCategories;
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
