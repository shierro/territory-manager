import { fromJS, List, Map } from 'immutable';
import mapPageReducer from '../reducer';
import { mapPageActions } from '../actions';

import {
  SET_INITIAL_LOCATION,
  SET_PAGE_ERROR,
  SET_LOADING,
} from '../constants';

const acts = mapPageActions(result => result);

describe('mapPageReducer', () => {
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
  const initStateObject = {
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
  };
  let state;
  beforeEach(() => {
    state = fromJS(initStateObject);
  });

  it('returns the initial state', () => {
    expect(mapPageReducer(undefined, {})).toEqual(fromJS(initStateObject));
  });

  it('should handle setInitialLocation action correctly', () => {
    const newState = mapPageReducer(state, acts.setInitialLocation());
    expect(newState.get('loading')).toEqual(true);
  });

  it('should handle addPersonStart action correctly', () => {
    const newState = mapPageReducer(state, acts.addPersonStart());
    expect(newState.get('addingPerson')).toEqual(true);
  });

  it('should set page error correctly', () => {
    const error = { foo: 'bar' };
    const newState = mapPageReducer(state, { type: SET_PAGE_ERROR, error });
    expect(newState.get('error').toJS()).toEqual(error);
  });

  it('should set loading correctly', () => {
    const value = true;
    const newState = mapPageReducer(state, { type: SET_LOADING, value });
    expect(newState.get('loading')).toEqual(value);
  });

  it('should handle savePersonData action correctly', () => {
    const newState = mapPageReducer(state, acts.savePersonData());
    expect(newState.get('addingPerson')).toEqual(false);
    expect(newState.get('activeStep')).toEqual(0);
    expect(newState.get('people').size).toEqual(1);
  });

  it('should set initial location correctly', () => {
    const coords = [5, 5];
    const newState = mapPageReducer(state, {
      type: SET_INITIAL_LOCATION,
      coords,
    });
    expect(newState.get('loading')).toEqual(false);
    expect(newState.get('initialLocationLoaded')).toEqual(true);
    expect(newState.get('initialLocation').toJS()).toEqual(coords);
  });
  it('should move to a step(forward) correctly', () => {
    const newState = mapPageReducer(state, acts.moveToStep(1));
    expect(newState.get('activeStep')).toEqual(1);
    expect(newState.get('completed').toJS()).toEqual({
      0: true,
      1: false,
      2: false,
    });
  });
  it('should move to a step(backward) correctly', () => {
    const newState = mapPageReducer(
      state.set('activeStep', 2),
      acts.moveToStep(0),
    );
    expect(newState.get('activeStep')).toEqual(0);
    expect(newState.get('completed').toJS()).toEqual({
      0: false,
      1: false,
      2: false,
    });
  });
  it('should handle handleFormChange action correctly', () => {
    const key = 'foo';
    const value = 'bar';
    const newState = mapPageReducer(state, acts.handleFormChange(key, value));
    expect(newState.get('newPerson').toJS()[key]).toEqual(value);
  });
  it('should handle handleNewPersonPositionChange action correctly', () => {
    const data = { target: { _latlng: { lat: 5, lng: 5 } } };
    const loc = [data.target._latlng.lat, data.target._latlng.lng]; // eslint-disable-line
    const newState = mapPageReducer(
      state,
      acts.handleNewPersonPositionChange(data),
    );
    expect(newState.get('newPerson').get('location')).toEqual(loc);
  });
  it('should cancel add correctly', () => {
    const addingState = state.set('activeStep', 3).set('addingPerson', true);
    const newState = mapPageReducer(addingState, acts.cancelAdd());
    expect(newState.get('completed')).toEqual(Map());
    expect(newState.get('activeStep')).toEqual(0);
    expect(newState.get('addingPerson')).toEqual(false);
  });
  it('should update person correctly', () => {
    const key = 'testProp';
    const val = 'testValue';
    const newState = mapPageReducer(state, acts.handlePersonUpdate(key, val));
    const personProp = newState
      .get('people')
      .get(state.get('personCurrentlyEditing'))
      .get(key);
    expect(personProp).toEqual(val);
  });
  it('should set save visit correctly', () => {
    let newState = mapPageReducer(state, acts.savePersonData());
    newState = newState.set('personCurrentlyEditing', 1);
    const visitData = { found: true, note: 'awesome' };
    newState = mapPageReducer(newState, acts.saveVisit(visitData));
    const latestVisit = newState
      .get('people')
      .get(1)
      .get('visits')
      .toJS()
      .pop();
    delete latestVisit.date;
    expect(latestVisit).toEqual(visitData);
  });
  it('should handle person click correctly', () => {
    const index = 1;
    const newState = mapPageReducer(state, acts.handlePersonClick(index));
    expect(newState.get('personCurrentlyEditing')).toEqual(index);
  });
});
