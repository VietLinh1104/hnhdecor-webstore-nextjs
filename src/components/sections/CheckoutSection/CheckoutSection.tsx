"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Phone, User, Mail, CreditCard, Truck, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ShippingInfo, CartItem, OrderSummary, LineItem } from "@/types/carts";
import { useCart } from "@/contexts/CartContext";
import { updateCartCustomerInfo } from "@/lib/api";
import { toast } from "react-toastify";
import Link from "next/link";
import { sdk } from "@/lib/medusa";
import { useSearchParams } from "next/navigation";
import { getProvinces, getWardsByProvince } from "@/lib/tinhthanh";
import { Province, Ward } from "@/types/tinhthanh";

// Custom Select Component
const Select: React.FC<{
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ value, onValueChange, placeholder, disabled, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-3 py-2 border rounded-md bg-white text-left ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"
        } ${isOpen ? "border-blue-500" : "border-gray-300"}`}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

const SelectItem: React.FC<{
  value: string;
  children: React.ReactNode;
  onSelect: (value: string) => void;
  onClose: () => void;
}> = ({ value, children, onSelect, onClose }) => {
  return (
    <div
      onClick={() => {
        onSelect(value);
        onClose();
      }}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
    >
      {children}
    </div>
  );
};

export const CheckoutSection = (): JSX.Element => {
  const { cartItems, totalItems, cartId: contextCartId, isLoading, refreshCart } = useCart();
  const searchParams = useSearchParams();
  const urlCartId = searchParams.get("cartId");
  const cartId = urlCartId || contextCartId;

  const [localCart, setLocalCart] = useState<any | null>(null);
  const [localCartLoading, setLocalCartLoading] = useState(false);

  // Address states
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingWards, setIsLoadingWards] = useState(false);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const [isWardOpen, setIsWardOpen] = useState(false);

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
  const [paymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Load provinces on mount
  useEffect(() => {
    const loadProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const response = await getProvinces();
        setProvinces(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh/thành:", error);
        toast.error("Không thể tải danh sách tỉnh/thành phố");
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, []);

  // Load wards when province changes
  useEffect(() => {
    if (selectedProvinceCode) {
      const loadWards = async () => {
        setIsLoadingWards(true);
        try {
          const response = await getWardsByProvince(selectedProvinceCode);
          setWards(response.data);
        } catch (error) {
          console.error("Lỗi khi tải danh sách phường/xã:", error);
          toast.error("Không thể tải danh sách phường/xã");
        } finally {
          setIsLoadingWards(false);
        }
      };

      loadWards();
    } else {
      setWards([]);
    }
  }, [selectedProvinceCode]);

  // Nếu dùng cartId từ URL, load cart
  useEffect(() => {
    if (urlCartId) {
      setLocalCartLoading(true);
      sdk.store.cart
        .retrieve(urlCartId)
        .then(({ cart }) => setLocalCart(cart))
        .catch((err) => {
          console.error("Lỗi lấy cart:", err);
          toast.error("Không tìm thấy giỏ hàng!");
        })
        .finally(() => setLocalCartLoading(false));
    }
  }, [urlCartId]);

  const effectiveCartItems: LineItem[] = urlCartId
    ? localCart?.items || []
    : cartItems;

  const effectiveTotalItems = effectiveCartItems.reduce((sum, i) => sum + i.quantity, 0);

  const mappedCartItems: CartItem[] = effectiveCartItems.map((item: LineItem) => ({
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

  const orderSummary: OrderSummary = {
    subtotal: mappedCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    shippingFee: mappedCartItems.length > 0 ? 30000 : 0,
    discount: 0,
    total: 0,
  };
  orderSummary.total = orderSummary.subtotal + orderSummary.shippingFee - orderSummary.discount;

  const validateEmail = (email: string): boolean => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
    if (field === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Vui lòng nhập địa chỉ email hợp lệ");
      } else {
        setEmailError("");
      }
    }
  };

  const handleProvinceChange = (provinceCode: string, provinceName: string) => {
    setSelectedProvinceCode(provinceCode);
    handleInputChange("province", provinceName);
    // Reset ward when province changes
    handleInputChange("ward", "");
    setIsProvinceOpen(false);
  };

  const handleWardChange = (wardName: string) => {
    handleInputChange("ward", wardName);
    setIsWardOpen(false);
  };

  const isFormValid = () => {
    const requiredFields: (keyof ShippingInfo)[] = [
      "fullName",
      "phone",
      "address",
      "ward",
      "province",
    ];
    const requiredFieldsValid = requiredFields.every(
      (field) => shippingInfo[field].trim() !== ""
    );
    const emailValid = !shippingInfo.email || validateEmail(shippingInfo.email);

    return requiredFieldsValid && emailValid && agreeTerms && mappedCartItems.length > 0;
  };

  const handlePlaceOrder = async () => {
    if (shippingInfo.email && !validateEmail(shippingInfo.email)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ!");
      return;
    }

    if (!isFormValid()) {
      toast.error("Vui lòng điền đầy đủ thông tin và đồng ý điều khoản!");
      return;
    }

    if (!cartId) {
      toast.error("Không tìm thấy giỏ hàng.");
      return;
    }

    setIsSubmitting(true);

    try {
      const [firstName, ...lastNameArr] = shippingInfo.fullName.split(" ");
      const lastName = lastNameArr.join(" ") || "Unknown";

      const address = {
        first_name: firstName,
        last_name: lastName,
        address_1: shippingInfo.address,
        city: shippingInfo.ward,
        province: shippingInfo.province, // Thêm trường province
        postal_code: "700000",
        phone: shippingInfo.phone,
        country_code: "vn",
      };

      // Cập nhật thông tin khách hàng
      await updateCartCustomerInfo(cartId, {
        email: shippingInfo.email || "guest@example.com",
        shipping_address: address,
        billing_address: address,
      });

      const { cart } = await sdk.store.cart.retrieve(cartId);

      await sdk.store.cart.addShippingMethod(cartId, {
        option_id: "so_01K1ZVNQATP2FQQ55EP3ESXJP0",
      });

      await sdk.store.payment.initiatePaymentSession(cart, {
        provider_id: "pp_system_default",
      });

      const result = await sdk.store.cart.complete(cartId);

      if ("order" in result) {
        localStorage.setItem("orderId", result.order.id);
        if (!urlCartId) refreshCart();
        localStorage.removeItem("cart");
        window.location.href = "/order-success";
      } else {
        toast.error(result.error.message || "Lỗi khi hoàn tất đơn hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thông tin thanh toán</h1>

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
                    {/* Tỉnh/Thành phố Dropdown */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tỉnh/Thành phố <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => !isLoadingProvinces && !isLoading && !isSubmitting && setIsProvinceOpen(!isProvinceOpen)}
                          disabled={isLoadingProvinces || isLoading || isSubmitting}
                          className={`w-full flex items-center justify-between px-3 py-2 border rounded-md bg-white text-left ${
                            isLoadingProvinces || isLoading || isSubmitting 
                              ? "opacity-50 cursor-not-allowed" 
                              : "cursor-pointer hover:border-gray-400"
                          } ${isProvinceOpen ? "border-blue-500" : "border-gray-300"}`}
                        >
                          <span className={shippingInfo.province ? "text-gray-900" : "text-gray-500"}>
                            {isLoadingProvinces ? "Đang tải..." : shippingInfo.province || "Chọn tỉnh/thành phố"}
                          </span>
                          <ChevronDown size={16} className={`transition-transform ${isProvinceOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        {isProvinceOpen && !isLoadingProvinces && !isLoading && !isSubmitting && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setIsProvinceOpen(false)}
                            />
                            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                              {provinces.map((province) => (
                                <div
                                  key={province.code}
                                  onClick={() => handleProvinceChange(province.code, province.name)}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                  {province.name}
                                </div>
                              ))}
                              {provinces.length === 0 && (
                                <div className="px-3 py-2 text-sm text-gray-500">
                                  Không có dữ liệu
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Phường/Xã Dropdown */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phường/Xã <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedProvinceCode && !isLoadingWards && !isLoading && !isSubmitting) {
                              setIsWardOpen(!isWardOpen);
                            }
                          }}
                          disabled={!selectedProvinceCode || isLoadingWards || isLoading || isSubmitting}
                          className={`w-full flex items-center justify-between px-3 py-2 border rounded-md bg-white text-left ${
                            !selectedProvinceCode || isLoadingWards || isLoading || isSubmitting
                              ? "opacity-50 cursor-not-allowed" 
                              : "cursor-pointer hover:border-gray-400"
                          } ${isWardOpen ? "border-blue-500" : "border-gray-300"}`}
                        >
                          <span className={shippingInfo.ward ? "text-gray-900" : "text-gray-500"}>
                            {!selectedProvinceCode 
                              ? "Chọn tỉnh/thành phố trước" 
                              : isLoadingWards 
                              ? "Đang tải..." 
                              : shippingInfo.ward || "Chọn phường/xã"
                            }
                          </span>
                          <ChevronDown size={16} className={`transition-transform ${isWardOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        {isWardOpen && !isLoadingWards && !isLoading && !isSubmitting && selectedProvinceCode && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setIsWardOpen(false)}
                            />
                            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                              {wards.map((ward) => (
                                <div
                                  key={ward.code}
                                  onClick={() => handleWardChange(ward.name)}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                  {ward.name}
                                </div>
                              ))}
                              {wards.length === 0 && (
                                <div className="px-3 py-2 text-sm text-gray-500">
                                  Không có dữ liệu
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
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
                  <span>Thông báo</span>
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