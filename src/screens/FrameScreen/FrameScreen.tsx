import React from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ProductListHomeSection } from "@/components/sections/ProductListHomeSection/ProductListHomeSection";
// import { BannerSection } from "@/components/sections/BannerSection/BannerSection";
// import { CouponsSection } from "@/components/sections/CouponsSection/CouponsSection";
// import { RecentSection } from "@/components/sections/RecentSection/RecentSection";
import { ProductCategorySection } from "@/components/sections/ProductCategorySection/ProductCategorySection";
import { BannerSliderSection } from "@/components/sections/BannerSliderSection/BannerSliderSection";
import { ProductCarouselSection } from "@/components/sections/ProductCarouselSection/ProductCarouselSection";

export const FrameScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      {/* main */}
      <main className="w-full">
        <BannerSliderSection />
        {/* <CouponsSection /> */}
        <ProductCategorySection />
        <ProductListHomeSection />
        {/* <ProductCarouselSection
          title="Sản phẩm dành cho phòng khách"
          limit={12}                // Lấy tối đa 12 sản phẩm
          categories={["pcat_01K1VHEKB2F4A0Z0NRRB4B0601"]}   // (Tùy chọn) lọc theo ID danh mục
          viewAllHref="/product-list" // Link khi bấm "Xem tất cả"
        /> */}
        {/* <RecentSection /> */}
      </main>
      <FooterSection />
    </div>
  );
};
