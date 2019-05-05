import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { ErrorBoundary } from '../index';

describe('ErrorBoundary - error catch component', () => {
  let wrapper;
  const Children = () => null;
  const ErrorBoundaryComponent = (
    <ErrorBoundary>
      <Children />
    </ErrorBoundary>
  );
  const consoleErrorSpy = jest.fn();

  Object.defineProperty(console, 'error', { value: consoleErrorSpy });

  beforeEach(() => {
    wrapper = shallow(ErrorBoundaryComponent);
  });

  it('renders correctly', () => {
    const tree = renderer.create(ErrorBoundaryComponent).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders children', () => {
    const children = <div />;

    wrapper = shallow(<ErrorBoundary>{children}</ErrorBoundary>);

    expect(wrapper.contains(children)).toBe(true);
  });

  it('should show "Something went wrong" message on error', () => {
    wrapper.find(Children).simulateError(new Error());

    expect(
      wrapper
        .find('div')
        .first()
        .text()
    ).toBe('Something went wrong');
  });

  it('console info', () => {
    wrapper.find(Children).simulateError(new Error());

    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
