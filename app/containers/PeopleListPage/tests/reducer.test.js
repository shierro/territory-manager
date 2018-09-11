import { fromJS } from 'immutable';
import PeopleListPageReducer, { initialState } from '../reducer';
import { pageActions } from '../actions';

const actions = pageActions(result => result);

describe('PeopleListPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(PeopleListPageReducer(undefined, {})).toEqual(state);
  });
  it('should handle handleChangePage action correctly', () => {
    const newState = PeopleListPageReducer(
      state,
      actions.handleChangePage({}, 5),
    );
    expect(newState.get('page')).toEqual(5);
  });
  it('should handle handleChangeRowsPerPage action correctly', () => {
    const newState = PeopleListPageReducer(
      state,
      actions.handleChangeRowsPerPage(),
    );
    expect(newState.get('rowsPerPage')).toEqual(undefined);
  });
  it('should handle sort action correctly', () => {
    const newState = PeopleListPageReducer(
      state,
      actions.handleRequestSort({}, 'age'),
    );
    expect(newState.get('orderBy')).toEqual('age');
    expect(newState.get('order')).toEqual('desc');
    const newState2 = PeopleListPageReducer(
      newState,
      actions.handleRequestSort({}, 'age'),
    );
    expect(newState2.get('order')).toEqual('asc');
  });
});
