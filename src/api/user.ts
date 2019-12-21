import { post, get } from './request';

interface LoginParams {
  username: string;
  password: string;
}

export function login(params: LoginParams) {
  return post('/user/login', params);
}

export function getUesrInfo() {
  return get('/user/info');
}
