import axios from 'axios';
import { authService } from 'src/services/auth-service';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
  timeout: 3000
});

axiosInstance.interceptors.request.use(
  config => {
    const tokenType = authService.user?.token_type;
    const accessToken = authService.user?.access_token;
    if (tokenType && accessToken) {
      config.headers['Authorization'] = `${ tokenType } ${ accessToken }`;
    }

    return config;
  }
);

export const httpService = axiosInstance;
