
import apiService from "@cnpm/services/apiService";

export interface Notification {
  _id: string; 
  userId: string; 
  type: string; 
  message: string; 
  createdAt: string; 
  isRead: boolean;
}
export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const { data } = await apiService.get<{ docs: Notification[] }>('/notifications');
    return data.docs.map(noti => ({ ...noti, id: noti._id }));
  } catch (error) {
    console.error("Lỗi khi tải danh sách thông báo:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (_id: string): Promise<void> => {
  if (!_id) {
    console.error("Lỗi: ID thông báo không hợp lệ!");
    return;
  }

  try {
    console.log(`Gửi request API: /notifications/mark-as-read?idNoti=${_id}`);
    const response = await apiService.post<void>(
      `/notifications/mark-as-read?idNoti=${_id}`
    );
    console.log("Kết quả từ server:", response);
  } catch (error) {
    console.error(`Lỗi API khi đánh dấu thông báo ${_id} là đã đọc`, error);
    throw error;
  }
};

export const fetchUnreadNotifications = async (): Promise<Notification[]> => {
  try {
    const notifications = await fetchNotifications();
    return notifications.filter((notification) => !notification.isRead);
  } catch (error) {
    console.error("Lỗi khi tải thông báo chưa đọc:", error);
    throw error;
  }
};

export const markAsReadAll = async (): Promise<void> => {
  try {
    console.log(`🔄 Gửi request API: /notifications/mark-as-read-all`);

    const response = await apiService.patch<void>(`/notifications/mark-as-read-all`);

    console.log("Kết quả từ server:", response);
  } catch (error) {
    console.error(" Lỗi API khi đánh dấu tất cả thông báo là đã đọc:", error);
    throw error;
  }
};
