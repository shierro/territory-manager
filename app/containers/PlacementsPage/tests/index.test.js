import React from 'react';
import { shallow } from 'enzyme';

import { PlacementsPage } from '../index';

describe('<PlacementsPage />', () => {
  const testData = { values: [{}, {}, {}], total: 5 };
  const pageProps = {
    title: 'placements!',
    grouping: 'weekly',
    increment: () => true,
    placements: { videos: { ...testData }, publications: { ...testData } },
    classes: {},
  };
  it('Expect to render the container successfully', () => {
    const wrapper = shallow(<PlacementsPage {...pageProps} />);
    expect(wrapper.length).toEqual(1);
    // expect(wrapper.find('h1').length).toEqual(1);
  });
});
