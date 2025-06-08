"use client";
import * as React from "react";
import { LoginForm } from "@cnpm/components/Sign In/LoginForm";
import { NewPasswordForm } from "@cnpm/components/Sign In/NewPassWordForm";
import { ResetCodeForm } from "@cnpm/components/Sign In/ResetCodeForm";
import { useNavigate } from 'react-router-dom';

// Import apiService và userService
import apiService from '@cnpm/services/apiService'; // Adjusted path based on common structure
import { getCurrentUser } from '@cnpm/services/userService'; // Assuming getCurrentUser is exported

export default function LoginPage() {
  const navigate = useNavigate(); // Add useNavigate hook

  // Hàm xử lý đăng nhập
  async function handleLogin(email: string, password: string, rememberMe: boolean) {
    try {
      // Gọi API login sử dụng apiService
      const response = await apiService.post('/Auth/login', { // Assuming login endpoint is /Auth/login
        email,
        password,
      });

      const { token } = response.data; // Assuming API returns a token in response.data.token

      // Lưu token vào sessionStorage (apiService đã làm việc này trong interceptor,
      // nhưng nếu API login trả về token trực tiếp, ta có thể cần lưu ở đây nếu interceptor không xử lý response login)
      // sessionStorage.setItem('authToken', token);

      console.log("Đăng nhập thành công, nhận token:", token);

      // Sau khi đăng nhập thành công, gọi API lấy thông tin user
      const user = await getCurrentUser();
      console.log("Thông tin người dùng:", user);

      // TODO: Lưu thông tin user vào state/context

      // Chuyển hướng người dùng đến trang chính (ví dụ: /profile hoặc /dashboard)
      navigate('/profile'); // Redirect to profile page after login

    } catch (error: any) {
      console.error("Lỗi khi đăng nhập hoặc lấy thông tin user:", error);
      // Bắn lỗi để LoginForm bắt và hiển thị
      throw new Error(error?.response?.data?.message || error?.message || "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.");
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
