import { AxiosResponse } from 'axios';
import api from './apiService';

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

// Export interface này để có thể import ở components khác
export interface TaskCreateRequest {
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  projectId: number;
  assignedToId: number | null; 
  isMilestone: boolean;
  attachmentUrls: string;
}

export interface TaskUpdateRequest extends Partial<TaskCreateRequest> {}

// Lấy task
export const taskService = {
  getById: async (id: number): Promise<Task> => {
    const response: AxiosResponse<Task> = await api.get(`/Tasks/${id}`);
    return response.data;
  },

  // cập nhật task
  update: async (id: number, data: TaskUpdateRequest): Promise<Task> => {
    const response: AxiosResponse<Task> = await api.put(`/Tasks/${id}`, data);
    return response.data;
  },

  // DELETE /api/Tasks/{id}
  // Xóa task
  delete: async (id: number): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(`/Tasks/${id}`);
    return response.data;
  },

  // GET /api/Tasks
  // lấy all task
  getAll: async (): Promise<Task[]> => {
    const response: AxiosResponse<Task[]> = await api.get('/Tasks');
    return response.data;
  },

  // POST /api/Tasks
  // Tạo task
  create: async (data: TaskCreateRequest): Promise<Task> => {
    const response: AxiosResponse<Task> = await api.post('/Tasks', data);
    return response.data;
  },

  // GET /api/Tasks/project/{projectId}
  // Lấy task trong Pj
  getByProject: async (projectId: number): Promise<Task[]> => {
    const response: AxiosResponse<Task[]> = await api.get(`/Tasks/project/${projectId}`);
    return response.data;
  },

  // GET /api/Tasks/assigned/{userId}
  // Lấy task cảu người được giao
  getByAssignedUser: async (userId: number): Promise<Task[]> => {
    const response: AxiosResponse<Task[]> = await api.get(`/Tasks/assigned/${userId}`);
    return response.data;
  },

  // GET /api/Tasks/status/{status}
  // Lấy task theo trạng thái
  getByStatus: async (status: string): Promise<Task[]> => {
    const response: AxiosResponse<Task[]> = await api.get(`/Tasks/status/${status}`);
    return response.data;
  },

  // GET /api/Tasks/milestones/{projectId}
  // Tiến độ task
  getMilestones: async (projectId: number): Promise<Task[]> => {
    const response: AxiosResponse<Task[]> = await api.get(`/Tasks/milestones/${projectId}`);
    return response.data;
  },

  // PATCH /api/Tasks/{id}/status
  // Cập nhật task
  updateStatus: async (id: number, status: string): Promise<Task> => {
    const response: AxiosResponse<Task> = await api.patch(`/Tasks/${id}/status`, { status });
    return response.data;
  },
};