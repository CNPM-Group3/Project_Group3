import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from '@cnpm/context/AuthContext';
import SignInPage from '@cnpm/pages/LoginPage';
import SignUpPage from '@cnpm/pages/SignUp';
import LoginError from '@cnpm/pages/LoginError';
import DashboardHoiOngThamInh from '@cnpm/pages/DashboardHoiOngThamInh';
import DashboardQuanTriVien from '@cnpm/pages/DashboardQuanTriVien';
import DashboardQuanTriVien1 from '@cnpm/pages/DashboardQuanTriVien1';
import DashboardQuanTriVien2 from '@cnpm/pages/DashboardQuanTriVien2';
import AdminDashboard from '@cnpm/pages/AdminDashboard';
import { PublicRoute } from '@cnpm/components/Protect/PublicRoute';
import DuAn from '@cnpm/pages/DuAn';
import Profile from '@cnpm/pages/Profile';
import TaiTro from '@cnpm/pages/TaiTro';
import ThanhVienNghienCuu from '@cnpm/pages/ThanhVienNghienCuu';
import TaoDuAnNghienCuuChinh from '@cnpm/pages/TaoDuAnNghienCuuChinh';
import DuyetDuAn from '@cnpm/pages/DuyetDuAn';
import DuyetTaiTro from '@cnpm/pages/DuyetTaiTro';
import ProjectDetailPage from '@cnpm/pages/ProjectDetailPage';
import TrangChiTietNhiemVu from '@cnpm/pages/TrangChiTietNhiemVuThanhVienNghienCuu';
import PhieuYeuCauTaiTro from '@cnpm/pages/PhieuYeuCauTaiTro';
import ThemTaiLieuNghienCuuChinh from '@cnpm/pages/ThemTaiLieuNghienCuuChinh';
import ThemNhiemVu from '@cnpm/pages/ThemNhiemVu';

export function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  // Mock data cho các props
  const mockUserId = "user123";
  const mockUserRole = "admin";
  const mockProjectId = "project123";
  const mockTaskId = "task123";
  const mockOnSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };
  const availableMembers = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"];

  return (
    <div className="w-screen min-h-screen bg-[#fcfcf6]">
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/signin" replace />} />

              <Route element={<PublicRoute />}>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login-error" element={<LoginError />} />
                <Route path="/hoidongthamdinh" element={<DashboardHoiOngThamInh userRole={mockUserRole} />} />
                <Route path="/quantrivien" element={<DashboardQuanTriVien userRole={mockUserRole} />} />
                <Route path="/quantrivien1" element={<DashboardQuanTriVien1 userRole={mockUserRole} />} />
                <Route path="/quantrivien2" element={<DashboardQuanTriVien2 userRole={mockUserRole} />} />
                <Route path="/admin" element={<AdminDashboard userRole={mockUserRole} />} />
                <Route path="/duan" element={<DuAn userId={mockUserId} />} />
                <Route path="/profile" element={<Profile userId={mockUserId} />} />
                <Route path="/taitro" element={<TaiTro userId={mockUserId} />} />
                <Route path="/thanhviennghiencuu" element={<ThanhVienNghienCuu userId={mockUserId} />} />
                <Route path="/taoduannghiencuuchinh" element={<TaoDuAnNghienCuuChinh userId={mockUserId} />} />
                <Route path="/duyetduan" element={<DuyetDuAn userRole={mockUserRole} />} />
                <Route path="/duyettaitro" element={<DuyetTaiTro userRole={mockUserRole} />} />
                <Route path="/project-detail" element={<ProjectDetailPage projectId={mockProjectId} />} />
                <Route path="/trangchitietnhiemvu" element={<TrangChiTietNhiemVu taskId={mockTaskId} />} />
                <Route path="/phieuyeucautaitro" element={<PhieuYeuCauTaiTro onSubmit={mockOnSubmit} />} />
                <Route path="/themtailieu" element={<ThemTaiLieuNghienCuuChinh userId={mockUserId} />} />
                <Route path="/themnhiemvu" element={<ThemNhiemVu availableMembers={availableMembers} />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
