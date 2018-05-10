/*
 *
 * MapPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_TOKEN,
  LOGOUT,
  TOGGLE_DRAWER,
} from './constants';

const initialState = fromJS({
  token: '',
  drawerOpen: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return state.set('token', action.token);
    case LOGOUT:
      return state
        .set('token', '')
        .set('drawerOpen', false);
    case TOGGLE_DRAWER:
      return state.set('drawerOpen', !state.get('drawerOpen'));
    default:
      return state;
  }
}

export default appReducer;
