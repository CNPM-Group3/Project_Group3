/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      timeout: 30000, // Tăng timeout lên 30 giây
      withCredentials: true, // Cho phép gửi cookies trong cross-origin requests
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        // Thêm headers cho CORS
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
        return config;
      },
      (error) => Promise.reject(error)
    );

<<<<<<< HEAD
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          sessionStorage.removeItem('accessToken');
          window.location.href = '/login';
        }

        // Handle network errors
        if (!error.response) {
          console.error('Network Error:', error.message);
          
          // Kiểm tra nếu là lỗi CORS
          if (error.message.includes('Network Error') || 
              error.message.includes('ERR_NETWORK_ACCESS_DENIED')) {
            console.log('CORS or Network Access Error detected');
            // Thử request lại với cấu hình khác
            const newConfig = {
              ...error.config,
              headers: new AxiosHeaders({
                ...error.config?.headers,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              }),
            };
            return this.api.request(newConfig as InternalAxiosRequestConfig);
          }

          // Kiểm tra nếu là lỗi timeout
          if (error.code === 'ECONNABORTED') {
            console.log('Request timeout, retrying...');
            // Tăng timeout cho lần retry
            const newConfig = {
              ...error.config,
              timeout: 60000, // Tăng lên 60 giây cho lần retry
            };
            return this.api.request(newConfig as InternalAxiosRequestConfig);
          }
        }

        return Promise.reject(error);
      }
    );
=======
>>>>>>> Nhi
  }

  public getApi(): AxiosInstance {
    return this.api;
  }
}

export default new ApiService().getApi();