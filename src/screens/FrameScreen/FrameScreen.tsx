import React from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ProductListCarousel } from "@/components/sections/ProductListCarousel/ProductListCarousel";
import { ProductCategorySection } from "@/components/sections/ProductCategorySection/ProductCategorySection";
import { BannerSliderSection } from "@/components/sections/BannerSliderSection/BannerSliderSection";

export const FrameScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      {/* main */}
      <main className="w-full">
        <BannerSliderSection />
        <ProductCategorySection />

        <ProductListCarousel categoryId="pcat_01K2WPHSXK4V2VH7BGSP8M0GQ9" title="Tượng trang trí" />
        <ProductListCarousel categoryId="pcat_01K2WPGJJQZD267354NPZG5Q8C" title="Trang Trí Phòng Khách" />
        <ProductListCarousel categoryId="pcat_01K2WP9FR6SP0H60JCKSB3XYAD" title="Quà Tặng Cao Cấp" />
        <ProductListCarousel categoryId="pcat_01K2WP8382579MCRTAXYVVAKSB" title="Trang Trí Để Bàn" />
        <ProductListCarousel categoryId="pcat_01K2WP690DEYZGWXKBGXW2VDQS" title="Giá Kệ Để Rượu" />
        <ProductListCarousel categoryId="pcat_01K2WP3Q2P2JQTVPJNHKBFH0WN" title="Đồng Hồ" />

      </main>
      <FooterSection />
    </div>
  );
};
