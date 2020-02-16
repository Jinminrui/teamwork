import { getUesrInfo } from 'api/user';

import { takeEvery, put } from 'redux-saga/effects';
import { setUserInfo } from './user.action';

function* setUserInfoSaga() {
  const id = localStorage.getItem('userId');
  if (id) {
    const res = yield getUesrInfo(id);
    if (res.code === 200) {
      yield put(setUserInfo(res.data));
    }
  }
}

export default function* watchPerm() {
  yield takeEvery('SET_USER_INFO_SAGA', setUserInfoSaga);
}
