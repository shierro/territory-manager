import { fromJS } from 'immutable';
import {
  SET_TOKEN,
  LOGOUT,
  TOGGLE_DRAWER,
  SORT,
  PAGE_CHANGE,
  ROWS_PER_PAGE_CHANGE,
} from './constants';

const initialState = fromJS({
  token: '',
  drawerOpen: false,
  order: 'asc',
  orderBy: 'firstName',
  page: 0,
  rowsPerPage: 5,
});

function handleRequestSort(state, { property }) {
  const orderBy = property;
  let order = 'desc';

  if (state.get('orderBy') === property && state.get('order') === 'desc') {
    order = 'asc';
  }

  return state.set('order', order).set('orderBy', orderBy);
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return state.set('token', action.token);
    case LOGOUT:
      return state.set('token', '').set('drawerOpen', false);
    case TOGGLE_DRAWER:
      return state.set('drawerOpen', !state.get('drawerOpen'));
    case SORT:
      return handleRequestSort(state, action);
    case PAGE_CHANGE:
      return state.set('page', action.page);
    case ROWS_PER_PAGE_CHANGE:
      return state.set('rowsPerPage', action.rowsPerPage);
    default:
      return state;
  }
}

export default appReducer;
