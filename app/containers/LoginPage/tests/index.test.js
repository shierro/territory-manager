import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { LoginPage } from '../index';

const pageProps = {
  token: '123',
  error: '',
  loading: true,
  login: () => true,
};

describe.only('<LoginPage />', () => {
  it('should render an element', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <LoginPage {...pageProps} />
      </IntlProvider>,
    );
    expect(renderedComponent.length).toEqual(1);
  });
});
