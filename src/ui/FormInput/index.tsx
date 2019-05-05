import React, { ChangeEvent, FormEvent, PureComponent } from 'react';
import { FormErrors } from '../FormErrors';

import './styles.css';

export class FormInput extends PureComponent<IProps, IState> {
  public state: IState = {
    inputValue: '',
    formErrors: {},
  };

  public handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.formErrors.inputError) {
      this.setState({ formErrors: {} });
    }

    this.setState({ inputValue: event.target.value });
  }

  public handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputValue = this.state.inputValue;

    if (inputValue.length <= 0) {
      this.setState({
        formErrors: { inputError: 'Value must not be empty' },
      });

      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  }

  public render() {
    return (
      <form className='fb-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder={this.props.placeholder}
          className='fb-form__input'
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />

        <FormErrors formErrors={this.state.formErrors} />
      </form>
    );
  }
}

interface IProps {
  placeholder: string;

  onSubmit: (formValue: string) => void;
}

interface IState {
  inputValue: string;

  formErrors: { [fieldName: string]: string };
}
