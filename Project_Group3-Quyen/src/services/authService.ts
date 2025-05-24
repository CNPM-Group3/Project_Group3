import axios from 'axios';

const API_BASE = 'https://657b-115-77-159-170.ngrok-free.app/api';

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

interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
  repeatPassword: string;
  address: string;
}

interface VerifyEmailPayload {
  email: string;
  verificationCode: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
  repeatNewPassword: string;
}

interface AuthResponse {
  data: {
    message: string;
    accessToken?: string;
    refreshToken?: string;
    profile?: UserProfile;
  };
}

export const authService = {
  AUTH_PATH: '/auth',

  async sendOtp(email: string): Promise<{ message: string }> {
    const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
    return res.data;
  },

  async sendOTP(email: string): Promise<{ message: string }> {
    const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
    return res.data;
  },

  async verifyEmail(payload: VerifyEmailPayload): Promise<{ message: string }> {
    const res = await axios.post(`${API_BASE}/auth/verify-email`, payload);
    return res.data;
  },

  async completeRegistration(payload: RegisterPayload): Promise<{ message: string }> {
    const res = await axios.post(`${API_BASE}/auth/register`, payload);
    return res.data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await axios.post(`${API_BASE}/auth/login`, payload);
    const { accessToken, profile } = res.data;

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('user_profile', JSON.stringify(profile));

    return { data: { message: 'Login successful', accessToken, profile } };
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ message: string }> {
    const res = await axios.post(`${API_BASE}/auth/forgot-password`, payload);
    return res.data;
  },

  async logout(): Promise<void> {
    sessionStorage.clear();
    window.location.replace('/signin');
  },

  async getProfile(): Promise<{ data: UserProfile }> {
    const stored = sessionStorage.getItem('user_profile');
    if (!stored) throw new Error('No profile in session');
    return { data: JSON.parse(stored) };
  },

  async updateUserProfile(profile: UserProfile): Promise<{ message: string }> {
    const res = await axios.put(`${API_BASE}/user/update`, profile); // Đường dẫn này phụ thuộc vào backend bạn
    sessionStorage.setItem('user_profile', JSON.stringify(profile));
    return res.data;
  },

  async checkExistingUser(email: string): Promise<boolean> {
    const res = await axios.get(`${API_BASE}/auth/check-email?email=${encodeURIComponent(email)}`);
    return res.data.exists;
  },

  async googleLogin(code: string): Promise<AuthResponse> {
    const res = await axios.post(`${API_BASE}/auth/google/login`, { code });
    const { accessToken, profile } = res.data;
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('user_profile', JSON.stringify(profile));
    return { data: { message: 'Google login successful', accessToken, profile } };
  },

  handleError(error: any): Error {
    return new Error(error.response?.data?.message || error.message || 'Something went wrong');
  },

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('accessToken');
  },

  async fetchAndStoreUserProfile(): Promise<void> {
    const profile = JSON.parse(sessionStorage.getItem('user_profile') || 'null');
    if (profile) {
      sessionStorage.setItem('user_profile', JSON.stringify(profile));
    }
  },

  getCurrentProfile(): UserProfile | null {
    const stored = sessionStorage.getItem('user_profile');
    return stored ? JSON.parse(stored) : null;
  },

  getUserID(): number | null {
    const profile = authService.getCurrentProfile();
    return profile ? 1 : null; // Giả lập ID, backend thực có thể trả ID khác
  }
};
