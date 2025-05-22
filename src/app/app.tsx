import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from '@cnpm/context/AuthContext';
import SignInPage from '@cnpm/pages/LoginPage';
import SignUpPage from '@cnpm/pages/SignUp';
import LoginError from '@cnpm/pages/LoginError';
import AuthLayout from '@cnpm/components/Protect/AuthLayout';
import DashboardHoiOngThamInh from '@cnpm/pages/DashboardHoiOngThamInh';
import DashboardQuanTriVien from '@cnpm/pages/DashboardQuanTriVien';
import DashboardQuanTriVien1 from '@cnpm/pages/DashboardQuanTriVien1';
import DashboardQuanTriVien2 from '@cnpm/pages/DashboardQuanTriVien2';
import AdminDashboard from '@cnpm/pages/AdminDashboard';
import { PublicRoute } from '@cnpm/components/Protect/PublicRoute';


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
              <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login-error" element={<LoginError />} />
                <Route path="/dashboard" element={<DashboardHoiOngThamInh />} />
                <Route path="/quantrivien" element={<DashboardQuanTriVien />} />
                <Route path="/quantrivien1" element={<DashboardQuanTriVien1 />} />
                <Route path="/quantrivien2" element={<DashboardQuanTriVien2 />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
    </div>
  );
}

export default App;
