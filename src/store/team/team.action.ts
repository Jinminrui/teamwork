
import actionTypes from './actionTypes';
import { TeamInfo } from './team.reducer';

export const setMemberList = (list: any) => ({
  type: actionTypes.SET_MEMBER_LIST,
  data: list,
});

export const setTeamId = (id: string) => ({
  type: actionTypes.SET_TEAM_ID,
  data: id,
});

export const setTeamInfo = (data: TeamInfo) => ({
  type: actionTypes.SET_TEAM_INFO,
  data,
});
