import React, { useState } from "react";
import { ApiUser } from "@cnpm/services/userService";

// Types
export type User = ApiUser;

export interface ApprovalRequest {
  sender: string;
  requestType: string;
  date: string;
  status: string;
}

interface AddUserFormProps {
  onAddUser: (userData: { name: string; email: string; password: string }) => Promise<void>;
}

// AddUserForm Component
export const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await onAddUser({
        name,
        email,
        password,
      });
      setSuccess("Thêm người dùng mới thành công!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Không thể thêm người dùng. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-xl border border-gray-200 bg-white w-[317px] max-sm:w-full shadow-sm">
      {/* Tiêu đề */}
      <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-700">
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
          <path
            d="M20.1666 10.984C20.1666 11.5669 19.6929 12.0399 19.109 12.0399H12.0577V19.0787C12.0577 19.6616 11.5839 20.1346 11 20.1346C10.416 20.1346 9.94229 19.6616 9.94229 19.0787V12.0399H2.89101C2.30707 12.0399 1.83331 11.5669 1.83331 10.984C1.83331 10.4011 2.30707 9.92819 2.89101 9.92819H9.94229V2.88933C9.94229 2.30642 10.416 1.8335 11 1.8335C11.5839 1.8335 12.0577 2.30642 12.0577 2.88933V9.92819H19.109C19.6929 9.92819 20.1666 10.4011 20.1666 10.984Z"
            fill="black"
          />
        </svg>
        <span>Cấp tài khoản mới</span>
      </div>

      {error && <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
      {success && <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm text-gray-700">
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition disabled:opacity-50"
        >
          {loading ? "Đang thêm..." : "Thêm người dùng"}
        </button>
      </form>
    </div>
  );
};

// ApprovalSection Component
interface ApprovalSectionProps {
  requests: ApprovalRequest[];
}

export const ApprovalSection: React.FC<ApprovalSectionProps> = ({ requests }) => {
  return (
    <div className="flex-1 p-6 rounded-xl border border-gray-200 bg-white shadow-sm max-sm:w-full">
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        Phê duyệt giao dịch & hoạt động
      </h2>

      {/* Header Row */}
      <div className="grid grid-cols-5 gap-4 py-3 text-sm font-medium text-gray-500 border-b border-gray-300">
        <span>Người gửi</span>
        <span>Loại yêu cầu</span>
        <span>Ngày gửi</span>
        <span>Trạng thái</span>
        <span className="text-center">Hành động</span>
      </div>

      {/* Request Rows */}
      <div className="divide-y divide-gray-200">
        {requests.map((request, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 py-4 text-sm text-gray-700 items-center">
            <span>{request.sender}</span>
            <span>{request.requestType}</span>
            <span>{request.date}</span>
            <span>{request.status}</span>
            <div className="flex justify-center gap-2">
              <button className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition">
                Duyệt
              </button>
              <button className="px-3 py-1 text-xs font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition">
                Từ chối
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// UserTable Component
interface UserTableProps {
  users: ApiUser[];
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
                <td className="px-4 py-3">{user.fullName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">N/A</td> {/* Phone number is not in ApiUser */}
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

// Main Dashboard Component with demo data
export default function UserManagementDashboard() {
  // Sample data
  const sampleUsers: ApiUser[] = [
    {
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      role: "Sinh viên",
      status: "Hoạt động",
      id: 1,
    },
    {
      fullName: "Trần Thị B",
      email: "tranthib@example.com",
      role: "Giảng viên",
      status: "Hoạt động",
      id: 2,
    },
    {
      fullName: "Lê Văn C",
      email: "levanc@example.com",
      role: "Nhân viên",
      status: "Tạm khóa",
      id: 3,
    }
  ];

  const sampleRequests: ApprovalRequest[] = [
    {
      sender: "Phạm Văn D",
      requestType: "Cấp tài khoản",
      date: "15/12/2024",
      status: "Chờ duyệt"
    },
    {
      sender: "Hoàng Thị E",
      requestType: "Khôi phục tài khoản",
      date: "14/12/2024",
      status: "Chờ duyệt"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Quản lý người dùng
        </h1>

        {/* Top Section */}
        <div className="flex gap-6 flex-col lg:flex-row">
       
          <ApprovalSection requests={sampleRequests} />
        </div>

        {/* User Table */}
        <UserTable users={sampleUsers} />
      </div>
    </div>
  );
}