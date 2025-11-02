# -*- coding: utf-8 -*-
"""API endpoints for Frappe Site."""

from .slideshow.get_slideshow import get_active_slideshow
from .slideshow.get_many_slideshows import get_many_slideshows
from .item.get_item import get_item
from .item.get_many_items import get_many_items
from .item.get_item_by_barcode import get_item_by_barcode
from .item_group.get_item_group import get_item_group
from .item_group.get_many_item_groups import get_many_item_groups
from .customer.get_customer import get_customer
from .customer.create_customer import create_customer
from .customer.update_customer import update_customer
from .sales_order.get_sales_order import get_sales_order
from .sales_order.create_sales_order import create_sales_order
from .sales_order.update_sales_order import update_sales_order

__all__ = [
	"get_active_slideshow",
	"get_many_slideshows",
	"get_item",
	"get_many_items",
	"get_item_by_barcode",
	"get_item_group",
	"get_many_item_groups",
	"get_customer",
	"create_customer",
	"update_customer",
	"get_sales_order",
	"create_sales_order",
	"update_sales_order",
]

