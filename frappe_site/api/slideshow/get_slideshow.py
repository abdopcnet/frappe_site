# -*- coding: utf-8 -*-
"""Get active slideshow."""

import frappe


@frappe.whitelist(allow_guest=True)
def get_active_slideshow():
	"""Get the active slideshow with its items."""
	slideshow = frappe.get_all(
		"Website Slideshow",
		fields=["name", "slideshow_name", "header"],
		order_by="creation desc",
		limit=1,
	)

	if not slideshow:
		return {"slides": []}

	slideshow_name = slideshow[0].name
	slideshow_doc = frappe.get_doc("Website Slideshow", slideshow_name)

	slides = []
	for item in slideshow_doc.slideshow_items:
		slides.append({
			"id": item.idx,
			"image": item.image,
			"heading": item.heading,
			"description": item.description,
			"url": item.url,
		})

	return {
		"name": slideshow_doc.name,
		"slideshow_name": slideshow_doc.slideshow_name,
		"header": slideshow_doc.header,
		"slides": slides,
	}

