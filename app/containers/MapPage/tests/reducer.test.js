import { fromJS, List } from 'immutable';
import mapPageReducer from '../reducer';

describe('mapPageReducer', () => {
  it('returns the initial state', () => {
    expect(mapPageReducer(undefined, {})).toEqual(
      fromJS({
        initialLocation: List([0, 0]),
        initialLocationLoaded: false,
        zoom: 16,
        error: {},
        loading: false,
      }),
    );
  });
});
