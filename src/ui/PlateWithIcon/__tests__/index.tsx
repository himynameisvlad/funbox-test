import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { PlateWithIcon } from '../index';

describe('PlateWithIcon - ui component', () => {
  let wrapper;
  const title = 'Test title';
  const children = <div />;
  const PlateWithIconComponent = <PlateWithIcon title={title}>{children}</PlateWithIcon>;

  beforeEach(() => {
    wrapper = shallow(PlateWithIconComponent);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(PlateWithIconComponent)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders children', () => {
    expect(wrapper.contains(children)).toEqual(true);
  });

  it('renders title', () => {
    expect(wrapper.find('span').text()).toEqual(title);
  });
})
