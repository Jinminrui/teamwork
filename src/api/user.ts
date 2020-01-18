import { removeCookies } from 'utils';
import { post, get, upload } from './request';

interface LoginParams {
  username?: string;
  password?: string;
  phoneNum?: string;
  code?: string;
}

interface GetVerifyCodeParams {
  phoneNum: string;
}

export function loginByAccount(params: LoginParams) {
  return post('/users/loginByAccount', params);
}

export function loginByPhone(params: LoginParams) {
  return post('/users/loginByPhone', params);
}

export function getUesrInfo(id: number | string) {
  return get(`/users/${id}`);
}

export function uploadAvatar(data: FormData) {
  return upload('/oss/uploadAvatar', data);
}

export function update(params: any) {
  return post('/users/update', params);
}

export function getVerifyCode(params: GetVerifyCodeParams) {
  return post('/sms/verifyCode', params);
}

export function logout() {
  removeCookies('user-token');
  window.location.href = '/login';
}
