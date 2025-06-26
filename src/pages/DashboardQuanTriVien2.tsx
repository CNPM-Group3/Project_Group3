"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";

import { getAllUsers, ApiUser } from "@cnpm/services/userService";
import { UserPerformanceChart, UserInteractionChart, TimeFilter, RoleFilter, UserActivityLineChart }from "@cnpm/components/QuanTriVien/QuanTriVien2/QuanTriVien2Component";

const DashboardQuanTriVien2: React.FC = () => {
  const [users, setUsers] = React.useState<ApiUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string | null>('Tháng này');
  const [selectedRole, setSelectedRole] = React.useState<string | null>('Tất cả');

  const availableTimeRanges: string[] = ["Hôm nay", "7 ngày", "30 ngày"];
  const availableRoles: string[] = ['Tất cả', 'Sinh viên', 'Giảng viên', 'Quản trị viên', 'Nhân viên'];

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

        const data = await getAllUsers();
        setUsers(data);
      } catch (err: any) {
        console.error('Error fetching users:', err);
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
        <aside className="w-64 bg-gray-50 border-r border-gray-200 fixed h-full">
          <Sidebar />
        </aside>

        {/* Main content */}
        <section className="flex-1 flex flex-col ml-64">
          <div className="fixed w-full z-10">
            <Header />
          </div>

          <main className="flex-1 p-6 overflow-y-auto mt-16">
            {!loading && !error ? (
              <>
                {/* Top Row - Two charts side-by-side */}
                <div className="flex flex-wrap gap-6 mb-6">
                  {/* Thống kê người dùng theo vai trò Card (Donut Chart) */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex-1 min-w-[300px]">
                    <UserInteractionChart users={users} />
                  </div>

                  {/* Hiệu suất người dùng Card (Pie Chart) */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex-1 min-w-[300px]">
                    <UserPerformanceChart users={users} />
                  </div>
                </div>

                {/* Bottom Row - Tương tác người dùng Chart (Line Chart) */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6 w-full">
                  <UserActivityLineChart title="Tương tác người dùng" users={users} />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-6">
                  <TimeFilter
                    timeRanges={availableTimeRanges}
                    selectedTimeRange={selectedTimeRange}
                    onSelectTimeRange={handleTimeRangeSelect}
                  />
                  <RoleFilter
                    roles={availableRoles}
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