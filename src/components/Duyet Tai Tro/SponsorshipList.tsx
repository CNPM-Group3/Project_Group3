import React, { useState, useEffect } from "react";
import { 
  getFundingRequests, 
  approveFundingRequest, 
  rejectFundingRequest,
  getFundingRequestById 
} from "@cnpm/services/fundingService";

export interface Sponsorship {
  id: string;
  name: string;
  proposer: string;
  date: string;
  amount: number;
}

interface SponsorshipListProps {
  projects?: Sponsorship[]; // Làm cho projects optional
  actionType?: "approve" | "reject" | "both";
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
  autoFetch?: boolean; // Tự động fetch data hay không
}

export const SponsorshipList: React.FC<SponsorshipListProps> = ({
  projects: initialProjects,
  actionType = "both",
  onApprove,
  onReject,
  onView,
  autoFetch = true
}) => {
  const [projects, setProjects] = useState<Sponsorship[]>(initialProjects || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch danh sách yêu cầu cấp vốn
  const fetchFundingRequests = async () => {
    if (!autoFetch) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await getFundingRequests();
      // Giả sử API trả về dữ liệu có cấu trúc khác, bạn cần map về đúng interface
      const mappedData: Sponsorship[] = response.data?.map((item: any) => ({
        id: item.id.toString(),
        name: item.title || item.projectTitle || item.name || '',
        proposer: item.requestedByName || item.proposer || '',
        date: new Date(item.createdAt || item.date).toLocaleDateString('vi-VN'),
        amount: item.amount || 0
      })) || [];
      
      setProjects(mappedData);
    } catch (err) {
      setError('Không thể tải danh sách yêu cầu cấp vốn');
      console.error('Error fetching funding requests:', err);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý duyệt yêu cầu
  const handleApprove = async (id: string) => {
    if (onApprove) {
      // Nếu có custom handler từ parent, sử dụng nó
      onApprove(id);
      return;
    }

    // Fallback logic nếu không có custom handler
    try {
      setLoading(true);
      await approveFundingRequest(Number(id));
      
      // Cập nhật lại danh sách sau khi duyệt thành công
      await fetchFundingRequests();
      
      alert('Duyệt yêu cầu thành công!');
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Có lỗi xảy ra khi duyệt yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý từ chối yêu cầu
  const handleReject = async (id: string) => {
    if (onReject) {
      // Nếu có custom handler từ parent, sử dụng nó
      onReject(id);
      return;
    }

    // Fallback logic nếu không có custom handler
    try {
      setLoading(true);
      await rejectFundingRequest(Number(id));
      
      // Cập nhật lại danh sách sau khi từ chối thành công
      await fetchFundingRequests();
      
      alert('Từ chối yêu cầu thành công!');
    } catch (err) {
      console.error('Error rejecting request:', err);
      alert('Có lỗi xảy ra khi từ chối yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xem chi tiết
  const handleView = async (id: string) => {
    if (onView) {
      // Nếu có custom handler từ parent, sử dụng nó
      onView(id);
      return;
    }

    // Fallback logic nếu không có custom handler
    try {
      const detail = await getFundingRequestById(Number(id));
      console.log('Funding request detail:', detail);
      // Bạn có thể mở modal hoặc navigate đến trang chi tiết
      alert(`Chi tiết yêu cầu ID: ${id}\n${JSON.stringify(detail, null, 2)}`);
    } catch (err) {
      console.error('Error fetching request detail:', err);
      alert('Không thể tải chi tiết yêu cầu');
    }
  };

  // Cập nhật projects khi initialProjects thay đổi
  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  // Fetch data khi component mount (chỉ khi autoFetch = true)
  useEffect(() => {
    if (autoFetch) {
      fetchFundingRequests();
    }
  }, [autoFetch]);

  // Hiển thị loading
  if (loading && projects.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mt-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Hiển thị lỗi
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
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <h3 className="font-semibold text-gray-800">Danh sách yêu cầu cấp vốn</h3>
        {autoFetch && (
          <button
            onClick={fetchFundingRequests}
            disabled={loading}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
          >
            {loading ? 'Đang tải...' : 'Làm mới'}
          </button>
        )}
      </div>

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
          {projects.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                Không có yêu cầu cấp vốn nào
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id} className="bg-white hover:bg-gray-50 transition border-b border-gray-200 last:border-b-0">
                <td className="px-4 py-3 text-center align-middle">{project.id}</td>
                <td className="px-6 py-3 text-left align-middle">{project.name}</td>
                <td className="px-6 py-3 text-left align-middle">{project.proposer}</td>
                <td className="px-6 py-3 text-right align-middle">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(project.amount)}
                </td>
                <td className="px-6 py-3 text-center align-middle">{project.date}</td>
                <td className="px-6 py-3 text-center align-middle">
                  <button 
                    className="text-blue-600 underline hover:text-blue-800" 
                    onClick={() => handleView(project.id)}
                  >
                    Xem
                  </button>
                </td>
                <td className="px-6 py-3 text-center align-middle">
                  <div className="flex flex-row items-center justify-center gap-2">
                    {(actionType === "approve" || actionType === "both") && (
                      <button
                        className="px-4 py-1 text-teal-700 bg-sky-100 rounded-xl min-h-[21px] w-20 hover:bg-sky-200 disabled:opacity-50"
                        onClick={() => handleApprove(project.id)}
                        disabled={loading}
                      >
                        Duyệt
                      </button>
                    )}
                    {(actionType === "reject" || actionType === "both") && (
                      <button
                        className="px-4 py-1 text-red-700 bg-rose-100 rounded-xl min-h-[21px] w-24 whitespace-nowrap hover:bg-rose-200 disabled:opacity-50"
                        onClick={() => handleReject(project.id)}
                        disabled={loading}
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