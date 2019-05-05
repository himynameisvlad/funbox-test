import 'yandex-maps';
import { IGeocodeResponse, IGeocodeOptions } from '@interfaces';

declare module '*.css';

declare global {
  namespace ymaps {
    export function geocode(request: string | number[], options?: IGeocodeOptions): Promise<IGeocodeResponse>;

    namespace geoObject {
      const addon: {
        balloon: geoObject.Balloon;
      };

      interface Balloon {
        get: (waypoint: IGeoObject) => IGeoObject;
      }
    }

    interface IGeoObject {
      getAddressLine?: () => string;
    }

    interface IOptionManager {
      set?: (options: object) => void;
    }
  }
}
