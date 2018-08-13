import { fromJS, List, Map } from 'immutable';
import {
  SET_INITIAL_LOCATION,
  SET_PAGE_ERROR,
  GET_INITIAL_LOCATION,
  SET_LOADING,
  ADD_PERSON_START,
  SAVE_PERSON_DATA,
  PERSON_FORM_CHANGE,
  UPDATE_NEW_MARKER_LOCATION,
  SET_STEP,
  CANCEL_ADD,
  PERSON_UPDATE,
  PERSON_CLICK,
  SAVE_VISIT,
} from './constants';

const personSchema = {
  firstName: '',
  lastName: '',
  notes: '',
  address: '',
  ageRange: {
    min: 1,
    max: 119,
  },
  visits: List([]),
};

const initialState = fromJS({
  initialLocation: List([0, 0]),
  initialLocationLoaded: false,
  defaultAgeRange: { min: 1, max: 120 },
  loading: false,
  addingPerson: false,
  zoom: 16,
  error: Map(),
  people: Map(),
  steps: List(['Info', 'Address & Notes', 'Map Location']),
  activeStep: 0,
  completed: Map(),
  newPerson: Map(personSchema),
  personCurrentlyEditing: 0,
  personLabels: {
    firstName: 'First Name',
    lastName: 'Last Name',
    notes: 'Notes',
    address: 'Address',
    ageRange: 'Age Range',
    visits: 'Visits',
  },
});

function setInitialLocation(state, action) {
  return state
    .set('initialLocation', List(action.coords))
    .set('initialLocationLoaded', true)
    .set('loading', false);
}

function addPersonStart(state) {
  return state
    .set('addingPerson', true)
    .updateIn(['newPerson', 'location'], () =>
      state.get('initialLocation').toJS(),
    );
}

function savePersonData(state) {
  let newPerson = state.get('newPerson');
  const date = new Date();
  const newVisit = { found: true, note: newPerson.get('notes'), date };
  newPerson = newPerson.updateIn(['visits'], visit => visit.push(newVisit));
  return state
    .updateIn([`people`, state.get('people').size + 1], () => newPerson)
    .set('addingPerson', false)
    .set('activeStep', 0)
    .set('newPerson', Map(personSchema))
    .set('completed', Map());
}

function setStep(state, action) {
  const activeStep = state.get('activeStep');
  const steps = state.get('steps').toJS();
  let latestState = state;
  let completed = state.get('completed');
  // go next
  if (activeStep < action.step) {
    completed = completed.set(activeStep, true);
    latestState = latestState.set('completed', completed);
  }
  // go back
  if (activeStep > action.step) {
    completed = completed.set(activeStep, false);
    latestState = latestState.set('completed', completed);
  }
  steps.forEach((step, index) => {
    if (index >= action.step) {
      completed = completed.set(index, false);
    }
  });
  return latestState.set('activeStep', action.step).set('completed', completed);
}

function cancelAdd(state) {
  return state
    .set('activeStep', 0)
    .set('completed', Map())
    .set('addingPerson', false);
}

function updateNewMarkerLocation(state, action) {
  const { lat, lng } = action.data.target._latlng; // eslint-disable-line
  return state.updateIn(['newPerson', 'location'], () => [lat, lng]);
}

function personUpdate(state, action) {
  return state.updateIn(
    ['people', state.get('personCurrentlyEditing'), action.key],
    () => action.value,
  );
}

function addPersonVisit(state, action) {
  const date = new Date();
  return state.updateIn(
    ['people', state.get('personCurrentlyEditing'), 'visits'],
    visits => visits.push({ ...action.visitData, date }),
  );
}

function mapPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INITIAL_LOCATION:
      return state.set('loading', true);
    case SET_INITIAL_LOCATION:
      return setInitialLocation(state, action);
    case SET_PAGE_ERROR:
      return state.set('error', Map(action.error));
    case SET_LOADING:
      return state.set('loading', action.value);
    case ADD_PERSON_START:
      return addPersonStart(state);
    case SAVE_PERSON_DATA:
      return savePersonData(state);
    case PERSON_FORM_CHANGE:
      return state.updateIn(['newPerson', action.key], () => action.value);
    case PERSON_UPDATE:
      return personUpdate(state, action);
    case UPDATE_NEW_MARKER_LOCATION:
      return updateNewMarkerLocation(state, action);
    case SET_STEP:
      return setStep(state, action);
    case CANCEL_ADD:
      return cancelAdd(state);
    case PERSON_CLICK:
      return state.set('personCurrentlyEditing', parseInt(action.index, 10));
    case SAVE_VISIT:
      return addPersonVisit(state, action);
    default:
      return state;
  }
}

export default mapPageReducer;
