/* eslint-disable react/prefer-stateless-function */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMapPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class MapPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>MapPage</title>
          <meta name="description" content="Description of MapPage" />
        </Helmet>
        <h1>This is your MAP PAGE CONTENT</h1>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  mappage: makeSelectMapPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mapPage', reducer });
const withSaga = injectSaga({ key: 'mapPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MapPage);
