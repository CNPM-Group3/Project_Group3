import React from "react";
import { RoleActionButton } from "./RoleActionButton";

interface User {
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { name: "Nguyên Văn A", email: "fe@ut.edu.vn", role: "Sinh viên" },
  { name: "Trần Thị B", email: "b@gv.ut.edu.vn", role: "Giảng viên" },
  { name: "Lê Văn C", email: "c@st.ut.edu.vn", role: "Chưa phân quyền" },
];

export const UserList = () => {
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
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
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