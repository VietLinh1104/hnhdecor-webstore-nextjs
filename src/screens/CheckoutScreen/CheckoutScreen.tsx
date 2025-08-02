import React from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BreadcrumbSection } from "@/components/sections/BreadcrumbSection/BreadcrumbSection";
import { RecentSection } from "@/components/sections/RecentSection/RecentSection";
import { CheckoutSection } from "@/components/sections/CheckoutSection/CheckoutSection";

export const CheckoutScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      {/* main */}
      <main>
        <BreadcrumbSection />
        <CheckoutSection/>

        <RecentSection />
      </main>
      <FooterSection />
    </div>
  );
};
