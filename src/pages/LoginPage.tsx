"use client";
import * as React from "react";
import { LoginForm } from "@cnpm/components/Sign In/LoginForm";
import { NewPasswordForm } from "@cnpm/components/Sign In/NewPassWordForm";
import { ResetCodeForm } from "@cnpm/components/Sign In/ResetCodeForm";

export default function LoginPage() {
  // Hàm xử lý đăng nhập
  async function handleLogin(email: string, password: string, rememberMe: boolean) {
    try {
      // Ví dụ gọi API login - thay đổi URL API cho phù hợp
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đăng nhập thất bại");
      }

      const data = await response.json();
      console.log("Đăng nhập thành công:", data);

      // Xử lý sau khi đăng nhập thành công, ví dụ lưu token, chuyển trang
      // ...
    } catch (error: any) {
      // Bắn lỗi để LoginForm bắt và hiển thị
      throw new Error(error.message || "Lỗi khi đăng nhập");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="w-full flex justify-center mt-8 mb-6">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/68061d1f8c1bc27abf08860af7de53ebd548d464"
          alt="UTH Logo"
          className="h-[45px] object-contain"
        />
      </div>

      {/* Khung chính */}
      <div className="flex max-w-5xl w-full min-h-[440px] rounded-2xl shadow-lg bg-gray-100 overflow-hidden">
        {/* Bên trái: Hình ảnh */}
        <div className="w-1/2 bg-gray-100">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/453e0ca17db5de0e06bb80753c9fe9f400687d8e"
            alt="UTH"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Bên phải: Form đăng nhập */}
        <div className="w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-xs">
            {/* Truyền onLogin prop vào đây */}
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
