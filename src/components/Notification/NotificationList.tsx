"use client";

import React from "react";
import { useNotifications } from "../../contexts/NotificationContext";
import { NotificationItem } from "./NotificationItem";

export const NotificationList: React.FC = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông báo</h2>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={() => markAsRead(notification.id)}
          />
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            Không có thông báo nào
          </div>
        )}
      </div>
    </div>
  );
}; 