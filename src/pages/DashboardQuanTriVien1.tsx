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
      <div className="min-h-screen w-screen bg-gray-50 flex">
        {/* Sidebar cố định 256px */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <Sidebar />
        </aside>

        {/* Nội dung chính */}
        <section className="flex-1 flex flex-col bg-white">
          <div className="border-b border-gray-200">
            <Header />
          </div>
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="w-full max-w-[1280px] mx-auto px-6">
              <div className="w-[750px] mb-4">
                <UserRoleFilter onRoleChange={setSelectedRole} />
              </div>
              <UserList selectedRole={selectedRole} />
            </div>
          </main>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;