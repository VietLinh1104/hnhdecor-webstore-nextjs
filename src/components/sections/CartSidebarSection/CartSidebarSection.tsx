"use client";

import React from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { LineItem } from "@/types/carts";

export interface CartSidebarSectionProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: LineItem[];
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onRemoveItem: (id: string) => void;
  isLoading?: boolean;
}

export const CartSidebarSection = ({
  isOpen,
  onClose,
  cartItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  isLoading,
}: CartSidebarSectionProps): JSX.Element => {
  const router = useRouter();
  
  const formatVND = (value: number): string =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Tính tổng tiền giỏ hàng
  const totalAmount = cartItems.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Hàm chuyển đến trang checkout
  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  // Hàm chuyển đến trang giỏ hàng chi tiết
  const handleViewCart = () => {
    onClose();
    router.push('/cart');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">Giỏ hàng ({totalItems})</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">
              <img 
                src="/icon-cart-1.png" 
                alt="Empty cart"
                className="w-16 h-16 mx-auto mb-4 opacity-30"
              />
              <p className="text-lg">Giỏ hàng trống</p>
              <p className="text-sm mt-2">Hãy thêm sản phẩm vào giỏ hàng!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                item.id ? (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-sm font-medium line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      
                      {item.variant_title && (
                        <div className="text-xs text-gray-500 mb-1">
                          Phân loại: {item.variant_title}
                        </div>
                      )}

                      {/* Giá tiền */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">
                          <span className="text-red-600 font-medium">
                            {formatVND(item.unit_price)}
                          </span>
                          {item.compare_at_unit_price && (
                            <div className="text-gray-400 line-through text-xs">
                              {formatVND(item.compare_at_unit_price)}
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          disabled={isLoading}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Điều chỉnh số lượng */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecreaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100 transition-colors"
                          disabled={isLoading}
                        >
                          <Minus size={12} />
                        </button>
                        
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => onIncreaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100 transition-colors"
                          disabled={isLoading}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Tổng cộng:</span>
              <span className="font-bold text-red-600">
                {formatVND(totalAmount)}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-5">
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#ec720e] text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  disabled={isLoading}
                >
                  Thanh toán ngay
                </button>
                <button 
                  onClick={handleViewCart}
                  className="w-full border border-[#ec720e] text-[#ec720e] py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium"
                  disabled={isLoading}
                >
                  Xem giỏ hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};