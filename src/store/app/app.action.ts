import actionTypes from './actionTypes';

export const setScreenWidth = (newStatus: number) => ({
  type: actionTypes.SET_SCREEN_WIDTH,
  data: newStatus,
});
