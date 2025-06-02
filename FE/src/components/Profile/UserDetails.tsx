import React, { useState } from "react";

interface UserInfo {
  name: string;
  class: string;
  email: string;
  phone: string;
}

interface Passwords {
  current: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UserDetailsProps {
  userInfo: UserInfo;
  passwords: Passwords;
  onUserInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUserInfoSubmit: (e: React.FormEvent) => void;
  onPasswordSubmit: (e: React.FormEvent) => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  userInfo,
  passwords,
  onUserInfoChange,
  onPasswordsChange,
  onUserInfoSubmit,
  onPasswordSubmit,
}: UserDetailsProps) => {
  return (
    <section className="flex flex-col grow px-14 py-11 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-center text-xl font-bold text-center text-gray-700">
        Chi tiết người dùng
      </h2>

      <div className="mt-7 text-sm text-gray-700">
        <p className="mt-2">
          <strong className="text-gray-700">Tên:</strong>
          <span className="text-gray-700"> {userInfo.name}</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Lớp:</strong>
          <span className="text-gray-700"> {userInfo.class}</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Mã Thành Viên:</strong>
          <span className="text-gray-700"> 079********231</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Ngày sinh:</strong>
          <span className="text-gray-700"> 24/07/2004</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Email:</strong>
          <span className="text-gray-700"> {userInfo.email}</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Số Điện Thoại:</strong>
          <span className="text-gray-700"> {userInfo.phone}</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Mạng xã hội:</strong>
        </p>
      </div>

      {/* Form thay đổi thông tin */}
      <form
        onSubmit={onUserInfoSubmit}
        className="mt-10 border-t border-gray-300 pt-6"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Thay đổi thông tin
        </h3>
        <div className="flex flex-col gap-4 max-w-md">
          <label className="flex flex-col text-gray-700">
            Tên
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={onUserInfoChange}
              className="mt-1 rounded border border-gray-300 p-2"
              required
            />
          </label>
          <label className="flex flex-col text-gray-700">
            Lớp
            <input
              type="text"
              name="class"
              value={userInfo.class}
              onChange={onUserInfoChange}
              className="mt-1 rounded border border-gray-300 p-2"
            />
          </label>
          <label className="flex flex-col text-gray-700">
            Email
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={onUserInfoChange}
              className="mt-1 rounded border border-gray-300 p-2"
              required
            />
          </label>
          <label className="flex flex-col text-gray-700">
            Số Điện Thoại
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={onUserInfoChange}
              className="mt-1 rounded border border-gray-300 p-2"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Cập nhật thông tin
          </button>
        </div>
      </form>

      {/* Form đổi mật khẩu */}
      <form
        onSubmit={onPasswordSubmit}
        className="mt-10 border-t border-gray-300 pt-6 max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Thay đổi mật khẩu
        </h3>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col text-gray-700">
            Mật khẩu hiện tại
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={onPasswordsChange}
              className="mt-1 rounded border border-gray-300 p-2"
              required
            />
          </label>
          <label className="flex flex-col text-gray-700">
            Mật khẩu mới
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={onPasswordsChange}
              className="mt-1 rounded border border-gray-300 p-2"
              required
            />
          </label>
          <label className="flex flex-col text-gray-700">
            Xác nhận mật khẩu mới
            <input
              type="password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={onPasswordsChange}
              className="mt-1 rounded border border-gray-300 p-2"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </section>
  );
};