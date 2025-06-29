"use client";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ae10dc620c8906cfd90d03e5e71cfd48ef8aa9d3?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
      label: "Trang chủ",
      path: "/DashboardHDTD", // Đường dẫn của Hội Đồng Thẩm Định
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f3e88bfa9ae998efe3390d97326af3323f959e8e?placeholderIfAbsent=true",
      label: "Thông tin cá nhân",
      path: "/profile", // Sửa từ /profile3 thành /profile (route có sẵn)
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/226e99902e50dfa42a022fc320de71a0ac4b3ee4?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee",
      label: "Đánh giá dự án",
      path: "/hoidongthamdinh",
    },

    {
      icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/08232af02813e185a2f8fc37b028087b250d5b28?placeholderIfAbsent=true",
      label: "Đăng Xuất",
      action: handleLogout, // Sử dụng action thay vì path
    },
  ];

  // Đồng bộ activeIndex với URL
  useEffect(() => {
    const currentPath = location.pathname;
    let activeItemIndex = navigationItems.findIndex(
      (item) => item.path && currentPath === item.path
    );
    
    if (activeItemIndex === -1) {
      activeItemIndex = 0; // Mặc định là "Trang chủ"
    }
    
    setActiveIndex(activeItemIndex);
  }, [location.pathname]);

  // Xử lý click item
  const handleClick = (index: number) => {
    const item = navigationItems[index];
    
    if (item.action) {
      // Nếu có action (như đăng xuất), gọi action
      item.action();
    } else if (item.path) {
      // Nếu có path, navigate bình thường
      setActiveIndex(index);
      navigate(item.path);
    }
  };

  return (
    <aside className="w-[260px] h-screen bg-white border-slate-200/60 flex flex-col">
      {/* Header với logo */}
      <header className="flex justify-center items-center h-[80px] border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <div className="relative">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f97f13d9cd69d09e5640a65bf4466139ca5ca8ae?placeholderIfAbsent=true"
            alt="Logo"
            className="w-[160px] object-contain drop-shadow-sm"
          />
        </div>
      </header>

      {/* Navigation */}
      <nav className="mt-6 px-4 flex-1">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = item.path && index === activeIndex;
            const isLogout = item.action && !item.path;
            
            return (
              <li key={index}>
                <div
                  onClick={() => handleClick(index)}
                  className={`group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]"
                      : isLogout
                      ? "text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-100 hover:border-red-200"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-md hover:transform hover:scale-[1.01]"
                  }`}
                >
                  {/* Background gradient hiệu ứng */}
                  {!isActive && !isLogout && (
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                  
                  {/* Icon container */}
                  <div className={`relative flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-white/20 shadow-inner" 
                      : isLogout
                      ? "bg-red-50 group-hover:bg-red-100"
                      : "bg-slate-100 group-hover:bg-white group-hover:shadow-sm"
                  }`}>
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`w-5 h-5 object-contain transition-all duration-200 ${
                        isActive ? "brightness-0 invert" : isLogout ? "filter-none" : "group-hover:scale-110"
                      }`}
                    />
                  </div>
                  
                  {/* Label */}
                  <span className={`relative text-sm font-medium transition-all duration-200 ${
                    isActive ? "text-white" : ""
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full shadow-sm animate-pulse" />
                  )}
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
