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
            // Featured categories come first, then API categories
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
