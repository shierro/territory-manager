/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import {
  persist,
  persistAutoRehydrate,
  offlineStateLens,
} from 'redux-offline-immutable-config';
import { Iterable } from 'immutable';
import createReducer from './reducers';

const persistOptions = {
  key: 'root',
  whitelist: ['mapPage', 'loginPage', 'App', 'route'],
  blacklist: ['rehydrate'],
};

const config = {
  ...offlineConfig,
  persist,
  persistAutoRehydrate,
  persistOptions,
  offlineStateLens,
};

const { NODE_ENV } = process.env;

const sagaMiddleware = createSagaMiddleware();

/* istanbul ignore next */
const transform = state => {
  if (Iterable.isIterable(state)) {
    return state.toJS();
  }
  return state;
};

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle, indent */
const getComposeEnhancers = () =>
  NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
    : compose;
/* eslint-enable */

/* istanbul ignore next */
const logger = createLogger({ stateTransformer: state => transform(state) });

/* eslint-disable no-param-reassign */
const addExtentionsAndHotReload = store => {
  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }
  return store;
};

export default function configureStore(initialState, history) {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  /* istanbul ignore next */
  if (NODE_ENV !== 'test') {
    middlewares.push(logger);
  }
  /* istanbul ignore next */
  config.persistCallback = () => {
    if (store.dispatch) {
      store.dispatch({ type: 'REHYDRATE_STORE' });
    }
  };
  const {
    middleware: offlineMiddleware,
    enhanceReducer,
    enhanceStore,
  } = createOffline(config);
  middlewares.push(offlineMiddleware);
  const middleware = applyMiddleware(...middlewares);
  const store = createStore(
    enhanceReducer(createReducer()),
    undefined,
    getComposeEnhancers()(enhanceStore, middleware),
  );
  return addExtentionsAndHotReload(store);
}
