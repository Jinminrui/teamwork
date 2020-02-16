import { UserState } from 'store/user/user.reducer';
import actionTypes from './actionTypes';

export interface TeamState {
  memberList: Array<UserState>;
}

const defaultState: TeamState = {
  memberList: [],
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_MEMBER_LIST:
      return { ...defaultState, memberList: action.data };
    default:
      return state;
  }
};
