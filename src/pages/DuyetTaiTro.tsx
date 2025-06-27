"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/Admin/Sidebar1";
import Header from "@cnpm/components/Header";
import { TabSelector } from "@cnpm/components/Duyet Tai Tro/SponsorshipTabSelector";

export default function DuyetTaiTro() {
  return (
    <main className="bg-slate-50 min-h-screen w-full">
      {/* Sidebar cố định */}
      <div className="fixed top-0 left-0 h-screen w-[18%] border-r border-slate-200 bg-gray-50 z-40">
        <Sidebar />
      </div>
      {/* Header cố định */}
      <div className="fixed top-0 left-[18%] w-[82%] h-16 border-b border-slate-200 bg-white z-30">
        <Header />
      </div>
      {/* Main content */}
      <div className="ml-[18%] pt-16 flex flex-col min-h-screen">
        {/* Content */}
        <section className="flex flex-col items-center pb-10 w-full max-w-full">
          <h1 className="mt-8 text-3xl font-bold text-gray-700">
            Duyệt yêu cầu tài trợ
          </h1>
          <TabSelector />
        </section>
      </div>
    </main>
  );
}