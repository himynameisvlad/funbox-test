import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { DeleteIcon } from '../index';

describe('DeleteIcon - ui component', () => {
  it('renders correctly', () => {
    const onClick = () => null;
    const tree = renderer
      .create(<DeleteIcon onClick={onClick} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls onClick prop when button is clicked', () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<DeleteIcon onClick={onClickSpy} />);
    const button = wrapper.find('button').first();
    button.simulate('click');

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
})
