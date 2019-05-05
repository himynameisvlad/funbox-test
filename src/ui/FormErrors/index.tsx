import React, { memo } from 'react';

import './styles.css';

export const FormErrors = memo(({ formErrors }: IProps) => {
  const errors = Object.keys(formErrors).map((fieldName, i) => {
    return formErrors[fieldName].length > 0
      ? <p key={i}>{formErrors[fieldName]}</p>
      : null;
  });

  return <div className="fb-form-errors">{errors}</div>;
});

interface IProps {
  formErrors: { [fieldName: string]: string };
}
