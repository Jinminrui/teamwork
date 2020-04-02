import { SET_PROJECT_LIST, SET_LIST_LOADING, SET_PROJECT_MEMBERS, SET_PROJECT_DETAIL } from './actionTypes';

export interface ProjectListItem {
  pkId: string;
  id: string;
  name: string;
  description: string;
  cover: string;
  status: number;
  currentRole: number;
}

export interface ProjectState {
  list: Array<ProjectListItem>;
  listLoading: boolean;
  members: Array<any>;
  detail?: ProjectListItem;
}

const defaultState: ProjectState = {
  list: [],
  listLoading: false,
  members: [],
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_PROJECT_LIST:
      return { ...state, list: action.data };
    case SET_LIST_LOADING:
      return { ...state, listLoading: action.data };
    case SET_PROJECT_MEMBERS:
      return { ...state, members: action.data };
    case SET_PROJECT_DETAIL:
      return { ...state, detail: action.data };
    default:
      return state;
  }
};
