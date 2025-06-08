import React from "react";
import { ApiUser } from "@cnpm/services/userService";

// Interface definitions
interface RoleActionButtonProps {
  type: "assign" | "revoke";
}

export type User = ApiUser;

interface UserRoleFilterProps {
  onRoleChange: (role: string | null) => void;
  selectedRole: string | null;
}

interface UserListProps {
  loading: boolean;
  users: ApiUser[];
  selectedRole: string | null;
}

// Sample data
const roles = [
  "Tất cả",
  "Sinh viên",
  "Giảng viên",
  "Nhân viên",
  "Quản trị viên",
];

// RoleActionButton Component
const RoleActionButton: React.FC<RoleActionButtonProps> = ({ type }) => {
  const buttonStyles = {
    assign: "px-4 py-1 text-cyan-800 bg-blue-300 rounded-xl",
    revoke: "px-7 py-1 text-red-800 bg-rose-400 rounded-xl max-md:px-5",
  };

  const buttonText = {
    assign: "Gán vai trò",
    revoke: "Thu hồi",
  };

  return (
    <button
      className={`text-sm font-medium leading-none ${buttonStyles[type]}`}
    >
      {buttonText[type]}
    </button>
  );
};

// UserRoleFilter Component
const UserRoleFilter: React.FC<UserRoleFilterProps> = ({ onRoleChange, selectedRole }) => {
  return (
    <div className="flex flex-wrap gap-2 px-6 py-2.5 w-full text-base rounded-lg border border-solid border-slate-200 max-md:pr-5 max-md:max-w-full">
      <span className="grow my-auto text-slate-600">Lọc theo vai trò</span>
      <div className="flex flex-wrap flex-auto font-medium text-black max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab69d73d717cbc6050076b3bf3e3e159135cde2?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
          className="object-contain shrink-0 my-auto aspect-[1.12] w-[19px]"
          alt="Filter"
        />
        <div className="flex flex-wrap flex-auto gap-7 justify-center items-center">
          {roles.map((role, index) => (
            <button
              key={index}
              className={`self-stretch my-auto hover:text-blue-600 transition-colors ${
                selectedRole === role ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => onRoleChange(role === "Tất cả" ? null : role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// UserList Component
const UserList: React.FC<UserListProps> = ({ loading, users, selectedRole }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="pt-6 mt-6 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white">
      <h2 className="text-lg font-semibold px-6 pb-4">Danh sách</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-t border-gray-200">
          <thead>
            <tr className="text-left text-sm text-gray-500 bg-gray-50">
              <th className="px-6 py-3">Họ tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Vai trò</th>
              <th className="px-6 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-2">
                    <RoleActionButton type="assign" />
                    <RoleActionButton type="revoke" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export { UserList, UserRoleFilter, RoleActionButton };