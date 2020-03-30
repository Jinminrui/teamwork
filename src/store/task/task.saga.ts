import { setClassInfo, setTaskList } from 'store/task/task.action';
import { getTaskClassList, getTaskList } from 'api/task';
import { put, takeEvery } from 'redux-saga/effects';
import { GET_CLASS_INFO_SAGA, GET_TASK_LIST_SAGA } from './actionTypes';
import { setClassInfoLoading, setTaskListLoading } from './task.action';

function* getClassInfoSaga(action: any) {
  const { projectId, type } = action.data;
  yield put(setClassInfoLoading(true));
  const res = yield getTaskClassList(projectId, type);
  yield put(setClassInfo(res.data));
  yield put(setClassInfoLoading(false));
}

function* getTaskListSaga(action: any) {
  const { projectId, type, taskClass } = action.data;
  yield put(setTaskListLoading(true));
  const res = yield getTaskList({ projectId, type, taskClass });
  yield put(setTaskList(res.data));
  yield put(setTaskListLoading(false));
}

export default function* watchPerm() {
  yield takeEvery(GET_CLASS_INFO_SAGA, getClassInfoSaga);
  yield takeEvery(GET_TASK_LIST_SAGA, getTaskListSaga);
}
