
import { fromJS } from 'immutable';
import AppReducer from '../reducer';
import {
  setToken,
  logout,
  toggleDrawer,
} from '../actions';

describe('AppReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      token: '',
      drawerOpen: false,
    });
  });

  it('returns the initial state', () => {
    expect(AppReducer(undefined, {})).toEqual(state);
  });

  it('should handle the doLogin action correctly', () => {
    const payload = 'newToken';
    expect(AppReducer(state, setToken(payload))).toEqual(state.set('token', payload));
  });

  it('should handle the logout action correctly', () => {
    expect(AppReducer(state, logout())).toEqual(state);
  });

  it('should handle the toggleDrawer action correctly', () => {
    expect(AppReducer(state, toggleDrawer())).toEqual(state.set('drawerOpen', true));
  });
});
