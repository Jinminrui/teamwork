import actionTypes from './actionTypes';

export interface UserState {
  [index: string]: any;
  pkId: string;
  username: string;
  email?: string;
  phone?: string;
  gender?: number;
  avatar?: string;
  role?: number;
  teams: Array<string>;
  position?: string;
  description?: string;
  createTime?: string;
  wxName?: string;
}

const defaultState: UserState = {
  pkId: '',
  username: '',
  email: '',
  phone: '',
  gender: 0,
  avatar: '',
  role: 1,
  teams: [],
  position: '',
  description: '',
  wxName: '',
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
