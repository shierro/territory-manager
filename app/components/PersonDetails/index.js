import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AgeRangeSlider from '../AgeRangeSlider';
import Divider from '../Divider';
import styles from './styles';

class PersonDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  renderInputs() {
    const { classes, person, personLabels, textFields } = this.props;
    const { editMode } = this.state;
    const props = Object.keys(person);
    const textFieldProps = props.filter(prop => textFields.indexOf(prop) > -1);
    const inputs = textFieldProps.map((prop, key) => (
      <TextField
        key={`person-details-${key + 1}`}
        className={classes.inputContainer}
        value={person[prop]}
        onChange={({ target }) =>
          this.props.handlePersonUpdate(prop, target.value)
        }
        disabled={!editMode}
        fullWidth
        InputLabelProps={{ shrink: true }}
        label={personLabels[prop]}
      />
    ));
    inputs.push(
      <div key="age-range-key" className={classes.ageRangeContainer}>
        <AgeRangeSlider
          defaultValue={this.props.defaultAgeRange}
          value={person.ageRange}
          onChange={val => this.props.handlePersonUpdate('ageRange', val)}
          disabled={!editMode}
        />
        <Divider marginTop={20} />
      </div>,
    );
    return inputs;
  }
  render() {
    const { classes, person, personLabels } = this.props;
    const { editMode } = this.state;
    const onSwitch = () => this.setState({ editMode: !editMode });
    return (
      <div className={classes.container}>
        <FormControlLabel
          control={<Switch checked={editMode} onChange={onSwitch} />}
          label="Edit mode"
          labelPlacement="start"
          classes={{ labelPlacementStart: classes.editSwitchLabel }}
        />
        {this.renderInputs(person, personLabels, editMode)}
      </div>
    );
  }
}

PersonDetails.propTypes = {
  person: PropTypes.object.isRequired,
  defaultAgeRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }),
  personLabels: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  textFields: PropTypes.arrayOf(PropTypes.string),
  handlePersonUpdate: PropTypes.func.isRequired,
};

PersonDetails.defaultProps = {
  textFields: ['firstName', 'lastName', 'notes', 'address'],
};

export default withStyles(styles)(PersonDetails);
