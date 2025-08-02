// CouponsSection.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Coupon } from "@/types/Types";

export const CouponsSection = (): JSX.Element => {
  const coupons: Coupon[] = [
    {
      discount: "Giảm 30%",
      category: "Nội thất",
      code: "GIAM30",
      expiry: "09/06/2024",
      image: "/coupon-3-img-1-3.png",
      outdatedImage: "/outdated-1-3.png",
    },
    {
      discount: "Giảm 30%",
      category: "Nội thất",
      code: "GIAM30",
      expiry: "09/06/2024",
      image: "/coupon-3-img-1-3.png",
      outdatedImage: "/outdated-1-3.png",
    },
    {
      discount: "Giảm 30%",
      category: "Nội thất",
      code: "GIAM30",
      expiry: "09/06/2024",
      image: "/coupon-3-img-1-3.png",
      outdatedImage: "/outdated-1-3.png",
    },
    {
      discount: "Giảm 30%",
      category: "Nội thất",
      code: "GIAM30",
      expiry: "09/06/2024",
      image: "/coupon-3-img-1-3.png",
      outdatedImage: "/outdated-1-3.png",
    },
  ];

  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start px-4">
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 w-full">
        {coupons.map((coupon, index) => (
          <div key={index} className="flex items-center">
            {/* Left image section (bỏ border) */}
            <div className="flex flex-col items-center justify-center pl-2.5 pr-0 py-0 self-stretch bg-[#ec720e] rounded-[10px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]">
              <div className="flex flex-col items-center justify-center flex-1 grow bg-white">
                <div className="flex items-center gap-2.5 px-2.5 py-0 border-r border-dashed border-white/50">
                  <img
                    className="w-14 h-14 object-cover"
                    alt="Coupon img"
                    src={coupon.image}
                  />
                </div>
              </div>
            </div>

            {/* Right content (bỏ border) */}
            <Card className="flex flex-col items-start gap-2.5 p-2.5 px-8 rounded-[10px] border-none shadow-[0_0_10px_rgba(0,0,0,0.2)]">
              <CardContent className="p-0">
                <div className="flex flex-col items-start gap-0.5 w-full">
                  <div className="font-semibold text-black text-sm">
                    {coupon.discount}
                  </div>
                  <div className="text-xs">
                    <span className="text-[#00000073]">
                      Cho các sản phẩm trong{" "}
                    </span>
                    <span className="text-[#ec720e]">{coupon.category}</span>
                  </div>
                </div>

                <div className="flex justify-between gap-0.5 mt-2.5">
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="text-xs">
                      <span className="text-[#00000073]">Mã: </span>
                      <span className="text-black">{coupon.code}</span>
                    </div>
                    <div className="text-[#00000073] text-xs">
                      HSD: {coupon.expiry}
                    </div>
                  </div>
                  <img
                    className="w-[43px] h-8 object-cover"
                    alt="Outdated"
                    src={coupon.outdatedImage}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
