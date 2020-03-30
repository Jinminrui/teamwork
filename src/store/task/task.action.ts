import { GetTaskListParams } from 'api/task';
import { CreateTaskProps, ViewTaskProps } from './task.reducer';
import {
  SET_CLASS_INFO,
  SET_CREATE_TASK_PROPS,
  SET_VIEW_TASK_PROPS,
  SET_CLASS_INFO_LOADING,
  GET_CLASS_INFO_SAGA,
  SET_TASK_LIST,
  SET_TASK_LIST_LOADING,
  GET_TASK_LIST_SAGA,
} from './actionTypes';

export const setClassInfo = (data: any) => ({
  type: SET_CLASS_INFO,
  data,
});

export const setCreateTaskProps = (data: CreateTaskProps) => ({
  type: SET_CREATE_TASK_PROPS,
  data,
});

export const setViewTaskProps = (data: ViewTaskProps) => ({
  type: SET_VIEW_TASK_PROPS,
  data,
});

export const setClassInfoLoading = (data: boolean) => ({
  type: SET_CLASS_INFO_LOADING,
  data,
});

export const getClassInfoSagaAction = (data: any) => ({
  type: GET_CLASS_INFO_SAGA,
  data,
});

export const setTaskList = (data: any) => ({
  type: SET_TASK_LIST,
  data,
});

export const setTaskListLoading = (data: boolean) => ({
  type: SET_TASK_LIST_LOADING,
  data,
});

export const getTaskListSagaAction = (data: GetTaskListParams) => ({
  type: GET_TASK_LIST_SAGA,
  data,
});
