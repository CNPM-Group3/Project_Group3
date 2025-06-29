import { AxiosResponse } from 'axios';
import api from './apiService';

// Types
interface CreateResearchTopicPayload {
  title: string;
  description: string;
  objectives: string;
  expectedOutcomes: string;
  requirements: string;
  availableFunding: number;
}

interface UpdateResearchTopicPayload {
  title: string;
  description: string;
  objectives: string;
  expectedOutcomes: string;
  requirements: string;
  availableFunding: number;
  isActive: boolean;
}

interface ResearchTopic {
  id: number;
  title: string;
  description: string;
  objectives: string;
  expectedOutcomes: string;
  requirements: string;
  availableFunding: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const researchTopicService = {
  // Lấy thông tin chi tiết của một đề tài nghiên cứu
  async getResearchTopic(id: number): Promise<AxiosResponse<ResearchTopic>> {
    try {
      return await api.get(`/ResearchTopics/${id}`);
    } catch (error) {
      console.error('Error fetching research topic:', error);
      throw error;
    }
  },

  // Cập nhật thông tin của một đề tài nghiên cứu
  async updateResearchTopic(id: number, payload: UpdateResearchTopicPayload): Promise<AxiosResponse<ResearchTopic>> {
    try {
      return await api.put(`/ResearchTopics/${id}`, payload);
    } catch (error) {
      console.error('Error updating research topic:', error);
      throw error;
    }
  },

  // Xóa một đề tài nghiên cứu theo ID
  async deleteResearchTopic(id: number): Promise<AxiosResponse<any>> {
    try {
      return await api.delete(`/ResearchTopics/${id}`);
    } catch (error) {
      console.error('Error deleting research topic:', error);
      throw error;
    }
  },

  // Lấy danh sách tất cả các đề tài nghiên cứu
  async getAllResearchTopics(): Promise<AxiosResponse<ResearchTopic[]>> {
    try {
      return await api.get('/ResearchTopics');
    } catch (error) {
      console.error('Error fetching all research topics:', error);
      throw error;
    }
  },

  // Tạo mới một đề tài nghiên cứu
  async createResearchTopic(payload: CreateResearchTopicPayload): Promise<AxiosResponse<ResearchTopic>> {
    try {
      return await api.post('/ResearchTopics', payload);
    } catch (error) {
      console.error('Error creating research topic:', error);
      throw error;
    }
  },

  // Lấy danh sách các đề tài nghiên cứu đang hoạt động
  async getActiveResearchTopics(): Promise<AxiosResponse<ResearchTopic[]>> {
    try {
      return await api.get('/ResearchTopics/active');
    } catch (error) {
      console.error('Error fetching active research topics:', error);
      throw error;
    }
  },

  // Lấy danh sách các đề tài nghiên cứu theo người tạo
  async getResearchTopicsByCreator(userId: number): Promise<AxiosResponse<ResearchTopic[]>> {
    try {
      return await api.get(`/ResearchTopics/created-by/${userId}`);
    } catch (error) {
      console.error('Error fetching research topics by creator:', error);
      throw error;
    }
  },

  // Chuyển trạng thái hoạt động của một đề tài
  async toggleActiveResearchTopic(id: number): Promise<AxiosResponse<any>> {
    try {
      return await api.patch(`/ResearchTopics/${id}/toggle-active`);
    } catch (error) {
      console.error('Error toggling active state of research topic:', error);
      throw error;
    }
  },
};
