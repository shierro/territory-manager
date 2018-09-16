import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { geolocated } from 'react-geolocated';
import { compose } from 'redux';
import {
  Map as LeafletMap,
  TileLayer,
  CircleMarker,
  Marker,
  Popup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ReCenter from '@material-ui/icons/MyLocation';
import SaveButton from '@material-ui/icons/CheckCircle';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { allSelectors } from './selectors';
import { mapPageActions } from './actions';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
import AddPerson from '../../components/AddPerson';
import PersonDetails from '../../components/PersonDetails';
import AddPersonStepper from '../../components/AddPersonStepper';
import AddVisit from '../../components/AddVisit';

import markerIcon from './markerIcon';
import propTypes from './propTypes';

delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line

/* eslint-disable global-require */
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
  renderFloatingButton(content, className, onClick) {
    return (
      <Button
        mini
        variant="fab"
        aria-label="add"
        className={className}
        onClick={onClick}
      >
        {content}
      </Button>
    );
  }
  renderFloatingLeftButton(mappingPerson) {
    const className = this.props.classes.addPersonButton;
    let onClick = this.props.addPersonStart;
    if (!this.props.addingPerson) {
      return this.renderFloatingButton(<Add />, className, onClick);
    }
    if (mappingPerson) {
      onClick = this.props.savePersonData;
      return this.renderFloatingButton(<SaveButton />, className, onClick);
    }
    return '';
  }

  renderMarkers(people, history) {
    return Object.keys(people).map(key => (
      <Marker
        key={key}
        position={people[key].location}
        onClick={() => this.props.handlePersonClick(key)}
      >
        <Popup onClose={this.props.onPopupClose}>
          {!this.props.addingVisit && (
            <div className={this.props.classes.popupContainer}>
              <PersonDetails
                person={people[key]}
                handlePersonUpdate={this.props.handlePersonUpdate}
              />
              <Button
                className={this.props.classes.detailsButton}
                variant="contained"
                color="secondary"
                onClick={() => history.push(`/person/${key}`)}
              >
                View Details
              </Button>
            </div>
          )}
          <AddVisit
            person={people[key]}
            saveVisit={this.props.saveVisit}
            addingVisit={this.props.addingVisit}
            toggleAddingVisit={this.props.toggleAddingVisit}
          />
        </Popup>
      </Marker>
    ));
  }

  renderStepper() {
    return (
      this.props.addingPerson && (
        <AddPersonStepper
          activeStep={this.props.activeStep}
          steps={this.props.steps}
          completed={this.props.completed}
          stepClicked={this.props.moveToStep}
        />
      )
    );
  }
  renderNotSupported() {
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
  renderHelmet() {
    return (
      <Helmet>
        <title>Maps</title>
        <meta name="description" content="Maps" />
      </Helmet>
    );
  }
  renderRecenterButton() {
    return (
      <IconButton
        color="primary"
        className={this.props.classes.reCenterButton}
        aria-label="My Location"
        onClick={this.props.setInitialLocation}
      >
        <ReCenter />
      </IconButton>
    );
  }
  renderMap(latitude, longitude, mappingPerson, newPerson, people) {
    return (
      <LeafletMap center={this.props.initialLocation} zoom={this.props.zoom}>
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <CircleMarker center={[latitude, longitude]}>
          <Popup>You are here!</Popup>
        </CircleMarker>
        {mappingPerson && (
          <Marker
            icon={markerIcon}
            position={newPerson.location || this.props.initialLocation}
            draggable
            onDragEnd={this.props.handleNewPersonPositionChange}
          />
        )}
        {this.renderMarkers(people, this.props.history)}
      </LeafletMap>
    );
  }
  renderAddPersonForm(activeStep, mappingPerson, newPerson) {
    return (
      <AddPerson
        activeStep={activeStep}
        steps={this.props.steps}
        open={this.props.addingPerson && !mappingPerson}
        initialLocation={this.props.initialLocation}
        zoom={this.props.zoom}
        moveToStep={this.props.moveToStep}
        handleInputChange={this.props.handleFormChange}
        cancelAdd={this.props.cancelAdd}
        ageRange={this.props.ageRange}
        newPerson={newPerson}
      />
    );
  }
  render() {
    if (!navigator.geolocation) {
      return this.renderNotSupported();
    }
    const { activeStep, newPerson, people } = this.props;
    const { latitude, longitude } = this.props.coords || defaultCoords;
    const mappingPerson = activeStep >= this.props.steps.length - 1;
    return (
      <div className="maps">
        {this.props.loading && <LinearProgress />}
        {this.renderHelmet()}
        {this.renderRecenterButton()}
        {this.renderFloatingLeftButton(mappingPerson)}
        {this.renderAddPersonForm(activeStep, mappingPerson, newPerson)}
        {this.renderStepper()}
        {this.renderMap(latitude, longitude, mappingPerson, newPerson, people)}
      </div>
    );
  }
}

MapPage.propTypes = propTypes;

const withConnect = connect(
  createStructuredSelector(allSelectors), // map selectors to props
  mapPageActions, // map action to props
);

const withReducer = injectReducer({ key: 'mapPage', reducer });
const withSaga = injectSaga({ key: 'mapPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(
  geolocated({
    positionOptions: { enableHighAccuracy: true },
    watchPosition: true,
    userDecisionTimeout: 15000,
  })(withStyles(styles)(MapPage)),
);
