import React, { useState, useEffect } from "react";
import {
  getFundingRequests,
  approveFundingRequest,
  rejectFundingRequest,
  getFundingRequestById,
  getFundingRequestsByStatus
} from "@cnpm/services/fundingService";

export interface Sponsorship {
  id: string;
  name: string;
  proposer: string;
  date: string;
  amount: number;
}

interface SponsorshipListProps {
  projects?: Sponsorship[];
  actionType?: "approve" | "reject" | "both";
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
  autoFetch?: boolean;
  statusFilter?: "Pending" | "Approved" | "Rejected"; // status đúng với DB
}

export const SponsorshipList: React.FC<SponsorshipListProps> = ({
  projects: initialProjects,
  actionType = "both",
  onApprove,
  onReject,
  onView,
  autoFetch = true,
  statusFilter
}) => {
  const [projects, setProjects] = useState<Sponsorship[]>(initialProjects || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFundingRequests = async () => {
    if (!autoFetch) return;

    setLoading(true);
    setError(null);

    try {
      let response;

      if (statusFilter) {
        response = await getFundingRequestsByStatus(statusFilter);
      } else {
        response = await getFundingRequests();
      }

      const data = response.data || response;

      const mappedData: Sponsorship[] = Array.isArray(data)
        ? data.map((item: any) => ({
            id: item.id.toString(),
            name: item.title || item.projectTitle || item.name || "",
            proposer: item.requestedByName || item.proposer || "",
            date: new Date(item.createdAt || item.date).toLocaleDateString("vi-VN"),
            amount: item.amount || 0
          }))
        : [];

      setProjects(mappedData);
    } catch (err) {
      setError("Không thể tải danh sách yêu cầu cấp vốn");
      console.error("Error fetching funding requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (onApprove) {
      onApprove(id);
      return;
    }

    try {
      setLoading(true);
      await approveFundingRequest(Number(id));
      await fetchFundingRequests();
      alert("Duyệt yêu cầu thành công!");
    } catch (err) {
      console.error("Error approving request:", err);
      alert("Có lỗi xảy ra khi duyệt yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    if (onReject) {
      onReject(id);
      return;
    }

    try {
      setLoading(true);
      await rejectFundingRequest(Number(id), "không duyệt");
      await fetchFundingRequests();
      alert("Từ chối yêu cầu thành công!");
    } catch (err) {
      console.error("Error rejecting request:", err);
      alert("Có lỗi xảy ra khi từ chối yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: string) => {
    if (onView) {
      onView(id);
      return;
    }

    try {
      const detail = await getFundingRequestById(Number(id));
      console.log("Funding request detail:", detail);
      alert(`Chi tiết yêu cầu ID: ${id}\n${JSON.stringify(detail, null, 2)}`);
    } catch (err) {
      console.error("Error fetching request detail:", err);
      alert("Không thể tải chi tiết yêu cầu");
    }
  };

  // Cập nhật nếu initialProjects thay đổi
  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  // Fetch tự động khi component mount hoặc statusFilter thay đổi
  useEffect(() => {
    if (autoFetch) {
      fetchFundingRequests();
    }
  }, [autoFetch, statusFilter]);

  if (loading && projects.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mt-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8 mt-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchFundingRequests}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 mt-6">
      <div className="flex justify-between items-center px-4 py-2">
        <h3 className="font-semibold text-gray-800">Danh sách yêu cầu cấp vốn</h3>
        {autoFetch && (
          <button
            onClick={fetchFundingRequests}
            disabled={loading}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
          >
            {loading ? "Đang tải..." : "Làm mới"}
          </button>
        )}
      </div>

      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="px-4 py-3 text-center text-gray-700 font-semibold">Mã</th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Tên dự án</th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Người yêu cầu</th>
            <th className="px-6 py-3 text-right text-gray-700 font-semibold">Số tiền</th>
            <th className="px-6 py-3 text-center text-gray-700 font-semibold">Ngày</th>
            <th className="px-6 py-3 text-center text-gray-700 font-semibold">Xem</th>
            <th className="px-6 py-3 text-center text-gray-700 font-semibold">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                Không có yêu cầu cấp vốn nào
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-center">{project.id}</td>
                <td className="px-6 py-3">{project.name}</td>
                <td className="px-6 py-3">{project.proposer}</td>
                <td className="px-6 py-3 text-right">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  }).format(project.amount)}
                </td>
                <td className="px-6 py-3 text-center">{project.date}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleView(project.id)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Xem
                  </button>
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    {(actionType === "approve" || actionType === "both") && (
                      <button
                        onClick={() => handleApprove(project.id)}
                        disabled={loading}
                        className="px-4 py-1 text-teal-700 bg-sky-100 rounded-xl hover:bg-sky-200 disabled:opacity-50 w-20"
                      >
                        Duyệt
                      </button>
                    )}
                    {(actionType === "reject" || actionType === "both") && (
                      <button
                        onClick={() => handleReject(project.id)}
                        disabled={loading}
                        className="px-4 py-1 text-red-700 bg-rose-100 rounded-xl hover:bg-rose-200 disabled:opacity-50 w-24"
                      >
                        Từ chối
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
