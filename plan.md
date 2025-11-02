# خطة الوصول إلى الموقع - Frappe Site

## الوضع الحالي

- ✅ الخادم يعمل على المنفذ 8000
- ✅ اسم الموقع: `women.alkhaleej.store`
- ✅ SocketIO يعمل على المنفذ 9000
- ✅ تطبيق frappe_site مثبت على الموقع

## الوصول إلى الموقع المصمم في التطبيق

الموقع المصمم موجود في `/frappe_site/www/index.html` ويحتوي على:

- Vue.js Application في `#frappe-site-app`
- Components: Home, Navbar, Slideshow
- API Endpoints: Slideshow, Item, Item Group, Customer, Sales Order

### طريقة الوصول إلى الموقع:

#### الطريقة 1: إنشاء Web Page في Frappe Desk (الطريقة الموصى بها)

1. افتح Frappe Desk: `http://localhost:8000/app`
2. اذهب إلى: **Website > Web Page**
3. أنشئ صفحة جديدة:
   - **Route**: `/` أو `/home` أو `/index`
   - **Title**: Home أو الصفحة الرئيسية
   - **Content Type**: HTML
   - **Content**: ضع محتوى HTML أو اتركه فارغاً
   - **Template**: اتركه فارغاً أو استخدم `frappe_site/www/index.html`

أو استخدام **Custom HTML**:

```html
<div id="frappe-site-app"></div>
```

4. احفظ الصفحة
5. افتحها من: `http://localhost:8000/` أو `http://localhost:8000/home`

#### الطريقة 2: إضافة Route في hooks.py

أضف في `hooks.py`:

```python
website_route_rules = [
    {"from_route": "/", "to_route": "index"},
]
```

ثم أنشئ ملف `/frappe_site/templates/pages/index.py`:

```python
def get_context(context):
    # Add any context data here
    pass
```

#### الطريقة 3: الوصول المباشر (إذا كان index.html مسجل كصفحة)

```bash
http://localhost:8000/index
# أو
http://women.alkhaleej.store:8000/index
```

### التحقق من Frontend Build:

```bash
# بناء Frontend
cd /home/frappe/frappe-bench-15/apps/frappe_site/frontend
npm install
npm run build

# أو من bench root
bench build --app frappe_site --force
bench clear-cache
```

### التحقق من أن الملفات موجودة:

```bash
# التحقق من ملفات JS/CSS
ls -la /home/frappe/frappe-bench-15/apps/frappe_site/frappe_site/public/dist/js/
ls -la /home/frappe/frappe-bench-15/apps/frappe_site/frappe_site/public/js/

# التحقق من أن الملفات موجودة في hooks.py
grep -A 2 "web_include_js" /home/frappe/frappe-bench-15/apps/frappe_site/frappe_site/hooks.py
```

## طرق الوصول إلى الخادم

### 1. الوصول المحلي (من نفس السيرفر)

```bash
# الوصول من المتصفح على نفس الجهاز:
http://localhost:8000
# أو
http://127.0.0.1:8000
```

### 2. الوصول من خلال اسم الموقع (إذا كان DNS مضبوط)

```bash
http://women.alkhaleej.store:8000
```

### 3. الوصول من خارج السيرفر (إذا كان الخادم على شبكة محلية)

```bash
# من جهاز آخر على نفس الشبكة:
http://[IP_ADDRESS]:8000
# مثال: http://192.168.1.100:8000
```

## إدارة الخادم

### تشغيل الخادم

```bash
cd /home/frappe/frappe-bench-15
bench start
```

### إيقاف الخادم

```bash
bench stop
```

### إعادة تشغيل الخادم

```bash
bench restart
```

### التحقق من حالة الخادم

```bash
# التحقق من المنافذ المفتوحة
netstat -tlnp | grep -E "(8000|9000)"
# أو
ss -tlnp | grep -E "(8000|9000)"
```

## ملاحظات مهمة

1. **المنفذ الحالي**: الخادم يعمل على `127.0.0.1:8000` (localhost فقط)

   - للوصول من خارج السيرفر، قد تحتاج لتعديل إعدادات Nginx أو Apache

2. **تطبيق frappe_site**: يجب التأكد من تثبيت التطبيق على الموقع:

   ```bash
   bench --site women.alkhaleej.store install-app frappe_site
   bench --site women.alkhaleej.store migrate
   ```

3. **بناء Frontend**: إذا قمت بتعديلات على Frontend:

   ```bash
   bench build --app frappe_site --force
   bench clear-cache
   ```

4. **Developer Mode**: لتشغيل وضع المطور:
   ```bash
   bench --site women.alkhaleej.store set-config developer_mode 1
   bench restart
   ```

## المشاكل التي تم إصلاحها

### ✅ 1. مشكلة `export` في `api_mapper.js`

**المشكلة**: `Uncaught SyntaxError: export declarations may only appear at top level of a module`

