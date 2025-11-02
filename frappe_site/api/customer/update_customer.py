# -*- coding: utf-8 -*-
"""Update customer."""

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def update_customer(customer_name, customer_data):
	"""Update an existing customer."""
	if isinstance(customer_data, str):
		import json
		customer_data = json.loads(customer_data)

	if not frappe.db.exists("Customer", customer_name):
		frappe.throw(_("Customer not found"))

	customer = frappe.get_doc("Customer", customer_name)

	# Update fields
	for field, value in customer_data.items():
		if hasattr(customer, field):
			setattr(customer, field, value)

	customer.save(ignore_permissions=True)
	frappe.db.commit()

	return customer.as_dict()

