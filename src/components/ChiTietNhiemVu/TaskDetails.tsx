import React, { useState } from "react";
import { taskService } from "../../services/Tasks";

interface TaskDetailsProps {
  id?: number;
  deadline?: string;
  content?: string;
  status?: string;
  assignedTo?: string;
  attachments?: Array<{
    name: string;
    url: string;
  }>;
  comments?: Array<{
    user: string;
    content: string;
    timestamp: string;
  }>;
  onStatusChange?: (newStatus: string) => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({
  id,
  deadline = "24/05/2025 23:30",
  content = "Nội dung nhiệm vụ chưa được cập nhật.",
  status = "Đang thực hiện",
  assignedTo = "Chưa được gán",
  attachments = [],
  comments = [],
  onStatusChange
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      case "Vấn đề":
        return "bg-red-100 text-red-800";
      case "Đang thực hiện":
        return "bg-blue-100 text-blue-800";
      case "Đã nộp":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!id || isUpdating) return;

    try {
      setIsUpdating(true);
      await taskService.updateStatus(id, newStatus);
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="flex flex-col items-start px-5 pt-6 pb-60 w-full text-xl font-bold rounded-xl border border-solid border-slate-200 max-w-[1098px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:pb-24 max-md:max-w-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="ml-3.5 text-gray-700 max-md:ml-2.5">
            Thời hạn: <span className="font-normal">{deadline}</span>
          </div>
          <div className="ml-3.5 text-gray-700 max-md:ml-2.5">
            Người thực hiện: <span className="font-normal">{assignedTo}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            className={`px-4 py-2 text-sm font-bold rounded-lg ${getStatusColor(status)}`}
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
          >
            <option value="Đang thực hiện">Đang thực hiện</option>
            <option value="Đã nộp">Đã nộp</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Vấn đề">Vấn đề</option>
          </select>
        </div>
      </div>

      <div className="shrink-0 self-stretch mt-6 h-px border border-gray-300 border-solid max-md:max-w-full" />
      
      <div className="mt-6 mb-0 ml-3.5 text-slate-600 max-md:mb-2.5 max-md:ml-2.5">
        Nội dung nhiệm vụ:
      </div>
      <div className="ml-3.5 font-normal text-slate-600 max-md:ml-2.5">
        {content}
      </div>

      {attachments.length > 0 && (
        <>
          <div className="shrink-0 self-stretch mt-6 h-px border border-gray-300 border-solid max-md:max-w-full" />
          <div className="mt-6 mb-0 ml-3.5 text-slate-600 max-md:mb-2.5 max-md:ml-2.5">
            Tài liệu đính kèm:
          </div>
          <div className="ml-3.5 font-normal text-slate-600 max-md:ml-2.5">
            <ul className="list-disc pl-5">
              {attachments.map((file, index) => (
                <li key={index}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {comments.length > 0 && (
        <>
          <div className="shrink-0 self-stretch mt-6 h-px border border-gray-300 border-solid max-md:max-w-full" />
          <div className="mt-6 mb-0 ml-3.5 text-slate-600 max-md:mb-2.5 max-md:ml-2.5">
            Bình luận:
          </div>
          <div className="ml-3.5 font-normal text-slate-600 max-md:ml-2.5 w-full">
            {comments.map((comment, index) => (
              <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{comment.user}</span>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};