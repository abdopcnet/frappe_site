/**
 * API_MAP - ONLY source for API endpoint constants
 * DO NOT hardcode API paths - always use API_MAP
 */

const API_MAP = {
	SLIDESHOW: {
		GET_SLIDESHOW: "frappe_site.api.slideshow.get_slideshow.get_active_slideshow",
		GET_MANY_SLIDESHOWS: "frappe_site.api.slideshow.get_many_slideshows.get_many_slideshows",
	},
	ITEM: {
		GET_ITEM: "frappe_site.api.item.get_item.get_item",
		GET_MANY_ITEMS: "frappe_site.api.item.get_many_items.get_many_items",
		GET_ITEM_BY_BARCODE: "frappe_site.api.item.get_item_by_barcode.get_item_by_barcode",
	},
	ITEM_GROUP: {
		GET_ITEM_GROUP: "frappe_site.api.item_group.get_item_group.get_item_group",
		GET_MANY_ITEM_GROUPS: "frappe_site.api.item_group.get_many_item_groups.get_many_item_groups",
	},
	CUSTOMER: {
		GET_CUSTOMER: "frappe_site.api.customer.get_customer.get_customer",
		CREATE_CUSTOMER: "frappe_site.api.customer.create_customer.create_customer",
		UPDATE_CUSTOMER: "frappe_site.api.customer.update_customer.update_customer",
	},
	SALES_ORDER: {
		GET_SALES_ORDER: "frappe_site.api.sales_order.get_sales_order.get_sales_order",
		CREATE_SALES_ORDER: "frappe_site.api.sales_order.create_sales_order.create_sales_order",
		UPDATE_SALES_ORDER: "frappe_site.api.sales_order.update_sales_order.update_sales_order",
	},
};

// Attach to window for global access (no export needed - loaded as regular script)
if (typeof window !== "undefined") {
	window.API_MAP = API_MAP;
}

