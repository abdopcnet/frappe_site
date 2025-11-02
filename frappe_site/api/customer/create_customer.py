# -*- coding: utf-8 -*-
"""Create customer."""

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def create_customer(customer_data):
	"""Create a new customer."""
	if isinstance(customer_data, str):
		import json
		customer_data = json.loads(customer_data)

	# Validate required fields
	required_fields = ["customer_name"]
	for field in required_fields:
		if not customer_data.get(field):
			frappe.throw(_("Field {0} is required").format(field))

	# Check if customer already exists
	if frappe.db.exists("Customer", {"customer_name": customer_data.get("customer_name")}):
		frappe.throw(_("Customer already exists"))

	customer = frappe.get_doc({
		"doctype": "Customer",
		"customer_name": customer_data.get("customer_name"),
		"customer_type": customer_data.get("customer_type", "Company"),
		"customer_group": customer_data.get("customer_group") or frappe.db.get_single_value("Selling Settings", "customer_group"),
		"territory": customer_data.get("territory") or frappe.db.get_single_value("Selling Settings", "territory"),
		"mobile_no": customer_data.get("mobile_no"),
		"email_id": customer_data.get("email_id"),
	})

	customer.insert(ignore_permissions=True)
	frappe.db.commit()

	return customer.as_dict()

