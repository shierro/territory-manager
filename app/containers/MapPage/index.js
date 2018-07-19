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
  Marker,
  Popup,
} from 'react-leaflet';

import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ReCenter from '@material-ui/icons/MyLocation';
import SaveButton from '@material-ui/icons/CheckCircle';
import AddPersonButton from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectInitialLocation,
  makeSelectInitialLocationLoaded,
  makeSelectZoom,
  makeSelectLoading,
  makeSelectAddingPerson,
  makeSelectSteps,
  makeSelectActiveStep,
  makeSelectCompleted,
  makeSelectNewPerson,
  makeSelectPersons,
} from './selectors';
import {
  setInitialLocation,
  addPersonStart,
  savePersonData,
  handleFormChange,
  handleNewPersonPositionChange,
  moveToStep,
  cancelAdd,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
import AddPerson from '../../components/AddPerson';
import AddPersonStepper from '../../components/AddPersonStepper';
import markerIcon from './markerIcon';

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
      return this.renderFloatingButton(<AddPersonButton />, className, onClick);
    }
    if (mappingPerson) {
      onClick = this.props.savePersonData;
      return this.renderFloatingButton(<SaveButton />, className, onClick);
    }
    return '';
  }

  renderMarkers(persons) {
    return Object.keys(persons).map(key => (
      <Marker key={key} position={persons[key].location}>
        <Popup>
          <h3>
            Name: {persons[key].firstName} {persons[key].lastName}
          </h3>
          <h4>Address: {persons[key].address}</h4>
          <h4>Notes: {persons[key].notes}</h4>
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
  renderMap(latitude, longitude, mappingPerson, newPerson, persons) {
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
        {this.renderMarkers(persons)}
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
        newPerson={newPerson}
      />
    );
  }
  render() {
    const { activeStep, newPerson, persons } = this.props;
    const { latitude, longitude } = this.props.coords || defaultCoords;
    const mappingPerson = activeStep >= this.props.steps.length - 1;
    if (!navigator.geolocation) {
      return this.renderNotSupported();
    }
    return (
      <div className="maps">
        {this.props.loading && <LinearProgress />}
        {this.renderHelmet()}
        {this.renderRecenterButton()}
        {this.renderFloatingLeftButton(mappingPerson)}
        {this.renderAddPersonForm(activeStep, mappingPerson, newPerson)}
        {this.renderStepper()}
        {this.renderMap(latitude, longitude, mappingPerson, newPerson, persons)}
      </div>
    );
  }
}

MapPage.propTypes = {
  classes: PropTypes.object.isRequired,
  completed: PropTypes.object.isRequired,
  newPerson: PropTypes.object.isRequired,
  persons: PropTypes.object.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  initialLocationLoaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  addingPerson: PropTypes.bool.isRequired,
  initialLocation: PropTypes.array.isRequired,
  steps: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
  setInitialLocation: PropTypes.func.isRequired,
  addPersonStart: PropTypes.func.isRequired,
  savePersonData: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleNewPersonPositionChange: PropTypes.func.isRequired,
  moveToStep: PropTypes.func.isRequired,
  cancelAdd: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  initialLocation: makeSelectInitialLocation(),
  initialLocationLoaded: makeSelectInitialLocationLoaded(),
  zoom: makeSelectZoom(),
  loading: makeSelectLoading(),
  addingPerson: makeSelectAddingPerson(),
  steps: makeSelectSteps(),
  activeStep: makeSelectActiveStep(),
  completed: makeSelectCompleted(),
  newPerson: makeSelectNewPerson(),
  persons: makeSelectPersons(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    setInitialLocation: () => dispatch(setInitialLocation()),
    addPersonStart: () => dispatch(addPersonStart()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    savePersonData: () => dispatch(savePersonData()),
    moveToStep: step => dispatch(moveToStep(step)),
    cancelAdd: () => dispatch(cancelAdd()),
    handleNewPersonPositionChange: data =>
      dispatch(handleNewPersonPositionChange(data)),
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
    positionOptions: { enableHighAccuracy: true },
    watchPosition: true,
    userDecisionTimeout: 15000,
  })(withStyles(styles)(MapPage)),
);
