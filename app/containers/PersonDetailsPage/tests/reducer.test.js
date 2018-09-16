import { fromJS } from 'immutable';
import personDetailsPageReducer, { initialState } from '../reducer';

describe('personDetailsPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(personDetailsPageReducer(undefined, {})).toEqual(state);
  });
});
