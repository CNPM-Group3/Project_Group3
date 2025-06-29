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
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
    <div className="p-6 text-lg font-semibold border-b border-gray-200 text-gray-800">
      Bảng danh sách người dùng
    </div>
    <div className="p-6 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-white">
          <tr className="text-gray-500 text-left">
            <th className="px-4 py-2 border-b">Họ tên</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Số điện thoại</th>
            <th className="px-4 py-2 border-b">Vai trò</th>
            <th className="px-4 py-2 border-b">Trạng thái</th>
            <th className="px-4 py-2 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-gray-800 border-b hover:bg-gray-50 transition">
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">{user.status}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 transition">
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="px-3 py-1 text-xs font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition"
                  >
                    Xoá
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const InputDesign: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const rawUsers = await usersService.getAllUsers();
      setUsers(
        rawUsers.map((u) => ({
          id: u.id,
          name: u.name || "",
          email: u.email || "",
          phone: "", // API không có phone, để trống
          role: Array.isArray(u.roles) ? u.roles.join(", ") : "",
          status: "active", // Mặc định là active vì API không có status
        }))
      );
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
    if (!confirm("Bạn có chắc muốn xoá người dùng này không?")) return;
    
    try {
      await usersService.deleteUser(userId);
      // Cập nhật state để loại bỏ người dùng đã xóa khỏi danh sách
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("Xóa người dùng thành công!");
    } catch (error) {
      console.error("Lỗi khi xoá người dùng:", error);
      alert("Không thể xoá người dùng. Vui lòng thử lại!");
    }
  };

  // Lọc người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Đang tải dữ liệu...</div>;

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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý người dùng</h1>
            
            {/* Top bar */}
            <div className="flex flex-wrap gap-8 mb-6 items-center">
              {/* Search */}
              <div className="relative w-96 max-md:w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm người dùng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
            <UserTable users={filteredUsers} onDelete={handleDeleteUser} />
          </main>
        </div>
      </div>
    </main>
  );
};

export default InputDesign;