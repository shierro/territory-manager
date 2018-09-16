import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import Footer from 'components/Footer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { appSelectors } from './selectors';
import { appActions as mapActionsToProps } from './actions';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
import renderHeader from './header';
import renderLeftDrawer from './leftDrawer';
import renderMainContent from './mainContent';

class App extends React.Component {
  render() {
    const { classes, token, drawerOpen } = this.props;
    if (!this.props.rehydrated) {
      return <LinearProgress />;
    }
    return (
      <div className={classNames(classes.root, 'root-app')}>
        {renderHeader(drawerOpen, token, this.props.toggleDrawer)}
        {renderLeftDrawer(this.props)}
        {renderMainContent(this.props)}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  rehydrated: PropTypes.bool.isRequired,
};

const mapSelectorsToProps = createStructuredSelector(appSelectors);

const withConnect = connect(
  mapSelectorsToProps,
  mapActionsToProps,
);

const withReducer = injectReducer({ key: 'App', reducer });
const withSaga = injectSaga({ key: 'App', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(withStyles(styles, { withTheme: true })(App)),
);
