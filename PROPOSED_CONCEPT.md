# AshraGardens — Proposed Concept & System Architecture Specification

## 1. Overview & Business Model
**Brand:** AshraGardens  
**Tagline:** Bring Nature Closer to Home 🌿  
**Offerings:** Plants • Garden Accessories • Gardening Supplies • Gardening Services  
**Location Hub:** Mayabazar, Piduguralla, Palnadu District, Andhra Pradesh (PIN: 522413)  
**Primary Reach:** 30 km radius / local delivery zones around Piduguralla  

### Customer Capabilities:
- 🌱 **Browse plants:** Flower, fruit, vegetable plants, indoor/outdoor greens
- 🪴 **Buy pots & planters:** Ceramic, terracotta, heavy-duty plastic, designer planters, hanging pots, plant stands
- 🌿 **Buy gardening accessories & tools:** Pruners, trowels, sprayers, watering cans, shears, drip kits
- 🌾 **Buy seeds, soil & fertilizers:** Red soil, vermicompost, coco peat, enriched potting mix, growth nutrients
- 🛒 **Add products to cart & Guest Checkout:** Frictionless order flow without forced registration
- 📍 **Pincode & Delivery Serviceability Check:** Real-time server-side validation against configured delivery zones
- 💳 **UPI / Online Payment:** PhonePe UPI QR (`pathankhandme1@ybl`), UTR/Reference ID submission & Admin verification
- 📦 **Order Tracking:** Real-time order progress from confirmation to doorstep delivery
- 👨‍🌾 **Gardening Services & Consultation:** Dedicated booking & quote flow for balcony, terrace, and landscape setups
- 📱 **WhatsApp / SMS Updates:** Order confirmations, dispatch notices, and delivery status alerts

---

## 2. Architectural Comparison: Madhus Boutique vs. AshraGardens

| Component | Madhus Boutique | AshraGardens |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) + TypeScript | ✅ Reused |
| **Styling & UI** | Tailwind CSS + shadcn/ui | ✅ Reused |
| **Database & Auth** | Supabase (PostgreSQL) | ✅ Reused |
| **Admin Authentication** | Supabase Auth + RBAC | ✅ Reused |
| **MFA** | TOTP / Microsoft Authenticator | ✅ Reused (Microsoft Authenticator) |
| **Audit Logs & Rate Limiting** | PostgreSQL audit tables + Upstash / in-memory | ✅ Reused |
| **Storage** | Object Storage (S3 / Supabase Storage) | Adapted for product, service & garden photos |
| **Product Model** | Digital Machine Embroidery Designs | **Physical Goods (Plants, Pots, Supplies)** |
| **Delivery Model** | Instant ZIP download authorization | **Local Physical Delivery via Delivery Zones** |
| **Inventory System** | Unlimited digital license tracking | **Atomic Physical Stock Reservation & Decrement** |
| **Services Module** | None | **Custom Gardening Service Request Workflow** |

---

## 3. Database Schema Blueprint (Supabase / PostgreSQL)

### 3.1 `categories`
- `id` (UUID, PK)
- `name` (VARCHAR): *Plants, Pots & Planters, Seeds, Soil & Fertilizers, Gardening Tools, Garden Decor, Plant Care*
- `slug` (VARCHAR, UNIQUE)
- `description` (TEXT)
- `image_url` (TEXT)
- `display_order` (INTEGER)
- `active` (BOOLEAN DEFAULT TRUE)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### 3.2 `products`
- `id` (UUID, PK)
- `name` (VARCHAR) — *e.g., Kashmiri Red Rose Plant*
- `slug` (VARCHAR, UNIQUE)
- `description` (TEXT)
- `category_id` (UUID, FK -> categories.id)
- `price` (DECIMAL(10,2))
- `sale_price` (DECIMAL(10,2), NULLABLE)
- `sku` (VARCHAR, UNIQUE) — *e.g., PLANT-ROSE-001*
- `stock_quantity` (INTEGER DEFAULT 0)
- `unit` (VARCHAR) — *e.g., plant, pot, kg, bag, piece*
- `weight` (DECIMAL(6,2), NULLABLE) — in kg
- `image_url` (TEXT)
- `gallery_images` (TEXT[] DEFAULT '{}')
- `care_instructions` (TEXT)
- `status` (VARCHAR DEFAULT 'active') — *active, draft, out_of_stock, archived*
- `created_at`, `updated_at` (TIMESTAMPTZ)

### 3.3 `inventory` (Atomic Physical Stock Management)
- `product_id` (UUID, PK, FK -> products.id)
- `quantity_available` (INTEGER DEFAULT 0)
- `quantity_reserved` (INTEGER DEFAULT 0)
- `reorder_level` (INTEGER DEFAULT 5)
- `updated_at` (TIMESTAMPTZ)
- *Database Function / Stored Procedure:* `reserve_inventory_atomic(p_product_id, p_qty)` & `commit_inventory_atomic(p_order_id)`

