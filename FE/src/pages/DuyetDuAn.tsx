"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/Duyet Du An/Sidebar";
import Header from "@cnpm/components/Header";
import { TabSelector } from "@cnpm/components/Duyet Du An/TabSelector";
import { Project } from "@cnpm/components/Duyet Du An/ProjectList";

export default function DuyetDuAn() {
  const handleApprove = (project: Project) => {
    console.log('Approving project:', project);
    // TODO: Implement approve logic
  };

  const handleReject = (project: Project) => {
    console.log('Rejecting project:', project);
    // TODO: Implement reject logic
  };

  const handleView = (project: Project) => {
    console.log('Viewing project:', project);
    // TODO: Navigate to project details
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-[18%] border-r border-slate-200 bg-gray">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="w-[110%] flex flex-col">
          {/* Header */}
          <Header />
          {/* Content */}
          <section className="flex flex-col items-center pb-10 w-full max-w-full">
            <h1 className="mt-8 text-3xl font-bold text-gray-700">
              Duyệt dự án
            </h1>
            <TabSelector 
              onApprove={handleApprove}
              onReject={handleReject}
              onView={handleView}
            />
          </section>
        </div>
      </div>
    </main>
  );
}