/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class AgeRangeSlider extends React.PureComponent {
  render() {
    const { classes, defaultValue, onChange, disabled, value } = this.props;
    return (
      <div className={classes.sliderContainer}>
        <label className={classes.ageRangeLabel}>Age range</label>
        <InputRange
          draggableTrack
          maxValue={defaultValue.max}
          minValue={defaultValue.min}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    );
  }
}

const ageRange = PropTypes.shape({
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
});

AgeRangeSlider.propTypes = {
  defaultValue: ageRange,
  value: ageRange,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

AgeRangeSlider.defaultProps = {
  disabled: false,
};

export default withStyles(styles)(AgeRangeSlider);
