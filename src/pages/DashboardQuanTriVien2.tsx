"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";

import { getAllUsers, ApiUser } from "@cnpm/services/userService";
import { UserPerformanceChart, UserInteractionChart, TimeFilter, RoleFilter, UserActivityLineChart } from "@cnpm/components/QuanTriVien/QuanTriVien2/QuanTriVien2Component";

const DashboardQuanTriVien2: React.FC = () => {
  const [users, setUsers] = React.useState<ApiUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string | null>('Tháng này');
  const [selectedRole, setSelectedRole] = React.useState<string | null>('Tất cả');

  const availableTimeRanges: string[] = ["Hôm nay", "7 ngày", "30 ngày"];
  const availableRoles: string[] = ['Tất cả', 'Sinh viên', 'Giảng viên', 'Quản trị viên', 'Nhân viên'];

  const [filteredUsers, setFilteredUsers] = React.useState<ApiUser[]>([]);

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

  React.useEffect(() => {
    let filtered = users;

    // Lọc theo vai trò
    if (selectedRole && selectedRole !== 'Tất cả') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    // Lọc theo thời gian nếu có trường createdAt
    if (selectedTimeRange && filtered.length > 0 && filtered[0].createdAt) {
      const now = new Date();
      let compareDate = new Date();
      if (selectedTimeRange === 'Hôm nay') {
        compareDate.setHours(0,0,0,0);
        filtered = filtered.filter(user => {
          if (!user.createdAt) return true;
          const created = new Date(user.createdAt);
          return created >= compareDate;
        });
      } else if (selectedTimeRange === '7 ngày') {
        compareDate.setDate(now.getDate() - 7);
        filtered = filtered.filter(user => {
          if (!user.createdAt) return true;
          const created = new Date(user.createdAt);
          return created >= compareDate;
        });
      } else if (selectedTimeRange === '30 ngày') {
        compareDate.setDate(now.getDate() - 30);
        filtered = filtered.filter(user => {
          if (!user.createdAt) return true;
          const created = new Date(user.createdAt);
          return created >= compareDate;
        });
      }
    }

    setFilteredUsers(filtered);
  }, [users, selectedRole, selectedTimeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-screen bg-white">
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
          <main className="flex-1 p-6 mt-16 bg-white">
            {!loading && !error ? (
              <>
                {/* Top Row - Two charts side-by-side */}
                <div className="flex flex-wrap gap-6 mb-6">
                  {/* Thống kê người dùng theo vai trò Card (Donut Chart) */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex-1 min-w-[300px]">
                    <UserInteractionChart users={filteredUsers} />
                  </div>

                  {/* Hiệu suất người dùng Card (Pie Chart) */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex-1 min-w-[300px]">
                    <UserPerformanceChart users={filteredUsers} />
                  </div>
                </div>

                {/* Bottom Row - Tương tác người dùng Chart (Line Chart) */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6 w-full">
                  <UserActivityLineChart title="Tương tác người dùng" users={filteredUsers} />
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
        </div>
      </div>
    </div>
  );
};

export default DashboardQuanTriVien2;