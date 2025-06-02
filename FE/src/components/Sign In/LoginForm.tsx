"use client";
import * as React from "react";
import { UserIcon } from "../Icons/UserIcon";
import { GoogleIcon } from "../Icons/GoogleIcon";

interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({
  email,
  password,
  rememberMe,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
  onGoogleSignIn,
  onSignUp,
  onForgotPassword,
}: LoginFormProps) {
  return (
    <article className="w-full max-w-md">
      <div className="flex flex-col items-center mb-6">
        <div className="flex justify-center items-center w-12 h-12">
          <UserIcon />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-700">XIN CHÀO !</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="fe@ut.edu.vn"
            value={email}
            onChange={onEmailChange}
            className="px-4 py-3 text-base rounded-lg border border-gray-300 h-[48px]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">
            Mật Khẩu:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Nhập Mật Khẩu"
            value={password}
            onChange={onPasswordChange}
            className="px-4 py-3 text-base rounded-lg border border-gray-300 h-[48px]"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => onRememberMeChange(e.target.checked)}
              className="cursor-pointer"
            />
            Ghi nhớ
          </label>
          <a
            href="#"
            onClick={onForgotPassword}
            className="text-sm font-semibold text-teal-700 hover:underline"
          >
            Quên mật khẩu
          </a>
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-[48px] text-base font-bold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
        >
          Đăng nhập
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full h-[48px] text-base font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={onGoogleSignIn}
        >
          <GoogleIcon />
          <span>Tiếp tục với Google</span>
        </button>
      </form>

      <div className="mt-8 pt-4 text-center border-t border-gray-200">
        <p className="mb-2 text-sm text-gray-700">Bạn có tài khoản chưa?</p>
        <button className="w-full h-[48px] text-base font-bold text-teal-700 border border-teal-500 rounded-lg hover:bg-teal-50 transition-colors"
          onClick={onSignUp}
        >
          Tạo tài khoản
        </button>
      </div>
    </article>
  );
}