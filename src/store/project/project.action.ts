import { SET_PROJECT_LIST, SET_LIST_LOADING } from './actionTypes';


export const setProjectList = (list: any) => ({
  type: SET_PROJECT_LIST,
  data: list,
});

export const setListLoading = (status: boolean) => ({
  type: SET_LIST_LOADING,
  data: status,
});
