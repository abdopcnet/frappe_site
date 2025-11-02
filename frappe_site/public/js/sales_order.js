frappe.ui.form.on('Sales Order', {
  setup: function (frm) {
    frm.set_query('customer', function (doc, cdt, cdn) {
      return {
        filters: {
          type: 'Customer',
        },
      };
    });
  },
});
