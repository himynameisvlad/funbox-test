import React, { Component, createRef } from 'react';
import { IMovePointRequest, IRoutePoint, IOnWaypointDragEnd } from 'interfaces';

import './styles.css';

export class YandexMap extends Component<IProps, {}> {
  public mapRef = createRef<HTMLDivElement>();

  public componentWillReceiveProps(nextProps: IProps) {
    this.props.setRoutePoints(nextProps.routePoints);
  }

  public shouldComponentUpdate() {
    return false;
  }

  public componentDidMount() {
    this.props.createMap({ element: this.mapRef.current, onWaypointDragEnd: this.onWaypointDragEnd });
  }

  public componentWillUnmount() {
    this.props.destroyMap();
  }

  public onWaypointDragEnd = (route: ymaps.multiRouter.MultiRoute) => (event: ymaps.IEvent) => {
    const newPoint = event.get('wayPoint') as ymaps.multiRouter.WayPoint;

    this.props.onDragPointEnd({
      index: route.getWayPoints().toArray().indexOf(newPoint),
      newPoint,
    });
  }

  public render() {
    return <div className='google-map' ref={this.mapRef}/>;
  }
}

interface IProps {
  routePoints: IRoutePoint[];

  onDragPointEnd: (payload: IMovePointRequest) => void;

  createMap: (payload: {
    element: HTMLDivElement;
    onWaypointDragEnd: IOnWaypointDragEnd;
  }) => void;

  setRoutePoints: (routePoints: IRoutePoint[]) => void;

  destroyMap: () => void;
}
