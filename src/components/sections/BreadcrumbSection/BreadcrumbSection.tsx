//ProductListSection.tsx

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

export const BreadcrumbSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start pt-2 px-4">
      {/* Breadcrumb */}
      <Breadcrumb className="flex items-center gap-2.5 py-1 w-full bg-white">
        <BreadcrumbItem>
          <BreadcrumbLink className="  font-normal text-black text-base">
            Sản phẩm
          </BreadcrumbLink>
        </BreadcrumbItem>
        <span className="  font-normal text-black text-base">
          /
        </span>
        <BreadcrumbItem>
          <BreadcrumbLink className="  font-bold text-black text-base">
            Tất cả sản phẩm
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </section>
  );
};
