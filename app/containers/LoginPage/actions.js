/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN,
  SET_ERROR,
} from './constants';

export function doLogin(username, password) {
  return {
    type: LOGIN,
    username,
    password,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}
