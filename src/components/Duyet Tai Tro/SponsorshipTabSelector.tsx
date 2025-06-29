import React, { useState, useEffect } from "react";
import { SponsorshipList, Sponsorship } from "@cnpm/components/Duyet Tai Tro/SponsorshipList";
import { 
  getFundingRequestsByStatus, 
  approveFundingRequest, 
  rejectFundingRequest,
  getFundingRequestById 
} from "@cnpm/services/fundingService";

export interface Project {
  id: string;
  name: string;
  proposer: string;
  date: string;
}

type TabType = "Pending" | "Approved" | "Rejected";

export const TabSelector = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Pending");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pendingSponsorships, setPendingSponsorships] = useState<Sponsorship[]>([]);
  const [approvedSponsorships, setApprovedSponsorships] = useState<Sponsorship[]>([]);
  const [deniedSponsorships, setDeniedSponsorships] = useState<Sponsorship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mapping API data to Sponsorship interface
  const mapApiDataToSponsorship = (apiData: any[]): Sponsorship[] => {
    if (!Array.isArray(apiData)) {
      console.warn('API data is not an array:', apiData);
      return [];
    }
    
    return apiData.map((item: any) => ({
      id: item.id?.toString() || '',
      name: item.title || item.projectTitle || item.name || 'Không có tên',
      proposer: item.requestedByName || item.proposer || item.requesterName || 'Không rõ',
      date: item.createdAt 
        ? new Date(item.createdAt).toLocaleDateString('vi-VN') 
        : new Date().toLocaleDateString('vi-VN'),
      amount: item.amount || 0,
      status: item.status || 'pending'
    }));
  };

  // Fetch data by status
  const fetchDataByStatus = async (status: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching data for status: ${status}`);
      const response = await getFundingRequestsByStatus(status);
      
      // Kiểm tra cấu trúc response
      let dataArray = [];
      if (response && response.data) {
        dataArray = Array.isArray(response.data) ? response.data : [response.data];
      } else if (Array.isArray(response)) {
        dataArray = response;
      } else {
        console.warn('Unexpected response structure:', response);
        dataArray = [];
      }
      
      const mappedData = mapApiDataToSponsorship(dataArray);
      
      switch (status) {
        case 'Pending':
          setPendingSponsorships(mappedData);
          break;
        case 'Approved':
          setApprovedSponsorships(mappedData);
          break;
        case 'Rejected':
          setDeniedSponsorships(mappedData);
          break;
        default:
          console.warn(`Unknown status: ${status}`);
      }

    } catch (err: any) {
      const errorMessage = `Không thể tải danh sách ${status}: ${err.message || 'Lỗi không xác định'}`;
      setError(errorMessage);
      console.error(`Error fetching ${status} requests:`, err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch theo thứ tự để tránh race condition
      await fetchDataByStatus('Pending');
      await fetchDataByStatus('Approved');
      await fetchDataByStatus('Rejected');
    } catch (err) {
      console.error('Error fetching all data:', err);
      setError('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAllData();
  }, []);

  // Get current projects based on active tab
  let projects: Sponsorship[] = [];
  switch (activeTab) {
    case "Pending":
      projects = pendingSponsorships;
      break;
    case "Approved":
      projects = approvedSponsorships;
      break;
    case "Rejected":
      projects = deniedSponsorships;
      break;
    default:
      projects = [];
  }

  // Filter projects based on search keyword
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.proposer.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setSearchKeyword(""); // Clear search when switching tabs
  };

  const handleApprove = async (id: string) => {
    if (!id) {
      alert('ID không hợp lệ');
      return;
    }

    try {
      setLoading(true);
      await approveFundingRequest(Number(id));
      
      // Fetch updated data for all tabs
      await fetchAllData();
      
      alert('Duyệt yêu cầu thành công!');
    } catch (err: any) {
      console.error('Error approving request:', err);
      alert(`Có lỗi xảy ra khi duyệt yêu cầu: ${err.message || 'Lỗi không xác định'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!id) {
      alert('ID không hợp lệ');
      return;
    }

    try {
      setLoading(true);
      await rejectFundingRequest(Number(id),'Không phù hợp tiêu chí tài trợ');
      
      // Fetch updated data for all tabs
      await fetchAllData();
      
      alert('Từ chối yêu cầu thành công!');
    } catch (err: any) {
      console.error('Error rejecting request:', err);
      alert(`Có lỗi xảy ra khi từ chối yêu cầu: ${err.message || 'Lỗi không xác định'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: string) => {
    if (!id) {
      alert('ID không hợp lệ');
      return;
    }

    try {
      setLoading(true);
      const detail = await getFundingRequestById(Number(id));
      console.log('Funding request detail:', detail);
      
      // Kiểm tra cấu trúc response
      const detailData = detail?.data || detail;
      
      alert(`Chi tiết yêu cầu ID: ${id}\nTên: ${detailData?.title || 'Không có'}\nMô tả: ${detailData?.description || 'Không có'}\nSố tiền: ${detailData?.amount || 0} VND`);
    } catch (err: any) {
      console.error('Error fetching request detail:', err);
      alert(`Không thể tải chi tiết yêu cầu: ${err.message || 'Lỗi không xác định'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchKeyword("");
    fetchAllData();
  };

  return (
    <div className="w-full max-w-[992px] mx-auto">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Đang xử lý...</p>
          </div>
        </div>
      )}

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-1 items-center justify-center px-1 py-1 mt-10 text-sm font-bold text-teal-500 bg-white rounded-lg max-md:max-w-full">
        <button 
          onClick={() => handleTabClick("Pending")}
          disabled={loading}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[300px] max-md:px-5 transition-colors ${
            activeTab === "Pending" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100 hover:bg-teal-200"
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Chờ duyệt ({pendingSponsorships.length})
        </button>
        <button 
          onClick={() => handleTabClick("Approved")}
          disabled={loading}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[300px] max-md:px-5 transition-colors ${
            activeTab === "Approved" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100 hover:bg-teal-200"
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Đã duyệt ({approvedSponsorships.length})
        </button>
        <button 
          onClick={() => handleTabClick("Rejected")}
          disabled={loading}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[300px] max-md:px-5 transition-colors ${
            activeTab === "Rejected" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100 hover:bg-teal-200"
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Từ chối ({deniedSponsorships.length})
        </button>
      </div>

      {/* Search and refresh */}
      <div className="flex flex-row items-center justify-between mt-4 w-full">
        <div className="flex items-center w-[250px] bg-white border border-gray-300 rounded-full px-3 py-1.5 shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, ID, người đề xuất..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base text-gray-700 placeholder-gray-400"
            disabled={loading}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Đang tải...' : 'Làm mới'}
        </button>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Data summary */}
      <div className="mt-4 text-sm text-gray-600">
        Hiển thị {filteredProjects.length} / {projects.length} yêu cầu
        {searchKeyword && ` (tìm kiếm: "${searchKeyword}")`}
      </div>

      {/* Sponsorship list */}
      <SponsorshipList 
        projects={filteredProjects} 
        actionType={
          activeTab === "Pending" ? "both" :
          activeTab === "Approved" ? "reject" :
          "approve"
        }
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
        autoFetch={false} // Tắt auto fetch vì đã fetch ở component cha
      />
    </div>
  );
};