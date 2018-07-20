import Divider from '@material-ui/core/Divider';
import React from 'react';
import PropTypes from 'prop-types';

class DividerComponent extends React.PureComponent {
  render() {
    const styles = {
      margin: this.props.margin,
      marginleft: this.props.marginLeft,
      marginRight: this.props.marginRight,
      marginTop: this.props.marginTop,
      marginDown: this.props.marginDown,
    };
    return <Divider style={styles} />;
  }
}

DividerComponent.propTypes = {
  margin: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginDown: PropTypes.number,
};

DividerComponent.defaultProps = {
  margin: undefined,
};

export default DividerComponent;
