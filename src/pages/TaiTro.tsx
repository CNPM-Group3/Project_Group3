import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";

interface FundingRequest {
  id: number;
  title: string;
  description: string;
  amount: number;
  status: string;
  purpose: string;
  justificationDocumentUrl: string;
  projectId: number;
  projectTitle: string;
  requestedById: number;
  requestedByName: string;
  approvedById: number | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const SponsorshipTable: React.FC<{
  sortOrder: "asc" | "desc";
  fundingRequests: FundingRequest[];
  loading: boolean;
  onStatusChange: (id: number, status: string) => void;
}> = ({ sortOrder, fundingRequests, loading, onStatusChange }) => {
  const [sortedRequests, setSortedRequests] = useState<FundingRequest[]>([]);

  useEffect(() => {
    const sorted = [...fundingRequests].sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setSortedRequests(sorted);
  }, [fundingRequests, sortOrder]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'duyệt':
        return "bg-green-100 text-green-800";
      case 'pending':
      case 'đang duyệt':
        return "bg-yellow-100 text-yellow-800";
      case 'rejected':
      case 'huỷ bỏ':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'Đã duyệt';
      case 'pending':
        return 'Đang duyệt';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <section className="w-full max-w-[1200px] mx-auto">
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </section>
    );
  }

  if (sortedRequests.length === 0) {
    return (
      <section className="w-full max-w-[1200px] mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Chưa có yêu cầu tài trợ nào</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mx-auto overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200 text-gray-700 font-semibold text-lg">
            <th className="min-w-[250px] px-3 py-3">Tiêu đề</th>
            <th className="min-w-[120px] px-3 py-3">Số Tiền</th>
            <th className="min-w-[200px] px-3 py-3">Mục đích</th>
            <th className="min-w-[150px] px-3 py-3">Dự án</th>
            <th className="min-w-[150px] px-3 py-3">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {sortedRequests.map((item, index) => (
            <tr key={item.id} className={index % 2 === 1 ? "bg-slate-50" : "bg-white"}>
              <td className="align-middle px-3 py-4">
                <div className="font-semibold" title={item.title}>{item.title}</div>
                <div className="text-xs text-gray-500">ID: {item.id} • {new Date(item.createdAt).toLocaleDateString('vi-VN')}</div>
              </td>
              <td className="align-middle px-3 py-4">
                <span className="font-semibold text-green-600">{formatAmount(item.amount)}</span>
              </td>
              <td className="align-middle px-3 py-4">
                <span title={item.purpose}>{item.purpose.length > 30 ? `${item.purpose.substring(0, 30)}...` : item.purpose}</span>
              </td>
              <td className="align-middle px-3 py-4">
                <span title={item.projectTitle}>
                  {item.projectTitle ? (
                    item.projectTitle.length > 20 ? `${item.projectTitle.substring(0, 20)}...` : item.projectTitle
                  ) : 'Chưa có dự án'}
                </span>
              </td>
              <td className="align-middle px-3 py-4">
                <span className={`inline-block px-3 py-2 rounded-full text-sm font-medium min-w-[100px] text-center ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
                {item.approvedAt && (
                  <div className="text-xs text-gray-500 text-center">
                    {new Date(item.approvedAt).toLocaleDateString('vi-VN')}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

function TaiTroThanhVienNghienCuu() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [fundingRequests, setFundingRequests] = useState<FundingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const mockFundingRequests: FundingRequest[] = [
    {
      id: 1,
      title: "Hội thảo AI",
      description: "Hội thảo về trí tuệ nhân tạo",
      amount: 10000000,
      status: "approved",
      purpose: "Tổ chức hội thảo",
      justificationDocumentUrl: "",
      projectId: 101,
      projectTitle: "Dự án AI",
      requestedById: 10,
      requestedByName: "Nguyễn Văn A",
      approvedById: 20,
      approvedAt: null,
      createdAt: "2025-06-15T00:00:00Z",
      updatedAt: "2025-06-20T00:00:00Z"
    },
    {
      id: 2,
      title: "Thiết bị IoT",
      description: "Mua thiết bị đo nhiệt độ",
      amount: 20000000,
      status: "pending",
      purpose: "Thí nghiệm cảm biến",
      justificationDocumentUrl: "",
      projectId: 102,
      projectTitle: "Dự án IoT",
      requestedById: 10,
      requestedByName: "Nguyễn Văn A",
      approvedById: null,
      approvedAt: null,
      createdAt: "2025-06-18T00:00:00Z",
      updatedAt: "2025-06-18T00:00:00Z"
    }
  ];

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredFundingRequests = useMemo(() => {
    if (!searchTerm.trim()) return fundingRequests;
    const search = searchTerm.toLowerCase().trim();
    return fundingRequests.filter(r =>
      r.title.toLowerCase().includes(search) ||
      r.purpose.toLowerCase().includes(search) ||
      r.description.toLowerCase().includes(search) ||
      (r.projectTitle && r.projectTitle.toLowerCase().includes(search)) ||
      r.id.toString().includes(search)
    );
  }, [fundingRequests, searchTerm]);

  useEffect(() => {
    // Load mock data
    setFundingRequests(mockFundingRequests);
    setLoading(false);
  }, []);

  const handleStatusChange = (id: number, status: string) => {
    setFundingRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status } : r)
    );
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        <div className="w-[18%] border-r border-slate-200 bg-gray-50">
          <Sidebar />
        </div>
        <div className="w-[110%] flex flex-col">
          <Header />
          <div className="flex-1 px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
                Yêu cầu tài trợ
              </h1>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-80 px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    {searchTerm && (
                      <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => navigate("/phieuyeucautaitro")}
                  className="flex items-center gap-2 px-5 py-3 text-base font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap"
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c624f3d174d140f745af36e9fec2135c9d3ae8fb"
                    className="w-5 h-5"
                    alt="Icon thêm yêu cầu"
                  />
                  <span>Tạo yêu cầu</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-700">Danh sách yêu cầu tài trợ</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {searchTerm
                        ? `Hiển thị ${filteredFundingRequests.length} / ${fundingRequests.length} yêu cầu`
                        : `Tổng cộng ${fundingRequests.length} yêu cầu`}
                    </p>
                  </div>
                  <button
                    onClick={toggleSortOrder}
                    className="px-4 py-2 bg-cyan-50 border rounded-full hover:bg-cyan-100 transition-colors"
                  >
                    <span className="text-sm text-gray-500">
                      Sắp xếp {sortOrder === "asc" ? "A → Z" : "Z → A"}
                    </span>
                  </button>
                </div>

                <SponsorshipTable
                  sortOrder={sortOrder}
                  fundingRequests={filteredFundingRequests}
                  loading={loading}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TaiTroThanhVienNghienCuu;
