export interface CartResponse {
  cart: Cart;
}

export interface Cart {
  id: string;
  currency_code: string;
  email: string;
  region_id: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  total: number;
  subtotal: number;
  tax_total: number;
  discount_total: number;
  discount_subtotal: number;
  discount_tax_total: number;
  original_total: number;
  original_tax_total: number;
  item_total: number;
  item_subtotal: number;
  item_tax_total: number;
  original_item_total: number;
  original_item_subtotal: number;
  original_item_tax_total: number;
  shipping_total: number;
  shipping_subtotal: number;
  shipping_tax_total: number;
  original_shipping_total: number;
  original_shipping_subtotal: number;
  original_shipping_tax_total: number;
  credit_line_subtotal: number;
  credit_line_tax_total: number;
  credit_line_total: number;
  metadata: any;
  sales_channel_id: string;
  shipping_address_id: string;
  billing_address_id: string;
  customer_id: string;
  items: LineItem[];
  shipping_methods: any[];
  shipping_address: Address;
  billing_address: Address;
  credit_lines: any[];
  customer: Customer;
  region: Region;
  promotions: any[];
  payment_collection: PaymentCollection;
}

export interface LineItem {
  id: string;
  thumbnail: string;
  variant_id: string;
  product_id: string;
  product_title: string;
  product_description: string;
  product_subtitle: string;
  product_handle: string;
  variant_title: string;
  requires_shipping: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  title: string;
  quantity: number;
  unit_price: number;
  compare_at_unit_price: number | null;
  is_tax_inclusive: boolean;
  tax_lines: any[];
  adjustments: any[];
}

export interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  postal_code: string;
  country_code: string;
    phone: string;
}

export interface OrderDetails {
  variant_id: string,
  quantity: number,
}


export interface Customer {
  id: string;
  email: string;
  groups: any[];
}

export interface Region {
  id: string;
  name: string;
  currency_code: string;
  automatic_taxes: boolean;
  countries: Country[];
}

export interface Country {
  iso_2: string;
  iso_3: string;
  num_code: string;
  name: string;
  display_name: string;
  region_id: string;
  metadata: any;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PaymentCollection {
  id: string;
  currency_code: string;
  completed_at: string | null;
  status: string;
  metadata: any;
  raw_amount: {
    value: string;
    precision: number;
  };
  raw_authorized_amount: any;
  raw_captured_amount: any;
  raw_refunded_amount: any;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  payment_sessions: any[];
  amount: number;
  authorized_amount: any;
  captured_amount: any;
  refunded_amount: any;
}


export interface CartItem {
  id: string; // Khớp với LineItem.id
  name: string;
  image: string;
  price: number;
  originalPrice?: number | null;
  quantity: number;
  color?: string;
  colorName?: string;
  sku?: string;
  variant_title?: string;
}

export interface Voucher {
  code: string;
  title: string;
  discount: number;
  minOrder: number;
  type: "fixed" | "percent";
  isAvailable: boolean;
}

// types/index.ts
export interface MenuItem {
  label: string;
  href: string;
}

export interface OrderSummary {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  note: string;
}

// types/index.ts
export interface MenuItem {
  label: string;
  href: string;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number | null;
  quantity: number;
  color?: string;
  colorName?: string;
  sku?: string;
  variant_title?: string;
}

export interface Voucher {
  code: string;
  title: string;
  discount: number;
  minOrder: number;
  type: "fixed" | "percent";
  isAvailable: boolean;
}

export interface OrderSummary {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  note: string;
}