import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification, getAllNotifications, markAsRead, deleteNotification } from '../services/Notifications';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getAllNotifications();
      if (response && response.data && response.data.data) {
        setNotifications(response.data.data);
      } else {
        setError("Không có dữ liệu thông báo.");
      }
    } catch (err) {
      setError("Lỗi khi tải thông báo.");
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead: handleMarkAsRead,
        deleteNotification: handleDeleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 