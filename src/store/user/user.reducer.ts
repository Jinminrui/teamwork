import actionTypes from './actionTypes';

export interface TeamInfo {
  pkId: string;
  name: string;
  description: string;
  creatorId: string;
  createTime: string;
  updateTime: string;
}

export interface UserState {
  [index: string]: any;
  pkId?: string;
  username?: string;
  email?: string;
  phone?: string;
  gender?: number;
  avatar?: string;
  role?: number;
  team?: TeamInfo;
  position?: string;
  description?: string;
  createTime?: string;
  hasPassword?: boolean;
}

const defaultState: UserState = {};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return { ...defaultState, ...action.data };
    default:
      return state;
  }
};
