import { get } from './request';

export interface GetProjectListParams {
  userId?: number | undefined;
  teamId?: number | undefined;
}

export function getProjectList(params?: GetProjectListParams) {
  return get('/project/list', params);
}
