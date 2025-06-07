"use client";
import React from "react";
import QuanTriVienSidebar from '@cnpm/components/sidebars/QuanTriVienSidebar';
import { SystemConfigCard } from "@cnpm/components/QuanTriVien/SystemConfigCard";

interface DashboardQuanTriVienProps {
  userRole: string;
}

export default function DashboardQuanTriVien({
  userRole
}: DashboardQuanTriVienProps) {
  // System configuration state
  const [defaultRole, setDefaultRole] = React.useState("Sinh viên");
  const [themeMode, setThemeMode] = React.useState("Sáng");

  // Available options
  const roles = ["Sinh viên", "Giảng viên", "Nhân viên", "Quản trị viên"];
  const modes = ["Sáng", "Tối"];

  // Mock data for system configuration
  const systemConfig = {
    timePeriod: "2024-2025",
    systemEmail: "system@ut.edu.vn",
    smtpServer: "smtp.ut.edu.vn",
  };

  // Handlers for configuration changes
  const handleRoleChange = (newRole: string) => {
    setDefaultRole(newRole);
    console.log("Role changed to:", newRole);
  };

  const handleThemeChange = (newMode: string) => {
    setThemeMode(newMode);
    console.log("Theme changed to:", newMode);
  };

  return (
    <div className="flex min-h-screen">
      <QuanTriVienSidebar />
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Cấu hình hệ thống</h1>
          <SystemConfigCard
            timePeriod={systemConfig.timePeriod}
            systemEmail={systemConfig.systemEmail}
            smtpServer={systemConfig.smtpServer}
            defaultRole={defaultRole}
            themeMode={themeMode}
            roles={roles}
            modes={modes}
            onRoleChange={handleRoleChange}
            onThemeChange={handleThemeChange}
          />
        </div>
      </div>
    </div>
  );
}
