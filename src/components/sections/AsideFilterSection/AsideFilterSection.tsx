//ProductListSection.tsx
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const AsideFilterSection = (): JSX.Element => {

  // Filter categories
  const filterCategories = [
    {
      title: "Thương hiệu",
      options: [
        { label: "Tủ Giày - Tủ Trang Trí", checked: true },
        { label: "Tủ Kệ Tivi", checked: false },
        { label: "Ghế Sofa", checked: false },
        { label: "Khác", checked: false },
        { label: "LieMax", checked: false },
      ],
    },
    {
      title: "Thương hiệu",
      options: [
        { label: "Tủ Giày - Tủ Trang Trí", checked: false },
        { label: "Tủ Kệ Tivi", checked: false },
        { label: "Ghế Sofa", checked: false },
        { label: "Khác", checked: false },
        { label: "LieMax", checked: false },
      ],
    },
  ];

  return (
    <aside className="flex flex-col w-[360px] gap-[27px]">
      {filterCategories.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="flex flex-col items-start gap-[13px] w-full"
        >
          <h3 className="  font-normal text-black text-xl">
            {category.title}
          </h3>
          <div className="flex flex-col items-start gap-[5px]">
            {category.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center gap-2.5"
              >
                <Checkbox
                  id={`${categoryIndex}-${optionIndex}`}
                  className={`w-[15px] h-[15px] border-[0.5px] border-solid border-[#00000063] ${option.checked ? "bg-[#ec720e]" : ""}`}
                  checked={option.checked}
                />
                <label
                  htmlFor={`${categoryIndex}-${optionIndex}`}
                  className="  font-normal text-black text-base"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};
