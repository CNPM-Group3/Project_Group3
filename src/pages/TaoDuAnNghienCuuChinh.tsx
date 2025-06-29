"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { ProjectForm } from "@cnpm/components/Du An/Tao Du An/ProjectForm";

export default function TaoDuAnNghienCuuChinh() {
  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
          <Sidebar />
        </aside>
        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-200">
            <Header />
          </div>
          {/* Content */}
          <section className="flex flex-col items-center pb-16 w-full max-w-full mt-16">
            <h1 className="mt-8 text-3xl font-bold text-gray-700 mb-8">
            </h1>
            <div className="w-full max-w-[800px]">
              <ProjectForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}