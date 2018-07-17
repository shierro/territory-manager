import React from 'react';
import { mount } from 'enzyme';
import LeftDrawer from '../index';

describe('<LeftDrawer />', () => {
  it('should render with an opened drawer', () => {
    const props = {
      classes: {},
      theme: {},
      open: true,
      hidden: false,
      toggleDrawer: () => true,
      logout: () => true,
    };
    const rendered = mount(<LeftDrawer {...props} />);
    expect(rendered.length).toEqual(1);
    expect(rendered.contains('Inbox')).toEqual(true);
  });
});
