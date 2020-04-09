import { getSpringList } from 'api/sprint';
import { setClassInfo, setTaskList } from 'store/task/task.action';
import { getTaskClassList, getTaskList } from 'api/task';
import { put, takeEvery } from 'redux-saga/effects';
import { GET_CLASS_INFO_SAGA, GET_TASK_LIST_SAGA, GET_SPRINT_LIST_SAGA } from './actionTypes';
import { setClassInfoLoading, setTaskListLoading, setSprintList } from './task.action';

function* getClassInfoSaga(action: any) {
  const { projectId, type } = action.data;
  yield put(setClassInfoLoading(true));
  const res = yield getTaskClassList(projectId, type);
  yield put(setClassInfo(res.data));
  yield put(setClassInfoLoading(false));
}

function* getTaskListSaga(action: any) {
  const { projectId } = action.data;
  const userId = localStorage.getItem('userId');
  if (userId && projectId) {
    yield put(setTaskListLoading(true));
    const res = yield getTaskList({ ...action.data, userId });
    yield put(setTaskList(res.data));
    yield put(setTaskListLoading(false));
  }
}

function* getSprintListSaga(action: any) {
  const { projectId } = action.data;
  const res = yield getSpringList(projectId);
  yield put(setSprintList(res.data));
}

export default function* watchPerm() {
  yield takeEvery(GET_CLASS_INFO_SAGA, getClassInfoSaga);
  yield takeEvery(GET_TASK_LIST_SAGA, getTaskListSaga);
  yield takeEvery(GET_SPRINT_LIST_SAGA, getSprintListSaga);
}
