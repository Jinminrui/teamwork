import actionTypes from './actionTypes';

export interface UserState {
  userList: Array<string>;
}

const defaultState: UserState = {
  userList: [],
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      const newList: Array<string> = [...state.userList];
      newList.push(action.data);
      return { ...state, userList: newList };
    default:
      return state;
  }
};
