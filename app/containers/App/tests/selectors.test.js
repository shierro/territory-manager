import { fromJS } from 'immutable';

import {
  makeSelectLocation,
  selectApp,
  selectRehydrate,
  makeSelectToken,
  makeSelectDrawerOpen,
  makeSelectRehydrated,
} from 'containers/App/selectors';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const route = fromJS({
      location: { pathname: '/foo' },
    });
    const mockedState = fromJS({ route });
    expect(makeSelectLocation()(mockedState)).toEqual(
      route.get('location').toJS(),
    );
  });
  it('should select the App state', () => {
    const mockedState = fromJS({ App: { loading: true } });
    expect(selectApp(mockedState).toJS()).toEqual(mockedState.toJS().App);
  });
  it('should select the rehydrate state from selectRehydrate', () => {
    const mockedState = fromJS({ rehydrate: { loading: true } });
    expect(selectRehydrate(mockedState).toJS()).toEqual(
      mockedState.toJS().rehydrate,
    );
  });
  it('should select the token state', () => {
    const selector = makeSelectToken();
    const token = 'token';
    const mockedState = fromJS({ App: { token } });
    expect(selector(mockedState)).toEqual(token);
  });
  it('should select the drawerOpen state', () => {
    const selector = makeSelectDrawerOpen();
    const drawerOpen = true;
    const mockedState = fromJS({ App: { drawerOpen } });
    expect(selector(mockedState)).toEqual(drawerOpen);
  });
  it('should select the rehydrate state from makeSelectRehydrated', () => {
    const selector = makeSelectRehydrated();
    const rehydrate = true;
    const mockedState = fromJS({ rehydrate });
    expect(selector(mockedState)).toEqual(rehydrate);
  });
});
