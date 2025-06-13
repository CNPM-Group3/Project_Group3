"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/Duyet Du An/Sidebar";
import Header from "@cnpm/components/Header";
import { TabSelector } from "@cnpm/components/Duyet Du An/TabSelector";

export default function DuyetDuAn() {
  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-[18%] border-r border-slate-200 bg-gray">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          {/* Content */}
          <section className="flex flex-col items-center pb-10 w-full max-w-full">
            <h1 className="mt-8 text-3xl font-bold text-gray-700">
              Duyệt dự án
            </h1>
            <TabSelector />
          </section>
        </div>
      </div>
    </main>
  );
}