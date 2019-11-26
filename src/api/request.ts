import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd';

export const HOST: string =
  window.location.host === 'www.jinminrui.com'
    ? 'http://www.jinminrui.com'
    : 'http://localhost:8080';

const baseConfig: AxiosRequestConfig = {
  baseURL: HOST,
  withCredentials: true,
  maxContentLength: 5000,
};

const request: AxiosInstance = axios.create({
  ...baseConfig,
  timeout: 15000,
});

request.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      message.error(res.data);
    }
    return res;
  },
  error => {
    console.log(`err${error}`); // for debug
    message.error(error.message);
    return Promise.reject(error);
  }
);

export function get(url: string, params: any) {
  return request.get(url, { params });
}

export function post(url: string, params: any) {
  return request.post(url, { params });
}

export default request;
