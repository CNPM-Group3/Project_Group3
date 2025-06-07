"use client";
import React from "react";
import {
  ProjectTypeSection,
  UserInfoSection,
  ProjectDetailsSection,
  TeamAndDocumentsSection,
} from "@cnpm/components/Du An/Tao Du An/ProjectFormSections";

export const ProjectForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col self-center px-9 py-5 max-w-full bg-white rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] w-[872px] max-md:px-5"
    >
      <h1 className="self-center text-3xl font-bold text-gray-700">
        Tạo dự án mới
      </h1>
      <p className="self-center mt-3 text-xs text-gray-400 max-md:max-w-full">
        Điền đầy đủ thông tin ở dưới để đăng ký ý tưởng dự án mới. Tất cả đều
        bắt buộc điền trừ ghi chú.
      </p>

      <ProjectTypeSection />
      <UserInfoSection />
      <ProjectDetailsSection />
      <TeamAndDocumentsSection />

      <button
        type="submit"
        className="self-center px-14 py-4 mt-6 max-w-full text-2xl font-bold text-center text-white whitespace-nowrap bg-teal-500 rounded-lg border-0 w-[150px] max-md:px-5"
      >
        Gửi
      </button>
    </form>
  );
};