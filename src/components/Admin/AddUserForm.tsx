import React from "react";

export const AddUserForm: React.FC = () => {
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
        <span>Thêm mới tài khoản</span>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-3 text-sm text-gray-700">
        <input
          type="text"
          placeholder="Họ tên"
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
      </div>

      {/* Loại tài khoản */}
      <div className="mt-6">
        <div className="text-center py-2 text-base font-medium bg-gray-100 rounded-t-lg text-gray-700">
          Loại tài khoản
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 border-t-0 rounded-b-lg">
          <div className="grid grid-cols-2 gap-3">
            {["Sinh viên", "Giảng viên", "Nhân viên", "Quản trị viên"].map((role, idx) => (
              <button
                key={idx}
                className="py-2 px-4 text-sm text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-sky-100 hover:text-sky-700 transition"
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="w-[153px] h-[38px] bg-sky-500 text-white text-sm font-medium rounded-xl shadow hover:bg-sky-600 transition">
            Tạo tài khoản
          </button>
        </div>
      </div>
    </div>
  );
};
