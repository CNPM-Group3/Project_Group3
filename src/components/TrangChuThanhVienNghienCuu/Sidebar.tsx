"use client";

import React from "react";

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/c2254af2fb19b76bb45058bb3dd09a66ce195e39?placeholderIfAbsent=true",
    label: "Trang chủ",
    active: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f3e88bfa9ae998efe3390d97326af3323f959e8e?placeholderIfAbsent=true",
    label: "Thông tin cá nhân",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/548976d608c31c0e145581e31116c4038add5580?placeholderIfAbsent=true",
    label: "Dự án",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dae94ba2cd9a9672a4bd4c0e474ec122f58df427?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
    label: "Tài trợ",
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
