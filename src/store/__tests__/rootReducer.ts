import { rootReducer } from '../rootReducer';
import { ActionTypesEnum, ActionTypes } from '../actionTypes';

jest.mock('utils', () => ({
  moveArrayItem: jest.fn(() => [1, 2, 3]),
}));

describe('rootReducer', () => {
  const routePointMock = {
    id: '123',
    name: 'name',
    coordinates: [123, 321],
    address: 'address',
  };
  const routePointsMock = [{ ...routePointMock }, { ...routePointMock, id: '234' }];
  const initialState = {
    routePoints: [],
    isMapScriptLoaded: false,
    map: null,
    route: null,
  };

  it('returns default state', () => {
    expect(rootReducer(undefined, { type: null })).toEqual(initialState);
  });

  it('handles LOAD_MAP_SUCCESS', () => {
    expect(rootReducer({ ...initialState }, { type: ActionTypesEnum.LOAD_MAP_SUCCESS })).toEqual({
      ...initialState,
      isMapScriptLoaded: true,
    });
  });

  it('handles CREATE_MAP_SUCCESS', () => {
    const map = {} as ymaps.Map;

    expect(
      rootReducer({ ...initialState }, { type: ActionTypesEnum.CREATE_MAP_SUCCESS, payload: map })
    ).toEqual({
      ...initialState,
      map,
    });
  });

  it('handles DESTROY_MAP_SUCCESS', () => {
    expect(
      rootReducer(
        { ...initialState, map: {} as ymaps.Map, route: {} as ymaps.multiRouter.MultiRoute },
        { type: ActionTypesEnum.DESTROY_MAP_SUCCESS }
      )
    ).toEqual({
      ...initialState,
      map: null,
      route: null,
    });
  });

  it('handles CREATE_ROUTE_SUCCESS', () => {
    const route = {} as ymaps.multiRouter.MultiRoute;

    expect(
      rootReducer(
        { ...initialState },
        { type: ActionTypesEnum.CREATE_ROUTE_SUCCESS, payload: route }
      )
    ).toEqual({
      ...initialState,
      route: route,
    });
  });

  it('handles SEARCH_ROUTE_POINT_SUCCESS', () => {
    const action = {
      type: ActionTypesEnum.SEARCH_ROUTE_POINT_SUCCESS,
      payload: { ...routePointMock, id: '345' },
    };

    expect(
      rootReducer(
        { ...initialState, routePoints: routePointsMock, isMapScriptLoaded: true },
        action as ActionTypes
      )
    ).toEqual({
      ...initialState,
      routePoints: [
        {
          id: '123',
          name: 'name',
          coordinates: [123, 321],
          address: 'address',
        },
        {
          id: '234',
          name: 'name',
          coordinates: [123, 321],
          address: 'address',
        },
        {
          id: '345',
          name: 'name',
          coordinates: [123, 321],
          address: 'address',
        },
      ],
      isMapScriptLoaded: true,
    });
  });

  it('handles SWAP_ROUTE_POINT', () => {
    expect(
      rootReducer(
        { ...initialState, routePoints: routePointsMock },
        { type: ActionTypesEnum.SWAP_ROUTE_POINT, payload: { from: 1, to: 2 } }
      )
    ).toEqual({
      ...initialState,
      routePoints: [1, 2, 3],
    });
  });

  it('handles MOVE_ROUTE_POINT_SUCCESS', () => {
    expect(
      rootReducer(
        { ...initialState, routePoints: routePointsMock },
        {
          type: ActionTypesEnum.MOVE_ROUTE_POINT_SUCCESS,
          payload: { index: 1, newPoint: { ...routePointMock, id: '567' } },
        }
      )
    ).toEqual({
      ...initialState,
      routePoints: [
        {
          id: '123',
          name: 'name',
          coordinates: [123, 321],
          address: 'address',
        },
        {
          id: '567',
          name: 'name',
          coordinates: [123, 321],
          address: 'address',
        },
      ],
    });
  });

  it('handles DELETE_ROUTE_POINT', () => {
    expect(
      rootReducer(
        { ...initialState, routePoints: routePointsMock },
        { type: ActionTypesEnum.DELETE_ROUTE_POINT, payload: routePointMock }
      )
    ).toEqual({
      ...initialState,
      routePoints: [
        {
          id: '567',
          name: 'name',
          coordinates: [123, 321],
          address: 'address',
        },
      ],
    });
  });
});
