# -*- coding: utf-8 -*-
"""Get single item group."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_item_group(item_group_name, fields=None):
	"""Get single item group by name."""
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

	item_group = frappe.get_doc("Item Group", item_group_name)

	result = item_group.as_dict()
	if fields:
		result = {k: v for k, v in result.items() if k in fields}

	return result

