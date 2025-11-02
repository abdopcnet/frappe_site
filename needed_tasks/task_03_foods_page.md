# Task 03: Foods Page with Sliding Sidebar

## 📋 Task

Create a dedicated foods page titled "مأكولات مطابخ مذاق النبلاء" with the same design as the sweets page, with differences in displayed items, colors, and introductory presentation.

## 🎯 Requirements

### 1. Page Title

- Title: **"مأكولات مطابخ مذاق النبلاء"**
- Appears clearly at the top of the page
- Slightly different design from sweets page (different colors)

### 2. Introductory Presentation

- Hero Section specific to foods
- Can be GIF or featured image
- Different colors from sweets page
- Introductory text or logo

### 3. Categories (3 categories) - Same as sweets page

#### Category One: Daily Offers 📅

- Display products on today's offers
- Same logic as sweets page
- But for foods only

#### Category Two: Most Popular 🔥

- Display most popular products (by sales count)
- Same logic
- But for foods only

#### Category Three: All Items 📦

- Display all food products
- No filtering

### 4. Sliding Sidebar

#### Same design from sweets page

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

- List of all child Item Groups for foods
- Checkboxes for selection
- Can select multiple categories

**Additional Options (Optional):**

- Filter by rating
- Filter by availability
- Sort by: Price, Newest, Most Popular

## 🛠️ Files to Modify

### Frontend

- `frappe_site/public/js/frappe_site/components/Products.vue` - Update design or create new page for foods
- `frappe_site/public/js/frappe_site/components/Products.js` - Add filtering and category logic for foods
- `frappe_site/public/css/frappe_site.css` - Add styles specific to foods page (different colors)
- `frappe_site/public/js/frappe_site/router/index.js` - Add new route for foods page

### Backend (if needed)

- Same API endpoints as sweets page
- But with filtering by Item Group for foods

## 📐 Proposed Design

### Layout:

```
[Header/Navbar]
[Hero Section - مأكولات مطابخ مذاق النبلاء]
[Page Title]
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

- Same design as sweets page
- **Differences:**
  - Hero Section specific to foods
  - Different colors (e.g., warmer colors)
  - Displayed items: foods instead of sweets
- Sidebar can be hidden and shown
- Sliding design (Slide animation)
- Tabs for three categories
- Grid for products
- Responsive design for mobile

## ✅ Implementation Steps

1. [ ] Create new route for foods page
2. [ ] Create new component or update Products.vue
3. [ ] Add Hero Section specific to foods
4. [ ] Add page title "مأكولات مطابخ مذاق النبلاء"
5. [ ] Add Tabs system for three categories
6. [ ] Use same Sidebar from sweets page
7. [ ] Add price filtering options
8. [ ] Add Item Group filtering options
9. [ ] Add logic to fetch products by category (foods only)
10. [ ] Add CSS specific to foods page colors
11. [ ] Test filtering and categories
12. [ ] Test design on different screens
13. [ ] Ensure performance and speed

## 🎨 Design Reference

- [Big Bird Foods](https://bigbirdfoods.com.pk/)
- [Habibah Sweets](https://habibahsweets.com/)

## 📝 Notes

- Use same code from sweets page as base
- Main modifications:
  - Title
  - Hero Section / Presentation
  - Colors (Theme colors)
  - Displayed items (Item Group filter)
- Can use same component with different Props
- Ensure filtering works correctly with Frappe API
- Can add "Clear Filters" button to clear all filters

## 🔗 Links

- When clicking foods section from homepage → redirect user to this page
- Route: `/products/foods` or `/foods` or `/products?category=مأكولات مذاق النبلاء`

## 🔄 Integration with Sweets Page

- Can create shared component for Sidebar
- Can create shared component for Tabs
- Only change colors and displayed data
