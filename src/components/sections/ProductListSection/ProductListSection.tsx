//ProductListSection.tsx

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AsideFilterSection } from "@/components/sections/AsideFilterSection/AsideFilterSection";
import { ItemProductComponent } from "@/components/ItemProductComponent";

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
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start pb-[70px] px-4">


      {/* Main Content */}
      <div className="flex flex-col gap-[15px] py-5 w-full">
        {/* Title and Sort */}
        <div className="flex items-center justify-between py-3.5 w-full">
          <h2 className=" font-medium text-black text-2xl">
            Tất cả sản phẩm
          </h2>
          <div className="flex items-center gap-5">
            <span className="  font-normal text-black text-base">
              Sắp xếp:
            </span>
            <Button
              variant="outline"
              className="px-5 py-[5px] rounded-md border-[#ec720e] text-black"
            >
              Tên A → Z
            </Button>
          </div>
        </div>

        {/* Filters and Products */}
        <div className="flex items-start justify-between w-full">

          {/* Filters */}
          <AsideFilterSection />

          {/* Products */}
          <div className="flex flex-col items-start gap-2.5 p-2.5 flex-1">
            <Badge className="px-[11px] py-[3px] bg-[#ff50502b] text-[#ea3838] text-xs rounded-md border border-solid border-[#ec720e]">
              Ghế Sofa
            </Badge>

            <div className="grid grid-cols-3 gap-[20px] gap-y-11 w-full">
              {mainProducts.map((product) => (
                <ItemProductComponent key={product.id} product={product} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
