import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TypeProvider } from 'src/models';
import { axiosConfig } from 'src/presets';

export class HttpService {
  private _axiosInstance: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig) {
    this._axiosInstance = axios.create(axiosConfig);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this._axiosInstance.delete<T>(url, config);
    return response.data;
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this._axiosInstance.get<T>(url, config);
    return response.data;
  }

  getUri(config?: AxiosRequestConfig): string {
    return this._axiosInstance.getUri(config);
  }

  async head<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this._axiosInstance.head<T>(url, config);
    return response.data;
  }

  async options<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this._axiosInstance.options<T>(url, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this._axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this._axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this._axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async request<T>(config: AxiosRequestConfig) {
    const response = await this._axiosInstance.request<T>(config);
    return response.data;
  }

  useInterceptor(interceptor: HttpRequestInterceptor | HttpResponseInterceptor) {
    switch (interceptor.target) {
      case 'request':
        interceptor.id = this._axiosInstance.interceptors.request.use(interceptor.interception);
        break;
      case 'response':
        interceptor.id = this._axiosInstance.interceptors.response.use(interceptor.interception);
        break;
    }
  }

  ejectInterceptor(interceptor: HttpRequestInterceptor | HttpResponseInterceptor) {
    if (!interceptor.id)
      throw new Error(`interceptor ${ interceptor.name } has not been used yet`);

    switch (interceptor.target) {
      case 'request':
        this._axiosInstance.interceptors.request.eject(interceptor.id);
        break;
      case 'response':
        this._axiosInstance.interceptors.response.eject(interceptor.id);
        break;
    }
  }
}

interface HttpInterceptor<T> {
  name: string,
  readonly target: 'request' | 'response',
  interception: (value: T) => T | Promise<T>,
  id?: number
}

export interface HttpRequestInterceptor extends HttpInterceptor<AxiosRequestConfig> {
  target: 'request',
}

export interface HttpResponseInterceptor extends HttpInterceptor<AxiosResponse> {
  target: 'response',
}

export const HttpServiceProvider = new TypeProvider<HttpService>(
  Symbol.for(HttpService.name),
  HttpService,
  [axiosConfig]
);
