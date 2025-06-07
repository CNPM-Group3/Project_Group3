"use client";
import * as React from "react";
import { LoginForm } from "@cnpm/components/Sign In/LoginForm";
import { NewPasswordForm } from "@cnpm/components/Sign In/NewPassWordForm";
import { ResetCodeForm } from "@cnpm/components/Sign In/ResetCodeForm";
import router from "next/dist/client/router";

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  // Hàm xử lý đăng nhập
  async function handleLogin(email: string, password: string, rememberMe: boolean) {
    try {

      const response = await fetch("http://aienthusiasm.vn:8080/api/v1/index.html", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(),
          password: password.trim() 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      // Lưu token
      if (data.token) {
        if (rememberMe) {
          localStorage.setItem("accessToken", data.token);
        } else {
          sessionStorage.setItem("accessToken", data.token);
        }
        
        // Chuyển hướng sau khi đăng nhập thành công
        router.push("/dashboard");
        setError(null);
      } else {
        throw new Error("Token không hợp lệ");
      }

      // Xử lý sau khi đăng nhập thành công, ví dụ lưu token, chuyển trang
      // ...
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Đăng nhập thất bại");
    } finally {
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
            <LoginForm 
              onLogin={(email: string, password: string, rememberMe: boolean) => handleLogin(email, password, rememberMe)}
              error={error}
              isLoading={isLoading}
            />
          </div>
        </div>
  );
}