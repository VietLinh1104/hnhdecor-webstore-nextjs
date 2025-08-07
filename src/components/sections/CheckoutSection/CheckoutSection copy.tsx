"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Phone, User, Mail, CreditCard, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderSummary, ShippingInfo, CartItem } from "@/types/carts";
import { LineItem } from "@/types/carts";
import { useCart } from "@/contexts/CartContext";
import { updateCartCustomerInfo } from "@/lib/api";
import { toast } from "react-toastify";
import Link from "next/link";
import { sdk } from "@/lib/medusa";
import { useSearchParams } from "next/navigation";

export const CheckoutSection = (): JSX.Element => {
  const { cartItems, totalItems, cartId: contextCartId, isLoading, refreshCart } = useCart();
  const searchParams = useSearchParams();
  
  // Get cartId from URL params if it exists, otherwise use context cartId
  const urlCartId = searchParams.get('cartId');
  const cartId = urlCartId || contextCartId;

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    ward: "",
    province: "",
    note: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [paymentMethod] = useState("COD"); // Chỉ hỗ trợ COD
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  // If we have a cartId from URL but no cart items in context, you might want to fetch the cart
  useEffect(() => {
    if (urlCartId && urlCartId !== contextCartId) {
      // Optional: You might want to fetch cart data here if using URL cartId
      console.log('Using cartId from URL:', urlCartId);
    }
  }, [urlCartId, contextCartId]);

  // Mapping LineItem sang CartItem
  const mappedCartItems: CartItem[] = cartItems.map((item: LineItem) => ({
    id: item.id,
    name: item.title,
    image: item.thumbnail || "/placeholder-image.png",
    price: item.unit_price,
    originalPrice: item.compare_at_unit_price,
    quantity: item.quantity,
    color: item.metadata?.color || "#000",
    colorName: item.metadata?.colorName || item.variant_title || "Không xác định",
    sku: item.metadata?.sku || item.variant_id,
    variant_title: item.variant_title,
  }));

  const formatVND = (value: number): string =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Tính toán giá trị đơn hàng
  const orderSummary: OrderSummary = {
    subtotal: mappedCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    shippingFee: mappedCartItems.length > 0 ? 30000 : 0, // Phí ship cố định nếu có sản phẩm
    discount: 50000, // Mock discount, integrate with cart.promotions later
    total: 0,
  };
  orderSummary.total = orderSummary.subtotal + orderSummary.shippingFee - orderSummary.discount;

  // Email validation function
  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Xử lý thay đổi input
  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate email on change
    if (field === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Vui lòng nhập địa chỉ email hợp lệ");
      } else {
        setEmailError("");
      }
    }
  };

  // Kiểm tra form hợp lệ
  const isFormValid = () => {
    const requiredFields: (keyof ShippingInfo)[] = [
      "fullName",
      "phone",
      "address",
      "ward",
      "province",
    ];
    
    const requiredFieldsValid = requiredFields.every((field) => shippingInfo[field].trim() !== "");
    const emailValid = !shippingInfo.email || validateEmail(shippingInfo.email);
    
    return requiredFieldsValid && emailValid && agreeTerms && mappedCartItems.length > 0;
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    // Validate email before proceeding
    if (shippingInfo.email && !validateEmail(shippingInfo.email)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ!");
      return;
    }

    if (!isFormValid()) {
      toast.error("Vui lòng điền đầy đủ thông tin, đồng ý với điều khoản và đảm bảo giỏ hàng không trống!");
      return;
    }

    if (!cartId) {
      toast.error("Không tìm thấy giỏ hàng. Vui lòng thử lại!");
      return;
    }

    setIsSubmitting(true);

    try {
      const firstName = shippingInfo.fullName.split(" ").slice(0, -1).join(" ") || "Unknown";
      const lastName = shippingInfo.fullName.split(" ").slice(-1)[0] || "Unknown";

      const address = {
        first_name: firstName,
        last_name: lastName,
        address_1: shippingInfo.address,
        city: shippingInfo.ward,
        postal_code: "700000",
        phone: shippingInfo.phone,
        country_code: "vn",
      };

      // ✅ Cập nhật thông tin khách hàng
      await updateCartCustomerInfo(cartId, {
        email: shippingInfo.email || "guest@example.com",
        shipping_address: address,
        billing_address: address,
      });

      const { cart } = await sdk.store.cart.retrieve(cartId);

      sdk.auth.login("user", "emailpass", {
        email: "linhtx2004@gmail.com",
        password: "Ltx622004$01",
      }).then(() => {
        // Sau khi đăng nhập thành công, các request admin sẽ tự động được xác thực
        sdk.admin.shippingOption.list().then(({ shipping_options }) => {
          console.log(shipping_options);
        });
      });

      sdk.store.cart.addShippingMethod(cartId, {
        option_id: "so_01K1ZVNQATP2FQQ55EP3ESXJP0",
      }).then(({ cart }) => {
        console.log("ship: " + cart);
      });

      // ✅ Hoàn tất đơn hàng bằng SDK
      await sdk.store.payment.initiatePaymentSession(cart, {
        provider_id: "pp_system_default", // Manual System Payment Provider
      });

      sdk.admin.shippingOption.list().then(({ shipping_options }) => {
        console.log(shipping_options);
      });

      sdk.store.cart.complete(cartId).then((data) => {
        if (data.type === "cart") {
          alert(data.error.message);
          // Xử lý lỗi nếu có
        } else {
          localStorage.setItem("orderId", data.order.id);
          console.log("Mã đơn hàng:", data.order.id);
          // Đơn hàng đã được tạo thành công
          refreshCart();
          localStorage.removeItem("cart");
          window.location.href = "/order-success";
        }
      });
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thông tin thanh toán</h1>
      
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
          <p>Cart ID from URL: {urlCartId || 'None'}</p>
          <p>Cart ID from Context: {contextCartId || 'None'}</p>
          <p>Using Cart ID: {cartId || 'None'}</p>
        </div>
      )}

      {mappedCartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Truck size={48} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục thanh toán!</p>
          <Link href="/product-list" passHref>
            <Button className="bg-[#ec720e] hover:bg-orange-700">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      ) : (
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
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full"
                      disabled={isLoading || isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Nhập số điện thoại"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full"
                      disabled={isLoading || isSubmitting}
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
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full ${emailError ? 'border-red-500' : ''}`}
                      disabled={isLoading || isSubmitting}
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tỉnh/Thành phố <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Chọn tỉnh/thành phố"
                        value={shippingInfo.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                        className="w-full"
                        disabled={isLoading || isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phường/Xã <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Chọn phường/xã"
                        value={shippingInfo.ward}
                        onChange={(e) => handleInputChange("ward", e.target.value)}
                        className="w-full"
                        disabled={isLoading || isSubmitting}
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
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full"
                      disabled={isLoading || isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ghi chú (tùy chọn)
                    </label>
                    <textarea
                      placeholder="Ghi chú thêm cho đơn hàng..."
                      value={shippingInfo.note}
                      onChange={(e) => handleInputChange("note", e.target.value)}
                      className="w-full p-3 border rounded-md resize-none h-20"
                      disabled={isLoading || isSubmitting}
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
                  {mappedCartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        {item.variant_title && (
                          <div className="text-xs text-gray-500 mt-1">Phân loại: {item.variant_title}</div>
                        )}
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
                  <span>{orderSummary.shippingFee === 0 ? "Miễn phí" : formatVND(orderSummary.shippingFee)}</span>
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
                    disabled={isLoading || isSubmitting}
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
                disabled={!isFormValid() || isSubmitting || isLoading}
                className="w-full bg-[#ec720e] hover:bg-orange-700 text-white py-3 text-lg font-medium disabled:opacity-50"
                size="lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang xử lý...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    Xác nhận đặt hàng
                  </div>
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
      )}
    </section>
  );
};