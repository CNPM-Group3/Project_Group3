"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/Dự Án/Sidebar";
import Header from "@cnpm/components/Header";
import { ProjectForm } from "@cnpm/components/Dự Án/Tạo Dự Án/ProjectForm";

interface TaoDuAnNghienCuuChinhProps {
  userId: string; // Example prop: ID of the user creating the project
}

export default function TaoDuAnNghienCuuChinh({
  userId
}: TaoDuAnNghienCuuChinhProps) {
  // You might use userId here, e.g., to pre-fill creator info in the form
  console.log("Creating project for user with ID:", userId);

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed w-full z-10">
            <Header />
          </div>
          {/* Content */}
          <section className="flex flex-col items-center pb-16 w-full max-w-full mt-16">
            <h1 className="mt-8 text-3xl font-bold text-gray-700 mb-8">
            </h1>
            <div className="w-full max-w-[800px]">
              {/* You might pass userId down to ProjectForm */}
              <ProjectForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
