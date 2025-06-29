import { AxiosResponse } from 'axios';
import api from './apiService';

interface Evaluation {
  id: string;
  type: string;
  content: string;
  score: number;
  feedback: string;
  projectId: number;
  taskId: number;
}

interface CreateEvaluationRequest {
  type: string;
  content: string;
  score: number;
  feedback: string;
  projectId: number;
  taskId: number;
}

interface UpdateEvaluationRequest {
  type?: string;
  content?: string;
  score?: number;
  feedback?: string;
  projectId?: number;
  taskId?: number;
}
  // GET /api/Evaluations/{id}
export const evaluationService = {
  getEvaluationById: async (id: string): Promise<Evaluation> => {
    const response: AxiosResponse<Evaluation> = await api.get(`/Evaluations/${id}`);
    return response.data;
  },

  // PUT /api/Evaluations/{id}
  updateEvaluation: async (id: string, data: UpdateEvaluationRequest): Promise<Evaluation> => {
    const response: AxiosResponse<Evaluation> = await api.put(`/Evaluations/${id}`, data);
    return response.data;
  },

  // DELETE /api/Evaluations/{id}
  deleteEvaluation: async (id: string): Promise<void> => {
    await api.delete(`/Evaluations/${id}`);
  },

  // GET /api/Evaluations
  getAllEvaluations: async (): Promise<Evaluation[]> => {
    const response: AxiosResponse<Evaluation[]> = await api.get('/Evaluations');
    return response.data;
  },

  // POST /api/Evaluations
  createEvaluation: async (data: CreateEvaluationRequest): Promise<Evaluation> => {
    const response: AxiosResponse<Evaluation> = await api.post('/Evaluations', data);
    return response.data;
  },

  // GET /api/Evaluations/project/{projectId}
  getEvaluationsByProject: async (projectId: number): Promise<Evaluation[]> => {
    const response: AxiosResponse<Evaluation[]> = await api.get(`/Evaluations/project/${projectId}`);
    return response.data;
  },

  // GET /api/Evaluations/task/{taskId}
  getEvaluationsByTask: async (taskId: number): Promise<Evaluation[]> => {
    const response: AxiosResponse<Evaluation[]> = await api.get(`/Evaluations/task/${taskId}`);
    return response.data;
  },

  // GET /api/Evaluations/evaluated-by/{userId}
  getEvaluationsByUser: async (userId: string): Promise<Evaluation[]> => {
    const response: AxiosResponse<Evaluation[]> = await api.get(`/Evaluations/evaluated-by/${userId}`);
    return response.data;
  },

  // GET /api/Evaluations/type/{type}
  getEvaluationsByType: async (type: string): Promise<Evaluation[]> => {
    const response: AxiosResponse<Evaluation[]> = await api.get(`/Evaluations/type/${type}`);
    return response.data;
  },
};

// Usage example
export const useEvaluations = () => {
  const fetchEvaluations = async (): Promise<Evaluation[]> => {
    return await evaluationService.getAllEvaluations();
  };

  const createNewEvaluation = async (data: CreateEvaluationRequest): Promise<Evaluation> => {
    return await evaluationService.createEvaluation(data);
  };

  const updateExistingEvaluation = async (id: string, data: UpdateEvaluationRequest): Promise<Evaluation> => {
    return await evaluationService.updateEvaluation(id, data);
  };

  const removeEvaluation = async (id: string): Promise<void> => {
    await evaluationService.deleteEvaluation(id);
  };

  return {
    fetchEvaluations,
    createNewEvaluation,
    updateExistingEvaluation,
    removeEvaluation,
  };
};