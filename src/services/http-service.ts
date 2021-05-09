import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const httpServiceToken = Symbol('http-service');

export class HttpService {
  private _axiosInstance: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig) {
    this._axiosInstance = axios.create(axiosConfig);
  }

  delete<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this._axiosInstance.delete(url, config);
  }

  get<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this._axiosInstance.get(url, config);
  }

  getUri(config?: AxiosRequestConfig): string {
    return this._axiosInstance.getUri(config);
  }

  head<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this._axiosInstance.head(url, config);
  }

  options<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this._axiosInstance.options(url, config);
  }

  patch<T = unknown, R = AxiosResponse<T>>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<R> {
    return this._axiosInstance.patch(url, data, config);
  }

  post<T = unknown, R = AxiosResponse<T>>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<R> {
    return this._axiosInstance.delete(url, config);
  }

  put<T = unknown, R = AxiosResponse<T>>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<R> {
    return this._axiosInstance.put(url, data, config);
  }

  request<T = unknown, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this._axiosInstance.request(config);
  }

  interceptRequest(interception: (config: AxiosRequestConfig) => AxiosRequestConfig): number {
    return this._axiosInstance.interceptors.request.use(interception);
  }
}

export function createHttpService(axiosConfig: AxiosRequestConfig) {
  return new HttpService(axiosConfig);
}
