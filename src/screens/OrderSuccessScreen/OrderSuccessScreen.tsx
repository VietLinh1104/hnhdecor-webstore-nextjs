import React from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BreadcrumbSection } from "@/components/sections/BreadcrumbSection/BreadcrumbSection";
import { RecentSection } from "@/components/sections/RecentSection/RecentSection";
import { ProductDetailSection } from "@/components/sections/ProductDetailSection/ProductDetailSection";
import { OrderSuccessSection } from "@/components/sections/OrderSuccessSection/OrderSuccessSection";

export const OrderSuccessScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      {/* main */}
      <main>
        <BreadcrumbSection />

        <OrderSuccessSection />

        <RecentSection />
      </main>
      <FooterSection />
    </div>
  );
};
