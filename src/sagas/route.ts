import { IFunboxWindow, IRoutePoint } from 'interfaces';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { IAppState } from 'store';
import { createRouteSuccess, requestFail } from 'store/actions';
import {
  ActionTypesEnum,
  ICreateMapSuccessAction,
  ICreateRouteAction,
  ISetRoutePoints,
} from 'store/actionTypes';
import { addBalloonToWaypoint } from 'utils';

declare const window: IFunboxWindow;

export const createRouteAsync = function*({ payload }: ICreateRouteAction) {
  try {
    const route = yield new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [],
        params: {
          results: 1,
        },
      },
      {
        mapStateAutoApply: true,
        boundsAutoApply: true,
      }
    );

    route.editor.start({ editWayPoints: true, addViaPoints: false });
    route.editor.events.add('waypointdragend', payload(route));

    yield put(createRouteSuccess(route));
  } catch (error) {
    yield put(requestFail(error));
  }
};

export const createRouteSuccessAsync = function*({ payload }: ICreateMapSuccessAction) {
  try {
    const map = yield select((state: IAppState) => state.map);

    map.geoObjects.add(payload);
  } catch (error) {
    yield put(requestFail(error));
  }
};

export const setRoutePointsAsync = function*({ payload }: ISetRoutePoints) {
  const route = yield select((state: IAppState) => state.route);
  const routeNames = payload.map((route: IRoutePoint) => route.name);

  route.model.setReferencePoints(routeNames);

  (route.model.events as ymaps.event.Manager).once('requestsuccess', () => {
    route.getWayPoints().each(addBalloonToWaypoint);
  });
};

export const routeWatcher = function*() {
  yield all([
    takeLatest(ActionTypesEnum.CREATE_ROUTE, createRouteAsync),
    takeLatest(ActionTypesEnum.CREATE_ROUTE_SUCCESS, createRouteSuccessAsync),
    takeLatest(ActionTypesEnum.SET_ROUTE_POINTS, setRoutePointsAsync),
  ]);
};
