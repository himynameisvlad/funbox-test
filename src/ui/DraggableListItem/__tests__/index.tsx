import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { DraggableListItem } from '../index';

describe('DraggableListItem - ui component', () => {
  let wrapper;
  const props = {
    isDragging: true,
    onDragStart: jest.fn(),
    onDrop: jest.fn(),
    onDragEnd: jest.fn(),
    children: <div />
  };
  const DraggableListItemComponent = <DraggableListItem {...props} />;

  beforeEach(() => {
    wrapper = shallow(DraggableListItemComponent);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(DraggableListItemComponent)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders children', () => {
    expect(wrapper.contains(props.children)).toEqual(true);
  });

  it('draggable', () => {
    expect(wrapper.find('li').prop('draggable')).toBe(true);
  });

  it('sets draggin class name', () => {
    expect(wrapper.find('li.fb-draggable.fb-draggable--is-dragging').length).toBe(1);
  });

  it('does not set dragging class if prop was false', () => {
    const notDraggingProps = { ...props, isDragging: false };

    wrapper = shallow(<DraggableListItem {...notDraggingProps} />);

    expect(wrapper.find('li.fb-draggable.fb-draggable--is-dragging').length).toBe(0);
  });

  it('calls onDragStart props', () => {
    wrapper.find('li').simulate('dragstart');

    expect(props.onDragStart).toHaveBeenCalledTimes(1);
  });

  it('calls onDrop props', () => {
    wrapper.find('li').simulate('drop');

    expect(props.onDrop).toHaveBeenCalledTimes(1);
  });

  it('calls onDragEnd props', () => {
    wrapper.find('li').simulate('dragend');

    expect(props.onDragEnd).toHaveBeenCalledTimes(1);
  });

  it('prevents events degault on drag over', () => {
    const eventMock = {
      preventDefault: jest.fn(),
    }

    wrapper.find('li').simulate('dragover', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);
  });
})
