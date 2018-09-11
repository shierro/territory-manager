import { createSelector } from 'reselect';

export const peopleListPage = state => state.get('peopleListPage');
export const mapPage = state => state.get('mapPage');

export const makeSelectOrder = () =>
  createSelector(peopleListPage, state => state.get('order'));
export const makeSelectOrderBy = () =>
  createSelector(peopleListPage, state => state.get('orderBy'));
export const makeSelectPage = () =>
  createSelector(peopleListPage, state => state.get('page'));
export const makeSelectRowsPerPage = () =>
  createSelector(peopleListPage, state => state.get('rowsPerPage'));
export const makeSelectData = () =>
  createSelector(mapPage, state =>
    state
      .get('people')
      .toIndexedSeq()
      .toArray()
      .map(item => item.toJS()),
  );

export const allSelectors = {
  order: makeSelectOrder(),
  orderBy: makeSelectOrderBy(),
  page: makeSelectPage(),
  rowsPerPage: makeSelectRowsPerPage(),
  data: makeSelectData(),
};
