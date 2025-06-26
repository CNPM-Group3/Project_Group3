import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskForm, NewTaskData } from "@cnpm/components/ThemNhiemVu/TaskForm";
import { taskService, TaskCreateRequest } from "../services/taskService";

interface LocationState {
  projectId?: number;
  projectTitle?: string;
  project?: {
    id: number;
    title: string;
    description?: string;
  };
}

interface ThemNhiemVuProps {
  availableMembers?: string[];
}

const ThemNhiemVu: React.FC<ThemNhiemVuProps> = ({ availableMembers = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectInfo, setProjectInfo] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    // Kiểm tra xem có thông tin dự án từ navigation state không
    if (state?.projectId && state?.projectTitle) {
      setProjectInfo({
        id: state.projectId,
        title: state.projectTitle
      });
    } else if (state?.project) {
      setProjectInfo({
        id: state.project.id,
        title: state.project.title
      });
    } else {
      // Nếu không có thông tin dự án, chuyển hướng về danh sách dự án
      setError("Không tìm thấy thông tin dự án. Vui lòng chọn dự án trước khi tạo nhiệm vụ.");
    }
  }, [state]);

  // Validation đã được chuyển vào TaskForm component
  // Chỉ giữ lại validation cơ bản ở đây
  const validateTaskData = (taskData: NewTaskData): string | null => {
    console.log("Final validation - taskData:", taskData);
    
    // Chỉ kiểm tra dữ liệu cơ bản vì TaskForm đã validate chi tiết
    if (!taskData.title?.trim()) {
      return "Dữ liệu không hợp lệ: thiếu tiêu đề nhiệm vụ";
    }
    
    if (!taskData.startDate || !taskData.dueDate) {
      return "Dữ liệu không hợp lệ: thiếu ngày bắt đầu hoặc ngày kết thúc";
    }

    return null;
  };

  const handleTaskSubmit = async (taskData: NewTaskData) => {
    if (!projectInfo) {
      setError("Không tìm thấy thông tin dự án");
      return;
    }

    // Validate dữ liệu trước khi gửi
    const validationError = validateTaskData(taskData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Chuẩn bị dữ liệu để gửi API với validation
      const taskCreateRequest: TaskCreateRequest = {
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        startDate: taskData.startDate,
        dueDate: taskData.dueDate,
        projectId: projectInfo.id,
        assignedToId: taskData.assignedToId || 0, 
        isMilestone: taskData.isMilestone || false,
        attachmentUrls: taskData.attachmentUrls?.trim() || ""
      };

      console.log("Submitting task data:", taskCreateRequest);

      // Gọi API để tạo nhiệm vụ
      const createdTask = await taskService.create(taskCreateRequest);
      
      console.log("Task created successfully:", createdTask);

      // Hiển thị thông báo thành công
      alert(`Nhiệm vụ "${createdTask.title}" đã được tạo thành công!`);

      // Quay lại trang chi tiết dự án với thông tin đã có
      navigate(`/chitietduan/${projectInfo.id}`, {
        state: {
          id: projectInfo.id,
          title: projectInfo.title,
          project: state?.project,
          // Thêm flag để báo hiệu rằng cần reload tasks
          taskCreated: true
        },
        replace: true // Thay thế history entry hiện tại
      });

    } catch (error: any) {
      console.error("Error creating task:", error);
      console.error("Error details:", error.response?.data);
      
      // Xử lý các loại lỗi khác nhau
      if (error.response?.status === 400) {
        // Chi tiết hóa lỗi 400
        const errorMessage = error.response?.data?.message || error.response?.data?.error;
        if (errorMessage) {
          setError(`Dữ liệu không hợp lệ: ${errorMessage}`);
        } else {
          setError("Dữ liệu nhiệm vụ không hợp lệ. Vui lòng kiểm tra lại thông tin.");
        }
      } else if (error.response?.status === 404) {
        setError("Không tìm thấy dự án hoặc thành viên. Vui lòng thử lại.");
      } else if (error.response?.status === 401) {
        setError("Bạn không có quyền tạo nhiệm vụ cho dự án này.");
      } else if (error.response?.status === 403) {
        setError("Bạn không có quyền truy cập vào tính năng này.");
      } else if (error.response?.status === 422) {
        setError("Dữ liệu không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.");
      } else if (error.response?.status >= 500) {
        setError("Lỗi server. Vui lòng thử lại sau ít phút.");
      } else {
        setError(`Có lỗi xảy ra khi tạo nhiệm vụ: ${error.message || 'Vui lòng thử lại.'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToProject = () => {
    if (projectInfo) {
      navigate(`/chitietduan/${projectInfo.id}`, {
        state: {
          id: projectInfo.id,
          title: projectInfo.title,
          project: state?.project
        }
      });
    } else {
      navigate("/duan");
    }
  };

  // Clear error khi user bắt đầu sửa form
  const handleErrorClear = () => {
    if (error) {
      setError(null);
    }
  };

  // Nếu có lỗi về thông tin dự án
  if (error && !projectInfo) {
    return (
      <main className="bg-slate-50 min-h-screen w-full flex flex-row">
        <div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col ml-64">
          <div className="fixed top-0 left-64 w-[calc(100%-16rem)] z-10">
            <Header />
          </div>

          <section className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto mt-16 pt-16 min-h-[calc(100vh-8rem)]">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
              <h2 className="text-lg font-semibold mb-2">Lỗi</h2>
              <p className="mb-4">{error}</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => navigate("/duan")}
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                  Quay lại danh sách dự án
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

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
          {/* Breadcrumb và nút quay lại */}
          {projectInfo && (
            <div className="w-full max-w-2xl mb-6">
              
              <div className="text-sm text-gray-800">
                Dự án: <span className="font-semibold">{projectInfo.title}</span>
              </div>
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-700">
            Tạo nhiệm vụ
          </h1>

          <p className="mt-1.5 text-xs text-gray-400 max-md:max-w-full text-center">
            Vui lòng điền đầy đủ thông tin để tạo nhiệm vụ mới cho dự án.
          </p>

          {/* Hiển thị lỗi nếu có */}
          {error && projectInfo && (
            <div className="w-full max-w-2xl mt-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-between items-start">
                <span>{error}</span>
                <button 
                  onClick={() => setError(null)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Form tạo nhiệm vụ */}
          <div className="w-full max-w-2xl" onClick={handleErrorClear}>
            <TaskForm 
              onSubmit={handleTaskSubmit} 
              members={availableMembers}
              isSubmitting={isSubmitting}
              // projectId={projectInfo?.id}
            />
          </div>

          {/* Loading overlay */}
          {isSubmitting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                  <span className="text-gray-700">Đang tạo nhiệm vụ...</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ThemNhiemVu;