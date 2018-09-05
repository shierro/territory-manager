/*
 *
 * PersonDetailsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  title: 'Person Details',
};

function personDetailsPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default personDetailsPageReducer;
