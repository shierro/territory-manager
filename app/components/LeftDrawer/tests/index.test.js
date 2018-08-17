import React from 'react';
import { mount } from 'enzyme';
import LeftDrawer from '../index';

describe('<LeftDrawer />', () => {
  const props = {
    classes: {},
    open: true,
    hidden: true,
    toggleDrawer: () => false,
    logout: () => true,
  };
  it('should render with an opened drawer', () => {
    const wrapper = mount(<LeftDrawer {...props} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('Drawer').length).toEqual(1);
    expect(wrapper.find('Drawer').prop('open')).toEqual(true);
  });
  it('should render with a closed drawer', () => {
    props.open = false;
    const wrapper = mount(<LeftDrawer {...props} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('Drawer').prop('open')).toEqual(false);
  });
});
