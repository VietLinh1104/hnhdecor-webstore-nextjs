// components/ProductListSection.tsx

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types"; // ✅ Import interface đúng cách

type Props = {
  product: Product;
  className?: string;
};

export const ItemProductComponent = ({ product, className }: Props): JSX.Element => {
  return (
      <Card
        key={product.id}
        className={`flex flex-col items-start gap-[9px] border-none shadow-none w-full cursor-pointer ${className}`}
      >
        <div className="flex flex-col h-[301.02px] items-center justify-center w-full">
          <img
            className="w-full h-[267.42px] object-cover"
            alt={product.name}
            src={product.image}
          />
        </div>

        <CardContent className="p-0 w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex flex-col items-start w-full">
              <span className="self-stretch mt-[-1.00px] font-poppins font-extralight opacity-45 text-black text-sm">
                {product.category}
              </span>
              <h3 className="self-stretch font-medium text-black hover:text-orange-500 transition-colors text-base break-words whitespace-normal">
                {product.name}
              </h3>
            </div>

            <img className="flex-[0_0_auto]" alt="Rating" src="/frame-25.svg" />

            <div className="font-medium text-[#ff0202] text-base whitespace-nowrap">
              {product.price}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[#000000a6] text-[17px] line-through">
                {product.originalPrice}
              </span>
              <Badge className="w-[35px] h-[18px] flex items-center justify-center px-1 py-px bg-[#ed4343] font-poppins font-normal text-white text-xs rounded-[34px]">
                {product.discount}
              </Badge>
            </div>
          </div>

          <div className="flex items-start gap-2.5 mt-2">
            {product.thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                className={`w-[45px] h-[45px] object-cover rounded-full ${
                  index === 1 ? "w-[46px]" : ""
                }`}
                alt="Thumbnail"
                src={thumbnail}
              />
            ))}
          </div>
        </CardContent>
      </Card>
  );
};
