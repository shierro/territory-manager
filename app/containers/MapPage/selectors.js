import { createSelector } from 'reselect';

export const selectMapPage = state => state.get('mapPage');

export const makeSelectInitialLocation = () =>
  createSelector(selectMapPage, state => state.get('initialLocation').toJS());

export const makeSelectInitialLocationLoaded = () =>
  createSelector(selectMapPage, state => state.get('initialLocationLoaded'));

export const makeSelectZoom = () =>
  createSelector(selectMapPage, state => state.get('zoom'));

export const makeSelectLoading = () =>
  createSelector(selectMapPage, state => state.get('loading'));

export const makeSelectAddingPerson = () =>
  createSelector(selectMapPage, state => state.get('addingPerson'));

export const makeSelectSteps = () =>
  createSelector(selectMapPage, state => state.get('steps').toJS());

export const makeSelectNewPerson = () =>
  createSelector(selectMapPage, state => state.get('newPerson').toJS());

export const makeSelectCompleted = () =>
  createSelector(selectMapPage, state => state.get('completed').toJS());

export const makeSelectActiveStep = () =>
  createSelector(selectMapPage, state => state.get('activeStep'));

export const makeSelectPersons = () =>
  createSelector(selectMapPage, state => state.get('persons').toJS());

export const makeSelectDefaultAgeRange = () =>
  createSelector(selectMapPage, state => state.get('defaultAgeRange').toJS());
