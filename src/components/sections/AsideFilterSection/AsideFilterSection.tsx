"use client";

import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllCategories } from "@/lib/api";
import { ProductCategory } from "@/types/category";

export const AsideFilterSection = (): JSX.Element => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <aside className="flex flex-col w-[360px] gap-[27px]">
      <div className="flex flex-col items-start gap-[13px] w-full">
        <h3 className="font-normal text-black text-xl">Danh mục sản phẩm</h3>
        <div className="flex flex-col items-start gap-[5px]">
          {categories.map((cat, idx) => (
            <div key={cat.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${idx}`}
                className="w-[15px] h-[15px] border-[0.5px] border-solid border-[#00000063]"
              />
              <label
                htmlFor={`cat-${idx}`}
                className="font-normal text-black text-base"
              >
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
