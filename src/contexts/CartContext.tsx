"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCartById, createCart } from "@/lib/api";
import { LineItem, CartResponse } from "@/types/carts";

interface CartContextType {
  cartItems: LineItem[];
  cartData: CartResponse["cart"] | null;
  /** Totals lấy trực tiếp từ backend để UI hiển thị, tránh tự tính tay */
  cartTotals: {
    subtotal: number;
    shipping_total: number;
    discount_total: number;
    tax_total: number;
    total: number;
  } | null;
  totalItems: number;
  isLoading: boolean;
  cartId: string | null;
  refreshCart: () => Promise<void>;
  updateCartItems: (newItems: LineItem[]) => void;
  addItemToLocalCart: (item: LineItem) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const [cartData, setCartData] = useState<CartResponse["cart"] | null>(null);
  const [cartTotals, setCartTotals] = useState<CartContextType["cartTotals"]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const refreshCart = async () => {
  let storedCartId = localStorage.getItem("cart");

  if (!storedCartId) {
    try {
      storedCartId = await createCart();
      localStorage.setItem("cart", storedCartId);
      setCartId(storedCartId);
    } catch (error) {
      console.error("Lỗi khi tạo giỏ hàng:", error);
      setCartItems([]);
      setCartData(null);
      setCartTotals(null);
      setCartId(null);
      return;
    }
  }

  setIsLoading(true);
  try {
    // getCartById có thể trả về { cart: Cart } hoặc Cart
    const resp = (await getCartById(storedCartId)) as unknown;

    // Hợp nhất 2 shape:
    const cart =
      (resp as any)?.cart !== undefined
        ? (resp as any).cart // dạng CartResponse
        : (resp as any);     // dạng Cart

    // Kiểm tra sơ bộ để tránh crash
    if (!cart || typeof cart !== "object") {
      throw new Error("getCartById trả về dữ liệu không hợp lệ");
    }

    // ✅ Lưu đúng đối tượng Cart
    setCartData(cart);
    setCartItems(cart.items || []);
    setCartId(storedCartId);

    // ✅ Totals lấy từ backend (tránh tự tính tay)
    setCartTotals({
      subtotal: cart.subtotal ?? 0,
      shipping_total: cart.shipping_total ?? 0,
      discount_total: cart.discount_total ?? 0,
      tax_total: cart.tax_total ?? 0,
      total: cart.total ?? 0,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("CartContext REFRESH totals from API:", {
        subtotal: cart.subtotal,
        shipping_total: cart.shipping_total,
        discount_total: cart.discount_total,
        tax_total: cart.tax_total,
        total: cart.total,
      });
    }
  } catch (err: any) {
    console.error("Lỗi khi lấy giỏ hàng:", err);
    setCartItems([]);
    setCartData(null);
    setCartTotals(null);
    setCartId(null);
  } finally {
    setIsLoading(false);
  }
};


  const updateCartItems = (newItems: LineItem[]) => {
    setCartItems(newItems);
  };

  const addItemToLocalCart = async (item: LineItem) => {
    let currentCartId = cartId;
    if (!currentCartId) {
      try {
        currentCartId = await createCart();
        localStorage.setItem("cart", currentCartId);
        setCartId(currentCartId);
      } catch (error) {
        console.error("Lỗi khi tạo giỏ hàng:", error);
        return;
      }
    }

    setCartItems((prevItems) => {
      const idx = prevItems.findIndex((p) => p.variant_id === item.variant_id);
      if (idx >= 0) {
        const updated = [...prevItems];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + item.quantity,
        };
        return updated;
      }
      return [...prevItems, item];
    });
  };

  useEffect(() => {
    const storedCartId = localStorage.getItem("cart");
    if (storedCartId) {
      setCartId(storedCartId);
      refreshCart();
    }
  }, []);

  const value: CartContextType = {
    cartItems,
    cartData,
    cartTotals,
    totalItems,
    isLoading,
    cartId,
    refreshCart,
    updateCartItems,
    addItemToLocalCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
