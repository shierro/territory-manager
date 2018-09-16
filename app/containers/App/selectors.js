import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');
const selectApp = state => state.get('App');
const selectRehydrate = state => state.get('rehydrate');

export const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export const makeSelectToken = () =>
  createSelector(selectApp, appState => appState.get('token'));

export const makeSelectDrawerOpen = () =>
  createSelector(selectApp, appState => appState.get('drawerOpen'));

export const makeSelectRehydrated = () =>
  createSelector(selectRehydrate, rehydrateState => rehydrateState);

export const makeSelectOrder = () =>
  createSelector(selectApp, state => state.get('order'));
export const makeSelectOrderBy = () =>
  createSelector(selectApp, state => state.get('orderBy'));
export const makeSelectPage = () =>
  createSelector(selectApp, state => state.get('page'));
export const makeSelectRowsPerPage = () =>
  createSelector(selectApp, state => state.get('rowsPerPage'));

export { selectRoute, selectApp, selectRehydrate };

export const appSelectors = {
  location: makeSelectLocation(),
  token: makeSelectToken(),
  drawerOpen: makeSelectDrawerOpen(),
  rehydrated: makeSelectRehydrated(),
};
