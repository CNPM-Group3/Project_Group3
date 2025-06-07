"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full h-[80px] px-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
      {/* Search bar */}
      <div className="flex items-center w-[360px] rounded-lg border border-gray-200 px-3 py-2 bg-gray-100">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/740dad832ca79bca37bd5f3a73439f4f8e85fbee?placeholderIfAbsent=true"
          alt="Search"
          className="w-4 h-4"
        />
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="ml-2 w-full text-sm bg-transparent outline-none placeholder-gray-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {[
          "d4308a9543181854386bcef9853af2856a4b2178",
          "3d1f4e353546c9f947947d160ff6a591418dbf88",
          "5e25024e4219b8851c756c079f9faf87bf7cc28a",
        ].map((id, idx) => (
          <img
            key={idx}
            src={`https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/${id}?placeholderIfAbsent=true`}
            alt={`Menu ${idx + 1}`}
            className="w-10 h-10 object-contain"
          />
        ))}
      </div>
    </header>
  );
};

export default Header;