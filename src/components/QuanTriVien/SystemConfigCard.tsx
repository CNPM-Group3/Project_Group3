"use client";

import React, { useState } from "react";

// Types
interface NavigationItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

interface SidebarNavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

// NavigationItem Component
export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  isActive,
}) => {
  const baseClasses = "flex gap-3 py-3 px-4 rounded-lg w-full";
  const activeClasses = isActive ? "bg-blue-50" : "bg-black bg-opacity-0";
  const textClasses = isActive ? "text-blue-600" : "text-slate-600";

  return (
    <li className="mt-1.5">
      <div className={`${baseClasses} ${activeClasses}`}>
        <div className="flex overflow-hidden justify-center items-center min-h-4">
          <img
            src={icon}
            className="object-contain self-stretch my-auto w-4 aspect-square"
            alt=""
          />
        </div>
        <span className={`text-base font-semibold ${textClasses}`}>
          {label}
        </span>
      </div>
    </li>
  );
};

// SidebarNavItem Component
export function SidebarNavItem({ icon, label, isActive }: SidebarNavItemProps) {
  const baseClasses = "flex gap-3 p-4 mt-1.5 w-full";
  const activeClasses = isActive
    ? "bg-blue-50 rounded-lg"
    : "bg-black bg-opacity-0";
  const textClasses = isActive ? "text-blue-600" : "text-slate-600";

  return (
    <li className={`${baseClasses} ${activeClasses}`}>
      <div className="flex overflow-hidden justify-center items-center min-h-4">
        <img
          src={icon}
          alt=""
          className="object-contain self-stretch my-auto w-4 aspect-square"
        />
      </div>
      <span
        className={`grow shrink w-40 text-base font-semibold leading-none ${textClasses}`}
      >
        {label}
      </span>
    </li>
  );
}

// SystemConfigCard Component
export function SystemConfigCard() {
  const [defaultRole, setDefaultRole] = useState("Sinh viên");
  const [themeMode, setThemeMode] = useState("Sáng");

  const roles = ["Sinh viên", "Giảng viên", "Nhân viên", "Quản trị viên"];
  const modes = ["Sáng", "Tối"];

  return (
    <section className="flex flex-col gap-9 px-5 w-full max-w-[1095px]">
      {/* Tiêu đề */}
      <header className="flex items-center px-5 py-2.5 text-base font-semibold text-black rounded-xl border border-slate-200 shadow-sm min-h-[46px]">
        <h1 className="w-full">Cấu hình hệ thống</h1>
      </header>

      {/* Nội dung */}
      <div className="px-5 py-5 border border-slate-200 rounded-xl shadow-sm bg-white">
        <div className="flex gap-5 max-md:flex-col">
          {/* Cột trái - Nhãn */}
          <div className="w-[59%] max-md:w-full">
            <dl className="flex flex-col gap-7 text-base font-medium text-slate-500">
              <dt className="py-1.5">Thời hạn hệ thống</dt>
              <dt className="py-1.5">Email hệ thống</dt>
              <dt className="py-1.5">SMTP Server</dt>
              <dt className="py-1.5">Quyền hạn mặc định</dt>
              <dt className="pb-1.5">Giao diện hệ thống</dt>
            </dl>
          </div>

          {/* Cột phải - Giá trị */}
          <div className="w-[41%] max-md:w-full">
            <dl className="flex flex-col gap-7 mt-[6px] text-base text-black">
              <dd className="py-1.5">01/01/2025 - 30/06/2025</dd>
              <dd className="py-1.5">system@domain.edu.vn</dd>
              <dd className="py-1.5">smtp.domain.edu.vn</dd>

              {/* Dropdown quyền hạn */}
              <dd className="flex items-center py-1.5">
                <select
                  value={defaultRole}
                  onChange={(e) => setDefaultRole(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </dd>

              {/* Dropdown giao diện */}
              <dd className="flex items-center py-1.5">
                <select
                  value={themeMode}
                  onChange={(e) => setThemeMode(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {modes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Dashboard Component with demo
export default function NavigationSystemDashboard() {
  const [activeNav, setActiveNav] = useState(0);
  const [activeSidebar, setActiveSidebar] = useState(1);

  // Sample navigation items
  const navigationItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/XXXXXXXX/icon1.png",
      label: "Trang chủ"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/XXXXXXXX/icon2.png",
      label: "Quản lý người dùng"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/XXXXXXXX/icon3.png",
      label: "Cấu hình hệ thống"
    }
  ];

  const sidebarItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/XXXXXXXX/sidebar1.png",
      label: "Dashboard"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/XXXXXXXX/sidebar2.png",
      label: "Báo cáo"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/XXXXXXXX/sidebar3.png",
      label: "Thiết lập"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Navigation Menu
          </h2>
          <ul className="space-y-1">
            {navigationItems.map((item, index) => (
              <div key={index} onClick={() => setActiveNav(index)}>
                <NavigationItem
                  icon={item.icon}
                  label={item.label}
                  isActive={activeNav === index}
                />
              </div>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-700 mb-4">
            Sidebar Navigation
          </h3>
          <ul>
            {sidebarItems.map((item, index) => (
              <div key={index} onClick={() => setActiveSidebar(index)}>
                <SidebarNavItem
                  icon={item.icon}
                  label={item.label}
                  isActive={activeSidebar === index}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-full mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Hệ thống quản lý
          </h1>
          
          {/* System Config */}
          <SystemConfigCard />
        </div>
      </div>
    </div>
  );
}