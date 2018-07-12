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
import { Iterable, fromJS } from 'immutable';
import createReducer from './reducers';

const persistOptions = {
  key: 'root',
  whitelist: ['mapPage', 'loginPage', 'App', 'route'],
  blacklist: ['rehydrate'],
};

const sagaMiddleware = createSagaMiddleware();

const transform = state => {
  if (Iterable.isIterable(state)) {
    return state.toJS();
  }
  return state;
};

const logger = createLogger({ stateTransformer: state => transform(state) });

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const { NODE_ENV } = process.env;
  if (NODE_ENV !== 'production' && NODE_ENV !== 'test') {
    middlewares.push(logger);
  }
  // const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
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

  const config = {
    ...offlineConfig,
    persist,
    persistAutoRehydrate,
    persistOptions,
    persistCallback: () => {
      if (store.dispatch) {
        store.dispatch({ type: 'REHYDRATE_STORE' });
      }
    },
    offlineStateLens,
  };

  const {
    middleware: offlineMiddleware,
    enhanceReducer,
    enhanceStore,
  } = createOffline(config);
  if (NODE_ENV !== 'test') {
    middlewares.push(offlineMiddleware);
  }
  const middleware = applyMiddleware(...middlewares);

  const store = createStore(
    enhanceReducer(createReducer()),
    NODE_ENV === 'test' ? fromJS(initialState) : undefined,
    composeEnhancers(enhanceStore, middleware),
  );

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
}
