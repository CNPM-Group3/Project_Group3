import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const user = sessionStorage.getItem('accessToken');
  console.log('>>>', user);
  return user ? <Navigate to="/thanhviennghiencuu" replace /> : <Outlet />;
};

export const ProtectedRoute = () => {
  return <Outlet />;
};