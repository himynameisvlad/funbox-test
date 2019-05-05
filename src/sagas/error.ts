import { call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import { ActionTypesEnum, IRequestFail } from 'store/actionTypes';

export const requestFailAsync = function*({ payload }: IRequestFail) {
  if (payload && payload instanceof Error) {
    const errorMessage = payload.message;

    yield call(alert, errorMessage);
  }
};

export const requestFailWatcher = function*() {
  yield takeEvery(ActionTypesEnum.REQUEST_FAIL, requestFailAsync);
};
