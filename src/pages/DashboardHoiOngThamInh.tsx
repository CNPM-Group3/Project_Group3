"use client";

import React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/HoiDongThamDinh/Sidebar";
import DashboardHeader from "@cnpm/components/Header";
import { ProjectEvaluation, PhaseProgress } from "@cnpm/components/HoiDongThamDinh/StatusIndicator";

const DashboardHoiDongThamDinh: React.FC = () => {
  return (
    <MainLayout>
      <main className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen w-full">
        <div className="flex flex-row min-h-screen">
          {/* Sidebar */}
          <div className="w-[18%] border-r border-slate-200 bg-gray-50">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="w-[110%] flex flex-col">
            <DashboardHeader />

            <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
              {/* Card chính bao toàn bộ phần đánh giá */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                {/* Tiêu đề chính */}
                <h2 className="text-lg font-semibold mb-6 text-gray-800">
                  Đánh giá dự án
                </h2>

                {/* ProjectEvaluation block */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
                  <ProjectEvaluation />
                </div>

                {/* PhaseProgress + Comment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Giai đoạn tiến độ */}
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 className="text-base font-semibold mb-3 text-gray-700">
                      Đánh giá mốc tiến độ
                    </h3>
                    <PhaseProgress />
                  </div>

                  {/* Phản hồi */}
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold mb-3 text-gray-700">
                        Phản hồi tổng quan
                      </h3>
                      <textarea
                        className="w-full h-[200px] p-4 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Nhập phản hồi tổng quan..."
                      />
                    </div>

                    <div className="flex justify-end mt-4">
                      <button className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg shadow">
                        Gửi đánh giá
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default DashboardHoiDongThamDinh;
