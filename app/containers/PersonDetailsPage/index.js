import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { allSelectors } from './selectors';
import { pageActions } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class PersonDetailsPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Person details page!</h1>
      </div>
    );
  }
}

PersonDetailsPage.propTypes = {};

const withConnect = connect(
  createStructuredSelector(allSelectors), // map state to props
  pageActions, // map actions to props
);

const withReducer = injectReducer({ key: 'personDetailsPage', reducer });
const withSaga = injectSaga({ key: 'personDetailsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PersonDetailsPage);
