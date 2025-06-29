"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";
import { UserRoleFilter, UserList } from "@cnpm/components/QuanTriVien/QuanTriVien1/UserRoleFilter";

export const DashboardLayout = () => {
  const [selectedRole, setSelectedRole] = React.useState<string>("all");
  return (
    <MainLayout>
      <div className="min-h-screen w-screen bg-white flex">
        <div className="flex min-h-screen w-screen">
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
            <Sidebar />
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col ml-64">
            {/* Header */}
            <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
              <Header />
            </div>
            <main className="flex-1 p-6 mt-16 bg-white">
              <div className="w-full max-w-[1280px] mx-auto px-6">
                <div className="w-[750px] mb-4">
                  <UserRoleFilter onRoleChange={setSelectedRole} />
                </div>
                <UserList selectedRole={selectedRole} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;