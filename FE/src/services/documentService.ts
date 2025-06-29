// Fixed document service with proper API integration

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/Document";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000, // 5 minutes timeout for large file uploads
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = sessionStorage.getItem('accessToken');
         
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
         
    // Log request details for debugging
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      hasData: !!config.data
    });
         
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Helper function to create FormData for multiple document upload
export const createMultipleDocumentFormData = (
  files: File[],
  projectIds: number[] = [],
  researchTopicIds: number[] = [],
  defaultCategory: string = "Tài liệu dự án"
): FormData => {
  const formData = new FormData();
  
  // Add files
  files.forEach((file, index) => {
    formData.append('Files', file);
    console.log(`Added file ${index}:`, {
      name: file.name,
      size: file.size,
      type: file.type
    });
  });
  
  // Add ProjectIds (if any)
  projectIds.forEach((id, index) => {
    formData.append('ProjectIds', id.toString());
    console.log(`Added ProjectId ${index}:`, id);
  });
  
  // Add ResearchTopicIds (if any)
  researchTopicIds.forEach((id, index) => {
    formData.append('ResearchTopicIds', id.toString());
    console.log(`Added ResearchTopicId ${index}:`, id);
  });
  
  // Add DefaultCategory
  if (defaultCategory) {
    formData.append('DefaultCategory', defaultCategory);
    console.log('Added DefaultCategory:', defaultCategory);
  }
  
  // // Debug the complete FormData
  // debugFormData(formData);
  
  return formData;
};

// Upload multiple documents
export const uploadMultipleDocuments = async (formData: FormData) => {
  
  try {
    console.log("=== Starting Multiple Document Upload ===");
    
    const response = await apiClient.post('/upload-multiple', formData, {
      headers: {
    'Content-Type': 'multipart/form-data', // ✅ BẮT BUỘC PHẢI CÓ
  },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      }
    });
    
    console.log("Upload completed successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Upload failed:", error);
    
    // Enhanced error handling
    if (error.response) {
      const { status, data, statusText } = error.response;
      console.error(`Server error ${status} (${statusText}):`, data);
      
      // Return structured error for better handling
      throw {
        ...error,
        serverError: true,
        status,
        message: data?.message || data?.error || statusText,
        details: data
      };
    } else if (error.request) {
      console.error("Network error - no response received:", error.request);
      throw {
        ...error,
        networkError: true,
        message: "Network error - please check your connection"
      };
    } else {
      console.error("Request setup error:", error.message);
      throw {
        ...error,
        setupError: true,
        message: error.message || "Request setup failed"
      };
    }
  }
};

// Upload single document
export const uploadSingleDocument = async (
  file: File,
  projectIds: number[] = [],
  researchTopicIds: number[] = [],
  category: string = "Tài liệu dự án"
) => {
  try {
    console.log("=== Starting Single Document Upload ===");
    
    const formData = new FormData();
    formData.append('file', file);
    
    // Add metadata
    projectIds.forEach(id => formData.append('projectIds', id.toString()));
    researchTopicIds.forEach(id => formData.append('researchTopicIds', id.toString()));
    formData.append('category', category);
    
    // debugFormData(formData);
    
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      },
    });
    
    console.log("Single upload completed successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Single upload failed:", error);
    throw error;
  }
};

// Get document by ID
export const getDocumentById = async (id: number) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get document ${id}:`, error);
    throw error;
  }
};

// Get all documents
export const getAllDocuments = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error("Failed to get all documents:", error);
    throw error;
  }
};

// Get documents by project ID
export const getDocumentsByProjectId = async (projectId: number) => {
  try {
    const response = await apiClient.get(`/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get documents for project ${projectId}:`, error);
    throw error;
  }
};

// Get documents by research topic ID
export const getDocumentsByResearchTopicId = async (researchTopicId: number) => {
  try {
    const response = await apiClient.get(`/research-topic/${researchTopicId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get documents for research topic ${researchTopicId}:`, error);
    throw error;
  }
};

// Download document
export const downloadDocument = async (id: number) => {
  try {
    const response = await apiClient.get(`/${id}/download`, {
      responseType: 'blob',
    });
    
    // Create blob URL for download
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    
    // Get filename from response headers
    const contentDisposition = response.headers['content-disposition'];
    let filename = `document_${id}`;
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true, filename };
  } catch (error) {
    console.error(`Failed to download document ${id}:`, error);
    throw error;
  }
};

// Update document
export const updateDocument = async (id: number, data: any) => {
  try {
    const response = await apiClient.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update document ${id}:`, error);
    throw error;
  }
};

// Delete document
export const deleteDocument = async (id: number) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete document ${id}:`, error);
    throw error;
  }
};

// Batch delete documents
export const deleteMultipleDocuments = async (ids: number[]) => {
  try {
    const response = await apiClient.delete('/', {
      data: { ids }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete multiple documents:", error);
    throw error;
  }
};

// Search documents
export const searchDocuments = async (query: string, filters: any = {}) => {
  try {
    const response = await apiClient.get('/search', {
      params: {
        q: query,
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to search documents:", error);
    throw error;
  }
};

// Get document metadata
export const getDocumentMetadata = async (id: number) => {
  try {
    const response = await apiClient.get(`/${id}/metadata`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get document metadata ${id}:`, error);
    throw error;
  }
};

// Export all document service functions
export default {
  // Upload functions
  uploadMultipleDocuments,
  uploadSingleDocument,
  createMultipleDocumentFormData,
  
  // CRUD operations
  getDocumentById,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  deleteMultipleDocuments,
  
  // Query functions
  getDocumentsByProjectId,
  getDocumentsByResearchTopicId,
  searchDocuments,
  
  // Utility functions
  downloadDocument,
  getDocumentMetadata,
  
  // Debug helper
  // debugFormData
};