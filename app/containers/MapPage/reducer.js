/*
 *
 * MapPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_INITIAL_LOCATION,
  SET_PAGE_ERROR,
} from './constants';

const initialState = fromJS({
  initialLocation: List([(0, 0)]),
  initialLocationLoaded: false,
  zoom: 16,
  error: {},
});

function mapPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_INITIAL_LOCATION:
      return state
        .set('initialLocation', List(action.coords))
        .set('initialLocationLoaded', true);
    case SET_PAGE_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default mapPageReducer;
