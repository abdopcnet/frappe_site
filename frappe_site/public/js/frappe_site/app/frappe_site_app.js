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

// Auto-initialize when DOM is ready (for website)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFrappeSiteApp);
} else {
  // Use setTimeout to ensure container is created in Desk pages
  setTimeout(initFrappeSiteApp, 100);
}
