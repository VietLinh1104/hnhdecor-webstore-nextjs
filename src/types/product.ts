// types/product.ts

export interface ProductImage {
  id: string;
  url: string;
  metadata: any;
  rank: number;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OptionValue {
  id: string;
  value: string;
  metadata: any;
  option_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProductOption {
  id: string;
  title: string;
  metadata: any;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  values: OptionValue[];
}

export interface Price {
  id: string;
  price_list_id: string | null;
  price_list_type: string | null;
  min_quantity: number | null;
  max_quantity: number | null;
}

export interface RawAmount {
  value: string;
  precision: number;
}

export interface CalculatedPrice {
  id: string;
  is_calculated_price_price_list: boolean;
  is_calculated_price_tax_inclusive: boolean;
  calculated_amount: number;
  raw_calculated_amount: RawAmount;
  is_original_price_price_list: boolean;
  is_original_price_tax_inclusive: boolean;
  original_amount: number;
  raw_original_amount: RawAmount;
  currency_code: string;
  calculated_price: Price;
  original_price: Price;
}

export interface VariantOption {
  id: string;
  value: string;
  metadata: any;
  option_id: string;
  option: ProductOption;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string | null;
  barcode: string | null;
  ean: string | null;
  upc: string | null;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  metadata: any;
  variant_rank: number;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  options: VariantOption[];
  calculated_price: CalculatedPrice | null;
}

export interface ProductCategory {
  id: string;
  name: string;
  // Add other category properties as needed
}

export interface ProductType {
  id: string;
  value: string;
  // Add other type properties as needed
}

export interface ProductCollection {
  id: string;
  title: string;
  // Add other collection properties as needed
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  is_giftcard: boolean;
  discountable: boolean;
  thumbnail: string;
  collection_id: string | null;
  type_id: string | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  created_at: string;
  updated_at: string;
  type: ProductType | null;
  collection: ProductCollection | null;
  options: ProductOption[];
  tags: string[]; // Assuming tags are strings
  images: ProductImage[];
  variants: ProductVariant[];
  categories?: ProductCategory[]; // Optional since not in API response
}

export interface ProductsResponse {
  products: Product[];
  count: number;
  offset: number;
  limit: number;
}

// Alias for backward compatibility
export type ProductListResponse = ProductsResponse;

// Additional utility types
export interface ProductListProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  onClick?: (product: Product) => void;
}