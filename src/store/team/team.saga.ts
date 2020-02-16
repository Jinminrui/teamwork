import { getAllUsersByTeam } from 'api/user';
import { takeEvery, put } from 'redux-saga/effects';
import { setMemberList } from './team.action';

function* setMemberListSaga(action: any) {
  const res = yield getAllUsersByTeam(action.teamId);
  yield put(setMemberList(res.data));
}

export default function* watchTeam() {
  yield takeEvery('SET_MEMBER_LIST_SAGA', setMemberListSaga);
}
