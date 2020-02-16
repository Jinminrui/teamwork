import { all, fork } from 'redux-saga/effects';
import user from './user/user.saga';
import team from './team/team.saga';
import websocket from './websocket/websocket.saga';

function* rootSaga() {
  yield all([fork(user), fork(team), fork(websocket)]);
}

export default rootSaga;
