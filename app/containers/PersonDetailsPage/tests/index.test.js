import React from 'react';
import { shallow } from 'enzyme';

import { PersonDetailsPage } from '../index';

describe('<PersonDetailsPage />', () => {
  const pageProps = {
    title: 'title',
    visitsTitle: 'visitsTitle',
    match: { params: { id: 1 } },
    people: {
      1: {
        fn: 'fn',
        visits: [
          { date: new Date(), found: true },
          { date: new Date(), found: false, note: 'not found' },
        ],
      },
    },
    handlePersonUpdate: () => true,
    handlePersonClick: () => true,
    order: 'order',
    orderBy: 'orderBy',
    handleRequestSort: () => true,
    classes: {},
  };
  it('Expect to render the container successfully', () => {
    const wrapper = shallow(<PersonDetailsPage {...pageProps} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('h2').length).toEqual(1);
  });
});
