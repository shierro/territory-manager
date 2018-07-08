import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SET_INITIAL_LOCATION,
  GET_INITIAL_LOCATION,
  SET_PAGE_ERROR,
  SET_LOADING,
} from './constants';
import { getLocation } from '../../utils/location';

export function* setInitLocation() {
  try {
    const { latitude, longitude } = yield call(getLocation);
    yield put({ type: SET_INITIAL_LOCATION, coords: [latitude, longitude] });
  } catch (error) {
    yield put({ type: SET_PAGE_ERROR, error });
    yield put({ type: SET_LOADING, value: false });
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchMapsPageSagas() {
  // Watches for GET_TICKETS_BY_EVENT_ID actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_INITIAL_LOCATION, setInitLocation);
}
