import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from '@cnpm/context/AuthContext';
import SignInPage from '@cnpm/pages/LoginPage';
import SignUpPage from '@cnpm/pages/SignUp';
import LoginError from '@cnpm/pages/LoginError';
import { PublicRoute } from '@cnpm/components/Protect/PublicRoute';
import DuAn from '@cnpm/pages/DuAn';
import Profile from '@cnpm/pages/Profile';
import ThanhVienNghienCuu from '@cnpm/pages/ThanhVienNghienCuu';
import ThemTaiLieuNghienCuuChinh from '@cnpm/pages/ThemTaiLieuNghienCuuChinh';


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
              <Route path="/duan" element={<DuAn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/thanhviennghiencuu" element={<ThanhVienNghienCuu />} />
              <Route path="/themtailieu" element={<ThemTaiLieuNghienCuuChinh />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
    </div>
  );
}

export default App;
