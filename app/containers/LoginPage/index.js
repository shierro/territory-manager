/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectError, makeSelectLoading } from './selectors';

import { doLogin } from './actions';

import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    const { username, password } = this.state;
    const { error, loading } = this.props;
    return (
      <Paper elevation={4} className="login">
        <Helmet>
          <title>LoginPage</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <Divider />
          <TextField
            label="Username"
            helperText="Enter your username"
            margin="normal"
            fullWidth
            value={username}
            onChange={e => this.handleChange('username', e.target.value)}
          />
          <TextField
            label="Password"
            helperText="Enter your password"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={e => this.handleChange('password', e.target.value)}
          />
          <h4
            style={{ display: !error ? 'none' : 'block' }}
            className="login__error"
          >
            {error}
          </h4>
          <LinearProgress style={{ display: loading ? 'block' : 'none' }} />
          <div className="login__footer">
            <Button
              type="submit"
              variant="raised"
              color="primary"
              disabled={loading}
            >
              Login
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

LoginPage.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(doLogin(username, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
