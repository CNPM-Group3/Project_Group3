"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/Dự Án/Sidebar";
import Header from "@cnpm/components/Header";
import { ProjectCard } from "@cnpm/components/Dự Án/ProjectCard";
import { SearchInput } from "@cnpm/components/Dự Án/SearchInput";

export default function DuAn() {
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
            <h1 className="mt-8 text-3xl font-bold text-gray-700">
              Dự án của tôi
            </h1>
            <div className="flex flex-wrap gap-5 justify-between mt-7 w-full max-w-[989px]">
              <div className="self-start mt-2">
                <SearchInput />
              </div>
              <button
              type="button"
              className="flex gap-1.5 px-6 py-4 text-base font-bold text-white bg-teal-500 rounded-lg
                        cursor-pointer transition duration-200 ease-in-out
                        hover:bg-teal-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bfd0f5c4eb9b96885ca236846c267d6df16db19?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
                className="object-contain shrink-0 w-5 aspect-square"
                alt="Create project icon"
              />
              <span>Tạo dự án</span>
            </button>
            </div>
            <div className="mt-3.5 w-full max-w-[992px]">
              <ProjectCard
                title="Hệ thống giao dịch tự động"
                group="CNTT22"
                supervisor="ThS. Nguyễn Văn Hồng"
              />
              <ProjectCard
                title="Bác Sĩ AI"
                group="CNTT3"
                supervisor="TS. Nguyễn Văn Minh"
              />
              <ProjectCard
                title="Ứng dụng Quản lý tiển trọ"
                group="KHDL"
                supervisor="TS. Nguyễn Hồ Ngọc"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
