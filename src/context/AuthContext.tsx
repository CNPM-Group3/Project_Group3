/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser } from '@cnpm/services/userService';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = React.useState<string | null>(
    sessionStorage.getItem('accessToken') || null
  );
  
  useEffect(() => {
    // Chỉ gọi getCurrentUser khi có token
    if (token) {
      const fetchUser = async () => {
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          }
        } catch (error: any) {
          console.log('Không thể lấy thông tin user:', error);
          // Nếu lỗi 401, xóa token cũ
          if (error?.response?.status === 401) {
            sessionStorage.removeItem('accessToken');
            setToken(null);
          }
        }
      };
      fetchUser();
    }
  }, [token]);
  
  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const token = localStorage.getItem('token');
    if (token) {
      // Tùy chọn: Giải mã token để lấy thông tin người dùng hoặc fetch dữ liệu người dùng
      setUser({ token });
      console.log('check token', token)
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      sessionStorage.setItem('accessToken', token);
    } else {
      sessionStorage.removeItem('accessToken');
    }
  }, [token]);

  const handleSignOut = async () => {
    try {
      // Xóa token và user data
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
    } catch (error) {
      // fallback: vẫn xóa token local nếu có lỗi
      localStorage.removeItem('token');
      sessionStorage.removeItem('accessToken');
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
