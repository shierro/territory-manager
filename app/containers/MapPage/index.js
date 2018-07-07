/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { geolocated } from 'react-geolocated';
import { compose } from 'redux';
import {
  Map as LeafletMap,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet';
import LinearProgress from '@material-ui/core/LinearProgress';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectInitialLocation,
  makeSelectInitialLocationLoaded,
  makeSelectZoom,
} from './selectors';
import { setInitialLocation } from './actions';
import reducer from './reducer';
import saga from './saga';

export class MapPage extends React.Component {
  componentDidMount() {
    if (!this.props.initialLocationLoaded) {
      this.props.setInitialLocation();
    }
  }
  render() {
    if (!this.props.initialLocationLoaded || !this.props.coords) {
      return (
        <div>
          <LinearProgress />
          <h4>waiting for location data...</h4>
        </div>
      );
    }
    const {
      initialLocation,
      coords: { latitude, longitude },
    } = this.props;
    return (
      <div className="maps">
        <Helmet>
          <title>Map Page</title>
          <meta name="description" content="Maps" />
        </Helmet>
        <LeafletMap center={initialLocation} zoom={this.props.zoom}>
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <CircleMarker center={[latitude, longitude]}>
            <Popup>You are here!</Popup>
          </CircleMarker>
        </LeafletMap>
      </div>
    );
  }
}

MapPage.propTypes = {
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  initialLocationLoaded: PropTypes.bool.isRequired,
  initialLocation: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  setInitialLocation: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  initialLocation: makeSelectInitialLocation(),
  initialLocationLoaded: makeSelectInitialLocationLoaded(),
  zoom: makeSelectZoom(),
});

function mapDispatchToProps(dispatch) {
  return { setInitialLocation: () => dispatch(setInitialLocation()) };
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
    userDecisionTimeout: 15000,
  })(MapPage),
);
