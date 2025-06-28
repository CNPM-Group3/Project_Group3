"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { DocumentUpload } from "@cnpm/components/Du An/Thêm Tài Liệu/DocumentUpload";
import { uploadDocument } from "@cnpm/services/documentService";
import { useNavigate, useLocation } from "react-router-dom";
interface ThemTaiLieuNghienCuuChinhProps {
  userId?: string;
  onUploadSuccess?: (file: File) => void;
  onSubmit?: (file: File | null) => void;
}
interface LocationState {
  projectId?: number;
  projectTitle?: string;
}
function ThemTaiLieuNghienCuuChinh({
  userId,
  onUploadSuccess,
  onSubmit
}: ThemTaiLieuNghienCuuChinhProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const projectId = state?.projectId;
  const projectTitle = state?.projectTitle;

  const handleSubmit = async (file: File | null) => {
    if (!file || !projectId) {
      alert("Không có file hoặc không có thông tin dự án");
      return;
    }

    const formData = new FormData();
    formData.append("title", file.name);
    formData.append("file", file);
    formData.append("projectIds", JSON.stringify([projectId]));

    const res = await uploadDocument(formData);
    if (res.success) {
      onUploadSuccess?.(file);
      navigate(`/chitietduan/${projectId}`, {
        state: { id: projectId, title: projectTitle, documentUploaded: true }
      });
    } else {
      alert("Tải lên thất bại");
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full flex flex-row">
      <div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <div className="w-full z-10">
          <Header />
        </div>

        <section className="flex flex-col pb-60 w-full items-center">
          <DocumentUpload
            userId={userId}
            onUploadSuccess={onUploadSuccess}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
    </main>
  );
}

export default ThemTaiLieuNghienCuuChinh;