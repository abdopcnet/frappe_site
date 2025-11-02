import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Products from '../components/Products.vue';
import ProductDetail from '../components/ProductDetail.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import Checkout from '../components/Checkout.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
