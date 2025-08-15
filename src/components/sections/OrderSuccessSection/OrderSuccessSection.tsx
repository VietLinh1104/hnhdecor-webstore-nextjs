"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  CreditCard,
  Home,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/order";
import { getOrderById } from "@/lib/api";

const orderStatuses = [
  {
    status: "confirmed",
    label: "Xác nhận đơn hàng",
    icon: CheckCircle,
    time: "Đang xử lý",
  },
  {
    status: "processing",
    label: "Đang chuẩn bị",
    icon: Package,
    time: "Dự kiến: 1-2 ngày",
  },
  {
    status: "shipping",
    label: "Đang giao hàng",
    icon: Truck,
    time: "Dự kiến: 2-4 ngày",
  },
  {
    status: "delivered",
    label: "Đã giao hàng",
    icon: CheckCircle,
    time: "Tùy theo khu vực",
  },
];

export const OrderSuccessSection = (): JSX.Element => {
  const [orderData, setOrderData] = useState<Order | null>(null);

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    if (!orderId) return;

    getOrderById(orderId).then((res) => {
      setOrderData(res.order);
    });
  }, []);

  if (!orderData) {
    return (
      <section className="py-20 text-center text-gray-500">
        Đang tải thông tin đơn hàng...
      </section>
    );
  }

  const formatVND = (value: number): string =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const totalItems = orderData.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.id);
    alert("Đã sao chép mã đơn hàng!");
  };

  const handleCallSupport = () => {
    window.open("tel:033 7008360", "_self");
    // console.log(orderData);
  };

  const handleEmailSupport = () => {
    window.open("mailto:contact@hnhdecor.com", "_self");
  };

  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Đặt hàng thành công!
        </h1>
        <p className="text-gray-600 text-lg">
          Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng chúng tôi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Thông tin đơn hàng */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {orderData.status === "confirmed"
                  ? "Đã xác nhận"
                  : orderData.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-semibold">{orderData.id}</p>
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
                    <p className="font-medium">
                      {new Date(orderData.created_at!).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Dự kiến giao hàng</p>
                    <p className="font-medium text-green-600">
                      Tùy khu vực (2-5 ngày)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Phương thức thanh toán
                    </p>
                    <p className="font-medium">
                      {orderData.payment_collections[0]?.status !==
                      "authorized"
                        ? "Đã thanh toán"
                        : "Thanh toán khi nhận hàng (COD)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Trạng thái */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Trạng thái đơn hàng</h2>
            <div className="space-y-6">
              {orderStatuses.map((status, index) => {
                const Icon = status.icon;
                const isDone =
                  index <=
                  orderStatuses.findIndex((s) => s.status === orderData.status);
                const isLast = index === orderStatuses.length - 1;

                return (
                  <div key={status.status} className="flex items-start gap-4">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isDone
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      {!isLast && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${
                            isDone ? "bg-green-200" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-medium ${
                            isDone ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {status.label}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {status.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Giao hàng */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Thông tin giao hàng
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Khách hàng</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail size={14} />
                  {orderData.email}
                </p>
                <p className="flex items-start gap-2 mt-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  {orderData.billing_address.address_1}
                </p>
              </div>
            </div>
          </Card>

          {/* Sản phẩm */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Sản phẩm đã đặt ({totalItems} sản phẩm)
            </h2>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      SKU: {item.variant_sku}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-red-600">
                          {formatVND(item.unit_price)}
                        </span>
                        {item.compare_at_unit_price &&
                          item.compare_at_unit_price > item.unit_price && (
                            <span className="text-gray-400 line-through text-sm">
                              {formatVND(item.compare_at_unit_price)}
                            </span>
                          )}
                      </div>
                      <span className="text-sm text-gray-500">
                        x{item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: Tổng kết */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatVND(orderData.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="text-green-600">Báo khi giao hàng</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng</span>
                <span className="text-red-600">
                  {formatVND(orderData.total)}
                </span>
              </div>
            </div>
            <Badge className="w-full justify-center py-2 bg-orange-100 text-orange-800 border-orange-200">
              {orderData.payment_collections[0]?.status === "authorized"
                ? "Đã thanh toán"
                : "Thanh toán khi nhận hàng"}
            </Badge>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Bước tiếp theo</h2>
            <div className="space-y-3">
              <Button
                className="w-full bg-[#ec720e] hover:bg-orange-700"
                onClick={() => (window.location.href = "/")}
              >
                <Home size={16} className="mr-2" />
                Tiếp tục mua sắm
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

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Cần hỗ trợ?</h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleCallSupport}
              >
                <Phone size={16} className="mr-2" />
                Gọi hotline: 033 7008360
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleEmailSupport}
              >
                <Mail size={16} className="mr-2" />
                Email: contact@hnhdecor.com
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
    </section>
  );
};
