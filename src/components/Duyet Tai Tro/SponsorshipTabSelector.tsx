import React, { useState, useEffect } from "react";
import { Sponsorship, SponsorshipList } from "@cnpm/components/Duyet Tai Tro/SponsorshipList";
import { getFundingRequestsByStatus, approveFundingRequest, rejectFundingRequest } from "@cnpm/services/FundingService";

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
  const [pendingRequests, setPendingRequests] = useState<Sponsorship[]>([]);
  const [approvedRequests, setApprovedRequests] = useState<Sponsorship[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<Sponsorship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async (status: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await getFundingRequestsByStatus(status);
      // Map FundingRequest to Sponsorship type if needed
      const mappedData: Sponsorship[] = fetchedData.map((req: any) => ({
        id: req.id.toString(),
        name: req.projectTitle,
        proposer: req.requestedByName,
        date: new Date(req.createdAt).toLocaleDateString('vi-VN'),
        amount: req.amount,
      }));

      if (status === "Pending") {
        setPendingRequests(mappedData);
      } else if (status === "Approved") {
        setApprovedRequests(mappedData);
      } else if (status === "Rejected") {
        setRejectedRequests(mappedData);
      }
    } catch (err) {
      console.error(`Error fetching ${status} requests:`, err);
      setError(`Không thể tải danh sách yêu cầu ${status === "Pending" ? "chờ duyệt" : status === "Approved" ? "đã duyệt" : "đã từ chối"}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "pending") {
      fetchRequests("Pending");
    } else if (activeTab === "approved") {
      fetchRequests("Approved");
    } else if (activeTab === "rejected") {
      fetchRequests("Rejected");
    }
  }, [activeTab]);

  let projects: Sponsorship[] = [];
  if (activeTab === "pending") projects = pendingRequests;
  if (activeTab === "approved") projects = approvedRequests;
  if (activeTab === "rejected") projects = rejectedRequests;

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
      await approveFundingRequest(parseInt(id));
      alert("Duyệt yêu cầu thành công!");
      fetchRequests("Pending"); // Refresh pending list
      fetchRequests("Approved"); // Refresh approved list
    } catch (err) {
      console.error("Error approving request:", err);
      alert("Không thể duyệt yêu cầu. Vui lòng thử lại.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectFundingRequest(parseInt(id));
      alert("Từ chối yêu cầu thành công!");
      fetchRequests("Pending"); // Refresh pending list
      fetchRequests("Rejected"); // Refresh rejected list
    } catch (err) {
      console.error("Error rejecting request:", err);
      alert("Không thể từ chối yêu cầu. Vui lòng thử lại.");
    }
  };

  const handleView = (id: string) => {
    // TODO: Implement view details logic (e.g., navigate to detail page)
    console.log("View project:", id);
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="w-full max-w-[992px] mx-auto">
      <div className="flex flex-wrap gap-1 items-center justify-center px-1 py-1 mt-10 text-sm font-bold text-teal-500 bg-gray-50 rounded-lg max-md:max-w-full">
        <button 
          onClick={() => handleTabClick("pending")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "pending" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100"
          }`}
        >
          Chờ duyệt
        </button>
        <button 
          onClick={() => handleTabClick("approved")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "approved" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100"
          }`}
        >
          Đã duyệt
        </button>
        <button 
          onClick={() => handleTabClick("rejected")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "rejected" 
              ? "text-white bg-teal-500" 
              : "bg-teal-100"
          }`}
        >
          Từ chối
        </button>
      </div>
      <div className="flex flex-row items-center justify-between mt-4 w-full">
        <div className="flex items-center w-[250px] bg-white border border-gray-300 rounded-full px-3 py-1.5 shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base text-gray-700 placeholder-gray-400"
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
      </div>
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
      />
    </div>
  );
};