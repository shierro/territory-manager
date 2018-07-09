import React from 'react';
import { mount } from 'enzyme';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import PrivateRoute from '../index';
import configureStore from '../../../configureStore';
const history = createHistory({ initialEntries: ['/map'], basename: '/map' });
const store = configureStore({}, history);

describe.skip('<PrivateRoute />', () => {
  it('should render private route successfully', () => {
    const props = {
      token: 'token',
      component: () => <h2>Test</h2>,
      exact: true,
      path: '/map',
    };
    const element = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PrivateRoute {...props} />
        </ConnectedRouter>,
      </Provider>
    );
    const rendered = mount(element);
    expect(rendered.length).toEqual(1);
    expect(rendered.find('h2').length).toEqual(1);
  });
});
