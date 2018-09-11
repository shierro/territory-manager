import React from 'react';
import { mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';

import { mainStyles } from '../styles';
import { PeopleListPage } from '../index';

describe('<PeopleListPage />', () => {
  const pageProps = {
    data: [
      { firstName: 'fn', visits: [1, 2, 3], ageRange: { min: 1, max: 5 } },
      { firstName: 'fn2', visits: [1, 2, 3, 5], ageRange: { min: 5, max: 10 } },
    ],
    order: 'asc',
    orderBy: 'firstName',
    rowsPerPage: 5,
    page: 1,
    classes: {},
    handleRequestSort: () => true,
    handleChangePage: () => true,
    handleChangeRowsPerPage: () => true,
    history: { push: () => true },
  };
  it('Expect to render the container successfully', () => {
    const Component = withStyles(mainStyles)(PeopleListPage);
    const wrapper = mount(<Component {...pageProps} />);
    const html = wrapper.html();
    expect(wrapper.length).toEqual(1);
    expect(html.includes('table')).toEqual(true);
  });
});
