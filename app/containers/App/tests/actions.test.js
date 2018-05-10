
import {
  setToken,
  logout,
  toggleDrawer,
} from '../actions';
import {
  SET_TOKEN,
  LOGOUT,
  TOGGLE_DRAWER,
} from '../constants';

describe('App actions', () => {
  it('has a type of LOGOUT', () => {
    const expected = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expected);
  });
  it('has a type of SET_TOKEN', () => {
    const expected = {
      type: SET_TOKEN,
    };
    expect(setToken()).toEqual(expected);
  });
  it('has a type of TOGGLE_DRAWER', () => {
    const expected = {
      type: TOGGLE_DRAWER,
    };
    expect(toggleDrawer()).toEqual(expected);
  });
});
