// FileUpload.tsx
import React, { useState } from "react";

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

interface FileUploadProps {
  onFileChange?: (file: File | null) => void;
  accept?: string;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  accept = ".pdf,.xlsx,.xls",
  label,
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
    <div className="mt-2 text-sm text-gray-500 bg-black bg-opacity-0 max-md:max-w-full">
      {label && <label className="block text-xl font-bold text-slate-600 mb-2">{label}</label>}
      
      {selectedFile ? (
        <div className="flex items-center justify-between px-5 py-3 bg-white rounded-lg border border-gray-300 max-md:px-3">
          {/* File Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /><path d="M14.5 7.5l3 3m-3-3l-3 3m3-3v6.5m0 0H12a2.5 2.5 0 010-5h.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex-1 flex justify-between items-center">
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-gray-800">{selectedFile.name}</span>
              <span className="text-xs text-gray-500">{formatBytes(selectedFile.size)}</span>
            </div>
            <button
              type="button"
              onClick={handleEditClick}
              className="px-3 py-1 text-sm font-medium text-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sửa
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col justify-center items-center px-20 py-7 bg-white rounded-lg border-2 border-gray-300 border-dashed max-md:px-5 max-md:max-w-full cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col max-w-full w-[198px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1814343d84bcfee0eee1a5512470a53bbd15bf51?placeholderIfAbsent=true&apiKey=c7bfdd715a654a2987e94b52aaf52c4a"
              className="object-contain self-center aspect-[1.27] w-[38px]"
              alt="Upload icon"
            />
            <span className="px-3 py-1 mt-2 bg-black bg-opacity-0">
              Tải file PDF hoặc File Excel
            </span>
          </div>
          <input type="file" onChange={handleFileChange} className="hidden" accept={accept} />
        </label>
      )}
    </div>
  );
};