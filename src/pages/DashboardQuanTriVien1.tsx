"use client";
import * as React from "react";
import MainLayout from "@cnpm/layouts/MainLayout";
import Sidebar from "@cnpm/components/QuanTriVien/QuanTriVien1/Sidebar";
import Header from "@cnpm/components/Header";
import { UserRoleFilter } from "@cnpm/components/QuanTriVien/QuanTriVien1/UserRoleFilter";
import { UserList } from "@cnpm/components/QuanTriVien/QuanTriVien1/UserList";

interface DashboardLayoutProps {
  userRole: string; // Example prop: role of the logged-in user
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userRole
}) => {
  // You might use userRole here to conditionally render content or features
  console.log("Accessing DashboardLayout (QuanTriVien1) with role:", userRole);

  // State for role filter
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const roles = ["Tất cả", "Sinh viên", "Giảng viên", "Nhân viên", "Quản trị viên"];

  // Mock user data
  const [users, setUsers] = React.useState([
    { name: "Nguyên Văn A", email: "fe@ut.edu.vn", role: "Sinh viên" },
    { name: "Trần Thị B", email: "b@gv.ut.edu.vn", role: "Giảng viên" },
    { name: "Lê Văn C", email: "c@st.ut.edu.vn", role: "Nhân Viên" },
    { name: "Bùi Bảo D", email: "d@it.ut.edu.vn", role: "Quản trị viên" },
  ]);

  // Handlers for role actions
  const handleRoleSelect = (role: string | null) => {
    setSelectedRole(role);
    // TODO: Implement role filtering logic
    console.log("Selected role:", role);
  };

  const handleAssignRole = (email: string) => {
    // TODO: Implement role assignment logic
    console.log("Assigning role to:", email);
  };

  const handleRevokeRole = (email: string) => {
    // TODO: Implement role revocation logic
    console.log("Revoking role from:", email);
  };

  return (
    <MainLayout>
      <div className="min-h-screen w-screen bg-gray-50 flex">
        {/* Sidebar cố định 256px */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 fixed h-full">
          <Sidebar />
        </aside>

        {/* Nội dung chính */}
        <section className="flex-1 flex flex-col bg-white ml-64">
          <div className="fixed w-full z-10">
            <Header />
          </div>
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50 mt-16">
            <div className="w-full max-w-[1280px] mx-auto px-6">
              <div className="w-[750px] mb-4">
                <UserRoleFilter
                  roles={roles}
                  selectedRole={selectedRole}
                  onRoleSelect={handleRoleSelect}
                />
              </div>
              <UserList
                users={users}
                onAssignRole={handleAssignRole}
                onRevokeRole={handleRevokeRole}
              />
            </div>
          </main>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;