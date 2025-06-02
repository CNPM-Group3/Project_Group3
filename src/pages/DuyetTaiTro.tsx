"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/Duyệt Tài Trợ/Sidebar";
import Header from "@cnpm/components/Header";
import { TabSelector } from "@cnpm/components/Duyệt Tài Trợ/SponsorshipTabSelector";

interface DuyetTaiTroProps {
  userRole: string; // Example prop: role of the logged-in user
}

export default function DuyetTaiTro({
  userRole
}: DuyetTaiTroProps) {
  // You might use userRole here to conditionally render content or features
  console.log("Accessing DuyetTaiTro page with role:", userRole);

  // Handlers for sponsorship actions
  const handleApprove = (id: string) => {
    // TODO: Implement sponsorship approval logic
    console.log("Approved sponsorship:", id);
  };

  const handleReject = (id: string) => {
    // TODO: Implement sponsorship rejection logic
    console.log("Rejected sponsorship:", id);
  };

  const handleView = (id: string) => {
    // TODO: Implement sponsorship view logic
    console.log("Viewing sponsorship:", id);
  };

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
          <section className="flex flex-col items-center pb-10 w-full max-w-full mt-16">
            <h1 className="mt-8 text-3xl font-bold text-gray-700">
              Duyệt yêu cầu tài trợ
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
