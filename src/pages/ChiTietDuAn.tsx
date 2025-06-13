import React from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { TaskList, AttachmentList } from "../components/ChiTietDuAn/ChiTietDuAn";
import { useParams, useNavigate } from "react-router-dom";

export const ChiTietDuAn_nnc: React.FC = () => {
  const { title } = useParams(); // 🟢 lấy title từ URL
  const navigate = useNavigate();

  const projectTitle = decodeURIComponent(title || "Tên Dự án");

  const handleCreateTask = () => {
    navigate("/themnhiemvu", { state: { project: projectTitle } });
  };

  const handleCreateAttachment = () => {
    navigate("/themtailieu", { state: { project: projectTitle } });
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
            <h1 className="mt-8 text-3xl font-bold text-gray-700 mb-8">
              {projectTitle}
            </h1>

            <div className="w-full max-w-[800px]">
              {/* Nút tạo nhiệm vụ */}
              <div className="flex items-center justify-end mb-2">
                <button
                  onClick={handleCreateTask}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-base font-semibold"
                >
                  + Tạo nhiệm vụ
                </button>
              </div>

              <TaskList />

              {/* Nút tạo tài liệu đính kèm */}
              <div className="flex items-center justify-end mt-10 mb-2">
                <button
                  onClick={handleCreateAttachment}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-base font-semibold"
                >
                  + Tạo tài liệu
                </button>
              </div>

              <AttachmentList />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ChiTietDuAn_nnc;
