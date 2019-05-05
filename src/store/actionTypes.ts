import { IMovePointRequest, IOnWaypointDragEnd, IRoutePoint } from 'interfaces';

export enum ActionTypesEnum {
  LOAD_MAP_REQUEST = 'LOAD_MAP_REQUEST',
  LOAD_MAP_SUCCESS = 'LOAD_MAP_SUCCESS',
  CREATE_MAP = 'CREATE_MAP',
  CREATE_MAP_SUCCESS = 'CREATE_MAP_SUCCESS',
  DESTROY_MAP = 'DESTROY_MAP',
  DESTROY_MAP_SUCCESS = 'DESTROY_MAP_SUCCESS',
  CREATE_ROUTE = 'CREATE_ROUTE',
  CREATE_ROUTE_SUCCESS = 'CREATE_ROUTE_SUCCESS',
  SET_ROUTE_POINTS = 'SET_ROUTE_POINTS',
  ADD_ROUTE_POINT = 'ADD_ROUTE_POINT',
  SWAP_ROUTE_POINT = 'SWAP_ROUTE_POINT',
  MOVE_ROUTE_POINT = 'MOVE_ROUTE_POINT',
  MOVE_ROUTE_POINT_SUCCESS = 'MOVE_ROUTE_POINT_SUCCESS',
  DELETE_ROUTE_POINT = 'DELETE_ROUTE_POINT',
  SEARCH_ROUTE_POINT_REQUEST = 'SEARCH_ROUTE_POINT_REQUEST',
  SEARCH_ROUTE_POINT_SUCCESS = 'SEARCH_ROUTE_POINT_SUCCESS',
  REQUEST_FAIL = 'REQUEST_FAIL',
}

export interface ILoadMapRequestAction {
  type: ActionTypesEnum.LOAD_MAP_REQUEST;
}

export interface ILoadMapSuccessAction {
  type: ActionTypesEnum.LOAD_MAP_SUCCESS;
}

export interface ICreateMapAction {
  type: ActionTypesEnum.CREATE_MAP;
  payload: {
    element: HTMLDivElement;
    onWaypointDragEnd: IOnWaypointDragEnd;
  };
}

export interface IDestroyMapAction {
  type: ActionTypesEnum.DESTROY_MAP;
}

export interface IDestroyMapSuccessAction {
  type: ActionTypesEnum.DESTROY_MAP_SUCCESS;
}

export interface ICreateMapSuccessAction {
  type: ActionTypesEnum.CREATE_MAP_SUCCESS;
  payload: ymaps.Map;
}

export interface ICreateRouteAction {
  type: ActionTypesEnum.CREATE_ROUTE;
  payload: IOnWaypointDragEnd;
}

export interface ICreateRouteSuccessAction {
  type: ActionTypesEnum.CREATE_ROUTE_SUCCESS;
  payload: ymaps.multiRouter.MultiRoute;
}

export interface ISetRoutePoints {
  type: ActionTypesEnum.SET_ROUTE_POINTS;
  payload: IRoutePoint[];
}

export interface ISearchRoutePointRequestAction {
  type: ActionTypesEnum.SEARCH_ROUTE_POINT_REQUEST;
  payload: string;
}

export interface ISearchRoutePointSuccessAction {
  type: ActionTypesEnum.SEARCH_ROUTE_POINT_SUCCESS;
  payload: IRoutePoint;
}

export interface IAddRoutePointAction {
  type: ActionTypesEnum.ADD_ROUTE_POINT;
  payload: string;
}

export interface ISwapRoutePointAction {
  type: ActionTypesEnum.SWAP_ROUTE_POINT;
  payload: { from: number; to: number };
}

export interface IMoveRoutePointAction {
  type: ActionTypesEnum.MOVE_ROUTE_POINT;
  payload: IMovePointRequest;
}

export interface IMoveRoutePointSuccessAction {
  type: ActionTypesEnum.MOVE_ROUTE_POINT_SUCCESS;
  payload: { index: number; newPoint: IRoutePoint };
}

export interface IDeleteRoutePointAction {
  type: ActionTypesEnum.DELETE_ROUTE_POINT;
  payload: IRoutePoint;
}

export interface IRequestFail {
  type: ActionTypesEnum.REQUEST_FAIL;
  payload: Error;
}

export type ActionTypes =
  | ILoadMapRequestAction
  | ILoadMapSuccessAction
  | ICreateMapAction
  | ICreateMapSuccessAction
  | IDestroyMapAction
  | IDestroyMapSuccessAction
  | ICreateRouteAction
  | ICreateRouteSuccessAction
  | ISetRoutePoints
  | ISearchRoutePointRequestAction
  | ISearchRoutePointSuccessAction
  | IAddRoutePointAction
  | ISwapRoutePointAction
  | IMoveRoutePointAction
  | IMoveRoutePointSuccessAction
  | IDeleteRoutePointAction
  | IRequestFail;
