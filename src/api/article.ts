import { get } from './request';

export interface GetArticleListParams {
  userId?: number;
  teamId?: number;
  pageNum?: number;
  pageSize: number;
}

export function getArticleList(params?: GetArticleListParams) {
  return get('/article/list', params);
}
