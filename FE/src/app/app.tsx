import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@cnpm/context/AuthContext';
import SignInPage from '@cnpm/pages/LoginPage';
import SignUpPage from '@cnpm/pages/SignUp';
import LoginError from '@cnpm/pages/LoginError';
import DashboardHoiOngThamInh from '@cnpm/pages/DashboardHoiOngThamInh';
import HDTD from '@cnpm/pages/DashboardHDTD'; 
import DashboardQuanTriVien from '@cnpm/pages/DashboardQuanTriVien';
import DashboardQuanTriVien1 from '@cnpm/pages/DashboardQuanTriVien1';
import DashboardQuanTriVien2 from '@cnpm/pages/DashboardQuanTriVien2';
import AdminDashboard from '@cnpm/pages/AdminDashboard';
import { PublicRoute, ProtectedRoute } from '@cnpm/components/Protect/PublicRoute';
import DuAn from '@cnpm/pages/DuAn';
import Duanhost from '@cnpm/pages/Duanhost';
import Profile from '@cnpm/pages/Profile';
import Profile1 from '@cnpm/pages/Profile1';
import Profile2 from '@cnpm/pages/Profile2';
import Profile3 from '@cnpm/pages/Profile3';
import TaiTro from '@cnpm/pages/TaiTro';
import nhanvien from '@cnpm/pages/DashboradStaff';
import Chutri from '@cnpm/pages/DashboardHost';
import ChiTietDuAnHost from '@cnpm/pages/ChiTietDuanHost';
import ThanhVienNghienCuu from '@cnpm/pages/ThanhVienNghienCuu';
import TaoDuAnNghienCuuChinh from '@cnpm/pages/TaoDuAnNghienCuuChinh';
import DuyetDuAn from '@cnpm/pages/DuyetDuAn';
import DuyetTaiTro from '@cnpm/pages/DuyetTaiTro';
import GoogleCallback from '@cnpm/components/Auth/GoogleCallBack';
import TrangChiTietNhiemVu from '@cnpm/pages/TrangChiTietNhiemVuThanhVienNgienCuu';
import PhieuYeuCauTaiTro from '@cnpm/pages/PhieuYeuCauTaiTro';
import ThemTaiLieuNghienCuuChinh from '@cnpm/pages/ThemTaiLieuNghienCuuChinh';
import ThemNhiemVu from '@cnpm/pages/ThemNhiemVu';
import ChiTietDuAn from '@cnpm/pages/ChiTietDuAn';
import { useParams } from 'react-router-dom';
import DashboradStaff from '@cnpm/pages/DashboradStaff';
import { Import } from 'lucide-react';

function TrangChiTietNhiemVuWrapper() {
  const { taskId = '' } = useParams<{ taskId: string }>();
  return <TrangChiTietNhiemVu taskId={taskId} />;
}

export function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div className="w-screen min-h-screen bg-[#fcfcf6]">
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Redirect root to signin */}
              <Route path="/" element={<Navigate to="/signin" replace />} />
              
              {/* PUBLIC ROUTES - Chỉ dành cho user chưa đăng nhập */}
              <Route element={<PublicRoute />}>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login-error" element={<LoginError />} />
                <Route path="/google-callback" element={<GoogleCallback />} />
              </Route>

              {/* PROTECTED ROUTES - Dành cho user đã đăng nhập */}
              <Route element={<ProtectedRoute />}>
                {/* Dashboard Routes */}
                <Route path="/hoidongthamdinh" element={<DashboardHoiOngThamInh />} />
                <Route path="/quantrivien" element={<DashboardQuanTriVien />} />
                <Route path="/quantrivien1" element={<DashboardQuanTriVien1 />} />
                <Route path="/quantrivien2" element={<DashboardQuanTriVien2 />} />
                <Route path="/admin" element={<AdminDashboard />} />
                
                {/* User & Profile Routes */}
                <Route path="/DashboardHDTD" element={<HDTD />} />
                <Route path="/DashboradStaff" element={<DashboradStaff />} />
                <Route path="/dashboardhost" element={<Chutri />} />
                <Route path="/thanhviennghiencuu" element={<ThanhVienNghienCuu />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile1" element={<Profile1 />} />
                <Route path="/profile2" element={<Profile2 />} />
                <Route path="/profile3" element={<Profile3 />} />
                {/* Project Routes */}
                <Route path="/duanhost" element={<Duanhost />} />
                <Route path="/duan" element={<DuAn />} />
                <Route path="/chitietduanhost" element={<ChiTietDuAnHost />} />
                <Route path="/chitietduan" element={<ChiTietDuAn />} />
                <Route path="/taoduannghiencuuchinh" element={<TaoDuAnNghienCuuChinh />} />
                <Route path="/duyetduan" element={<DuyetDuAn />} />
                <Route path="/duyettaitro" element={< DuyetTaiTro/>} />
                {/* Task Routes */}
                <Route path="/themnhiemvu" element={<ThemNhiemVu availableMembers={[]} />} />
                <Route
                  path="/trangchitietnhiemvu/:taskId"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <TrangChiTietNhiemVuWrapper />
                    </React.Suspense>
                  }
                />
                
                {/* Sponsorship Routes */}
                <Route path="/tai-tro" element={<TaiTro />} />
                <Route path="/duyettaitro" element={<DuyetTaiTro />} />
                <Route
                  path="/phieuyeucautaitro"
                  element={
                    <PhieuYeuCauTaiTro onSubmit={(formData) => { 
                      console.log('Form submitted:', formData);
                    }} />
                  }
                />
                
                {/* Document Routes */}
                <Route path="/themtailieu" element={<ThemTaiLieuNghienCuuChinh />} />
              </Route>
              
              {/* Catch all route - 404 */}
              <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;