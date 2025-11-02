# -*- coding: utf-8 -*-
"""Create sales order."""

import frappe
from frappe import _
from frappe.utils import nowdate, add_days


@frappe.whitelist(allow_guest=True)
def create_sales_order(order_data):
	"""Create a new sales order."""
	if isinstance(order_data, str):
		import json
		order_data = json.loads(order_data)

	# Validate required fields
	if not order_data.get("customer"):
		frappe.throw(_("Customer is required"))

	if not order_data.get("items") or len(order_data.get("items", [])) == 0:
		frappe.throw(_("At least one item is required"))

	# Set default delivery date if not provided (7 days from today)
	delivery_date = order_data.get("delivery_date") or add_days(nowdate(), 7)

	# Create sales order
	sales_order = frappe.get_doc({
		"doctype": "Sales Order",
		"customer": order_data.get("customer"),
		"transaction_date": order_data.get("transaction_date") or nowdate(),
		"delivery_date": delivery_date,
		"items": order_data.get("items", []),
	})

	sales_order.insert(ignore_permissions=True)
	frappe.db.commit()

	return sales_order.as_dict()

