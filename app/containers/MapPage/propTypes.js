import PropTypes from 'prop-types';

export default {
  classes: PropTypes.object.isRequired,
  completed: PropTypes.object.isRequired,
  newPerson: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
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
  handlePersonUpdate: PropTypes.func.isRequired,
  handleNewPersonPositionChange: PropTypes.func.isRequired,
  moveToStep: PropTypes.func.isRequired,
  cancelAdd: PropTypes.func.isRequired,
  ageRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }),
  personLabels: PropTypes.object.isRequired,
  handlePersonClick: PropTypes.func.isRequired,
};
