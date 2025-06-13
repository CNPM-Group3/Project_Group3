import React from "react";
import Sidebar from "@cnpm/components/ThemNhiemVu/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskForm, NewTaskData } from "@cnpm/components/ThemNhiemVu/TaskForm";
import { taskService } from "../services/Tasks";
import { useNavigate } from "react-router-dom";

interface ThemNhiemVuProps {
  availableMembers: Array<{ id: number; name: string }>; // List of members that can be assigned tasks
}

const ThemNhiemVu: React.FC<ThemNhiemVuProps> = ({
  availableMembers
}) => {
  const navigate = useNavigate();

  // Handler function for TaskForm submission
  const handleTaskSubmit = async (taskData: NewTaskData) => {
    try {
      // Convert taskData to match TaskCreateRequest format
      const taskRequest = {
        title: taskData.title,
        description: taskData.description,
        startDate: taskData.startDate,
        dueDate: taskData.dueDate,
        projectId: taskData.projectId,
        assignedToId: taskData.assignedToId,
        isMilestone: taskData.isMilestone,
        attachmentUrls: taskData.attachmentUrls
      };

      const createdTask = await taskService.create(taskRequest);
      console.log("Task created successfully:", createdTask);
      
      // Show success message
      alert("Nhiệm vụ đã được tạo thành công!");
      
      // Navigate to task details or project page
      navigate(`/task/${createdTask.id}`);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Có lỗi xảy ra khi tạo nhiệm vụ. Vui lòng thử lại.");
    }
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
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Thêm nhiệm vụ mới</h1>
            <TaskForm 
              onSubmit={handleTaskSubmit}
              members={availableMembers}
              projectId={1} // You might want to get this from props or context
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThemNhiemVu;