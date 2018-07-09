import {
  GET_INITIAL_LOCATION,
  ADD_PERSON_START,
  SAVE_PERSON_DATA,
  GO_NEXT_STEP,
  PERSON_FORM_CHANGE,
  UPDATE_NEW_MARKER_LOCATION,
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

export function goNextStep() {
  return { type: GO_NEXT_STEP };
}

export function handleFormChange(key, value) {
  return { type: PERSON_FORM_CHANGE, key, value };
}

export function handleNewPersonPositionChange(data) {
  return { type: UPDATE_NEW_MARKER_LOCATION, data };
}
