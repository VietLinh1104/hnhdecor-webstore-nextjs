"use client";

import React, { Suspense } from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ProductListSection } from "@/components/sections/ProductListSection/ProductListSection";
import { BreadcrumbSection } from "@/components/sections/BreadcrumbSection/BreadcrumbSection";
import { BannerSection } from "@/components/sections/BannerSection/BannerSection";
// import { CouponsSection } from "@/components/sections/CouponsSection/CouponsSection";
// import { RecentSection } from "@/components/sections/RecentSection/RecentSection";

export const ProductListScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      <main>
        <BreadcrumbSection />
        <BannerSection />
        {/* <CouponsSection /> */}

        {/* ✅ Bọc phần có useSearchParams bằng Suspense */}
        <Suspense fallback={<div className="p-4">Đang tải danh sách sản phẩm...</div>}>
          <ProductListSection />
        </Suspense>

        {/* <RecentSection /> */}
      </main>

      <FooterSection />
    </div>
  );
};
