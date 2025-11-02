# -*- coding: utf-8 -*-
"""Update sales order."""

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def update_sales_order(order_name, order_data):
	"""Update an existing sales order."""
	if isinstance(order_data, str):
		import json
		order_data = json.loads(order_data)

	if not frappe.db.exists("Sales Order", order_name):
		frappe.throw(_("Sales Order not found"))

	sales_order = frappe.get_doc("Sales Order", order_name)

	# Update fields
	for field, value in order_data.items():
		if field == "items":
			# Update items
			sales_order.items = []
			for item in value:
				sales_order.append("items", item)
		elif hasattr(sales_order, field):
			setattr(sales_order, field, value)

	sales_order.save(ignore_permissions=True)
	frappe.db.commit()

	return sales_order.as_dict()

