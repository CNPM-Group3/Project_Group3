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

<<<<<<< HEAD
export interface NotificationResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}

=======
>>>>>>> Nhi
// Lấy thông tin chi tiết một thông báo
export const getNotificationDetails = async (
  id: string
): Promise<Notification> => {
  try {
<<<<<<< HEAD
    const response = await ApiService.get<Notification>(`/notifications/${id}`);
=======
    const response = await ApiService.get<Notification>(`/Notifications/${id}`);
>>>>>>> Nhi
    return response.data;
  } catch (error) {
    console.error(`Error fetching notification with id ${id}:`, error);
    throw error;
  }
};

// Lấy danh sách thông báo
export const getNotifications = async (): Promise<Notification[]> => {
  try {
<<<<<<< HEAD
    const response = await ApiService.get<Notification[]>('/notifications');
=======
    const response = await ApiService.get<Notification[]>('/Notifications');
>>>>>>> Nhi
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Lấy các thông báo chưa đọc
export const getUnreadNotifications = async (): Promise<Notification[]> => {
  try {
<<<<<<< HEAD
    const response = await ApiService.get<Notification[]>('/notifications/unread');
=======
    const response = await ApiService.get<Notification[]>('/Notifications/unread');
>>>>>>> Nhi
    return response.data;
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    throw error;
  }
};

// Đánh dấu thông báo là đã đọc
export const markAsRead = async (id: string): Promise<AxiosResponse> => {
  try {
<<<<<<< HEAD
    const response = await ApiService.patch<void>(`/notifications/${id}/mark-as-read`);
=======
    const response = await ApiService.patch<void>(`/Notifications/${id}/mark-as-read`);
>>>>>>> Nhi
    return response;
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
    throw error;
  }
};

// Đánh dấu tất cả thông báo là đã đọc
export const markAllAsRead = async (): Promise<AxiosResponse> => {
  try {
<<<<<<< HEAD
    const response = await ApiService.patch<void>('/notifications/mark-all-as-read');
=======
    const response = await ApiService.patch<void>('/Notifications/mark-all-as-read');
>>>>>>> Nhi
    return response;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Xóa thông báo theo ID
export const deleteNotification = async (id: string): Promise<AxiosResponse> => {
  try {
<<<<<<< HEAD
    const response = await ApiService.delete(`/notifications/${id}`);
=======
    const response = await ApiService.delete(`/Notifications/${id}`);
>>>>>>> Nhi
    return response;
  } catch (error) {
    console.error(`Error deleting notification with id ${id}:`, error);
    throw error;
  }
};
<<<<<<< HEAD

// Lấy thông báo theo ID
export const getNotificationById = async (id: string): Promise<Notification> => {
  try {
    const response = await ApiService.get<Notification>(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notification with id ${id}:`, error);
    throw error;
  }
};

// Lấy tất cả thông báo với phân trang và lọc
export const getAllNotifications = async (params?: {
  page?: number;
  limit?: number;
  type?: string;
  isRead?: boolean;
}): Promise<NotificationResponse> => {
  try {
    const response = await ApiService.get<NotificationResponse>('/notifications', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching all notifications:', error);
    throw error;
  }
};

// Đếm số thông báo chưa đọc
export const getUnreadCount = async (): Promise<number> => {
  try {
    const response = await getUnreadNotifications();
    return response.length;
  } catch (error) {
    console.error('Error getting unread count:', error);
    throw error;
  }
};

// Xóa nhiều thông báo
export const bulkDeleteNotifications = async (ids: string[]): Promise<void> => {
  try {
    const deletePromises = ids.map(id => deleteNotification(id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error bulk deleting notifications:', error);
    throw error;
  }
};

// Đánh dấu nhiều thông báo đã đọc
export const markMultipleAsRead = async (ids: string[]): Promise<void> => {
  try {
    const markPromises = ids.map(id => markAsRead(id));
    await Promise.all(markPromises);
  } catch (error) {
    console.error('Error marking multiple notifications as read:', error);
    throw error;
  }
};
=======
>>>>>>> Nhi
