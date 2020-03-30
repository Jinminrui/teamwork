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

export function update(params: any) {
  return post('/project-center/project/update', params);
}

export function getList(userId: string) {
  return get(`/project-center/project/list/${userId}`);
}

export function deleteProject(id: string) {
  return post(`/project-center/project/delete/${id}`);
}

export function getProjectMembers(projectId: string) {
  return get(`/project-center/project/${projectId}/members`);
}

export function getProjectDetail(projectId: string) {
  return get(`/project-center/project/${projectId}`);
}
