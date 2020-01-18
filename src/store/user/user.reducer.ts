import actionTypes from './actionTypes';

export interface UserState {
  [index: string]: any;
  pkId?: number;
  username?: string;
  email?: string;
  phone?: string;
  gender?: number;
  avatar?: string;
  role?: number;
  teamId?: number;
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
