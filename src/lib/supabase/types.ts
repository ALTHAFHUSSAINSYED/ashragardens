export type ProductAvailability = "AVAILABLE" | "OUT_OF_STOCK" | "CONTACT_FOR_AVAILABILITY";

export interface DatabaseProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  short_description: string;
  price: number;
  unit: string;
  image: string;
  availability: ProductAvailability;
  stock_quantity: number;
  featured: boolean;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface InventoryLog {
  id: string;
  product_id: string;
  change_type: "RESTOCK" | "ADJUSTMENT" | "STATUS_CHANGE" | "PRICE_CHANGE" | "CREATE" | "DELETE";
  previous_value: string | null;
  new_value: string | null;
  notes: string | null;
  created_at: string;
}
