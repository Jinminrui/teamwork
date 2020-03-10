import { getTeamInfo } from 'api/team';
import { getAllUsersByTeam } from 'api/user';
import { takeEvery, put } from 'redux-saga/effects';
import { setMemberList, setTeamInfo } from './team.action';

function* setMemberListSaga(action: any) {
  const res = yield getAllUsersByTeam(action.teamId);
  yield put(setMemberList(res.data));
}

function* setTeamInfoSaga(action: any) {
  const res = yield getTeamInfo(action.teamId);
  yield put(setTeamInfo(res.data));
}

export default function* watchTeam() {
  yield takeEvery('SET_MEMBER_LIST_SAGA', setMemberListSaga);
  yield takeEvery('SET_TEAM_INFO_SAGA', setTeamInfoSaga);
}
