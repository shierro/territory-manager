import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Footer from 'components/Footer';
import Header from 'components/Header';
import LeftDrawer from 'components/LeftDrawer';
import LoginPage from 'containers/LoginPage/Loadable';
import MapPage from 'containers/MapPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeSelectLocation,
  makeSelectToken,
  makeSelectDrawerOpen,
} from './selectors';
import { logout, toggleDrawer } from './actions';
import reducer from './reducer';
import saga from './saga';
import PrivateRoute from './privateRoute';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  render() {
    const { classes, location, token, drawerOpen } = this.props;
    return (
      <div className={classNames(classes.root, 'root-app')}>
        <Header
          open={drawerOpen}
          handleDrawerOpen={this.props.toggleDrawer}
          token={token}
        />
        <LeftDrawer
          open={drawerOpen}
          hidden={!token}
          toggleDrawer={this.props.toggleDrawer}
          path={location.path}
          logout={this.props.logout}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={LoginPage} />
            <PrivateRoute exact path="/map" component={MapPage} token={token} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  token: makeSelectToken(),
  drawerOpen: makeSelectDrawerOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    toggleDrawer: () => dispatch(toggleDrawer()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'App', reducer });
const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles, { withTheme: true })(App));
