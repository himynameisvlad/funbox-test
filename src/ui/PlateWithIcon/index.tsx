import React, { memo, ReactNode } from 'react';

import './styles.css';

export const PlateWithIcon = memo(({ title, children }: IProps) => (
  <div className='fb-plate'>
    <span>{title}</span>

    <div className='fb-plate__icon'>
      {children}
    </div>
  </div>
));

interface IProps {
  title: string;

  children: ReactNode;
}
