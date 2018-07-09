import React from 'react';
import { mount } from 'enzyme';
import AddPersonStepper from '../index';

describe('<AddPersonStepper />', () => {
  it('should render with 2 steps successfully', () => {
    const props = {
      steps: ['step1', 'step2'],
      activeStep: 1,
      completed: { 0: true },
      classes: { stepper: 'step' },
    };
    const rendered = mount(<AddPersonStepper {...props} />);
    expect(rendered.length).toEqual(1);
    expect(rendered.find('Step').length).toEqual(2);
  });
});
