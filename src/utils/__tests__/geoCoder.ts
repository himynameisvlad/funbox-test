jest.mock('guid-typescript');
import { Guid } from 'guid-typescript';

import { geoCoder } from '../geoCoder';

describe('utils - geoCoder', () => {
  const coordinatesMock = [123, 321];
  const nameMock = 'nameMock';
  const addressMock = 'addressMock';
  const geoObjectMock = {
    geometry: {
      getCoordinates: () => coordinatesMock,
    },
    properties: {
      get: () => ({
        toString: () => nameMock,
      }),
    },
    getAddressLine: () => addressMock,
  };
  const geocodeResponseMock = {
    geoObjects: {
      get: () => geoObjectMock,
    },
  };
  const ymapsMock = {
    geocode: jest.fn((results, options) => Promise.resolve(geocodeResponseMock)),
  };
  const idMock = '123123';
  const request = 'request';
  const options = {};

  beforeAll(() => {
    (Guid.create as jest.Mock).mockReturnValue(idMock);
  });

  afterAll(() => {
    delete global['ymaps'];
  });

  describe('returns a error', () => {
    it('if ymaps not defined', () => {
      return geoCoder(request, options).catch(error => {
        expect(error.message).toBe('Yandex maps must be initialized');
      });
    });

    it('if geocode not defined', () => {
      global['ymaps'] = {};

      return geoCoder(request, options).catch(error => {
        expect(error.message).toBe('Yandex maps must be initialized');
      });
    });

    it('if geocode is not a function', () => {
      global['ymaps'] = {
        geocode: false,
      };

      return geoCoder(request, options).catch(error => {
        expect(error.message).toBe('Yandex maps must be initialized');
      });
    });

    it('there is no request', () => {
      global['ymaps'] = ymapsMock;

      return geoCoder(null, options).catch(error => {
        expect(error.message).toBe('There must be a route name');
      });
    });

    it('there was geocode error', () => {
      global['ymaps'] = {
        geocode: () => Promise.reject(),
      };

      return geoCoder(request, options).catch(error => {
        expect(error.message).toBe(`Sorry, we can't find the route point`);
        global['ymaps'] = ymapsMock;
      });
    });
  });

  it('calls geocode service', () => {
    return geoCoder(request, options).then(() => {
      expect(ymapsMock.geocode).toHaveBeenCalledWith(request, options);
    });
  });

  it('returns converted route point', () => {
    return geoCoder(request, options).then(result => {
      expect(result).toEqual({
        id: idMock,
        name: nameMock,
        coordinates: coordinatesMock,
        address: addressMock,
      });
    });
  });
});
