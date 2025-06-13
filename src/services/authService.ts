// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { AxiosResponse } from 'axios';
// import api from './apiService';

// // Types
// interface RegisterPayload {
//   fullname: string;
//   email: string;
//   password: string;
//   repeatPassword: string;
//   address: string;
// }

// interface LoginPayload {
//   email: string;
//   password: string;
// }

// interface GoogleLoginPayload {
//   // Tùy backend yêu cầu key nào, ví dụ tokenId hoặc code
//   code: string;
// }

// interface AuthResponse {
//   message: string;
//   accessToken?: string;
//   refreshToken?: string;
// }

// export interface UserProfile {
//   fullname: string;
//   email: string;
//   password: string;
//   address: string;
//   role: string;
//   avatarUrl?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// // State lưu user
// interface UserState {
//   profile: UserProfile | null;
// }

// const userState: UserState = {
//   profile: null,
// };

// export const authService = {
//   AUTH_PATH: '/api/Auth',

//   async login(payload: LoginPayload): Promise<AxiosResponse<AuthResponse>> {
//     try {
//       const response = await api.post<AuthResponse & { profile: UserProfile }>(
//         `${this.AUTH_PATH}/login`,
//         payload
//       );

//       if (response.data?.accessToken) {
//         const token = response.data.accessToken;
//         sessionStorage.setItem('accessToken', token);

//         if (response.data.profile) {
//           userState.profile = response.data.profile;
//           sessionStorage.setItem(
//             'user_profile',
//             JSON.stringify(response.data.profile)
//           );
//         }
//       }
//       return response;
//     } catch (error: any) {
//       console.error('Login error details:', error);
//       throw error;
//     }
//   },

//   async completeRegistration(payload: RegisterPayload): Promise<AxiosResponse> {
//     try {
//       return await api.post(`${this.AUTH_PATH}/register`, payload);
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Gọi POST google-login với body chứa code
//   async googleLogin(payload: GoogleLoginPayload): Promise<AxiosResponse<AuthResponse>> {
//     try {
//       const response = await api.post<AuthResponse>(
//         `${this.AUTH_PATH}/google-login`,
//         payload
//       );

//       if (response.data?.accessToken) {
//         sessionStorage.setItem('accessToken', response.data.accessToken);
//         // Xử lý fetch profile nếu backend trả về profile
//       }

//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   logout(): void {
//     sessionStorage.clear();
//     document.cookie =
//       'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
//     userState.profile = null;
//     window.location.replace('/signin');
//   },

//   getCurrentProfile(): UserProfile | null {
//     if (!userState.profile) {
//       const storedProfile = sessionStorage.getItem('user_profile');
//       if (storedProfile) {
//         userState.profile = JSON.parse(storedProfile);
//       }
//     }
//     return userState.profile;
//   },
//   // Lấy thông tin profile người dùng
//   async getProfile(): Promise<AxiosResponse<UserProfile>> {
//     try {
//       const token = sessionStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('No access token found');
//       }

//       const response = await api.get<UserProfile>(`${this.AUTH_PATH}/profile`);
//       return response;
//     } catch (error) {
//       console.error('Get profile error:', error);
//       throw error;
//     }
//   },
//   // Thêm method mới để lấy và lưu profile
//   async fetchAndStoreUserProfile(): Promise<void> {
//     try {
//       const response = await this.getProfile();
//       if (response.data) {
//         userState.profile = response.data;
//         sessionStorage.setItem('user_profile', JSON.stringify(response.data));
//       }
//     } catch (error) {
//       console.error('Failed to fetch user profile:', error);
//       throw error;
//     }
//   },
// };
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import api from './apiService';

// Types
interface RegisterPayload {
  Name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  accessToken?: string;
}

export interface UserProfile {
  fullname: string;
  email: string;
  password: string;
  address: string;
  role: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
// Thêm interface để lưu trữ user state
interface UserState {
  profile: UserProfile | null;
}

// Khởi tạo state để lưu thông tin user
const userState: UserState = {
  profile: null,
};

export const authService = {
  AUTH_PATH: '/Auth',
  
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
      const response = await api.post<AuthResponse & { profile: UserProfile }>(
        `${this.AUTH_PATH}/login`,
        payload
      );

      if (response.data?.accessToken) {
        const token = response.data.accessToken;
        sessionStorage.setItem('accessToken', token);

        // Đợi token được lưu
        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
          await this.fetchAndStoreUserProfile();
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
          // Không throw error ở đây để vẫn cho phép login thành công
        }
        if (response.data.profile) {
          userState.profile = response.data.profile;
          sessionStorage.setItem(
            'user_profile',
            JSON.stringify(response.data.profile)
          );
        }
      }
      return response;
    } catch (error: any) {
      console.error('Login error details:', error);
      throw error;
    }
  },
  // Lấy thông tin profile người dùng
  async getProfile(): Promise<AxiosResponse<UserProfile>> {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await api.get<UserProfile>(`${this.AUTH_PATH}/profile`);
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  async updateUserProfile(
    profile: UserProfile
  ): Promise<AxiosResponse<any, any>> {
    try {
      const response = await api.put(`${this.AUTH_PATH}/profile`, profile);
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

      // Xóa thông tin session, profile và token
      sessionStorage.clear();
      document.cookie =
        'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      userState.profile = null;
    } catch (error: unknown) {
      if (
        (error as { response?: { status?: number } })?.response?.status === 401
      ) {
        console.warn('Unauthorized during logout. Clearing session anyway.');
      } else {
        console.error('Logout error:', error);
        throw error;
      }
    } finally {
      // Chuyển hướng về trang đăng nhập
      window.location.replace('/signin');
    }
  },
  async checkExistingUser(email: string): Promise<boolean> {
    try {
      const response = await api.post(`${this.AUTH_PATH}/check-email`, {
        email,
      });
      return response.data.exists;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async googleLogin(code: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      const response = await api.get<AuthResponse>(
        `/auth/google/signin/callback?code=${code}`
      );

      if (response.data?.accessToken) {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        await this.fetchAndStoreUserProfile();
      }

      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error: any): Error {
    if (error.response) {
      return new Error(error.response.data?.message || 'Server error');
    }
    return new Error('Network error occurred');
  },

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('accessToken');
  },

  // Thêm method mới để lấy và lưu profile
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

  // Thêm method để lấy profile từ state
  getCurrentProfile(): UserProfile | null {
    if (!userState.profile) {
      // Thử lấy từ sessionStorage nếu state trống
      const storedProfile = sessionStorage.getItem('user_profile');
      console.log('Stored Profile in Session:', storedProfile);
      if (storedProfile) {
        userState.profile = JSON.parse(storedProfile);
      }
    }
    return userState.profile;
  },

  // Thêm method để lấy userID
  getUserID: (): number | null => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1]; // Lấy phần payload (JWT có 3 phần: header.payload.signature)
      const payloadJson = JSON.parse(atob(payloadBase64)); // Giải mã base64
      return payloadJson.user_id || null; // Lấy userID
    } catch (error) {
      console.error('Lỗi khi giải mã accessToken:', error);
      return null;
    }
  },
};
