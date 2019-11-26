import actionTypes from './actionTypes';

export const setLoading = (newStatus: boolean) => ({
  type: actionTypes.SET_LOADING,
  data: newStatus,
});
