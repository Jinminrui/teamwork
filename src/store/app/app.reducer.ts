import actionTypes from './actionTypes';

export interface AppState {
  loading: boolean;
}

const defaultState: AppState = {
  loading: false,
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.data };
    default:
      return state;
  }
};
