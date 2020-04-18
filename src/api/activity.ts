import { get } from './request';

export interface GetActivityListParams {
  teamId: string;
  projectId?: string;
}

export function getActivityList(params: GetActivityListParams) {
  return get('/project-center/activity/list', params);
}