**السبب**: الملف `api_mapper.js` يستخدم `export default` لكنه يُحمّل كـ script عادي وليس ES module.

**الحل**: تم إزالة `export default` والاعتماد على `window.API_MAP` فقط.

### ✅ 2. مشكلة مسارات API

**المشكلة**: `ModuleNotFoundError: No module named 'frappe_site.api'`

**السبب**: البنية الفعلية كانت `frappe_site/frappe_site/api/` لكن Frappe يتوقع `frappe_site/api/`

**الحل**:

1. تم نقل مجلد API من `frappe_site/frappe_site/api/` إلى `frappe_site/api/`
2. تم التأكد من أن المسارات في `api_mapper.js` صحيحة: `frappe_site.api.slideshow.get_slideshow.get_active_slideshow`
3. تم إزالة import من `api_mapper.js` في Frontend لأنه يُحمّل كـ script منفصل
4. تم إعادة بناء Frontend

### ✅ 3. مشكلة أسماء الحقول في Slideshow API

**المشكلة**:

1. API كان يستخدم `title` و `link` لكن قاعدة البيانات تستخدم `heading` و `url`
2. جدول `Website Slideshow` لا يحتوي على حقل `title` بل `slideshow_name` و `header`

**الحل**: تم تصحيح `get_slideshow.py` و `get_many_slideshows.py`:

- `item.title` → `item.heading`
- `item.link` → `item.url`
- `fields=["name", "title"]` → `fields=["name", "slideshow_name", "header"]`
- `slideshow_doc.title` → `slideshow_doc.slideshow_name` و `slideshow_doc.header`

### ✅ 4. مشكلة حقل enabled في Website Slideshow

**المشكلة**: `OperationalError: Unknown column 'tabWebsite Slideshow.enabled' in 'WHERE'`

**السبب**: جدول `Website Slideshow` لا يحتوي على حقل `enabled`

**الحل**: تم إزالة الفلتر `enabled` من:

- `get_slideshow.py`: إزالة `filters = {"enabled": 1}`
- `get_many_slideshows.py`: إزالة `"enabled"` من قائمة fields

### ✅ 5. مشكلة اسم الحقل items في Slideshow API

**المشكلة**: `AttributeError: 'WebsiteSlideshow' object has no attribute 'items'`

**السبب**: اسم الحقل في DocType هو `slideshow_items` وليس `items`

**الحل**: تم تصحيح `get_slideshow.py`:

- `slideshow_doc.items` → `slideshow_doc.slideshow_items`

### ✅ استخدام Vite

**الإجابة**: نعم، Vite مفيد جداً ومستخدم في posawesome15_lite!

**المقارنة**:

- ✅ **posawesome15_lite**: يستخدم Vite + Vue 3
- ✅ **frappe_site**: يستخدم Vite + Vue 3 (نفس النظام!)

**مميزات Vite**:

- ⚡ **سرعة التطوير**: Hot Module Replacement فوري
- 🚀 **Build سريع**: أسرع من webpack بكثير
- 📦 **Bundle صغير**: Tree-shaking أفضل
- 🎯 **Modern**: يدعم ES modules natively

**الخلاصة**: البنية الحالية متطابقة مع posawesome15_lite في المبادئ:

- ✅ Vue 3
- ✅ Vite build system
- ✅ Frappe Backend
- ✅ One-function-per-file API pattern
- ✅ Pure HTML/CSS (بدون Vuetify للـ website)

**الفرق الوحيد**:

- **posawesome15_lite**: POS app (تطبيق داخلي) - يستخدم Vuetify
- **frappe_site**: Website (موقع للزبائن) - Pure HTML/CSS

### الميزات المطلوبة:

#### 1. الصفحة الرئيسية (Home Page)

- ✅ Navbar مع شعار وروابط التنقل
- ✅ Hero Slideshow (تم)
- ⏳ عرض فئات المنتجات الرئيسية
- ⏳ عرض المنتجات المميزة/الأكثر مبيعاً
- ⏳ قسم عن الشركة/العلامة التجارية
- ⏳ قسم الاتصال أو الخريطة

#### 2. كتالوج المنتجات (Product Catalog)

- ⏳ صفحة عرض جميع المنتجات
- ⏳ فلترة حسب الفئة (Item Group)
- ⏳ فلترة حسب السعر
- ⏳ البحث عن المنتجات
- ⏳ ترتيب المنتجات (السعر، الأحدث، الأكثر مبيعاً)
- ⏳ Pagination

#### 3. صفحة المنتج (Product Detail)

- ⏳ عرض تفاصيل المنتج (الصورة، الاسم، الوصف، السعر)
- ⏳ إضافة للعربة
- ⏳ اختيار الكمية
- ⏳ عرض منتجات مشابهة

#### 4. سلة التسوق (Shopping Cart)

- ⏳ عرض المنتجات المضافة
- ⏳ تعديل الكميات
- ⏳ حذف المنتجات
- ⏳ حساب الإجمالي
- ⏳ زر الانتقال للدفع

