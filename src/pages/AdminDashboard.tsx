"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@cnpm/components/Admin/Sidebar1";
import Header from "@cnpm/components/Header";
import { UserTable, User } from "@cnpm/components/Admin/AddUserForm";
import { ApiUser, getAllUsers } from "@cnpm/services/userService";

const InputDesign: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUsers = await getAllUsers();
        // Transform ApiUser[] to User[] to match the expected interface
        const transformedUsers: User[] = apiUsers.map((apiUser: ApiUser) => ({
          name: apiUser.fullName,
          email: apiUser.email,
          phone: "N/A", // Default value since ApiUser doesn't have phone
          role: apiUser.role,
          status: apiUser.status
        }));
        setUsers(transformedUsers);
      } catch (error) {
        console.error("Lỗi khi tải người dùng:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-50 border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 overflow-y-auto bg-gray-50">
          {/* Top bar */}
          <div className="flex flex-wrap gap-8 mb-6 items-center">
            <div className="relative w-96 max-md:w-full">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="pl-10 pr-4 py-2 w-full text-sm rounded-lg bg-white border border-sky-500 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path
                    fill="#94A3B8"
                    d="M13 6.5c0 1.43-.47 2.76-1.25 3.83l3.96 3.96a1 1 0 1 1-1.42 1.41l-3.96-3.95A6.48 6.48 0 0 1 0 6.5C0 2.91 2.91 0 6.5 0S13 2.91 13 6.5Zm-2 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* User table */}
          <UserTable users={users} />
        </main>
      </div>
    </div>
  );
};

export default InputDesign;
