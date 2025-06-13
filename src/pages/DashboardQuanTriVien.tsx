"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";
import { SystemConfigCard } from "@cnpm/components/QuanTriVien/SystemConfigCard";

export default function DashboardQuanTriVien() {
  return (
    <MainLayout>
      <div className="flex min-h-screen w-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <Sidebar />
        </aside>

        {/* Main content */}
        <section className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <SystemConfigCard />
          </main>
        </section>
      </div>
    </MainLayout>
  );
}
