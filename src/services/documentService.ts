import axios from "axios";

const API_URL = "/Document";

export const uploadDocument = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getDocument = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateDocument = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteDocument = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getDocuments = async (params = {}) => {
  const response = await axios.get(`${API_URL}`, { params });
  return response.data;
};

export const downloadDocument = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}/download`, {
    responseType: "blob",
  });
  return response.data;
};

export const getDocumentsByProject = async (projectId: number) => {
  const response = await axios.get(`${API_URL}/project/${projectId}`);
  return response.data;
};

export const getDocumentsByResearchTopic = async (researchTopicId: number) => {
  const response = await axios.get(`${API_URL}/research-topic/${researchTopicId}`);
  return response.data;
};
