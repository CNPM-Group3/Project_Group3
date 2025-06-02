/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import api from './apiService';

interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
}

export const handleGoogleResponse = (response: any): GoogleUser => {
  try {
    const decoded: any = jwtDecode(response.credential);
    return {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture
    };
  } catch (error) {
    console.error('Error decoding Google response:', error);
    throw new Error('Failed to process Google sign in');
  }
};

// Thêm các hàm mới để xử lý endpoints Google mới
export const googleAuthService = {
  // Bắt đầu quá trình đăng ký với Google
  initiateGoogleSignUp: async (): Promise<string> => {
    try {
      const response = await api.get('/Auth/google/signup');
      return response.data.redirectUrl;
    } catch (error) {
      console.error('Error initiating Google sign up:', error);
      throw new Error('Failed to start Google sign up process');
    }
  },

  // Bắt đầu quá trình đăng nhập với Google
  initiateGoogleSignIn: async (): Promise<string> => {
    try {
      const response = await api.get('/Auth/google/signin');
      return response.data.redirectUrl;
    } catch (error) {
      console.error('Error initiating Google sign in:', error);
      throw new Error('Failed to start Google sign in process');
    }
  },

  // Xử lý callback từ Google sau khi đăng ký
  handleGoogleSignUpCallback: async (code: string): Promise<any> => {
    try {
      const response = await api.get(`/Auth/google/signup/callback?code=${code}`);
      return response.data;
    } catch (error) {
      console.error('Error handling Google sign up callback:', error);
      throw error;
    }
  },

  // Xử lý callback từ Google sau khi đăng nhập
  handleGoogleSignInCallback: async (code: string): Promise<any> => {
    try {
      const response = await api.get(`/Auth/google/signin/callback?code=${code}`);
      return response.data;
    } catch (error) {
      console.error('Error handling Google sign in callback:', error);
      throw error;
    }
  }
};