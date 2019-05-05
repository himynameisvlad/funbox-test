import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { YandexMap } from '../index';

describe('YandexMap - map component', () => {
  let wrapper;
  let instance;
  const props = {
    routePoints: [
      { id: '123', name: 'name', coordinates: [123, 321], address: 'address' },
      { id: '234', name: 'name', coordinates: [123, 321], address: 'address' },
    ],
    onDragPointEnd: jest.fn(),
    createMap: jest.fn(),
    setRoutePoints: jest.fn(),
    destroyMap: jest.fn(),
  };
  const indexOfMock = 1;
  const YandexMapComponent = <YandexMap {...props} />;

  beforeEach(() => {
    wrapper = shallow(YandexMapComponent);
    instance = wrapper.instance();
  });

  it('renders correctly', () => {
    const tree = renderer.create(YandexMapComponent).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('creates map', () => {
    expect(props.createMap).toHaveBeenCalled();
    expect(props.createMap.mock.calls[0][0]).toEqual({
      element: instance.mapRef.current,
      onWaypointDragEnd: expect.any(Function),
    });
  });

  it('component view should not be updated', () => {
    expect(instance.shouldComponentUpdate()).toBe(false);
  });

  it('should set route points on componentWillReceiveProps', () => {
    const newPoints = [
      { id: '345', name: 'name1', coordinates: [123, 321], address: 'address' },
      { id: '678', name: 'name2', coordinates: [123, 321], address: 'address' },
    ];

    instance.componentWillReceiveProps({ routePoints: newPoints });

    expect(props.setRoutePoints.mock.calls[0][0]).toEqual(newPoints);
  });

  it('destroys the map on componentWillUnmount', () => {
    instance.componentWillUnmount();

    expect(props.destroyMap).toHaveBeenCalled();
  });

  describe('onWaypointDragEnd', () => {
    const newPointMock = {};
    const eventMock = {
      get: jest.fn(() => newPointMock),
    };
    const routeMock = {
      getWayPoints: () => ({
        toArray: () => ({
          indexOf: jest.fn(() => indexOfMock),
        }),
      }),
    };

    beforeAll(() => {
      instance.onWaypointDragEnd(routeMock)(eventMock);
    });

    it('gets new way point', () => {
      expect(eventMock.get).toHaveBeenCalledWith('wayPoint');
    });

    it('triggers onDragPointEnd action', () => {
      expect(props.onDragPointEnd.mock.calls[0][0]).toEqual({
        newPoint: newPointMock,
        index: indexOfMock,
      });
    });
  });
});
