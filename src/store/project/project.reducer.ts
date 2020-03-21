import { SET_PROJECT_LIST, SET_LIST_LOADING } from './actionTypes';

export interface ProjectListItem {
  pkId: string;
  id: string;
  name: string;
  description: string;
  cover: string;
}

export interface ProjectState {
  list: Array<ProjectListItem>;
  listLoading: boolean;
}

const defaultState: ProjectState = {
  list: [],
  listLoading: false,
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_PROJECT_LIST:
      return { ...state, list: action.data };
    case SET_LIST_LOADING:
      return { ...state, listLoading: action.data };
    default:
      return state;
  }
};
