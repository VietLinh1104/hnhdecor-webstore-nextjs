"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { ColorType } from "@/types"; // ✅ Import interface đúng cách

export const ProductDetailSection = (): JSX.Element => {
  const product = {
    id: 1,
    category: "Ghế Sofa",
    name: "Sofa Băng Phòng Khách Truyền Thống QP115",
    brand: "EGA Furniture",
    sku: "SFO011",
    originalPrice: 62400000,
    discount: 50,
    status: "Bán chạy",
    colors: [
      {
        color: "#d4d4d4",
        image: [
          "/melaniecanape3placesgirsclaire-4-13.png",
          "/melaniecanape3placesgirsclaire-1-5.png",
        ],
      },
      {
        color: "#333",
        image: ["/melaniecanape3placesgirsclaire-1-10.png"],
      },
      {
        color: "#966",
        image: ["/melaniecanape3placesgirsclaire-1-12.png"],
      },
      {
        color: "#ccc",
        image: ["/melaniecanape3placesgirsclaire-4-13.png"],
      },
      {
        color: "#eed",
        image: ["/melaniecanape3placesgirsclaire-1-5.png"],
      },
    ],
    codeCoupon: ["EGAFREESHIP", "GIAM50K", "GIAM30", "GIAM40"],
  };

  const formatVND = (value: number): string =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const price = product.originalPrice * (1 - product.discount / 100);
  const saveAmount = product.originalPrice - price;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const allImages = product.colors.flatMap((color) =>
    color.image.map((img) => ({ url: img, color: color.color }))
  );
  const [mainImage, setMainImage] = useState(allImages[0].url);

  // Hàm xử lý khi click vào màu sắc
  const handleColorChange = (colorObj: ColorType) => {
    setSelectedColor(colorObj);
    // Tự động chuyển ảnh chính sang ảnh đầu tiên của màu được chọn
    setMainImage(colorObj.image[0]);
  };

  // Hàm xử lý tăng số lượng
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Hàm xử lý giảm số lượng
  const handleDecreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT: THUMBNAILS + MAIN IMAGE */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-4">
          {allImages.map((thumbObj, index) => (
            <Image
              key={index}
              src={thumbObj.url}
              alt={`Thumbnail ${index}`}
              width={70}
              height={70}
              onClick={() => setMainImage(thumbObj.url)}
              className={`w-[70px] h-[70px] object-cover border rounded cursor-pointer transition-all duration-200 ${
                thumbObj.url === mainImage
                  ? "border-orange-500"
                  : "border-gray-300"
              } ${
                thumbObj.color === selectedColor.color
                  ? "ring-2 ring-orange-300"
                  : ""
              }`}
            />
          ))}
        </div>

        <div className="flex-1 flex items-start justify-center">
          <Image
            src={mainImage}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain transition-all duration-300"
          />
        </div>
      </div>

      {/* RIGHT: PRODUCT DETAILS */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        <div className="flex items-center gap-2 text-yellow-500 text-sm">
          {"★★★★★"}
        </div>

        <div className="text-gray-500 text-sm">
          Thương hiệu: <span className="text-black hover cursor-pointer hover:text-[#EC720E]">{product.brand}</span> &nbsp;
          Mã sản phẩm: <span className="text-black hover cursor-pointer hover:text-[#EC720E]">{product.sku}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-red-600 text-xl font-semibold">
            {formatVND(price)}
          </span>
          <span className="line-through text-gray-500">
            {formatVND(product.originalPrice)}
          </span>
          <Badge className="bg-[#ed4343] text-white">-{product.discount}%</Badge>
        </div>

        <div className="text-sm text-gray-500">
          (Tiết kiệm{" "}
          <span className="text-red-600 font-medium">
            {formatVND(saveAmount)}
          </span>)
        </div>

        <div>
          <Badge variant="outline" className="border-orange-500 text-orange-600">
            {product.status}
          </Badge>
        </div>

        <div className="border border-dashed p-4 rounded">
          <p className="text-sm font-semibold mb-1">🎁 KHUYẾN MÃI - ƯU ĐÃI</p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>
              Nhập mã <b>EGANY</b> thêm 5% đơn hàng{" "}
              <span className="text-red-500 cursor-pointer">Sao chép</span>
            </li>
            <li>Miễn phí Ship cho đơn hàng từ 300.000₫</li>
            <li>Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì</li>
          </ul>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {product.codeCoupon.map((code) => (
            <Badge
              key={code}
              className="bg-orange-100 cursor-pointer hover:bg-orange-600 hover:text-white text-orange-600 border border-orange-300 px-3"
            >
              {code}
            </Badge>
          ))}
        </div>

        <div className="text-sm">
          <span className="font-semibold">Màu sắc:</span>
        </div>
        <div className="flex items-center gap-3">
          {product.colors.map((c, index) => (
            <div
              key={index}
              onClick={() => handleColorChange(c)}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all duration-200 ${
                selectedColor.color === c.color
                  ? "border-orange-500 scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: c.color }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button 
            onClick={handleDecreaseQuantity}
            className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button 
            onClick={handleIncreaseQuantity}
            className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>

        <div className="flex gap-4 mt-6">
          <Button variant="outline" className="flex-1">
            THÊM VÀO GIỎ
          </Button>
          <Button className="flex-1 bg-black text-white hover:bg-orange-600">
            MUA NGAY
          </Button>
        </div>

        <div className="text-sm text-gray-700 mt-2">
          Gọi đặt mua{" "}
          <span className="text-orange-600 font-bold">1800.0000</span> (7:30 - 22:00)
        </div>
      </div>
    </section>
  );
};