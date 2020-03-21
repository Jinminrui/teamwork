import { get, post } from './request';

export interface CreateProjectParams {
  name: string;
  id: string;
  creatorId: string;
  teamId: string;
  cover: string;
  description: string;
}

export function create(params: CreateProjectParams) {
  return post('/project-center/project/create', params);
}

export function getList(userId: string) {
  return get(`/project-center/project/list/${userId}`);
}

export function deleteProject(id: string) {
  return post(`/project-center/project/delete/${id}`);
}
