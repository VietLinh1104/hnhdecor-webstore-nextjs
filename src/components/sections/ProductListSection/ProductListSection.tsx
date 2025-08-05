"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ItemProductComponent } from "@/components/ItemProductComponent"
import { AsideFilterSection } from "@/components/sections/AsideFilterSection/AsideFilterSection"
import { ChevronDown } from "lucide-react"

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

  const sortOptions = [
    { value: "name-asc", label: "Tên A → Z" },
    { value: "name-desc", label: "Tên Z → A" },
    { value: "price-asc", label: "Giá thấp → cao" },
    { value: "price-desc", label: "Giá cao → thấp" },
    { value: "date-asc", label: "Cũ nhất" },
    { value: "date-desc", label: "Mới nhất" },
  ]

  const getProductPrice = (product: Product): number => {
    const variant = product.variants?.find(v => v.calculated_price) || product.variants?.[0]
    return variant?.calculated_price?.calculated_amount ?? 0
  }

  const sortProducts = (products: Product[], sortType: SortOption): Product[] => {
    const sorted = [...products]
    
    switch (sortType) {
      case "name-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title, 'vi'))
      case "name-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title, 'vi'))
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
        {/* Title + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          <h2 className="font-medium text-black text-xl lg:text-2xl">
            Tất cả sản phẩm
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-black">Sắp xếp:</span>
            <div className="relative">
              <Button
                variant="outline"
                className="px-3 py-2 rounded-md border-[#ec720e] text-black text-sm flex items-center gap-2 min-w-[140px] justify-between"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {currentSortLabel}
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md ${
                        sortBy === option.value ? 'bg-orange-50 text-[#ec720e]' : 'text-black'
                      }`}
                      onClick={() => handleSortChange(option.value as SortOption)}
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
          {/* Sidebar */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      
      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </section>
  )
}