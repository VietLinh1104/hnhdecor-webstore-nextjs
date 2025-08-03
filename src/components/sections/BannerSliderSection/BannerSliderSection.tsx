"use client"
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const BannerSliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Banner data
  const banners = [
    {
      id: 1,
      title: "Bộ Sưu Tập Sofa Cao Cấp",
      subtitle: "Giảm giá lên đến 50%",
      description: "Khám phá những mẫu sofa hiện đại, sang trọng với chất lượng vượt trội",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      buttonText: "Mua Ngay",
      buttonLink: "/products/sofa",
      bgColor: "from-blue-600 to-purple-700"
    },
    {
      id: 2,
      title: "Nội Thất Phòng Khách Hiện Đại",
      subtitle: "Ưu đãi đặc biệt",
      description: "Tạo không gian sống hoàn hảo với các sản phẩm nội thất premium",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop",
      buttonText: "Khám Phá",
      buttonLink: "/products/living-room",
      bgColor: "from-green-600 to-teal-700"
    },
    {
      id: 3,
      title: "Đèn Trang Trí Cao Cấp",
      subtitle: "Mới ra mắt",
      description: "Làm sáng không gian sống với những mẫu đèn độc đáo và tinh tế",
      image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&h=600&fit=crop",
      buttonText: "Xem Chi Tiết",
      buttonLink: "/products/lighting",
      bgColor: "from-orange-600 to-red-700"
    },
    {
      id: 4,
      title: "Bàn Ghế Phòng Ăn Sang Trọng",
      subtitle: "Bộ sưu tập mới",
      description: "Tận hưởng bữa ăn gia đình với bộ bàn ghế đẹp và tiện nghi",
      image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&h=600&fit=crop",
      buttonText: "Mua Ngay",
      buttonLink: "/products/dining",
      bgColor: "from-purple-600 to-pink-700"
    }
  ];

  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentBanner = banners[currentSlide];

  return (
    <section className="relative w-full  lg:h-[600px] h-[400px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentBanner.image}
          alt={currentBanner.title}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        <div className={`absolute inset-0 bg-gradient-to-r  opacity-75`} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex lg:items-center pt-12 justify-between h-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text Content */}
        <div className="text-white max-w-2xl">
          <div className="mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium mb-4">
              {currentBanner.subtitle}
            </span>
          </div>
          
          <h1 className="text-xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight opacity-0 animate-fade-in-up" 
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {currentBanner.title}
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-0 animate-fade-in-up max-w-xl" 
             style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            {currentBanner.description}
          </p>
          
          <button className="bg-white text-gray-900 lg:px-8 px-4 py-2 lg:py-3 rounded-lg font-semibold text-base lg:text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            {currentBanner.buttonText}
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / banners.length) * 100}%` 
          }}
        />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};