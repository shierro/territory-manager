import React from 'react';
import { shallow } from 'enzyme';

import { PersonDetailsPage } from '../index';

describe('<PersonDetailsPage />', () => {
  it('Expect to render the container successfully', () => {
    const wrapper = shallow(<PersonDetailsPage />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
  });
});
