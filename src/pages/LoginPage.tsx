"use client";
import * as React from "react";
import { LoginForm } from "@cnpm/components/Sign In/LoginForm";
import { useNavigate } from 'react-router-dom';
import { authService } from "@cnpm/services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Hàm xác định trang chuyển hướng dựa trên roles
  const getRedirectPath = (roles: string[], email: string) => {
    // Kiểm tra role cụ thể (ưu tiên role cao nhất)
    if (roles.includes('Admin')) {
      return '/quantrivien';
    }
    if (roles.includes('Staff')) {
      return '/admin';
    }
    if (roles.includes('AppraisalCouncil')) {
      return '/hoidongthamdinh';
    }
    if (roles.includes('HostInstitution')) {
      return '/profile2'; // hoặc trang dành cho HostInstitution
    }
    if (roles.includes('Researcher') || roles.includes('PrincipalInvestigator')) {
      return '/thanhviennghiencuu';
    }

    // Fallback: nếu không có role nào, xác định theo email
    const lowerEmail = email.toLowerCase();
    if (lowerEmail === "admin@ut.edu.vn") return '/admin';
    if (lowerEmail === "staff@ut.edu.vn") return '/quantrivien';
    if (lowerEmail === "hdtd@ut.edu.vn") return '/hoidongthamdinh';
    if (lowerEmail.endsWith("@gv.edu.vn")) return '/quantrivien1';
    if (lowerEmail.endsWith("@ut.edu.vn")) return '/thanhviennghiencuu';

    // Default fallback
    return '/thanhviennghiencuu';
  };

  // Đăng nhập bằng email + password
  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      console.log('Đang gửi yêu cầu đăng nhập...');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        const token = data.token;
        const user = data.user;

        if (token && user) {
          // Lưu token
          sessionStorage.setItem('accessToken', token);

          try {
            // Tải profile người dùng
            await authService.fetchAndStoreUserProfile();
            
            // Xác định trang chuyển hướng dựa trên roles
            const redirectPath = getRedirectPath(user.roles || [], email);
            
            setSuccessMessage('Đăng nhập thành công!');
            console.log(`Đăng nhập thành công → chuyển trang: ${redirectPath}`);
            console.log('User roles:', user.roles);
            
            // Chuyển hướng với delay nhỏ để người dùng thấy thông báo thành công
            setTimeout(() => {
              navigate(redirectPath);
            }, 500);
            
          } catch (profileError) {
            console.error('Lỗi khi tải profile:', profileError);
            setErrorMessage('Đăng nhập thành công nhưng lỗi khi tải hồ sơ người dùng');
          }
        } else {
          console.error('Không có token hoặc user trong phản hồi');
          setErrorMessage('Đăng nhập thất bại: không nhận được thông tin đầy đủ');
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/Auth/google/signup`);
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