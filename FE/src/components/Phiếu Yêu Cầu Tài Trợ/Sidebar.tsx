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

const defaultNavigationItems: NavigationItem[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ae10dc620c8906cfd90d03e5e71cfd48ef8aa9d3?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
    label: "Trang chủ",
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
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6bcf550aa7a6ca95be38154c8d271e07a83ec2a4?placeholderIfAbsent=true&apiKey=c7bfdd715a654a2987e94b52aaf52c4a",
    label: "Tài trợ",
    active: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/08232af02813e185a2f8fc37b028087b250d5b28?placeholderIfAbsent=true",
    label: "Đăng Xuất",
  },
];

const defaultLogoUrl =
  "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f97f13d9cd69d09e5640a65bf4466139ca5ca8ae?placeholderIfAbsent=true";

const Sidebar: React.FC<SidebarProps> = ({
  navigationItems = defaultNavigationItems,
  logoUrl = defaultLogoUrl,
}) => {
  return (
    <aside className="w-[240px] h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header logo */}
      <header className="flex justify-center items-center h-[80px] border-b border-gray-200">
        <img
          src={logoUrl}
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
