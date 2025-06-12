"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";

import { getAllUsers, ApiUser } from "@cnpm/services/userService";
import { UserPerformanceChart, UserInteractionChart, TimeFilter, RoleFilter } from "@cnpm/components/QuanTriVien/QuanTriVien2/QuanTriVien2Component";

const DashboardQuanTriVien2: React.FC = () => {
  const [users, setUsers] = React.useState<ApiUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string | null>('Tháng này');
  const [selectedRole, setSelectedRole] = React.useState<string | null>('Tất cả');

  const timeRanges = ['Ngày', 'Tuần', 'Tháng này', 'Năm'];
  const roles = ['Tất cả', 'Sinh viên', 'Giảng viên', 'Quản trị viên', 'Nhân viên'];

  const handleTimeRangeSelect = (range: string) => {
    setSelectedTimeRange(range);
  };

  const handleRoleSelect = (role: string | null) => {
    setSelectedRole(role);
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem('accessToken');
        if (!token) {
          setError('Vui lòng đăng nhập.');
          setLoading(false);
          return;
        }

        const data = await getAllUsers();
        setUsers(data);
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError('Không thể tải. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="flex min-h-screen w-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <Sidebar />
        </aside>

        {/* Main content */}
        <section className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-6 overflow-y-auto">
            {error && (
              <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            {!loading && !error ? (
              <>
            {/* Charts */}
            <div className="flex gap-6 flex-wrap mb-6">
              <div className="w-full md:w-1/2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/488d89fe7b2e7cd40a8ee8152b3048ee84cd22ed?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
                  alt="Statistics"
                  className="w-full rounded-xl shadow-md aspect-[1.6] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                    <UserPerformanceChart users={users} />
              </div>
            </div>

            {/* Interaction chart */}
            <div className="mb-6">
                  <UserInteractionChart users={users} />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6">
                  <TimeFilter
                    timeRanges={timeRanges}
                    selectedTimeRange={selectedTimeRange}
                    onSelectTimeRange={handleTimeRangeSelect}
                  />
                  <RoleFilter
                    roles={roles}
                    selectedRole={selectedRole}
                    onSelectRole={handleRoleSelect}
                  />
            </div>
              </>
            ) : null}
          </main>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardQuanTriVien2;