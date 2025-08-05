"use client";

import React, { useState } from "react"; 
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
} from "@/components/ui/navigation-menu"; 
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import type { MenuItem } from "@/types"; 
import Link from 'next/link';
import { CartSidebarSection } from "@/components/sections/CartSidebarSection/CartSidebarSection";
import { MobileMenuSection } from "@/components/sections/MobileMenuSection/MobileMenuSection";
 
// ✅ Fix cứng dữ liệu menu 
const menuItem: MenuItem[] = [ 
  { label: "Trang chủ", href: "/" }, 
  { label: "Sản phẩm", href: "/product-list" }, 
  { label: "Giới thiệu", href: "/" }, 
  { label: "Liên hệ", href: "/" }, 
]; 
 
const icons = [ 
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <div className="font-bold text-white text-sm md:text-base text-center px-4"> 
          FREESHIP VỚI ĐƠN HÀNG TỪ 500K 
        </div> 
      </div> 
 
      {/* Header Main */} 
      <header className="sticky top-0 z-40 w-full bg-white shadow-md"> 
        <div className="flex items-center max-w-screen-2xl justify-between py-3 md:py-5 mx-auto px-4"> 
          
          {/* Mobile Menu Button - Only visible on mobile/tablet */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100"
            >
              <Menu size={24} className="text-gray-700" />
            </Button>
          </div>

          {/* Logo - Center on mobile, left on desktop */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center"> 
              <img 
                className="h-8 md:h-10 object-cover" 
                alt="Logo" 
                src="/logo-1.png" 
              /> 
            </Link>
          </div> 
 
          {/* Desktop Navigation - Hidden on mobile/tablet */} 
          <div className="hidden lg:block">
            <NavigationMenu> 
              <NavigationMenuList className="flex items-center gap-[30px] xl:gap-[50px]"> 
                {menuItem.map((item, index) => ( 
                  <NavigationMenuItem key={index}> 
                    <NavigationMenuLink 
                      href={item.href} 
                      className="font-medium text-black text-base hover:text-[#ec720e] transition-colors duration-200" 
                    > 
                      {item.label} 
                    </NavigationMenuLink> 
                  </NavigationMenuItem> 
                ))} 
              </NavigationMenuList> 
            </NavigationMenu>
          </div>
 
          {/* Icons - Always visible */} 
          <div className="flex items-center gap-3 md:gap-4"> 
            {icons.map((icon, index) => ( 
              icon.type === 'cart' ? (
                <div key={index} className="relative">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    onClick={(e) => handleIconClick(icon, e)}
                  >
                    <img 
                      className="w-6 h-6 md:w-7 md:h-7 object-cover" 
                      alt={icon.alt} 
                      src={icon.src}
                    />
                  </button>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </div>
              ) : (
                <Link href={icon.href} key={index}> 
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <img 
                      className="w-6 h-6 md:w-7 md:h-7 object-cover" 
                      alt={icon.alt} 
                      src={icon.src} 
                    /> 
                  </button>
                </Link> 
              )
            ))} 
          </div>
        </div> 

        {/* Mobile Search Bar - Optional */}
        <div className="lg:hidden border-t bg-gray-50 px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ec720e] focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <img 
                src="/icon-search-1.png" 
                alt="Search" 
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Component */}
      <MobileMenuSection
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItem}
      />

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