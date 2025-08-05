"use client";

import React, { useState } from "react";

interface ProductDescriptionSectionProps {
  Description?: string | null;
  Attributes?: string | null;
}

export const ProductDescriptionSection = ({
  Description,
  Attributes,
}: ProductDescriptionSectionProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<"description" | "attributes">("description");
  const [isExpanded, setIsExpanded] = useState(false);

  const getLines = (text: string): string[] => {
    return text.split("\n").filter((line) => line.trim() !== "");
  };

  const renderContent = () => {
    const rawContent = activeTab === "description" ? Description : Attributes;

    if (!rawContent) {
      return <p className="text-gray-500">Đang cập nhật...</p>;
    }

    const lines = getLines(rawContent);
    const visibleLines = isExpanded ? lines : lines.slice(0, 5);

    return (
      <div className="space-y-2">
        {visibleLines.map((line, index) => (
          <p key={index} className="text-gray-800">
            {line}
          </p>
        ))}

        {lines.length > 5 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm text-orange-500 hover:underline"
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full col-span-2">
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => {
            setActiveTab("description");
            setIsExpanded(false); // reset khi đổi tab
          }}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "description"
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Mô tả sản phẩm
        </button>
        <button
          onClick={() => {
            setActiveTab("attributes");
            setIsExpanded(false);
          }}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "attributes"
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Thông số kỹ thuật
        </button>
      </div>

      {/* Nội dung */}
      <div className="prose max-w-none">{renderContent()}</div>
    </div>
  );
};
