"use client";
import * as React from "react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Tìm kiếm",
  className = "w-full max-w-md", // mặc định rộng tối đa 320px
  value,
  onChange,
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Icon tìm kiếm bên trái */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a0cb9fc4d074750f641a3da8446e3864a33de1b?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
          alt="Search icon"
          className="w-5 h-5 object-contain text-gray-400"
        />
      </div>
      {/* Input thật sự */}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
