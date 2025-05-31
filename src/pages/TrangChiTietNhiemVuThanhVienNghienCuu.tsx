"use client";
import React from "react";
import Sidebar from "@cnpm/components/ChiTietNhiemVu/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskHeader } from "@cnpm/components/ChiTietNhiemVu/TaskHeader";
import { TaskDetails } from "@cnpm/components/ChiTietNhiemVu/TaskDetails";
import { PresentationForm } from "@cnpm/components/ChiTietNhiemVu/PresentationForm";
import { FileUpload } from "@cnpm/components/ChiTietNhiemVu/FileUpload";
import { SubmitButton } from "@cnpm/components/ChiTietNhiemVu/SubmitButton";

function TrangChiTietNhiemVu() {
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-[18%] border-r border-slate-200 bg-gray">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="w-[82%] flex flex-col">
          <Header />
          <div className="flex flex-col items-center pb-12 mx-auto w-full border border-solid bg-black bg-opacity-0 border-slate-200 max-md:max-w-full">
            <TaskHeader />
            <TaskDetails />
            <PresentationForm />
            <FileUpload />
            <SubmitButton onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default TrangChiTietNhiemVu;