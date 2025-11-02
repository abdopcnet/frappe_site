frappe.pages['sweets'].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: 'Sweets',
    single_column: true,
  });

  // Create container for Vue app
  const container = $("<div id='frappe-site-app'></div>");
  page.main.append(container);

  // Vue app will initialize automatically from frappe_site.bundle.js
  // No need to import manually - it's already loaded via hooks.py
};
