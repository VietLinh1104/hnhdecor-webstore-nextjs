//ProductListSection.tsx

import React from "react";

import { ItemProductComponent } from "@/components/ItemProductComponent";

export const RecentSection = (): JSX.Element => {
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

      {/* RecentSection */}
      <div className="flex flex-col items-start py-5 w-full">
        <div className="flex items-center gap-2.5 py-3.5 w-full">
          <h2 className="  font-medium text-black text-2xl">
            Tất cả sản phẩm
          </h2>
        </div>

        <div className="w-full overflow-x-auto whitespace-nowrap pb-4">
          {mainProducts.map((product) => (
            <ItemProductComponent
              key={product.id}
              product={product}
              className="!max-w-80  inline-block mr-10"
            />
          ))}
        </div>

      </div>
    </section>
  );
};
