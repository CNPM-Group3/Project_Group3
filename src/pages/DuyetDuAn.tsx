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
    <main className="bg-white min-h-screen w-full border border-gray-200">
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
          <Sidebar />
        </aside>
        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
            <Header />
          </div>
          {/* Content */}
          <section className="flex flex-col items-center pb-60 w-full max-w-screen-lg mx-auto mt-16 pt-16">
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