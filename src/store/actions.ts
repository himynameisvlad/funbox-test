import { IMovePointRequest, IOnWaypointDragEnd, IRoutePoint } from 'interfaces';
import { ActionTypes, ActionTypesEnum } from './actionTypes';

export const loadMapRequest = () => {
  return {
    type: ActionTypesEnum.LOAD_MAP_REQUEST,
  };
};

export const loadMapSuccess = () => {
  return {
    type: ActionTypesEnum.LOAD_MAP_SUCCESS,
  };
};

export const createMap = (payload: {
  element: HTMLDivElement;
  onWaypointDragEnd: IOnWaypointDragEnd;
}) => {
  return {
    type: ActionTypesEnum.CREATE_MAP,
    payload,
  };
};

export const createMapSuccess = (map: ymaps.Map) => {
  return {
    type: ActionTypesEnum.CREATE_MAP_SUCCESS,
    payload: map,
  };
};

export const destroyMap = () => {
  return {
    type: ActionTypesEnum.DESTROY_MAP,
  };
};

export const destroyMapSuccess = () => {
  return {
    type: ActionTypesEnum.DESTROY_MAP_SUCCESS,
  };
};

export const createRoute = (onWaypointDragEnd: IOnWaypointDragEnd) => {
  return {
    type: ActionTypesEnum.CREATE_ROUTE,
    payload: onWaypointDragEnd,
  };
};

export const createRouteSuccess = (route: ymaps.multiRouter.MultiRoute) => {
  return {
    type: ActionTypesEnum.CREATE_ROUTE_SUCCESS,
    payload: route,
  };
};

export const setRoutePoints = (routePoints: IRoutePoint[]) => {
  return {
    type: ActionTypesEnum.SET_ROUTE_POINTS,
    payload: routePoints,
  };
};

export const searchRoutePointRequest = (routeName: string): ActionTypes => {
  return {
    type: ActionTypesEnum.SEARCH_ROUTE_POINT_REQUEST,
    payload: routeName,
  };
};

export const searchRoutePointSuccess = (routePoint: IRoutePoint) => {
  return {
    type: ActionTypesEnum.SEARCH_ROUTE_POINT_SUCCESS,
    payload: routePoint,
  };
};

export const addRoutePoint = (routeName: string) => {
  return {
    type: ActionTypesEnum.ADD_ROUTE_POINT,
    payload: routeName,
  };
};

export const swapRoutePoint = (payload: { from: number; to: number }) => {
  return {
    type: ActionTypesEnum.SWAP_ROUTE_POINT,
    payload,
  };
};

export const moveRoutePoint = (payload: IMovePointRequest) => {
  return {
    type: ActionTypesEnum.MOVE_ROUTE_POINT,
    payload,
  };
};

export const moveRoutePointSuccess = (payload: {
  index: number;
  newPoint: IRoutePoint;
}): ActionTypes => {
  return {
    type: ActionTypesEnum.MOVE_ROUTE_POINT_SUCCESS,
    payload,
  };
};

export const deleteRoutePoint = (routePoint: IRoutePoint) => {
  return {
    type: ActionTypesEnum.DELETE_ROUTE_POINT,
    payload: routePoint,
  };
};

export const requestFail = (error: Error) => {
  return {
    type: ActionTypesEnum.REQUEST_FAIL,
    payload: error,
  };
};
