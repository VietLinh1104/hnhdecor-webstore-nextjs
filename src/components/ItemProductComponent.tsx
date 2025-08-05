import React from "react";
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
  
  // Lấy variant đầu tiên có calculated_price
  const variant = product.variants?.find(v => v.calculated_price) || product.variants?.[0];
  
  // Lấy giá từ variant đầu tiên
  const finalPrice = variant?.calculated_price?.calculated_amount ?? 0;
  const originalPrice = variant?.calculated_price?.original_amount ?? 0;
  
  // Lấy % giảm giá và số sao từ description
  const parseDescription = (desc: string) => {
    if (!desc || desc === "0") {
      return { discountPercent: 0, stars: 3 }; // Mặc định 3 sao, không giảm giá
    }
    
    if (desc.includes("/")) {
      const [discount, stars] = desc.split("/").map(s => parseInt(s.trim()));
      return {
        discountPercent: discount || 0,
        stars: stars || 3
      };
    }
    
    // Nếu chỉ có 1 số thì coi như % giảm giá, sao mặc định 3
    return {
      discountPercent: parseInt(desc) || 0,
      stars: 3
    };
  };
  
  const { discountPercent, stars } = parseDescription(product.description);
  
  // Giá gốc từ API
  const originalPriceFromAPI = variant?.calculated_price?.calculated_amount ?? 0;
  
  // Giá sau khi giảm (giá đỏ)
  const discountedPrice = discountPercent > 0 && originalPriceFromAPI > 0
    ? Math.round(originalPriceFromAPI * (1 - discountPercent / 100))
    : originalPriceFromAPI;

  return (
    <Card
      key={product.id}
      className={`flex flex-col items-start gap-[9px] border-none shadow-none w-full cursor-pointer ${className}`}
    >
      <div className="flex flex-col h-[301.02px] items-center justify-center w-full">
        <img
          className="w-full h-[267.42px] object-cover"
          alt={product.title}
          src={firstImage}
        />
      </div>

      <CardContent className="p-0 w-full">
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex flex-col items-start w-full">
            <span className="self-stretch mt-[-1.00px] font-poppins font-extralight opacity-45 text-black text-sm">
              {product.categories?.[0]?.name || "Sản phẩm"}
            </span>
            <h3 className="self-stretch font-medium text-black hover:text-orange-500 transition-colors text-base break-words whitespace-normal">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: stars }).map((_, index) => (
              <img 
                key={index}
                className="flex-[0_0_auto] w-4 h-4" 
                alt="Star" 
                src="/frame-25.svg" 
              />
            ))}
          </div>

          <div className="font-medium text-[#ff0202] text-base whitespace-nowrap">
            {formatCurrency(discountedPrice)}
          </div>

          {discountPercent > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[#000000a6] text-[17px] line-through">
                {formatCurrency(originalPriceFromAPI)}
              </span>
              <Badge className="w-fit h-[18px] flex items-center justify-center px-2 py-px bg-[#ed4343] font-poppins font-normal text-white text-xs rounded-[34px]">
                -{discountPercent}%
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};