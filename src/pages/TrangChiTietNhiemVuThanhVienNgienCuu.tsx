"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@cnpm/components/ChiTietNhiemVu/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskHeader } from "@cnpm/components/ChiTietNhiemVu/TaskHeader";
import { TaskDetails } from "@cnpm/components/ChiTietNhiemVu/TaskDetails";
import { PresentationForm } from "@cnpm/components/ChiTietNhiemVu/Presentation";
import { FileUpload } from "@cnpm/components/ChiTietNhiemVu/FileUpload";
import { SubmitButton } from "@cnpm/components/ChiTietNhiemVu/SubmitButton";
import { taskService } from "../services/Tasks";

interface Task {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  projectId: number;
  assignedToId: number;
  isMilestone: boolean;
  attachmentUrls: string;
  status?: string;
}

interface TrangChiTietNhiemVuProps {
  taskId: string;
}

const TrangChiTietNhiemVuThanhVienNgienCuu: React.FC<TrangChiTietNhiemVuProps> = ({
  taskId
}) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskData = await taskService.getById(parseInt(taskId));
        setTask(taskData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching task details:", err);
        setError("Không thể tải thông tin nhiệm vụ. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleSubmit = async () => {
    try {
      if (task?.id) {
        await taskService.updateStatus(task.id, "submitted");
        setTask((prev: Task | null) => prev ? { ...prev, status: "submitted" } : null);
        alert("Nhiệm vụ đã được nộp thành công!");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Có lỗi xảy ra khi nộp nhiệm vụ. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return <div>Đang tải thông tin nhiệm vụ...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!task) {
    return <div>Không tìm thấy thông tin nhiệm vụ</div>;
  }

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
            <TaskHeader 
              projectName={`Project ${task.projectId}`}
              taskName={task.title}
            />
            <TaskDetails
              id={task.id}
              deadline={new Date(task.dueDate).toLocaleString()}
              content={task.description}
              status={task.status}
              assignedTo={task.assignedToId?.toString()}
              attachments={task.attachmentUrls?.split(',').map((url: string) => ({
                name: url.split('/').pop() || 'File',
                url: url
              }))}
            />
            <PresentationForm />
            <FileUpload />
            <SubmitButton onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TrangChiTietNhiemVuThanhVienNgienCuu;