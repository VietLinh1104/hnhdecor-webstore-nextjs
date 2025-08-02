// HeaderNavbarSection.tsx 

"use client";

import React, { useState } from "react"; 
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
} from "@/components/ui/navigation-menu"; 
import type { MenuItem } from "@/types"; 
import Link from 'next/link';
import { CartSidebarSection } from "@/components/sections/CartSidebarSection/CartSidebarSection";
 
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
    type: 'link'
  }, 
  { 
    alt: 'Icon cart', 
    src: '/icon-cart-1.png', 
    href: '/cart',
    type: 'cart'
  }, 
  { 
    alt: 'Icon search', 
    src: '/icon-search-1.png', 
    href: '/search',
    type: 'link'
  }, 
];

// Mock data cho giỏ hàng
const mockCartItems = [
  {
    id: 1,
    name: "Sofa Băng Phòng Khách Truyền Thống QP115",
    image: "/melaniecanape3placesgirsclaire-4-13.png",
    price: 31200000,
    originalPrice: 62400000,
    quantity: 1,
    color: "#d4d4d4"
  },
  {
    id: 2,
    name: "Ghế Armchair Hiện Đại",
    image: "/melaniecanape3placesgirsclaire-1-5.png",
    price: 15600000,
    originalPrice: 26000000,
    quantity: 2,
    color: "#333"
  }
];
 
 
export const HeaderNavbarSection = (): JSX.Element => { 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);

  // Tính tổng số lượng sản phẩm
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Xử lý tăng số lượng sản phẩm
  const handleIncreaseQuantity = (id: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Xử lý giảm số lượng sản phẩm
  const handleDecreaseQuantity = (id: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // Xử lý xóa sản phẩm
  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Xử lý click icon
  const handleIconClick = (icon: typeof icons[0], e: React.MouseEvent) => {
    if (icon.type === 'cart') {
      e.preventDefault();
      setIsCartOpen(true);
    }
  };

  return ( 
    <> 
      {/* Banner FreeShip */} 
      <div className="flex items-center justify-center w-full p-2.5 bg-[#ec720e]"> 
        <div className="font-bold text-white text-base"> 
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
              icon.type === 'cart' ? (
                <div key={index} className="relative">
                  <img 
                    className="w-7 h-7 object-cover cursor-pointer hover:opacity-70 transition-opacity" 
                    alt={icon.alt} 
                    src={icon.src}
                    onClick={(e) => handleIconClick(icon, e)}
                  />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              ) : (
                <Link href={icon.href} key={index}> 
                  <img 
                    className="w-7 h-7 object-cover cursor-pointer hover:opacity-70 transition-opacity" 
                    alt={icon.alt} 
                    src={icon.src} 
                  /> 
                </Link> 
              )
            ))} 
          </div>
        </div> 
      </header>

      {/* Cart Sidebar Component */}
      <CartSidebarSection
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </> 
  ); 
};