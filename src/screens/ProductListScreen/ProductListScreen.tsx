import React from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ProductListSection } from "@/components/sections/ProductListSection/ProductListSection";
import { BreadcrumbSection } from "@/components/sections/BreadcrumbSection/BreadcrumbSection";
import { BannerSection } from "@/components/sections/BannerSection/BannerSection";
import { CouponsSection } from "@/components/sections/CouponsSection/CouponsSection";
import { RecentSection } from "@/components/sections/RecentSection/RecentSection";

export const ProductListScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      {/* main */}
      <main>
        <BreadcrumbSection />
        <BannerSection />
        {/* <CouponsSection /> */}
        <ProductListSection />
        {/* <RecentSection /> */}
      </main>
      <FooterSection />
    </div>
  );
};
