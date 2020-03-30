import { SET_PROJECT_LIST, SET_LIST_LOADING, SET_PROJECT_MEMBERS, GET_PROJECT_MEMBERS_SAGA, SET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA } from './actionTypes';


export const setProjectList = (list: any) => ({
  type: SET_PROJECT_LIST,
  data: list,
});

export const setListLoading = (status: boolean) => ({
  type: SET_LIST_LOADING,
  data: status,
});

export const setProjectMembers = (data: any) => ({
  type: SET_PROJECT_MEMBERS,
  data,
});

export const getProjectMembersSagaAction = (data: string) => ({
  type: GET_PROJECT_MEMBERS_SAGA,
  data,
});

export const setProjectDetail = (data: any) => ({
  type: SET_PROJECT_DETAIL,
  data,
});

export const getProjectDetailSagaAction = (data: string) => ({
  type: GET_PROJECT_DETAIL_SAGA,
  data,
});
