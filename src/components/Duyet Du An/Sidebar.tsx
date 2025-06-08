"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f3e88bfa9ae998efe3390d97326af3323f959e8e?placeholderIfAbsent=true",
    label: "Thông tin cá nhân",
    path: "/profile2",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/548976d608c31c0e145581e31116c4038add5580?placeholderIfAbsent=true",
    label: "Phê duyệt dự án",
    path: "/duyetduan",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/d38d4b1c84f38a455b7414f2cde8d2b58b8911d5?placeholderIfAbsent=true",
    label: "Danh sách NHH",
    path: "/danhsachnhh",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/08232af02813e185a2f8fc37b028087b250d5b28?placeholderIfAbsent=true",
    label: "Đăng Xuất",
    path: "/signin",
  },
];

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // Đồng bộ activeIndex với URL hiện tại
  useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = navigationItems.findIndex(item => item.path === currentPath);
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
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
                  style={index === activeIndex ? {
                    filter: "invert(16%) sepia(93%) saturate(3015%) hue-rotate(222deg) brightness(97%) contrast(92%)"
                  } : {}}
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