import React from "react";

export const BannerSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-screen-2xl mx-auto items-start px-2">
      {/* Banner */}
      <div className="py-2 sm:py-3 md:py-4 w-full px-2 sm:px-4 md:px-0">
        <img
          className="w-full h-[150px] sm:h-[200px] md:h-[245px] object-cover rounded-lg sm:rounded-xl"
          alt="Collection main"
          src="/collection-main-banner-1.png"
        />
      </div>
    </section>
  );
};