import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const FooterSection = (): JSX.Element => {
  // Company information data
  const companyInfo = [
    "Thương hiệu đồ decor uy tín và chất lượng, cam kết mang đến những trải nghiệm mua sắm tiện lợi, hiện đại và phong phú",
    "Địa chỉ: Đường Nguyên Phi Ỷ Lan, Phường Từ Sơn, Bắc Ninh",
    {
      label: "Số điện thoại: ",
      value: "033 7008360",
      isLink: true,
      href: "tel:033 7008360",
    },
    "Email: contact@hnhdecor.com",
  ];

  // Customer support links
  const customerSupportLinks = [
    "Giới thiệu",
    "Thông tin liên hệ",
    "Tra cứu cửa hàng",
  ];

  // Policy links
  const policyLinks = [
    "Điều khoản dịch vụ",
    "Chính sách bảo mật",
    "Chính sách đổi trả",
  ];

  // Social media icons
  const socialMediaIcons = [
    { name: "Tiktok", src: "/tiktok-1.png" },
    { name: "Instagram", src: "/instagram-1.png" },
    { name: "Facebook", src: "/facebook-1.png" },
    { name: "Zalo", src: "/zalo-1.png" },
  ];

  return (
    <footer className="flex items-center justify-center relative self-stretch w-full flex-[0_0_auto] bg-[#292929] mt-28">
      <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl items-start justify-center gap-6 sm:gap-8 lg:gap-[108px] px-4 py-8 sm:py-12 lg:py-20 relative">
        
        {/* Company information column */}
        <div className="flex flex-col w-full lg:w-[330px] items-start gap-2.5 relative">
          <img
            className="relative w-[120px] sm:w-[140px] lg:w-[152px] h-auto object-cover"
            alt="Logo footer"
            src="/logo-white.svg"
          />

          <h2 className="relative self-stretch font-sans font-semibold text-white text-xl sm:text-2xl tracking-[0] leading-[normal]">
            H&H DECOR
          </h2>

          {companyInfo.map((info, index) =>
            typeof info === "string" ? (
              <p
                key={index}
                className="relative self-stretch font-sans font-normal text-white text-sm sm:text-base tracking-[0] leading-[normal]"
              >
                {info}
              </p>
            ) : (
              <p
                key={index}
                className="relative self-stretch font-sans font-normal text-white text-sm sm:text-base tracking-[0] leading-[normal]"
              >
                <span className="font-sans font-normal text-white text-sm sm:text-base tracking-[0]">
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

        {/* Middle and right columns container */}
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-[50px] relative flex-1 w-full">
          
          {/* Links section - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-0 lg:justify-between relative w-full">
            
            {/* Customer support column */}
            <div className="flex flex-col items-start gap-2.5 relative">
              <h3 className="relative mt-[-1.00px] font-sans font-semibold text-white text-lg sm:text-xl tracking-[0] leading-[normal]">
                HỖ TRỢ KHÁCH HÀNG
              </h3>

              {customerSupportLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative font-sans font-normal text-white text-sm sm:text-base tracking-[0] leading-[normal] hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Policy column */}
            <div className="flex flex-col items-start gap-2.5 relative">
              <h3 className="relative mt-[-1.00px] font-sans font-semibold text-white text-lg sm:text-xl tracking-[0] leading-[normal]">
                CHÍNH SÁCH
              </h3>

              {policyLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative font-sans font-normal text-white text-sm sm:text-base tracking-[0] leading-[normal] hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Newsletter and social media column */}
            <div className="flex flex-col items-start gap-6 sm:gap-8 lg:gap-[39px] relative sm:col-span-2 lg:col-span-1">
              
              {/* Newsletter section */}
              <div className="flex flex-col items-start gap-3 relative w-full">
                <h3 className="relative mt-[-1.00px] font-sans font-semibold text-white text-lg sm:text-xl tracking-[0] leading-[normal]">
                  ĐĂNG KÝ NHẬN TIN
                </h3>

                <p className="relative font-sans font-normal text-white text-sm sm:text-base tracking-[0] leading-[normal]">
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
              {/* <div className="flex items-center justify-start gap-4 sm:gap-6 lg:gap-4 relative w-full">
                {socialMediaIcons.map((icon, index) => (
                  <a key={index} href="#" aria-label={icon.name} className="flex-shrink-0">
                    <img
                      className="relative w-8 h-8 sm:w-9 sm:h-9 object-cover hover:opacity-80 transition-opacity"
                      alt={icon.name}
                      src={icon.src}
                    />
                  </a>
                ))}
              </div> */}
            </div>
          </div>

          {/* Trust badge */}
          {/* <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto] w-full">
            <img
              className="relative w-full max-w-[301px] h-auto object-cover"
              alt="Footer trustbadge"
              src="/footer-trustbadge-1.png"
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
};