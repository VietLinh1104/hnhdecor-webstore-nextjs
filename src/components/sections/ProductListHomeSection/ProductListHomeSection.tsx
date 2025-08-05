"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ItemProductComponent } from "@/components/ItemProductComponent";
import { ArrowRight, Grid3X3 } from "lucide-react";
import { Product } from "@/types/product"
import { getAllProducts } from "@/lib/api"

export const ProductListHomeSection = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await getAllProducts()
          setProducts(data)
        } catch (err: any) {
          console.error("Error fetching products:", err)
          setError("Không thể tải sản phẩm. Vui lòng thử lại sau.")
        } finally {
          setLoading(false)
        }
      }
  
      fetchProducts()
    }, [])

  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start pb-[70px] px-4">
      <div className="flex flex-col gap-[15px] py-5 w-full">
        <div className="flex items-center justify-between py-3.5 w-full">
          <div className="flex items-center gap-3">
            <Grid3X3 size={24} className="text-[#ec720e]" />
            <h2 className="font-medium text-black text-2xl">
              Sản phẩm nổi bật
            </h2>
          </div>
          <Badge variant="outline" className="text-[#ec720e] border-[#ec720e]">
            {products.length}+ sản phẩm
          </Badge>
        </div>

        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col items-start gap-2.5 p-2.5 flex-1">
            {loading ? (
              <p className="text-gray-500">Đang tải sản phẩm...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[35px] gap-y-11 w-full">
                {products.map((product) => (
                    <ItemProductComponent
                      key={product.id}
                      product={product}
                      className="w-full"
                    />
                  ))}
                </div>
            )}

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

      {/* Banner cuối */}
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
