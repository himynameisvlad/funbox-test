import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { RouteAsideComponent } from '../index';

jest.mock('ui', () => ({
  FormInput: () => <div />,
}));
jest.mock('../RouteList', () => ({
  RouteList: () => <div />,
}));

describe('RouteAside - aside component', () => {
  let wrapper;
  const onSubmit = () => null;
  const RouteAside = <RouteAsideComponent onSubmit={onSubmit} />;

  beforeEach(() => {
    wrapper = shallow(RouteAside);
  });

  it('renders correctly', () => {
    const tree = renderer.create(RouteAside).toJSON();

    expect(tree).toMatchSnapshot();
    expect(wrapper.find('FormInput').length).toBe(1);
    expect(wrapper.find('RouteList').length).toBe(1);
  });
});
