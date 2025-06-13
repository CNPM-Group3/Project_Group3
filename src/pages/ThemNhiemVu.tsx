import React from "react";
import Sidebar from "@cnpm/components/ThemNhiemVu/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskForm, NewTaskData } from "@cnpm/components/ThemNhiemVu/TaskForm";

interface ThemNhiemVuProps {
  availableMembers: string[]; // List of members that can be assigned tasks
}

const ThemNhiemVu: React.FC<ThemNhiemVuProps> = ({
  availableMembers
}) => {

  // Handler function for TaskForm submission
  const handleTaskSubmit = (taskData: NewTaskData) => {
    console.log("Task submitted in ThemNhiemVu:", taskData);
    // Here you would typically send the taskData to your backend API
    alert("Nhiệm vụ đã được tạo (demo). Xem console log để biết chi tiết.");
    // You might want to clear the form or navigate to another page after submission
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full flex flex-row">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] z-10">
          <Header />
        </div>

        <section className="flex flex-col items-center pb-60 w-full max-w-screen-lg mx-auto mt-16 pt-16">
          <h1 className="text-3xl font-bold text-gray-700">
            Tạo nhiệm vụ
          </h1>

          <p className="mt-1.5 text-xs text-gray-400 max-md:max-w-full text-center">
            Điền đầy đủ thông tin ở dưới để tạo nhiệm vụ. Một nhiệm vụ
            chỉ có thể gán cho một thành viên
          </p>

          <TaskForm onSubmit={handleTaskSubmit} members={availableMembers} />
        </section>
      </div>
    </main>
  );
};

export default ThemNhiemVu;