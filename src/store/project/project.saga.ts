import { getList } from 'api/project';
import { put, takeEvery } from 'redux-saga/effects';
import { GET_PROJECT_LIST_SAGA } from './actionTypes';
import { setProjectList, setListLoading } from './project.action';

function* getProjectListSaga() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    yield put(setListLoading(true));
    const res = yield getList(userId);
    yield put(setProjectList(res.data));
    yield put(setListLoading(false));
  }
}

export default function* watchPerm() {
  yield takeEvery(GET_PROJECT_LIST_SAGA, getProjectListSaga);
}
