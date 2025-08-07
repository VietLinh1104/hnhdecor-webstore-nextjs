"use client";

import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllCategories } from "@/lib/api";
import { ProductCategory } from "@/types/category";
import { useSearchParams, useRouter } from "next/navigation";

export const AsideFilterSection = (): JSX.Element => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse selected categories from query params
  const selectedCategories = searchParams.getAll("category"); // multiple ?category=...

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleCategoryToggle = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Nếu đã chọn thì bỏ ra, chưa chọn thì thêm vào
    if (selectedCategories.includes(slug)) {
      // Bỏ tất cả các `category` rồi thêm lại các cái còn giữ
      const remaining = selectedCategories.filter((cat) => cat !== slug);
      params.delete("category");
      remaining.forEach((cat) => params.append("category", cat));
    } else {
      params.append("category", slug);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="flex flex-col w-[360px] gap-[27px]">
      <div className="flex flex-col items-start gap-[13px] w-full">
        <h3 className="font-normal text-black text-xl">Danh mục sản phẩm</h3>
        <div className="flex flex-col items-start gap-[5px]">
          {categories.map((cat, idx) => {
            const checked = selectedCategories.includes(cat.id); // dùng `handle` để làm slug
            return (
              <div key={cat.id} className="flex items-center gap-2.5">
                <Checkbox
                  id={`cat-${idx}`}
                  checked={checked}
                  onCheckedChange={() => handleCategoryToggle(cat.id)}
                  className="w-[15px] h-[15px] border-[0.5px] border-solid border-[#00000063]"
                />
                <label
                  htmlFor={`cat-${idx}`}
                  className="font-normal text-black text-base cursor-pointer"
                >
                  {cat.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
