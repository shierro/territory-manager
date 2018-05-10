import React from 'react';
import { mount } from 'enzyme';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from '../../../configureStore';
import LanguageProvider from '../../LanguageProvider';
import App from '../index';

const history = createHistory();
const store = configureStore({}, history);


describe('<App />', () => {
  it('should render some routes', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider messages={{ test: 'test' }}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });
});
