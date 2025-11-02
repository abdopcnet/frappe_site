# Task 02: Sweets Page with Sliding Sidebar

## 📋 Task

Create a dedicated sweets page titled "حلويات مذاق الاندلس" with 3 categories and a sliding sidebar for filtering.

## 🎯 Requirements

### 1. Page Title

- Title: **"حلويات مذاق الاندلس"**
- Appears clearly at the top of the page

### 2. Categories (3 categories)

#### Category One: Daily Offers 📅

- Display products on today's offers
- Can use `is_offer` or `offer_date` field in Frappe
- Or use special Tag for offers

#### Category Two: Most Popular 🔥

- Display most popular products (by sales count)
- Can use `ordered_qty` or special field in Frappe
- Or display products by specified order

#### Category Three: All Items 📦

- Display all sweets products
- No filtering

### 3. Sliding Sidebar

#### Location and Design

- Sidebar appears on right or left side
- Can be hidden and shown (Toggle)
- Sliding design (Slide) when opening and closing
- Responsive - converts to overlay on mobile

#### Filtering Options

**Price Filtering:**

- Price range (Range Slider)
- From: [input] To: [input]
- Or preset options:
  - Less than 50
  - From 50 to 100
  - From 100 to 200
  - More than 200

**Item Group Filtering:**

- List of all child Item Groups for sweets
- Checkboxes for selection
- Can select multiple categories

**Additional Options (Optional):**

- Filter by rating
- Filter by availability
- Sort by: Price, Newest, Most Popular

## 🛠️ Files to Modify

### Frontend

- `frappe_site/public/js/frappe_site/components/Products.vue` - Update design or create new page
- `frappe_site/public/js/frappe_site/components/Products.js` - Add filtering and category logic
- `frappe_site/public/css/frappe_site.css` - Add Sidebar and category styles
- `frappe_site/public/js/frappe_site/router/index.js` - Add new route for sweets page

### Backend (if needed)

- May need API endpoint to get:
  - Products in daily offers
  - Most popular products
  - Price ranges

## 📐 Proposed Design

### Layout:

```
[Header/Navbar]
[Title: حلويات مذاق الاندلس]
[Toggle Sidebar Button]
┌─────────────────────────────────────────┐
│ [Sidebar]  │  [Content Area]            │
│            │  ┌─────────────────────┐   │
│ [Filters] │  │ [Tabs: 3 categories] │   │
│            │  └─────────────────────┘   │
│ [Price]   │  [Products Grid]            │
│ [Groups]  │                              │
│            │                              │
└─────────────────────────────────────────┘
```

### Specifications:

- Sidebar can be hidden and shown
- Sliding design (Slide animation)
- Tabs for three categories
- Grid for products
- Responsive design for mobile
- Design similar to bigbirdfoods.com.pk and habibahsweets.com

## ✅ Implementation Steps

1. [ ] Create new route for sweets page
2. [ ] Create new component or update Products.vue
3. [ ] Add page title "حلويات مذاق الاندلس"
4. [ ] Add Tabs system for three categories
5. [ ] Create sliding sidebar
6. [ ] Add price filtering options
7. [ ] Add Item Group filtering options
8. [ ] Add logic to fetch products by category
9. [ ] Add API endpoints for daily offers and most popular
10. [ ] Test filtering and categories
11. [ ] Test design on different screens
12. [ ] Ensure performance and speed

## 🎨 Design Reference

- [Big Bird Foods](https://bigbirdfoods.com.pk/)
- [Habibah Sweets](https://habibahsweets.com/)

## 📝 Notes

- Sidebar should be hideable to provide more space for products
- Use CSS transitions for smooth animation
- Ensure filtering works correctly with Frappe API
- Can add "Clear Filters" button to clear all filters
- Ensure categories work independently

## 🔗 Links

- When clicking sweets section from homepage → redirect user to this page
- Route: `/products/sweets` or `/sweets` or `/products?category=حلويات الاندلس`
