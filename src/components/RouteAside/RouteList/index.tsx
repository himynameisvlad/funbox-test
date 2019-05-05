import { IRoutePoint } from 'interfaces';
import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppState } from 'store';
import { deleteRoutePoint, swapRoutePoint } from 'store/actions';
import { DeleteIcon, DraggableListItem, PlateWithIcon } from 'ui';
import { memoizee } from 'utils';

import './styles.css';

const mapStateToProps = ({ routePoints }: IAppState) => ({
  routePoints,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      swapRoutePoint,
      deleteRoutePoint,
    },
    dispatch
  );

export class RouteListComponent extends Component<IProps, IState> {
  public state: IState = {
    draggingItemIndex: null,
  };

  public handleDeleteRoutePoint = memoizee(
    (routePoint: IRoutePoint) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      this.props.deleteRoutePoint(routePoint);
    }
  );

  public handleDragStart = memoizee((index: number) => () => {
    this.setState({
      draggingItemIndex: index,
    });
  });

  public handleDrop = memoizee((index: number) => () => {
    if (this.state.draggingItemIndex === index) {
      return;
    }

    this.props.swapRoutePoint({
      from: this.state.draggingItemIndex,
      to: index,
    });
  });

  public handleDragEnd = () => {
    this.setState({
      draggingItemIndex: null,
    });
  };

  public render() {
    const listItems = this.props.routePoints.map((point, index) => (
      <DraggableListItem
        key={point.id}
        isDragging={this.state.draggingItemIndex === index}
        onDragStart={this.handleDragStart(index)}
        onDrop={this.handleDrop(index)}
        onDragEnd={this.handleDragEnd}
      >
        <PlateWithIcon title={point.name}>
          <DeleteIcon onClick={this.handleDeleteRoutePoint(point)} />
        </PlateWithIcon>
      </DraggableListItem>
    ));

    return <ul className="fb-route-list">{listItems}</ul>;
  }
}

type IProps = IStateToProps & IDispatchProps;

interface IState {
  draggingItemIndex: number;
}

interface IStateToProps {
  routePoints: IRoutePoint[];
}

interface IDispatchProps {
  deleteRoutePoint: (routePoint: IRoutePoint) => void;

  swapRoutePoint: (fromTo: { from: number; to: number }) => void;
}

export const RouteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteListComponent);
