import { all } from 'redux-saga/effects';
import { requestFailWatcher } from './error';
import { mapWatcher } from './map';
import { pointWatcher } from './point';
import { routeWatcher } from './route';

export const rootSaga = function*() {
  yield all([pointWatcher(), mapWatcher(), requestFailWatcher(), routeWatcher()]);
};
