import React from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ProductListHomeSection } from "@/components/sections/ProductListHomeSection/ProductListHomeSection";
// import { BannerSection } from "@/components/sections/BannerSection/BannerSection";
// import { CouponsSection } from "@/components/sections/CouponsSection/CouponsSection";
// import { RecentSection } from "@/components/sections/RecentSection/RecentSection";
import { ProductCategorySection } from "@/components/sections/ProductCategorySection/ProductCategorySection";
import { BannerSliderSection } from "@/components/sections/BannerSliderSection/BannerSliderSection";

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
        {/* <RecentSection /> */}
      </main>
      <FooterSection />
    </div>
  );
};
