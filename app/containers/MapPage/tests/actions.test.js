/* eslint-disable import/no-named-as-default-member */
import { mapPageActions } from '../actions';
import {
  ADD_PERSON_START,
  CANCEL_ADD,
  PERSON_UPDATE,
  PERSON_CLICK,
  SAVE_VISIT,
  GET_INITIAL_LOCATION,
  PERSON_FORM_CHANGE,
  SAVE_PERSON_DATA,
  SET_STEP,
  UPDATE_NEW_MARKER_LOCATION,
} from '../constants';

const actions = mapPageActions(result => result);

describe('MapPage actions', () => {
  it('has a type of ADD_PERSON_START', () => {
    const expected = { type: ADD_PERSON_START };
    expect(actions.addPersonStart()).toEqual(expected);
  });
  it('has a type of CANCEL_ADD', () => {
    const expected = { type: CANCEL_ADD };
    expect(actions.cancelAdd()).toEqual(expected);
  });
  it('has a type of PERSON_UPDATE', () => {
    const expected = { type: PERSON_UPDATE };
    expect(actions.handlePersonUpdate()).toEqual(expected);
  });
  it('has a type of PERSON_CLICK', () => {
    const expected = { type: PERSON_CLICK };
    expect(actions.handlePersonClick()).toEqual(expected);
  });
  it('has a type of SAVE_VISIT', () => {
    const expected = { type: SAVE_VISIT };
    expect(actions.saveVisit()).toEqual(expected);
  });
  it('has a type of GET_INITIAL_LOCATION', () => {
    const expected = { type: GET_INITIAL_LOCATION };
    expect(actions.setInitialLocation()).toEqual(expected);
  });

  it('has a type of PERSON_FORM_CHANGE', () => {
    const expected = { type: PERSON_FORM_CHANGE };
    expect(actions.handleFormChange()).toEqual(expected);
  });
  it('has a type of SAVE_PERSON_DATA', () => {
    const expected = { type: SAVE_PERSON_DATA };
    expect(actions.savePersonData()).toEqual(expected);
  });
  it('has a type of SET_STEP', () => {
    const expected = { type: SET_STEP };
    expect(actions.moveToStep()).toEqual(expected);
  });
  it('has a type of UPDATE_NEW_MARKER_LOCATION', () => {
    const expected = { type: UPDATE_NEW_MARKER_LOCATION };
    expect(actions.handleNewPersonPositionChange()).toEqual(expected);
  });
});
