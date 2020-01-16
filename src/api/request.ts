import Cookies from 'js-cookie';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd';

const env = process.env.NODE_ENV;
let HOST = '';
if (env === 'development') {
  HOST = 'http://localhost:8081';
} else if (env === 'production') {
  HOST = 'http://www.jinminrui.cn';
}

const baseConfig: AxiosRequestConfig = {
  baseURL: HOST,
  // withCredentials: true,
};

const request: AxiosInstance = axios.create({
  ...baseConfig,
  timeout: 15000,
});

request.interceptors.request.use(
  config => {
    const tempConfig = config || {};
    tempConfig.headers = {
      UserToken: Cookies.get('user-token'),
    };
    return tempConfig;
  },
  error => {
    console.log(`err${error}`); // for debug
    message.error(error.message);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 401) {
      window.location.href = '/';
      message.error(res.desc);
    }
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

export function get(url: string, params?: any) {
  return request.get(url, { params });
}

export function post(url: string, params?: any) {
  return request.post(url, { ...params });
}

const axUpload = axios.create({
  ...baseConfig,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export function upload(url: any, params: any) {
  return axUpload.post(url, params);
}

export default request;
