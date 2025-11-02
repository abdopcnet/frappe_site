# -*- coding: utf-8 -*-
"""Get single item."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_item(item_code, fields=None):
	"""Get single item by item_code."""
	if fields is None:
		fields = [
			"name",
			"item_code",
			"item_name",
			"description",
			"image",
			"item_group",
			"stock_uom",
			"is_stock_item",
			"disabled",
		]

	if isinstance(fields, str):
		import json
		fields = json.loads(fields)

	item = frappe.get_doc("Item", item_code)

	# Get item price if available
	item_price = frappe.db.get_value(
		"Item Price",
		{"item_code": item_code, "selling": 1},
		"price_list_rate",
		order_by="valid_from desc",
	)

	result = item.as_dict()
	if fields:
		result = {k: v for k, v in result.items() if k in fields}
	result["price"] = item_price or 0

	return result

