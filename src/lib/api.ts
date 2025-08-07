// lib/api.ts
import { apiClient } from "@/lib/fetcher";
import { CartResponse, OrderDetails, Address } from "@/types/carts";
import { Product, ProductListResponse } from "@/types/product";
import { ProductCategoryResponse, ProductCategory } from "@/types/category";
import { GetProductResponse } from "@/types/productDetail";
import {Order,OrderResponse} from "@/types/order";



// export async function getAllProducts(): Promise<Product[]> {
//   const res = await apiClient.get<ProductListResponse>("/products?fields=*variants.calculated_price&region_id=reg_01K1VCRS7MVGP61R0Z1GD0V8FQ");
//   return res.data.products;
// }

export async function getAllProducts(categoryIds?: string[]): Promise<Product[]> {
  let url = "/products?fields=title,images,thumbnail,subtitle,variants.id,variants.calculated_price,des";
  url += "&region_id=reg_01K1VCRS7MVGP61R0Z1GD0V8FQ";

  if (categoryIds && categoryIds.length > 0) {
    for (const id of categoryIds) {
      url += `&category_id=${encodeURIComponent(id)}`;
    }
  }

  const res = await apiClient.get<ProductListResponse>(url);
  return res.data.products;
}




export async function getProductById(id: string) {
  const res = await apiClient.get<GetProductResponse>(`/products/${id}?fields=*variants.calculated_price&region_id=reg_01K1VCRS7MVGP61R0Z1GD0V8FQ`);
  return res.data.product;
}

export async function getAllCategories(): Promise<ProductCategory[]> {
  const res = await apiClient.get<ProductCategoryResponse>("/product-categories");
  return res.data.product_categories;
}

export async function getCartById(id: string): Promise<CartResponse["cart"]> {
  const res = await apiClient.get<CartResponse>(`/carts/${id}`);
  return res.data.cart;
}

export async function getOrderById(id: string): Promise<OrderResponse> {
  const res = await apiClient.get<OrderResponse>(`orders/${id}?fields=id,status,total,created_at,email,items,billing_address.id,billing_address.first_name,billing_address.last_name,billing_address.address_1,billing_address.city,billing_address.country_code`);
  return res.data;
}


export async function createCart(): Promise<string> {
  const res = await apiClient.post<CartResponse>("/carts", {
    region_id: "reg_01K1VCRS7MVGP61R0Z1GD0V8FQ",
  });
  return res.data.cart.id;
}

export async function addItemToCart(id: string, orderDetails: OrderDetails): Promise<CartResponse["cart"]> {
  console.log("Body request gửi lên Medusa:", orderDetails);
  const res = await apiClient.post<CartResponse>(`/carts/${id}/line-items`, orderDetails);
  return res.data.cart;
}

export async function increaseItemQuantity(cartId: string, lineItemId: string, currentQuantity: number): Promise<CartResponse["cart"]> {
  const newQuantity = currentQuantity + 1;
  const res = await apiClient.post<CartResponse>(
    `/carts/${cartId}/line-items/${lineItemId}`,
    { quantity: newQuantity }
  );
  return res.data.cart;
}

export async function decreaseItemQuantity(cartId: string, lineItemId: string, currentQuantity: number): Promise<CartResponse["cart"]> {
  const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
  const res = await apiClient.post<CartResponse>(
    `/carts/${cartId}/line-items/${lineItemId}`,
    { quantity: newQuantity }
  );
  return res.data.cart;
}

export async function removeItemFromCart(cartId: string, lineItemId: string): Promise<CartResponse["cart"]> {
  const res = await apiClient.delete<CartResponse>(
    `/carts/${cartId}/line-items/${lineItemId}`
  );
  return res.data.cart;
}

export async function updateCartShippingAddress(cartId: string, address: Partial<Address>): Promise<CartResponse["cart"]> {
  const res = await apiClient.post<CartResponse>(`/carts/${cartId}`, {
    shipping_address: address,
  });
  console.log("Response from updateCartShippingAddress:", res.data);
  return res.data.cart;
}

export async function updateCartBillingAddress(cartId: string, address: Partial<Address>): Promise<CartResponse["cart"]> {
  const res = await apiClient.post<CartResponse>(`/carts/${cartId}`, {
    billing_address: address,
  });
  console.log("Response from updateCartBillingAddress:", res.data);
  return res.data.cart;
}

export async function createOrder(cartId: string): Promise<CartResponse["cart"]> {
  const res = await apiClient.post<CartResponse>(`/carts/${cartId}/complete`, {});
  return res.data.cart;
}

export async function updateCartCustomerInfo(cartId: string, payload: {
  email: string;
  shipping_address: Partial<Address>;
  billing_address: Partial<Address>;
}): Promise<CartResponse["cart"]> {
  console.log("Payload for updating cart with customer info:", payload);
  const res = await apiClient.post<CartResponse>(`/carts/${cartId}`, payload);
  console.log("Updated cart with customer info:", res.data);
  return res.data.cart;
}
