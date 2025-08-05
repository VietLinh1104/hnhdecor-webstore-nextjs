// src/types/Product.ts
export interface ColorType {
  color: string;
  image: string[];
}

export interface ProductType {
  id: number;
  category: string;
  name: string;
  brand: string;
  sku: string;
  originalPrice: number;
  discount: number;
  status: string;
  colors: ColorType[];
  codeCoupon: string[];
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

export interface CategoryItem {
  id: number;
  name: string;
  productCount: number;
  image: string;
  href: string;
}