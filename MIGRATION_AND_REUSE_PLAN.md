# AshraGardens — Architectural Analysis & Migration/Reuse Plan
**Reference Base:** `D:\Madhusboteque` (Read-only analysis, untouched)  
**Target Repository:** `D:\ashragardens`  
**Core Constraint:** Zero external S3 bucket requirement & Zero external cloud database requirement for initial deployment/run (self-contained, standalone local/offline-first with seamless upgrade path).

---

## Executive Architectural Summary
`D:\Madhusboteque` provides a battle-tested Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui foundation with production-grade security (RBAC, sliding-window rate limiting, tamper-evident audit logging, and Microsoft Authenticator MFA).

However, **Madhus Boutique** is a digital embroidery design delivery engine, whereas **AshraGardens** is a physical nursery, garden supplies, and local landscaping services enterprise.

By decoupling the digital file streaming/download machinery and replacing it with **physical inventory reservation**, **server-side delivery zone verification**, and **gardening service request pipelines**, we can reuse ~60% of the engineering architecture while dramatically accelerating AshraGardens' time-to-market.

---

## Module-by-Module Classification: REUSE / MODIFY / DELETE / CREATE

### 1. Framework, Build & Dependencies
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **REUSE** | Next.js 16 + React 19 + TypeScript 5 | Solid modern core runtime. |
| **REUSE** | Tailwind CSS v4 + PostCSS | Rapid responsive styling engine. |
| **REUSE** | `lucide-react`, `clsx`, `tailwind-merge` | Standard lightweight utility icons and class merges. |
| **REUSE** | `zod` | Server-side schema validation for checkout, address, delivery check, and service requests. |
| **DELETE** | `@aws-sdk/client-s3` & `@aws-sdk/s3-request-presigner` | **Zero S3 requirement.** AshraGardens sells physical plants/tools; images are served from static `/public/images` or local storage. |
| **DELETE** | `jszip` | No digital ZIP archives needed for physical saplings or pots. |

---

### 2. Authentication, RBAC & Security Utilities
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **REUSE** | `src/lib/server/rateLimit.ts` | In-memory sliding-window rate limiter protecting checkout, UTR submission, order tracking, and service request endpoints. |
| **REUSE** | `src/lib/server/adminAuth.ts` | Session validation, admin token guards, cookie handling. |
| **REUSE** | `src/app/admin/login/page.tsx` & `src/app/admin/mfa/page.tsx` | Secure login interface and **Microsoft Authenticator (TOTP)** verification screen. |
| **MODIFY** | `ROLE_PERMISSIONS` in `adminAuth.ts` | Replace embroidery-specific permissions (`manage:embroidery_files`) with nursery permissions: `manage:delivery_zones`, `manage:service_requests`, `manage:inventory`. |

---

### 3. Media & Storage Architecture (Zero S3 Bucket)
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **DELETE** | `src/lib/server/s3/*` | Remove AWS S3 client, presigned URL generators, private bucket download policies. |
| **DELETE** | `src/app/api/admin/uploads/embroidery-file` | Digital embroidery design uploader deleted. |
| **CREATE** | `public/images/products/*` & `public/images/services/*` | High-quality local image assets for plants, pots, tools, soils, and landscape projects. |
| **MODIFY** | `src/app/api/admin/uploads/payment-qr` | Simple local file storage or static public QR code asset for PhonePe (`pathankhandme1@ybl`). |

---

### 4. Database & State Layer (Zero Cloud DB Setup Required)
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **REUSE** | `src/lib/server/db/audit.ts` | In-memory append-only audit log store (`DEV_AUDIT_LOGS_STORE`) recording administrative actions. |
| **MODIFY** | `src/lib/server/db/client.ts` | Configured to operate seamlessly in standalone local mode with in-memory / JSON persistence when Supabase credentials are not provided. |
| **MODIFY** | `src/lib/server/db/siteSettings.ts` | Store AshraGardens business profile (Phone: `9491366841`, Email: `ashragardens@gmail.com`, Address: `Mayabazar, Piduguralla, Palnadu District, AP`). |
| **DELETE** | `src/app/api/orders/[orderNumber]/download` | Remove digital file download route. |
| **CREATE** | `src/lib/server/db/deliveryZones.ts` | Local data store of serviceable pincodes within the 30 km Piduguralla radius. |
| **CREATE** | `src/lib/server/db/services.ts` | Data store for gardening services catalog and customer consultation tickets. |

---

### 5. Cart, Checkout & Delivery Zone Verification
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **REUSE** | `src/context/CartContext.tsx` | LocalStorage client cart state with item quantities, totals, badge counts, and persistence. |
| **MODIFY** | `src/components/cart/CartDrawer.tsx` | Adapt item displays to show plant pot size/weight, remove digital format pills ("DST, PES"). |
| **MODIFY** | `src/app/checkout/page.tsx` | Add physical delivery address fields: `Street Address`, `Landmark`, `City (Piduguralla area)`, and `Pincode`. |
| **CREATE** | `src/app/api/delivery-zones/check/route.ts` | **Server-side delivery serviceability validator.** Checks entered pincode against active zones, returns delivery fee and estimated delivery days. |
| **CREATE** | `src/components/home/PincodeChecker.tsx` | Instant homepage interactive pincode checker widget (*"Can we deliver to you?"*). |

---

