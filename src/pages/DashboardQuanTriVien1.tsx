"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/QuanTriVien1/Sidebar";
import Header from "@cnpm/components/Header";
import { UserRoleFilter } from "@cnpm/components/QuanTriVien/QuanTriVien1/UserRoleFilter";
import { UserList } from "@cnpm/components/QuanTriVien/QuanTriVien1/UserList";

interface DashboardLayoutProps {
  userRole: string; // Example prop: role of the logged-in user
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userRole
}) => {
  // You might use userRole here to conditionally render content or features
  console.log("Accessing DashboardLayout (QuanTriVien1) with role:", userRole);

  return (
    <MainLayout>
      <div className="min-h-screen w-screen bg-gray-50 flex">
        {/* Sidebar cố định 256px */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 fixed h-full">
          <Sidebar />
        </aside>

        {/* Nội dung chính */}
        <section className="flex-1 flex flex-col bg-white ml-64">
          <div className="fixed w-full z-10">
            <Header />
          </div>
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50 mt-16">
            <div className="w-full max-w-[1280px] mx-auto px-6">
              <div className="w-[750px] mb-4">
                {/* You might pass userRole to UserRoleFilter or UserList */}
                <UserRoleFilter />
              </div>
              <UserList />
            </div>
          </main>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;