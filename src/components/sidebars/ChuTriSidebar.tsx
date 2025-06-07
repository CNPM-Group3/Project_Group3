"use client";

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationItem {
  icon: string;
  label: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f3e88bfa9ae998efe3390d97326af3323f959e8e?placeholderIfAbsent=true",
    label: "Thông tin cá nhân",
    path: "/profile"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a23bc1452b11f050133faef30aa2efd8a14544f3?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
    label: "Phê duyệt dự án",
    path: "/duyetduan"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/d38d4b1c84f38a455b7414f2cde8d2b58b8911d5?placeholderIfAbsent=true",
    label: "Danh sách NHH",
    path: "/"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/08232af02813e185a2f8fc37b028087b250d5b28?placeholderIfAbsent=true",
    label: "Đăng Xuất",
    path: "/signin"
  }
];

const ChuTriSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (path === "/signin") {
      // Xử lý đăng xuất
      localStorage.removeItem("user");
    }
    navigate(path);
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
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all group ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-slate-600 hover:bg-gray-100"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`w-5 h-5 object-contain transition-all ${
                    location.pathname === item.path
                      ? "brightness-0 saturate-100 invert-[0.3] sepia-[0.5] saturate-[3.5] hue-rotate-[190deg] brightness-[0.9]"
                      : "group-hover:brightness-0 group-hover:saturate-100 group-hover:invert-[0.3] group-hover:sepia-[0.5] group-hover:saturate-[3.5] group-hover:hue-rotate-[190deg] group-hover:brightness-[0.9]"
                  }`}
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

export default ChuTriSidebar;