import { addBalloonToWaypoint } from '../addBalloonToWaypoint';

describe('addBalloonToWaypoint', () => {
  const waypointMock = {
    options: {
      set: jest.fn(),
    },
  };
  const createClassMock = 'createClassMock';
  const ymapsMock = {
    geoObject: {
      addon: {
        balloon: {
          get: jest.fn(),
        },
      },
    },
    templateLayoutFactory: {
      createClass: jest.fn(() => createClassMock),
    },
  };

  beforeAll(() => {
    Object.defineProperty(window, 'ymaps', { value: ymapsMock });
  });

  afterAll(() => {
    Object.defineProperty(window, 'ymaps', { value: undefined });
  });

  beforeEach(() => {
    addBalloonToWaypoint((waypointMock as unknown) as ymaps.multiRouter.WayPoint);
  });

  it('gets balloon from ymaps', () => {
    expect(ymapsMock.geoObject.addon.balloon.get).toHaveBeenCalledWith(waypointMock);
  });

  it('sets options for balloon', () => {
    expect(waypointMock.options.set.mock.calls[0][0]).toEqual({
      iconContentLayout: createClassMock,
      balloonContentLayout: createClassMock,
    });
  });

  it('creates templates', () => {
    expect((ymapsMock.templateLayoutFactory.createClass.mock.calls[0] as any[])[0]).toBe('');
    expect((ymapsMock.templateLayoutFactory.createClass.mock.calls[1] as any[])[0]).toBe(
      '{{ properties.address|raw }}'
    );
  });
});
