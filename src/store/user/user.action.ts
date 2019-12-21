import actionTypes from './actionTypes';

export const setUserInfo = (userInfo: any) => ({
  type: actionTypes.SET_USER_INFO,
  data: userInfo,
});
