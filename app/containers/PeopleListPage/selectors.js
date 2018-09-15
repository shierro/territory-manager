import { createSelector } from 'reselect';
import {
  makeSelectOrder,
  makeSelectOrderBy,
  makeSelectPage,
  makeSelectRowsPerPage,
} from '../App/selectors';

export const mapPage = state => state.get('mapPage');

export const makeSelectData = () =>
  createSelector(mapPage, state => state.get('people').toJS());
// state
//   .get('people')
//   .toIndexedSeq()
//   .toArray()
//   .map(item => item.toJS()),

export const allSelectors = {
  order: makeSelectOrder(),
  orderBy: makeSelectOrderBy(),
  page: makeSelectPage(),
  rowsPerPage: makeSelectRowsPerPage(),
  data: makeSelectData(),
};
