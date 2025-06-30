"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@cnpm/components/Admin/Sidebar1";
import Header from "@cnpm/components/Header";
import usersService from "@cnpm/services/usersService";

// Kiểu dữ liệu người dùng
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

// Component bảng người dùng với chức năng xóa
const UserTable: React.FC<{
  users: User[];
  onDelete: (userId: string) => void;
}> = ({ users, onDelete }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        Danh sách người dùng
        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
          {users.length} người dùng
        </span>
      </h2>
    </div>
    
    <div className="overflow-x-auto">
      {users.length === 0 ? (
        <div className="p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-500 text-lg font-medium">Không tìm thấy người dùng nào</p>
          <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vai trò</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 mt-0.5"></div>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors duration-150">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors duration-150"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

const InputDesign: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const rawUsers = await usersService.getAllUsers();
      const processedUsers = rawUsers.map((u) => ({
        id: u.id,
        name: u.name || "",
        email: u.email || "",
        role: Array.isArray(u.roles) ? u.roles.join(", ") : "",
        status: "active",
      }));
      
      setUsers(processedUsers);
      
      // Lấy danh sách các role unique
      const roles = [...new Set(processedUsers.map(user => user.role).filter(role => role))];
      setAvailableRoles(roles);
      
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý xóa người dùng
  const handleDeleteUser = async (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    const userName = userToDelete?.name || userToDelete?.email || userId;
    
    if (!confirm(`Bạn có chắc muốn xoá người dùng "${userName}" không?\n\nHành động này không thể hoàn tác!`)) return;
    
    try {
      await usersService.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert(`Đã xóa người dùng "${userName}" thành công!`);
    } catch (error) {
      console.error("Lỗi khi xoá người dùng:", error);
      alert("Không thể xoá người dùng. Vui lòng thử lại!");
    }
  };

  // Lọc người dùng theo từ khóa tìm kiếm và role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = !roleFilter || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 text-gray-600 bg-white rounded-lg shadow-md">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang tải dữ liệu...
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-[18%] border-r border-slate-200 bg-gray-50">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="w-[110%] flex flex-col">
          <Header />
          <main className="p-6 flex-1 overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
              <p className="text-gray-600">Quản lý thông tin và quyền hạn của người dùng trong hệ thống</p>
            </div>
              
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-wrap gap-4 items-end">
                  {/* Search */}
                  <div className="flex-1 min-w-80">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tìm theo tên, email hoặc vai trò..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                      />
                      <div className="absolute left-3 top-3 text-gray-400">
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                          <path
                            fill="currentColor"
                            d="M13 6.5c0 1.43-.47 2.76-1.25 3.83l3.96 3.96a1 1 0 1 1-1.42 1.41l-3.96-3.95A6.48 6.48 0 0 1 0 6.5C0 2.91 2.91 0 6.5 0S13 2.91 13 6.5Zm-2 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Role Filter */}
                  <div className="min-w-48">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lọc theo vai trò</label>
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-150"
                    >
                      <option value="">Tất cả vai trò</option>
                      {availableRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear filters */}
                  {(searchTerm || roleFilter) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setRoleFilter("");
                      }}
                      className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-150"
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                </div>
              </div>

              {/* User table */}
              <UserTable users={filteredUsers} onDelete={handleDeleteUser} />
            </div>
          </main>
        </div>
      </div>
    </main>
  );
};

export default InputDesign;