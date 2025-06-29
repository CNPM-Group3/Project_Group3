"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";
import { SystemConfigCard } from "@cnpm/components/QuanTriVien/SystemConfigCard";

export default function DashboardQuanTriVien() {
  return (
    <MainLayout>
      <div className="flex min-h-screen w-screen bg-white border border-gray-200">
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
          <main className="flex-1 flex justify-center items-center mt-16">
            {/* Frame: căn giữa mọi thứ */}
            <div className="w-[1000px] h-[500px] ">
              {/* SystemConfigCard ở giữa frame */}
              <SystemConfigCard />
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
