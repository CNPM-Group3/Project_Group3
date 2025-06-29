"use client";
import React, { useState, ChangeEvent, useRef } from "react";
import Sidebar from "@cnpm/components/Admin/Sidebar1";
import Header from "@cnpm/components/Header";
import { UserDetails } from "@cnpm/components/Profile/UserDetails";

const ThongTinCaNhanThanhVienNghienCuu = () => {
  const [previewImg, setPreviewImg] = useState<string>(
    "https://cdn.builder.io/api/v1/image/assets/TEMP/b8abed92c5361a5449f407906e028f52aee28e22?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Vui lòng chọn ảnh trước khi lưu.");
      return;
    }
    // TODO: Xử lý upload ảnh lên server tại đây
    alert("Ảnh đại diện đã được cập nhật (demo).");
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewImg(
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b8abed92c5361a5449f407906e028f52aee28e22?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
    );
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-[18%] border-r border-slate-200 bg-gray">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="w-[110%] flex flex-col items-center">
          {/* Header */}
          <div className="w-full h-[100px]">
            <Header />
          </div>

          {/* Content */}
          <section className="flex flex-col items-center justify-center pb-60 w-full">
            {/* Container cho avatar và UserDetails */}
            <div className="flex flex-col items-center w-full">
              {/* Ảnh đại diện với overlay hover */}
              <div
                className="relative w-[160px] h-[160px] rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer mb-8"
                onClick={triggerFileSelect}
                title="Click để thay đổi ảnh đại diện"
              >
                <img
                  src={previewImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition flex flex-col justify-center items-center text-white text-sm font-semibold select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Thay đổi ảnh
                </div>
              </div>

              {/* Input file ẩn */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />

              {/* Nút Lưu / Hủy khi đã chọn ảnh mới */}
              {selectedFile && (
                <div className="flex gap-4 mt-4 justify-center">
                  <button
                    onClick={handleUpload}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Lưu ảnh
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Hủy
                  </button>
                </div>
              )}

              {/* Khung thông tin người dùng */}
              <div className="w-full flex justify-center mt-12">
                <div className="w-full max-w-[1100px]">
                  <UserDetails />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ThongTinCaNhanThanhVienNghienCuu;
