// src/component/Sign Up/
"use client";
import React from "react";
import { FormInput } from "@cnpm/components/Sign Up/FormInput";
import { Button } from "@cnpm/components/Sign Up/Button";
import { Formik, Form } from 'formik';
import { authService } from "@cnpm/services/authService";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { SelectField } from "./SelectField";

interface SignUpFormProps {
  email: string;
  name: string;
  password: string;
}
const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .required('Bắt buộc nhập tên')
    .min(2, 'Tên bắt buộc phải trên 2 ký tự'),
  email: Yup.string()
    .required('Bắt buộc nhập email')
    .min(5, 'Email bắt buộc có trên 5 ký tự'),
  password: Yup.string()
    .required('Bắt buộc nhập mật khẩu')
    .min(8, 'Mật khẩu phải trên 8 ký tự')
    .matches(/^(?=.*[A-Z])/, 'Bắt buộc nhập ít nhất 1 chữ viết hoa')
    .matches(/^(?=.*[0-9])/, 'Bắt buộc nhập 1 số')
    .matches(/^(?=.*[!@#$%^&*])/, 'Bắt buộc nhập 1 ký tự đặc biệt')
    .matches(/^(?=.*[a-z])/, 'Bắt buộc nhập 1 ký tự thường'),
});
export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [Name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.completeRegistration({
        Name,
        email,
        password,
      });
      alert("Đăng ký thành công!");
      navigate("/signin");
    } catch (error: any) {
      alert("Lỗi đăng ký: " + (error?.message || "Không rõ lỗi"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center px-8 py-8 mt-7 bg-white rounded-xl shadow-[0px_4px_6px_rgba(0,0,0,0.1)]"
    >
      <h1 className="text-3xl font-bold leading-none text-center text-gray-700">
        Tạo Tài Khoản
      </h1>
      <p className="z-10 mt-0 text-xs leading-8 text-center text-black">
        Hệ thống quản lý đề tài nghiên cứu
      </p>

      <div className="self-stretch">
        <FormInput
          label="Họ tên:"
          placeholder="Nhập họ tên"
          type="text"
          className="mb-6"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Email:"
          placeholder="fe@ut.edu.vn"
          type="email"
          className="mb-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Mật khẩu:"
          placeholder="Nhập Mật khẩu"
          type="password"
          className="mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-5">
          <Button
            variant="primary"
            className="py-3.5 pb-5"
            type="submit"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Tạo"}
          </Button>
        </div>

        <div className="flex flex-col pt-5 mt-5 w-full text-center">
          <p className="self-center text-sm leading-none text-gray-700">
            Bạn đã có tài khoản rồi ư?
          </p>
          <Button
            variant="outline"
            className="mt-3"
            type="button"
            onClick={() => navigate("/signin")}
          >
            Đăng Nhập
          </Button>
        </div>
      </div>
    </form>
  );
};
