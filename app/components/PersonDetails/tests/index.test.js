import React from 'react';
import { mount } from 'enzyme';
import PersonDetails from '../index';

describe('<PersonDetails />', () => {
  it('should render with components successfully', () => {
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
      handlePersonUpdate: () => true,
    };
    const rendered = mount(<PersonDetails {...props} />);
    expect(rendered.length).toEqual(1);
    expect(rendered.find('AgeRangeSlider').length).toEqual(1);
    expect(rendered.find('FormControlLabel').length).toEqual(1);
    expect(rendered.find('TextField').length).toEqual(4);
  });
});
