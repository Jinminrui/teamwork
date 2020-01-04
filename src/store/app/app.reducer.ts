import actionTypes from './actionTypes';

export interface AppState {
  screenWidth: number;
}

const defaultState: AppState = {
  screenWidth: window.document.documentElement.getBoundingClientRect().width,
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_SCREEN_WIDTH:
      return { ...state, screenWidth: action.data };
    default:
      return state;
  }
};
