import { createSelector } from 'reselect';
import { makeSelectPeople, makeSelectAddingVisit } from '../MapPage/selectors';
import {
  makeSelectOrder,
  makeSelectOrderBy,
  makeSelectPage,
  makeSelectRowsPerPage,
} from '../App/selectors';

export const personDetailsPage = state => state.get('personDetailsPage');

export const makeSelectTitle = () =>
  createSelector(personDetailsPage, state => state.get('title'));
export const makeSelectVisitsTitle = () =>
  createSelector(personDetailsPage, state => state.get('visitsTitle'));

export const allSelectors = {
  title: makeSelectTitle(),
  visitsTitle: makeSelectVisitsTitle(),
  people: makeSelectPeople(),
  order: makeSelectOrder(),
  orderBy: makeSelectOrderBy(),
  page: makeSelectPage(),
  rowsPerPage: makeSelectRowsPerPage(),
  addingVisit: makeSelectAddingVisit(),
};
