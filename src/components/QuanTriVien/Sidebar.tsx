"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a7cb54bb69cb21dd255bf8a272f3a5c47796146?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
    label: "Cấu hình hệ thống",
    path: "/quantrivien",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f3e88bfa9ae998efe3390d97326af3323f959e8e?placeholderIfAbsent=true",
    label: "Quản lý vai trò người dùng",
    path: "/quantrivien1",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/226e99902e50dfa42a022fc320de71a0ac4b3ee4?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
    label: "Báo cáo & thống kê",
    path: "/quantrivien2",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/08232af02813e185a2f8fc37b028087b250d5b28?placeholderIfAbsent=true",
    label: "Đăng Xuất",
    path: "/signin",
  },
];

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Đồng bộ activeIndex với URL hiện tại
  useEffect(() => {
    const activeItemIndex = navigationItems.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveIndex(activeItemIndex === -1 ? 0 : activeItemIndex);
  }, [location.pathname]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    navigate(navigationItems[index].path);
  };

  return (
    <aside className="w-[240px] h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header logo */}
      <header className="flex justify-center items-center h-[80px] border-b border-gray-200">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f97f13d9cd69d09e5640a65bf4466139ca5ca8ae?placeholderIfAbsent=true"
          alt="Logo"
          className="w-[150px] object-contain"
        />
      </header>

      {/* Navigation */}
      <nav className="mt-4 px-3 flex-1">
        <ul className="space-y-1">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => handleClick(index)}
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${
                  index === activeIndex
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-slate-600 hover:bg-gray-100"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;