# Task 01: Homepage Design with Animated GIF Sections

## 📋 Task

Design the homepage (Home Page) with an overview section and 3 animated GIF sections.

## 🎯 Requirements

### 1. Site Overview

- Add a section containing an overview of the site
- Appears at the top of the page or after Slideshow
- Arabic text describing the site and services

### 2. Animated Sections (3 sections)

#### Section One: Sweets 🍰

- Section displaying animated GIF for sweets
- Attractive design consistent with the rest of the site
- Can add text or title above the section
  - Title: "حلويات الاندلس" or "الحلويات"
  - **On click:** Redirect user to sweets page (`/products?category=حلويات الاندلس`)

#### Section Two: Foods 🍖

- Section displaying animated GIF for foods
- Same consistent design
- Appropriate text or title
- Title: "مأكولات مذاق النبلاء" or "المأكولات"
- **On click:** Redirect user to foods page (`/products?category=مأكولات مذاق النبلاء`)

#### Section Three: Events 🎉

- Section displaying animated GIF for events and parties
- Design consistent with other sections
- Appropriate text or title
- Title: "عروض الحفلات والمناسبات" or "المناسبات"
- **On click:** Redirect user to offers and events page (`/products?category=عروض الحفلات والمناسبات`)

## 🛠️ Files to Modify

### Frontend

- `frappe_site/public/js/frappe_site/components/Home.vue` - Update design
- `frappe_site/public/js/frappe_site/components/Home.js` - Add section logic and navigation functions
- `frappe_site/public/css/frappe_site.css` - Add styles
- `frappe_site/public/js/frappe_site/router/index.js` - Ensure Routes work correctly

### Backend (if needed)

- May need API endpoint to get section information from Frappe
- Or can use static data initially

## 📐 Proposed Design

### Layout:

```
[Slideshow]
[Site Overview]
[Sweets Section - GIF]
[Foods Section - GIF]
[Events Section - GIF]
[Featured Products]
```

### Specifications:

- Sections appear sequentially
- Each section contains:
  - Arabic title
  - Animated GIF (can be from Frappe or external URL)
  - Background consistent with design
  - Hover effects on scroll
- Responsive design for mobile
- Design similar to bigbirdfoods.com.pk and habibahsweets.com

## ✅ Implementation Steps

1. [ ] Create new Vue component for sections or update Home.vue
2. [ ] Add CSS for animated sections
3. [ ] Add overview section
4. [ ] Add first section (Sweets) with click function
5. [ ] Add second section (Foods) with click function
6. [ ] Add third section (Events) with click function
7. [ ] Add navigation function using Vue Router
8. [ ] Test navigation and design on different screens
9. [ ] Ensure performance and speed
10. [ ] Ensure product pages work with category filtering

## 🎨 Design Reference

- [Big Bird Foods](https://bigbirdfoods.com.pk/)
- [Habibah Sweets](https://habibahsweets.com/)

## 📝 Notes

- Use high-quality GIFs
- Ensure file sizes (optimize performance)
- Can use CSS animations for additional effects
- Ensure compatibility with different browsers
- Each section is clickable and redirects to dedicated product page
- Use Vue Router for navigation: `router.push({ name: 'Products', query: { category: 'category_name' } })`
- Ensure Products page works with category filtering
