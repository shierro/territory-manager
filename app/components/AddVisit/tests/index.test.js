import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import AddVisit from '../index';

describe('<AddVisit />', () => {
  const mount = createMount();
  const props = {
    person: { visits: [{ found: true, note: 'test' }] },
    classes: {},
    saveVisit: () => true,
    addingVisit: false,
    toggleAddingVisit: () => true,
  };

  it('should render with 4 IconButtons successfully', () => {
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    expect(rendered.find('IconButton').length).toEqual(4);
  });

  it('should edit and save visit successfully', done => {
    const event = { target: { value: 'newNote' } };
    props.saveVisit = visitData => {
      expect(visitData).toEqual({ found: true, note: 'newNote' });
      done();
    };
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    rendered
      .find('textarea')
      .at(2)
      .simulate('change', event);
    rendered.find('Save').simulate('click');
  });

  it('should not toggle addingVisit when its already open', done => {
    props.toggleAddingVisit = () => done('test should not trigger this..');
    props.addingVisit = true;
    const rendered = mount(<AddVisit {...props} />);
    expect(rendered.length).toEqual(1);
    rendered.find('CheckCircle').simulate('click');
    rendered.find('VoiceOverOff').simulate('click');
    expect(rendered.prop('addingVisit')).toEqual(props.addingVisit);
    setTimeout(done, 100);
  });
});
