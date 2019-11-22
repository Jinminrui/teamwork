import actionTypes from './actionTypes';

export const addUser = (newUser: string) => ({
  type: actionTypes.ADD_USER,
  data: newUser,
});

export const deleteUser = () => ({
  type: actionTypes.DELETE_USER,
});
