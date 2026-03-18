export type BusinessType = "pedagang" | "laundry" | "guru" | "jasa_umum";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "in_progress"
  | "ready"
  | "completed"
  | "cancelled";

export type PaymentStatus = "unpaid" | "partial" | "paid";

export interface Business {
  id: string;
  user_id: string;
  name: string;
  type: BusinessType;
  slug: string | null;
  description: string | null;
  address: string | null;
  logo_url: string | null;
  settings: Record<string, unknown>;
  created_at: string;
}

export interface Order {
  id: string;
  business_id: string;
  contact_id: string | null;
  consumer_id: string | null;
  order_code: string;
  items: unknown[];
  total: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
