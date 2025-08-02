"use client";

import React from "react";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CreditCard,
  ArrowRight,
  Home,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CartItem } from "@/types";

// Mock data đơn hàng (thường sẽ được truyền từ props hoặc API)
const mockOrderData = {
  orderNumber: "DH2025080200123",
  orderDate: "02/08/2025 14:30",
  estimatedDelivery: "05/08/2025 - 07/08/2025",
  status: "confirmed",
  customer: {
    name: "Nguyễn Văn Nam",
    phone: "0901234567",
    email: "nguyenvannam@email.com",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
  },
  items: [
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
  ] as CartItem[],
  summary: {
    subtotal: 62400000,
    shippingFee: 0,
    discount: 50000,
    total: 62350000
  },
  paymentMethod: "COD",
  appliedVoucher: "GIAM50K"
};

const orderStatuses = [
  {
    status: "confirmed",
    label: "Xác nhận đơn hàng",
    icon: CheckCircle,
    completed: true,
    time: "14:30 - 02/08/2025"
  },
  {
    status: "processing",
    label: "Đang chuẩn bị",
    icon: Package,
    completed: false,
    time: "Dự kiến: 03/08/2025"
  },
  {
    status: "shipping",
    label: "Đang giao hàng",
    icon: Truck,
    completed: false,
    time: "Dự kiến: 05/08/2025"
  },
  {
    status: "delivered",
    label: "Đã giao hàng",
    icon: CheckCircle,
    completed: false,
    time: "Dự kiến: 05-07/08/2025"
  }
];

export const OrderSuccessSection = (): JSX.Element => {
  const formatVND = (value: number): string =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const totalItems = mockOrderData.items.reduce((total, item) => total + item.quantity, 0);

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(mockOrderData.orderNumber);
    alert("Đã sao chép mã đơn hàng!");
  };

  const handleCallSupport = () => {
    window.open("tel:19001234", "_self");
  };

  const handleEmailSupport = () => {
    window.open("mailto:support@furniture.com", "_self");
  };

  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4 py-8">
      
      {/* SUCCESS HEADER */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Đặt hàng thành công!</h1>
        <p className="text-gray-600 text-lg">
          Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng chúng tôi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: ORDER DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Thông tin đơn hàng */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-800 hover:text-white border-green-200">
                Đã xác nhận
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-semibold">{mockOrderData.orderNumber}</p>
                      <button
                        onClick={handleCopyOrderNumber}
                        className="text-[#ec720e] hover:text-orange-700 text-sm"
                      >
                        Sao chép
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày đặt hàng</p>
                    <p className="font-medium">{mockOrderData.orderDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Dự kiến giao hàng</p>
                    <p className="font-medium text-green-600">{mockOrderData.estimatedDelivery}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phương thức thanh toán</p>
                    <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Trạng thái đơn hàng */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Trạng thái đơn hàng</h2>
            
            <div className="space-y-6">
              {orderStatuses.map((status, index) => {
                const IconComponent = status.icon;
                const isLast = index === orderStatuses.length - 1;
                
                return (
                  <div key={status.status} className="flex items-start gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        status.completed 
                          ? "bg-green-100 text-green-600" 
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <IconComponent size={20} />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 h-12 mt-2 ${
                          status.completed ? "bg-green-200" : "bg-gray-200"
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${
                          status.completed ? "text-green-600" : "text-gray-500"
                        }`}>
                          {status.label}
                        </h3>
                        <span className="text-sm text-gray-500">{status.time}</span>
                      </div>
                      {status.status === "confirmed" && (
                        <p className="text-sm text-gray-600 mt-1">
                          Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Thông tin giao hàng */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Thông tin giao hàng
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">{mockOrderData.customer.name}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Phone size={14} />
                  {mockOrderData.customer.phone}
                </p>
                {mockOrderData.customer.email && (
                  <p className="flex items-center gap-2">
                    <Mail size={14} />
                    {mockOrderData.customer.email}
                  </p>
                )}
                <p className="flex items-start gap-2 mt-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  {mockOrderData.customer.address}
                </p>
              </div>
            </div>
          </Card>

          {/* Sản phẩm đã đặt */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Sản phẩm đã đặt ({totalItems} sản phẩm)
            </h2>
            
            <div className="space-y-4">
              {mockOrderData.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.colorName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-red-600">
                          {formatVND(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-gray-400 line-through text-sm">
                            {formatVND(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">x{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: ORDER SUMMARY & ACTIONS */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            
            {/* Tóm tắt đơn hàng */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatVND(mockOrderData.summary.subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-600">
                    {mockOrderData.summary.shippingFee === 0 ? "Miễn phí" : formatVND(mockOrderData.summary.shippingFee)}
                  </span>
                </div>

                {mockOrderData.summary.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá ({mockOrderData.appliedVoucher})</span>
                    <span>-{formatVND(mockOrderData.summary.discount)}</span>
                  </div>
                )}

                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng</span>
                  <span className="text-red-600">{formatVND(mockOrderData.summary.total)}</span>
                </div>
              </div>

              <Badge className="w-full justify-center py-2 bg-orange-100 text-orange-800 hover:bg-orange-800 hover:text-white border-orange-200">
                Thanh toán khi nhận hàng
              </Badge>
            </Card>

            {/* Hành động */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Bước tiếp theo</h2>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#ec720e] hover:bg-orange-700"
                  onClick={() => window.location.href = '/'}
                >
                  <Home size={16} className="mr-2" />
                  Tiếp tục mua sắm
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/orders'}
                >
                  <Package size={16} className="mr-2" />
                  Theo dõi đơn hàng
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.print()}
                >
                  <FileText size={16} className="mr-2" />
                  In hóa đơn
                </Button>
              </div>
            </Card>

            {/* Hỗ trợ khách hàng */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Cần hỗ trợ?</h2>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleCallSupport}
                >
                  <Phone size={16} className="mr-2" />
                  Gọi hotline: 1900 1234
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleEmailSupport}
                >
                  <Mail size={16} className="mr-2" />
                  Email: support@furniture.com
                </Button>
              </div>
              
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>• Hỗ trợ khách hàng 24/7</p>
                <p>• Đổi trả miễn phí trong 30 ngày</p>
                <p>• Bảo hành chính hãng</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};