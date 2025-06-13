import React, { useState } from "react";
import { ProjectList } from "@cnpm/components/Duyet Du An/ProjectList";

export interface Project {
  id: string;
  name: string;
  proposer: string;
  date: string;
}

type TabType = "pending" | "approved" | "rejected";

const pendingProjects: Project[] = [
  {
    id: "25CN22",
    name: "Bác sĩ online",
    proposer: "Ths Nguyễn Văn Hồng",
    date: "25/05/2025",
  },
  {
    id: "25NN23",
    name: "Ngữ pháp thời Edo",
    proposer: "Ths Nguyễn Văn Minh",
    date: "26/05/2025",
  },
  {
    id: "25CN24",
    name: "Dự án 1",
    proposer: "Ths Nguyễn Văn A",
    date: "27/05/2025",
  },
];

const approvedProjects: Project[] = [
  {
    id: "25CN22",
    name: "Bác sĩ online",
    proposer: "Ths Nguyễn Văn Hồng",
    date: "25/05/2025",
  },
  {
    id: "25NN23",
    name: "Ngữ pháp thời Edo",
    proposer: "Ths Nguyễn Văn Minh",
    date: "26/05/2025",
  },
];

const rejectedProjects: Project[] = [
  {
    id: "25CN24",
    name: "Dự án 1",
    proposer: "Ths Nguyễn Văn A",
    date: "27/05/2025",
  },
];

export const TabSelector = () => {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [searchKeyword, setSearchKeyword] = useState("");

  let projects: Project[] = [];
  if (activeTab === "pending") projects = pendingProjects;
  if (activeTab === "approved") projects = approvedProjects;
  if (activeTab === "rejected") projects = rejectedProjects;

  // Filter projects based on search keyword
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.proposer.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleApprove = (id: string) => {
    // TODO: Implement approve logic
    console.log("Approve project:", id);
  };

  const handleReject = (id: string) => {
    // TODO: Implement reject logic
    console.log("Reject project:", id);
  };

  const handleView = (id: string) => {
    // TODO: Implement view details logic
    console.log("View project:", id);
  };

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
        <h2 className="text-xl font-bold text-gray-700">
          Danh sách dự án
        </h2>
      </div>
      <ProjectList 
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