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