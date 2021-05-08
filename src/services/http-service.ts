import axios, { AxiosRequestConfig } from 'axios';
import { Ref } from 'vue';

export const httpServiceToken = Symbol('http-service');

export function createHttpService(axiosConfig: AxiosRequestConfig, authorizationHeader: Ref<string>) {
  const instance = axios.create(axiosConfig);

  instance.interceptors.request.use(config => {
    config.headers['Authorization'] = authorizationHeader.value;
    return config;
  });

  return instance;
}
