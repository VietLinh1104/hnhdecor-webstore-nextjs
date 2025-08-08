"use client"

import React, { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllCategories } from "@/lib/api"
import { ProductCategory } from "@/types/category"
import { useSearchParams, useRouter } from "next/navigation"

export const AsideFilterSection = (): JSX.Element => {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  // Lấy các ID danh mục đang chọn từ query (?category=<id>)
  const selectedCategoryIds = searchParams.getAll("category")

  useEffect(() => {
    getAllCategories().then(setCategories).catch(() => setCategories([]))
  }, [])

  const handleCategoryToggle = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategoryIds.includes(id)) {
      // Bỏ id ra khỏi list
      const remaining = selectedCategoryIds.filter((c) => c !== id)
      params.delete("category")
      remaining.forEach((c) => params.append("category", c))
    } else {
      // Thêm id vào list
      params.append("category", id)
    }

    // Nếu có phân trang thì reset
    params.delete("page")

    router.push(`?${params.toString()}`)
  }

  return (
    <aside className="flex flex-col w-full xl:w-[360px] gap-[27px]">
      <div className="flex flex-col items-start gap-[13px] w-full">
        <h3 className="font-normal text-black text-xl">Danh mục sản phẩm</h3>
        <div className="flex flex-col items-start gap-[10px] w-full">
          {categories.map((cat, idx) => {
            const id = String(cat.id) // đảm bảo kiểu string
            const checked = selectedCategoryIds.includes(id)
            return (
              <div key={id} className="flex items-center gap-2.5">
                <Checkbox
                  id={`cat-${idx}`}
                  checked={checked}
                  onCheckedChange={() => handleCategoryToggle(id)}
                  className="w-[15px] h-[15px] border-[0.5px] border-solid border-[#00000063]"
                />
                <label
                  htmlFor={`cat-${idx}`}
                  className="font-normal text-black text-base cursor-pointer select-none"
                >
                  {cat.name}
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
