// lib/api.ts
import { apiClient } from "@/lib/fetcher";

// GET /store/products
import { Product, ProductListResponse } from "@/types/product";
import { ProductCategoryResponse, ProductCategory } from "@/types/category";


export async function getAllProducts(): Promise<Product[]> {
  const res = await apiClient.get<ProductListResponse>("/products?fields=*variants.calculated_price&region_id=reg_01K1VCRS7MVGP61R0Z1GD0V8FQ");
  return res.data.products;
}

// GET /store/products/:id
export async function getProductById(id: string) {
  const res = await apiClient.get(`/products/${id}`);
  return res.data.product;
}

// GET /store/product-categories
export async function getAllCategories(): Promise<ProductCategory[]> {
  const res = await apiClient.get<ProductCategoryResponse>("/product-categories");
  return res.data.product_categories;
}