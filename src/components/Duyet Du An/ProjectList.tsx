import React from "react";

export interface Project {
  id: number;
  title: string;
  proposerName?: string;
  description: string;
  objectives: string;
  expectedOutcomes: string;
  startDate: string;
  endDate: string;
  researchTopicId: number;
  ownerId?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectListProps {
  projects: Project[];
  actionType?: "approve" | "reject" | "both";
  onApprove?: (project: Project) => void;
  onReject?: (project: Project) => void;
  onView?: (project: Project) => void;
  showStatus?: boolean;
}

export const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  actionType = "both",
  onApprove,
  onReject,
  onView,
  showStatus = false
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700 bg-white text-center">Mã</th>
              <th className="px-6 py-3 w-[280px] text-left font-semibold text-gray-700 bg-white">Tên dự án</th>
              <th className="px-6 py-3 w-[179px] text-left font-semibold text-gray-700 bg-white">Tên người đề xuất</th>
              <th className="px-6 py-3 w-[119px] text-center font-semibold text-gray-700 bg-white">Ngày</th>
              {showStatus && (
                <th className="px-6 py-3 w-[120px] text-center font-semibold text-gray-700 bg-white">Trạng thái</th>
              )}
              <th className="px-6 py-3 text-center font-semibold text-gray-700 bg-white whitespace-nowrap">Xem chi tiết</th>
              <th className="px-6 py-3 w-[184px] text-center font-semibold text-gray-700 bg-white">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: Project) => (
              <tr key={project.id} className="bg-white hover:bg-gray-50 transition border-b border-gray-200 last:border-b-0 rounded-xl">
                <td className="px-4 py-3 text-center align-middle">{project.id}</td>
                <td className="px-6 py-3 text-left align-middle">{project.title}</td>
                <td className="px-6 py-3 text-left align-middle">{project.proposerName || 'N/A'}</td>
                <td className="px-6 py-3 text-center align-middle">{new Date(project.createdAt || '').toLocaleDateString()}</td>
                {showStatus && (
                  <td className="px-6 py-3 text-center align-middle">{project.status || '-'}</td>
                )}
                <td className="px-6 py-3 text-center align-middle">
                  <button className="text-blue-600 underline" onClick={() => onView?.(project)}>Xem</button>
                </td>
                <td className="px-6 py-3 text-center align-middle">
                  <div className="flex flex-row items-center justify-center gap-2">
                    {(actionType === "approve" || actionType === "both") && (
                      <button
                        className="px-4 py-1 text-teal-700 bg-sky-100 rounded-xl min-h-[21px] w-20"
                        onClick={() => onApprove?.(project)}
                      >
                        Duyệt
                      </button>
                    )}
                    {(actionType === "reject" || actionType === "both") && (
                      <button
                        className="px-4 py-1 text-red-700 bg-rose-100 rounded-xl min-h-[21px] w-24 whitespace-nowrap"
                        onClick={() => onReject?.(project)}
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
    </div>
  );
};