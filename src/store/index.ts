import { IS_DEV } from 'config';
import { IRoutePoint } from 'interfaces';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';

export const sagaMiddleware = createSagaMiddleware();

export const initStore = () => (
  createStore(
    rootReducer,
    IS_DEV
      ? composeWithDevTools(applyMiddleware(sagaMiddleware))
      : applyMiddleware(sagaMiddleware),
  )
);

export interface IAppState {
  routePoints: IRoutePoint[];

  isMapScriptLoaded: boolean;

  map: ymaps.Map;

  route: ymaps.multiRouter.MultiRoute;
}
