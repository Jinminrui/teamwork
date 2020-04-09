import { get, post } from './request';

interface CreateTaskClassParams {
  projectId: string;
  type: number;
  name: string;
  description: string;
}

export interface GetTaskListParams {
  userId: string;
  projectId?: string;
  type?: number;
  taskClass?: string;
  stage?: string;
  creatorId?: string;
  executor?: string;
  sprint?: string;
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

const TASKCLASS = '/project-center/taskclass';
const TASK = '/project-center/task';

export function createTaskClass(params: any) {
  return post(`${TASKCLASS}/create`, params);
}

export function getTaskClassList(projectId: string, type: number) {
  return get(`${TASKCLASS}/list/${projectId}/${type}`);
}

export function getTaskList(params: GetTaskListParams) {
  return get(`${TASK}/list`, params);
}

export function deleteTaskClass(id: string) {
  return post(`${TASKCLASS}/delete/${id}`);
}

export function updateTaskClass(params: UpdateTaskClassParams) {
  return post(`${TASKCLASS}/update`, params);
}

export function createTask(params: CreateTaskParams) {
  return post(`${TASK}/create`, params);
}

export function getTaskDetail(id: string) {
  return get(`${TASK}/${id}`);
}

export function updateTask(params: any) {
  return post(`${TASK}/update`, params);
}

export function deleteTask(id: string) {
  return post(`${TASK}/delete/${id}`);
}

export function analyseTask(projectId: string, stage?: string) {
  return get(`${TASK}/analyseTaskByExecutor`, { projectId, stage });
}

export function analyseFinishedTaskByMember(projectId: string) {
  return get(`${TASK}/analyseFinishedTaskByMember`, { projectId });
}
