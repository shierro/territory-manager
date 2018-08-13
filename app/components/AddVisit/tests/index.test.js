import React from 'react';
// import { mount } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import AddVisit from '../index';

describe('<AddVisit />', () => {
  const mount = createMount();

  it('should render with 4 IconButtons successfully', () => {
    const props = {
      person: { visits: [{ found: true, note: 'test' }] },
      classes: {},
      saveVisit: () => true,
    };
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    expect(rendered.find('IconButton').length).toEqual(4);
  });

  it.skip('should edit note successfully', () => {
    const props = {
      person: { visits: [{ found: true, note: 'test' }] },
      classes: {},
      saveVisit: () => true,
    };
    const event = { target: { value: 'newNote' } };
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    rendered.find('TextField').simulate('change', event);
    expect(rendered.state('note')).toEqual(event.target.value);
  });

  it('should save visit successfully', done => {
    const props = {
      visitData: {},
      classes: {},
      person: { visits: [{ found: true, note: 'test' }] },
      saveVisit: visitData => {
        expect(visitData).toEqual({ found: true, note: '' });
        done();
      },
    };
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    rendered.find('Save').simulate('click');
  });
});
