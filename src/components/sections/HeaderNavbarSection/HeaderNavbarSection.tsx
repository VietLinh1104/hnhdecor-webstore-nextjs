// HeaderNavbarSection.tsx

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { MenuItem } from "@/types";
import Link from 'next/link'

// ✅ Fix cứng dữ liệu menu
const menuItem: MenuItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/product-detail" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

const icons = [
  {
    alt: 'Icon account',
    src: '/icon-account-1.png',
    href: '/account',
  },
  {
    alt: 'Icon cart',
    src: '/icon-cart-1.png',
    href: '/cart',
  },
  {
    alt: 'Icon search',
    src: '/icon-search-1.png',
    href: '/search',
  },
]


export const HeaderNavbarSection = (): JSX.Element => {
  return (
    <>
      {/* Banner FreeShip */}
      <div className="flex items-center justify-center w-full p-2.5 bg-[#ec720e]">
        <div className="font-bold text-white text-base  ">
          FREESHIP VỚI ĐƠN HÀNG TỪ 500K
        </div>
      </div>

      {/* Header Main */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex items-center max-w-screen-2xl justify-between py-5 mx-auto px-4">
          <Link href="/">
            <img
              className="h-10 object-cover"
              alt="Logo"
              src="/logo-1.png"
            />
          </Link>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-[50px]">
              {menuItem.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={item.href}
                    className="font-medium text-black text-base hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Icons */}
            <div className="flex items-center gap-4">
              {icons.map((icon, index) => (
                <Link href={icon.href} key={index}>
                  <img
                    className="w-7 h-7 object-cover cursor-pointer"
                    alt={icon.alt}
                    src={icon.src}
                  />
                </Link>
              ))}
            </div>
        </div>
      </header>
    </>
  );
};
