/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { geolocated } from 'react-geolocated';
import LinearProgress from '@material-ui/core/LinearProgress';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMapPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class MapPage extends React.Component {
  state = {
    zoom: 17,
  };
  render() {
    if (!this.props.coords) {
      return (
        <div>
          <LinearProgress />
          <h4>waiting for location data...</h4>
        </div>
      );
    }
    const { latitude, longitude } = this.props.coords;
    const position = [latitude, longitude];
    return (
      <div className="maps">
        <Helmet>
          <title>MapPage</title>
          <meta name="description" content="Description of MapPage" />
        </Helmet>
        <LeafletMap center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>You are here!</Popup>
          </Marker>
        </LeafletMap>
      </div>
    );
  }
}

MapPage.propTypes = {
  coords: PropTypes.object,
};

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
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    watchPosition: true,
    userDecisionTimeout: 5000,
  })(MapPage),
);
