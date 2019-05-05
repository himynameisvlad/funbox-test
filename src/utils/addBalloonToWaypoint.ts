import { IFunboxWindow } from 'interfaces';

declare const window: IFunboxWindow;

export const addBalloonToWaypoint = (waypoint: ymaps.multiRouter.WayPoint) => {
  window.ymaps.geoObject.addon.balloon.get(waypoint);

  waypoint.options.set({
    iconContentLayout: window.ymaps.templateLayoutFactory.createClass(''),
    balloonContentLayout: window.ymaps.templateLayoutFactory.createClass(
      '{{ properties.address|raw }}'
    ),
  });
}
