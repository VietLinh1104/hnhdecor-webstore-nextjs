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
import { useCart } from "@/contexts/CartContext";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart
} from "@/lib/api";
import { toast } from "react-toastify";

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

export const HeaderNavbarSection = (): JSX.Element => { 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, totalItems, isLoading, refreshCart, cartId } = useCart();

  const handleIncreaseQuantity = async (lineItemId: string) => {
    if (!cartId || isLoading) return;
    try {
      const currentItem = cartItems.find(item => item.id === lineItemId);
      if (!currentItem) return;
      await increaseItemQuantity(cartId, lineItemId, currentItem.quantity);
      await refreshCart();
    } catch (error) {
      console.error("Lỗi khi tăng số lượng sản phẩm:", error);
      toast.error("Không thể tăng số lượng sản phẩm. Vui lòng thử lại!");
    }
  };

  const handleDecreaseQuantity = async (lineItemId: string) => {
    if (!cartId || isLoading) return;
    try {
      const currentItem = cartItems.find(item => item.id === lineItemId);
      if (!currentItem) return;
      await decreaseItemQuantity(cartId, lineItemId, currentItem.quantity);
      await refreshCart();
    } catch (error) {
      console.error("Lỗi khi giảm số lượng sản phẩm:", error);
      toast.error("Không thể giảm số lượng sản phẩm. Vui lòng thử lại!");
    }
  };

  const handleRemoveItem = async (lineItemId: string) => {
    if (!cartId || isLoading) return;
    try {
      await removeItemFromCart(cartId, lineItemId);
      await refreshCart();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      toast.error("Không thể xóa sản phẩm. Vui lòng thử lại!");
    }
  };

  const handleIconClick = (icon: typeof icons[0], e: React.MouseEvent) => {
    if (icon.type === 'cart') {
      e.preventDefault();
      setIsCartOpen(true);
      refreshCart();
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
          {/* Mobile Menu Button */}
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

          {/* Logo */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center"> 
              <img 
                className="h-8 md:h-10 object-cover" 
                alt="Logo" 
                src="/logo-1.png" 
              /> 
            </Link>
          </div> 
 
          {/* Desktop Navigation */} 
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
 
          {/* Icons */} 
          <div className="flex items-center gap-3 md:gap-4"> 
            {icons.map((icon, index) => ( 
              icon.type === 'cart' ? (
                <div key={index} className="relative">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    onClick={(e) => handleIconClick(icon, e)}
                    disabled={isLoading}
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

        {/* Mobile Search Bar */}
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
        isLoading={isLoading}
      />
    </> 
  ); 
};