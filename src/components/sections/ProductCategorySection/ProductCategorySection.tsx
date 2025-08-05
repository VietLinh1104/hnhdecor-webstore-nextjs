"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCategory } from "@/types/category";
import { getAllCategories } from "@/lib/api"; // hoặc đường dẫn tương ứng

export const ProductCategorySection = (): JSX.Element => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-black mb-2">DANH MỤC SẢN PHẨM</h2>
        <div className="w-20 h-1 bg-[#ec720e] mx-auto"></div>
      </div>

      {/* Categories Grid */}
      <div className="flex justify-around gap-6 mx-36">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/product-list/?category=${category.handle}`}
            className="group cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              {/* Circular Image */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 overflow-hidden rounded-full border-4 border-gray-100 group-hover:border-[#ec720e] transition-colors duration-300">
                <img
                  src={category.description}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category Info */}
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#ec720e] transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {/* Bạn có thể thêm productCount nếu có */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Decorative Bottom */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#ec720e] opacity-60"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
