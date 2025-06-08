"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/Sidebar";
import Header from "@cnpm/components/Header";
import { SystemConfigCard } from "@cnpm/components/QuanTriVien/SystemConfigCard";
import { getAllUsers, ApiUser } from "@cnpm/services/userService";

export default function DashboardQuanTriVien() {
  const [users, setUsers] = React.useState<ApiUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            {error && (
              <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            {!loading && !error ? (
              <>
                <SystemConfigCard />
              </>
            ) : null}
          </main>
        </section>
      </div>
    </MainLayout>
  );
}
