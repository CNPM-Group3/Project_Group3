"use client";
import * as React from "react";
import { LoginForm } from "@cnpm/components/Sign In/LoginForm";
import { NewPasswordForm } from "@cnpm/components/Sign In/NewPassWordForm";
import { ResetCodeForm } from "@cnpm/components/Sign In/ResetCodeForm";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login submitted:", { email, password, rememberMe });
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in
    console.log("Google sign-in clicked");
  };

  const handleSignUp = () => {
    // TODO: Implement sign up navigation
    console.log("Sign up clicked");
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password navigation
    console.log("Forgot password clicked");
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
            <LoginForm
              email={email}
              password={password}
              rememberMe={rememberMe}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onRememberMeChange={handleRememberMeChange}
              onSubmit={handleSubmit}
              onGoogleSignIn={handleGoogleSignIn}
              onSignUp={handleSignUp}
              onForgotPassword={handleForgotPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}