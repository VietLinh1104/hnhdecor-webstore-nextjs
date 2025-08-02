"use client";

import React, { useState } from "react";
import { Plus, Minus, Trash2, Tag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Types
interface CartItem {
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

interface Voucher {
  code: string;
  title: string;
  discount: number;
  minOrder: number;
  type: "percent" | "fixed";
  isAvailable: boolean;
}

// Mock data
const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Sofa Băng Phòng Khách Truyền Thống QP115",
    image: "/melaniecanape3placesgirsclaire-4-13.png",
    price: 31200000,
    originalPrice: 62400000,
    quantity: 1,
    color: "#d4d4d4",
    colorName: "Xám nhạt",
    sku: "SFO011"
  },
  {
    id: 2,
    name: "Ghế Armchair Hiện Đại AC220",
    image: "/melaniecanape3placesgirsclaire-1-5.png",
    price: 15600000,
    originalPrice: 26000000,
    quantity: 2,
    color: "#333",
    colorName: "Đen",
    sku: "ARM220"
  },
  {
    id: 3,
    name: "Bàn Coffee Table Gỗ Tự Nhiên CT150",
    image: "/melaniecanape3placesgirsclaire-1-10.png",
    price: 8500000,
    originalPrice: 12000000,
    quantity: 1,
    color: "#966",
    colorName: "Nâu gỗ",
    sku: "CTB150"
  }
];

const availableVouchers: Voucher[] = [
  {
    code: "EGAFREESHIP",
    title: "Miễn phí vận chuyển",
    discount: 0,
    minOrder: 500000,
    type: "fixed",
    isAvailable: true
  },
  {
    code: "GIAM50K", 
    title: "Giảm 50.000đ cho đơn từ 1 triệu",
    discount: 50000,
    minOrder: 1000000,
    type: "fixed",
    isAvailable: true
  },
  {
    code: "GIAM30",
    title: "Giảm 30% tối đa 500.000đ",
    discount: 30,
    minOrder: 2000000,
    type: "percent",
    isAvailable: true
  },
  {
    code: "NEWUSER20",
    title: "Giảm 20% cho khách hàng mới",
    discount: 20,
    minOrder: 500000,
    type: "percent",
    isAvailable: false
  }
];

