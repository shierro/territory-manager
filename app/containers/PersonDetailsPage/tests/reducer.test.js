import { fromJS } from 'immutable';
import personDetailsPageReducer, { initialState } from '../reducer';
import { pageActions } from '../actions';

const actions = pageActions(result => result);

describe('personDetailsPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(personDetailsPageReducer(undefined, {})).toEqual(state);
  });

  it('should handle defaultAction action correctly', () => {
    const newState = personDetailsPageReducer(state, actions.defaultAction());
    expect(newState.get('title')).toEqual(initialState.title);
  });
});
