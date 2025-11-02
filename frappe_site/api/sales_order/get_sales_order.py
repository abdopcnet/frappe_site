# -*- coding: utf-8 -*-
"""Get sales order."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_sales_order(order_name, fields=None):
	"""Get single sales order by name."""
	if fields is None:
		fields = [
			"name",
			"customer",
			"transaction_date",
			"delivery_date",
			"grand_total",
			"status",
		]

	if isinstance(fields, str):
		import json
		fields = json.loads(fields)

	sales_order = frappe.get_doc("Sales Order", order_name)

	result = sales_order.as_dict()
	if fields:
		result = {k: v for k, v in result.items() if k in fields}

	return result

