"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/QuanTriVien2/Sidebar";
import Header from "@cnpm/components/Header";
import { UserPerformanceChart } from "@cnpm/components/QuanTriVien/QuanTriVien2/UserPerformanceChart";
import { UserInteractionChart } from "@cnpm/components/QuanTriVien/QuanTriVien2/UserInteractionChart";
import { TimeFilter } from "@cnpm/components/QuanTriVien/QuanTriVien2/TimeFilter";
import { RoleFilter } from "@cnpm/components/QuanTriVien/QuanTriVien2/RoleFilter";

interface DashboardQuanTriVien2Props {
  userRole: string; // Example prop: role of the logged-in user
}

const DashboardQuanTriVien2: React.FC<DashboardQuanTriVien2Props> = ({
  userRole
}) => {
  // You might use userRole here to conditionally render content or features
  console.log("Accessing DashboardQuanTriVien2 with role:", userRole);

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
                {/* You might pass userRole to UserPerformanceChart */}
                <UserPerformanceChart />
              </div>
            </div>

            {/* Interaction chart */}
            <div className="mb-6">
              {/* You might pass userRole to UserInteractionChart */}
              <UserInteractionChart />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6">
              {/* You might pass userRole to TimeFilter or RoleFilter */}
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