"use client";
import React from "react";
import { FormInput } from "@cnpm/components/Sign Up/FormInput";
import { SelectField } from "@cnpm/components/Sign Up/SelectField";
import { Button } from "@cnpm/components/Sign Up/Button";

export const SignUpForm: React.FC = () => {
  return (
    <form className="flex flex-col items-center px-8 py-8 mt-7 bg-white rounded-xl shadow-[0px_4px_6px_rgba(0,0,0,0.1)]">
      <h1 className="text-3xl font-bold leading-none text-center text-gray-700">
        Tạo Tài Khoản
      </h1>
      <p className="z-10 mt-0 text-xs leading-8 text-center text-black">
        Hệ thống quản lý đề tài nghiên cứu
      </p>

      <div className="self-stretch">
        <FormInput
          label="Email:"
          placeholder="fe@ut.edu.vn"
          type="email"
          className="mb-6"
        />
        <FormInput
          label="Mật khẩu:"
          placeholder="Nhập Mật khẩu"
          type="password"
          className="mb-6"
        />
        <div className="mt-5">
          <Button variant="primary" className="py-3.5 pb-5">
            Tạo
          </Button>

          <Button variant="social" className="mt-3">
            <div className="flex gap-2.5 justify-center items-center max-w-full w-[177px] mx-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/2a65fed3a990f1e3242a0de9ba6cd1a3d8f6effe?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-start my-auto aspect-square w-[18px]"
                alt="Google icon"
              />
              <span className="grow shrink my-auto">Tiếp tục với Google</span>
            </div>
          </Button>
        </div>

        <div className="flex flex-col pt-5 mt-5 w-full text-center">
          <p className="self-center text-sm leading-none text-gray-700">
            Bạn đã có tài khoản rồi ư ?
          </p>
          <Button variant="outline" className="mt-3">
            Đăng Nhập
          </Button>
        </div>
      </div>
    </form>
  );
};
