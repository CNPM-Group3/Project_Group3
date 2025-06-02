import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

interface PublicRouteProps {
  redirectPath?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  redirectPath = '/dashboard' // Default redirect path
}) => {
  const user = sessionStorage.getItem('accessToken');
  console.log('>>>', user);
  return user ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

interface ProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/signin' // Default redirect path
}) => {
  const user = sessionStorage.getItem('accessToken');

  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};