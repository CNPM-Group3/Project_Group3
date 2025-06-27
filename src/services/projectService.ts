import api from './apiService';
import { AxiosResponse } from 'axios';

export interface Project {
  id: number;
  title: string;
  proposerName?: string;
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

interface CreateProjectRequest {
  title: string;
  description: string;
  objectives: string;
  expectedOutcomes: string;
  startDate: string;
  endDate: string;
  researchTopicId: number;
}

interface UpdateProjectRequest extends Partial<CreateProjectRequest> {}

interface ProjectMember {
  id: number;
  userId: number;
  projectId: number;
  role?: string;
  joinedAt?: string;
}

interface AddMemberRequest {
  userId: number;
  role?: string;
}

// Error handler function
const handleError = (error: any, operation: string) => {
  console.error(`Error in ${operation}:`, error);
  
  if (error.response) {
    const { status, data } = error.response;
    throw new Error(`${operation} failed: ${data?.message || `HTTP ${status}`}`);
  } else if (error.request) {
    throw new Error(`${operation} failed: No response from server`);
  } else {
    throw new Error(`${operation} failed: ${error.message}`);
  }
};

// Lấy Pj bằng id
export const getProject = async (id: number): Promise<Project> => {
  try {
    const response: AxiosResponse<Project> = await api.get(`/Projects/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Get project');
    throw error;
  }
};

// Cập nhật Pj
export const updateProject = async (id: number, data: UpdateProjectRequest): Promise<Project> => {
  try {
    const response: AxiosResponse<Project> = await api.put(`/Projects/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, 'Update project');
    throw error;
  }
};

// Xóa Pj
export const deleteProject = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Projects/${id}`);
  } catch (error) {
    handleError(error, 'Delete project');
    throw error;
  }
};

// Lấy all Pj
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response: AxiosResponse<Project[]> = await api.get('/Projects');
    return response.data;
  } catch (error) {
    handleError(error, 'Get projects');
    throw error;
  }
};

// Tạo Pj
export const createProject = async (data: CreateProjectRequest): Promise<Project> => {
  try {
    const response: AxiosResponse<Project> = await api.post('/Projects', data);
    return response.data;
  } catch (error) {
    handleError(error, 'Create project');
    throw error;
  }
};

//  dự án theo ID chủ sở hữu
export const getProjectsByOwner = async (ownerId: number): Promise<Project[]> => {
  try {
    const response: AxiosResponse<Project[]> = await api.get(`/Projects/owner/${ownerId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Get projects by owner');
    throw error;
  }
};

// Lấy project theo ID thành viên
export const getProjectsByMember = async (memberId: number): Promise<Project[]> => {
  try {
    const response: AxiosResponse<Project[]> = await api.get(`/Projects/member/${memberId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Get projects by member');
    throw error;
  }
};

// lấy trạng thái Pj
export const getProjectsByStatus = async (status: string): Promise<Project[]> => {
  try {
    const response: AxiosResponse<Project[] | { data: Project[] }> = await api.get(`/Projects/status/${status}`);
    if (Array.isArray(response.data)) return response.data;
    if (response.data && Array.isArray((response.data as any).data)) return (response.data as any).data;
    return [];
  } catch (error) {
    handleError(error, 'Get projects by status');
    throw error;
  }
};

// Lấy dự án theo research topic ID
export const getProjectsByResearchTopic = async (researchTopicId: number): Promise<Project[]> => {
  try {
    const response: AxiosResponse<Project[]> = await api.get(`/Projects/research-topic/${researchTopicId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Get projects by research topic');
    throw error;
  }
};

// Thêm thành viên vào Pj
export const addMemberToProject = async (projectId: number, memberData: AddMemberRequest): Promise<ProjectMember> => {
  try {
    const response: AxiosResponse<ProjectMember> = await api.post(`/Projects/${projectId}/members`, memberData);
    return response.data;
  } catch (error) {
    handleError(error, 'Add member to project');
    throw error;
  }
};

// Lấy thành viên dự án
export const getProjectMembers = async (projectId: number): Promise<ProjectMember[]> => {
  try {
    const response: AxiosResponse<ProjectMember[]> = await api.get(`/Projects/${projectId}/members`);
    return response.data;
  } catch (error) {
    handleError(error, 'Get project members');
    throw error;
  }
};

// Xóa thành viên ra khỏi Pj
export const removeMemberFromProject = async (projectId: number, memberId: number): Promise<void> => {
  try {
    await api.delete(`/api/Projects/${projectId}/members/${memberId}`);
  } catch (error) {
    handleError(error, 'Remove member from project');
    throw error;
  }
};

// PATCH /Projects/{id}/status - cập nhật trạng thái dự án
export const updateProjectStatus = async (id: number, status: string): Promise<void> => {
  try {
    await api.patch(`/api/Projects/${id}/status`, { status });
  } catch (error) {
    handleError(error, 'Update project status');
    throw error;
  }
};