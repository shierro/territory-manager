import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';

import { LOGIN } from './constants';
import { setError } from './actions';
import { setToken } from '../App/actions';
import config from '../../../config';

/**
 * login request/response handler
 */
export function* login({ data }) {
  const requestURL = `${config.apiHost}/api/login`;
  try {
    const response = yield call(axios.post, requestURL, data);
    yield put(setToken(response));
    yield put(push('/map'));
  } catch (err) {
    const error = !err.response
      ? 'Something went wrong. Try again later'
      : err.response.data.message;
    yield put(setError(error));
  }
}

export function* loginFake({ username, password }) {
  try {
    if (username === 'admin' && password === 'admin') {
      yield put(setToken('testToken'));
      return yield put(push('/map'));
    }
    return yield put(setError('Invalid credentials'));
  } catch (err) {
    const error = !err.response
      ? 'Something went wrong. Try again later'
      : err.response.data.message;
    return yield put(setError(error));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN, loginFake);
}
