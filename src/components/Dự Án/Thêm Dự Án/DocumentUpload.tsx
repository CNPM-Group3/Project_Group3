"use client";
import * as React from "react";

interface DocumentUploadProps {
  userId?: string;
  onUploadSuccess?: (file: File) => void;
  onSubmit?: (file: File | null) => void; 
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ userId, onUploadSuccess, onSubmit }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
    if (selectedFile && onUploadSuccess) {
      onUploadSuccess(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(file);
    }
  };

  return (
    <section className="flex flex-col items-center mt-16 w-full max-md:mt-10">
      <h1 className="text-3xl font-bold text-gray-700">Thêm tài liệu dự án</h1>

      <label className="flex flex-col justify-center px-96 py-32 mt-16 w-full text-sm text-center text-gray-500 bg-white rounded-lg border-2 border-gray-300 border-dashed max-w-[1032px] min-h-[321px] max-md:px-5 max-md:py-24 max-md:mt-10 max-md:max-w-full cursor-pointer">
        <div className="flex flex-col w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a658af8e68caa2f693e8c8472dd5304185720521?placeholderIfAbsent=true&apiKey=7efb82fbb853426aa9e7996914614d36"
            className="object-contain self-center aspect-[1.27] w-[38px]"
            alt="Upload icon"
          />
          <p className="px-16 py-1 mt-2 w-full bg-black bg-opacity-0 max-md:px-5">
            Tải file{" "}
          </p>
          {fileName && (
            <span className="mt-2 text-green-600 font-semibold">
              Đã chọn: {fileName}
            </span>
          )}
        </div>
        <input
          type="file"
          className="sr-only"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </label>

      <button
        className="px-16 py-4 mt-9 max-w-full text-2xl font-bold text-center text-white whitespace-nowrap bg-teal-500 rounded-lg border-0 border border-solid w-[300px] max-md:px-5"
        onClick={handleSubmit}
      >
        Thêm
      </button>
    </section>
  );
};
