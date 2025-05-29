"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/Dự Án/Thêm Dự Án /Sidebar";
import Header from "@cnpm/components/Header";
import { DocumentUpload } from "@cnpm/components/Dự Án/Thêm Dự Án /DocumentUpload";

function ThemTaiLieuNghienCuuChinh() {
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
          <section className="flex flex-col items-center pb-60 w-full max-w-full">
            <DocumentUpload />
          </section>
        </div>
      </div>
    </main>
  );
}

export default ThemTaiLieuNghienCuuChinh;
