import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import classNames from 'classnames';

import Footer from 'components/Footer';
import Header from 'components/Header';
import LeftDrawer from 'components/LeftDrawer';
import PrivateRoute from 'components/PrivateRoute';
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
  makeSelectRehydrated,
} from './selectors';
import { logout, toggleDrawer } from './actions';
import reducer from './reducer';
import saga from './saga';

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

const base = process.env.PUBLIC_PATH || '';

class App extends React.Component {
  renderHeader(drawerOpen, token) {
    return (
      <Header
        open={drawerOpen}
        handleDrawerOpen={this.props.toggleDrawer}
        token={token}
      />
    );
  }
  renderLeftDrawer(drawerOpen, token, location) {
    return (
      <LeftDrawer
        open={drawerOpen}
        hidden={!token}
        toggleDrawer={this.props.toggleDrawer}
        path={location.path}
        logout={this.props.logout}
      />
    );
  }
  renderMainContent(classes, token) {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={`${base}/login`} component={LoginPage} />
          <Route exact path={`${base}/`} component={LoginPage} />
          <PrivateRoute
            exact
            path={`${base}/map`}
            component={MapPage}
            token={token}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    );
  }
  render() {
    const { classes, location, token, drawerOpen } = this.props;
    if (!this.props.rehydrated) {
      return <LinearProgress />;
    }
    return (
      <div className={classNames(classes.root, 'root-app')}>
        {this.renderHeader(drawerOpen, token)}
        {this.renderLeftDrawer(drawerOpen, token, location)}
        {this.renderMainContent(classes, token)}
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
  rehydrated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  token: makeSelectToken(),
  drawerOpen: makeSelectDrawerOpen(),
  rehydrated: makeSelectRehydrated(),
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
