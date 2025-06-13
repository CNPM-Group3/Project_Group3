"use client";
import React, { useState } from "react";
import { FormField } from "./FormField";
import { FileUpload } from "./FileUpload";

interface FundingRequestFormProps {
  onSubmit: (formData: { // Define the type of formData expected by the onSubmit function
    project: string;
    amount: string;
    purpose: string;
    presentation: string;
    researcher: string;
    sponsorEmail: string;
    date: string;
  }) => void;
  // You can add other props here if needed in the future
}

export const FundingRequestForm: React.FC<FundingRequestFormProps> = ({
  onSubmit
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form data before submit:", formData); // Optional: log data before calling onSubmit
    onSubmit(formData); // Call the onSubmit prop with the current form data
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
                >
                  <option value="">Chọn dự án của bạn</option>
                </select>
              </div>
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
              />
            </FormField>

            <FormField
              label="File sao kê :"
              className="mt-2.5 text-sm max-md:max-w-full"
            >
              <FileUpload />
            </FormField>

            <FormField label="Trình bày :" className="mt-2.5 max-md:max-w-full">
              <textarea
                className="overflow-hidden px-4 pt-2 pb-24 w-full text-base text-gray-400 bg-white rounded-md border border-gray-300 border-solid max-md:pr-5 max-md:pb-28 max-md:max-w-full resize-none outline-none"
                placeholder="Provide a clear explanation of why the funding is necessary"
                value={formData.presentation}
                onChange={(e) =>
                  handleInputChange("presentation", e.target.value)
                }
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
            className="self-center mt-2.5 max-w-full text-sm font-bold text-center text-white whitespace-nowrap w-[162px] px-6 py-3 bg-blue-600 rounded-lg transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Gửi
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