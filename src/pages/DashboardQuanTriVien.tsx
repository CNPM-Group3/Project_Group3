"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";
import { SystemConfigCard } from "@cnpm/components/QuanTriVien/SystemConfigCard";

export default function DashboardQuanTriVien() {
  return (
    <MainLayout>
      <main className="bg-slate-50 min-h-screen w-full">
        <div className="flex flex-row min-h-screen">
          {/* Sidebar */}
          <div className="w-[18%] border-r border-slate-200 bg-gray">
            <Sidebar />
          </div>
          {/* Main content */}
          <div className="w-[110%] flex flex-col">
            <Header />
            <div className="flex-1 flex justify-center items-center">
              {/* Frame: căn giữa mọi thứ */}
              <div className="w-[1000px] h-[500px] ">
                {/* SystemConfigCard ở giữa frame */}
                <SystemConfigCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
