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
import IconButton from '@material-ui/core/IconButton';
import ReCenter from '@material-ui/icons/MyLocation';
import { withStyles } from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectInitialLocation,
  makeSelectInitialLocationLoaded,
  makeSelectZoom,
  makeSelectLoading,
} from './selectors';
import { setInitialLocation } from './actions';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';

const defaultCoords = {
  latitude: 0,
  longitude: 0,
};

export class MapPage extends React.Component {
  componentDidMount() {
    if (!this.props.initialLocationLoaded) {
      this.props.setInitialLocation();
    }
  }
  render() {
    const { initialLocation, classes, coords } = this.props;
    const { latitude, longitude } = coords || defaultCoords;
    if (!navigator.geolocation) {
      return (
        <p>
          Geolocation is not supported by your browser.. Please download the
          latest{' '}
          <a href="https://www.google.com/chrome/" target="_blank">
            Chrome
          </a>
        </p>
      );
    }
    return (
      <div className="maps">
        <Helmet>
          <title>Maps</title>
          <meta name="description" content="Maps" />
        </Helmet>
        <IconButton
          color="primary"
          className={classes.reCenterButton}
          aria-label="My Location"
          onClick={this.props.setInitialLocation}
        >
          <ReCenter />
        </IconButton>
        {this.props.loading && <LinearProgress />}
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
  classes: PropTypes.object.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  initialLocationLoaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  initialLocation: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  setInitialLocation: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  initialLocation: makeSelectInitialLocation(),
  initialLocationLoaded: makeSelectInitialLocationLoaded(),
  zoom: makeSelectZoom(),
  loading: makeSelectLoading(),
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
  })(withStyles(styles)(MapPage)),
);
