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
    rowsPerPage: 5,
    page: 0,
    handleChangePage: () => true,
    handleChangeRowsPerPage: () => true,
    saveVisit: () => true,
    addingVisit: true,
    toggleAddingVisit: () => true,
  };
  it('Expect to render the container successfully', () => {
    const wrapper = shallow(<PersonDetailsPage {...pageProps} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('h2').length).toEqual(1);
  });
  it('Expect to render the `not found` when person by ID does not exist', () => {
    const props = { ...pageProps, match: { params: { id: 100 } } };
    const wrapper = shallow(<PersonDetailsPage {...props} />);
    const h2 = wrapper.find('h2');
    expect(wrapper.length).toEqual(1);
    expect(h2.length).toEqual(1);
    expect(h2.html().indexOf('not found') > -1).toEqual(true);
  });
});
