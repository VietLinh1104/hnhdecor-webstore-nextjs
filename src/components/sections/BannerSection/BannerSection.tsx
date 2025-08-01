//ProductListSection.tsx

import React from "react";

export const BannerSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start">
      {/* Banner */}
      <div className="py-4 w-full">
        <img
          className="w-full h-[245px] object-cover"
          alt="Collection main"
          src="/collection-main-banner-1.png"
        />
      </div>
    </section>
  );
};
