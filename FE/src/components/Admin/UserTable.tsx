import React from "react";
import { User } from "./types";

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
      {/* Tiêu đề bảng */}
      <div className="p-6 text-lg font-semibold border-b border-gray-200 text-gray-800">
        Bảng danh sách người dùng
      </div>

      {/* Bảng người dùng */}
      <div className="p-6 bg-white">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-white">
            <tr className="text-gray-500 text-left">
              <th className="px-4 py-2 border-b border-gray-200">Họ tên</th>
              <th className="px-4 py-2 border-b border-gray-200">Email</th>
              <th className="px-4 py-2 border-b border-gray-200">Số điện thoại</th>
              <th className="px-4 py-2 border-b border-gray-200">Vai trò</th>
              <th className="px-4 py-2 border-b border-gray-200">Trạng thái</th>
              <th className="px-4 py-2 border-b border-gray-200">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="text-gray-800 border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.status}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 transition">
                      Sửa
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition">
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
};
