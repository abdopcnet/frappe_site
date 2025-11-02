# Task 04: Offers and Events Page with Bundles

## 📋 Task

Create a dedicated offers and events page with an exciting introductory presentation, offers consisting of bundles (mix of items) for events and celebrations with exclusive discounts and strong marketing.

## 🎯 Requirements

### 1. Introductory Presentation (Hero Section)

#### Presentation Requirements:

- **Very exciting:** Attractive and engaging design
- **Animated GIF or video:** Displays events and celebrations
- **Strong marketing text:** Attractive promotional phrases
- **Call-to-Action buttons:** "Order Now", "Book for Your Event"
- **Exclusive offers:** Display discounts prominently
- **Distinct colors:** Festive and attractive design

#### Suggested Content:

- Large title: "Exclusive Offers for Events and Celebrations"
- Text: "Get the best offers for your special events"
- Discount display: "Up to 30% off" or "Special Offers"
- Button: "Inquire Now" or "Book Your Offer"

### 2. Offers (Bundles)

#### Bundle Concept:

- **Not individual items:** Each offer is a bundle (group) of items
- **Event-specific:** Each event has its own bundle
- **Example:**
  - Bundle: "Birthday Party"
    - 5 kg assorted sweets
    - 3 kg foods
    - 2 liters juice
    - Price: 500 (instead of 700)
  - Bundle: "Wedding Party"
    - 10 kg assorted sweets
    - 5 kg foods
    - 5 liters juice
    - Price: 1500 (instead of 2000)

#### Bundle Types:

- **By Event:**
  - Birthday
  - Wedding
  - Engagement
  - Graduation
  - Baby Shower
  - etc...
- **By Size:**
  - Small (for 10-20 people)
  - Medium (for 20-50 people)
  - Large (for 50-100 people)
  - Special (for 100+ people)

### 3. Exclusive Discounts

#### Discount Display:

- **Very prominent:** Large badge showing discount percentage
- **Example:** "30% off" or "Save 500 EGP"
- **Strong marketing:** Phrases like:
  - "Exclusive offers for limited time"
  - "Book now and save more"
  - "Additional discount for large orders"

### 4. Strong Marketing

#### Marketing Elements:

- **Limited offers:** "Only for 7 days"
- **Limited quantity:** "5 offers remaining"
- **Testimonials:** "Over 1000 successful events"
- **Photos:** Photos from previous events
- **Testimonials:** Customer reviews
- **Social Proof:** Number of people who benefited from offers

### 5. Main Page

#### Content:

- Exciting Hero Section
- Exclusive offers section
- Bundles Grid
- Marketing section (testimonials, photos, statistics)
- Inquiry/Booking form
- FAQ section

## 🛠️ Files to Modify

### Frontend

- `frappe_site/public/js/frappe_site/components/Offers.vue` - New page for offers
- `frappe_site/public/js/frappe_site/components/Offers.js` - Page logic
- `frappe_site/public/js/frappe_site/components/BundleCard.vue` - Component to display Bundle
- `frappe_site/public/js/frappe_site/components/BundleCard.js` - Bundle logic
- `frappe_site/public/css/frappe_site.css` - Styles specific to offers
- `frappe_site/public/js/frappe_site/router/index.js` - New route

### Backend

- `frappe_site/api/offer/get_offers.py` - Get offers
- `frappe_site/api/offer/get_bundle.py` - Get specific bundle
- May need new DocType: "Offer Bundle" or use Quotation with special type

## 📐 Proposed Design

### Layout:

```
[Hero Section - Very Exciting]
  - Animated GIF/Video
  - Strong marketing text
  - Call-to-Action buttons
  - Discount display

[Exclusive Offers Section]
  - Bundles Grid
  - Discount badge on each Bundle
  - "Inquire" or "Order" button

[Marketing Section]
  - Customer testimonials
  - Event photos
  - Statistics

[Inquiry/Booking Form]
  - Form for custom offer request
  - Contact information

[FAQ]
  - Frequently asked questions
```

### Specifications:

- Attractive and exciting Hero Section
- Bundles Grid with distinctive design
- Prominent discount badges
- Attractive hover effects
- Responsive design
- Festive and fun design

## ✅ Implementation Steps

1. [ ] Create new route for offers page
2. [ ] Create new component (Offers.vue)
3. [ ] Design very exciting Hero Section
4. [ ] Create DocType or API for Bundles
5. [ ] Create BundleCard component
6. [ ] Add Bundles Grid
7. [ ] Add discount badges
8. [ ] Add marketing section (testimonials, photos)
9. [ ] Add inquiry form
10. [ ] Add FAQ
11. [ ] Add CSS specific to offers
12. [ ] Test design on different screens
13. [ ] Ensure performance and speed

## 🎨 Design Reference

- [Big Bird Foods](https://bigbirdfoods.com.pk/)
- [Habibah Sweets](https://habibahsweets.com/)

## 📝 Notes

- Bundles are not individual items, but groups of items
- Each Bundle has:
  - Event name
  - List of constituent items
  - Original price
  - Price after discount
  - Discount percentage
  - Description
- Hero Section must be very exciting and attractive
- Discounts must be clear and prominent
- Strong marketing includes: limited offers, testimonials, photos, statistics

## 🔗 Links

- When clicking events section from homepage → redirect user to this page
- Route: `/offers` or `/events` or `/products?category=عروض الحفلات والمناسبات`

## 💡 Additional Ideas

- Can add countdown timer for limited offers
- Can add "WhatsApp" button for direct contact
- Can add "Previous Offers" section to display photos from previous events
- Can add approximate price calculator based on number of people
