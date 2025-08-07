// File: ItemProductComponent.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";

type Props = {
  product: Product;
  className?: string;
};

const getImageUrl = (url?: string): string => {
  if (!url) return "/placeholder-image.png";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const ItemProductComponent = ({
  product,
  className,
}: Props): JSX.Element => {
  const firstImage = getImageUrl(product.thumbnail || product.images?.[0]?.url);
  const secondImage = product.images?.[1]?.url
    ? getImageUrl(product.images![1].url)
    : undefined;

  const variant =
    product.variants?.find((v) => v.calculated_price) ||
    product.variants?.[0];

  const originalPrice = variant?.calculated_price?.calculated_amount ?? 0;

  // ✅ Lấy discountPercent và stars từ subtitle (vd: "30/5")
  const parseSubtitle = (subtitle: string) => {
    if (!subtitle || subtitle === "0") return { discountPercent: 0, stars: 3 };
    if (subtitle.includes("/")) {
      const [discount, stars] = subtitle.split("/").map((s) => parseInt(s.trim()));
      return {
        discountPercent: discount || 0,
        stars: stars || 3,
      };
    }
    return { discountPercent: parseInt(subtitle) || 0, stars: 3 };
  };

  const { discountPercent, stars } = parseSubtitle(product.subtitle || "");

  // ✅ Giá gốc trước khi giảm = originalPrice / (1 - discount%)
  const priceBeforeDiscount =
    discountPercent > 0
      ? Math.round(originalPrice / (1 - discountPercent / 100))
      : originalPrice;

  return (
    <Link
      href={`/product-detail/${product.id}`}
      className={`group no-underline text-inherit ${className}`}
    >
      <Card className="border-none shadow-none w-full cursor-pointer">
        <div className="relative overflow-hidden w-full h-[301px] group">
          <img
            src={firstImage}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          {secondImage && (
            <img
              src={secondImage}
              alt={`${product.title} hover`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            />
          )}
        </div>
        <CardContent className="p-0">
          <div className="flex flex-col items-start gap-1 w-full">
            <span className="font-poppins font-extralight opacity-45 text-black text-sm">
              {product.categories?.[0]?.name || "Sản phẩm"}
            </span>
            <h3 className="font-medium text-black hover:text-orange-500 transition-colors text-base break-words">
              {product.title}
            </h3>
            <div className="flex items-center gap-1">
              {Array.from({ length: stars }).map((_, idx) => (
                <img key={idx} className="w-4 h-4" alt="star" src="/frame-25.svg" />
              ))}
            </div>
            <div className="font-medium text-[#ff0202] text-base whitespace-nowrap">
              {formatCurrency(originalPrice)}
            </div>
            {discountPercent > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-[#000000a6] text-[17px] line-through">
                  {formatCurrency(priceBeforeDiscount)}
                </span>
                <Badge className="px-2 py-px bg-[#ed4343] text-white text-xs rounded-full">
                  -{discountPercent}%
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
