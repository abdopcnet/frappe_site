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

	# Ensure custom_website_group filter is applied correctly
	if 'custom_website_group' in filters:
		# Convert to 1 if True or '1', otherwise keep as is
		if filters['custom_website_group'] is True or filters['custom_website_group'] == '1' or filters['custom_website_group'] == 1:
			filters['custom_website_group'] = 1

	if fields is None:
		fields = [
			"name",
			"item_group_name",
			"parent_item_group",
			"is_group",
			"image",
			"custom_website_group",
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

	# Additional server-side filtering to ensure only custom_website_group=1
	# This is a safety measure in case Frappe filter doesn't work correctly
	if 'custom_website_group' in filters and filters['custom_website_group'] == 1:
		item_groups = [ig for ig in item_groups if ig.get('custom_website_group') == 1]

	return item_groups

