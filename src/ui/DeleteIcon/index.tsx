import React, { memo, MouseEvent } from 'react';

import './styles.css';

export const DeleteIcon = memo(({ onClick }: IProps) => (
  <button className='fb-delete-icon' onClick={onClick} />
));

interface IProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
}
