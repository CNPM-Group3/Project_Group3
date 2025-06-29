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

  }

  public getApi(): AxiosInstance {
    return this.api;
  }
}

export default new ApiService().getApi();