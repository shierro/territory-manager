import { fromJS } from 'immutable';
import { SORT, PAGE_CHANGE, ROWS_PER_PAGE_CHANGE } from './constants';

export const initialState = {
  order: 'asc',
  orderBy: 'firstName',
  page: 0,
  rowsPerPage: 5,
};

function handleRequestSort(state, { property }) {
  const orderBy = property;
  let order = 'desc';

  if (state.get('orderBy') === property && state.get('order') === 'desc') {
    order = 'asc';
  }

  return state.set('order', order).set('orderBy', orderBy);
}

function PeopleListPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
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

export default PeopleListPageReducer;
