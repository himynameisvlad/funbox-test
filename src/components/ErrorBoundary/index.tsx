import React, { Component } from 'react';

export class ErrorBoundary extends Component<{}, IState> {
  public state: IState = {
    hasError: false,
  };

  public componentDidCatch(error: Error | null, info: object) {
    this.setState({
      hasError: true,
    });

    // tslint:disable-next-line:no-console
    console.error(info);
  }

  public render() {
    return this.state.hasError ? <div>Something went wrong</div> : this.props.children;
  }
}

interface IState {
  hasError: boolean;
}
