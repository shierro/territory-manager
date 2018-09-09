import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import mainContent from '../mainContent';

describe('container/App/mainContent.js', () => {
  it('should render mainContent successfully', () => {
    const props = {
      token: 'token!',
      classes: {},
    };
    const rendered = mount(
      <IntlProvider locale="en">
        <MemoryRouter initialIndex={2} initialEntries={['/', '/test']}>
          {mainContent(props)}
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(rendered.find('main').length).toEqual(1);
    expect(rendered.find('Switch').length).toEqual(1);
  });
});
