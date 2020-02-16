import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import appReducer from './app/app.reducer';
import teamReducer from './team/team.reducer';

export default combineReducers({
  user: userReducer,
  app: appReducer,
  team: teamReducer,
});
