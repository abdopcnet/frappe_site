frappe.pages['sweets'].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: 'Sweets',
    single_column: true,
  });

  this.page.$FrappeSiteSweets = new frappe.FrappeSite.sweets(this.page);

  // Hide sidebar to show full page (like posawesome15_lite)
  $('head').append(
    '<style class="frappe-site-page-style">.layout-main-section { display: none !important; }</style>',
  );
};

frappe.pages['sweets'].on_page_leave = function () {
  // Remove the style when leaving the page
  $('head').find('style.frappe-site-page-style').remove();
};
