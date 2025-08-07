"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product, ProductVariant } from "@/types/productDetail";
import { ProductDescriptionSection } from "@/components/sections/ProductDescriptionSection/ProductDescriptionSection";
import { getProductById, createCart, addItemToCart } from "@/lib/api";
import { useCart } from "@/contexts/CartContext"; // Import useCart hook

interface ProductDetailSectionProps {
  productId: string;
}

export const ProductDetailSection = ({
  productId,
}: ProductDetailSectionProps): JSX.Element => {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Sử dụng CartContext
  const { refreshCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);

        if (data.images?.length > 0) {
          setMainImage(data.images[0].url);
        }

        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
          const defaultOptions: Record<string, string> = {};
          data.variants[0].options?.forEach((opt) => {
            defaultOptions[opt.option.title] = opt.value;
          });
          setSelectedOptions(defaultOptions);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const formatVND = (value: number): string =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handleOptionSelect = (optionTitle: string, value: string) => {
    const updated = { ...selectedOptions, [optionTitle]: value };
    setSelectedOptions(updated);

    const matched = product?.variants.find((variant) =>
      variant.options.every((opt) => updated[opt.option.title] === opt.value)
    );

    if (matched) {
      setSelectedVariant(matched);
    }
  };

  const getOptionValues = (optionTitle: string): string[] => {
    const values = new Set<string>();
    product?.variants.forEach((variant) => {
      variant.options.forEach((opt) => {
        if (opt.option.title === optionTitle) {
          values.add(opt.value);
        }
      });
    });
    return Array.from(values);
  };

  const isHexColor = (value: string) => /^#([0-9A-F]{3}){1,2}$/i.test(value);

  const parseDescription = (desc: string) => {
    if (!desc || desc === "0") {
      return { discountPercent: 0, stars: 3 };
    }

    if (desc.includes("/")) {
      const [discount, stars] = desc.split("/").map((s) => parseInt(s.trim()));
      return {
        discountPercent: discount || 0,
        stars: stars || 3,
      };
    }

    return {
      discountPercent: parseInt(desc) || 0,
      stars: 3,
    };
  };

  if (!product) {
    return <div className="text-center py-20">Đang tải sản phẩm...</div>;
  }

  const { discountPercent, stars } = parseDescription(product.subtitle || "");
  
  // Logic đúng theo yêu cầu:
  // - API trả về giá đã giảm (finalPrice = 100,000đ)
  // - Cần tính ngược để có giá gốc cho gạch ngang
  const finalPrice = selectedVariant?.calculated_price?.calculated_amount || 100000; // Giá sau giảm từ API
  
  // Tính giá gốc (trước khi giảm) để hiển thị gạch ngang
  const displayOriginalPrice = discountPercent > 0 
    ? Math.round(finalPrice / (1 - discountPercent / 100)) // Tính ngược từ giá đã giảm
    : finalPrice;

  const discount = discountPercent > 0 ? discountPercent : 0;

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      console.warn("Vui lòng chọn biến thể sản phẩm.");
      return;
    }

    setIsAddingToCart(true);

    try {
      let cartId = localStorage.getItem("cart");

      // Nếu chưa có cart, tạo mới
      if (!cartId) {
        const newCartId = await createCart();

        if (!newCartId) {
          throw new Error("Không thể tạo giỏ hàng mới.");
        }

        cartId = newCartId;
        localStorage.setItem("cart", cartId);
        console.log("Giỏ hàng mới được tạo: " + cartId);
      }

      const orderDetails = {
        variant_id: selectedVariant.id,
        quantity,
      };

      // Gửi request thêm sản phẩm
      await addItemToCart(cartId, orderDetails);

      // Chờ backend xử lý xong để tránh refresh quá sớm
      await new Promise((res) => setTimeout(res, 300));

      // Cập nhật lại cart từ server (đảm bảo chính xác)
      await refreshCart();

      console.log("Sản phẩm đã được thêm vào giỏ hàng thành công!");
      setQuantity(1); // Reset về 1

    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    // Sau khi thêm vào giỏ hàng, có thể redirect đến trang checkout
    // window.location.href = '/checkout';
  };

  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT: Images */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-4 h-[300px] overflow-y-auto md:h-full">
          {product.images.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt={`Thumbnail ${index}`}
              width={70}
              height={70}
              onClick={() => setMainImage(img.url)}
              className={`w-[70px] h-[70px] object-cover border rounded cursor-pointer transition-all duration-200 ${
                img.url === mainImage ? "border-orange-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex-1 flex items-center md:items-start justify-center">
          <Image
            src={mainImage}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain transition-all duration-300"
          />
        </div>
      </div>

      {/* RIGHT: Details */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>

        {/* ⭐ Hiển thị đánh giá sao */}
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: stars }).map((_, index) => (
            <img
              key={index}
              className="w-4 h-4"
              alt="Star"
              src="/frame-25.svg"
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({stars}/5 sao)</span>
        </div>

        <div className="text-gray-500 text-sm">
          Mã sản phẩm:{" "}
          <span className="text-black">{selectedVariant?.sku || "Đang cập nhật"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-red-600 text-xl font-semibold">{formatVND(finalPrice)}</span>
          {discount > 0 && (
            <>
              <span className="line-through text-gray-500">{formatVND(displayOriginalPrice)}</span>
              <Badge className="bg-[#ed4343] text-white">-{discount}%</Badge>
            </>
          )}
        </div>

        {discount > 0 && (
          <div className="text-sm text-gray-500">
            (Tiết kiệm{" "}
            <span className="text-red-600 font-medium">
              {formatVND(displayOriginalPrice - finalPrice)}
            </span>)
          </div>
        )}

        {/* Dynamic Options */}
        {product.options?.map((opt) => (
          <div key={opt.id}>
            <span className="font-semibold text-sm capitalize">{opt.title}:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {getOptionValues(opt.title).map((value) =>
                isHexColor(value) ? (
                  <button
                    key={value}
                    onClick={() => handleOptionSelect(opt.title, value)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedOptions[opt.title] === value
                        ? "border-orange-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: value }}
                    aria-label={`Color ${value}`}
                  />
                ) : (
                  <Badge
                    key={value}
                    onClick={() => handleOptionSelect(opt.title, value)}
                    className={`cursor-pointer ${
                      selectedOptions[opt.title] === value
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {value}
                  </Badge>
                )
              )}
            </div>
          </div>
        ))}

        <div className="">
          {/* Quantity */}
          <div className="flex items-end gap-4">
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleDecreaseQuantity}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors"
                disabled={isAddingToCart}
              >
                -
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors"
                disabled={isAddingToCart}
              >
                +
              </button>
            </div>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !selectedVariant}
            >
              {isAddingToCart ? "ĐANG THÊM..." : "THÊM VÀO GIỎ"}
            </Button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              onClick={handleBuyNow}
              className="flex-1 bg-black text-white hover:bg-orange-600"
              disabled={isAddingToCart || !selectedVariant}
            >
              {isAddingToCart ? "ĐANG XỬ LÝ..." : "MUA NGAY"}
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center text-sm text-gray-600">
            <svg className="w-6 h-6 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v13H3V3zm0 13l2 4h14l2-4H3zm3-9v6m12-6v6" />
            </svg>
            Giao hàng toàn quốc
          </div>

          <div className="flex flex-col items-center text-center text-sm text-gray-600">
            <svg className="w-6 h-6 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tích điểm tất cả sản phẩm
          </div>

          <div className="flex flex-col items-center text-center text-sm text-gray-600">
            <svg className="w-6 h-6 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4m8-4c0 2.21-1.79 4-4 4m0 0v4m0-4h4M8 12H4" />
            </svg>
            Giảm 5% khi thanh toán online
          </div>
        </div>
      </div>
      <ProductDescriptionSection Description={product.description} Attributes="" />
    </section>
  );
};