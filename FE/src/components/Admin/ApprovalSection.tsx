import React from "react";
import { ApprovalRequest } from "./types";

interface ApprovalSectionProps {
  requests: ApprovalRequest[];
}

export const ApprovalSection: React.FC<ApprovalSectionProps> = ({ requests }) => {
  return (
    <div className="flex-1 p-6 rounded-xl border border-gray-200 bg-white shadow-sm max-sm:w-full">
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        Phê duyệt giao dịch & hoạt động
      </h2>

      {/* Header Row */}
      <div className="grid grid-cols-5 gap-4 py-3 text-sm font-medium text-gray-500 border-b border-gray-300">
        <span>Người gửi</span>
        <span>Loại yêu cầu</span>
        <span>Ngày gửi</span>
        <span>Trạng thái</span>
        <span className="text-center">Hành động</span>
      </div>

      {/* Request Rows */}
      <div className="divide-y divide-gray-200">
        {requests.map((request, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 py-4 text-sm text-gray-700 items-center">
            <span>{request.sender}</span>
            <span>{request.requestType}</span>
            <span>{request.date}</span>
            <span>{request.status}</span>
            <div className="flex justify-center gap-2">
              <button className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition">
                Duyệt
              </button>
              <button className="px-3 py-1 text-xs font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition">
                Từ chối
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};