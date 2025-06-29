import { AxiosResponse } from 'axios';
import ApiService from '@cnpm/services/apiService';

// Định nghĩa interface Notification
export interface Notification {
  id: string;                // ID của thông báo
  message: string;           // Nội dung thông báo
  type: string;              // Loại thông báo
  relatedEntityType: string; // Kiểu thực thể liên quan
  isRead: boolean;           // Trạng thái đã đọc
  createdAt: string;         // Thời gian tạo thông báo
  userId: string;            // ID người dùng
}

// Lấy thông tin chi tiết một thông báo
export const getNotificationDetails = async (
  id: string
): Promise<Notification> => {
  try {
    const response = await ApiService.get<Notification>(`/Notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notification with id ${id}:`, error);
    throw error;
  }
};

// Lấy danh sách thông báo
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await ApiService.get<Notification[]>('/Notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Lấy các thông báo chưa đọc
export const getUnreadNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await ApiService.get<Notification[]>('/Notifications/unread');
    return response.data;
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    throw error;
  }
};

// Đánh dấu thông báo là đã đọc
export const markAsRead = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await ApiService.patch<void>(`/Notifications/${id}/mark-as-read`);
    return response;
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
    throw error;
  }
};

// Đánh dấu tất cả thông báo là đã đọc
export const markAllAsRead = async (): Promise<AxiosResponse> => {
  try {
    const response = await ApiService.patch<void>('/Notifications/mark-all-as-read');
    return response;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Xóa thông báo theo ID
export const deleteNotification = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await ApiService.delete(`/Notifications/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting notification with id ${id}:`, error);
    throw error;
  }
};
