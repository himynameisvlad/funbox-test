import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { App } from '../index';

jest.mock('../../RouteAside', () => ({
  RouteAside: () => <div />,
}));
jest.mock('../../YandexMap', () => ({
  YandexMap: () => <div />,
}));

describe('App - root component', () => {
  let wrapper;
  const props = {
    moveRoutePoint: jest.fn(),
    loadMapRequest: jest.fn(),
    createMap: jest.fn(),
    setRoutePoints: jest.fn(),
    destroyMap: jest.fn(),
    isMapScriptLoaded: true,
    routePoints: [],
  };
  const AppComponent = <App {...props} />;

  beforeEach(() => {
    wrapper = shallow(AppComponent);
  });

  it('renders correctly', () => {
    const tree = renderer.create(AppComponent).toJSON();

    expect(tree).toMatchSnapshot();
    expect(wrapper.find('RouteAside').length).toBe(1);
    expect(wrapper.find('YandexMap').length).toBe(1);
  });

  it('loads map', () => {
    expect(props.loadMapRequest).toHaveBeenCalled();
  });

  it('renders nothing, if map is not loaded', () => {
    wrapper = shallow(<App {...{ ...props, isMapScriptLoaded: false }} />);

    expect(wrapper.find('main').length).toBe(0);
  });
});
