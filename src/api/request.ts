import Cookies from 'js-cookie';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { removeCookies } from 'utils';

const env = process.env.NODE_ENV;
let HOST = '';
if (env === 'development') {
  HOST = 'http://localhost:8040';
} else if (env === 'production') {
  HOST = 'http://www.jinminrui.cn:8040';
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
    if (res.code !== 200) {
      message.error(res.desc);
    }
    return res as any;
  },
  error => {
    console.log(error.response); // for debug
    if (error.response?.status === 401) {
      removeCookies('user-token');
      window.location.href = '/';
      message.warn('登录权限失效，请重新登录！');
    }
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
