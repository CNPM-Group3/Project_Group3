"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@cnpm/components/Admin/Sidebar1";
import Header from "@cnpm/components/Header";
import { ApprovalSection, ApprovalRequest } from "@cnpm/components/Admin/AddUserForm";
import { AddUserForm } from "@cnpm/components/Admin/AddUserForm";
import { UserTable } from "@cnpm/components/Admin/AddUserForm";
import { ApiUser, getAllUsers, saveUser } from "@cnpm/services/userService";
import apiService from "@cnpm/services/apiService";


const AdminDashboard = () => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (err: any) {
      console.error('Failed to fetch users:', err);
      setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const fetchApprovalRequests = async () => {
      try {
        const requestsResponse = await apiService.get('/approval-requests');
        setRequests(requestsResponse.data);
      } catch (err: any) {
        console.error('Failed to fetch approval requests:', err);
        setError('Không thể tải yêu cầu phê duyệt.');
      }
    };

    fetchApprovalRequests();
  }, []);

  const handleAddUser = async (userData: any) => {
    try {
      setLoading(true);
      setError(null);
      await saveUser(userData);
      await fetchUsers(); // Refresh the user list
    } catch (err: any) {
      console.error('Failed to add user:', err);
      setError('Không thể thêm người dùng mới. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-50 border-r border-gray-200">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 overflow-y-auto">
          {/* Error message */}
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {/* Top bar */}
              <div className="flex flex-wrap gap-8 mb-6 items-center">
                {/* Search */}
                <div className="relative w-96 max-md:w-full">
                  <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
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
              <UserTable users={filteredUsers} />

              {/* Forms */}
              <div className="flex gap-6 mt-6 flex-wrap max-md:flex-col">
                <AddUserForm onAddUser={handleAddUser} />
                <ApprovalSection requests={requests} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
