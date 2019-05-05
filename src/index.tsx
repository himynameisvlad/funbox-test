import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { Provider } from 'react-redux';
import { rootSaga } from 'sagas';
import { initStore, sagaMiddleware } from 'store';

const store = initStore();

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
