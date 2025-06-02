"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import Sidebar from "@cnpm/components/Profile/Sidebar";
import Header from "@cnpm/components/Header";
import { UserDetails } from "@cnpm/components/Profile/UserDetails";
import { ResearchInfo } from "@cnpm/components/Profile/ResearchInfo";

interface ThongTinCaNhanThanhVienNghienCuuProps {
  userId: string; // Example prop: ID of the user whose profile is being viewed
}

// Define interfaces for state
interface UserInfoState {
  name: string;
  class: string;
  email: string;
  phone: string;
}

interface PasswordsState {
  current: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ResearchInfoState {
  role: string;
  researchArea: string;
  projectCount: number;
  githubLink?: string;
}

const ThongTinCaNhanThanhVienNghienCuu: React.FC<ThongTinCaNhanThanhVienNghienCuuProps> = ({
  userId
}) => {
  // State for profile image
  const [previewImg, setPreviewImg] = useState<string>(
    "https://cdn.builder.io/api/v1/image/assets/TEMP/b8abed92c5361a5449f407906e028f52aee28e22?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // State for UserDetails
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    name: "Nguyễn Văn A",
    class: "CNTTCLC23",
    email: "fe@ut.edu.vn",
    phone: "08********",
  });

  const [passwords, setPasswords] = useState<PasswordsState>({
    current: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // State for ResearchInfo
  const [researchInfo, setResearchInfo] = useState<ResearchInfoState>({
    role: "Thành viên nghiên cứu",
    researchArea: "Công nghệ vi mạch bán dẫn",
    projectCount: 8,
    githubLink: "#",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user data when component mounts
  useEffect(() => {
    // TODO: Fetch user data using userId
    console.log("Fetching data for user:", userId);
  }, [userId]);

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
      // TODO: Implement actual image upload
      // const formData = new FormData();
      // formData.append('image', selectedFile);
      // await uploadProfileImage(userId, formData);
      alert("Ảnh đại diện đã được cập nhật.");
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Có lỗi xảy ra khi tải lên ảnh.");
    }
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

  // Handlers for UserDetails
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement actual API call
      // await updateUserInfo(userId, userInfo);
      console.log("Cập nhật thông tin:", userInfo);
      alert("Thông tin người dùng đã được cập nhật.");
    } catch (error) {
      console.error('Error updating user info:', error);
      alert("Có lỗi xảy ra khi cập nhật thông tin.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    try {
      // TODO: Implement actual API call
      // await updatePassword(userId, passwords);
      console.log("Đổi mật khẩu:", passwords);
      alert("Mật khẩu đã được đổi.");
      setPasswords({
        current: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error('Error updating password:', error);
      alert("Có lỗi xảy ra khi đổi mật khẩu.");
    }
  };

  // Handlers for ResearchInfo (assuming it might become editable later)
  const handleResearchInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResearchInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResearchInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi cập nhật thông tin nghiên cứu
    console.log("Cập nhật thông tin nghiên cứu:", researchInfo);
    alert("Thông tin nghiên cứu đã được cập nhật (demo).");
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed w-full z-10">
            <Header />
          </div>
          {/* Content */}
          <section className="flex flex-col items-center pb-60 w-full max-w-full mt-16">
            {/* Ảnh đại diện với overlay hover */}
            <div
              className="relative w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer mt-10"
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
              <div className="flex gap-4 mt-4">
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

            <div className="mt-16 w-full max-w-[984px] max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="w-6/12 max-md:ml-0 max-md:w-full">
                  <UserDetails
                    userInfo={userInfo}
                    passwords={passwords}
                    onUserInfoChange={handleUserInfoChange}
                    onPasswordsChange={handlePasswordsChange}
                    onUserInfoSubmit={handleUserInfoSubmit}
                    onPasswordSubmit={handlePasswordSubmit}
                  />
                </div>
                <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <ResearchInfo
                    role={researchInfo.role}
                    researchArea={researchInfo.researchArea}
                    projectCount={researchInfo.projectCount}
                    githubLink={researchInfo.githubLink}
                  />
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
