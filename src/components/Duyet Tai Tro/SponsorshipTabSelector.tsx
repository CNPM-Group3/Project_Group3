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

type TabType = "pending" | "approved" | "rejected";

export const TabSelector = () => {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pendingSponsorships, setPendingSponsorships] = useState<Sponsorship[]>([]);
  const [approvedSponsorships, setApprovedSponsorships] = useState<Sponsorship[]>([]);
  const [rejectedSponsorships, setRejectedSponsorships] = useState<Sponsorship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mapping API data to Sponsorship interface
  const mapApiDataToSponsorship = (apiData: any[]): Sponsorship[] => {
    return apiData.map((item: any) => ({
      id: item.id.toString(),
      name: item.title || item.projectTitle || '',
      proposer: item.requestedByName || '',
      date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
      amount: item.amount || 0
    }));
  };

  // Fetch data by status
  const fetchDataByStatus = async (status: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFundingRequestsByStatus(status);
      const mappedData = mapApiDataToSponsorship(response.data || []);
      
      switch (status.toLowerCase()) {
        case 'pending':
          setPendingSponsorships(mappedData);
          break;
        case 'approved':
          setApprovedSponsorships(mappedData);
          break;
        case 'rejected':
          setRejectedSponsorships(mappedData);
          break;
      }
    } catch (err) {
      setError(`Không thể tải danh sách ${status}`);
      console.error(`Error fetching ${status} requests:`, err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchDataByStatus('pending'),
        fetchDataByStatus('approved'), 
        fetchDataByStatus('rejected')
      ]);
    } catch (err) {
      console.error('Error fetching all data:', err);
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
  if (activeTab === "pending") projects = pendingSponsorships;
  if (activeTab === "approved") projects = approvedSponsorships;
  if (activeTab === "rejected") projects = rejectedSponsorships;

  // Filter projects based on search keyword
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.proposer.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      await approveFundingRequest(Number(id));
      
      // Fetch updated data for all tabs
      await fetchAllData();
      
      alert('Duyệt yêu cầu thành công!');
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Có lỗi xảy ra khi duyệt yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setLoading(true);
      await rejectFundingRequest(Number(id));
      
      // Fetch updated data for all tabs
      await fetchAllData();
      
      alert('Từ chối yêu cầu thành công!');
    } catch (err) {
      console.error('Error rejecting request:', err);
      alert('Có lỗi xảy ra khi từ chối yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id: string) => {
    try {
      const detail = await getFundingRequestById(Number(id));
      console.log('Funding request detail:', detail);
      // Bạn có thể mở modal hoặc navigate đến trang chi tiết
      alert(`Chi tiết yêu cầu ID: ${id}\nTên: ${detail.data?.title}\nMô tả: ${detail.data?.description}`);
    } catch (err) {
      console.error('Error fetching request detail:', err);
      alert('Không thể tải chi tiết yêu cầu');
    }
  };

  const handleRefresh = () => {
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
      <div className="flex flex-wrap gap-1 items-center justify-center px-1 py-1 mt-10 text-sm font-bold text-teal-500 bg-gray-50 rounded-lg max-md:max-w-full">
        <button 
          onClick={() => handleTabClick("pending")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "pending" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100"
          }`}
        >
          Chờ duyệt ({pendingSponsorships.length})
        </button>
        <button 
          onClick={() => handleTabClick("approved")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "approved" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100"
          }`}
        >
          Đã duyệt ({approvedSponsorships.length})
        </button>
        <button 
          onClick={() => handleTabClick("rejected")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "rejected" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100"
          }`}
        >
          Từ chối ({rejectedSponsorships.length})
        </button>
      </div>

      {/* Search and refresh */}
      <div className="flex flex-row items-center justify-between mt-4 w-full">
        <div className="flex items-center w-[250px] bg-white border border-gray-300 rounded-full px-3 py-1.5 shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm"
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Đang tải...' : 'Làm mới'}
        </button>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}

      {/* Sponsorship list */}
      <SponsorshipList 
        projects={filteredProjects} 
        actionType={
          activeTab === "pending" ? "both" :
          activeTab === "approved" ? "reject" :
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