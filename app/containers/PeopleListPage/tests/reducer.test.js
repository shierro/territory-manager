import { fromJS } from 'immutable';
import PeopleListPageReducer, { initialState } from '../reducer';

describe('PeopleListPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(PeopleListPageReducer(undefined, {})).toEqual(state);
  });
});
