"use client";
import * as React from "react";

// Interface definitions
interface RoleActionButtonProps {
  type: "assign" | "revoke";
}

interface User {
  name: string;
  email: string;
  role: string;
}

// Sample data
const users: User[] = [
  { name: "Nguyên Văn A", email: "fe@ut.edu.vn", role: "Sinh viên" },
  { name: "Trần Thị B", email: "b@gv.ut.edu.vn", role: "Giảng viên" },
  { name: "Lê Văn C", email: "c@st.ut.edu.vn", role: "Chưa phân quyền" },
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

// RoleFilter Component
const RoleFilter: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 px-4 py-2.5 mt-4 w-full max-w-[420px] border border-slate-200 rounded-lg bg-white text-sm text-gray-700">
      {/* Label + icon */}
      <div className="flex items-center gap-2 text-slate-500">
        <span>Vai trò</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab69d73d717cbc6050076b3bf3e3e159135cde2"
          alt="icon"
          className="w-4 h-4 object-contain"
        />
      </div>

      {/* Button group */}
      <div className="flex flex-wrap gap-3 font-medium text-black">
        <button className="hover:text-blue-700">Tất cả</button>
        <button className="hover:text-blue-700">Sinh viên</button>
        <button className="hover:text-blue-700">Giảng viên</button>
        <button className="hover:text-blue-700">Nhân viên</button>
      </div>
    </div>
  );
};

// TimeFilter Component
const TimeFilter: React.FC = () => {
  return (
    <div className="flex items-center gap-5 px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm font-medium text-gray-700">
      <div className="flex items-center gap-2 text-slate-500">
        <span>Thời gian</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab69d73d717cbc6050076b3bf3e3e159135cde2"
          alt="icon"
          className="w-4 h-4 object-contain"
        />
      </div>
      <div className="flex gap-4">
        <button className="hover:text-blue-600">Hôm nay</button>
        <button className="hover:text-blue-600">7 ngày</button>
        <button className="hover:text-blue-600">30 ngày</button>
      </div>
    </div>
  );
};

// UserInteractionChart Component
const UserInteractionChart: React.FC = () => {
  return (
    <section className="flex flex-col items-start pt-6 pr-12 pb-3.5 pl-5 mt-8 max-w-full rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] w-[541px] max-md:pr-5">
      <h2 className="z-10 pb-2.5 max-w-full text-lg font-medium leading-none text-black w-[221px] max-md:pr-5">
        Tương tác người dùng
      </h2>

      <div className="px-4 pt-8 pb-4 mt-1.5 ml-5 w-full text-xs text-black min-h-[254px] max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/05590de6f85e16c8d0c8b316c3dbaf89dacbee1b?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
          alt="Interaction Chart"
          className="object-contain flex-1 w-full aspect-[2.32] max-md:max-w-full"
        />

        <div className="flex overflow-hidden flex-wrap justify-center items-start w-full max-md:max-w-full">
          <div className="flex overflow-hidden flex-wrap gap-2 justify-center items-center px-2">
            <div className="flex overflow-hidden gap-1 items-center self-stretch p-1 my-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/07a945ed3e085f09938a9c6e84e701d277235af7?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <span className="self-stretch my-auto">Sinh viên</span>
            </div>
            <div className="flex overflow-hidden gap-1 items-center self-stretch p-1 my-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/46f7f9a683b363f27d820d9d44a9bfc3fc5643ae?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <span className="self-stretch my-auto">Giảng viên</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// UserList Component
const UserList = () => {
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

// UserPerformanceChart Component
const UserPerformanceChart: React.FC = () => {
  return (
    <section className="flex flex-col py-5 pr-10 pl-5 w-full rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:pr-5 max-md:mt-9 max-md:max-w-full">
      <h2 className="pb-2 max-w-full text-lg font-medium leading-none text-black w-[221px] max-md:pr-5">
        Hiệu suất người dùng
      </h2>

      <div className="flex gap-2 self-end px-2 pt-6 pb-2 max-w-full text-xs bg-white min-h-[270px] w-[459px]">
        <div className="flex flex-col flex-1 shrink py-11 font-semibold text-red-300 whitespace-nowrap basis-0 min-w-60">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0562e3e66608ab8d83741955682a784b7fdca516?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
            alt="Performance Chart"
            className="object-contain w-full rounded-full aspect-[2.26]"
          />
          <span className="self-start">800</span>
        </div>

        <div className="flex overflow-hidden flex-col justify-center text-black">
          <div className="flex overflow-hidden gap-1 items-center p-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/22588eea0d0b8380ea4f6f53c78bca5076328a2c?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            />
            <span className="self-stretch my-auto">Số phiên (phiên)</span>
          </div>
          <div className="flex overflow-hidden gap-1 items-center p-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbf6108ba61014ed93bbd3a242cc54580dc600cd?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            />
            <span className="self-stretch my-auto">Phản hồi TB (ms)</span>
          </div>
          <div className="flex overflow-hidden gap-1 items-center self-start p-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9380112703b3bbad932791ab64ea4fe20cd89fd3?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            />
            <span className="self-stretch my-auto">Tỷ lệ lỗi (%)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Dashboard component that combines everything
const UserDashboard = () => {
  return (
    <div className="space-y-6 p-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <RoleFilter />
        <TimeFilter />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserInteractionChart />
        <UserPerformanceChart />
      </div>
      
      {/* User List */}
      <UserList />
    </div>
  );
};

export default UserDashboard;
export { 
  UserList, 
  RoleFilter, 
  TimeFilter, 
  UserInteractionChart, 
  UserPerformanceChart, 
  RoleActionButton 
};