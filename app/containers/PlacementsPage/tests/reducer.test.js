import { fromJS } from 'immutable';
import placementsPageReducer, { initialState } from '../reducer';

describe('PlacementsPage reducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(placementsPageReducer(undefined, {})).toEqual(state);
  });
});
