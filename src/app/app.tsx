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




export function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
              <Route path="/hoidongthamdinh" element={<DashboardHoiOngThamInh />} />
              <Route path="/quantrivien" element={<DashboardQuanTriVien />} />
              <Route path="/quantrivien1" element={<DashboardQuanTriVien1 />} />
              <Route path="/quantrivien2" element={<DashboardQuanTriVien2 />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/duan" element={<DuAn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/taitro" element={<TaiTro />} />
              <Route path="/thanhviennghiencuu" element={<ThanhVienNghienCuu />} />
              <Route path="/taoduannghiencuuchinh" element={<TaoDuAnNghienCuuChinh />} />
              <Route path="/duyetduan" element={<DuyetDuAn />} />
              <Route path="/duyettaitro" element={<DuyetTaiTro />} />
              <Route path="/project-detail" element={<ProjectDetailPage />} />
              <Route path="/trangchitietnhiemvu" element={<TrangChiTietNhiemVu />} />
              <Route path="/phieuyeucautaitro" element={<PhieuYeuCauTaiTro />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
    </div>
  );
}

export default App;
