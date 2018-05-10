import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');
const selectApp = (state) => state.get('App');

export const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export const makeSelectToken = () => createSelector(
  selectApp,
  (appState) => appState.get('token')
);

export const makeSelectDrawerOpen = () => createSelector(
  selectApp,
  (appState) => appState.get('drawerOpen')
);
