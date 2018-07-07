import { createSelector } from 'reselect';

export const selectMapPage = state => state.get('mapPage');

export const makeSelectInitialLocation = () =>
  createSelector(selectMapPage, state => state.get('initialLocation').toJS());

export const makeSelectInitialLocationLoaded = () =>
  createSelector(selectMapPage, state => state.get('initialLocationLoaded'));

export const makeSelectZoom = () =>
  createSelector(selectMapPage, state => state.get('zoom'));
