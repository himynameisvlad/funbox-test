import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { RouteListComponent } from '../index';

jest.mock('ui', () => ({
  DraggableListItem: () => <div />,
  PlateWithIcon: () => <div />,
  DeleteIcon: () => <div />,
}));
jest.mock('utils', () => ({
  memoizee: fn => fn,
}));

describe('RouteList - aside component', () => {
  let wrapper;
  const props = {
    deleteRoutePoint: jest.fn(),
    swapRoutePoint: jest.fn(),
    routePoints: [
      { id: '123', name: 'name', coordinates: [123, 321], address: 'address' },
      { id: '321', name: 'name', coordinates: [123, 321], address: 'address' },
    ],
  };
  const RouteList = <RouteListComponent {...props} />;

  beforeEach(() => {
    wrapper = shallow(RouteList);
  });

  it('renders correctly', () => {
    const tree = renderer.create(RouteList).toJSON();

    expect(tree).toMatchSnapshot();
    expect(wrapper.find('DraggableListItem').length).toBe(2);
    expect(wrapper.find('PlateWithIcon').length).toBe(2);
    expect(wrapper.find('DeleteIcon').length).toBe(2);
  });

  it('handleDeleteRoutePoint', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const routePoint = { id: '123', name: 'name', coordinates: [123, 321], address: 'address' };

    wrapper.instance().handleDeleteRoutePoint(routePoint)(event);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(props.deleteRoutePoint).toBeCalledWith(routePoint);
  });

  it('handleDragStart', () => {
    wrapper.setState({ draggingItemIndex: 1 });

    wrapper.instance().handleDragStart(0)();

    expect(wrapper.state('draggingItemIndex')).toBe(0);
  });

  it('handleDragEnd', () => {
    wrapper.setState({ draggingItemIndex: 1 });

    wrapper.instance().handleDragEnd();

    expect(wrapper.state('draggingItemIndex')).toBeNull();
  });

  describe('handleDrop', () => {
    it('does nothing if index the same', () => {
      wrapper.setState({ draggingItemIndex: 1 });

      wrapper.instance().handleDrop(1)();

      expect(props.swapRoutePoint).not.toHaveBeenCalled();
    });

    it('swaps route points', () => {
      wrapper.setState({ draggingItemIndex: 1 });

      wrapper.instance().handleDrop(2)();

      expect(props.swapRoutePoint.mock.calls[0][0]).toEqual({
        to: 2,
        from: wrapper.state('draggingItemIndex'),
      });
    });
  });
});
