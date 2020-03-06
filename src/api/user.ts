import { removeCookies } from 'utils';
import { post, get, upload } from './request';

interface LoginParams {
  password?: string;
  phoneNum?: string;
  code?: string;
}

interface GetVerifyCodeParams {
  phoneNum: string;
}

export function loginByAccount(params: LoginParams) {
  return post('/user-center/users/loginByAccount', params);
}

export function loginByPhone(params: LoginParams) {
  return post('/user-center/users/loginByPhone', params);
}

export function getUesrInfo(id: number | string) {
  return get(`/user-center/users/${id}`);
}

export function uploadAvatar(data: FormData) {
  return upload('/user-center/oss/uploadAvatar', data);
}

export function update(params: any) {
  return post('/user-center/users/update', params);
}

export function getVerifyCode(params: GetVerifyCodeParams) {
  return post('/user-center/sms/verifyCode', params);
}

export function logout() {
  removeCookies('user-token');
  window.location.href = '/login';
}

export function getAllUsersByTeam(teamId: string) {
  return get('/user-center/users/getAllUsersByTeam', { teamId });
}
