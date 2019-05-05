import { requestFailAsync } from '../error';
import { loadMapAsync, createMapAsync } from '../map';
import { createRouteAsync, createRouteSuccessAsync, setRoutePointsAsync } from '../route';
import { searchPointAsync, movePointAsync } from '../point';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  loadMapSuccess,
  requestFail,
  searchRoutePointSuccess,
  moveRoutePointSuccess,
  createRouteSuccess,
  createMapSuccess,
  createRoute,
} from 'store/actions';
import * as utils from 'utils';
import { throwError } from 'redux-saga-test-plan/providers';
import { addBalloonToWaypoint } from 'utils';

describe('sagas', () => {
  const alertSpy = jest.fn();
  const indexOfMock = 1;
  const routePointMock = { id: '123', name: 'name', coordinates: [123, 321], address: 'address' };
  const getWayPointsMock = {
    toArray: () => ({
      indexOf: jest.fn(() => indexOfMock),
    }),
    getWayPoints: fn => fn(),
    each: jest.fn(),
  };
  const routeMock = {
    getWayPoints: () => getWayPointsMock,
    editor: {
      start: jest.fn(),
      stop: jest.fn(),
      events: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    },
    model: {
      setReferencePoints: jest.fn(),
      events: {
        once: jest.fn((event: string, cb: () => {}) => cb()),
      },
    },
  };
  const mapMock = {
    geoObjects: {
      add: jest.fn(),
    },
    destroy: jest.fn(),
  };
  const ymapsMock = {
    Map: jest.fn(() => mapMock),
    multiRouter: {
      MultiRoute: jest.fn(() => routeMock),
    },
  };

  Object.defineProperties(window, {
    alert: { value: alertSpy },
    ymaps: { value: ymapsMock },
  });

  afterAll(() => {
    Object.defineProperty(window, 'ymaps', { value: undefined });
  });

  afterEach(() => {
    (window.alert as jest.Mock).mockClear();
  });

  describe('requestFaiWatcher', () => {
    it('alerts error message', () => {
      const errorMessage = 'errorMessage';
      const error = new Error(errorMessage);

      return expectSaga(requestFailAsync, { payload: error })
        .call(alert, errorMessage)
        .run()
        .then(() => expect(alertSpy).toHaveBeenCalledWith(errorMessage));
    });

    it('doesnt alert if there is no error', () => {
      return expectSaga(requestFailAsync, { payload: null })
        .run()
        .then(() => expect(alertSpy).not.toHaveBeenCalled());
    });
  });

  describe('loadMapAsync', () => {
    it('loads map', () => {
      return expectSaga(loadMapAsync)
        .provide([[matchers.call.fn(utils.mapLoader), null]])
        .put(loadMapSuccess())
        .run();
    });

    it('catches an error', () => {
      const error = new Error('error');

      return expectSaga(loadMapAsync)
        .provide([[matchers.call.fn(utils.mapLoader), throwError(error)]])
        .put(requestFail(error))
        .run();
    });
  });

  describe('searchPointAsync', () => {
    it('searches a point', () => {
      return expectSaga(searchPointAsync, {})
        .provide([[matchers.call.fn(utils.geoCoder), routePointMock]])
        .put(searchRoutePointSuccess(routePointMock))
        .run();
    });

    it('catches an error', () => {
      const error = new Error('error');

      return expectSaga(searchPointAsync, {})
        .provide([[matchers.call.fn(utils.geoCoder), throwError(error)]])
        .put(requestFail(error))
        .run();
    });
  });

  describe('movePointAsync', () => {
    const payload = {
      newPoint: {
        geometry: {
          getCoordinates: () => [123, 321],
        },
      },
      index: 2,
    };

    it('moves point', () => {
      return expectSaga(movePointAsync, { payload })
        .provide([[matchers.call.fn(utils.geoCoder), routePointMock]])
        .put(moveRoutePointSuccess({ newPoint: routePointMock, index: payload.index }))
        .run();
    });

    it('catches an error', () => {
      const error = new Error('error');

      return expectSaga(movePointAsync, { payload })
        .provide([[matchers.call.fn(utils.geoCoder), throwError(error)]])
        .put(requestFail(error))
        .run();
    });
  });

  describe('createRouteAsync', () => {
    it('create multiroute', () => {
      const payloadFn = () => {};
      const payload = () => payloadFn;

      return expectSaga(createRouteAsync, { payload })
        .put(createRouteSuccess(routeMock as any))
        .run()
        .then(() => {
          const calls: any[] = ymapsMock.multiRouter.MultiRoute.mock.calls[0];

          expect(ymapsMock.multiRouter.MultiRoute).toHaveBeenCalled();
          expect(calls[0]).toEqual({
            referencePoints: [],
            params: {
              results: 1,
            },
          });
          expect(calls[1]).toEqual({
            mapStateAutoApply: true,
            boundsAutoApply: true,
          });
          expect(routeMock.editor.start.mock.calls[0][0]).toEqual({
            editWayPoints: true,
            addViaPoints: false,
          });
          expect(routeMock.editor.events.add.mock.calls[0][0]).toBe('waypointdragend');
          expect(routeMock.editor.events.add.mock.calls[0][1]).toBe(payloadFn);
        });
    });

    it('catches an error', () => {
      const error = new Error('error');
      const payload = () => {
        throw error;
      };

      return expectSaga(createRouteAsync, { payload })
        .put(requestFail(error))
        .run();
    });
  });

  describe('createRouteSuccessAsync', () => {
    it('adds route to geo objects', () => {
      return expectSaga(createRouteSuccessAsync, { payload: routeMock })
        .provide({
          select: () => mapMock,
        })
        .run()
        .then(() => {
          expect(mapMock.geoObjects.add.mock.calls[0][0]).toBe(routeMock);
        });
    });

    it('cathes an error', () => {
      const error = new Error('error');

      return expectSaga(createRouteSuccessAsync, { payload: routeMock })
        .provide({
          select: () => {
            throw error;
          },
        })
        .put(requestFail(error))
        .run();
    });
  });

  describe('setRoutePointsAsync', () => {
    it('set points to route', () => {
      return expectSaga(setRoutePointsAsync, { payload: [routePointMock] })
        .provide({
          select: () => routeMock,
        })
        .run()
        .then(() => {
          expect(routeMock.model.setReferencePoints.mock.calls[0][0]).toEqual(['name']);
          expect(routeMock.model.events.once).toHaveBeenCalledWith(
            'requestsuccess',
            expect.any(Function)
          );
          expect(getWayPointsMock.each).toHaveBeenCalledWith(addBalloonToWaypoint);
        });
    });
  });

  describe('createMapAsync', () => {
    const payload = {
      element: {} as HTMLDivElement,
      onWaypointDragEnd: () => () => {},
    };

    it('creates Yandex map instance', () => {
      return expectSaga(createMapAsync, { payload })
        .put(createMapSuccess(mapMock as any))
        .put(createRoute(payload.onWaypointDragEnd))
        .run();
    });
  });
});
