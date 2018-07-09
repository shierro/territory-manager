import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class AddPersonStepper extends React.PureComponent {
  render() {
    const { activeStep, completed, steps, classes } = this.props;
    return (
      <Stepper nonLinear activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton completed={completed[index]}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    );
  }
}

AddPersonStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  completed: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(AddPersonStepper);
