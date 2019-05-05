describe('utils - mapLoader', () => {
  let mapLoader;
  const apiKey = 'apiKey';
  const apiUrl = 'apiUrl';
  const scriptMock = {};
  const createElementSpy = jest.fn((tag: string) => scriptMock);
  const appendChildSpy = jest.fn(script => null);

  Object.defineProperty(document, 'createElement', { value: createElementSpy });
  Object.defineProperty(document.body, 'appendChild', { value: appendChildSpy });

  beforeEach(() => {
    jest.isolateModules(() => {
      mapLoader = require('../mapLoader').mapLoader;
    });
  });

  afterAll(() => {
    delete global['ymaps'];
  });

  describe('rejects', () => {
    it('if there is no key', () => {
      return mapLoader({ apiKey: null, apiUrl }).catch(error => {
        expect(error.message).toBe('There must be a key!');
      });
    });

    it('if there is no url', () => {
      return mapLoader({ apiKey, apiUrl: null }).catch(error => {
        expect(error.message).toBe('There must be url!');
      });
    });
  });

  it('return ymaps if there is one', () => {
    const ymaps = {};

    global['ymaps'] = ymaps;

    return mapLoader({ apiKey, apiUrl }).then(result => {
      expect(result).toBe(ymaps);
    });
  });

  it('creates script', () => {
    delete global['ymaps'];

    mapLoader({ apiKey, apiUrl });

    expect(createElementSpy).toHaveBeenCalledWith('script');
  });

  it('appends script to the body', () => {
    mapLoader({ apiKey, apiUrl });

    expect(appendChildSpy).toHaveBeenCalledWith(scriptMock);
  });

  it('deletes window.__on_yandex_map_init__', () => {
    Object.defineProperty(window, '__on_yandex_map_init__', { value: () => {} });

    mapLoader({ apiKey, apiUrl });
    window['__on_yandex_map_init__']();

    expect(global['__on_yandex_map_init__']).toBeUndefined();
  });

  it('returns same promise', () => {
    const promise = mapLoader({ apiKey, apiUrl });

    expect(mapLoader({ apiKey, apiUrl })).toBe(promise);
  });
});

export {};
