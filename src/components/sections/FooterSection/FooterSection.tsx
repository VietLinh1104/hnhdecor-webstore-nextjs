//MainContentSection.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const FooterSection = (): JSX.Element => {
  // Company information data
  const companyInfo = [
    "Thương hiệu nội thất uy tín và chất lượng, cam kết mang đến những trải nghiệm mua sắm tiện lợi, hiện đại và phong phú",
    "Mã số thuế: 12345678999",
    "Địa chỉ: 70 Lu Gia, District 11, Ho Chi Minh City",
    {
      label: "Số điện thoại: ",
      value: "19006750",
      isLink: true,
      href: "tel:19006750",
    },
    "Email: support@sapo.vn",
  ];

  // Customer support links
  const customerSupportLinks = [
    "Giới thiệu",
    "Thông tin liên hệ",
    "Tra cứu cửa hàng",
    "Tư vấn nội thất theo phong thủy",
  ];

  // Policy links
  const policyLinks = [
    "Điều khoản dịch vụ",
    "Chính sách bảo mật",
    "Chính sách đổi trả",
    "Chính sách bảo mật",
  ];

  // Social media icons
  const socialMediaIcons = [
    { name: "Tiktok", src: "/tiktok-1.png" },
    { name: "Instagram", src: "/instagram-1.png" },
    { name: "Youtube", src: "/youtube-1.png" },
    { name: "Facebook", src: "/facebook-1.png" },
    { name: "Zalo", src: "/zalo-1.png" },
  ];

  return (
    <footer className="flex items-center justify-center relative self-stretch w-full flex-[0_0_auto] bg-[#292929]">
      <div className="flex w-full max-w-screen-2xl items-start justify-center gap-[108px] px-4 py-20 relative">
        {/* Company information column */}
        <div className="flex flex-col w-[330px] items-start gap-2.5 relative">
          <img
            className="relative w-[152px] h-[42px] object-cover"
            alt="Logo footer"
            src="/logo-footer-1.png"
          />

          <h2 className="relative self-stretch font-sans font-semibold text-white text-2xl tracking-[0] leading-[normal]">
            Siêu thị nội thất EGA
          </h2>

          {companyInfo.map((info, index) =>
            typeof info === "string" ? (
              <p
                key={index}
                className="relative self-stretch font-sans font-normal text-white text-base tracking-[0] leading-[normal]"
              >
                {info}
              </p>
            ) : (
              <p
                key={index}
                className="relative self-stretch font-sans font-normal text-white text-base tracking-[0] leading-[normal]"
              >
                <span className="font-sans font-normal text-white text-base tracking-[0]">
                  {info.label}
                </span>
                {info.isLink ? (
                  <a href={info.href} rel="noopener noreferrer" target="_blank">
                    <span className="underline">{info.value}</span>
                  </a>
                ) : (
                  <span>{info.value}</span>
                )}
              </p>
            ),
          )}
        </div>

        {/* Middle and right columns */}
        <div className="flex flex-col items-center justify-center gap-[50px] relative flex-1 grow">
          <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
            {/* Customer support column */}
            <div className="w-[325px] flex flex-col items-start gap-2.5 relative">
              <h3 className="relative self-stretch mt-[-1.00px] font-sans font-semibold text-white text-xl tracking-[0] leading-[normal]">
                HỖ TRỢ KHÁCH HÀNG
              </h3>

              {customerSupportLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative self-stretch font-sans font-normal text-white text-base tracking-[0] leading-[normal] hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Policy column */}
            <div className="w-[325px] flex flex-col items-start gap-2.5 relative">
              <h3 className="relative self-stretch mt-[-1.00px] font-sans font-semibold text-white text-xl tracking-[0] leading-[normal]">
                CHÍNH SÁCH
              </h3>

              {policyLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative self-stretch font-sans font-normal text-white text-base tracking-[0] leading-[normal] hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Newsletter and social media column */}
            <div className="flex flex-col w-[325px] items-start gap-[39px] relative">
              <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <h3 className="relative self-stretch mt-[-1.00px] font-sans font-semibold text-white text-xl tracking-[0] leading-[normal]">
                  ĐĂNG KÝ NHẬN TIN
                </h3>

                <p className="relative self-stretch font-sans font-normal text-white text-base tracking-[0] leading-[normal]">
                  Bạn muốn nhận khuyến mãi đặc biệt? Đăng ký ngay.
                </p>

                <div className="flex items-center justify-between w-full pl-5 pr-[3px] py-[3px] relative bg-white rounded-[54px]">
                  <Input
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    className="border-none shadow-none bg-transparent font-sans font-normal text-[#0000006b] text-base h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button className="bg-[#000000b8] hover:bg-black rounded-[43px] font-sans font-normal text-white text-base">
                    Đăng ký
                  </Button>
                </div>
              </div>

              {/* Social media icons */}
              <div className="flex w-[239px] items-center justify-between gap-[59px_94px] relative flex-[0_0_auto]">
                {socialMediaIcons.map((icon, index) => (
                  <a key={index} href="#" aria-label={icon.name}>
                    <img
                      className="relative w-9 h-9 object-cover"
                      alt={icon.name}
                      src={icon.src}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
            <img
              className="relative w-[301px] h-9 object-cover"
              alt="Footer trustbadge"
              src="/footer-trustbadge-1.png"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
