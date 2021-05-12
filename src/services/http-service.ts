import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TypeProvider } from 'src/models';
import { axiosConfig } from 'src/presets';

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
