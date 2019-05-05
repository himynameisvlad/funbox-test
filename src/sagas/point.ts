import { all, call, put, takeLatest } from 'redux-saga/effects';
import { moveRoutePointSuccess, requestFail, searchRoutePointSuccess } from 'store/actions';
import {
  ActionTypesEnum,
  IMoveRoutePointAction,
  ISearchRoutePointRequestAction,
} from 'store/actionTypes';
import { geoCoder } from 'utils';

export const searchPointAsync = function*({ payload }: ISearchRoutePointRequestAction) {
  try {
    const routePoint = yield call(geoCoder, payload, { results: 1 });

    yield put(searchRoutePointSuccess(routePoint));
  } catch (error) {
    yield put(requestFail(error));
  }
};

export const movePointAsync = function*({ payload }: IMoveRoutePointAction) {
  try {
    const geometry = payload.newPoint.geometry as ymaps.IPointGeometry;
    const routePoint = yield call(geoCoder, geometry.getCoordinates(), { results: 1 });

    yield put(
      moveRoutePointSuccess({
        newPoint: routePoint,
        index: payload.index,
      })
    );
  } catch (error) {
    yield put(requestFail(error));
  }
};

export const pointWatcher = function*() {
  yield all([
    takeLatest(ActionTypesEnum.SEARCH_ROUTE_POINT_REQUEST, searchPointAsync),
    takeLatest(ActionTypesEnum.MOVE_ROUTE_POINT, movePointAsync),
  ]);
};
