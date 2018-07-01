import { fromJS } from 'immutable';
import loginPageReducer from '../reducer';
import { doLogin, setError } from '../actions';

describe('loginPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      error: '',
      loading: false,
    });
  });

  it('returns the initial state', () => {
    expect(loginPageReducer(undefined, {})).toEqual(state);
  });

  it('should handle the doLogin action correctly', () => {
    const payload = { username: 'admin', password: 'admin' };
    expect(loginPageReducer(state, doLogin(payload))).toEqual(state);
  });

  it('should handle the setError action correctly', () => {
    const error = 'test';
    const expectedState = state.set('error', error);
    expect(loginPageReducer(state, setError(error))).toEqual(expectedState);
  });
});
