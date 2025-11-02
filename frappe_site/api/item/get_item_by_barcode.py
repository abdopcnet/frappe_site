# -*- coding: utf-8 -*-
"""Get item by barcode."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_item_by_barcode(barcode):
	"""Get item by barcode."""
	item_barcode = frappe.db.get_value(
		"Item Barcode",
		{"barcode": barcode},
		"parent",
	)

	if not item_barcode:
		frappe.throw("Item not found for barcode: " + barcode)

	return frappe.get_doc("Item", item_barcode).as_dict()

