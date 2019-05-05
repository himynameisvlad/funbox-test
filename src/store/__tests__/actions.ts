import {
  loadMapRequest,
  loadMapSuccess,
  searchRoutePointRequest,
  searchRoutePointSuccess,
  addRoutePoint,
  swapRoutePoint,
  moveRoutePoint,
  moveRoutePointSuccess,
  deleteRoutePoint,
  requestFail,
  createMap,
  createMapSuccess,
  destroyMap,
  destroyMapSuccess,
  createRoute,
  createRouteSuccess,
  setRoutePoints,
} from '../actions';
import { ActionTypesEnum } from '../actionTypes';

describe('actions', () => {
  const routePointMock = {
    id: '123',
    name: 'name',
    coordinates: [123, 321],
    address: 'address',
  };

  it('loadMapRequest', () => {
    expect(loadMapRequest()).toEqual({
      type: ActionTypesEnum.LOAD_MAP_REQUEST,
    });
  });

  it('loadMapSuccess', () => {
    expect(loadMapSuccess()).toEqual({
      type: ActionTypesEnum.LOAD_MAP_SUCCESS,
    });
  });

  it('createMap', () => {
    const payload = {
      element: {} as HTMLDivElement,
      onWaypointDragEnd: () => () => {}
    };

    expect(createMap(payload)).toEqual({
      type: ActionTypesEnum.CREATE_MAP,
      payload
    });
  });

  it('createMapSuccess', () => {
    const payload = {} as ymaps.Map;

    expect(createMapSuccess(payload)).toEqual({
      type: ActionTypesEnum.CREATE_MAP_SUCCESS,
      payload
    });
  });

  it('destroyMap', () => {
    expect(destroyMap()).toEqual({
      type: ActionTypesEnum.DESTROY_MAP
    });
  });

  it('destroyMapSuccess', () => {
    expect(destroyMapSuccess()).toEqual({
      type: ActionTypesEnum.DESTROY_MAP_SUCCESS
    });
  });

  it('createRoute', () => {
    const payload = () => () => {};

    expect(createRoute(payload)).toEqual({
      type: ActionTypesEnum.CREATE_ROUTE,
      payload
    });
  });

  it('createRouteSuccess', () => {
    const payload = {} as ymaps.multiRouter.MultiRoute;

    expect(createRouteSuccess(payload)).toEqual({
      type: ActionTypesEnum.CREATE_ROUTE_SUCCESS,
      payload
    });
  });

  it('setRoutePoints', () => {
    const payload = [routePointMock];

    expect(setRoutePoints(payload)).toEqual({
      type: ActionTypesEnum.SET_ROUTE_POINTS,
      payload
    });
  });

  it('searchRoutePointRequest', () => {
    const request = 'request';

    expect(searchRoutePointRequest(request)).toEqual({
      type: ActionTypesEnum.SEARCH_ROUTE_POINT_REQUEST,
      payload: request,
    });
  });

  it('searchRoutePointSuccess', () => {
    expect(searchRoutePointSuccess(routePointMock)).toEqual({
      type: ActionTypesEnum.SEARCH_ROUTE_POINT_SUCCESS,
      payload: routePointMock,
    });
  });

  it('addRoutePoint', () => {
    const request = 'request';

    expect(addRoutePoint(request)).toEqual({
      type: ActionTypesEnum.ADD_ROUTE_POINT,
      payload: request,
    });
  });

  it('swapRoutePoint', () => {
    const swapOptions = { from: 1, to: 0 };

    expect(swapRoutePoint(swapOptions)).toEqual({
      type: ActionTypesEnum.SWAP_ROUTE_POINT,
      payload: swapOptions,
    });
  });

  it('moveRoutePoint', () => {
    const newPoint = {} as ymaps.multiRouter.WayPoint;
    const movePointOptions = {
      index: 1,
      newPoint,
    };

    expect(moveRoutePoint(movePointOptions)).toEqual({
      type: ActionTypesEnum.MOVE_ROUTE_POINT,
      payload: movePointOptions,
    });
  });

  it('moveRoutePointSuccess', () => {
    const movePointOptions = {
      index: 1,
      newPoint: routePointMock,
    };

    expect(moveRoutePointSuccess(movePointOptions)).toEqual({
      type: ActionTypesEnum.MOVE_ROUTE_POINT_SUCCESS,
      payload: movePointOptions,
    });
  });

  it('deleteRoutePoint', () => {
    expect(deleteRoutePoint(routePointMock)).toEqual({
      type: ActionTypesEnum.DELETE_ROUTE_POINT,
      payload: routePointMock,
    });
  });

  it('requestFail', () => {
    const error = new Error();

    expect(requestFail(error)).toEqual({
      type: ActionTypesEnum.REQUEST_FAIL,
      payload: error,
    });
  });
});
