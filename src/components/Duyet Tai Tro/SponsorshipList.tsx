import React from "react";
import { SponsorshipListItem } from "./SponsorshipListItem";

export interface Sponsorship {
  id: string;
  name: string;
  proposer: string;
  date: string;
  amount: number;
}

interface SponsorshipListProps {
  projects: Sponsorship[];
  actionType?: "approve" | "reject" | "both";
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
}

export const SponsorshipList: React.FC<SponsorshipListProps> = ({ 
  projects, 
  actionType = "both",
  onApprove,
  onReject,
  onView 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 mt-6">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700 bg-white text-center">Mã</th>
            <th className="px-6 py-3 font-semibold text-gray-700 bg-white text-left">Tên dự án</th>
            <th className="px-6 py-3 font-semibold text-gray-700 bg-white text-left">Tên người yêu cầu</th>
            <th className="px-6 py-3 font-semibold text-gray-700 bg-white text-right">Số tiền</th>
            <th className="px-6 py-3 font-semibold text-gray-700 bg-white text-center">Ngày</th>
            <th className="px-6 py-3 font-semibold text-gray-700 bg-white text-center">Xem chi tiết</th>
            <th className="px-6 py-3 font-semibold text-gray-700 bg-white text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="bg-white hover:bg-gray-50 transition border-b border-gray-200 last:border-b-0">
              <td className="px-4 py-3 text-center align-middle">{project.id}</td>
              <td className="px-6 py-3 text-left align-middle">{project.name}</td>
              <td className="px-6 py-3 text-left align-middle">{project.proposer}</td>
              <td className="px-6 py-3 text-right align-middle">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(project.amount)}</td>
              <td className="px-6 py-3 text-center align-middle">{project.date}</td>
              <td className="px-6 py-3 text-center align-middle">
                <button className="text-blue-600 underline" onClick={() => onView?.(project.id)}>Xem</button>
              </td>
              <td className="px-6 py-3 text-center align-middle">
                <div className="flex flex-row items-center justify-center gap-2">
                  {(actionType === "approve" || actionType === "both") && (
                    <button
                      className="px-4 py-1 text-teal-700 bg-sky-100 rounded-xl min-h-[21px] w-20"
                      onClick={() => onApprove?.(project.id)}
                    >
                      Duyệt
                    </button>
                  )}
                  {(actionType === "reject" || actionType === "both") && (
                    <button
                      className="px-4 py-1 text-red-700 bg-rose-100 rounded-xl min-h-[21px] w-24 whitespace-nowrap"
                      onClick={() => onReject?.(project.id)}
                    >
                      Từ chối
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};