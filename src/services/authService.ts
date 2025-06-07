/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import api from './apiService';

// Types
interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  data: UserProfile;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  avatarUrl: string | null;
  backgroundUrl: string | null;
  socialLinks: string[];
  roles: string[];
  isGoogleUser: boolean;
  createdAt: string;
}

interface UpdateProfilePayload {
  name: string;
  avatarUrl: string;
  backgroundUrl: string;
  socialLinks: string;
}

interface UserState {
  profile: UserProfile | null;
}

const userState: UserState = {
  profile: null,
};

export const authService = {
  AUTH_PATH: '/v1/Auth',

  // Đăng ký
  async completeRegistration(payload: RegisterPayload): Promise<AxiosResponse> {
    try {
      return await api.post(`${this.AUTH_PATH}/register`, payload);
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Đăng nhập
  async login(payload: LoginPayload): Promise<AxiosResponse<AuthResponse>> {
    try {
      const response = await api.post<AuthResponse>(
        `${this.AUTH_PATH}/login`,
        payload
      );

      if (response.data?.token) {
        sessionStorage.setItem('accessToken', response.data.token);

        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
          await this.fetchAndStoreUserProfile();
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
        }
      }

      return response;
    } catch (error: any) {
      console.error('Login error details:', error);
      throw error;
    }
  },

  // Lấy thông tin người dùng hiện tại
  async getProfile(): Promise<AxiosResponse<UserProfile>> {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      
      const response = await api.get('/Users/me'); 
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Cập nhật profile
  async updateUserProfile(payload: UpdateProfilePayload): Promise<AxiosResponse<any>> {
    try {
      const response = await api.put('/Users/profile', payload); // ✅
      return response;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Đăng xuất
  async logout(): Promise<void> {
    try {
      await api.post(`${this.AUTH_PATH}/logout`);
      sessionStorage.clear();
      document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      userState.profile = null;
    } catch (error: unknown) {
      if ((error as { response?: { status?: number } })?.response?.status === 401) {
        console.warn('Unauthorized during logout. Clearing session anyway.');
      } else {
        console.error('Logout error:', error);
        throw error;
      }
    } finally {
      window.location.replace('/signin');
    }
  },

  // Kiểm tra email đã tồn tại
  async checkExistingUser(email: string): Promise<boolean> {
    try {
      const response = await api.post(`${this.AUTH_PATH}/check-email`, { email });
      return response.data.exists;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Google Login
  async googleLogin(code: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      const response = await api.get<AuthResponse>(
        `/auth/google/signin/callback?code=${code}`
      );

      if (response.data?.token) {
        sessionStorage.setItem('accessToken', response.data.token);
        await this.fetchAndStoreUserProfile();
      }

      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Helper
  handleError(error: any): Error {
    if (error.response) {
      return new Error(error.response.data?.message || 'Server error');
    }
    return new Error('Network error occurred');
  },

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('accessToken');
  },

  async fetchAndStoreUserProfile(): Promise<void> {
    try {
      const response = await this.getProfile();
      if (response.data) {
        userState.profile = response.data;
        sessionStorage.setItem('user_profile', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  },

  getCurrentProfile(): UserProfile | null {
    if (!userState.profile) {
      const storedProfile = sessionStorage.getItem('user_profile');
      if (storedProfile) {
        userState.profile = JSON.parse(storedProfile);
      }
    }
    return userState.profile;
  },

  getUserID(): number | null {
    const token = sessionStorage.getItem('accessToken');
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = JSON.parse(atob(payloadBase64));
      return payloadJson.user_id || null;
    } catch (error) {
      console.error('Lỗi khi giải mã accessToken:', error);
      return null;
    }
  }
};
