"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";
import { SystemConfigCard } from "@cnpm/components/QuanTriVien/SystemConfigCard";

interface DashboardQuanTriVienProps {
  userRole: string; // Example prop: role of the logged-in user
}

export default function DashboardQuanTriVien({
  userRole
}: DashboardQuanTriVienProps) {
  // You might use userRole here to conditionally render content or features
  console.log("Accessing DashboardQuanTriVien with role:", userRole);

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
    // TODO: Implement role change logic
    console.log("Role changed to:", newRole);
  };

  const handleThemeChange = (newMode: string) => {
    setThemeMode(newMode);
    // TODO: Implement theme change logic
    console.log("Theme changed to:", newMode);
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen w-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 fixed h-full">
          <Sidebar />
        </aside>

        {/* Main content */}
        <section className="flex-1 flex flex-col ml-64">
          <div className="fixed w-full z-10">
            <Header />
          </div>
          <main className="flex-1 p-6 overflow-y-auto mt-16 bg-gray-50">
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
          </main>
        </section>
      </div>
    </MainLayout>
  );
}