### 6. Products, Inventory & Order Lifecycle (Physical vs. Digital)
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **DELETE** | `stitch_count`, `dimensions`, `file_format`, `download_count`, `max_downloads`, `zip_s3_key` | Remove all digital file metadata from products and orders. |
| **MODIFY** | `Product` schema in `types/store.ts` | Add physical attributes: `unit` (*plant, pot, bag, piece*), `weight` (kg), `category_id`, `stock_quantity`, `care_instructions`. |
| **MODIFY** | `src/app/api/orders/route.ts` | Enforce server-side price calculation + delivery charge calculation based on validated zone. |
| **CREATE** | `src/lib/server/inventory/reservation.ts` | **Atomic inventory reservation:** Prevents race conditions when two customers attempt to purchase the last available jasmine or rose plant. |
| **MODIFY** | `src/app/track-order/page.tsx` | Display physical shipment milestone stepper: `ORDER_PLACED` → `PAYMENT_VERIFIED` → `PREPARING_PLANTS` → `OUT_FOR_DELIVERY` → `DELIVERED`. |

---

### 7. Payments & UPI Verification
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **REUSE** | `src/app/api/payments/submit/route.ts` | 12-digit UTR reference submission endpoint with duplicate detection. |
| **REUSE** | `src/app/api/admin/payments/verify/route.ts` | Admin payment approval and rejection handler. |
| **MODIFY** | `src/data/paymentSettings.ts` | Pre-configure AshraGardens payment profile:  
  • **UPI ID:** `pathankhandme1@ybl`  
  • **Beneficiary Name:** Mahaboob Khan Pathan  
  • **Bank:** Canara Bank (`7489`)  
  • **QR Display:** PhonePe QR modal |
| **CREATE** | WhatsApp Order Dispatch Link Generator | Automated WhatsApp dispatch string with order summary and status updates. |

---

### 8. Gardening Services & Consultation (Brand New Feature)
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **CREATE** | `src/app/services/page.tsx` | Visual showcase of gardening services: Terrace Garden Setup, Balcony Plants, Lawn Maintenance, Tree Pruning, Drip Irrigation. |
| **CREATE** | `src/components/services/ServiceBookingModal.tsx` | Dedicated request modal (Customer Name, Phone, Address, Service Type, Preferred Date & Slot, Garden description). |
| **CREATE** | `src/app/api/services/request/route.ts` | Service request submission endpoint with validation and ticket generation (`SR-20260924-XXXX`). |
| **CREATE** | Admin Service Requests Management Tab | Dashboard pipeline (`SERVICE_REQUESTED` → `ADMIN_REVIEW` → `CONTACTED` → `QUOTE_CREATED` → `SCHEDULED` → `COMPLETED`). |

---

### 9. Admin Dashboard Shell
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **REUSE** | `src/app/admin/page.tsx` layout & tab shell | Navigation bar, quick KPI cards, logout handler. |
| **MODIFY** | Admin Metrics Cards | Display: `Today's Plant Orders`, `Pending UPI Payments`, `Active Service Requests`, `Low Stock Plants (<5)`, `Today's Revenue (₹)`. |
| **MODIFY** | Product Management Tab | Edit plant/pot catalog, update physical stock counts, set care tips and unit measurements. |
| **CREATE** | Delivery Zones Tab | Admin interface to activate/deactivate pincodes, set delivery fees (₹40, ₹50), and set minimum order thresholds. |
| **CREATE** | Service Requests Tab | Dedicated kanban/table view to manage landscaping and garden maintenance inquiries. |

---

### 10. Storefront UI, Aesthetics & Brand Identity
| Action | Item / File Path | Details & Justification |
| :--- | :--- | :--- |
| **DELETE** | `AnimatedHeroHoop.tsx`, `StitchingIntroAnimation.tsx` | Remove embroidery hoop SVGs and thread stitching animations. |
| **CREATE** | Botanical Hero Section | Lush, earthy natural aesthetic: *"Bring Nature Closer to Home 🌿"*, featuring healthy nursery photography and quick CTA buttons. |
| **CREATE** | Botanical Category Strip | Visual icon cards: 🌱 Plants, 🪴 Pots & Stands, 🌾 Seeds & Bulbs, 🌿 Enriched Soils, 🛠 Garden Tools. |
| **MODIFY** | `Header.tsx` & `Footer.tsx` | AshraGardens branding, Mayabazar Piduguralla location details, phone contact (`9491366841`), and plant care links. |
| **REUSE** | `WhatsAppBubble.tsx` | Floating direct WhatsApp connect button (+91 9491366841) for instant customer support. |

---

## Summary Matrix

| Category | REUSE | MODIFY | DELETE | CREATE |
| :--- | :---: | :---: | :---: | :---: |
| **Core Architecture & Tooling** | 4 | 1 | 3 | 0 |
| **Security, RBAC & Auth** | 3 | 1 | 0 | 0 |
| **Database & Storage** | 1 | 2 | 2 | 3 |
| **Cart, Checkout & Delivery** | 1 | 2 | 0 | 2 |
| **Products & Inventory** | 0 | 2 | 1 | 2 |
| **Payments (UPI / QR)** | 2 | 1 | 0 | 1 |
| **Gardening Services** | 0 | 0 | 0 | 4 |
| **Admin Dashboard** | 1 | 2 | 0 | 2 |
| **Storefront UI & Brand** | 1 | 2 | 2 | 3 |
| **TOTALS** | **13** | **13** | **8** | **17** |

---

## Architectural Verdict & Next Steps
By following this plan:
1. **Zero External Overhead:** The site will run completely with `npm run dev` with **no S3 buckets and no external database setup required**. All products, mock orders, delivery zones, and service requests will be persisted via robust local storage/in-memory patterns.
2. **Speed & Reliability:** We retain the full battle-tested admin login, Microsoft Authenticator MFA, Zod validations, sliding-window rate limiting, and cart architecture from `D:\Madhusboteque`.
3. **Distinct Identity:** AshraGardens receives an authentic, organic nursery aesthetic with interactive pincode delivery checking and dedicated gardening service request workflows.
