import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const loginPage = state => state.get('loginPage');

/**
 * Other specific selectors
 */

const makeSelectError = () =>
  createSelector(loginPage, state => state.get('error'));

const makeSelectLoading = () =>
  createSelector(loginPage, state => state.get('loading'));

export { loginPage, makeSelectError, makeSelectLoading };
