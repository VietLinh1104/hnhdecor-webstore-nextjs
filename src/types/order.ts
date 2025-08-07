

export interface OrderResponse   {
    order: Order;
}

export interface RawValue {
  value: string;
  precision: number;
}

export interface PaymentCollection {
  id: string;
  currency_code: string;
  completed_at: string | null;
  status: "authorized" | "pending" | "canceled" | string;
  metadata: Record<string, any> | null;
  raw_amount: RawValue;
  raw_authorized_amount: RawValue;
  raw_captured_amount: RawValue;
  raw_refunded_amount: RawValue;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  amount: number;
  authorized_amount: number;
  captured_amount: number;
  refunded_amount: number;
}

export interface OrderItemDetail {
  id: string;
  version: number;
  metadata: any;
  order_id: string;
  raw_unit_price: RawValue | null;
  raw_compare_at_unit_price: RawValue | null;
  raw_quantity: RawValue;
  raw_fulfilled_quantity: RawValue;
  raw_delivered_quantity: RawValue;
  raw_shipped_quantity: RawValue;
  raw_return_requested_quantity: RawValue;
  raw_return_received_quantity: RawValue;
  raw_return_dismissed_quantity: RawValue;
  raw_written_off_quantity: RawValue;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  item_id: string;
  unit_price: number | null;
  compare_at_unit_price: number | null;
  quantity: number;
  fulfilled_quantity: number;
  delivered_quantity: number;
  shipped_quantity: number;
  return_requested_quantity: number;
  return_received_quantity: number;
  return_dismissed_quantity: number;
  written_off_quantity: number;
}

export interface OrderItem {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  variant_id: string;
  product_id: string;
  product_title: string;
  product_description: string;
  product_subtitle: string;
  product_type: string | null;
  product_type_id: string | null;
  product_collection: string | null;
  product_handle: string;
  variant_sku: string | null;
  variant_barcode: string | null;
  variant_title: string;
  variant_option_values: any;
  requires_shipping: boolean;
  is_giftcard: boolean;
  is_discountable: boolean;
  is_tax_inclusive: boolean;
  is_custom_price: boolean;
  metadata: Record<string, any>;
  raw_compare_at_unit_price: RawValue | null;
  raw_unit_price: RawValue;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  tax_lines: any[];
  adjustments: any[];
  compare_at_unit_price: number | null;
  unit_price: number;
  quantity: number;
  raw_quantity: RawValue;
  detail: OrderItemDetail;
  subtotal: number;
  total: number;
  original_total: number;
  discount_total: number;
  discount_subtotal: number;
  discount_tax_total: number;
  tax_total: number;
  original_tax_total: number;
  refundable_total_per_unit: number;
  refundable_total: number;
  fulfilled_total: number;
  shipped_total: number;
  return_requested_total: number;
  return_received_total: number;
  return_dismissed_total: number;
  write_off_total: number;
  raw_subtotal: RawValue;
  raw_total: RawValue;
  raw_original_total: RawValue;
  raw_discount_total: RawValue;
  raw_discount_subtotal: RawValue;
  raw_discount_tax_total: RawValue;
  raw_tax_total: RawValue;
  raw_original_tax_total: RawValue;
  raw_refundable_total_per_unit: RawValue;
  raw_refundable_total: RawValue;
  raw_fulfilled_total: RawValue;
  raw_shipped_total: RawValue;
  raw_return_requested_total: RawValue;
  raw_return_received_total: RawValue;
  raw_return_dismissed_total: RawValue;
  raw_write_off_total: RawValue;
}

export interface BillingAddress {
  "id": string;
    "customer_id": string | null;
    "company": string | null;
    "email": string;
    "first_name": string | null;
    "last_name": string;
    "address_1": string;
    "address_2": string | null;
    "city": string;
    "country_code": string;
    "province": string | null;
    "postal_code": string;
    "phone": string | null;
    "metadata": Record<string, any> | null;
    "created_at": string;
    "updated_at": string;
    "deleted_at": string | null;
}

export interface Order {
  id: string;
  status: "pending" | "confirmed" | "completed" | "canceled" | string;
  total: number;
  email: string;
  billing_address: BillingAddress;
  items: OrderItem[];
  version: number;
  payment_collections: PaymentCollection[];
  fulfillments: any[]; // bạn có thể định nghĩa thêm nếu cần
  payment_status: "authorized" | "captured" | "awaiting" | string;
  fulfillment_status: "not_fulfilled" | "fulfilled" | "shipped" | string;
  created_at?: string;
  updated_at?: string;
}
