import { AxiosRequestConfig } from 'axios';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.API_BASE_URL,
  withCredentials: true
};
