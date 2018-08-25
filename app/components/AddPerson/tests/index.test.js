import React from 'react';
import { mount } from 'enzyme';
import AddPerson from '../index';

const ageRange = { min: 1, max: 120 };

function simulateChange(el, ev, key) {
  el.at(key)
    .find('input')
    .simulate('change', ev);
}

describe('<AddPerson />', () => {
  const props = {
    open: true,
    activeStep: 0,
    classes: { addressForm: 'addressForm', form: 'form' },
    ageRange,
    newPerson: {
      firstName: 'name',
      lastName: '',
      notes: '',
      address: '',
      ageRange,
    },
    moveToStep: () => true,
    cancelAdd: () => true,
    handleInputChange: (key, value) => {
      props.newPerson[key] = value;
    },
  };
  it('should render 2 text fields that listens to events on step 1 successfully', () => {
    const rendered = mount(<AddPerson {...props} />);
    const txtFields = rendered.find('TextField');
    expect(rendered.length).toEqual(1);
    expect(rendered.find('.form').length).toEqual(1);
    expect(txtFields.length).toEqual(2);
    const event = { target: { value: 'theo' } };
    simulateChange(txtFields, event, 0);
    expect(props.newPerson.firstName).toEqual(event.target.value);
    event.target.value = 'lastNameTest';
    simulateChange(txtFields, event, 1);
    expect(props.newPerson.lastName).toEqual(event.target.value);
  });

  it('should render 2 text fields on step 2 successfully', () => {
    props.activeStep = 1;
    const rendered = mount(<AddPerson {...props} />);
    const txtFields = rendered.find('TextField');
    expect(rendered.length).toEqual(1);
    expect(rendered.find('.addressForm').length).toEqual(1);
    expect(txtFields.length).toEqual(2);
    const event = { target: { value: 'address' } };
    simulateChange(txtFields, event, 0);
    expect(props.newPerson.address).toEqual(event.target.value);
    event.target.value = 'notesTest';
    simulateChange(txtFields, event, 1);
    expect(props.newPerson.notes).toEqual(event.target.value);
  });

  it('should render "step not found" when activeStep is not on range', () => {
    props.activeStep = 5;
    const rendered = mount(<AddPerson {...props} />);
    expect(rendered.length).toEqual(1);
    expect(rendered.contains('Step not found')).toEqual(true);
  });

  it('should handle submit successfully', done => {
    props.activeStep = 0;
    props.moveToStep = () => done();
    const rendered = mount(<AddPerson {...props} />);
    expect(rendered.length).toEqual(1);
    const submit = rendered.find('form');
    submit.simulate('submit');
  });
});
