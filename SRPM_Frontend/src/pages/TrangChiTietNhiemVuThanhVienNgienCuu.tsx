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
          <section className="flex flex-col items-center pb-60 w-full max-w-screen-lg mx-auto mt-16 pt-16">
            {/* You might pass taskId down to these components */}
            <TaskHeader />
            <TaskDetails />
            <PresentationForm />
            <FileUpload />
            <SubmitButton onSubmit={handleSubmit} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default TrangChiTietNhiemVu;