/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Cancel from '@material-ui/icons/Cancel';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { withStyles } from '@material-ui/core/styles';
import AgeRangeSlider from '../AgeRangeSlider';
import Divider from '../Divider';
import styles from './styles';

const sameTextFieldProps = {
  InputLabelProps: { shrink: true },
  fullWidth: true,
  margin: 'normal',
};

class AddPerson extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.moveToStep(this.props.activeStep + 1);
  };
  inputChange = ({ target }, key) => {
    this.props.handleInputChange(key, target.value);
  };
  getFormFooter = (classes, activeStep, enableNext) => (
    <div className={classes.buttonContainer}>
      <IconButton
        disabled={activeStep === 0}
        className={classes.button}
        color="secondary"
        aria-label="Left"
        onClick={() => this.props.moveToStep(activeStep - 1)}
      >
        <NavigateBefore />
      </IconButton>
      <IconButton
        disabled={!enableNext}
        className={classes.button}
        color="primary"
        aria-label="Right"
        type="submit"
      >
        <NavigateNext />
      </IconButton>
    </div>
  );

  getAddressAndNotesForm = (classes, activeStep) => (
    <form className={classes.addressForm} onSubmit={this.handleSubmit}>
      <TextField
        {...sameTextFieldProps}
        placeholder="Address"
        value={this.props.newPerson.address}
        label="Address"
        helperText="Specify the address of the person"
        onChange={e => this.inputChange(e, 'address')}
      />
      <TextField
        placeholder="Notes"
        label="Notes"
        helperText="You can add some notes"
        value={this.props.newPerson.notes}
        {...sameTextFieldProps}
        onChange={e => this.inputChange(e, 'notes')}
      />
      {this.getFormFooter(classes, activeStep, true)}
    </form>
  );
  getInformationForm = (classes, activeStep, newPerson) => (
    <form className={classes.form} onSubmit={this.handleSubmit}>
      <TextField
        placeholder="first name"
        label="First name"
        helperText="Speficy first name of person"
        required
        value={this.props.newPerson.firstName}
        {...sameTextFieldProps}
        onChange={e => this.inputChange(e, 'firstName')}
      />
      <TextField
        placeholder="last name"
        helperText="Speficy last name of person"
        value={this.props.newPerson.lastName}
        label="Last name"
        onChange={e => this.inputChange(e, 'lastName')}
        {...sameTextFieldProps}
      />
      <AgeRangeSlider
        defaultValue={this.props.ageRange}
        value={this.props.newPerson.ageRange}
        onChange={value => this.props.handleInputChange('ageRange', value)}
      />
      <Divider marginTop={20} />
      {this.getFormFooter(
        classes,
        activeStep,
        newPerson.firstName && newPerson.firstName.length > 1,
      )}
    </form>
  );
  renderHeader() {
    return (
      <IconButton
        className={this.props.classes.cancelButton}
        aria-label="Cancel"
        onClick={this.props.cancelAdd}
      >
        <Cancel />
      </IconButton>
    );
  }
  renderStep = (classes, activeStep, newPerson) => {
    switch (activeStep) {
      case 0:
        return this.getInformationForm(classes, activeStep, newPerson);
      case 1:
        return this.getAddressAndNotesForm(classes, activeStep, newPerson);
      default:
        return 'Step not found';
    }
  };
  render() {
    const { open, classes, activeStep, newPerson } = this.props;
    const horizontalCenter = Math.floor(window.innerWidth / 2);
    const verticalCener = Math.floor(window.innerHeight / 2);
    const style = {
      vertical: 'center',
      horizontal: 'center',
    };
    return (
      <Popover
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ top: verticalCener, left: horizontalCenter }}
        anchorOrigin={style}
        transformOrigin={style}
      >
        {this.renderHeader()}
        {this.renderStep(classes, activeStep, newPerson)}
      </Popover>
    );
  }
}

AddPerson.propTypes = {
  open: PropTypes.bool.isRequired,
  activeStep: PropTypes.number.isRequired,
  classes: PropTypes.object,
  newPerson: PropTypes.object,
  handleInputChange: PropTypes.func.isRequired,
  moveToStep: PropTypes.func.isRequired,
  cancelAdd: PropTypes.func.isRequired,
  ageRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }),
};

export default withStyles(styles)(AddPerson);
