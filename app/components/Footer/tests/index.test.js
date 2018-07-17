import React from 'react';
import { mount } from 'enzyme';
import Footer from '../index';

describe('<Footer />', () => {
  it('should render with 1 div successfully', () => {
    const rendered = mount(<Footer />);
    expect(rendered.length).toEqual(1);
    expect(rendered.find('div').length).toEqual(1);
  });
});
