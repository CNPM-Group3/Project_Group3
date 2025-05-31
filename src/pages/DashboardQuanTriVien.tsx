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
            {/* You might pass userRole to SystemConfigCard */}
            <SystemConfigCard />
          </main>
        </section>
      </div>
    </MainLayout>
  );
}
