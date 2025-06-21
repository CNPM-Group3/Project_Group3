import React, { useState } from "react";
import { Sponsorship, SponsorshipList } from "@cnpm/components/Duyet Tai Tro/SponsorshipList";

const pendingSponsorships: Sponsorship[] = [
  {
    id: "REQ001",
    name: "Đăng ký đề tài",
    proposer: "Nguyễn Văn A",
    date: "12/05/2025",
    amount: 0,
  },
  {
    id: "REQ002",
    name: "Cập nhật hồ sơ",
    proposer: "Trần Thị B",
    date: "13/05/2025",
    amount: 0,
  },
  {
    id: "25CN22",
    name: "Bác sĩ online",
    proposer: "Nguyễn Văn Hồng",
    date: "25/05/2025",
    amount: 30000000,
  },
];

const SponsorshipTable = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredProjects = pendingSponsorships.filter(project =>
    project.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.proposer.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleApprove = (id: string) => {
    console.log("Approve project:", id);
  };

  const handleReject = (id: string) => {
    console.log("Reject project:", id);
  };

  const handleView = (id: string) => {
    console.log("View project:", id);
  };

  return (
    <div className="w-full max-w-[992px] mx-auto">
      {/* Ô tìm kiếm */}
      <div className="flex flex-row items-center justify-between mt-10 w-full">
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

      {/* Bảng dữ liệu */}
      <SponsorshipList
        projects={filteredProjects}
        actionType="both" // vẫn cho phép duyệt & từ chối
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
      />
    </div>
  );
};

export default SponsorshipTable;
