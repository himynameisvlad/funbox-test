import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { FormErrors } from '../index';

describe('FormErrors - ui component', () => {
  let wrapper;
  const formErrors = {
    errorOne: 'errorOne',
    errorTwo: 'errorTwo'
  };
  const FormErrorsComponent = <FormErrors formErrors={formErrors} />;

  beforeEach(() => {
    wrapper = shallow(FormErrorsComponent);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(FormErrorsComponent)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('doesn\'t render error if there is no one', () => {
    wrapper = shallow(<FormErrors formErrors={{}} />);

    expect(wrapper.find('p').length).toBe(0);
  });

  it('renders errors', () => {
    expect(wrapper.find('p').first().text()).toBe(formErrors.errorOne);
    expect(wrapper.find('p').at(1).text()).toBe(formErrors.errorTwo);
  });
})
