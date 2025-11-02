# -*- coding: utf-8 -*-
"""Get many item groups."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_many_item_groups(filters=None, fields=None, limit=50, offset=0):
	"""Get multiple item groups."""
	if filters is None:
		filters = {}

	if isinstance(filters, str):
		import json
		filters = json.loads(filters)

	if fields is None:
		fields = [
			"name",
			"item_group_name",
			"parent_item_group",
			"is_group",
			"image",
		]

	if isinstance(fields, str):
		import json
		fields = json.loads(fields)

	item_groups = frappe.get_all(
		"Item Group",
		filters=filters,
		fields=fields,
		limit=limit,
		limit_start=offset,
		order_by="item_group_name asc",
	)

	return item_groups

