import React, { useState, useEffect, Suspense, lazy } from "react";
import { 
  getFundingRequests, 
  approveFundingRequest, 
  rejectFundingRequest,
  getFundingRequestById 
} from "@cnpm/services/fundingService";

// Lazy load the SponsorshipListItem component
const SponsorshipListItem = lazy(() => import("./SponsorshipListItem"));

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
  const [retryCount, setRetryCount] = useState(0);

  // Fetch danh sách yêu cầu cấp vốn với retry logic
  const fetchFundingRequests = async () => {
    if (!autoFetch) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await getFundingRequests();
      const mappedData: Sponsorship[] = response.data?.map((item: any) => ({
        id: item.id.toString(),
        name: item.title || item.projectTitle || item.name || '',
        proposer: item.requestedByName || item.proposer || '',
        date: new Date(item.createdAt || item.date).toLocaleDateString('vi-VN'),
        amount: item.amount || 0
      })) || [];
      
      setProjects(mappedData);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error fetching funding requests:', err);
      if (retryCount < 3) { // Maximum 3 retries
        setRetryCount(prev => prev + 1);
        setTimeout(fetchFundingRequests, 2000 * (retryCount + 1)); // Exponential backoff
      } else {
        setError('Không thể tải danh sách yêu cầu cấp vốn. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xem chi tiết
  const handleView = async (id: string) => {
    if (onView) {
      onView(id);
      return;
    }

    try {
      const detail = await getFundingRequestById(Number(id));
      console.log('Funding request detail:', detail);
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

  // Fetch data khi component mount
  useEffect(() => {
    if (autoFetch) {
      fetchFundingRequests();
    }
  }, [autoFetch]);

  // Loading component
  const LoadingSpinner = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mt-6 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
    </div>
  );

  // Error component
  const ErrorDisplay = () => (
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

  if (loading && projects.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
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
            {loading ? 'Đang tải...' : 'Làm mới'}
          </button>
        )}
      </div>

      <Suspense fallback={<LoadingSpinner />}>
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
              <Suspense key={project.id} fallback={<tr><td colSpan={7}><LoadingSpinner /></td></tr>}>
                <SponsorshipListItem
                  {...project}
                  onView={handleView}
                  onApprove={onApprove}
                  onReject={onReject}
                  actionType={actionType}
                />
              </Suspense>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
};