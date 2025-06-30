"use client";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import {
  ProjectTypeSection,
  UserInfoSection,
  ProjectDetailsSection,
  TeamMembersSection,
} from "@cnpm/components/Du An/Tao Du An/ProjectFormSections";
import { createProject, addMemberToProject } from "@cnpm/services/projectService";

const toUtcISOString = (dateString: string) => {
  const date = new Date(dateString);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
};

const ApiDebugHelper = () => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testApiConnection = async () => {
    setIsTestingConnection(true);
    setTestResults([]);
    addTestResult("Bắt đầu kiểm tra kết nối API...");

    try {
      addTestResult("Test: Gọi POST /Projects với dữ liệu test");
      try {
        const testProject = {
          title: "Test Project " + Date.now(),
          description: "Đây là dự án test để kiểm tra API",
          objectives: "Kiểm tra API hoạt động",
          expectedOutcomes: "API hoạt động bình thường",
          startDate: toUtcISOString("2025-01-01"),
          endDate: toUtcISOString("2025-12-31"),
          researchTopicId: 1,
        };

        const createdProject = await createProject(testProject);
        addTestResult(`✅ POST /Projects thành công - ID: ${createdProject.id}`);
      } catch (error: any) {
        addTestResult(`❌ POST /Projects thất bại: ${error.message}`);
        if (error.message.includes("CORS")) {
          addTestResult("💡 Giải pháp: Backend cần cấu hình CORS headers");
        } else if (error.message.includes("404")) {
          addTestResult("💡 Giải pháp: Kiểm tra URL API có đúng không");
        } else if (error.message.includes("Network")) {
          addTestResult("💡 Giải pháp: Kiểm tra backend có đang chạy không");
        }
      }
    } catch (generalError: any) {
      addTestResult(`❌ Lỗi chung: ${generalError.message}`);
    } finally {
      setIsTestingConnection(false);
      addTestResult("Hoàn thành kiểm tra API");
    }
  };

  
};

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    objectives: "",
    expectedOutcomes: "",
    startDate: "",
    endDate: "",
    researchTopicId: 1,
    isBusinessSponsored: false,
    members: [] as Member[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const requiredFields = {
      title: "Tên dự án",
      description: "Mô tả dự án",
      objectives: "Mục tiêu",
      expectedOutcomes: "Kết quả mong đợi",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field as keyof typeof formData] || String(formData[field as keyof typeof formData]).trim() === "") {
        alert(`Vui lòng nhập ${label}`);
        return false;
      }
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (startDate >= endDate) {
      alert("Ngày kết thúc phải sau ngày bắt đầu");
      return false;
    }
    return true;
  };

  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;
  setIsSubmitting(true);

  try {
    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      objectives: formData.objectives.trim(),
      expectedOutcomes: formData.expectedOutcomes.trim(),
      startDate: toUtcISOString(formData.startDate),
      endDate: toUtcISOString(formData.endDate),
      researchTopicId: formData.researchTopicId,
    };

    const createdProject = await createProject(projectData);

    alert(`Tạo dự án "${createdProject.title}" thành công! ID: ${createdProject.id}`);

    // ✅ Reset form
    setFormData({
      title: "",
      description: "",
      objectives: "",
      expectedOutcomes: "",
      startDate: "",
      endDate: "",
      researchTopicId: 1,
      isBusinessSponsored: false,
      members: [],
    });

    // ✅ Điều hướng về /duan
    navigate("/duan");

  } catch (error: any) {
    let errorMessage = "Tạo dự án thất bại!";
    if (error.message) {
      if (error.message.includes("CORS")) errorMessage = "Lỗi kết nối: Backend chưa cấu hình CORS.";
      else if (error.message.includes("404")) errorMessage = "Lỗi: Không tìm thấy API endpoint.";
      else if (error.message.includes("Network Error")) errorMessage = "Lỗi mạng: Không thể kết nối đến server.";
      else errorMessage = `Lỗi: ${error.message}`;
    }
    alert(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col self-center px-9 py-8 max-w-full bg-white rounded-xl border border-solid border-slate-200 shadow-lg w-[900px] max-md:px-5 mx-auto"
      >
        <h1 className="self-center text-3xl font-bold text-gray-700 mb-2">Tạo dự án mới</h1>
        <p className="self-center text-center text-sm text-gray-500 mb-6 max-md:max-w-full">
          Điền đầy đủ thông tin bên dưới để tạo dự án mới.<br />
          Các trường có dấu (*) là bắt buộc.
        </p>

        <ProjectTypeSection formData={formData} setFormData={setFormData} />
        <UserInfoSection />
        <ProjectDetailsSection formData={formData} setFormData={setFormData} />
        <TeamMembersSection formData={formData} setFormData={setFormData} />

        <div className="flex gap-4 justify-center mt-8">
          <button
            type="button"
            onClick={() => {
              if (confirm("Bạn có chắc muốn hủy?")) {
                setFormData({
                  title: "",
                  description: "",
                  objectives: "",
                  expectedOutcomes: "",
                  startDate: "",
                  endDate: "",
                  researchTopicId: 1,
                  isBusinessSponsored: false,
                  members: [],
                });
              }
            }}
            className="px-8 py-3 text-lg font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 text-lg font-bold text-white rounded-lg ${
              isSubmitting ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {isSubmitting ? "Đang tạo..." : "Tạo dự án"}
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <>
            
            {/* <ApiDebugHelper /> */}
          </>
        )}
      </form>
    </div>
  );
};
