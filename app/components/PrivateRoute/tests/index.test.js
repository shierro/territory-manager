import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from '../index';

describe('<PrivateRoute />', () => {
  it('should render private route successfully', () => {
    const props = {
      token: 'token',
      component: () => <h2>Test</h2>,
      exact: true,
      path: '/map',
    };
    const element = (
      <MemoryRouter initialIndex={2} initialEntries={['/', '/map']}>
        <PrivateRoute {...props} />
      </MemoryRouter>
    );
    const rendered = mount(element);
    expect(rendered.length).toEqual(1);
    expect(rendered.find('h2').length).toEqual(1);
  });
});
