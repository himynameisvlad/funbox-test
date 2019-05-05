import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IMovePointRequest, IOnWaypointDragEnd, IRoutePoint } from 'interfaces';
import { IAppState } from 'store';
import {
  createMap,
  destroyMap,
  loadMapRequest,
  moveRoutePoint,
  setRoutePoints,
} from 'store/actions';
import { Loader } from 'ui';
import { RouteAside } from '../RouteAside';
import { YandexMap } from '../YandexMap';

import './styles.css';

const mapStateToProps = (state: IAppState) => ({
  isMapScriptLoaded: state.isMapScriptLoaded,
  routePoints: state.routePoints,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadMapRequest,
      moveRoutePoint,
      createMap,
      setRoutePoints,
      destroyMap,
    },
    dispatch
  );

export class App extends Component<IProps, {}> {
  public componentDidMount() {
    this.props.loadMapRequest();
  }

  public render() {
    const {
      routePoints,
      moveRoutePoint,
      createMap,
      setRoutePoints,
      destroyMap,
      isMapScriptLoaded,
    } = this.props;

    const content = isMapScriptLoaded ? (
      <main>
        <aside className="app__aside">
          <RouteAside />
        </aside>

        <div className="app__map">
          <YandexMap
            routePoints={routePoints}
            onDragPointEnd={moveRoutePoint}
            createMap={createMap}
            setRoutePoints={setRoutePoints}
            destroyMap={destroyMap}
          />
        </div>
      </main>
    ) : (
      <Loader />
    );

    return content;
  }
}

type IProps = IStateToProps & IDispatchProps;

interface IStateToProps {
  isMapScriptLoaded: boolean;

  routePoints: IRoutePoint[];
}

interface IDispatchProps {
  loadMapRequest: () => void;

  moveRoutePoint: (payload: IMovePointRequest) => void;

  createMap: (payload: { element: HTMLDivElement; onWaypointDragEnd: IOnWaypointDragEnd }) => void;

  setRoutePoints: (routePoints: IRoutePoint[]) => void;

  destroyMap: () => void;
}

export default hot(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
