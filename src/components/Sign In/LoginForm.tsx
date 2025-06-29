/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { UserIcon } from "../Icons/UserIcon";
import { GoogleIcon } from "../Icons/GoogleIcon";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  onGoogleSuccess: () => void;
  onSignUpClick: () => void;
  errorMessage?: string;
  isLoading?: boolean;
}

export function LoginForm({
  onLogin,
  onGoogleSuccess,
  onSignUpClick,
  errorMessage,
  isLoading
}: LoginFormProps) {
  const [rememberMe, setRememberMe] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    setLocalError(null);
    try {
      await onLogin(email, password, rememberMe);
    } catch (err: any) {
      setLocalError(err?.message || "Đăng nhập thất bại, vui lòng thử lại.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <article className="w-full max-w-md">
      <div className="flex flex-col items-center mb-6">
        <div className="flex justify-center items-center w-12 h-12">
          <UserIcon />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-700">XIN CHÀO !</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="fe@ut.edu.vn"
            className="px-4 py-3 text-base rounded-lg border border-gray-300 h-[48px]"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">
            Mật Khẩu:
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập Mật Khẩu"
              className="px-4 py-3 pr-12 text-base rounded-lg border border-gray-300 h-[48px] w-full"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="cursor-pointer"
              disabled={isLoading}
            />
            Ghi nhớ
          </label>
        </div>

        {(localError || errorMessage) && (
          <p className="text-red-500 text-sm text-center">{localError || errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-2 w-full h-[48px] text-base font-bold text-white bg-teal-500 rounded-lg transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600"
          }`}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>

      {/* ✅ Nút Google giữ lại */}
      <button
        type="button"
        onClick={onGoogleSuccess}
        className="flex items-center justify-center gap-2 w-full h-[48px] mt-5 text-base font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        disabled={isLoading}
      >
        <GoogleIcon />
        <span>Tiếp tục với Google</span>
      </button>

      <div className="mt-8 pt-4 text-center border-t border-gray-200">
        <p className="mb-2 text-sm text-gray-700">Bạn có tài khoản chưa?</p>
        <button
          className="w-full h-[48px] text-base font-bold text-teal-700 border border-teal-500 rounded-lg hover:bg-teal-50 transition-colors"
          disabled={isLoading}
          onClick={onSignUpClick}
        >
          Tạo tài khoản
        </button>
      </div>
    </article>
  );
}