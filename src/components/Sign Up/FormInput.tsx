"use client";
import React from "react";

interface FormInputProps {
  label?: string;
  placeholder: string;
  type?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showGoogleLogin?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
  className = "",
  value,
  onChange,
  showGoogleLogin = false,
}) => {
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Ngăn form submit
    e.stopPropagation(); // Ngăn event bubbling
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/Auth/google/signup`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.redirectUrl) {
        // Chuyển hướng trình duyệt tới URL OAuth của Google
        window.location.href = data.redirectUrl;
      } else {
        alert("Không thể lấy URL đăng nhập Google. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Đã xảy ra lỗi khi kết nối với Google. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className={`w-full min-h-[74px] ${className}`}>
      {label && (
        <label className="pb-2.5 block w-full text-sm font-bold text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-base leading-6 text-gray-400 bg-white rounded-lg border border-gray-300 border-solid"
        value={value}
        onChange={onChange}
      />
      
      {showGoogleLogin && (
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-4 px-4 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-3 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Tiếp tục với Google
        </button>
      )}
    </div>
  );
};