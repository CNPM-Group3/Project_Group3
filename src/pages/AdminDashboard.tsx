"use client";

import React from "react";
import AdminSidebar from '@cnpm/components/sidebars/AdminSidebar';
import { UserTable } from "@cnpm/components/Admin/UserTable";
import { AddUserForm } from "@cnpm/components/Admin/AddUserForm";
import { ApprovalSection } from "@cnpm/components/Admin/ApprovalSection";
import { User, ApprovalRequest } from "@cnpm/components/Admin/types";
import type { NewUserData } from "@cnpm/components/Admin/AddUserForm";

interface AdminDashboardProps {
  userRole: string;
}

const mockUsers: User[] = [
  { name: "Nguyễn Văn A", email: "fe@ut.edu.vn", phone: "0000000001", role: "Sinh viên", status: "Hoạt động" },
  { name: "Trần Thị B", email: "b@gv.ut.edu.vn", phone: "0000000002", role: "Giảng viên", status: "Hoạt động" },
  { name: "Lê Văn C", email: "c@st.ut.edu.vn", phone: "0000000003", role: "Nhân viên", status: "Hoạt động" },
  { name: "Bùi Bảo D", email: "d@it.ut.edu.vn", phone: "0000000004", role: "Quản trị viên", status: "Hoạt động" },
];

const mockRequests: ApprovalRequest[] = [
  { sender: "Nguyên Văn A", requestType: "Đăng ký đề tài", date: "12/05/2025", status: "Chờ duyệt" },
  { sender: "Trần Thị B", requestType: "Cập nhật hồ sơ", date: "13/05/2025", status: "Chờ duyệt" },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userRole }) => {
  const handleAddUser = (userData: NewUserData) => {
    // TODO: Implement user creation logic
    console.log("New user data:", userData);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {/* Top bar */}
            <div className="flex flex-wrap gap-8 mb-6 items-center">
              {/* Search */}
              <div className="relative w-96 max-md:w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm người dùng..."
                  className="pl-10 pr-4 py-2 w-full text-sm rounded-lg bg-white border border-sky-500 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path
                      fill="#94A3B8"
                      d="M13 6.5c0 1.43-.47 2.76-1.25 3.83l3.96 3.96a1 1 0 1 1-1.42 1.41l-3.96-3.95A6.48 6.48 0 0 1 0 6.5C0 2.91 2.91 0 6.5 0S13 2.91 13 6.5Zm-2 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Role filter */}
              <div className="flex flex-wrap gap-4 items-center text-base text-gray-700">
                <span className="font-medium">Loại tài khoản:</span>
                {["Tất cả", "Sinh viên", "Giảng viên", "Nhân viên", "Quản trị viên"].map((label, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* User table */}
            <UserTable users={mockUsers} />

            {/* Forms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <AddUserForm onSubmit={handleAddUser} />
              <ApprovalSection requests={mockRequests} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
