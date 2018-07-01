import { SET_TOKEN, LOGOUT, TOGGLE_DRAWER } from './constants';

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}
