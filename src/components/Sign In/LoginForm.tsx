/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { UserIcon } from "../Icons/UserIcon";
import { GoogleIcon } from "../Icons/GoogleIcon";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onLogin: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  onBack?: () => void;
  error?: string;
}

export function LoginForm({ onLogin, onBack, error }: LoginFormProps) {
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    setLocalError(null);
    setLoading(true);
    try {
      await onLogin(email, password, rememberMe);
      // Thành công: có thể xử lý chuyển trang ngoài hàm onLogin
    } catch (err: any) {
      setLocalError(err?.message || "Đăng nhập thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/Auth/google/signup`
      );
      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl; // Redirect Google OAuth
      } else {
        alert("Không lấy được URL đăng nhập Google.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API đăng nhập Google:", error);
      alert("Đã xảy ra lỗi khi đăng nhập Google.");
    }
  };

  return (
    <article className="w-full max-w-md">
      <div className="flex flex-col items-center mb-6">
        <div className="flex justify-center items-center w-12 h-12">
          <UserIcon />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-700">XIN CHÀO !</h1>
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-sm text-teal-700 underline hover:text-teal-900"
        >
          ← Quay lại
        </button>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="fe@ut.edu.vn"
            className="px-4 py-3 text-base rounded-lg border border-gray-300 h-[48px]"
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-700"
          >
            Mật Khẩu:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Nhập Mật Khẩu"
            className="px-4 py-3 text-base rounded-lg border border-gray-300 h-[48px]"
            required
            disabled={loading}
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="cursor-pointer"
              disabled={loading}
            />
            Ghi nhớ
          </label>
          <a
            href="#"
            className="text-sm font-semibold text-teal-700 hover:underline"
          >
            Quên mật khẩu
          </a>
        </div>

        {(localError || error) && (
          <p className="text-red-500 text-sm text-center">
            {localError || error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full h-[48px] text-base font-bold text-white bg-teal-500 rounded-lg transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 w-full h-[48px] mt-5 text-base font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        disabled={loading}
      >
        <GoogleIcon />
        <span>Tiếp tục với Google</span>
      </button>

      <div className="mt-8 pt-4 text-center border-t border-gray-200">
        <p className="mb-2 text-sm text-gray-700">Bạn có tài khoản chưa?</p>
        <button
          className="w-full h-[48px] text-base font-bold text-teal-700 border border-teal-500 rounded-lg hover:bg-teal-50 transition-colors"
          disabled={loading}
          onClick={() => navigate("/signup")} // Thêm sự kiện chuyển trang đăng ký// Bạn có thể thêm onClick chuyển trang đăng ký ở đây
        >
          Tạo tài khoản
        </button>
      </div>
    </article>
  );
}