export const CartSection = (): JSX.Element => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Voucher | null>(null);
  const [showVouchers, setShowVouchers] = useState(false);

  const formatVND = (value: number): string =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Tính toán giá trị
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const shippingFee = subtotal >= 500000 || appliedCoupon?.code === "EGAFREESHIP" ? 0 : 30000;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = Math.min((subtotal * appliedCoupon.discount) / 100, 500000);
    } else {
      discountAmount = appliedCoupon.discount;
    }
  }
  
  const finalTotal = subtotal + shippingFee - discountAmount;

  // Xử lý tăng số lượng
  const handleIncreaseQuantity = (id: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Xử lý giảm số lượng
  const handleDecreaseQuantity = (id: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // Xử lý xóa sản phẩm
  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Xử lý áp dụng mã giảm giá
  const handleApplyCoupon = () => {
    const voucher = availableVouchers.find(v => 
      v.code.toLowerCase() === couponCode.toLowerCase() && 
      v.isAvailable &&
      subtotal >= v.minOrder
    );
    
    if (voucher) {
      setAppliedCoupon(voucher);
      setCouponCode("");
    } else {
      alert("Mã giảm giá không hợp lệ hoặc không đủ điều kiện!");
    }
  };

  // Xử lý áp dụng voucher từ danh sách
  const handleApplyVoucher = (voucher: Voucher) => {
    if (voucher.isAvailable && subtotal >= voucher.minOrder) {
      setAppliedCoupon(voucher);
      setShowVouchers(false);
    }
  };

  // Xử lý xóa coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">Giỏ hàng ({totalItems} sản phẩm)</h1>
    
    {cartItems.length === 0 ? (
        <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Tag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
        <Button className="bg-[#ec720e] hover:bg-orange-700">
            Tiếp tục mua sắm
        </Button>
        </div>
    ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: CART ITEMS */}
        <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Sản phẩm trong giỏ</h2>
            </div>
            
            <div className="divide-y">
                {cartItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                    <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                        <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                        <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">{item.colorName}</span>
                        </div>

                        <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                            <span className="text-xl font-semibold text-red-600">
                                {formatVND(item.price)}
                            </span>
                            {item.originalPrice > item.price && (
                                <span className="text-gray-400 line-through">
                                {formatVND(item.originalPrice)}
                                </span>
                            )}
                            </div>
                            <p className="text-sm text-gray-500">
                            Tổng: {formatVND(item.price * item.quantity)}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleDecreaseQuantity(item.id)}
                                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 transition-colors"
                            >
                                <Minus size={16} />
                            </button>
                            
                            <span className="text-lg font-medium w-12 text-center">
                                {item.quantity}
                            </span>
                            
                            <button
                                onClick={() => handleIncreaseQuantity(item.id)}
                                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                            </div>

                            {/* Remove Button */}
                            <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                            title="Xóa sản phẩm"
                            >
                            <Trash2 size={20} />
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
            
            {/* Coupon Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Mã giảm giá</label>
                <div className="flex gap-2 mb-2">
                <Input
                    placeholder="Nhập mã giảm giá"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                />
                <Button 
                    onClick={handleApplyCoupon}
                    variant="outline"
                    disabled={!couponCode.trim()}
                >
                    Áp dụng
                </Button>
                </div>
                
                {/* Applied Coupon */}
                {appliedCoupon && (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg mb-2">
                    <div className="flex items-center gap-2">
                    <Gift size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                        {appliedCoupon.code}
                    </span>
                    </div>
                    <button
                    onClick={handleRemoveCoupon}
                    className="text-green-600 hover:text-green-800"
                    >
                    <Trash2 size={14} />
                    </button>
                </div>
                )}

                {/* Toggle Vouchers */}
                <button
                onClick={() => setShowVouchers(!showVouchers)}
                className="text-sm text-[#ec720e] hover:underline"
                >
                {showVouchers ? "Ẩn danh sách voucher" : "Xem voucher có sẵn"}
                </button>
            </div>

            {/* Available Vouchers */}
            {showVouchers && (
                <div className="mb-6">
                <h3 className="font-medium mb-3">Voucher có sẵn</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableVouchers.map((voucher) => {
                    const isEligible = subtotal >= voucher.minOrder;
                    const isApplied = appliedCoupon?.code === voucher.code;
                    
                    return (
                        <div
                        key={voucher.code}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            isEligible && voucher.isAvailable && !isApplied
                            ? "hover:bg-orange-50 border-orange-200"
                            : "opacity-50 cursor-not-allowed"
                        } ${isApplied ? "bg-green-50 border-green-200" : ""}`}
                        onClick={() => isEligible && voucher.isAvailable && !isApplied && handleApplyVoucher(voucher)}
                        >
                        <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline" className="text-xs">
                            {voucher.code}
                            </Badge>
                            {isApplied && (
                            <Badge className="bg-green-500 text-xs">Đã áp dụng</Badge>
                            )}
                        </div>
                        <p className="text-sm font-medium">{voucher.title}</p>
                        <p className="text-xs text-gray-500">
                            Đơn tối thiểu: {formatVND(voucher.minOrder)}
                        </p>
                        {!isEligible && (
                            <p className="text-xs text-red-500 mt-1">
                            Cần thêm {formatVND(voucher.minOrder - subtotal)}
                            </p>
                        )}
                        </div>
                    );
                    })}
                </div>
                </div>
            )}

            {/* Price Summary */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                <span>Tạm tính ({totalItems} sản phẩm)</span>
                <span>{formatVND(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className={shippingFee === 0 ? "text-green-600" : ""}>
                    {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                </span>
                </div>

                {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{formatVND(discountAmount)}</span>
                </div>
                )}

                <hr />
                
                <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng</span>
                <span className="text-red-600">{formatVND(finalTotal)}</span>
                </div>
            </div>

            {/* Checkout Button */}
            <Button 
                className="w-full bg-[#ec720e] hover:bg-orange-700 text-white py-3 text-lg font-medium"
                size="lg"
            >
                Proceed to Checkout
            </Button>

            {/* Additional Info */}
            <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>• Miễn phí vận chuyển với đơn từ 500.000đ</p>
                <p>• Đổi trả trong 30 ngày</p>
                <p>• Bảo hành chính hãng</p>
            </div>
            </div>
        </div>
        </div>
    )}
    </section>
  );
};