import React from "react";

export const SearchInput = () => {
  return (
    <div className="w-full bg-black bg-opacity-0">
      <div className="flex gap-3 px-3 py-3.5 w-full rounded-lg border border-solid border-slate-200">
        <div className="flex overflow-hidden justify-center items-center min-h-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad108e5174ef3663889d74fbaf7e83b68c66c3b2?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
            alt="Search icon"
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
  );
};
