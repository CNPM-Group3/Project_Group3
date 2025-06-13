// types/evaluation.ts
interface Evaluation {
  id: string;
  title: string;
  description?: string;
  projectId?: string;
  taskId?: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  evaluatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  result?: any;
}

interface CreateEvaluationRequest {
  title: string;
  description?: string;
  projectId?: string;
  taskId?: string;
  type: string;
}

interface UpdateEvaluationRequest {
  title?: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: any;
}

// services/evaluationService.ts
import axios, { AxiosResponse } from 'axios';

class EvaluationService {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  // GET /api/Evaluations/{id} - Lấy thông tin evaluation theo ID
  async getEvaluationById(id: string): Promise<Evaluation> {
    try {
      const response: AxiosResponse<Evaluation> = await axios.get(
        `${this.baseURL}/Evaluations/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching evaluation:', error);
      throw new Error(`Failed to fetch evaluation with ID: ${id}`);
    }
  }

  // PUT /api/Evaluations/{id} - Cập nhật evaluation
  async updateEvaluation(id: string, data: UpdateEvaluationRequest): Promise<Evaluation> {
    try {
      const response: AxiosResponse<Evaluation> = await axios.put(
        `${this.baseURL}/Evaluations/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error updating evaluation:', error);
      throw new Error(`Failed to update evaluation with ID: ${id}`);
    }
  }

  // DELETE /api/Evaluations/{id} - Xóa evaluation
  async deleteEvaluation(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/Evaluations/${id}`);
    } catch (error) {
      console.error('Error deleting evaluation:', error);
      throw new Error(`Failed to delete evaluation with ID: ${id}`);
    }
  }

  // GET /api/Evaluations - Lấy danh sách tất cả evaluations
  async getAllEvaluations(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
  }): Promise<{
    data: Evaluation[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const response = await axios.get(`${this.baseURL}/Evaluations`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      throw new Error('Failed to fetch evaluations');
    }
  }

  // POST /api/Evaluations - Tạo evaluation mới
  async createEvaluation(data: CreateEvaluationRequest): Promise<Evaluation> {
    try {
      const response: AxiosResponse<Evaluation> = await axios.post(
        `${this.baseURL}/Evaluations`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error creating evaluation:', error);
      throw new Error('Failed to create evaluation');
    }
  }

  // GET /api/Evaluations/project/{projectId} - Lấy evaluations theo project
  async getEvaluationsByProject(projectId: string): Promise<Evaluation[]> {
    try {
      const response: AxiosResponse<Evaluation[]> = await axios.get(
        `${this.baseURL}/Evaluations/project/${projectId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching evaluations by project:', error);
      throw new Error(`Failed to fetch evaluations for project: ${projectId}`);
    }
  }

  // GET /api/Evaluations/task/{taskId} - Lấy evaluations theo task
  async getEvaluationsByTask(taskId: string): Promise<Evaluation[]> {
    try {
      const response: AxiosResponse<Evaluation[]> = await axios.get(
        `${this.baseURL}/Evaluations/task/${taskId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching evaluations by task:', error);
      throw new Error(`Failed to fetch evaluations for task: ${taskId}`);
    }
  }

  // GET /api/Evaluations/evaluated-by/{userId} - Lấy evaluations theo người đánh giá
  async getEvaluationsByUser(userId: string): Promise<Evaluation[]> {
    try {
      const response: AxiosResponse<Evaluation[]> = await axios.get(
        `${this.baseURL}/Evaluations/evaluated-by/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching evaluations by user:', error);
      throw new Error(`Failed to fetch evaluations for user: ${userId}`);
    }
  }

  // GET /api/Evaluations/type/{type} - Lấy evaluations theo loại
  async getEvaluationsByType(type: string): Promise<Evaluation[]> {
    try {
      const response: AxiosResponse<Evaluation[]> = await axios.get(
        `${this.baseURL}/Evaluations/type/${type}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching evaluations by type:', error);
      throw new Error(`Failed to fetch evaluations of type: ${type}`);
    }
  }

  // Phương thức tiện ích để xử lý lỗi
  private handleError(error: any, message: string): never {
    if (error.response) {
      // Server responded with error status
      console.error(`${message}:`, error.response.data);
      throw new Error(`${message}: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error(`${message}: No response received`);
      throw new Error(`${message}: Network error`);
    } else {
      // Something else happened
      console.error(`${message}:`, error.message);
      throw new Error(`${message}: ${error.message}`);
    }
  }
}

// Export singleton instance
export const evaluationService = new EvaluationService();
export default EvaluationService;

// Cách sử dụng service:

// 1. Tạo evaluation mới
/*
try {
  const newEvaluation = await evaluationService.createEvaluation({
    title: "Code Quality Assessment",
    description: "Evaluate code quality for project X",
    projectId: "proj-123",
    type: "code_quality"
  });
  console.log('Created evaluation:', newEvaluation);
} catch (error) {
  console.error('Failed to create evaluation:', error.message);
}
*/

// 2. Lấy danh sách evaluations
/*
try {
  const evaluations = await evaluationService.getAllEvaluations({
    page: 1,
    limit: 10,
    status: 'completed'
  });
  console.log('Evaluations:', evaluations);
} catch (error) {
  console.error('Failed to fetch evaluations:', error.message);
}
*/

// 3. Cập nhật evaluation
/*
try {
  const updatedEvaluation = await evaluationService.updateEvaluation('eval-123', {
    status: 'completed',
    result: { score: 85, feedback: 'Good work!' }
  });
  console.log('Updated evaluation:', updatedEvaluation);
} catch (error) {
  console.error('Failed to update evaluation:', error.message);
}
*/