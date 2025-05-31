"use client";
import React from "react";
import Sidebar from "@cnpm/components/Phiếu Yêu Cầu Tài Trợ/Sidebar";
import Header from "@cnpm/components/Header";
import { FundingRequestForm } from "@cnpm/components/Phiếu Yêu Cầu Tài Trợ/FundingRequestForm";

interface PhieuYeuCauTaiTroNghienCuuChinhProps {
  onSubmit: (formData: any) => void; // Example prop: function to handle form submission
}

function PhieuYeuCauTaiTroNghienCuuChinh({
  onSubmit
}: PhieuYeuCauTaiTroNghienCuuChinhProps) {
  // You would typically pass the onSubmit prop down to FundingRequestForm
  console.log("PhieuYeuCauTaiTro page mounted with onSubmit prop.");

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
          <section className="flex flex-col items-center pb-7 mx-auto w-full bg-slate-200 bg-opacity-0 max-md:max-w-full mt-16">
            <h1 className="mt-8 text-2xl font-bold text-gray-700">
              Phiếu yêu cầu tài trợ
            </h1>
            {/* Pass the onSubmit prop to FundingRequestForm */}
            <FundingRequestForm onSubmit={onSubmit} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default PhieuYeuCauTaiTroNghienCuuChinh;
