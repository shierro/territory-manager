import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Header from '../index';

describe('<Header />', () => {
  it('should render with an AppBar & drawer toggle', () => {
    const props = {
      classes: {},
      token: 'test',
      open: true,
      handleDrawerOpen: () => true,
    };
    const rendered = mount(
      <MemoryRouter initialIndex={2} initialEntries={['/', '/map']}>
        <Header {...props} />
      </MemoryRouter>,
    );
    expect(rendered.length).toEqual(1);
    expect(rendered.find('header').length).toEqual(1);
    expect(rendered.find('img').length).toEqual(1);
    expect(rendered.find('button.drawer-toggle').length).toEqual(1);
  });
});
