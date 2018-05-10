import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { component: Component, token, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => (
          token
            ? <Component {...props} />
            : <Redirect to="/login" />
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default PrivateRoute;
