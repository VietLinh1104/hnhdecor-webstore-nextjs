import React, { Suspense } from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BreadcrumbSection } from "@/components/sections/BreadcrumbSection/BreadcrumbSection";
// import { RecentSection } from "@/components/sections/RecentSection/RecentSection";
import { CheckoutSection } from "@/components/sections/CheckoutSection/CheckoutSection";

// Loading component cho checkout
const CheckoutLoading = () => (
  <div className="max-w-screen-2xl w-full mx-auto px-4 py-8">
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-3 border-[#ec720e] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg text-gray-600">Đang tải thông tin thanh toán...</span>
      </div>
    </div>
  </div>
);

export const CheckoutScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      {/* main */}
      <main>
        <BreadcrumbSection />
        
        <Suspense fallback={<CheckoutLoading />}>
          <CheckoutSection />
        </Suspense>

        {/* <RecentSection /> */}
      </main>
      
      <FooterSection />
    </div>
  );
};