### 3.4 `delivery_zones` (Strict Server-Side Validation)
- `id` (UUID, PK)
- `name` (VARCHAR) — *e.g., Piduguralla Town, Macherla, Narasaraopet, Dachepalle*
- `pincode` (VARCHAR(10), UNIQUE)
- `delivery_available` (BOOLEAN DEFAULT TRUE)
- `delivery_fee` (DECIMAL(10,2) DEFAULT 40.00)
- `minimum_order` (DECIMAL(10,2) DEFAULT 200.00)
- `estimated_days` (VARCHAR DEFAULT '1-2 Days')
- `active` (BOOLEAN DEFAULT TRUE)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### 3.5 `orders` & `order_items`
- `orders`:
  - `id` (UUID, PK)
  - `order_number` (VARCHAR, UNIQUE) — *e.g., AG-20260924-00125*
  - `customer_name` (VARCHAR)
  - `customer_phone` (VARCHAR)
  - `customer_email` (VARCHAR, NULLABLE)
  - `shipping_address` (TEXT)
  - `pincode` (VARCHAR(10))
  - `zone_id` (UUID, FK -> delivery_zones.id)
  - `subtotal` (DECIMAL(10,2))
  - `delivery_fee` (DECIMAL(10,2))
  - `total_amount` (DECIMAL(10,2))
  - `payment_status` (VARCHAR DEFAULT 'pending') — *pending, verified, failed*
  - `order_status` (VARCHAR DEFAULT 'placed') — *placed, confirmed, preparing, ready_for_delivery, out_for_delivery, delivered, cancelled*
  - `notes` (TEXT)
  - `created_at`, `updated_at` (TIMESTAMPTZ)
- `order_items`:
  - `id` (UUID, PK)
  - `order_id` (UUID, FK -> orders.id)
  - `product_id` (UUID, FK -> products.id)
  - `unit_price` (DECIMAL(10,2))
  - `quantity` (INTEGER)
  - `total_price` (DECIMAL(10,2))

### 3.6 `payments`
- `id` (UUID, PK)
- `order_id` (UUID, FK -> orders.id)
- `payment_method` (VARCHAR DEFAULT 'upi_qr') — *upi_qr, cod, online_gateway*
- `upi_id` (VARCHAR DEFAULT 'pathankhandme1@ybl')
- `utr_reference` (VARCHAR)
- `payer_name` (VARCHAR)
- `screenshot_url` (TEXT, NULLABLE)
- `status` (VARCHAR DEFAULT 'pending_verification') — *pending_verification, approved, rejected*
- `verified_by` (UUID, FK -> admin_users.id, NULLABLE)
- `verified_at` (TIMESTAMPTZ, NULLABLE)
- `created_at` (TIMESTAMPTZ)

### 3.7 `services` & `service_requests` (Gardening Consultation & Setup)
- `services`:
  - `id` (UUID, PK)
  - `title` (VARCHAR) — *Garden Setup, Plant Maintenance, Pruning, Landscaping, Balcony/Terrace Garden, Drip Irrigation*
  - `slug` (VARCHAR)
  - `description` (TEXT)
  - `starting_price` (DECIMAL(10,2), NULLABLE)
  - `icon` (VARCHAR)
  - `image_url` (TEXT)
  - `active` (BOOLEAN DEFAULT TRUE)
- `service_requests`:
  - `id` (UUID, PK)
  - `request_number` (VARCHAR, UNIQUE) — *e.g., SR-20260924-0042*
  - `customer_name` (VARCHAR)
  - `customer_phone` (VARCHAR)
  - `address` (TEXT)
  - `pincode` (VARCHAR(10))
  - `service_id` (UUID, FK -> services.id)
  - `preferred_date` (DATE)
  - `preferred_time_slot` (VARCHAR)
  - `description` (TEXT)
  - `site_photos` (TEXT[] DEFAULT '{}')
  - `quoted_amount` (DECIMAL(10,2), NULLABLE)
  - `status` (VARCHAR DEFAULT 'SERVICE_REQUESTED')
    - Lifecycle: `SERVICE_REQUESTED` → `ADMIN_REVIEW` → `CONTACT_CUSTOMER` → `QUOTE_CREATED` → `CUSTOMER_ACCEPTED` → `SCHEDULED` → `IN_PROGRESS` → `COMPLETED`
  - `created_at`, `updated_at` (TIMESTAMPTZ)

