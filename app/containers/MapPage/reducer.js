import { fromJS, List, Map } from 'immutable';
import {
  SET_INITIAL_LOCATION,
  SET_PAGE_ERROR,
  GET_INITIAL_LOCATION,
  SET_LOADING,
  ADD_PERSON_START,
  SAVE_PERSON_DATA,
  GO_NEXT_STEP,
  PERSON_FORM_CHANGE,
  UPDATE_NEW_MARKER_LOCATION,
} from './constants';

const personSchema = {
  firstName: '',
  lastName: '',
  notes: '',
  address: '',
};

const initialState = fromJS({
  initialLocation: List([0, 0]),
  initialLocationLoaded: false,
  loading: false,
  addingPerson: false,
  zoom: 16,
  error: Map(),
  persons: Map(),
  steps: List(['Info', 'Address & Notes', 'Map Location']),
  activeStep: 0,
  completed: Map(),
  newPerson: Map(personSchema),
});

function mapPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INITIAL_LOCATION:
      return state.set('loading', true);
    case SET_INITIAL_LOCATION:
      return state
        .set('initialLocation', List(action.coords))
        .set('initialLocationLoaded', true)
        .set('loading', false);
    case SET_PAGE_ERROR:
      return state.set('error', Map(action.error));
    case SET_LOADING:
      return state.set('loading', action.value);
    case ADD_PERSON_START: {
      const newPerson = state.get('newPerson');
      const updatedPerson = newPerson.set(
        'location',
        state.get('initialLocation').toJS(),
      );
      return state.set('addingPerson', true).set('newPerson', updatedPerson);
    }
    case SAVE_PERSON_DATA: {
      const persons = state.get('persons');
      const newPerson = state.get('newPerson');
      const updatedPersons = persons.set(persons.size + 1, newPerson);
      return state
        .set(`persons`, updatedPersons)
        .set('addingPerson', false)
        .set('activeStep', 0)
        .set('newPerson', Map(personSchema))
        .set('completed', Map());
    }
    case GO_NEXT_STEP: {
      const activeStep = state.get('activeStep');
      const nextStep = activeStep + 1;
      const updatedState = state.set('activeStep', nextStep);
      const completed = state.get('completed').set(activeStep, true);
      return updatedState.set('completed', completed);
    }
    case PERSON_FORM_CHANGE: {
      const result = state.get('newPerson').set(action.key, action.value);
      return state.set('newPerson', result);
    }
    case UPDATE_NEW_MARKER_LOCATION: {
      const newPerson = state.get('newPerson');
      const { lat, lng } = action.data.target._latlng; // eslint-disable-line
      const updatedNewPerson = newPerson.set('location', [lat, lng]);
      return state.set('newPerson', updatedNewPerson);
    }
    default:
      return state;
  }
}

export default mapPageReducer;