#### 5. صفحة الدفع (Checkout)

- ⏳ معلومات العميل
- ⏳ عنوان التسليم
- ⏳ طريقة الدفع
- ⏳ مراجعة الطلب
- ⏳ تأكيد الطلب

#### 6. الميزات الإضافية

- ⏳ حساب المستخدم (Login/Register)
- ⏳ صفحة الطلبات (Order History)
- ⏳ صفحة الملف الشخصي
- ⏳ دعم متعدد اللغات
- ⏳ Responsive Design

### البنية التقنية:

#### Frontend Components المطلوبة:

1. ✅ Navbar (موجود - يحتاج تحديث)
2. ✅ Slideshow (موجود)
3. ⏳ ProductCard - بطاقة المنتج
4. ⏳ ProductList - قائمة المنتجات
5. ⏳ ProductDetail - تفاصيل المنتج
6. ⏳ ShoppingCart - سلة التسوق
7. ⏳ CartItem - عنصر في السلة
8. ⏳ Checkout - صفحة الدفع
9. ⏳ CategoryFilter - فلتر الفئات
10. ⏳ SearchBar - شريط البحث

#### API Endpoints المطلوبة:

- ✅ Slideshow API (موجود)
- ✅ Item API (موجود)
- ✅ Item Group API (موجود)
- ✅ Customer API (موجود)
- ✅ Sales Order API (موجود)
- ⏳ Cart Management API
- ⏳ Order Tracking API

#### Routing:

- `/` - الصفحة الرئيسية
- `/products` - كتالوج المنتجات
- `/products/:id` - صفحة المنتج
- `/cart` - سلة التسوق
- `/checkout` - صفحة الدفع
- `/orders` - الطلبات
- `/login` - تسجيل الدخول
- `/register` - إنشاء حساب

### خطوات التنفيذ:

#### المرحلة 1: إعداد Routing والبنية الأساسية

1. ✅ إضافة Vue Router
2. ⏳ إنشاء Route Components
3. ⏳ تحديث Home component

#### المرحلة 2: كتالوج المنتجات

1. ⏳ إنشاء ProductCard component
2. ⏳ إنشاء ProductList component
3. ⏳ إضافة Filtering و Sorting
4. ⏳ ربط API بالـ Components

#### المرحلة 3: سلة التسوق

1. ⏳ إنشاء Cart Store (State Management)
2. ⏳ إنشاء ShoppingCart component
3. ⏳ إضافة Add to Cart functionality
4. ⏳ تحديث Navbar لإضافة Cart icon

#### المرحلة 4: صفحة الدفع

1. ⏳ إنشاء Checkout component
2. ⏳ إضافة Customer Form
3. ⏳ ربط مع Sales Order API
4. ⏳ إضافة Order Confirmation

#### المرحلة 5: التصميم والتحسينات

1. ⏳ تحسين UI/UX
2. ⏳ إضافة CSS/Animations
3. ⏳ Responsive Design
4. ⏳ Loading States
5. ⏳ Error Handling

## ✅ ما تم إنجازه حتى الآن

### المرحلة 1: البنية الأساسية (مكتمل ✅)

- ✅ إضافة Vue Router للمشروع
- ✅ إنشاء App Component كـ root component
- ✅ إعداد Router مع Routes:
  - `/` - Home
  - `/products` - Products Catalog
  - `/products/:id` - Product Detail
  - `/cart` - Shopping Cart
  - `/checkout` - Checkout

### المرحلة 2: Components الأساسية (مكتمل ✅)

- ✅ **ProductCard** - بطاقة المنتج مع زر Add to Cart
- ✅ **ProductList** - قائمة المنتجات مع Grid Layout
- ✅ **ProductDetail** - صفحة تفاصيل المنتج
- ✅ **ShoppingCart** - صفحة سلة التسوق
- ✅ **CartItem** - عنصر في السلة مع تعديل الكمية
- ✅ **Checkout** - صفحة الدفع مع نموذج العميل

### المرحلة 3: State Management (مكتمل ✅)

- ✅ **Cart Store** - إدارة حالة السلة باستخدام Vue 3 Composition API
- ✅ LocalStorage للاحتفاظ بالسلة بين الجلسات
- ✅ Functions: addToCart, removeFromCart, updateQuantity, clearCart

### المرحلة 4: Navigation & UI (مكتمل ✅)

- ✅ تحديث Navbar مع Cart icon و Badge
- ✅ استخدام router-link للتنقل
- ✅ تحديث Slideshow لاستخدام الحقول الصحيحة (heading, url)
- ✅ إضافة CSS styles للـ Components

### المرحلة 5: Home Page (مكتمل ✅)

- ✅ Categories Section - عرض فئات المنتجات
- ✅ Featured Products Section - عرض المنتجات المميزة
- ✅ ربط مع API للحصول على البيانات

## الخطوات التالية للتحسين