### 3.8 `admin_users` & `audit_logs`
- `admin_users`:
  - `id` (UUID, PK, FK -> auth.users.id)
  - `email` (VARCHAR)
  - `role` (VARCHAR DEFAULT 'admin') — *super_admin, manager, delivery_staff*
  - `mfa_enabled` (BOOLEAN DEFAULT TRUE) — Microsoft Authenticator TOTP
  - `created_at` (TIMESTAMPTZ)
- `audit_logs`:
  - `id` (UUID, PK)
  - `actor_id` (UUID, FK -> admin_users.id)
  - `action` (VARCHAR) — *e.g., VERIFY_PAYMENT, UPDATE_STOCK, DISPATCH_ORDER*
  - `entity_type` (VARCHAR)
  - `entity_id` (VARCHAR)
  - `metadata` (JSONB)
  - `created_at` (TIMESTAMPTZ)

---

## 4. Key Workflows & Business Rules

### 4.1 Delivery Serviceability Check (Server-Side)
```
Customer enters Pincode (e.g., 522413)
       │
       ▼
Next.js Server Action / API
queries `delivery_zones`
       │
  ┌────┴────┐
  │         │
[YES]      [NO]
  │         │
  ▼         ▼
Return:    Return: "Currently not deliverable to this location.
- Fee: ₹40         Contact us on WhatsApp for special delivery arrangements."
- Min: ₹200
- Est: 1-2 Days
```

### 4.2 Checkout & Atomic Inventory Reservation
1. Customer reviews Cart.
2. Enters delivery address & validated Pincode.
3. System runs `reserve_inventory_atomic()` locking the quantities.
4. Total calculated (`Subtotal + Delivery Fee`).
5. Customer is shown PhonePe QR code for `pathankhandme1@ybl` (Mahaboob Khan Pathan).
6. Customer makes payment and enters the 12-digit UTR/UPI Reference Number (optional screenshot upload).
7. Order created with status `placed`, payment `pending_verification`.

### 4.3 Payment Verification & Order Fulfillment
1. Admin receives alert on Admin Dashboard under **Pending Payments**.
2. Admin cross-checks UTR in Canara Bank / PhonePe app.
3. Admin clicks **Verify Payment**:
   - Payment status → `approved`
   - Order status → `confirmed`
   - Stored procedure commits inventory deduction permanently
   - Automated WhatsApp / SMS notification triggered to customer:
     > *"🌿 Your AshraGardens order AG-20260924-00125 has been confirmed and is being prepared."*
4. Packing & Local Delivery:
   - Order status updated: `READY_FOR_DELIVERY` → `OUT_FOR_DELIVERY` → `DELIVERED`.
   - Customer receives real-time WhatsApp updates at each stage.

### 4.4 Gardening Services Booking Flow
- Customer browses services (*Terrace Garden, Lawn Setup, Balcony Plants, Seasonal Pruning*).
- Clicks **Book a Service** modal (separate from product cart).
- Fills details: Name, Mobile, Address, Pincode, Service Type, Preferred Date & Time, Site Description/Photos.
- Ticket created with status `SERVICE_REQUESTED`.
- Admin reviews site details, calls customer, creates a custom quote, schedules visit upon agreement.

---

## 5. Admin Dashboard Architecture
- **Tech Stack:** Next.js App Router, Tailwind CSS, shadcn/ui components, Supabase Auth.
- **Security & Access Control:**
  - Supabase Auth + Microsoft Authenticator MFA (TOTP).
  - Role-Based Access Control (RBAC) & IP/Audit logging.
- **Dashboard Modules:**
  1. **Overview:** Daily orders, pending payments, orders processing, low stock alerts, active service requests, revenue.
  2. **Products & Categories:** Full CRUD with image upload, categories, tags, pricing.
  3. **Inventory:** Real-time stock monitor, atomic quantity adjustment, low-stock reorder alerts.
  4. **Orders & Fulfillment:** Order lifecycle management, local delivery assignment, invoice printing.
  5. **Payments:** UPI UTR verification queue, payment proof viewer, approval/rejection.
  6. **Delivery Zones:** Add/modify pincodes, delivery charges, min order amounts, active toggles.
  7. **Service Requests:** Kanban/list pipeline (`SERVICE_REQUESTED` → `COMPLETED`).
  8. **Audit Logs & Settings:** Tamper-evident admin action history.

---

## 6. Official Business Details Retained
- **Brand:** AshraGardens
- **Beneficiary:** Mahaboob Khan Pathan
- **Phone:** +91 9491366841
- **Email:** ashragardens@gmail.com
- **UPI ID:** `pathankhandme1@ybl`
- **Bank:** Canara Bank (A/C ending `7489`)
- **Hub:** Mayabazar, Piduguralla, Palnadu District, AP (PIN: `522413`)
- **Coverage:** ~30 km radius around Piduguralla
