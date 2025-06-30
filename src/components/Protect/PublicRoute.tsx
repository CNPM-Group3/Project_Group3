import { Navigate, Outlet } from 'react-router-dom';

// PublicRoute: Ai cũng vào được (tạm thời bỏ chế độ đăng nhập)
//export const PublicRoute = () => {
  //return <Outlet />;
//};

// ProtectedRoute: Ai cũng vào được (tạm thời bỏ chế độ đăng nhập)
//export const ProtectedRoute = () => {
  //return <Outlet />;
//};

// // PublicRoute: Chỉ cho phép user CHƯA đăng nhập truy cập
export const PublicRoute = () => {
const user = sessionStorage.getItem('accessToken');
//   
//   // Nếu user đã đăng nhập thì redirect về trang chính
return user ? <Navigate to="/thanhviennghiencuu" replace /> : <Outlet />;
};

// // ProtectedRoute: Chỉ cho phép user ĐÃ đăng nhập truy cập
export const ProtectedRoute = () => {
const user = sessionStorage.getItem('accessToken');
//   
//   Nếu user chưa đăng nhập thì redirect về trang đăng nhập
return user ? <Outlet /> : <Navigate to="/signin" replace />;
};
