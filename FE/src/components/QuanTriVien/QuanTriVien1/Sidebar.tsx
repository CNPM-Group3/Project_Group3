"use client";

import React from "react";

interface NavigationItem {
  icon: string;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  navigationItems?: NavigationItem[];
  logoUrl?: string;
}

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0c84591682f06cf8546d773fae5c47ed653898fb?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
    label: "Cấu hình hệ thống",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/05adf550ab44c7ac281beec46de5aa8966845517?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
    label: "Quản lý vai trò người dùng",
    active: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/226e99902e50dfa42a022fc320de71a0ac4b3ee4?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
    label: "Báo cáo & thống kê",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/e84f75a28ad473788606c62583a5fed72ab176a5?placeholderIfAbsent=true",
    label: "Cài Đặt",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/08232af02813e185a2f8fc37b028087b250d5b28?placeholderIfAbsent=true",
    label: "Đăng Xuất",
  },
];

const Sidebar: React.FC = () => {
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
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${
                  item.active
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
