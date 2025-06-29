import React, { useState, useEffect } from "react";
import Sidebar from "@cnpm/components/Duyet Du An/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskList, AttachmentList } from "@cnpm/components/Duyet Du An/ChitietHost";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProject } from "../services/projectService";
import { taskService } from "../services/taskService";
import { authService, UserProfile } from "../services/authService";

// Define interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  objectives: string;
  expectedOutcomes: string;
  startDate: string;
  endDate: string;
  researchTopicId: number;
  ownerId?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

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

interface Document {
  id: number;
  name: string;
  url: string;
  uploadDate: string;
  size: number;
  type: string;
  projectId: number;
  uploadedBy: number;
}

interface LocationState {
  id?: number;
  title?: string;
  description?: string;
  objectives?: string;
  expectedOutcomes?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  ownerId?: number;
  researchTopicId?: number;
  project?: Project;
  taskCreated?: boolean;
  documentCreated?: boolean; // New flag for document creation
}

export const ChiTietDuAnHost: React.FC = () => {
  const { id, title } = useParams<{ id?: string; title?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Get user profile
        const profile = authService.getCurrentProfile();
        if (!profile) {
          await authService.fetchAndStoreUserProfile();
          const fetchedProfile = authService.getCurrentProfile();
          setUserProfile(fetchedProfile);
        } else {
          setUserProfile(profile);
        }

        await loadProjectData();
        
        // Check for flags from navigation state
        if (location.state?.taskCreated) {
          console.log("New task was created, tasks should be reloaded");
          window.history.replaceState(
            { ...location.state, taskCreated: undefined }, 
            document.title
          );
        }

        if (location.state?.documentCreated) {
          console.log("New document was created, documents should be reloaded");
          window.history.replaceState(
            { ...location.state, documentCreated: undefined }, 
            document.title
          );
        }
      } catch (err) {
        console.error("Error initializing component:", err);
        setError("Không thể tải thông tin dự án");
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, [id, title, location.state?.taskCreated, location.state?.documentCreated]); 

  const loadProjectData = async () => {
    try {
      // First, try to use data from navigation state
      if (state?.project) {
        setProject(state.project);
        await Promise.all([
          loadProjectTasks(state.project.id),
          loadProjectDocuments(state.project.id)
        ]);
        return;
      }

      // If we have state data but not full project object, construct it
      if (state?.id && state?.title) {
        const projectFromState: Project = {
          id: state.id,
          title: state.title,
          description: state.description || "",
          objectives: state.objectives || "",
          expectedOutcomes: state.expectedOutcomes || "",
          startDate: state.startDate || "",
          endDate: state.endDate || "",
          researchTopicId: state.researchTopicId || 0,
          ownerId: state.ownerId,
          status: state.status
        };
        setProject(projectFromState);
        await Promise.all([
          loadProjectTasks(projectFromState.id),
          loadProjectDocuments(projectFromState.id)
        ]);
        return;
      }

      // If we have ID from params, fetch project data using API
      if (id) {
        const projectData = await getProject(parseInt(id));
        setProject(projectData);
        await Promise.all([
          loadProjectTasks(projectData.id),
          loadProjectDocuments(projectData.id)
        ]);
        return;
      }

      // If we only have title from params (legacy support)
      if (title) {
        setError("Không thể tải dự án. Vui lòng chọn dự án từ danh sách.");
        return;
      }

      setError("Không tìm thấy thông tin dự án");
    } catch (err) {
      console.error("Error loading project data:", err);
      setError("Không thể tải thông tin dự án");
    }
  };

  const loadProjectTasks = async (projectId: number) => {
    try {
      const projectTasks = await taskService.getByProject(projectId);
      setTasks(projectTasks);
    } catch (err) {
      console.error("Error loading project tasks:", err);
    }
  };

  // New function to load project documents
  const loadProjectDocuments = async (projectId: number) => {
    try {
      // Replace with your actual document service
      // const projectDocuments = await documentService.getByProject(projectId);
      // setDocuments(projectDocuments);
      
      // Mock data for now - replace with actual API call
      const mockDocuments: Document[] = [
        {
          id: 1,
          name: "Research Proposal.pdf",
          url: "/documents/research-proposal.pdf",
          uploadDate: "2024-01-15",
          size: 2048576,
          type: "application/pdf",
          projectId: projectId,
          uploadedBy: 1
        }
      ];
      setDocuments(mockDocuments);
    } catch (err) {
      console.error("Error loading project documents:", err);
    }
  };

  const handleCreateTask = () => {
    if (!project) return;
    
    navigate("/themnhiemvu", { 
      state: { 
        projectId: project.id,
        projectTitle: project.title,
        project: project 
      } 
    });
  };

  const handleCreateAttachment = () => {
    if (!project) return;
    
    navigate("/themtailieu", { 
      state: { 
        projectId: project.id,
        projectTitle: project.title,
        project: project 
      } 
    });
  };

  const handleTaskCreated = async () => {
    if (project) {
      await loadProjectTasks(project.id);
    }
  };

  const handleTaskUpdated = async () => {
    if (project) {
      await loadProjectTasks(project.id);
    }
  };

  const handleTaskDeleted = async () => {
    if (project) {
      await loadProjectTasks(project.id);
    }
  };

  // New function to handle document operations
  const handleDocumentCreated = async () => {
    if (project) {
      await loadProjectDocuments(project.id);
    }
  };

  const handleBackToProjects = () => {
    navigate("/duan");
  };

  const canEditProject = () => {
    if (!userProfile || !project) return false;
    
    const isPrincipalInvestigator = userProfile.roles?.includes("Researcher") || 
                                   userProfile.roles?.includes("HostInstitution") ||
                                   userProfile.roles?.includes("principal-investigator");
    
    const isOwner = project.ownerId === userProfile.id;
    
    return isPrincipalInvestigator && isOwner;
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper function to get file icon based on type
  const getFileIcon = (type: string): string => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('doc')) return '📝';
    if (type.includes('excel') || type.includes('sheet')) return '📊';
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    return '📁';
  };

  // Custom TaskDisplay component for showing tasks
  const TaskDisplay: React.FC<{ tasks: Task[]; onTaskUpdate: () => void }> = ({ tasks, onTaskUpdate }) => {
    const handleStatusUpdate = async (taskId: number, newStatus: string) => {
      try {
        await taskService.updateStatus(taskId, newStatus);
        onTaskUpdate();
      } catch (error) {
        console.error("Error updating task status:", error);
        alert("Không thể cập nhật trạng thái nhiệm vụ");
      }
    };

    const handleDeleteTask = async (taskId: number) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa nhiệm vụ này?")) {
        try {
          await taskService.delete(taskId);
          onTaskUpdate();
        } catch (error) {
          console.error("Error deleting task:", error);
          alert("Không thể xóa nhiệm vụ");
        }
      }
    };

    const getStatusColor = (status?: string) => {
      switch (status?.toLowerCase()) {
        case 'completed':
        case 'hoàn thành':
          return 'bg-green-100 text-green-800';
        case 'in_progress':
        case 'đang thực hiện':
          return 'bg-blue-100 text-blue-800';
        case 'pending':
        case 'chờ xử lý':
          return 'bg-yellow-100 text-yellow-800';
        case 'overdue':
        case 'quá hạn':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    if (tasks.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-3">📋</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Chưa có nhiệm vụ nào
          </h3>
          <p className="text-gray-500">
            Hãy tạo nhiệm vụ đầu tiên cho dự án này
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{task.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Bắt đầu: {new Date(task.startDate).toLocaleDateString('vi-VN')}</span>
                  <span>Hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN')}</span>
                  {task.isMilestone && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      Milestone
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                  {task.status || 'Đang thực hiện'}
                </span>
                {canEditProject() && (
                  <div className="flex gap-1">
                    <select
                      value={task.status || 'pending'}
                      onChange={(e) => task.id && handleStatusUpdate(task.id, e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="in_progress">Đang thực hiện</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="overdue">Quá hạn</option>
                    </select>
                    <button
                      onClick={() => task.id && handleDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-800 text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </div>
            </div>
            {task.attachmentUrls && (
              <div className="text-xs text-gray-500">
                <span className="font-medium">Tài liệu đính kèm:</span> {task.attachmentUrls}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // New DocumentDisplay component for showing documents
  const DocumentDisplay: React.FC<{ documents: Document[]; onDocumentUpdate: () => void }> = ({ documents, onDocumentUpdate }) => {
    const handleDeleteDocument = async (documentId: number) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
        try {
          // Replace with your actual document service
          // await documentService.delete(documentId);
          onDocumentUpdate();
          alert("Đã xóa tài liệu thành công");
        } catch (error) {
          console.error("Error deleting document:", error);
          alert("Không thể xóa tài liệu");
        }
      }
    };

    const handleDownloadDocument = (doc: Document) => {
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    if (documents.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-3">📁</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Chưa có tài liệu nào
          </h3>
          <p className="text-gray-500">
            Hãy tải lên tài liệu đầu tiên cho dự án này
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="text-2xl">{getFileIcon(doc.type)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{doc.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Kích thước: {formatFileSize(doc.size)}</span>
                    <span>Tải lên: {new Date(doc.uploadDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadDocument(doc)}
                  className="text-blue-600 hover:text-blue-800 text-xs px-3 py-1 border border-blue-300 rounded hover:bg-blue-50"
                >
                  Tải xuống
                </button>
                {canEditProject() && (
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-red-600 hover:text-red-800 text-xs px-3 py-1 border border-red-300 rounded hover:bg-red-50"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <main className="bg-slate-50 min-h-screen w-full">
        <div className="flex flex-row min-h-screen">
          <div className="w-[18%] border-r border-slate-200 bg-gray">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col">
            <Header />
            <section className="flex flex-col items-center pb-16 w-full max-w-full">
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                <p className="mt-2 text-gray-600">Đang tải thông tin dự án...</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="bg-slate-50 min-h-screen w-full">
        <div className="flex flex-row min-h-screen">
          <div className="w-[18%] border-r border-slate-200 bg-gray">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col">
            <Header />
            <section className="flex flex-col items-center pb-16 w-full max-w-full">
              <div className="mt-8 text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
                  <p className="mb-3">{error || "Không tìm thấy thông tin dự án"}</p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Thử lại
                    </button>
                    <button
                      onClick={handleBackToProjects}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                    >
                      Quay lại danh sách
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        <div className="w-[18%] border-r border-slate-200 bg-gray">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <Header />
          <section className="flex flex-col items-center pb-16 w-full max-w-full">
            {/* Breadcrumb and back button */}
            <div className="w-full max-w-[800px] mt-4">
              <button
                onClick={handleBackToProjects}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800 transition-colors mb-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại danh sách dự án
              </button>
            </div>

            {/* Project header */}
            <div className="w-full max-w-[800px] bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="mt-8 text-3xl font-bold text-gray-700 mb-8 text-center">
                {project.title}
              </h1>
              
              {project.description && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Mô tả:</h3>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Ngày bắt đầu:</span>
                  <span className="ml-2 text-gray-700">
                    {project.startDate ? new Date(project.startDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Ngày kết thúc:</span>
                  <span className="ml-2 text-gray-700">
                    {project.endDate ? new Date(project.endDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Trạng thái:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status || 'Đang thực hiện'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">ID dự án:</span>
                  <span className="ml-2 text-gray-700">{project.id}</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[800px]">
              {/* Task management section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">Nhiệm vụ</h2>
                  {canEditProject() && (
                    <button
                      onClick={handleCreateTask}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-base font-semibold"
                    >
                      + Tạo nhiệm vụ
                    </button>
                  )}
                </div>
                <TaskDisplay tasks={tasks} onTaskUpdate={handleTaskUpdated} />
              </div>

              {/* Document management section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">Tài liệu đính kèm</h2>
                  {canEditProject() && (
                    <button
                      onClick={handleCreateAttachment}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-base font-semibold"
                    >
                      + Tạo tài liệu
                    </button>
                  )}
                </div>
                <DocumentDisplay documents={documents} onDocumentUpdate={handleDocumentCreated} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ChiTietDuAnHost;