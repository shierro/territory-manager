import React from 'react';
// import { mount } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import AddVisit from '../index';

describe('<AddVisit />', () => {
  const mount = createMount();
  const props = {
    person: { visits: [{ found: true, note: 'test' }] },
    classes: {},
    saveVisit: () => true,
  };

  it('should render with 4 IconButtons successfully', () => {
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    expect(rendered.find('IconButton').length).toEqual(4);
  });

  it.skip('should edit note successfully', () => {
    const event = { target: { value: 'newNote' } };
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    rendered.find('TextField').simulate('change', event);
    expect(rendered.state('note')).toEqual(event.target.value);
  });

  it('should save visit successfully', done => {
    props.saveVisit = visitData => {
      expect(visitData).toEqual({ found: true, note: '' });
      done();
    };
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    rendered.find('Save').simulate('click');
  });
});
