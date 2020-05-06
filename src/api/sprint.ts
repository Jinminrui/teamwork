import { post, get } from './request';

export interface CreateSprintParams{
  title: string;
  director?: string;
  startTime?: string;
  endTime?: string;
  projectId: string;
  description?: string;
}

export interface UpdateSprintParams {
  [index: string]: any;
  pkId: string;
  title?: string;
  director?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
}

export interface StartSprintParams {
  pkId: string;
  startTime: string;
  endTime: string;
}


export function createSprint(params: CreateSprintParams) {
  return post('/project-center/sprint/create', params);
}

export function getSpringList(projectId: string) {
  return get('/project-center/sprint/list', { projectId });
}

export function getSprintDetail(id: string) {
  return get(`/project-center/sprint/${id}`);
}

export function updateSprint(params: UpdateSprintParams) {
  return post('/project-center/sprint/update', params);
}

export function deleteSprint(id: string) {
  return post(`/project-center/sprint/delete/${id}`);
}

export function startSprint(params: StartSprintParams) {
  return post('/project-center/sprint/start', params);
}

export function completeSprint(id: string) {
  return post(`/project-center/sprint/${id}/complete`);
}

export function getFinishedSprints(projectId: string) {
  return get('/project-center/sprint/list/finished', { projectId });
}
