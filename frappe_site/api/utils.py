# -*- coding: utf-8 -*-
"""Utility functions."""

import frappe


def format_currency(amount, currency=None):
	"""Format amount as currency."""
	if currency is None:
		currency = frappe.db.get_single_value("Global Defaults", "default_currency") or "USD"

	return frappe.format_value(amount, {"fieldtype": "Currency", "options": currency})

