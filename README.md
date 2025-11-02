# Frappe Site - E-commerce Website App

E-commerce website application built with Vue.js frontend and Frappe Framework backend, following the same architecture pattern as POSAwesome15 Lite.

## Structure

### Frontend
- Vue 3 SFCs with pure HTML/CSS (NO Vuetify/external UI libs)
- Component structure: `.vue` files with separate `.js` includes
- Located in `frontend/` directory
- Build output: `frappe_site/public/dist/js/`

### Backend API
- One-function-per-file structure in `frappe_site/frappe_site/api/`
- Each file contains ONE `@frappe.whitelist()` function
- API endpoints organized by doctype:
  - `slideshow/` - Website Slideshow operations
  - `item/` - Item catalog operations
  - `item_group/` - Item Group operations
  - `customer/` - Customer operations
  - `sales_order/` - Sales Order operations

## Setup

### Frontend Dependencies
```bash
cd frontend
npm install
```

### Build Frontend
```bash
cd frontend
npm run build
```

Or from bench root:
```bash
bench build --app frappe_site
```

### Install App
```bash
bench --site [site-name] install-app frappe_site
bench --site [site-name] migrate
```

## Usage

### API Calls
Always use `API_MAP` from `frappe_site/public/js/api_mapper.js`:

```javascript
frappe.call({
    method: API_MAP.SLIDESHOW.GET_SLIDESHOW,
    callback: (r) => {
        // Handle response
    }
});
```

### Vue Components
Components are in `frontend/src/components/`:
- `Home.vue` + `Home.js` - Main homepage
- `Navbar.vue` + `Navbar.js` - Navigation bar
- `Slideshow.vue` + `Slideshow.js` - Image carousel

### Website Integration
The Vue app mounts to `#frappe-site-app` container. Create website pages with:
```html
<div id="frappe-site-app"></div>
```

## Development

### Apply Frontend Changes
```bash
bench clear-cache
bench build --app frappe_site --force
```

### Apply Backend Changes
```bash
bench restart
```

## Architecture

- **Frontend**: Vue 3, Vite build system, pure HTML/CSS
- **Backend**: Frappe Framework v15, one-function-per-file API pattern
- **Event Bus**: mitt for component communication
- **API Pattern**: API_MAP constants for all endpoints
