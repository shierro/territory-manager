import { fromJS } from 'immutable';

import {
  loginPage,
  makeSelectError,
  makeSelectLoading,
} from '../selectors';

describe('selectLoginPage', () => {
  it('should select the loginPage state', () => {
    const state = fromJS({
      error: '',
      loading: false,
    });
    const mockedState = fromJS({
      loginPage: {
        error: '',
        loading: false,
      },
    });
    expect(loginPage(mockedState)).toEqual(state);
  });

  it('should select the error state', () => {
    const selector = makeSelectError();
    const error = 'error';
    const mockedState = fromJS({ loginPage: { error } });
    expect(selector(mockedState)).toEqual(error);
  });

  it('should select the loading state', () => {
    const selector = makeSelectLoading();
    const loading = true;
    const mockedState = fromJS({ loginPage: { loading } });
    expect(selector(mockedState)).toEqual(loading);
  });
});
