import React from 'react';
import { mount } from 'enzyme';
import AddPerson from '../index';

const ageRange = { min: 1, max: 120 };

describe('<AddPerson />', () => {
  it('should render 2 text fields on step 1 successfully', () => {
    const props = {
      open: true,
      activeStep: 0,
      classes: { form: 'form' },
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
      handleInputChange: () => true,
    };
    const rendered = mount(<AddPerson {...props} />);
    expect(rendered.length).toEqual(1);
    expect(rendered.find('.form').length).toEqual(1);
    expect(rendered.find('TextField').length).toEqual(2);
  });

  it('should render 2 text fields on step 2 successfully', () => {
    const props = {
      open: true,
      activeStep: 1,
      classes: { addressForm: 'addressForm' },
      newPerson: {
        firstName: '',
        lastName: '',
        notes: 'note!',
        address: '',
        ageRange,
      },
      ageRange,
      moveToStep: () => true,
      cancelAdd: () => true,
      handleInputChange: () => true,
    };
    const rendered = mount(<AddPerson {...props} />);
    expect(rendered.length).toEqual(1);
    expect(rendered.find('.addressForm').length).toEqual(1);
    expect(rendered.find('TextField').length).toEqual(2);
  });

  it('should render "step not found" when activeStep is not on range', () => {
    const props = {
      open: true,
      activeStep: 5,
      newPerson: {},
      ageRange,
      moveToStep: () => true,
      cancelAdd: () => true,
      handleInputChange: () => true,
    };
    const rendered = mount(<AddPerson {...props} />);
    expect(rendered.length).toEqual(1);
    expect(rendered.contains('Step not found')).toEqual(true);
  });

  it('should handle submit successfully', done => {
    const props = {
      open: true,
      activeStep: 0,
      ageRange,
      classes: { addressForm: 'addressForm' },
      newPerson: {
        firstName: 'test',
        lastName: '',
        ageRange,
      },
      moveToStep: () => done(),
      cancelAdd: () => true,
      handleInputChange: () => true,
    };
    const rendered = mount(<AddPerson {...props} />);
    expect(rendered.length).toEqual(1);
    const submit = rendered.find('form');
    submit.simulate('submit');
  });
});
