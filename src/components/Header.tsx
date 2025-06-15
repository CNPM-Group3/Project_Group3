"use client";
import React, { useState } from "react";
import { Search, Bell, MessageCircle, User } from "lucide-react";

const Header: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="w-full h-20 px-6 bg-white shadow-sm border-b border-gray-100 flex items-center justify-between relative z-10">
      {/* Logo/Brand */}
      <div className="flex items-center justify-center">
        <div className="w-20 h-10 bg-gradient-to-br from-teal-300 to-teal-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">SRPM</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-lg mx-8">
        <div className={`relative flex items-center rounded-full border-2 transition-all duration-300 ${
          searchFocused 
            ? 'border-blue-500 shadow-lg shadow-blue-100' 
            : 'border-gray-200 hover:border-gray-300'
        } bg-gray-50 hover:bg-white`}>
          <div className="pl-4 pr-3">
            <Search className={`w-5 h-5 transition-colors duration-200 ${
              searchFocused ? 'text-blue-500' : 'text-gray-400'
            }`} />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 py-3 pr-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="pr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Notification */}
        <button className="relative p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group">
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Messages */}
        <button className="relative p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group">
          <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;