import { YANDEX_MAP_URL, YANDEX_MAPS_KEY } from 'config';
import { IFunboxWindow } from 'interfaces';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { IAppState } from 'store';
import {
  createMapSuccess,
  createRoute,
  destroyMapSuccess,
  loadMapSuccess,
  requestFail,
} from 'store/actions';
import { ActionTypesEnum, ICreateMapAction } from 'store/actionTypes';
import { mapLoader } from 'utils';

declare const window: IFunboxWindow;

export const loadMapAsync = function*() {
  try {
    yield call(mapLoader, { apiKey: YANDEX_MAPS_KEY, apiUrl: YANDEX_MAP_URL });
    yield put(loadMapSuccess());
  } catch (error) {
    yield put(requestFail(error));
  }
};

export const createMapAsync = function*({ payload }: ICreateMapAction) {
  try {
    const map = yield new window.ymaps.Map(payload.element, {
      center: [55.755, 37.617],
      zoom: 6,
      controls: ['zoomControl'],
    });

    yield put(createMapSuccess(map));
    yield put(createRoute(payload.onWaypointDragEnd));
  } catch (error) {
    yield put(requestFail(error));
  }
};

export const destroyMapAsync = function*() {
  const map = yield select((state: IAppState) => state.map);
  const route = yield select((state: IAppState) => state.route);

  yield route.editor.stop();
  yield map.destroy();
  yield put(destroyMapSuccess());
};

export const mapWatcher = function*() {
  yield all([
    takeLatest(ActionTypesEnum.LOAD_MAP_REQUEST, loadMapAsync),
    takeLatest(ActionTypesEnum.CREATE_MAP, createMapAsync),
  ]);
};
