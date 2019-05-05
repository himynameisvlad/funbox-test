import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { searchRoutePointRequest } from 'store/actions';
import { FormInput } from 'ui';
import { RouteList } from './RouteList';

import './styles.css';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSubmit: searchRoutePointRequest,
    },
    dispatch
  );

export const RouteAsideComponent = ({ onSubmit }: IProps) => (
  <>
    <FormInput placeholder={'Enter point name'} onSubmit={onSubmit} />

    <div className="fb-routes-aside__list">
      <RouteList />
    </div>
  </>
);

type IProps = IDispatchProps;

interface IDispatchProps {
  onSubmit: (routeName: string) => void;
}

export const RouteAside = connect(
  null,
  mapDispatchToProps
)(RouteAsideComponent);
