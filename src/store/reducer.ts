import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import appReducer from './app/app.reducer';
import teamReducer from './team/team.reducer';
import messageReducer from './message/message.reducer';
import projectReducer from './project/project.reducer';

export default combineReducers({
  user: userReducer,
  app: appReducer,
  team: teamReducer,
  message: messageReducer,
  project: projectReducer,
});
