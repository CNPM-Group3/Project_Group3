// FundingRequestForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import { FormField } from "./FormField";
import { FileUpload } from "./FileUpload";
import { createFundingRequest } from "@cnpm/services/FundingService"; // Import API function
import { getProjects } from "@cnpm/services/Project";

interface Project {
  id: number;
  title: string;
  description: string;
  objectives: string;
  expectedOutcomes: string;
  startDate: string;
  endDate: string;
  researchTopicId: number;
  ownerId?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface FundingRequestFormProps {
  onSubmit?: (formData: {
    project: string;
    amount: string;
    purpose: string;
    presentation: string;
    researcher: string;
    sponsorEmail: string;
    date: string;
  }) => void;
  onSuccess?: () => void; // Callback when API call succeeds
  onError?: (error: any) => void; // Callback when API call fails
}

export const FundingRequestForm: React.FC<FundingRequestFormProps> = ({
  onSubmit,
  onSuccess,
  onError
}) => {
  const [formData, setFormData] = useState({
    project: "",
    amount: "",
    purpose: "",
    presentation: "",
    researcher: "",
    sponsorEmail: "",
    date: new Date().toLocaleDateString("vi-VN"),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  // Fetch projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoadingProjects(true);
        setProjectsError(null);
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectsError("Không thể tải danh sách dự án. Vui lòng thử lại.");
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const validateForm = (): boolean => {
    const requiredFields = {
      project: "Tên dự án",
      amount: "Số tiền yêu cầu",
      purpose: "Mục đích yêu cầu tài trợ",
      presentation: "Trình bày",
      researcher: "Nghiên cứu chính",
      sponsorEmail: "Email nhà tài trợ"
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field as keyof typeof formData].trim()) {
        alert(`Vui lòng nhập ${label}`);
        return false;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.sponsorEmail)) {
      alert("Vui lòng nhập email hợp lệ");
      return false;
    }

    // Validate amount is a positive number
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File): Promise<string> => {
    // This is a placeholder for file upload logic
    // You'll need to implement actual file upload to your server
    // For now, returning a mock URL
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://your-server.com/uploads/${file.name}`);
      }, 1000);
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Upload file if selected
      let justificationDocumentUrl = "";
      if (selectedFile) {
        try {
          justificationDocumentUrl = await uploadFile(selectedFile);
        } catch (uploadError) {
          console.error("File upload failed:", uploadError);
          alert("Lỗi tải file. Vui lòng thử lại.");
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare data for API call
      const apiData = {
        title: formData.project,
        description: formData.presentation,
        amount: parseFloat(formData.amount),
        purpose: formData.purpose,
        justificationDocumentUrl: justificationDocumentUrl,
        projectId: parseInt(formData.project) || 1 // Use selected project ID
      };

      // Call API
      const response = await createFundingRequest(apiData);
      
      console.log("API Response:", response);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Call original onSubmit if provided (for backward compatibility)
      if (onSubmit) {
        onSubmit(formData);
      }

      // Show success message
      alert("Yêu cầu tài trợ đã được gửi thành công!");

      // Reset form
      setFormData({
        project: "",
        amount: "",
        purpose: "",
        presentation: "",
        researcher: "",
        sponsorEmail: "",
        date: new Date().toLocaleDateString("vi-VN"),
      });
      setSelectedFile(null);

    } catch (error) {
      console.error("Error submitting funding request:", error);
      
      // Call error callback if provided
      if (onError) {
        onError(error);
      }

      // Show error message
      alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex mt-2 ml-10 max-w-full w-[878px]">
      <form className="flex flex-wrap flex-auto gap-1.5 py-9 pr-6 pl-12 bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <div className="w-full max-md:max-w-full">
            <FormField label="Tên dự án :" className="max-md:max-w-full">
              <div className="flex flex-wrap gap-5 justify-between px-2.5 py-2 text-base text-gray-300 bg-white rounded-md border border-gray-300 border-solid max-md:max-w-full">
                <select
                  className="my-auto bg-transparent border-none outline-none flex-1"
                  value={formData.project}
                  onChange={(e) => handleInputChange("project", e.target.value)}
                  disabled={isSubmitting || isLoadingProjects}
                >
                  <option value="">
                    {isLoadingProjects 
                      ? "Đang tải danh sách dự án..." 
                      : projectsError 
                        ? "Lỗi tải dự án" 
                        : "Chọn dự án của bạn"
                    }
                  </option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id.toString()}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>
              {projectsError && (
                <div className="mt-1 text-sm text-red-500">
                  {projectsError}
                </div>
              )}
            </FormField>

            <FormField
              label="Số tiền yêu cầu (VND) :"
              className="mt-2.5 max-md:max-w-full"
            >
              <div className="w-full text-base whitespace-nowrap bg-black bg-opacity-0 max-md:max-w-full">
                <div className="flex flex-wrap gap-3 px-3 pt-2.5 pb-4 bg-white rounded-md border border-gray-300 border-solid">
                  <input
                    type="number"
                    className="flex-auto text-gray-400 w-[658px] max-md:max-w-full bg-transparent border-none outline-none"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </FormField>

            <FormField
              label="Mục đích yêu cầu tài trợ :"
              className="mt-2.5 max-md:max-w-full"
            >
              <textarea
                className="overflow-hidden px-4 pt-2 pb-16 w-full text-base text-gray-400 bg-white rounded-md border border-gray-300 border-solid max-md:pr-5 max-md:max-w-full resize-none outline-none"
                placeholder="Nhập vào đây"
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              label="File sao kê :"
              className="mt-2.5 text-sm max-md:max-w-full"
            >
              <FileUpload 
                onFileChange={handleFileChange}
              />
            </FormField>

            <FormField label="Trình bày :" className="mt-2.5 max-md:max-w-full">
              <textarea
                className="overflow-hidden px-4 pt-2 pb-24 w-full text-base text-gray-400 bg-white rounded-md border border-gray-300 border-solid max-md:pr-5 max-md:pb-28 max-md:max-w-full resize-none outline-none"
                placeholder="Provide a clear explanation of why the funding is necessary"
                value={formData.presentation}
                onChange={(e) =>
                  handleInputChange("presentation", e.target.value)
                }
                disabled={isSubmitting}
              />
            </FormField>

            <div className="flex flex-wrap gap-6 mt-2.5 bg-black bg-opacity-0 max-md:max-w-full">
              <FormField
                label="Nghiên cứu chính :"
                className="flex-1 grow shrink-0 basis-0 w-fit"
              >
                <input
                  type="text"
                  className="px-4 py-3.5 w-full text-base text-gray-400 bg-white rounded-md border border-gray-300 border-solid max-md:pr-5 outline-none"
                  placeholder="Họ tên"
                  value={formData.researcher}
                  onChange={(e) =>
                    handleInputChange("researcher", e.target.value)
                  }
                  disabled={isSubmitting}
                />
              </FormField>
              <FormField
                label="Email nhà tài trợ :"
                className="flex-1 grow shrink-0 basis-0 w-fit"
              >
                <input
                  type="email"
                  className="px-4 py-3.5 w-full text-base text-gray-400 whitespace-nowrap bg-white rounded-md border border-gray-300 border-solid max-md:pr-5 outline-none"
                  placeholder="username@gmail.com"
                  value={formData.sponsorEmail}
                  onChange={(e) =>
                    handleInputChange("sponsorEmail", e.target.value)
                  }
                  disabled={isSubmitting}
                />
              </FormField>
            </div>

            <FormField
              label="Ngày tháng năm"
              className="mt-2.5 max-md:max-w-full"
            >
              <input
                type="text"
                className="px-4 pt-2 pb-5 w-full text-base text-black bg-gray-100 rounded-md border border-gray-300 border-solid max-md:pr-5 max-md:max-w-full outline-none"
                value={formData.date}
                readOnly
              />
            </FormField>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`self-center mt-2.5 max-w-full text-sm font-bold text-center text-white whitespace-nowrap w-[162px] px-6 py-3 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </button>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/677a17926f8ccbc9fa422a2bc3112b5ad69939a2?placeholderIfAbsent=true&apiKey=c7bfdd715a654a2987e94b52aaf52c4a"
          className="object-contain shrink-0 self-start mt-12 w-5 aspect-square max-md:mt-10"
          alt="Form icon"
        />
      </form>
      <div className="self-start mt-20 text-base font-bold text-white max-md:mt-10">
        Tạo yêu cầu
      </div>
    </div>
  );
};