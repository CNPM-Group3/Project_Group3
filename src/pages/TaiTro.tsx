import React, { useState, useEffect } from "react";
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
      {/* Header */}
      <div className="hidden md:flex items-center text-gray-700 font-semibold text-lg px-3 py-3 border-b-2 border-gray-200 bg-gray-50">
        <div className="min-w-[250px] px-3">Tiêu đề</div>
        <div className="min-w-[120px] px-3">Số Tiền</div>
        <div className="min-w-[200px] px-3">Mục đích</div>
        <div className="min-w-[150px] px-3">Dự án</div>
        <div className="min-w-[150px] px-3">Trạng thái</div>
      </div>

      {/* Rows */}
      <div className="min-h-[400px]">
        {sortedRequests.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-wrap md:flex-nowrap items-center px-3 py-4 ${
              index % 2 === 1 ? "bg-slate-50" : "bg-white"
            } border-b border-gray-100 hover:bg-slate-100 transition-colors`}
          >
            <div className="w-full md:min-w-[250px] text-sm font-medium text-neutral-800 px-3 mb-2 md:mb-0">
              <div className="font-semibold" title={item.title}>
                {item.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                ID: {item.id} • {new Date(item.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
            
            <div className="w-full md:min-w-[120px] text-sm text-neutral-700 px-3 mb-2 md:mb-0">
              <div className="font-semibold text-green-600">
                {formatAmount(item.amount)}
              </div>
            </div>
            
            <div className="w-full md:min-w-[200px] text-sm font-medium text-neutral-800 px-3 mb-2 md:mb-0">
              <div title={item.purpose}>
                {item.purpose.length > 30 ? `${item.purpose.substring(0, 30)}...` : item.purpose}
              </div>
            </div>
            
            <div className="w-full md:min-w-[150px] text-sm text-neutral-700 px-3 mb-2 md:mb-0">
              <div title={item.projectTitle}>
                {item.projectTitle ? (
                  item.projectTitle.length > 20 ? `${item.projectTitle.substring(0, 20)}...` : item.projectTitle
                ) : 'Chưa có dự án'}
              </div>
            </div>
            
            <div className="w-full md:min-w-[150px] px-3">
              <span
                className={`inline-block px-3 py-2 rounded-full text-sm font-medium min-w-[100px] text-center ${getStatusColor(
                  item.status
                )}`}
              >
                {getStatusText(item.status)}
              </span>
              {item.approvedAt && (
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {new Date(item.approvedAt).toLocaleDateString('vi-VN')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

function TaiTroThanhVienNghienCuu() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [fundingRequests, setFundingRequests] = useState<FundingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

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

return (
  <main className="bg-slate-50 min-h-screen w-full">
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-[18%] border-r border-slate-200 bg-gray-50">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="w-[110%] flex flex-col">
        <Header />

        <div className="flex-1 px-6 py-8">
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

            <div className="flex justify-between items-center mb-6">
              <SearchInput />
              <button
                onClick={() => navigate("/phieuyeucautaitro")}
                className="flex items-center gap-2 px-5 py-3 text-base font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
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
                  <h2 className="text-xl font-bold text-gray-700">
                    Danh sách yêu cầu tài trợ
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Tổng cộng {fundingRequests.length} yêu cầu
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
                fundingRequests={fundingRequests}
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