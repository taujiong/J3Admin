import axios, { AxiosRequestConfig } from 'axios';

export const httpServiceToken = Symbol('http-service');

export function createHttpService(axiosConfig: AxiosRequestConfig) {
  return axios.create(axiosConfig);
}
