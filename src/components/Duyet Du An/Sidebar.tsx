"use client";

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Xử lý đăng xuất
  const handleLogout = () => {
    // Xóa token và tất cả dữ liệu session TRƯỚC KHI navigate
    sessionStorage.removeItem('accessToken');
    sessionStorage.clear();
    
    // Sau đó mới navigate đến trang đăng nhập
    navigate('/signin');
  };

  // Danh sách navigation items
  const navigationItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f3e88bfa9ae998efe3390d97326af3323f959e8e?placeholderIfAbsent=true",
      label: "Thông tin cá nhân",
      path: "/profile2",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a23bc1452b11f050133faef30aa2efd8a14544f3?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
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
      action: handleLogout, // Sử dụng action thay vì path
    },
  ];

  // Xử lý click item
  const handleItemClick = (item: any) => {
    if (item.action) {
      // Nếu có action (như đăng xuất), gọi action
      item.action();
    } else if (item.path) {
      // Nếu có path, navigate bình thường
      navigate(item.path);
    }
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
          {navigationItems.map((item, index) => {
            // Chỉ check active cho items có path (không phải action)
            const isActive = item.path && location.pathname === item.path;

            return (
              <li key={index}>
                <div
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${
                    isActive
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
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;