"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ItemProductComponent } from "@/components/ItemProductComponent"
import { AsideFilterSection } from "@/components/sections/AsideFilterSection/AsideFilterSection"
import { ChevronDown, Filter } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Product } from "@/types/product"
import { getAllProducts } from "@/lib/api"

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "date-asc" | "date-desc"

export const ProductListSection = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([])
  const [sortedProducts, setSortedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("name-asc")
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const selectedCount = searchParams.getAll("category").length

  const sortOptions = [
    { value: "name-asc", label: "Tên A → Z" },
    { value: "name-desc", label: "Tên Z → A" },
    { value: "price-asc", label: "Giá thấp → cao" },
    { value: "price-desc", label: "Giá cao → thấp" },
    { value: "date-asc", label: "Cũ nhất" },
    { value: "date-desc", label: "Mới nhất" },
  ] as const

  const getProductPrice = (product: Product): number => {
    const variant = product.variants?.find(v => v.calculated_price) || product.variants?.[0]
    return variant?.calculated_price?.calculated_amount ?? 0
  }

  const sortProducts = (list: Product[], sortType: SortOption): Product[] => {
    const sorted = [...list]
    switch (sortType) {
      case "name-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title, "vi"))
      case "name-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title, "vi"))
      case "price-asc":
        return sorted.sort((a, b) => getProductPrice(a) - getProductPrice(b))
      case "price-desc":
        return sorted.sort((a, b) => getProductPrice(b) - getProductPrice(a))
      case "date-asc":
        return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      case "date-desc":
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      default:
        return sorted
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryParams = searchParams.getAll("category")
        const data = await getAllProducts(categoryParams)
        setProducts(data)
      } catch (err: any) {
        console.error("Error fetching products:", err)
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [searchParams])

  useEffect(() => {
    setSortedProducts(sortProducts(products, sortBy))
  }, [products, sortBy])

  const handleSortChange = (sortType: SortOption) => {
    setSortBy(sortType)
    setIsDropdownOpen(false)
  }

  const currentSortLabel = sortOptions.find(option => option.value === sortBy)?.label || "Tên A → Z"

  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start pb-12 px-4 sm:pb-16 lg:pb-[70px] sm:px-4">
      <div className="flex flex-col gap-4 py-4 w-full">
        {/* Title + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          <h2 className="font-medium text-black text-xl lg:text-2xl">
            Tất cả sản phẩm
          </h2>

          <div className="flex items-center gap-2">
            {/* Nút Lọc (mobile-only) */}
            <Button
              variant="outline"
              className="px-3 py-2 rounded-md border-[#ec720e] text-black text-sm flex items-center gap-2 xl:hidden"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="w-4 h-4" />
              Lọc
              {selectedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded bg-orange-100 text-[#ec720e]">
                  {selectedCount}
                </span>
              )}
            </Button>

            {/* Sort */}
            <span className="text-sm sm:text-base text-black">Sắp xếp:</span>
            <div className="relative z-20">
              <Button
                variant="outline"
                className="px-3 py-2 rounded-md border-[#ec720e] text-black text-sm flex items-center gap-2 min-w-[140px] justify-between"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                {currentSortLabel}
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </Button>

              {isDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      role="option"
                      aria-selected={sortBy === option.value}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md ${
                        sortBy === option.value ? "bg-orange-50 text-[#ec720e]" : "text-black"
                      }`}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 w-full">
          {/* Sidebar (desktop) */}
          <aside className="hidden xl:block xl:w-1/4">
            <AsideFilterSection />
          </aside>

          {/* Product Grid */}
          <div className="flex flex-col gap-4 flex-1 w-full">
            {loading && <p className="text-gray-500">Đang tải sản phẩm...</p>}

            {error && (
              <p className="text-red-500 font-medium text-sm">{error}</p>
            )}

            {!loading && !error && sortedProducts.length === 0 && (
              <p className="text-gray-600">Không có sản phẩm nào.</p>
            )}

            {!loading && !error && sortedProducts.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 gap-x-0 lg:gap-x-6">
                {sortedProducts.map((product) => (
                  <ItemProductComponent
                    key={product.id}
                    product={product}
                    className="w-full"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close sort dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Mobile Filter Slide-over */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          {/* panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium text-lg">Lọc sản phẩm</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
                className="p-2"
              >
                Đóng
              </Button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-56px-64px)]">
              <AsideFilterSection />
            </div>

            <div className="p-4 border-t bg-white">
              <Button
                className="w-full bg-[#ec720e] hover:bg-[#d9650c]"
                onClick={() => setIsFilterOpen(false)}
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
