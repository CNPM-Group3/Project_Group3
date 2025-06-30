import React, { useState, useEffect } from "react";

interface SearchInputProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  value?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  placeholder = "Tìm kiếm", 
  value = "",
  className = ""
}) => {
  const [searchValue, setSearchValue] = useState(value);

  // Sync with external value prop
  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(newValue);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={`w-full bg-black bg-opacity-0 ${className}`}>
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
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          className="flex-auto text-base text-gray-600 w-[329px] bg-transparent border-none outline-none placeholder-gray-400"
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};