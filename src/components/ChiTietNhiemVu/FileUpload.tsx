"use client";
import React, { useState } from "react";

interface FileUploadProps {
  onFileChange?: (file: File | null) => void;
  accept?: string;
  label?: string;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

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

  const handleEditClick = () => {
    setSelectedFile(null);
    if (onFileChange) {
      onFileChange(null);
    }
  };

  return (
    <section className="w-full bg-black bg-opacity-0 max-w-[1099px] max-md:max-w-full">
      <label className="py-0.5 max-w-full text-xl font-bold bg-black bg-opacity-0 text-slate-600 w-[704px] max-md:pr-5 block">
        {label}
      </label>
      <div className="pb-6 text-sm text-center text-gray-500 bg-black bg-opacity-0 max-md:max-w-full">
        {selectedFile ? (
          <div className="flex items-center justify-between px-5 py-3 bg-white rounded-lg border border-gray-300 max-md:px-3">
            <div className="flex items-center gap-3">
              {/* Simple file icon - replace with more specific icons if needed */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-2m3 2v-2m0 4h.01M12 11V9m0 0V6m0 3a3 3 0 110 6m-9 4h16a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-800">{selectedFile.name}</span>
                <span className="text-xs text-gray-500">{formatBytes(selectedFile.size)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleEditClick}
              className="px-3 py-1 text-sm font-medium text-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sửa
            </button>
          </div>
        ) : (
          <label className="flex flex-col justify-center items-center px-20 py-7 bg-white rounded-lg border-2 border-gray-300 border-dashed max-md:px-5 max-md:max-w-full cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex flex-col max-w-full w-[198px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/691c38ade3eb9038aa2283219e94bbfa83e18b3b?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a"
                alt="Upload icon"
                className="object-contain self-center aspect-[1.27] w-[38px]"
              />
              <div className="px-5 py-1 mt-2 bg-black bg-opacity-0 max-md:px-5">
                Tải file
              </div>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept={accept}
            />
          </label>
        )}
      </div>
    </section>
  );
};