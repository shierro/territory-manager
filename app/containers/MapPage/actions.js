import {
  GET_INITIAL_LOCATION,
  ADD_PERSON_START,
  SAVE_PERSON_DATA,
  PERSON_FORM_CHANGE,
  PERSON_UPDATE,
  UPDATE_NEW_MARKER_LOCATION,
  SET_STEP,
  CANCEL_ADD,
  PERSON_CLICK,
  SAVE_VISIT,
} from './constants';

export function setInitialLocation() {
  return { type: GET_INITIAL_LOCATION };
}

export function addPersonStart() {
  return { type: ADD_PERSON_START };
}

export function savePersonData() {
  return { type: SAVE_PERSON_DATA };
}

export function handleFormChange(key, value) {
  return { type: PERSON_FORM_CHANGE, key, value };
}

export function handlePersonUpdate(key, value) {
  return { type: PERSON_UPDATE, key, value };
}

export function handleNewPersonPositionChange(data) {
  return { type: UPDATE_NEW_MARKER_LOCATION, data };
}

export function moveToStep(step) {
  return { type: SET_STEP, step };
}

export function cancelAdd() {
  return { type: CANCEL_ADD };
}

export function handlePersonClick(index) {
  return { type: PERSON_CLICK, index };
}

export function saveVisit(visitData) {
  return { type: SAVE_VISIT, visitData };
}

export function mapPageActions(dispatch) {
  return {
    setInitialLocation: () => dispatch(setInitialLocation()),
    addPersonStart: () => dispatch(addPersonStart()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    savePersonData: () => dispatch(savePersonData()),
    moveToStep: step => dispatch(moveToStep(step)),
    cancelAdd: () => dispatch(cancelAdd()),
    handleNewPersonPositionChange: data =>
      dispatch(handleNewPersonPositionChange(data)),
    handlePersonUpdate: (key, value) =>
      dispatch(handlePersonUpdate(key, value)),
    handlePersonClick: index => dispatch(handlePersonClick(index)),
    saveVisit: visitData => dispatch(saveVisit(visitData)),
  };
}
