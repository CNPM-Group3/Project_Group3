"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";
import { UserPerformanceChart,TimeFilter,RoleFilter,UserInteractionChart } from "@cnpm/components/QuanTriVien/QuanTriVien2/UserPerformanceChart";

const DashboardQuanTriVien2: React.FC = () => {
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

          <main className="flex-1 p-6 overflow-y-auto">
            {/* Charts */}
            <div className="flex gap-6 flex-wrap mb-6">
              <div className="w-full md:w-1/2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/488d89fe7b2e7cd40a8ee8152b3048ee84cd22ed?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
                  alt="Statistics"
                  className="w-full rounded-xl shadow-md aspect-[1.6] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <UserPerformanceChart />
              </div>
            </div>

            {/* Interaction chart */}
            <div className="mb-6">
              <UserInteractionChart />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6">
              <TimeFilter />
              <RoleFilter />
            </div>
          </main>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardQuanTriVien2;