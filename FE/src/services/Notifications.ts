import { AxiosResponse } from 'axios';
import api from './apiService';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
interface NotificationResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}

const baseUrl = '/api/Notifications';

export const getNotificationById = async (id: string): Promise<AxiosResponse<Notification>> => {
  const response = await api.get<Notification>(`${baseUrl}/${id}`);
  return response;
};

// Xóa tt theo id
export const deleteNotification = async (id: string): Promise<AxiosResponse<void>> => {
  return await api.delete(`${baseUrl}/${id}`);
};

// Lấy tất cả tt
export const getAllNotifications = async (params?: {
  page?: number;
  limit?: number;
  type?: string;
  isRead?: boolean;
}): Promise<AxiosResponse<NotificationResponse>> => {
  const response = await api.get<NotificationResponse>(baseUrl, { params });
  return response;
};

// Lấy tt chưa đọc
export const getUnreadNotifications = async (): Promise<AxiosResponse<Notification[]>> => {
  const response = await api.get<Notification[]>(`${baseUrl}/unread`);
  return response;
};

// Đánh dấu đã đọc
export const markAsRead = async (id: string): Promise<AxiosResponse<void>> => {
  return await api.patch(`${baseUrl}/${id}/mark-as-read`);
};

// Đánh dấu tất cả đã đọc
export const markAllAsRead = async (): Promise<AxiosResponse<void>> => {
  return await api.patch(`${baseUrl}/mark-all-as-read`);
};

// Đếm số tt chưa đọc
export const getUnreadCount = async (): Promise<number> => {
  const response = await getUnreadNotifications();
  return response.data.length;
};

// Xóa
export const bulkDeleteNotifications = async (ids: string[]): Promise<void> => {
  const deletePromises = ids.map(id => deleteNotification(id));
  await Promise.all(deletePromises);
};

// Đánh dấu nhiều đã đọc
export const markMultipleAsRead = async (ids: string[]): Promise<void> => {
  const markPromises = ids.map(id => markAsRead(id));
  await Promise.all(markPromises);
};