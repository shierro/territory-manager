import React from 'react';
import { mount } from 'enzyme';
import PersonDetails from '../index';

describe('<PersonDetails />', () => {
  const ageRange = { min: 1, max: 119 };
  const props = {
    person: {
      firstName: 'FN',
      lastName: 'LN',
      notes: 'Note!',
      address: 'address',
      ageRange,
      visits: [{ found: true, note: 'test' }],
    },
    defaultAgeRange: ageRange,
    personLabels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      notes: 'Notes',
      address: 'Address',
      ageRange: 'Age Range',
      visits: 'Visits',
    },
    classes: {},
    handlePersonUpdate: (key, value) => {
      props.person[key] = value;
    },
  };
  const wrapper = mount(<PersonDetails {...props} />);

  it('should render with components successfully', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('AgeRangeSlider').length).toEqual(1);
    expect(wrapper.find('FormControlLabel').length).toEqual(1);
    expect(wrapper.find('TextField').length).toEqual(4);
  });
  it('should change textfield data successfully', () => {
    const event = { target: { value: 'newText' } };
    wrapper
      .find('TextField')
      .first()
      .find('input')
      .simulate('change', event);
    expect(props.person.firstName).toEqual(event.target.value);
  });
  it('should switch to edit mode correctly', () => {
    wrapper
      .find('Switch')
      .find('input')
      .simulate('change');
    expect(wrapper.find('AgeRangeSlider').prop('disabled')).toEqual(false);
  });
});
