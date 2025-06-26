"use client";
import React, { useState } from "react";
import { Search, Bell, MessageCircle, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getNotifications, getUnreadNotifications, markAsRead, Notification } from "@cnpm/services/notificationService";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const fetchNotifications = async () => {
    console.log("BẮT ĐẦU fetchNotifications");
    // Luôn thử gọi API để kiểm tra request, không return sớm
    let email = '';
    if (user && user.email) {
      email = user.email.toLowerCase();
    } else {
      console.log("Không có user hoặc email, vẫn gọi API để kiểm tra");
    }
    console.log("Gọi API Notification");
    const notis = await getNotifications();
    console.log("Kết quả API Notification:", notis);
    let filteredNotis: Notification[] = [];
    if (Array.isArray(notis)) {
      if (email.endsWith("@ut.edu.vn")) {
        filteredNotis = notis.filter(n => n.type === "researcher" || n.type === "principal");
      } else if (email.endsWith("@gv.edu.vn")) {
        filteredNotis = notis.filter(n => n.type === "host");
      } else if (email === "hdtd@ut.edu.vn") {
        filteredNotis = notis.filter(n => n.type === "council");
      } else if (email === "admin@ut.edu.vn") {
        filteredNotis = notis.filter(n => n.type === "admin");
      } else if (email === "staff@ut.edu.vn") {
        filteredNotis = notis.filter(n => n.type === "staff");
      } else {
        filteredNotis = notis;
      }
      setNotifications(filteredNotis);
      setUnreadCount(filteredNotis.filter(n => !n.isRead).length);
    } else {
      console.error("API Notification trả về không phải mảng:", notis);
      setNotifications([]);
      setUnreadCount(0);
    }
    console.log("KẾT THÚC fetchNotifications");
  };

  const handleNotificationClick = async () => {
    console.log("Click chuông");
    await fetchNotifications();
    setShowDropdown((prev) => !prev);
    console.log("Đã setShowDropdown");
  };

  const handleNotificationItemClick = async (noti: Notification) => {
    if (!noti.isRead) {
      await markAsRead(noti.id);
      await fetchNotifications();
    }
    // Không có relatedEntityId, chỉ mở popup chi tiết
    setSelectedNotification(noti);
  };

  return (
    <header className="w-full h-20 px-6 bg-white shadow-sm border-b border-gray-100 flex items-center justify-between relative z-10">
      {/* Logo/Brand */}
      <div className="flex items-center justify-center">
        <div className="w-20 h-10 bg-gradient-to-br from-teal-300 to-teal-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">SRPM</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-lg mx-8">
        <div className={`relative flex items-center rounded-full border-2 transition-all duration-300 ${
          searchFocused 
            ? 'border-blue-500 shadow-lg shadow-blue-100' 
            : 'border-gray-200 hover:border-gray-300'
        } bg-gray-50 hover:bg-white`}>
          <div className="pl-4 pr-3">
            <Search className={`w-5 h-5 transition-colors duration-200 ${
              searchFocused ? 'text-blue-500' : 'text-gray-400'
            }`} />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 py-3 pr-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="pr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Notification */}
        <button
          className="relative p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
          onClick={handleNotificationClick}
        >
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-2 font-bold border-b">Thông báo</div>
              {notifications.length === 0 ? (
                <div className="p-4 text-gray-500 text-center">Không có thông báo</div>
              ) : (
                notifications.map((noti) => (
                  <div
                    key={noti.id}
                    className={`p-3 border-b last:border-b-0 text-sm cursor-pointer transition-colors duration-150 ${noti.isRead ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-blue-50 text-gray-700'}`}
                    onClick={() => handleNotificationItemClick(noti)}
                  >
                    {noti.message}
                  </div>
                ))
              )}
            </div>
          )}
        </button>

        {/* Messages */}
        <button className="relative p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group">
          <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Popup chi tiết thông báo */}
      {selectedNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="font-bold text-lg mb-2">Chi tiết thông báo</h2>
            <div className="mb-2">{selectedNotification.message}</div>
            <div className="text-xs text-gray-500 mb-2">
              {new Date(selectedNotification.createdAt).toLocaleString()}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setSelectedNotification(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;