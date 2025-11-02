# -*- coding: utf-8 -*-
"""Get customer."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_customer(customer_name, fields=None):
	"""Get single customer by name."""
	if fields is None:
		fields = [
			"name",
			"customer_name",
			"customer_type",
			"customer_group",
			"territory",
			"mobile_no",
			"email_id",
		]

	if isinstance(fields, str):
		import json
		fields = json.loads(fields)

	customer = frappe.get_doc("Customer", customer_name)

	result = customer.as_dict()
	if fields:
		result = {k: v for k, v in result.items() if k in fields}

	return result

