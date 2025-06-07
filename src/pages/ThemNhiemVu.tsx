import React, { useState, useEffect } from "react";
import ThanhVienNghienCuuSidebar from "@cnpm/components/sidebars/ThanhVienNghienCuuSidebar";
import Header from "@cnpm/components/Header";
import { TaskForm, NewTaskData } from "@cnpm/components/ThemNhiemVu/TaskForm";

interface ThemNhiemVuProps {
  availableMembers: string[]; // List of members that can be assigned tasks
}

const ThemNhiemVu: React.FC<ThemNhiemVuProps> = ({
  availableMembers
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handler function for TaskForm submission
  const handleTaskSubmit = async (taskData: NewTaskData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Validate task data
      if (!taskData.name.trim()) {
        throw new Error("Tên nhiệm vụ không được để trống");
      }
      if (!taskData.content.trim()) {
        throw new Error("Nội dung nhiệm vụ không được để trống");
      }
      if (!taskData.deadline) {
        throw new Error("Vui lòng chọn thời hạn hoàn thành");
      }
      if (!taskData.assignedMember) {
        throw new Error("Vui lòng chọn thành viên được giao nhiệm vụ");
      }

      // TODO: Implement actual API call
      // const response = await createTask(taskData);
      console.log("Task submitted:", taskData);
      
      // Show success message
      alert("Nhiệm vụ đã được tạo thành công!");
      
      // TODO: Navigate to task list or clear form
      // navigate('/tasks');
    } catch (err) {
      console.error("Error creating task:", err);
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra khi tạo nhiệm vụ");
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full flex flex-row">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
        <ThanhVienNghienCuuSidebar />
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

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <TaskForm 
            onSubmit={handleTaskSubmit} 
            members={availableMembers}
            isSubmitting={isSubmitting}
          />
        </section>
      </div>
    </main>
  );
};

export default ThemNhiemVu;
