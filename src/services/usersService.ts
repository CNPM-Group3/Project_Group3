import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Axios instance để cấu hình các thiết lập chung cho tất cả các yêu cầu API
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true', // Bỏ qua cảnh báo ngrok
  },
});
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken'); // ✅ Sửa ở đây
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
interface User {
  id: string;
  email: string;
  name: string;
  avatarURL: string;
  backgroundURL: string;
  socialLinks: string[];
  roles: string[];
  isGoogleUser: boolean;
  createdAt: string;
}

// Service liên quan đến người dùng
const usersService = {
  // Lấy thông tin người dùng theo ID
  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await api.get(`/Users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  },

  // Lấy thông tin người dùng hiện tại (đang đăng nhập)
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get(`/Users/me`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },
  
  // Lấy tất cả người dùng
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get(`/Users`);
      // Đảm bảo luôn trả về mảng
      if (Array.isArray(response.data)) return response.data;
      if (response.data && Array.isArray(response.data.users)) return response.data.users;
      if (response.data && Array.isArray(response.data.data)) return response.data.data;
      return [];
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  // Lấy vai trò của người dùng
  getUsersByRole: async (roleName: string): Promise<User[]> => {
    try {
      const response = await api.get(`/Users/role/${roleName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users by role:', error);
      throw error;
    }
  },

  // Cập nhật thông tin hồ sơ người dùng
  updateProfile: async (profileData: User): Promise<User> => {
    try {
      const response = await api.put(`/Users/profile`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Thêm vai trò cho người dùng
  addRoleToUser: async (userId: string, roleName: string): Promise<void> => {
    try {
      await api.post(`/Users/${userId}/roles`, { roleName });
    } catch (error) {
      console.error('Error adding role to user:', error);
      throw error;
    }
  },

  // Xóa vai trò của người dùng
  // ✅ Xóa người dùng (đúng theo swagger)
  deleteUser: async (userId: string): Promise<void> => {
    try {
      await api.delete(`/Users/${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

};

export default usersService;