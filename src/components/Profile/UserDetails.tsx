import React, { useState } from "react";

export const UserDetails = () => {
  // State mẫu cho các form (bạn có thể bổ sung validate và gửi request)
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A",
    class: "CNTTCLC23",
    email: "fe@ut.edu.vn",
    phone: "08********",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi cập nhật thông tin
    console.log("Cập nhật thông tin:", userInfo);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đổi mật khẩu
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    console.log("Đổi mật khẩu:", passwords);
  };

  return (
    <section className="flex flex-col grow px-14 py-11 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-center text-xl font-bold text-center text-gray-700">
        Chi tiết người dùng
      </h2>

      <div className="mt-7 text-sm text-gray-700">
        <p className="mt-2">
          <strong className="text-gray-700">Tên:</strong>
          <span className="text-gray-700"> Nguyễn Văn A</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Lớp:</strong>
          <span className="text-gray-700"> CNTTCLC23</span>
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
          <span className="text-gray-700"> fe@ut.edu.vn</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Số Điện Thoại:</strong>
          <span className="text-gray-700"> 08********</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Mạng xã hội:</strong>
        </p>
      </div>

      {/* Form thay đổi thông tin */}
      <form
        onSubmit={handleUserInfoSubmit}
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
              onChange={handleUserInfoChange}
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
              onChange={handleUserInfoChange}
              className="mt-1 rounded border border-gray-300 p-2"
            />
          </label>
          <label className="flex flex-col text-gray-700">
            Email
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
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
              onChange={handleUserInfoChange}
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
    </section>
  );
};