"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Coupon } from "@/types";

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
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start px-2 sm:px-4 overflow-hidden">
      
      {/* Mobile: horizontal scroll */}
      <div className="sm:hidden w-full py-3">
        <div className="flex gap-3 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {coupons.map((coupon, index) => (
            <div key={index} className="flex items-center flex-shrink-0 w-[260px]">
              {/* Left image section */}
              <div className="flex flex-col items-center justify-center pl-2 pr-0 py-0 self-stretch bg-[#ec720e] rounded-l-[10px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                <div className="flex flex-col items-center justify-center flex-1 grow bg-white">
                  <div className="flex items-center gap-2 px-2 py-0 border-r border-dashed border-white/50">
                    <img
                      className="w-10 h-10 object-cover"
                      alt="Coupon img"
                      src={coupon.image}
                    />
                  </div>
                </div>
              </div>

              {/* Right content */}
              <Card className="flex flex-col items-start gap-2 p-2 px-4 rounded-r-[10px] border-none shadow-[0_0_10px_rgba(0,0,0,0.2)] flex-1">
                <CardContent className="p-0 w-full">
                  <div className="flex flex-col items-start gap-0.5 w-full">
                    <div className="font-semibold text-black text-xs">
                      {coupon.discount}
                    </div>
                    <div className="text-[10px]">
                      <span className="text-[#00000073]">
                        Cho các sản phẩm trong{" "}
                      </span>
                      <span className="text-[#ec720e]">{coupon.category}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end gap-1 mt-2">
                    <div className="flex flex-col items-start gap-0.5 flex-1">
                      <div className="text-[10px]">
                        <span className="text-[#00000073]">Mã: </span>
                        <span className="text-black font-medium">{coupon.code}</span>
                      </div>
                      <div className="text-[#00000073] text-[10px]">
                        HSD: {coupon.expiry}
                      </div>
                    </div>
                    <img
                      className="w-8 h-6 object-cover flex-shrink-0"
                      alt="Outdated"
                      src={coupon.outdatedImage}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet: 2 columns, Desktop: 4 columns */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 w-full">
        {coupons.map((coupon, index) => (
          <div key={index} className="flex items-center w-full">
            {/* Left image section */}
            <div className="flex flex-col items-center justify-center pl-2.5 pr-0 py-0 self-stretch bg-[#ec720e] rounded-l-[10px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]">
              <div className="flex flex-col items-center justify-center flex-1 grow bg-white">
                <div className="flex items-center gap-2.5 px-2.5 py-0 border-r border-dashed border-white/50">
                  <img
                    className="w-12 h-12 md:w-14 md:h-14 object-cover"
                    alt="Coupon img"
                    src={coupon.image}
                  />
                </div>
              </div>
            </div>

            {/* Right content */}
            <Card className="flex flex-col items-start gap-2.5 p-2.5 px-6 lg:px-8 rounded-r-[10px] border-none shadow-[0_0_10px_rgba(0,0,0,0.2)] flex-1">
              <CardContent className="p-0 w-full">
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

                <div className="flex justify-between items-end gap-0.5 mt-2.5">
                  <div className="flex flex-col items-start gap-0.5 flex-1">
                    <div className="text-xs">
                      <span className="text-[#00000073]">Mã: </span>
                      <span className="text-black font-medium">{coupon.code}</span>
                    </div>
                    <div className="text-[#00000073] text-xs">
                      HSD: {coupon.expiry}
                    </div>
                  </div>
                  <img
                    className="w-[43px] h-8 object-cover flex-shrink-0"
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