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

export const makeSelectPeople = () =>
  createSelector(selectMapPage, state => state.get('people').toJS());

export const makeSelectDefaultAgeRange = () =>
  createSelector(selectMapPage, state => state.get('defaultAgeRange').toJS());

export const makeSelectPersonLabels = () =>
  createSelector(selectMapPage, state => state.get('personLabels').toJS());

export const makeSelectAddingVisit = () =>
  createSelector(selectMapPage, state => state.get('addingVisit'));

export const allSelectors = {
  initialLocation: makeSelectInitialLocation(),
  initialLocationLoaded: makeSelectInitialLocationLoaded(),
  zoom: makeSelectZoom(),
  loading: makeSelectLoading(),
  addingPerson: makeSelectAddingPerson(),
  steps: makeSelectSteps(),
  activeStep: makeSelectActiveStep(),
  completed: makeSelectCompleted(),
  newPerson: makeSelectNewPerson(),
  people: makeSelectPeople(),
  ageRange: makeSelectDefaultAgeRange(),
  personLabels: makeSelectPersonLabels(),
  addingVisit: makeSelectAddingVisit(),
};
