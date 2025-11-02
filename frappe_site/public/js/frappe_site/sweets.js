import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router/index.js';
import eventBus from './utils/eventBus.js';

// Define Vue 3 feature flags for better tree-shaking and performance
if (typeof window !== 'undefined') {
  window.__VUE_OPTIONS_API__ = true;
  window.__VUE_PROD_DEVTOOLS__ = false;
  window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
}

// Define SetVueGlobals function to set up Vue global properties
function SetVueGlobals(app) {
  // Set up global properties that components might need
  app.config.globalProperties.$frappe = frappe;
  app.config.globalProperties.$call = frappe.call.bind(frappe);
  app.config.globalProperties.$eventBus = eventBus;
  app.config.globalProperties.__ = frappe._ || ((str) => str);

  // Make common Frappe utilities available globally
  if (typeof frappe !== 'undefined') {
    app.config.globalProperties.$format = frappe.format;
    app.config.globalProperties.$db = frappe.db;
  }
}

frappe.provide('frappe.FrappeSite');

frappe.FrappeSite.sweets = class {
  constructor({ parent }) {
    this.$parent = $(document);
    this.page = parent.page;
    this.make_body();
  }

  make_body() {
    this.$el = this.$parent.find('.main-section');

    const app = createApp(App);

    // Set up global properties BEFORE mounting
    SetVueGlobals(app);

    // Use router
    app.use(router);

    // Store app reference globally
    window.frappeSiteApp = app;

    // Mount the app
    app.mount(this.$el[0]);
  }
};
