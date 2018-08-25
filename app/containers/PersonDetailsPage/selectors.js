import { createSelector } from 'reselect';

export const personDetailsPage = state => state.get('personDetailsPage');

export const makeSelectTitle = () =>
  createSelector(personDetailsPage, state => state.get('title'));

export const allSelectors = {
  title: makeSelectTitle(),
};
