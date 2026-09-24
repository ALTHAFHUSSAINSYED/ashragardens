-- ==============================================================================
-- ASHRAGARDENS: POSTGRESQL INVENTORY & CATALOG SCHEMA
-- Run this in Supabase SQL Editor (https://app.supabase.com -> Project -> SQL Editor)
-- ==============================================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  unit TEXT NOT NULL DEFAULT 'per pot',
  image TEXT NOT NULL,
  availability TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (availability IN ('AVAILABLE', 'OUT_OF_STOCK', 'CONTACT_FOR_AVAILABILITY')),
  stock_quantity INTEGER NOT NULL DEFAULT 25,
  featured BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create Inventory Activity Logs Table
CREATE TABLE IF NOT EXISTS public.inventory_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL CHECK (change_type IN ('RESTOCK', 'ADJUSTMENT', 'STATUS_CHANGE', 'PRICE_CHANGE', 'CREATE', 'DELETE')),
  previous_value TEXT,
  new_value TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public/customers) to read products
CREATE POLICY "Public Read Products"
  ON public.products
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated admins to insert, update, delete products
CREATE POLICY "Admin Full Access Products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated admins full access to inventory logs
CREATE POLICY "Admin Full Access Inventory Logs"
  ON public.inventory_logs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Initial Catalog Seed Data (AshraGardens Initial Nursery Stock)
INSERT INTO public.products (
  id, name, slug, category, description, short_description, price, unit, image, availability, stock_quantity, featured, tags
) VALUES
  (
    'prod-01',
    'Kashmiri Grafted Rose Plant',
    'kashmiri-royal-red-rose-plant',
    'Flowering Plants',
    'Hardy, acclimated grafted Kashmiri red rose bush with abundant fragrant blooms. Thrives in tropical Andhra Pradesh climate.',
    'Rich crimson perennial cluster blooms ideal for garden beds and sunny balconies.',
    150.00,
    'per plant',
    '/images/products/kashmiri-rose.jpg',
    'AVAILABLE',
    45,
    true,
    ARRAY['Rose', 'Flowering', 'Perennial', 'Fragrant']
  ),
  (
    'prod-02',
    'Emerald Glazed Ceramic Planter with Metal Stand',
    'glazed-emerald-ceramic-planter-stand',
    'Pots & Planters',
    'Handcrafted premium stoneware ceramic pot with glossy emerald green finish, accompanied by a powder-coated weather-resistant black metal stand with drainage hole.',
    'Elegant modern botanical planter set designed for living rooms and verandas.',
    450.00,
    'per set',
    '/images/products/ceramic-planter.jpg',
    'AVAILABLE',
    30,
    true,
    ARRAY['Pots', 'Ceramic', 'Stand', 'Indoor Decor']
  ),
  (
    'prod-03',
    'Enriched Organic Potting Soil Mix (5 kg)',
    'enriched-organic-potting-soil-vermicompost',
    'Soil & Fertilizers',
    'Carefully blended red loam soil, aged vermicompost, cocopeat, and neem cake powder for natural aeration and sustained root nourishment.',
    'Aerated, pathogen-free organic blend formulated for vigorous plant vigor.',
    120.00,
    '5 kg bag',
    '/images/products/organic-soil.jpg',
    'AVAILABLE',
    80,
    true,
    ARRAY['Organic Soil', 'Vermicompost', 'Neem Cake', 'Potting Mix']
  ),
  (
    'prod-04',
    'Thai All-Time Sweet Mango Grafted Sapling',
    'thai-all-time-mango-plant',
    'Fruit Plants',
    'Dwarf grafted mango variety that flowers and yields sweet, low-fiber fruit multiple times a year. Suitable for large terrace containers or home gardens.',
    'Prolific dwarf mango variety producing sweet aromatic fruits year-round.',
    280.00,
    'per sapling',
    '/images/products/kashmiri-rose.jpg',
    'AVAILABLE',
    25,
    true,
    ARRAY['Fruit', 'Mango', 'Grafted', 'Terrace Garden']
  ),
  (
    'prod-05',
    'Air-Purifying Areca Palm (2.5 Ft)',
    'air-purifying-areca-palm',
    'Indoor Plants',
    'Lush, feathery tropical palm that naturally filters indoor toxins while humidifying dry rooms. Well established in nursery grow bag.',
    'Graceful tropical indoor foliage plant known for robust air purification.',
    220.00,
    'per plant',
    '/images/products/ceramic-planter.jpg',
    'AVAILABLE',
    35,
    false,
    ARRAY['Indoor', 'Air Purifying', 'Palm', 'Low Maintenance']
  ),
  (
    'prod-06',
    'Heirloom Country Vegetable Seeds Kit (8 Varieties)',
    'heirloom-vegetable-seeds-kit',
    'Seeds',
    'Handpicked non-GMO regional vegetable seed packets: Country Tomato, Ridge Gourd, Bitter Gourd, Okra (Bhendi), Brinjal, Palak, Coriander, and Green Chilli.',
    'High-germination kitchen garden seed bundle for pesticide-free home harvest.',
    160.00,
    'kit of 8 packets',
    '/images/products/organic-soil.jpg',
    'AVAILABLE',
    60,
    false,
    ARRAY['Seeds', 'Vegetables', 'Kitchen Garden', 'Non-GMO']
  ),
  (
    'prod-07',
    'Heavy-Duty Ergonomic Garden Trowel & Cultivator Set',
    'heavy-duty-garden-trowel-cultivator-set',
    'Gardening Tools',
    'Cast aluminum hand shovel with depth measurements and 3-prong cultivator rake. Ergonomic non-slip rubber grip designed for digging and weeding.',
    'Rust-proof dual tool combination engineered for repotting and soil aeration.',
    299.00,
    'set of 2 tools',
    '/images/products/ceramic-planter.jpg',
    'AVAILABLE',
    20,
    false,
    ARRAY['Tools', 'Trowel', 'Cultivator', 'Aluminum']
  ),
  (
    'prod-08',
    'Cold-Pressed Pure Neem Oil Plant Spray (250 ml)',
    'cold-pressed-neem-oil-spray',
    'Plant Care',
    '100% organic cold-pressed neem kernel oil with emulsifier. Prevents mealybugs, aphids, spider mites, and fungal leaf spot safely.',
    'Natural broad-spectrum biopesticide and foliage protector for chemical-free gardening.',
    140.00,
    '250 ml bottle',
    '/images/products/organic-soil.jpg',
    'AVAILABLE',
    50,
    false,
    ARRAY['Plant Care', 'Neem Oil', 'Organic Pesticide', 'Leaf Health']
  )
ON CONFLICT (id) DO NOTHING;
