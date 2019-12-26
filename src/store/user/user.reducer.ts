import actionTypes from './actionTypes';

export interface UserState {
  id: number | undefined;
  username: string;
  email: string;
  phone: string;
  gender: number;
  avatarUrl: string;
  role: number | undefined;
  teamId: number | undefined;
  position: string;
  description: string;
  createTime: string;
}

const defaultState: UserState = {
  id: undefined,
  username: '',
  email: '',
  phone: '',
  gender: 0,
  avatarUrl: '',
  role: undefined,
  teamId: undefined,
  position: '',
  description: '',
  createTime: '',
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return { ...defaultState, ...action.data };
    default:
      return state;
  }
};
