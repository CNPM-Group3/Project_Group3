"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@cnpm/components/Admin/Sidebar1";
import Header from "@cnpm/components/Header";
import { User } from "@cnpm/components/Admin/AddUserForm";
import usersService from "../services/usersService";

// Component UserTable với chức năng xóa
const UserTable: React.FC<{
  users: User[];
  onDelete?: (userId: string) => void;
  isDeleting?: boolean;
}> = ({ users, onDelete, isDeleting }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
    <div className="p-6 text-lg font-semibold border-b border-gray-200 text-gray-800">
      Bảng danh sách người dùng
    </div>
    <div className="p-6 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-white">
          <tr className="text-gray-500 text-left">
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Họ tên</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Số điện thoại</th>
            <th className="px-4 py-2 border-b">Vai trò</th>
            <th className="px-4 py-2 border-b">Trạng thái</th>
            <th className="px-4 py-2 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                Không có người dùng nào
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id || index} className="text-gray-800 border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-mono text-xs">{user.id || 'N/A'}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone || 'N/A'}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {user.status || 'Active'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 transition">
                      Sửa
                    </button>
                    {onDelete && user.id && (
                      <button
                        onClick={() => onDelete(user.id!)}
                        disabled={isDeleting}
                        className="px-3 py-1 text-xs font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDeleting ? 'Đang xóa...' : 'Xoá'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const InputDesign: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Lấy danh sách người dùng
  const fetchData = async () => {
    setLoading(true);
    try {
      const usersData = await usersService.getAllUsers();
      console.log("Users data:", usersData); // Debug log
      
      setUsers(usersData.map(u => ({
        id: u.id,
        name: u.name || "",
        email: u.email || "",
        phone: "", 
        role: Array.isArray(u.roles) ? u.roles.join(", ") : "",
        status: "active"
      })));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xử lý xóa người dùng với error handling tốt hơn
  const handleDeleteUser = async (userId: string) => {
    // Tìm user để hiển thị tên trong confirm
    const userToDelete = users.find(u => u.id === userId);
    const userName = userToDelete?.name || userToDelete?.email || userId;
    
    if (!confirm(`Bạn có chắc muốn xoá người dùng "${userName}" không?\n\nHành động này không thể hoàn tác!`)) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      console.log("Attempting to delete user with ID:", userId); // Debug log
      
      await usersService.deleteUser(userId);
      
      // Cập nhật danh sách sau khi xóa thành công
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      // Hiển thị thông báo thành công
      alert(`Đã xóa người dùng "${userName}" thành công!`);
      
    } catch (error: any) {
      console.error("Chi tiết lỗi khi xóa người dùng:", error);
      
      // Xử lý các loại lỗi khác nhau
      let errorMessage = "Không thể xóa người dùng. ";
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "";
        
        switch (status) {
          case 403:
            errorMessage += "Bạn không có quyền thực hiện hành động này.";
            break;
          case 404:
            errorMessage += "Người dùng không tồn tại.";
            break;
          case 400:
            errorMessage += "Yêu cầu không hợp lệ.";
            break;
          case 409:
            errorMessage += "Không thể xóa người dùng này do có dữ liệu liên quan.";
            break;
          default:
            errorMessage += `Lỗi máy chủ (${status}): ${message}`;
        }
      } else if (error.request) {
        errorMessage += "Không thể kết nối đến máy chủ.";
      } else {
        errorMessage += error.message || "Lỗi không xác định.";
      }
      
      alert(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  // Lọc người dùng theo từ khóa tìm kiếm
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter(user =>
    (user.name && user.name.toLowerCase().includes(normalizedSearch)) ||
    (user.email && user.email.toLowerCase().includes(normalizedSearch)) ||
    (user.role && user.role.toLowerCase().includes(normalizedSearch)) ||
    (user.id && user.id.toString().toLowerCase().includes(normalizedSearch)) ||
    (user.phone && user.phone.toLowerCase().includes(normalizedSearch))
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
    </div>
  );

  return (
    <main className="bg-white min-h-screen w-full border border-gray-200">
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
          <Sidebar />
        </aside>
        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
            <Header />
          </div>
          <main className="p-6 flex-1 overflow-y-auto bg-white mt-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center w-full">Quản lý người dùng</h1>
            {/* Top bar */}
            <div className="flex flex-wrap gap-8 mb-6 items-center">
              {/* Search */}
              <div className="relative w-96 max-md:w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm người dùng (tên, email, vai trò, ID)..."
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
            <UserTable 
              users={filteredUsers} 
              onDelete={handleDeleteUser}
              isDeleting={isDeleting}
            />
          </main>
        </div>
      </div>
    </main>
  );
};

export default InputDesign;