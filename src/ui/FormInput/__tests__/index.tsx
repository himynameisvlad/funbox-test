import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { FormInput } from '../index';

describe('FormInput - ui component', () => {
  let wrapper;
  const props = {
    placeholder: 'Test placeholder',
    onSubmit: jest.fn()
  };
  const FormInputComponent = <FormInput {...props} />;

  beforeEach(() => {
    wrapper = shallow(FormInputComponent);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(FormInputComponent)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders placeholder', () => {
    expect(wrapper.find('input').prop('placeholder')).toBe(props.placeholder);
  });

  describe('on form submit', () => {
    const eventMock = {
      preventDefault: jest.fn()
    };

    it('prevents events default', () => {
      wrapper.find('form').simulate('submit', eventMock);
  
      expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);
    });

    describe('if input value.length === 0', () => {
      beforeEach(() => {
        wrapper.setState({
          inputValue: ''
        });

        wrapper.find('form').simulate('submit', eventMock);
      });

      it('sets formErrors', () => {
        expect(wrapper.state('formErrors')).toEqual({
          inputError: 'Value must not be empty'
        });
      });

      it('doesnt call onSubmit', () => {
        expect(props.onSubmit).not.toHaveBeenCalled();
      });
    });

    describe('if input value.length > 0', () => {
      const inputValue = 'test value';

      beforeEach(() => {
        wrapper.setState({
          inputValue
        });

        wrapper.find('form').simulate('submit', eventMock);
      });

      it('does not set formErrors', () => {
        expect(wrapper.state('formErrors')).toEqual({});
      });

      it('calls onSubmit with input value', () => {
        expect(props.onSubmit).toHaveBeenCalledWith(inputValue);
      });

      it('resets input value', () => {
        expect(wrapper.state('inputValue')).toBe('');
      });
    });
  });

  describe('on input value change', () => {
    const inputEventMock = {
      target: {
        value: 'input value'
      }
    };

    beforeEach(() => {
      wrapper.setState({
        formErrors: {
          inputError: 'inputError'
        }
      });

      wrapper.find('input').simulate('change', inputEventMock);
    });

    it('sets input value state', () => {
      expect(wrapper.state('inputValue')).toBe(inputEventMock.target.value);
    });

    it('resets formErrors state', () => {
      expect(wrapper.state('formErrors')).toEqual({});
    });
  });
})
