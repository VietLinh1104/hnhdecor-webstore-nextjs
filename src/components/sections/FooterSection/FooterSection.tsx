import React from "react";

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
  const customerSupportLinks = ["Giới thiệu", "Thông tin liên hệ", "Tra cứu cửa hàng"];

  // Policy links
  const policyLinks = ["Điều khoản dịch vụ", "Chính sách bảo mật", "Chính sách đổi trả"];

  // Social media icons
  const socialMediaIcons = [
    { name: "Tiktok", src: "/tiktok-1.png" },
    { name: "Instagram", src: "/instagram-1.png" },
    { name: "Facebook", src: "/facebook-1.png" },
    { name: "Zalo", src: "/zalo-1.png" },
  ];

  // Toạ độ cửa hàng (Bắc Ninh)
  const lat = 21.114129;
  const lng = 105.972018;
  const zoom = 16;

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
            )
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

            {/* Map column (thay cho Newsletter) */}
            <div className="flex flex-col items-start gap-6 sm:gap-8 lg:gap-[39px] relative sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col items-start gap-3 relative w-full">
                <h3 className="relative mt-[-1.00px] font-sans font-semibold text-white text-lg sm:text-xl tracking-[0] leading-[normal]">
                  BẢN ĐỒ CỬA HÀNG
                </h3>

                {/* Khung Google Map responsive 16:9 */}
                <div
                  className="relative w-full overflow-hidden rounded-2xl shadow-lg"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    title="H&H Decor - Bản đồ"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
                  />
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white underline underline-offset-4 hover:opacity-90"
                >
                  Mở trên Google Maps
                </a>
              </div>

              {/* Newsletter section - TẠM THỜI KHÔNG DÙNG
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
              */}
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
