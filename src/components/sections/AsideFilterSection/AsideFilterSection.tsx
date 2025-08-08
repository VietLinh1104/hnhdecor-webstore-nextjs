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

  // Lấy các danh mục đang chọn từ query (?category=slug)
  const selectedCategories = searchParams.getAll("category")

  useEffect(() => {
    getAllCategories().then(setCategories).catch(() => setCategories([]))
  }, [])

  // Lấy slug dùng cho query (ưu tiên handle/slug, fallback id)
  const getCatSlug = (cat: ProductCategory) =>
    (cat as any).handle || (cat as any).slug || cat.id

  const handleCategoryToggle = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategories.includes(slug)) {
      const remaining = selectedCategories.filter((cat) => cat !== slug)
      params.delete("category")
      remaining.forEach((cat) => params.append("category", cat))
    } else {
      params.append("category", slug)
    }

    // Reset page nếu có phân trang (tuỳ app)
    params.delete("page")

    router.push(`?${params.toString()}`)
  }

  return (
    <aside className="flex flex-col w-full xl:w-[360px] gap-[27px]">
      <div className="flex flex-col items-start gap-[13px] w-full">
        <h3 className="font-normal text-black text-xl">Danh mục sản phẩm</h3>
        <div className="flex flex-col items-start gap-[10px] w-full">
          {categories.map((cat, idx) => {
            const slug = getCatSlug(cat)
            const checked = selectedCategories.includes(slug)
            return (
              <div key={slug} className="flex items-center gap-2.5">
                <Checkbox
                  id={`cat-${idx}`}
                  checked={checked}
                  onCheckedChange={() => handleCategoryToggle(slug)}
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
