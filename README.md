# Frappe Site E-Commerce

<div align="center">

## Frappe Site E-Commerce

_Modern E-Commerce Website for ERPNext v15_

![Version](https://img.shields.io/badge/version-2.11.2025-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![ERPNext](https://img.shields.io/badge/ERPNext-v15-orange)
![Frappe](https://img.shields.io/badge/Frappe-v15-red)

</div>

---

## 🎯 Goal

**Built exactly like:**

- 🌐 [Big Bird Foods](https://bigbirdfoods.com.pk/)

📺 **Videos:** [YouTube Playlist](https://www.youtube.com/playlist?list=PLCU8QrFs82Wxqp64n6VjZJKW5Nl3WCW8g)

**Frappe Site E-Commerce** = Modern E-Commerce Interface + ERPNext Engine

A lightweight e-commerce website built on top of ERPNext's proven foundation:

- 🎨 **Interface:** Fast, responsive Vue.js UI with modern design
- 🔧 **Frontend:** Uses original ERPNext methods (one-function-per-file API pattern)
- ⚙️ **Backend:** Uses original ERPNext def's & imports (ERPNext controllers)
- 📦 **No Reinventing:** Zero custom calculations, all framework-powered
- 🚀 **Performance:** Optimized for speed and efficiency
- 🎯 **User Experience:** Intuitive and modern design similar to bigbirdfoods.com.pk

---

## 📋 Development Tasks Tracking

### 📋 Needed Tasks

📁 **Tasks folder:** [needed_tasks/](needed_tasks/)

### 🛠️ **Development Resources**

- 🔧 **Development Commands:** [dev_common_commands.md](docs/dev_common_commands.md)
- 📊 **Technology Stack:** [technology_stack_info.md](docs/technology_stack_info.md)

### 🛡️ **Security & Policies**

- 🔒 **Backend Policy:** [backend_policy.md](docs/backend_policy.md)
- 🎨 **Frontend Policy:** [frontend_policy.md](docs/frontend_policy.md)

---

## 🛍️ Features

- 🛒 **Shopping Cart** - Full cart management with localStorage
- 🔍 **Product Search** - Quick search functionality
- 📂 **Categories** - Featured categories display
- 🖼️ **Image Management** - Automatic placeholder handling
- 💰 **Currency Formatting** - Uses Frappe's currency settings
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎨 **Modern UI** - Beautiful design inspired by sweets shops

---

## 🏗️ Architecture

**Frontend:** Vue 3 SFCs (pure HTML/CSS, NO Vuetify), Vue Router for navigation, mitt event bus for component communication.

**Backend:** ERPNext v15/Frappe v15; strict one-function-per-file API structure in `frappe_site/api/[doctype]/[action].py`.

**Data Flow:** UI → API_MAP → ERPNext Controllers → DB (UI never calculates prices/taxes/totals).

**Build System:** Frappe build system (same as posawesome15_lite) - no Vite/webpack needed.

---

## 📁 Project Structure

```
frappe_site/
├── public/
│   ├── js/
│   │   ├── frappe_site.bundle.js      # Main bundle file
│   │   └── frappe_site/
│   │       ├── app/                   # App initialization
│   │       ├── components/            # Vue components
│   │       ├── router/                # Vue Router
│   │       ├── stores/                # State management
│   │       └── utils/                 # Utility functions
│   └── css/
│       └── frappe_site.css           # Main stylesheet
├── api/                               # Backend APIs
│   ├── slideshow/
│   ├── item/
│   ├── item_group/
│   ├── customer/
│   └── sales_order/
└── hooks.py                           # Frappe hooks
```

---

## 🚀 Quick Start

### Prerequisites

- Frappe Bench v15
- ERPNext v15 installed
- Node.js & Yarn

### Installation

```bash
cd /path/to/frappe-bench
bench get-app frappe_site https://github.com/your-repo/frappe_site
bench install-app frappe_site
bench build --app frappe_site --force
bench restart
```

### Development

```bash
# Apply frontend changes
bench build --app frappe_site --force

# Apply backend changes
bench restart
bench clear-cache

# Clear website cache
bench clear-website-cache
```

---

## 📋 API Endpoints

All API endpoints follow the one-function-per-file pattern:

```
frappe_site/api/
├── slideshow/
│   ├── get_slideshow.py
│   └── get_many_slideshows.py
├── item/
│   ├── get_item.py
│   ├── get_many_items.py
│   └── get_item_by_barcode.py
├── item_group/
│   ├── get_item_group.py
│   └── get_many_item_groups.py
├── customer/
│   ├── get_customer.py
│   ├── create_customer.py
│   └── update_customer.py
└── sales_order/
    ├── get_sales_order.py
    ├── create_sales_order.py
    └── update_sales_order.py
```

---

## 🎨 Featured Categories

The website features these main categories:

- 🍰 **حلويات الاندلس** (Andalusian Sweets)
- 🍖 **مأكولات مذاق النبلاء** (Noble Taste Foods)
- 🎉 **عروض الحفلات والمناسبات** (Party & Event Offers)

---

## 🔧 Technology Stack

- **Frontend:** Vue 3, Vue Router, mitt (event bus)
- **Backend:** Python, Frappe Framework v15
- **Build:** Frappe build system (esbuild)
- **Database:** MySQL/MariaDB
- **Style:** Pure CSS (no UI frameworks)

---

## 📝 Development Guidelines

### Backend

- ✅ One function per file
- ✅ Use `@frappe.whitelist(allow_guest=True)` for public APIs
- ✅ Specify fields explicitly (no `SELECT *`)
- ✅ Use ERPNext native methods

### Frontend

- ✅ Vue 3 Composition API
- ✅ Pure HTML/CSS (no Vuetify)
- ✅ Use `API_MAP` for all API calls
- ✅ Components must stay < 500 lines

---

## 🌐 Routes

- `/` - Home page (Categories + Featured Products)
- `/products` - Product catalog with filters
- `/products/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page

---

## 👨‍💻 Contact

- 👨‍💻 Developer: abdopcnet
- 🏢 Company: [Future Support](https://www.future-support.online/)
- 📧 Email: abdopcnet@gmail.com
- 🐙 GitHub: [github.com/abdopcnet/frappe_site](https://github.com/abdopcnet/frappe_site)

**🤝 Need Support or Want to Join? Contact Now:**

### 🇪🇬 Egypt Contact

- 📞 **Call:** 🇪🇬 [+20 115 648 3669](tel:+201156483669)
- 💬 **WhatsApp:** 🇪🇬 [https://wa.me/201156483669](https://wa.me/201156483669)
- 📱 **Telegram:** [https://t.me/EG_01156483669](https://t.me/EG_01156483669)

### 🇸🇦 Saudi Arabia Contact

- 📞 **Call:** 🇸🇦 [+966 57 891 9729](tel:+966578919729)
- 💬 **WhatsApp:** 🇸🇦 [https://wa.me/966578919729](https://wa.me/966578919729)
- 📱 **Telegram:** [https://t.me/KSA_0578919729](https://t.me/KSA_0578919729)

### 🌐 Online

- 🌐 **Website:** [future-support.online](https://www.future-support.online/)
- 📧 **Email:** abdopcnet@gmail.com
- 🐙 **GitHub:** [github.com/abdopcnet/frappe_site](https://github.com/abdopcnet/frappe_site)

---

<div align="center">

<p>Made with ❤️ for ERPNext community</p>

<p>
    <a href="https://github.com/abdopcnet/frappe_site">⭐ Star</a> •
    <a href="https://github.com/abdopcnet/frappe_site/issues">🐛 Report Bug</a> •
    <a href="https://github.com/abdopcnet/frappe_site/fork">🍴 Fork</a> •
    <a href="https://github.com/abdopcnet/frappe_site/stargazers">👀 Watch</a>
</p>

<p>
    <img src="https://img.shields.io/github/stars/abdopcnet/frappe_site?style=social" alt="GitHub stars">
    <img src="https://img.shields.io/github/forks/abdopcnet/frappe_site?style=social" alt="GitHub forks">
    <img src="https://img.shields.io/github/watchers/abdopcnet/frappe_site?style=social" alt="GitHub watchers">
</p>

</div>
