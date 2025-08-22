"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ItemProductComponent } from "@/components/ItemProductComponent";
import {
  ArrowRight,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/api";

interface ProductListCarouselProps {
  categoryId: string;   // ID danh mục
  title: string;        // Tiêu đề danh mục
}

export const ProductListCarousel = ({
  categoryId,
  title,
}: ProductListCarouselProps): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts([categoryId]); // gọi API theo categoryId
        setProducts(data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, products.length - itemsPerPage)
    );
  };

  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start px-4">
      <div className="flex flex-col gap-[15px] py-5 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Grid3X3 size={24} className="text-[#ec720e]" />
            <Link href={`/product-list/?category=${categoryId}`}><h2 className="font-medium text-black text-2xl hover:text-[#ec720e] transition">{title}</h2></Link>
            
          </div>
          <Badge variant="outline" className="text-[#ec720e] border-[#ec720e]">
            {products.length}+ sản phẩm
          </Badge>
        </div>

        <div className="flex flex-col w-full">
          {loading ? (
            <p className="text-gray-500">Đang tải sản phẩm...</p>
          ) : (
            <div className="relative w-full">
              {/* Nút Prev */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow-md p-2 disabled:opacity-30"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Container với transition */}
              <div className="overflow-hidden w-full">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      (100 / itemsPerPage) * currentIndex
                    }%)`,
                  }}
                >
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="w-1/2 lg:w-1/4 flex-shrink-0 px-2"
                    >
                      <ItemProductComponent product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút Next */}
              <button
                onClick={handleNext}
                disabled={currentIndex >= products.length - itemsPerPage}
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow-md p-2 disabled:opacity-30"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          {/* <div className="w-full flex justify-center mt-12">
            <Link href={`/product-list?category=${categoryId}`}>
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
          </div> */}
        </div>
      </div>
    </section>
  );
};
