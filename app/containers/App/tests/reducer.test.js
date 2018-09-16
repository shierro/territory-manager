import { fromJS } from 'immutable';
import AppReducer from '../reducer';
import {
  setToken,
  logout,
  toggleDrawer,
  handleRequestSort,
  handleChangePage,
  handleChangeRowsPerPage,
} from '../actions';

describe('AppReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      token: '',
      drawerOpen: false,
      order: 'asc',
      orderBy: 'firstName',
      page: 0,
      rowsPerPage: 5,
    });
  });

  it('returns the initial state', () => {
    expect(AppReducer(undefined, {})).toEqual(state);
  });

  it('should handle the doLogin action correctly', () => {
    const payload = 'newToken';
    expect(AppReducer(state, setToken(payload))).toEqual(
      state.set('token', payload),
    );
  });

  it('should handle the logout action correctly', () => {
    expect(AppReducer(state, logout())).toEqual(state);
  });

  it('should handle the toggleDrawer action correctly', () => {
    expect(AppReducer(state, toggleDrawer())).toEqual(
      state.set('drawerOpen', true),
    );
  });

  it('should handle handleChangePage action correctly', () => {
    const newState = AppReducer(state, handleChangePage(5));
    expect(newState.get('page')).toEqual(5);
  });
  it('should handle handleChangeRowsPerPage action correctly', () => {
    const event = { target: { value: 5 } };
    const newState = AppReducer(state, handleChangeRowsPerPage(event));
    expect(newState.get('rowsPerPage')).toEqual(event.target.value);
  });
  it('should handle sort action correctly', () => {
    const newState = AppReducer(state, handleRequestSort('age'));
    expect(newState.get('orderBy')).toEqual('age');
    expect(newState.get('order')).toEqual('desc');
    const newState2 = AppReducer(newState, handleRequestSort('age'));
    expect(newState2.get('order')).toEqual('asc');
  });
});
