import React, { DragEvent, memo, ReactNode } from 'react';

import './styles.css';

export const DraggableListItem = memo(({
    children,
    isDragging,
    onDragStart,
    onDrop,
    onDragEnd }: IProps,
  ) => {
    const handleDragOver = (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
    };

    return (<li
      draggable={true}
      className={`fb-draggable ${isDragging ? 'fb-draggable--is-dragging' : ''}`}
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {children}
    </li>);
  });

interface IProps {
  children: ReactNode;

  isDragging: boolean;

  onDragStart: () => void;

  onDrop: () => void;

  onDragEnd: () => void;
}
