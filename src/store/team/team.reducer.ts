import { UserState } from 'store/user/user.reducer';
import actionTypes from './actionTypes';

export interface TeamInfo {
  pkId: string;
  name: string;
  description: string;
  creatorId: string;
  createTime: string;
  updateTime: string;
  currentRole: number;
}

export interface TeamState {
  teamInfo?: TeamInfo;
  memberList: Array<UserState>;
  teamId?: string;
}

const defaultState: TeamState = {
  memberList: [],
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_MEMBER_LIST:
      return { ...state, memberList: action.data };
    case actionTypes.SET_TEAM_ID:
      return { ...state, teamId: action.data };
    case actionTypes.SET_TEAM_INFO:
      return { ...state, teamInfo: action.data };
    default:
      return state;
  }
};
