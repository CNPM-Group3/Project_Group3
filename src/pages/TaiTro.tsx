import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { SearchInput } from "@cnpm/components/Tai Tro/SearchInput";
import { getFundingRequestsByRequester } from "@cnpm/services/fundingService";
import { authService } from "@cnpm/services/authService";

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
          <tr className="bg-white border-b-2 border-gray-300 text-gray-700 font-semibold text-lg">
            <th className="min-w-[250px] px-3 py-3">Tiêu đề</th>
            <th className="min-w-[120px] px-3 py-3">Số Tiền</th>
            <th className="min-w-[200px] px-3 py-3">Mục đích</th>
            <th className="min-w-[150px] px-3 py-3">Dự án</th>
            <th className="min-w-[150px] px-3 py-3">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {sortedRequests.map((item, index) => (
            <tr key={item.id} className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}>
              <td className="align-middle px-3 py-4">
                <div className="font-semibold" title={item.title}>{item.projectTitle}</div>
                <div className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('vi-VN')}</div>
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
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Lọc danh sách yêu cầu tài trợ dựa trên từ khóa tìm kiếm
  const filteredFundingRequests = useMemo(() => {
    if (!searchTerm.trim()) {
      return fundingRequests;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    return fundingRequests.filter((request) => {
      return (
        request.title.toLowerCase().includes(searchLower) ||
        request.purpose.toLowerCase().includes(searchLower) ||
        (request.projectTitle && request.projectTitle.toLowerCase().includes(searchLower)) ||
        request.description.toLowerCase().includes(searchLower) ||
        request.id.toString().includes(searchLower)
      );
    });
  }, [fundingRequests, searchTerm]);

  const fetchFundingRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Kiểm tra authentication trước
      if (!authService.isAuthenticated()) {
        setError("Bạn chưa đăng nhập. Vui lòng đăng nhập để xem danh sách yêu cầu.");
        return;
      }

      // Thử lấy user profile trước
      let userId = authService.getUserID();
      
      // Nếu không lấy được từ token, thử lấy từ profile
      if (!userId) {
        try {
          const profile = authService.getCurrentProfile();
          if (profile && profile.id) {
            userId = profile.id;
          } else {
            // Thử fetch profile mới
            await authService.fetchAndStoreUserProfile();
            const newProfile = authService.getCurrentProfile();
            userId = newProfile?.id || null;
          }
        } catch (profileError) {
          console.error("Error getting profile:", profileError);
        }
      }
      
      if (!userId) {
        setError("Không thể xác định thông tin người dùng. Vui lòng đăng nhập lại.");
        return;
      }

      console.log("Fetching funding requests for user ID:", userId);

      // Gọi API để lấy danh sách yêu cầu tài trợ theo người dùng
      const response = await getFundingRequestsByRequester(userId);
      
      console.log("API Response:", response);
      
      if (response && Array.isArray(response)) {
        setFundingRequests(response);
      } else if (response && response.data && Array.isArray(response.data)) {
        setFundingRequests(response.data);
      } else {
        setFundingRequests([]);
      }
    } catch (err: any) {
      console.error("Error fetching funding requests:", err);
      
      // Xử lý các loại lỗi cụ thể
      if (err.response && err.response.status === 401) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      } else if (err.response && err.response.status === 404) {
        setError("Không tìm thấy dữ liệu. Có thể bạn chưa có yêu cầu tài trợ nào.");
        setFundingRequests([]);
      } else {
        setError(err.message || "Có lỗi xảy ra khi tải danh sách yêu cầu");
      }
      
      setFundingRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundingRequests();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    // Cập nhật trạng thái local trước
    setFundingRequests(prev =>
      prev.map(request =>
        request.id === id ? { ...request, status } : request
      )
    );

    // Có thể thêm API call để cập nhật trạng thái trên server
    try {
      // await updateFundingRequestStatus(id, status);
      console.log(`Updated status for request ${id} to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
      // Revert lại trạng thái nếu có lỗi
      fetchFundingRequests();
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <main className="bg-white min-h-screen w-full border border-gray-200">
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
          <Sidebar />
        </aside>
        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
            <Header />
          </div>
          <div className="flex-1 px-6 py-8 mt-16">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
                Yêu cầu tài trợ
              </h1>

              {error && (
                <div className="mb-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-red-800">
                        <strong>Lỗi:</strong> {error}
                      </div>
                      <button
                        onClick={fetchFundingRequests}
                        className="text-red-600 hover:text-red-800 underline font-medium"
                      >
                        Thử lại
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm "
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full sm:w-80 px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    {searchTerm && (
                      <button
                        onClick={handleClearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {searchTerm && (
                    <div className="mt-2 text-sm text-gray-600">
                      Tìm thấy {filteredFundingRequests.length} kết quả cho "{searchTerm}"
                    </div>
                  )}
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

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-300">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-700">
                      Danh sách yêu cầu tài trợ
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {searchTerm 
                        ? `Hiển thị ${filteredFundingRequests.length} / ${fundingRequests.length} yêu cầu`
                        : `Tổng cộng ${fundingRequests.length} yêu cầu`
                      }
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