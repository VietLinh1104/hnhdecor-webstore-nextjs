"use client";

import React from "react";
import Link from "next/link";
import { X, Home, Package, Info, Phone, User, Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from "@/types";

interface MobileMenuSectionProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

const additionalMenuItems = [
  { 
    label: "Tài khoản", 
    href: "/", 
    icon: User,
    description: "Thông tin cá nhân"
  },
  { 
    label: "Đơn hàng", 
    href: "/", 
    icon: Package,
    description: "Theo dõi đơn hàng"
  },
  { 
    label: "Cài đặt", 
    href: "/", 
    icon: Settings,
    description: "Tùy chỉnh ứng dụng"
  },
];

const socialLinks = [
  { name: "Facebook", href: "#", icon: "/facebook-1.png" },
  { name: "Instagram", href: "#", icon: "/instagram-1.png" },
  { name: "TikTok", href: "#", icon: "/tiktok-1.png" },
  { name: "YouTube", href: "#", icon: "/youtube-1.png" },
];

export const MobileMenuSection = ({ 
  isOpen, 
  onClose, 
  menuItems 
}: MobileMenuSectionProps): JSX.Element => {
  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return <></>;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
        onClick={handleBackdropClick}
      >
        {/* Slide Menu */}
        <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#ec720e] to-orange-600">
            <div className="flex items-center gap-3">
              <img 
                className="h-8 object-cover" 
                alt="Logo" 
                src="/logo-white.svg" 
              />
              <div className="text-white">
                <h2 className="font-bold text-lg">H&H Decor</h2>
                <p className="text-sm opacity-90">Cửa hàng trang trí</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2"
            >
              <X size={24} />
            </Button>
          </div>

          {/* Navigation Menu */}
          <div className="py-4">
            <div className="px-6 pb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Danh mục chính
              </h3>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item, index) => {
                // Map icons for menu items
                const getIcon = (label: string) => {
                  switch(label.toLowerCase()) {
                    case 'trang chủ': return Home;
                    case 'sản phẩm': return Package;
                    case 'giới thiệu': return Info;
                    case 'liên hệ': return Phone;
                    default: return ChevronRight;
                  }
                };
                
                const IconComponent = getIcon(item.label);
                
                return (
                  <Link 
                    key={index}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <IconComponent 
                        size={20} 
                        className="text-gray-400 group-hover:text-[#ec720e] transition-colors" 
                      />
                      <span className="font-medium text-gray-700 group-hover:text-[#ec720e] transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="text-gray-300 group-hover:text-[#ec720e] transition-colors" 
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <Separator />

          {/* Additional Menu Items */}
          {/* <div className="py-4">
            <div className="px-6 pb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Tài khoản
              </h3>
            </div>

            <nav className="space-y-1">
              {additionalMenuItems.map((item, index) => {
                const IconComponent = item.icon;
                
                return (
                  <Link 
                    key={index}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <IconComponent 
                        size={20} 
                        className="text-gray-400 group-hover:text-[#ec720e] transition-colors" 
                      />
                      <div>
                        <span className="font-medium text-gray-700 group-hover:text-[#ec720e] transition-colors block">
                          {item.label}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="text-gray-300 group-hover:text-[#ec720e] transition-colors" 
                    />
                  </Link>
                );
              })}
            </nav>
          </div> */}

          <Separator />

          {/* Contact Info */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Liên hệ
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#ec720e]" />
                <span className="text-gray-700">
                  <a href="tel:033 7008360" className="hover:text-[#ec720e]">
                    033 7008360
                  </a>
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#ec720e]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="text-gray-700">
                  <a href="mailto:contact@hnhdecor.com" className="hover:text-[#ec720e]">
                    contact@hnhdecor.com
                  </a>
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Social Links */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Theo dõi chúng tôi
            </h3>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#ec720e] hover:scale-110 transition-all duration-200 group"
                >
                  <img 
                    src={social.icon}
                    alt={social.name}
                    className="w-5 h-5 group-hover:brightness-0 group-hover:invert transition-all duration-200"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 mt-auto">
            <div className="text-center text-xs text-gray-500">
              <p>© 2025 H&H Decor</p>
              <p>Designed with ❤️ in Vietnam</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};