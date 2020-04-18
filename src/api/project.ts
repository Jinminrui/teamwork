import { get, post } from './request';

export interface CreateProjectParams {
  name: string;
  id: string;
  creatorId: string;
  teamId: string;
  cover: string;
  description: string;
}

export interface InviteParams {
  userId: string;
  projectId: string;
}

export interface DeleteProjectParams {
  projectId: string;
  operatorId: string;
  teamId: string;
  projectName: string;
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

export function deleteProject(params: DeleteProjectParams) {
  return post('/project-center/project/delete/', params);
}

export function getProjectMembers(projectId: string) {
  return get(`/project-center/project/${projectId}/members`);
}

export function getProjectDetail(projectId: string, userId: string) {
  return get(`/project-center/project/${projectId}/${userId}`);
}

export function inviteProjectMember(params: InviteParams) {
  return post('/project-center/project/invite', params);
}
