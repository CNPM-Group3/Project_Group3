"use client";

import React from "react";
import { useNotifications } from "../../contexts/NotificationContext";

export const NotificationBadge: React.FC = () => {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="8" fill="#33AAB1"/>
        <path d="M24 39C26.3689 39 28.2857 37.3228 28.2857 35.25H19.7143C19.7143 37.3228 21.6311 39 24 39ZM38.4224 30.2256C37.1334 29.0098 34.7059 27.1787 34.7059 21.1875C34.7059 16.6318 31.0647 12.9917 26.1429 12.0981V10.875C26.1429 9.84229 25.1802 9 24 9C22.8198 9 21.8571 9.84229 21.8571 10.875V12.0981C16.9353 12.9917 13.2941 16.6318 13.2941 21.1875C13.2941 27.1787 10.8666 29.0098 9.57757 30.2256C9.17578 30.6064 9 31.0605 9 31.5C9.00837 32.4595 9.87054 33.375 11.1512 33.375H36.8488C38.1295 33.375 38.9916 32.4595 39 31.5C39 31.0605 38.8242 30.6064 38.4224 30.2256Z" fill="white"/>
      </svg>
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </div>
      )}
    </div>
  );
}; 