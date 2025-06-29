import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskForm, NewTaskData } from "@cnpm/components/ThemNhiemVu/TaskForm";
import { taskService, TaskCreateRequest } from "../services/taskService";
import usersService from "../services/usersService";
interface LocationState {
  projectId?: number;
  projectTitle?: string;
  project?: {
    id: number;
    title: string;
    description?: string;
  };
}



const ThemNhiemVu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectInfo, setProjectInfo] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [members, setMembers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const users = await usersService.getUsersByRole("Researcher");
        setMembers(users.map((u) => ({
          id: parseInt(u.id), // ép từ string sang number nếu cần
          name: u.name
        })));
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setError("Không thể tải danh sách thành viên.");
      }
    };

    fetchMembers();
  }, []);
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

  const validationError = validateTaskData(taskData);
  if (validationError) {
    setError(validationError);
    return;
  }

  setIsSubmitting(true);
  setError(null);

  try {
    // Debug: Log raw taskData first
    console.log("Raw taskData from TaskForm:", taskData);

    // Prepare data with proper null handling and date format
    const taskCreateRequest: TaskCreateRequest = {
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      // Fix date format - ensure ISO format
      startDate: new Date(taskData.startDate + 'T00:00:00.000Z').toISOString(),
      dueDate: new Date(taskData.dueDate + 'T23:59:59.999Z').toISOString(),
      projectId: projectInfo.id,
      // Fix assignedToId - MUST be null if no assignment, not -1 or 0
      assignedToId: (taskData.assignedToId && taskData.assignedToId > 0) ? taskData.assignedToId : null,
      isMilestone: taskData.isMilestone || false,
      attachmentUrls: taskData.attachmentUrls?.trim() || ""
    };

    console.log("Final request data being sent:", taskCreateRequest);

    const createdTask = await taskService.create(taskCreateRequest);
    
    console.log("Task created successfully:", createdTask);
    alert(`Nhiệm vụ "${createdTask.title}" đã được tạo thành công!`);

    navigate(`/chitietduan/${projectInfo.id}`, {
      state: {
        id: projectInfo.id,
        title: projectInfo.title,
        project: state?.project,
        taskCreated: true
      },
      replace: true
    });

  } catch (error: any) {
    console.error("Full error object:", error);
    console.error("Error response:", error.response);
    console.error("Error request config:", error.config);
    
    if (error.response?.status === 400) {
      // Log the exact request that was sent
      console.log("400 Error - Request payload:", JSON.parse(error.config?.data || '{}'));
      console.log("400 Error - Response data:", error.response?.data);
      
      const errorMessage = error.response?.data?.title || error.response?.data?.message || error.response?.data?.error;
      setError(`Validation Error: ${errorMessage || 'Invalid data format'}`);
    } else {
      setError(`Error creating task: ${error.message}`);
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
      <main className="bg-white min-h-screen w-full border border-gray-200">
        <div className="flex min-h-screen w-screen">
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
            <Sidebar />
          </aside>
          
          <div className="flex-1 flex flex-col ml-64">
            {/* Header */}
            <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
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
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen w-full border border-gray-200">
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
          <Sidebar />
        </aside>
        
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
            <Header />
          </div>

          <section className="flex flex-col items-center pb-16 w-full max-w-full mt-16">
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
                members={members}
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
      </div>
    </main>
  );
};

export default ThemNhiemVu;