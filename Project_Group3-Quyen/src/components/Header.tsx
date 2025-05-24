"use client";

import React from "react";

const DashboardHeader: React.FC = () => {
  return (
    <header className="flex flex-col justify-center px-6 py-2 w-full border-b border-slate-200 max-md:pl-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="self-stretch my-auto w-96 min-w-60">
          <div className="flex gap-3 px-3 py-3.5 w-full rounded-lg border border-solid border-slate-200">
            <div className="flex overflow-hidden justify-center items-center min-h-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/740dad832ca79bca37bd5f3a73439f4f8e85fbee?placeholderIfAbsent=true"
                alt="Search"
                className="object-contain self-stretch my-auto w-4 aspect-square"
              />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="flex-auto text-base text-gray-400 w-[329px] bg-transparent border-none outline-none"
            />
          </div>
        </div>
        <nav className="flex gap-3.5 items-center self-stretch my-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/d4308a9543181854386bcef9853af2856a4b2178?placeholderIfAbsent=true"
            alt="Menu item 1"
            className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/3d1f4e353546c9f947947d160ff6a591418dbf88?placeholderIfAbsent=true"
            alt="Menu item 2"
            className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/5e25024e4219b8851c756c079f9faf87bf7cc28a?placeholderIfAbsent=true"
            alt="Menu item 3"
            className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
          />
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
