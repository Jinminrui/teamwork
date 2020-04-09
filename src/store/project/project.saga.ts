import { getList, getProjectMembers, getProjectDetail } from 'api/project';
import { put, takeEvery } from 'redux-saga/effects';
import {
  GET_PROJECT_LIST_SAGA,
  GET_PROJECT_MEMBERS_SAGA,
  GET_PROJECT_DETAIL_SAGA,
} from './actionTypes';
import {
  setProjectList,
  setListLoading,
  setProjectMembers,
  setProjectDetail,
} from './project.action';

function* getProjectListSaga() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    yield put(setListLoading(true));
    const res = yield getList(userId);
    yield put(setProjectList(res.data));
    yield put(setListLoading(false));
  }
}

function* getProjectMembersSaga(action: any) {
  const projectId = action.data;
  const res = yield getProjectMembers(projectId);
  yield put(setProjectMembers(res.data));
}

function* getProjectDetailSaga(action: any) {
  const userId = localStorage.getItem('userId');
  const projectId = action.data;
  if (userId && projectId) {
    const res = yield getProjectDetail(projectId, userId);
    yield put(setProjectDetail(res.data));
  }
}

export default function* watchPerm() {
  yield takeEvery(GET_PROJECT_LIST_SAGA, getProjectListSaga);
  yield takeEvery(GET_PROJECT_MEMBERS_SAGA, getProjectMembersSaga);
  yield takeEvery(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}
