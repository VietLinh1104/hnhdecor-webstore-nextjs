export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  handle: string;
  rank: number;
  parent_category_id: string | null;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any> | null;
  parent_category: ProductCategory | null;
  category_children: ProductCategory[];
};

export type ProductCategoryResponse = {
  product_categories: ProductCategory[];
  count: number;
  offset: number;
  limit: number;
};
