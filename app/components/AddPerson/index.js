import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Cancel from '@material-ui/icons/Cancel';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class AddPerson extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.moveToStep(this.props.activeStep + 1);
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
        label="Address"
        InputLabelProps={{ shrink: true }}
        placeholder="Address"
        helperText="Specify the address of the person"
        fullWidth
        margin="normal"
        value={this.props.newPerson.address}
        onChange={({ target }) =>
          this.props.handleInputChange('address', target.value)
        }
      />
      <TextField
        label="Notes"
        InputLabelProps={{ shrink: true }}
        placeholder="Notes"
        helperText="You can add some notes"
        fullWidth
        margin="normal"
        value={this.props.newPerson.notes}
        onChange={({ target }) =>
          this.props.handleInputChange('notes', target.value)
        }
      />
      {this.getFormFooter(classes, activeStep, true)}
    </form>
  );
  getInformationForm = (classes, activeStep, newPerson) => (
    <form className={classes.form} onSubmit={this.handleSubmit}>
      <TextField
        label="First name"
        InputLabelProps={{ shrink: true }}
        placeholder="first name"
        helperText="Speficy first name of person"
        fullWidth
        required
        margin="normal"
        value={this.props.newPerson.firstName}
        onChange={({ target }) =>
          this.props.handleInputChange('firstName', target.value)
        }
      />
      <TextField
        label="Last name"
        InputLabelProps={{ shrink: true }}
        placeholder="last name"
        helperText="Speficy last name of person"
        fullWidth
        margin="normal"
        value={this.props.newPerson.lastName}
        onChange={({ target }) =>
          this.props.handleInputChange('lastName', target.value)
        }
      />
      <Divider />
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
    return (
      <Popover
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ top: verticalCener, left: horizontalCenter }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
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
};

export default withStyles(styles)(AddPerson);
