// src/types/Product.ts
export interface Product {
  id: number;
  category: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  thumbnails: string[];
}

export interface MenuItem {
  label: string;
  href: string;
}

export interface Coupon {
  discount: string;
  category: string;
  code: string;
  expiry: string;
  image: string;
  outdatedImage: string;
}

export type ColorType = {
  color: string;
  image: string[];
};

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  color: string;
  colorName: string;
  sku: string;
}

export interface Voucher {
  code: string;
  title: string;
  discount: number;
  minOrder: number;
  type: "percent" | "fixed";
  isAvailable: boolean;
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

export interface OrderSummary {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

// Types
export interface CartItem2 {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  color: string;
}

