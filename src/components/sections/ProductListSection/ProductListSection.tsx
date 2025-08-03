//ProductListSection.tsx

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ItemProductComponent } from "@/components/ItemProductComponent";
import { AsideFilterSection } from "@/components/sections/AsideFilterSection/AsideFilterSection";


export const ProductListSection = (): JSX.Element => {
  // Product data for main grid
  const mainProducts = [
    {
      id: 1,
      category: "Ghế Sofa",
      name: "Sofa Băng Phòng Khách Truyền Thống QP115",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-4-13.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
    {
      id: 2,
      category: "Ghế Sofa",
      name: "Sofa Băng Phòng Khách Truyền Thống QP113",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-1-10.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
    {
      id: 3,
      category: "Ghế Sofa",
      name: "Đèn bàn thuỷ tinh",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-1-13.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
    {
      id: 4,
      category: "Ghế Sofa",
      name: "Mochi Pouffe / Nhiều màu",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-1-3.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
    {
      id: 5,
      category: "Ghế Sofa",
      name: "Đèn tường Wally",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-1-12.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
    {
      id: 6,
      category: "Ghế Sofa",
      name: "Thương hiệu",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-1-5.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
    {
      id: 7,
      category: "Ghế Sofa",
      name: "Sofa Băng Phòng Khách Truyền Thống QP115",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-4-13.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
    {
      id: 8,
      category: "Ghế Sofa",
      name: "Đèn bàn thuỷ tinh",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-1-13.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
    {
      id: 9,
      category: "Ghế Sofa",
      name: "Sofa Băng Phòng Khách Truyền Thống QP113",
      price: "33.750.000₫",
      originalPrice: "62.400.000₫",
      discount: "-50%",
      image: "/melaniecanape3placesgirsclaire-1-10.png",
      thumbnails: [
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
        "/melaniecanape3placesgirsclaire-4-13.png",
      ],
    },
  ];

  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start pb-12 px-4 sm:pb-16 lg:pb-[70px] sm:px-4">
      {/* Main Content */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[15px] py-3 sm:py-4 lg:py-5 w-full">
        {/* Title and Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 py-2 sm:py-3 lg:py-3.5 w-full">
          <h2 className="font-medium text-black text-xl sm:text-xl lg:text-2xl">
            Tất cả sản phẩm
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
            <span className="font-normal text-black text-sm sm:text-base">
              Sắp xếp:
            </span>
            <Button
              variant="outline"
              className="px-3 sm:px-5 py-2 sm:py-[5px] rounded-md border-[#ec720e] text-black text-sm sm:text-base w-fit"
            >
              Tên A → Z
            </Button>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex flex-col xl:flex-row items-start xl:justify-between gap-4 xl:gap-6 w-full">
          <div className="hidden xl:block xl:flex-shrink-0">
            <AsideFilterSection />
          </div>

          <div className="flex flex-col items-start gap-4 w-full xl:flex-1">
            {/* Category Badge */}
            <Badge className="px-2 sm:px-3 lg:px-[11px] py-1 sm:py-[3px] bg-[#ff50502b] text-[#ea3838] text-xs rounded-md border border-solid border-[#ec720e]">
              Ghế Sofa
            </Badge>

            {/* Products Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-5 lg:gap-5 xl:gap-6 w-full">
              {mainProducts.map((product) => (
                <ItemProductComponent 
                  key={product.id} 
                  product={product}
                  className="w-full"
                />
              ))}
            </div>

          </div>



        </div>
      </div>
    </section>
  );
};