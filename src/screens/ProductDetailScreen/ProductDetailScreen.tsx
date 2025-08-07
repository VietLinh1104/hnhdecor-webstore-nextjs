import React from "react";
import { HeaderNavbarSection } from "@/components/sections/HeaderNavbarSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BreadcrumbSection } from "@/components/sections/BreadcrumbSection/BreadcrumbSection";
// import { RecentSection } from "@/components/sections/RecentSection/RecentSection";
import { ProductDetailSection } from "@/components/sections/ProductDetailSection/ProductDetailSection";
// import { ProductDescriptionSection } from "@/components/sections/ProductDescriptionSection/ProductDescriptionSection";


type Props = {
  documentId: string;
};

export const ProductDetailScreen = ({ documentId }: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <HeaderNavbarSection />

      {/* main */}
      {/* documentId={documentId} */}
      <main>
        <BreadcrumbSection />
        <ProductDetailSection productId={documentId}/>
       
        {/* <RecentSection /> */}
      </main>
      <FooterSection />
    </div>
  );
};
