"use client";
import React from "react";
import { SignUpForm } from "../components/Sign Up/SignUpForm";

export default function SignUp() {
  return (
    <main className="overflow-hidden bg-gray-50 bg-opacity-50">
      <div className="flex relative flex-col items-center px-20 pt-20 pb-40 w-full rounded-lg min-h-[1024px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/a199b631dfc638b125764c777800affe9c877878?placeholderIfAbsent=true"
          className="object-cover absolute inset-0 size-full"
          alt="Background"
        />
        <div className="flex relative flex-col mb-0 max-w-full w-[448px] max-md:mb-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/21f6fbe48cb6bbbd9b91d955f781f66989f8cae8?placeholderIfAbsent=true"
            className="object-contain self-center max-w-full aspect-[5.75] w-[357px]"
            alt="Logo"
          />
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
