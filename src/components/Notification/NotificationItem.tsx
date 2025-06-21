"use client";

import React from "react";
import { Notification } from "../../types/notification";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  return (
    <div
      className={`flex items-start gap-2 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${
        !notification.isRead ? "border-l-4 border-l-blue-500 bg-blue-50" : "border-gray-200"
      }`}
      onClick={onMarkAsRead}
    >
      <span className="mt-0.5 text-sky-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path stroke="currentColor" strokeWidth="2" d="M12 8v4m0 4h.01"/>
        </svg>
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">{notification.title}</span>
        <span className="text-sm text-gray-600">{notification.message}</span>
        <span className="text-xs text-gray-400 mt-1">
          {new Date(notification.createdAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}; 