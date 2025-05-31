"use client";
import React, { useState } from "react";

interface FileUploadProps {
  onFileChange?: (file: File | null) => void;
  accept?: string;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  accept = ".pdf,.doc,.docx,.txt",
  label = "Tải bài nộp nhiệm vụ:",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (onFileChange) {
      onFileChange(file);
    }
  };

  return (
    <section className="w-full bg-black bg-opacity-0 max-w-[1099px] max-md:max-w-full">
      <label className="py-0.5 max-w-full text-xl font-bold bg-black bg-opacity-0 text-slate-600 w-[704px] max-md:pr-5 block">
        {label}
      </label>
      <div className="pb-6 text-sm text-center text-gray-500 bg-black bg-opacity-0 max-md:max-w-full">
        <label className="flex flex-col justify-center items-center px-20 py-7 bg-white rounded-lg border-2 border-gray-300 border-dashed max-md:px-5 max-md:max-w-full cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col max-w-full w-[198px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/691c38ade3eb9038aa2283219e94bbfa83e18b3b?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a"
              alt="Upload icon"
              className="object-contain self-center aspect-[1.27] w-[38px]"
            />
            <div className="px-5 py-1 mt-2 bg-black bg-opacity-0 max-md:px-5">
              {selectedFile ? selectedFile.name : "Tải file"}
            </div>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept={accept}
          />
        </label>
      </div>
    </section>
  );
};
