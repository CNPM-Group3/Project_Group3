"use client";
import React from "react";
import AdminSidebar from '@cnpm/components/sidebars/AdminSidebar';
import Header from '@cnpm/components/Header';
import { TabSelector } from "@cnpm/components/Duyệt Tài Trợ/SponsorshipTabSelector";

interface DuyetTaiTroProps {
  userRole: string;
}

const DuyetTaiTro: React.FC<DuyetTaiTroProps> = ({ userRole }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">Duyệt tài trợ</h1>
            
            {/* Danh sách yêu cầu tài trợ */}
            <div className="space-y-4">
              {/* Yêu cầu 1 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">Dự án: Hệ thống giao dịch tự động</h3>
                    <p className="text-gray-600">Nhóm: CNTT22</p>
                    <p className="text-gray-600">Số tiền yêu cầu: 10,000,000 VNĐ</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Duyệt
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Từ chối
                    </button>
                  </div>
                </div>
              </div>

              {/* Yêu cầu 2 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">Dự án: Bác Sĩ AI</h3>
                    <p className="text-gray-600">Nhóm: CNTT3</p>
                    <p className="text-gray-600">Số tiền yêu cầu: 15,000,000 VNĐ</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Duyệt
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Từ chối
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DuyetTaiTro;
