"use client";
import * as React from "react";
import { LoginForm } from "@cnpm/components/Sign In/LoginForm";
import { useNavigate } from 'react-router-dom';
import { authService } from "@cnpm/services/authService"; // 🔁 Đảm bảo import đúng

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Đăng nhập bằng email + password
  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      console.log('Đang gửi yêu cầu đăng nhập...');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        const token = data.token;
        if (token) {
          sessionStorage.setItem('accessToken', token);

          try {
            // await authService.fetchAndStoreUserProfile();
            setSuccessMessage('Đăng nhập thành công!');
            console.log('Đăng nhập thành công → chuyển trang');
            navigate('/thanhviennghiencuu');
          } catch (profileError) {
            console.error('Lỗi khi tải profile:', profileError);
            setErrorMessage('Đăng nhập thành công nhưng lỗi khi tải hồ sơ người dùng');
          }
        } else {
          console.error('Không có token trong phản hồi');
          setErrorMessage('Đăng nhập thất bại: không nhận được token');
        }
      } else {
        const errorData = await response.json();
        const message = errorData.message || 'Email hoặc mật khẩu không chính xác';
        console.error('Đăng nhập thất bại:', message);
        setErrorMessage(message);
      }
    } catch (error: any) {
      console.error('Lỗi kết nối khi đăng nhập:', error);
      setErrorMessage('Lỗi không mong muốn xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng nhập bằng Google
  const handleGoogleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Auth/google/signup`);
      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error("Không nhận được đường dẫn đăng nhập Google.");
      }
    } catch (error: any) {
      console.error("Google Login Error:", error);
      setErrorMessage("Lỗi khi đăng nhập bằng Google");
    }
  };

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

      {/* Layout chính */}
      <div className="flex max-w-5xl w-full min-h-[440px] rounded-2xl shadow-lg bg-gray-100 overflow-hidden">
        {/* Hình ảnh bên trái */}
        <div className="w-1/2 bg-gray-100">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/453e0ca17db5de0e06bb80753c9fe9f400687d8e"
            alt="UTH"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Form bên phải */}
        <div className="w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-xs">
            <LoginForm 
              onLogin={handleLogin}
              onGoogleSuccess={handleGoogleLogin}
              errorMessage={errorMessage}
              isLoading={isLoading}
              onSignUpClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
