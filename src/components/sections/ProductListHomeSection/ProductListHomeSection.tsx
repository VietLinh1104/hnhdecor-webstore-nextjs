"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ItemProductComponent } from "@/components/ItemProductComponent";
import { ArrowRight, Grid3X3 } from "lucide-react";

export const ProductListHomeSection = (): JSX.Element => {
  // Product data for main grid (hiển thị 8 sản phẩm đầu)
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
    }
  ];

  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start pb-[70px] px-4">
      {/* Main Content */}
      <div className="flex flex-col gap-[15px] py-5 w-full">
        {/* Title and Sort */}
        <div className="flex items-center justify-between py-3.5 w-full">
          <div className="flex items-center gap-3">
            <Grid3X3 size={24} className="text-[#ec720e]" />
            <h2 className="font-medium text-black text-2xl">
              Sản phẩm nổi bật
            </h2>
          </div>
          
          {/* Badge showing total products */}
          <Badge variant="outline" className="text-[#ec720e] border-[#ec720e]">
            {mainProducts.length}+ sản phẩm
          </Badge>
        </div>

        {/* Filters and Products */}
        <div className="flex items-start justify-between w-full">
          {/* Products */}
          <div className="flex flex-col items-start gap-2.5 p-2.5 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[35px] gap-y-11 w-full">
              {mainProducts.map((product) => (
                <ItemProductComponent key={product.id} product={product} className=""/>
              ))}
            </div>
            
            {/* View More Button */}
            <div className="w-full flex justify-center mt-12">
              <Link href="/product-list">
                <Button 
                  size="lg"
                  className="bg-white border-2 border-[#ec720e] text-[#ec720e] hover:bg-[#ec720e] hover:text-white transition-all duration-300 px-8 py-3 rounded-full font-medium text-lg group"
                >
                  <span className="mr-2">Xem thêm sản phẩm</span>
                  <ArrowRight 
                    size={20} 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="w-full mt-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Khám phá bộ sưu tập đầy đủ
            </h3>
            <p className="text-gray-600">
              Hơn 500+ sản phẩm nội thất cao cấp đang chờ bạn khám phá
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/product-list">
              <Button variant="outline" className="border-[#ec720e] text-[#ec720e] hover:bg-[#ec720e] hover:text-white">
                Tất cả sản phẩm
              </Button>
            </Link>
            <Link href="/categories">
              <Button className="bg-[#ec720e] hover:bg-orange-700">
                Danh mục
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};