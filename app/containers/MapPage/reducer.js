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
  GET_INITIAL_LOCATION,
  SET_LOADING,
} from './constants';

const initialState = fromJS({
  initialLocation: List([0, 0]),
  initialLocationLoaded: false,
  loading: false,
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
        .set('initialLocationLoaded', true)
        .set('loading', false);
    case SET_PAGE_ERROR:
      return state.set('error', action.error);
    case GET_INITIAL_LOCATION:
      return state.set('loading', true);
    case SET_LOADING:
      return state.set('loading', action.value);
    default:
      return state;
  }
}

export default mapPageReducer;
