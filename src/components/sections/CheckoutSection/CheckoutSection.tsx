"use client";

import React, { useState } from "react";
import { MapPin, Phone, User, Mail, CreditCard, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderSummary, ShippingInfo } from "@/types"; // ✅ Import interface đúng cách

import { CartItem } from "@/types";
import Link from "next/link";

// Mock data từ cart (thường sẽ được truyền từ context hoặc props)
const mockOrderItems: CartItem[] = [
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
  }
];

export const CheckoutSection = (): JSX.Element => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    province: "",
    note: ""
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [paymentMethod] = useState("COD"); // Chỉ hỗ trợ COD
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatVND = (value: number): string =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Tính toán giá trị đơn hàng
  const orderSummary: OrderSummary = {
    subtotal: mockOrderItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    shippingFee: 30000, // Phí ship cố định hoặc có thể tính theo logic
    discount: 50000, // Giảm giá đã áp dụng
    total: 0
  };
  orderSummary.total = orderSummary.subtotal + orderSummary.shippingFee - orderSummary.discount;

  const totalItems = mockOrderItems.reduce((total, item) => total + item.quantity, 0);

  // Xử lý thay đổi input
  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Kiểm tra form hợp lệ
  const isFormValid = () => {
    const requiredFields: (keyof ShippingInfo)[] = ['fullName', 'phone', 'address', 'ward', 'district', 'province'];
    return requiredFields.every(field => shippingInfo[field].trim() !== '') && agreeTerms;
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      alert("Vui lòng điền đầy đủ thông tin và đồng ý với điều khoản!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Thành công
      alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.");
      
      // Redirect hoặc reset form
      // router.push('/order-success');
      
    } catch (error) {
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thông tin thanh toán</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: SHIPPING INFORMATION */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg">
            
            {/* Thông tin liên hệ */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User size={20} />
                Thông tin liên hệ
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nhập họ và tên"
                    value={shippingInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nhập số điện thoại"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Email (tùy chọn)
                  </label>
                  <Input
                    type="email"
                    placeholder="Nhập email để nhận thông báo"
                    value={shippingInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Địa chỉ giao hàng */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Địa chỉ giao hàng
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Chọn tỉnh/thành phố"
                      value={shippingInfo.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Chọn quận/huyện"
                      value={shippingInfo.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phường/Xã <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Chọn phường/xã"
                      value={shippingInfo.ward}
                      onChange={(e) => handleInputChange('ward', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Địa chỉ cụ thể <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nhập số nhà, tên đường..."
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ghi chú (tùy chọn)
                  </label>
                  <textarea
                    placeholder="Ghi chú thêm cho đơn hàng..."
                    value={shippingInfo.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    className="w-full p-3 border rounded-md resize-none h-20"
                  />
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard size={20} />
                Phương thức thanh toán
              </h2>
              
              <div className="p-4 border-2 border-[#ec720e] rounded-lg bg-orange-50">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ec720e] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <Truck size={20} className="text-[#ec720e]" />
                  <div>
                    <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-gray-600">Bạn chỉ phải thanh toán khi nhận được hàng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
            
            {/* Sản phẩm trong đơn */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Sản phẩm ({totalItems} sản phẩm)</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {mockOrderItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div 
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-500">{item.colorName}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm font-medium text-red-600">
                          {formatVND(item.price)}
                        </span>
                        <span className="text-xs text-gray-500">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tóm tắt giá */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatVND(orderSummary.subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatVND(orderSummary.shippingFee)}</span>
              </div>

              {orderSummary.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span>-{formatVND(orderSummary.discount)}</span>
                </div>
              )}

              <hr />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng</span>
                <span className="text-red-600">{formatVND(orderSummary.total)}</span>
              </div>
            </div>

            {/* Điều khoản */}
            <div className="mb-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                  Tôi đã đọc và đồng ý với{" "}
                  <a href="#" className="text-[#ec720e] hover:underline">
                    Điều khoản và Điều kiện
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-[#ec720e] hover:underline">
                    Chính sách Bảo mật
                  </a>{" "}
                  của cửa hàng.
                </label>
              </div>
            </div>

            {/* Nút đặt hàng */}
            <Button 
              onClick={handlePlaceOrder}
              disabled={!isFormValid() || isSubmitting}
              className="w-full bg-[#ec720e] hover:bg-orange-700 text-white py-3 text-lg font-medium disabled:opacity-50"
              size="lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang xử lý...
                </div>
              ) : (
                <Link href="/order-success">

                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    Xác nhận đặt hàng
                  </div>
                </Link>
              )}
            </Button>

            {/* Thông tin bổ sung */}
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>• Đơn hàng sẽ được xác nhận trong 24h</p>
              <p>• Miễn phí đổi trả trong 30 ngày</p>
              <p>• Hỗ trợ khách hàng 24/7</p>
              <p>• Bảo hành chính hãng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};