import React from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BreadcrumbSection } from "@/components/sections/BreadcrumbSection/BreadcrumbSection";
import { RecentSection } from "@/components/sections/RecentSection/RecentSection";
import { ProductDetailSection } from "@/components/sections/ProductDetailSection/ProductDetailSection";

export const ProductDetailScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      {/* main */}
      <main>
        <BreadcrumbSection />
        <ProductDetailSection />
        {/* <RecentSection /> */}
      </main>
      <FooterSection />
    </div>
  );
};
