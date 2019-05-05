import { Guid } from 'guid-typescript';
import { IGeocodeOptions, IRoutePoint } from 'interfaces';
import { IFunboxWindow } from 'interfaces';

declare const window: IFunboxWindow;

const MAP_ERROR = 'Yandex maps must be initialized';
const ABSENTEE_ROUTE_ERROR = 'There must be a route name';
const UNKNOWN_ERROR = "Sorry, we can't find the route point";

const convertGeocodeResponseToRoutePoint = (geoObject: ymaps.IGeoObject): IRoutePoint | Error => {
  try {
    const geometry = geoObject.geometry as ymaps.IPointGeometry;

    return {
      id: Guid.create().toString(),
      name: geoObject.properties.get('name', null).toString(),
      coordinates: geometry.getCoordinates() as number[],
      address: geoObject.getAddressLine(),
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const geoCoder = async (
  request: string | number[],
  options?: IGeocodeOptions
): Promise<IRoutePoint | Error> => {
  const ymaps = window.ymaps;

  if (!ymaps || !ymaps.geocode || typeof ymaps.geocode !== 'function') {
    throw new Error(MAP_ERROR);
  }

  if (!request) {
    throw new Error(ABSENTEE_ROUTE_ERROR);
  }

  try {
    const geocoder = ymaps.geocode(request, options);
    const geocoderResult = await geocoder;

    return convertGeocodeResponseToRoutePoint(geocoderResult.geoObjects.get(0));
  } catch (error) {
    throw new Error(UNKNOWN_ERROR);
  }
};
