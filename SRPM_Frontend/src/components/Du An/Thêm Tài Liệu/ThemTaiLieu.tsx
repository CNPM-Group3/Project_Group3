import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { DocumentUpload } from "@cnpm/components/Du An/Thêm Tài Liệu/DocumentUpload"; // Assuming this is your DocumentUpload component

interface AttachmentData {
  projectId: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  uploadedBy?: number;
}

interface LocationState {
  projectId: number;
  projectTitle: string;
  project?: any;
}

// Mock attachment service - replace with your actual service
const attachmentService = {
  async create(attachmentData: AttachmentData): Promise<any> {
    // Simulate API call
    console.log("Creating attachment:", attachmentData);
    
    // Mock successful response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...attachmentData,
          url: `uploads/${attachmentData.fileName}` // Mock file URL
        });
      }, 1000);
    });
  }
};

export const ThemTaiLieu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if we have the required project data
  if (!state?.projectId) {
    return (
      <main className="bg-slate-50 min-h-screen w-full">
        <div className="flex flex-row min-h-screen">
          <div className="w-[18%] border-r border-slate-200 bg-gray">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col">
            <Header />
            <section className="flex flex-col items-center pb-16 w-full max-w-full">
              <div className="mt-8 text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
                  <p className="mb-3">Không tìm thấy thông tin dự án</p>
                  <button
                    onClick={() => navigate("/duan")}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                  >
                    Quay lại danh sách dự án
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleSubmit = async (file: File | null) => {
    if (!file) {
      setError("Vui lòng chọn một tệp để tải lên");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const attachmentData: AttachmentData = {
        projectId: state.projectId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString(),
      };

      // Create attachment record
      await attachmentService.create(attachmentData);

      // Navigate back to project detail with success flag
      navigate(`/chitietduan/${state.projectId}`, {
        state: {
          ...state,
          attachmentCreated: true // Flag to trigger refresh
        }
      });

    } catch (err) {
      console.error("Error uploading attachment:", err);
      setError("Không thể tải lên tệp. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBack = () => {
    navigate(`/chitietduan/${state.projectId}`, { state });
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        <div className="w-[18%] border-r border-slate-200 bg-gray">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <Header />
          <section className="flex flex-col items-center pb-16 w-full max-w-full">
            {/* Breadcrumb and back button */}
            <div className="w-full max-w-[1032px] mt-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800 transition-colors mb-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại {state.projectTitle}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="w-full max-w-[1032px] mb-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              </div>
            )}

            {/* Loading overlay */}
            {isUploading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mb-4"></div>
                  <p className="text-gray-600">Đang tải lên tài liệu...</p>
                </div>
              </div>
            )}

            <DocumentUpload
              onUploadSuccess={handleFileUpload}
              onSubmit={handleSubmit}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default ThemTaiLieu;