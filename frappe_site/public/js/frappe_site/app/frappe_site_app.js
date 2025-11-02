/* global frappe */
import { createApp } from 'vue';
import eventBus from '../utils/eventBus.js';
import router from '../router/index.js';
import App from '../components/App.vue';

// Initialize Vue app
function initFrappeSiteApp() {
  const container = document.getElementById('frappe-site-app');
  if (!container) {
    console.warn('Frappe Site app container not found');
    return;
  }

  // Check if app is already mounted
  if (container.__vue_app__) {
    console.warn('Frappe Site app already mounted');
    return;
  }

  const app = createApp(App);

  // Provide global properties
  app.config.globalProperties.$frappe = frappe;
  app.config.globalProperties.$call = frappe.call.bind(frappe);
  app.config.globalProperties.$eventBus = eventBus;
  app.config.globalProperties.__ = frappe._ || ((str) => str);

  // Use router
  app.use(router);

  app.mount(container);
}

// Export function for manual initialization
export default initFrappeSiteApp;

// Make it available on window for manual initialization in Desk pages
if (typeof window !== 'undefined') {
  window.initFrappeSiteApp = initFrappeSiteApp;
}

// Auto-initialize when DOM is ready (for website only, not Desk pages)
// Check if we're in Desk (has frappe.boot object) or website (no frappe.boot)
const isDeskPage = typeof frappe !== 'undefined' && frappe.boot;

if (!isDeskPage) {
  // Only auto-initialize for website pages
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFrappeSiteApp);
  } else {
    setTimeout(initFrappeSiteApp, 100);
  }
}
