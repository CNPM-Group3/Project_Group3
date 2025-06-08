"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { ProfilePage } from "@cnpm/components/Profile/ProfilePage";
import { getCurrentUser, User } from '@cnpm/services/userService';
import apiService from '@cnpm/services/apiService';

const DEFAULT_AVATAR = "https://cdn.builder.io/api/v1/image/assets/TEMP/b8abed92c5361a5449f407906e028f52aee28e22?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee";

const ThongTinCaNhanThanhVienNghienCuu = () => {
  // User data states
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Avatar states
  const [previewImg, setPreviewImg] = useState<string>(DEFAULT_AVATAR);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // Update preview image if user has a picture
        if (currentUser?.picture) {
          setPreviewImg(currentUser.picture);
        } else {
          setPreviewImg(DEFAULT_AVATAR);
        }
      } catch (err) {
        console.error('Failed to fetch user for profile page:', err);
        setError('Không thể tải thông tin người dùng.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn ảnh trước khi lưu.");
      return;
    }

    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      // Gọi API upload avatar
      const response = await apiService.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.picture) {
        setPreviewImg(response.data.picture);
        // Cập nhật user state với avatar mới
        if (user) {
          setUser({ ...user, picture: response.data.picture });
        }
        alert("Ảnh đại diện đã được cập nhật thành công.");
      }
    } catch (err: any) {
      console.error('Failed to upload avatar:', err);
      setError(err?.response?.data?.message || 'Lỗi khi upload ảnh đại diện');
      alert("Lỗi khi upload ảnh đại diện. Vui lòng thử lại.");
    } finally {
      setUploadLoading(false);
      setSelectedFile(null);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    // Revert preview to user's current picture or default if canceled
    setPreviewImg(user?.picture || DEFAULT_AVATAR);
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
        <div className="w-[82%] flex flex-col">
          {/* Header */}
          <Header />
          {/* Content */}
          <section className="flex flex-col items-center pb-60 w-full max-w-full">
            {/* Display loading or error message for initial fetch */}
            {loading && <div className="text-center text-gray-500">Đang tải trang hồ sơ...</div>}
            {error && !loading && <div className="text-center text-red-500">{error}</div>}
            
            {/* Only show the following content if user data is loaded successfully */}
            {!loading && !error && user && (
              <>
                {/* Avatar section */}
                <div
                  className="relative w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer"
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

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />

                {/* Upload buttons */}
                {selectedFile && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={handleUpload}
                      disabled={uploadLoading}
                      className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
                        uploadLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {uploadLoading ? 'Đang xử lý...' : 'Lưu ảnh'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={uploadLoading}
                      className={`px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition ${
                        uploadLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Hủy
                    </button>
                  </div>
                )}

                {/* Profile content */}
                <div className="mt-16 w-full max-w-[984px] max-md:mt-10 max-md:max-w-full">
                  <ProfilePage 
                    user={user} 
                    loading={loading}
                    error={error}
                  />
                </div>
              </>
            )}

            {/* Handle case where user is null after loading and no error */}
            {!loading && !error && !user && (
              <div className="text-center text-gray-500">Không tìm thấy thông tin người dùng.</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ThongTinCaNhanThanhVienNghienCuu;
