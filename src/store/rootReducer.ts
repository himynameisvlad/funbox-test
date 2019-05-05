import { IAppState } from 'store';
import { moveArrayItem } from 'utils';
import { ActionTypes, ActionTypesEnum } from './actionTypes';

const initialState: IAppState = {
  routePoints: [],
  isMapScriptLoaded: false,
  map: null,
  route: null,
};

export const rootReducer = (state = initialState, action: ActionTypes): IAppState => {
  switch (action.type) {
    case ActionTypesEnum.LOAD_MAP_SUCCESS:
      return {
        ...state,
        isMapScriptLoaded: true,
      };

    case ActionTypesEnum.CREATE_MAP_SUCCESS:
      return {
        ...state,
        map: action.payload,
      };

    case ActionTypesEnum.DESTROY_MAP_SUCCESS:
      return {
        ...state,
        map: null,
        route: null,
      };

    case ActionTypesEnum.CREATE_ROUTE_SUCCESS:
      return {
        ...state,
        route: action.payload,
      };

    case ActionTypesEnum.SEARCH_ROUTE_POINT_SUCCESS:
      return {
        ...state,
        routePoints: [...state.routePoints, action.payload],
      };

    case ActionTypesEnum.SWAP_ROUTE_POINT:
      return {
        ...state,
        routePoints: moveArrayItem(state.routePoints, action.payload.from, action.payload.to),
      };

    case ActionTypesEnum.MOVE_ROUTE_POINT_SUCCESS:
      state.routePoints[action.payload.index] = action.payload.newPoint;
      return {
        ...state,
        routePoints: [...state.routePoints],
      };

    case ActionTypesEnum.DELETE_ROUTE_POINT:
      return {
        ...state,
        routePoints: state.routePoints.filter(point => point.id !== action.payload.id),
      };

    default:
      return state;
  }
};
