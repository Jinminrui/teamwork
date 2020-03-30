import { get, post } from './request';

interface CreateTaskClassParams {
  projectId: string;
  type: number;
  name: string;
  description: string;
}

export interface GetTaskListParams {
  projectId: string;
  type: number;
  taskClass?: string;
  stage?: string;
}

interface UpdateTaskClassParams {
  pkId: string;
  name: string;
  description: string;
}

export interface CreateTaskParams {
  title: string;
  note?: string;
  type: number;
  stage: string;
  startTime?: string;
  endTime?: string;
  projectId: string;
  executor?: string;
  storyPoints?: number;
  priority: number;
  sprint?: string;
  taskClass: string;
  creatorId: string;
}

export function createTaskClass(params: any) {
  return post('/project-center/taskclass/create', params);
}

export function getTaskClassList(projectId: string, type: number) {
  return get(`/project-center/taskclass/list/${projectId}/${type}`);
}

export function getTaskList(params: GetTaskListParams) {
  return get('/project-center/task/list', params);
}

export function deleteTaskClass(id: string) {
  return post(`/project-center/taskclass/delete/${id}`);
}

export function updateTaskClass(params: UpdateTaskClassParams) {
  return post('/project-center/taskclass/update', params);
}

export function createTask(params: CreateTaskParams) {
  return post('/project-center/task/create', params);
}

export function getTaskDetail(id: string) {
  return get(`/project-center/task/${id}`);
}

export function updateTask(params: any) {
  return post('/project-center/task/update', params);
}
