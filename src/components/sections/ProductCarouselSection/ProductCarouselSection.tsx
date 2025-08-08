"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ItemProductComponent } from "@/components/ItemProductComponent"
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react"
import Link from "next/link"
import { Product } from "@/types/product"
import { getAllProducts } from "@/lib/api"

type Props = {
  title?: string
  limit?: number
  categories?: string[]
  viewAllHref?: string
}

export const ProductCarouselSection = ({
  title = "Sản phẩm mới",
  limit = 20,
  categories,
  viewAllHref = "/product-list",
}: Props): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carousel refs/state (desktop/tablet)
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts(categories ?? [])
        setProducts(data.slice(0, limit))
      } catch (e) {
        console.error(e)
        setError("Không thể tải sản phẩm.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [limit, JSON.stringify(categories)])

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, clientWidth, scrollWidth } = el
    setCanPrev(scrollLeft > 0)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    const el = trackRef.current
    if (!el) return
    const onScroll = () => updateArrows()
    el.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", updateArrows)
    return () => {
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", updateArrows)
    }
  }, [products.length])

  const scrollByPage = (dir: "prev" | "next") => {
    const el = trackRef.current
    if (!el) return
    const delta = dir === "next" ? el.clientWidth : -el.clientWidth
    el.scrollBy({ left: delta, behavior: "smooth" })
  }

  return (
    <section className="relative w-full max-w-screen-2xl mx-auto px-4 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-3">
          <Grid3X3 size={24} className="text-[#ec720e]" />
          <h2 className="font-medium text-black text-2xl">{title}</h2>
        </div>

        {/* Nút điều hướng: ẩn trên mobile */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            className="border-[#ec720e]"
            disabled={!canPrev}
            onClick={() => scrollByPage("prev")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="border-[#ec720e]"
            disabled={!canNext}
            onClick={() => scrollByPage("next")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          {viewAllHref && (
            <Link href={viewAllHref}>
              <Button className="bg-[#ec720e] hover:bg-orange-700 text-white">
                Xem tất cả
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE: grid 2 cột, không trượt */}
      <div className="md:hidden">
        {loading && <p className="text-gray-500">Đang tải sản phẩm...</p>}
        {error && !loading && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <p className="text-gray-600">Chưa có sản phẩm.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {products.slice(0, 2).map((product) => (
                  <ItemProductComponent key={product.id} product={product} className="w-full" />
                ))}
              </div>
            )}

            {/* nút xem tất cả cho mobile nếu cần */}
            {viewAllHref && (
              <div className="flex justify-center mt-6">
                <Link href={viewAllHref}>
                  <Button variant="outline" className="border-[#ec720e] text-[#ec720e] hover:bg-[#ec720e] hover:text-white">
                    Xem tất cả
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* DESKTOP/TABLET: carousel 4 sp/hàng */}
      <div className="relative hidden md:block">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scroll"
        >
          {loading && (
            <div className="w-full py-10 text-gray-500">Đang tải sản phẩm...</div>
          )}
          {error && !loading && (
            <div className="w-full py-10 text-red-500">{error}</div>
          )}
          {!loading && !error && products.length === 0 && (
            <div className="w-full py-10 text-gray-600">Chưa có sản phẩm.</div>
          )}

          {!loading && !error && products.map((product) => (
            <div
              key={product.id}
              className="snap-start flex-shrink-0 w-1/4" // Luôn 4 item/dòng cho ≥ md
            >
              <ItemProductComponent product={product} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
