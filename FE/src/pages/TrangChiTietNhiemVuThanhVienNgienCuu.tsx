"use client";
import React from "react";
import Sidebar from "@cnpm/components/ChiTietNhiemVu/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskHeader } from "@cnpm/components/ChiTietNhiemVu/TaskHeader";
import { TaskDetails } from "@cnpm/components/ChiTietNhiemVu/TaskDetails";
import { PresentationForm } from "@cnpm/components/ChiTietNhiemVu/Presentation";
import { FileUpload } from "@cnpm/components/ChiTietNhiemVu/FileUpload";
import { SubmitButton } from "@cnpm/components/ChiTietNhiemVu/SubmitButton";

interface TrangChiTietNhiemVuProps {
  taskId: string; // Example prop: ID of the task to display
}

function TrangChiTietNhiemVu({
  taskId
}: TrangChiTietNhiemVuProps) {
  // You would typically use taskId here to fetch task data
  console.log("Displaying task with ID:", taskId);

  const handleSubmit = () => {
    // Handle form submission logic here, possibly using taskId
    console.log('Form submitted');
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
          <div className="fixed w-full z-10">
            <Header />
          </div>
          <div className="flex flex-col items-center pb-12 mx-auto w-full max-w-[1000px] max-md:max-w-full mt-16">
            {/* You might pass taskId down to these components */}
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