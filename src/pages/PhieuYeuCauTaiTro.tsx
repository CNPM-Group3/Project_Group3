"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { FundingRequestForm } from "@cnpm/components/Phiếu Yêu Cầu Tài Trợ/FundingRequestForm";

interface PhieuYeuCauTaiTroNghienCuuChinhProps {
  onSubmit?: (formData: any) => void;
}

function PhieuYeuCauTaiTro({
  onSubmit,
}: PhieuYeuCauTaiTroNghienCuuChinhProps) {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Navigate back to tai-tro page after successful submission
    navigate('/tai-tro');
  };

  const handleError = (error: any) => {
    console.error('Error submitting funding request:', error);
    // You can add additional error handling here if needed
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        <div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col ml-64">
          <div className="fixed w-full z-10">
            <Header />
          </div>
          <section className="flex flex-col items-center pb-7 mx-auto w-full bg-slate-200 bg-opacity-0 max-md:max-w-full mt-16">
            <h1 className="mt-8 text-2xl font-bold text-gray-700">
              Phiếu yêu cầu tài trợ
            </h1>
            <FundingRequestForm 
              onSubmit={onSubmit}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default PhieuYeuCauTaiTro;