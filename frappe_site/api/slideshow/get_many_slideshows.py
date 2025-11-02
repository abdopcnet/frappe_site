# -*- coding: utf-8 -*-
"""Get many slideshows."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_many_slideshows(filters=None, limit=20, offset=0):
	"""Get multiple slideshows."""
	if filters is None:
		filters = {}

	if isinstance(filters, str):
		import json
		filters = json.loads(filters)

	slideshows = frappe.get_all(
		"Website Slideshow",
		filters=filters,
		fields=["name", "slideshow_name", "header"],
		limit=limit,
		limit_start=offset,
		order_by="creation desc",
	)

	return slideshows

