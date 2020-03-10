import { getUesrInfo } from 'api/user';
import { takeEvery, put } from 'redux-saga/effects';
import { setTeamId } from 'store/team/team.action';
import { setUserInfo } from './user.action';

function* setUserInfoSaga() {
  const id = localStorage.getItem('userId');
  if (id) {
    const res = yield getUesrInfo(id);
    yield put(setUserInfo(res.data));
    if (res.data.teams.length !== 0) {
      yield put(setTeamId(res.data.teams[0]));
      yield put({ type: 'SET_TEAM_INFO_SAGA', teamId: res.data.teams[0] });
    }
  }
}

export default function* watchPerm() {
  yield takeEvery('SET_USER_INFO_SAGA', setUserInfoSaga);
}
