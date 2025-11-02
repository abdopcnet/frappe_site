# -*- coding: utf-8 -*-
"""Get many items."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_many_items(filters=None, fields=None, limit=20, offset=0, order_by="item_name asc"):
	"""Get multiple items."""
	if filters is None:
		filters = {"disabled": 0, "is_sales_item": 1}

	if isinstance(filters, str):
		import json
		filters = json.loads(filters)

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
		]

	if isinstance(fields, str):
		import json
		fields = json.loads(fields)

	items = frappe.get_all(
		"Item",
		filters=filters,
		fields=fields,
		limit=limit,
		limit_start=offset,
		order_by=order_by,
	)

	# Get prices for items
	for item in items:
		item_price = frappe.db.get_value(
			"Item Price",
			{"item_code": item.item_code, "selling": 1},
			"price_list_rate",
			order_by="valid_from desc",
		)
		item["price"] = item_price or 0

	return items

