"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCartById, createCart } from "@/lib/api";
import { LineItem, CartResponse } from "@/types/carts";

interface CartContextType {
  cartItems: LineItem[];
  
  cartData: CartResponse["cart"] | null;
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
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  // Tính tổng số lượng sản phẩm
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Hàm refresh cart từ API
  const refreshCart = async () => {
    let storedCartId = localStorage.getItem("cart");

    if (!storedCartId) {
      console.log("Chưa có cart trong localStorage, tạo mới...");
      try {
        storedCartId = await createCart();
        localStorage.setItem("cart", storedCartId);
        setCartId(storedCartId);
      } catch (error) {
        console.error("Lỗi khi tạo giỏ hàng:", error);
        setCartItems([]);
        setCartData(null);
        setCartId(null);
        return;
      }
    }

    setIsLoading(true);
    try {
      const data = await getCartById(storedCartId);
      setCartData(data);
      setCartItems(data.items || []);
      setCartId(storedCartId);
    } catch (err: any) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
      setCartItems([]);
      setCartData(null);
      setCartId(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm cập nhật cart items từ bên ngoài
  const updateCartItems = (newItems: LineItem[]) => {
    setCartItems(newItems);
  };

  // Hàm thêm item vào local cart (optimistic update)
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

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        prevItem => prevItem.variant_id === item.variant_id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        return updatedItems;
      } else {
        return [...prevItems, item];
      }
    });
  };

  // Load cart khi component mount
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
    totalItems,
    isLoading,
    cartId,
    refreshCart,
    updateCartItems,
    addItemToLocalCart,
  };

  return React.createElement(
    CartContext.Provider,
    { value },
    children
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};