import actionTypes from './actionTypes';

export const setMemberList = (list: any) => ({
  type: actionTypes.SET_MEMBER_LIST,
  data: list,
});
