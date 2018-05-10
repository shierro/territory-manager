/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_ERROR,
} from './constants';

const initialState = fromJS({
  error: '',
  loading: false,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default loginPageReducer;
