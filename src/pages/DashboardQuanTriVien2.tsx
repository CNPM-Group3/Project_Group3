"use client";
import * as React from "react";
import { useState } from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/QuanTriVien2/Sidebar";
import Header from "@cnpm/components/Header";
import { UserPerformanceChart } from "@cnpm/components/QuanTriVien/QuanTriVien2/UserPerformanceChart";
import { UserInteractionChart } from "@cnpm/components/QuanTriVien/QuanTriVien2/UserInteractionChart";
import { TimeFilter } from "@cnpm/components/QuanTriVien/QuanTriVien2/TimeFilter";
import { RoleFilter } from "@cnpm/components/QuanTriVien/QuanTriVien2/RoleFilter";
import { UserActivityLineChart } from "@cnpm/components/QuanTriVien/QuanTriVien2/UserActivityLineChart";

interface DashboardQuanTriVien2Props {
  userRole: string; // Example prop: role of the logged-in user
}

const availableRoles = ["Tất cả", "Sinh viên", "Giảng viên", "Nhân viên", "Quản trị viên"];
const availableTimeRanges = ["Hôm nay", "7 ngày", "30 ngày"];

const DashboardQuanTriVien2: React.FC<DashboardQuanTriVien2Props> = ({
  userRole
}) => {
  // You might use userRole here to conditionally render content or features
  console.log("Accessing DashboardQuanTriVien2 with role:", userRole);

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>("Hôm nay"); // Default to 'Hôm nay'

  const handleRoleSelect = (role: string | null) => {
    setSelectedRole(role);
    // TODO: Apply filter based on selected role
    console.log("Selected role:", role);
  };

  const handleTimeRangeSelect = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
    // TODO: Apply filter based on selected time range
    console.log("Selected time range:", timeRange);
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

          <main className="flex-1 p-6 overflow-y-auto mt-16">
            {/* Top Row - Two charts side-by-side */}
            <div className="flex flex-wrap gap-6 mb-6">

              {/* Thống kê người dùng theo vai trò Card (Donut Chart) */}
              <div className="bg-white rounded-xl shadow-md p-6 flex-1 min-w-[300px]">
                 <UserInteractionChart />
              </div>

              {/* Hiệu suất người dùng Card (Pie Chart) */}
              <div className="bg-white rounded-xl shadow-md p-6 flex-1 min-w-[300px]">
                <UserPerformanceChart />
              </div>

            </div>

            {/* Bottom Row - Tương tác người dùng Chart (Line Chart) */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 w-full">
              <UserActivityLineChart title="Tương tác người dùng" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6">
              <TimeFilter 
                timeRanges={availableTimeRanges}
                selectedTimeRange={selectedTimeRange}
                onSelectTimeRange={handleTimeRangeSelect}
              />
              <RoleFilter 
                roles={availableRoles}
                selectedRole={selectedRole}
                onSelectRole={handleRoleSelect}
              />
            </div>
          </main>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardQuanTriVien2;