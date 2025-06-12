"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";
import { UserRoleFilter, UserList } from "@cnpm/components/QuanTriVien/QuanTriVien1/UserRoleFilter";
import { getAllUsers, ApiUser } from "@cnpm/services/userService";

export const DashboardLayout = () => {
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const [users, setUsers] = React.useState<ApiUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleRoleChange = (role: string | null) => {
    setSelectedRole(role);
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem('accessToken');
        if (!token) {
          setError('Vui lòng đăng nhập để xem danh sách người dùng.');
          setLoading(false);
          return;
        }

        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (err: any) {
        console.error('Failed to fetch users:', err);
        setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = selectedRole
    ? users.filter(user => user.role === selectedRole)
    : users;

  return (
    <MainLayout>
      <div className="min-h-screen w-screen bg-gray-50 flex">
        {/* Sidebar cố định 256px */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <Sidebar />
        </aside>

        {/* Nội dung chính */}
        <section className="flex-1 flex flex-col bg-white">
          <div className="border-b border-gray-200">
            <Header />
          </div>
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            {error && (
              <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            {!loading && !error ? (
            <div className="w-full max-w-[1280px] mx-auto px-6">
              <div className="w-[750px] mb-4">
                  <UserRoleFilter onRoleChange={handleRoleChange} selectedRole={selectedRole} />
                </div>
                <UserList selectedRole={selectedRole} users={filteredUsers} loading={loading} />
              </div>
            ) : null}
          </main>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;