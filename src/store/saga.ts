import { all, fork } from 'redux-saga/effects';
import user from './user/user.saga';
import team from './team/team.saga';
import message from './message/message.saga';
import project from './project/project.saga';
import task from './task/task.saga';

function* rootSaga() {
  yield all([fork(user), fork(team), fork(message), fork(project), fork(task)]);
}

export default rootSaga;
