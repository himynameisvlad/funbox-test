import { IFunboxWindow } from 'interfaces';

declare const window: IFunboxWindow;

let mapPromise: Promise<typeof window.ymaps>;

export const mapLoader = ({ apiKey = '', apiUrl = '' }: { apiKey: string; apiUrl: string }) => {
  if (mapPromise) {
    return mapPromise;
  }

  mapPromise = new Promise((resolve, reject) => {
    if (!apiKey) {
      reject(new Error('There must be a key!'));
      return;
    }

    if (!apiUrl) {
      reject(new Error('There must be url!'));
      return;
    }

    if (window.ymaps) {
      resolve(window.ymaps);
      return;
    }

    window.__on_yandex_map_init__ = () => {
      delete window.__on_yandex_map_init__;
      resolve(window.ymaps);
    };

    const script = document.createElement('script');

    script.src = `${apiUrl}?apikey=${apiKey}&lang=ru_RU&onload=__on_yandex_map_init__`;
    document.body.appendChild(script);
  });

  return mapPromise;
};
